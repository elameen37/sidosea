import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    console.log('--- API GET /api/applications triggered ---');
    try {
        const { data: applications, error, count } = await supabase
            .from('job_applications')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase Applications Fetch Error:", JSON.stringify(error, null, 2));
            return NextResponse.json({ 
                error: error.message,
                code: error.code,
                hint: error.hint,
                details: error.details
            }, { status: 500 });
        }

        console.log(`Successfully fetched ${applications?.length} applications. Count: ${count}`);
        return NextResponse.json(applications || []);
    } catch (error: any) {
        console.error("API Fetch Error:", error);
        return NextResponse.json({ 
            error: error.message || "Failed to fetch applications",
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from('job_applications')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Delete Error:", error);
        return NextResponse.json({ error: error.message || "Failed to delete application" }, { status: 500 });
    }
}
