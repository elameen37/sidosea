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
            console.error(`Validation Error: File size exceeds limit for ${file.name}. Size: ${file.size}`);
            return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
        }

        // 1. Upload CV to Supabase Storage
        // Ensure 'cvs' bucket exists
        console.log("Checking for 'cvs' bucket...");
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === 'cvs');
        if (!bucketExists) {
            console.log("Creating 'cvs' bucket...");
            const { error: createError } = await supabase.storage.createBucket('cvs', {
                public: true,
                allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                fileSizeLimit: 5242880 // 5MB
            });
            if (createError && !createError.message.includes('already exists')) {
                console.error("Bucket creation failed:", createError);
                return NextResponse.json({ error: "Failed to initialize CV storage" }, { status: 500 });
            }
            console.log("'cvs' bucket created or already exists.");
        }

        const fileExt = file.name.split('.').pop();
        // Using a more robust unique file name generation
        const fileName = `${applicant_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `resumes/${fileName}`; // Store in a 'resumes' subfolder within the bucket

        console.log(`Attempting to upload CV to ${filePath}...`);
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('cvs')
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false // Do not overwrite existing files
            });

        if (uploadError) {
            console.error("CV Upload Error:", uploadError);
            return NextResponse.json({ error: "Failed to upload CV to storage." }, { status: 500 });
        }

        // Retrieve public URL
        const { data: { publicUrl } } = supabase.storage
            .from('cvs')
            .getPublicUrl(filePath);
        
        console.log(`CV uploaded successfully. Public URL: ${publicUrl}`);

        // 2. Insert Application Record into Database
        console.log(`Inserting application record for ${applicant_name} into 'job_applications' table...`);
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
            // Attempt to cleanup file if DB insert fails
            console.log(`Database insert failed, attempting to remove uploaded file: ${filePath}`);
            await supabase.storage.from('cvs').remove([filePath]);
            return NextResponse.json({ error: "Failed to record job application: " + dbError.message }, { status: 500 });
        }

        console.log("Application submitted successfully!");
        return NextResponse.json({ success: true, message: 'Application submitted successfully.' }, { status: 200 });

    } catch (error: any) {
        console.error('Job Application Route Error:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred processing your application.' },
            { status: 500 }
        );
    }
}
