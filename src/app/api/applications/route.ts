import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: applications, error } = await supabase
            .from('job_applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase Applications Fetch Error:", error);
            // If the table doesn't exist yet, return helpful error info
            if (error.code === '42P01') {
                return NextResponse.json({ 
                    error: "Table 'job_applications' not found. Please ensure you have run the SQL setup." 
                }, { status: 404 });
            }
            throw error;
        }

        return NextResponse.json(applications || []);
    } catch (error: any) {
        console.error("API Fetch Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch applications" }, { status: 500 });
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
