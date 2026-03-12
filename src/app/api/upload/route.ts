import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `corporate-profile-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert file to Buffer for Supabase upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const { data, error } = await supabase.storage
            .from('assets')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('assets')
            .getPublicUrl(filePath);

        return NextResponse.json({ publicUrl });
    } catch (error: any) {
        console.error('Server Upload Error:', error);
        console.log('Environment Debug - NEXT_PUBLIC_SUPABASE_URL present:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Environment Debug - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
        console.log('Environment Debug - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
