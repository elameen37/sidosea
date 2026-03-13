import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to configure file naming and limits
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        // Extract fields
        const job_title = formData.get('job_title') as string;
        const applicant_name = formData.get('applicant_name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const description = formData.get('description') as string;
        const file = formData.get('cv') as File;

        // Basic validation
        if (!job_title || !applicant_name || !email || !file) {
            return NextResponse.json({ error: 'Missing required fields or CV file.' }, { status: 400 });
        }

        // Validate File Type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file format. Please upload PDF or DOCX.' }, { status: 400 });
        }

        // Validate File Size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
        }

        // 1. Upload CV to Supabase Storage - use a dedicated 'cvs' bucket
        const fileExt = file.name.split('.').pop();
        const safeName = applicant_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const fileName = `${safeName}-${Date.now()}.${fileExt}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure 'cvs' bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === 'cvs');
        if (!bucketExists) {
            const { error: createError } = await supabase.storage.createBucket('cvs', {
                public: true,
                allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                fileSizeLimit: 5242880 // 5MB
            });
            if (createError && !createError.message.includes('already exists')) {
                console.error('Bucket creation error:', createError);
                throw new Error('Failed to initialize CV storage.');
            }
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('cvs')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error('CV Upload Error:', uploadError);
            throw new Error('Failed to upload CV to storage.');
        }

        // Retrieve public URL
        const { data: { publicUrl } } = supabase.storage
            .from('cvs')
            .getPublicUrl(fileName);

        // 2. Insert Application Record into Database
        const { error: dbError } = await supabase
            .from('job_applications')
            .insert([{
                job_title,
                applicant_name,
                email,
                phone: phone || null,
                description: description || null,
                cv_url: publicUrl
            }]);

        if (dbError) {
            console.error('Job Application Database Error:', dbError);
            // Attempt to cleanup file if DB insert fails (optional but good practice)
            await supabase.storage.from('cvs').remove([fileName]);
            throw new Error('Failed to record job application.');
        }

        return NextResponse.json({ success: true, message: 'Application submitted successfully.' }, { status: 200 });

    } catch (error: any) {
        console.error('Job Application Route Error:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred processing your application.' },
            { status: 500 }
        );
    }
}
