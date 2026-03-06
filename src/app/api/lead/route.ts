import { NextResponse } from 'next/server';
import { LeadSchema } from '@/lib/schemas';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate Input
        const result = LeadSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid submission data",
                errors: result.error.format()
            }, { status: 400 });
        }

        const data = result.data;

        const newLead = {
            ...data,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        const { error: dbError } = await supabase
            .from('leads')
            .insert([newLead]);

        if (dbError) {
            console.error('Supabase Insertion Error:', dbError);
            throw new Error(`Database error: ${dbError.message}`);
        }

        console.log('Lead Submission Persisted to Supabase:', newLead);

        return NextResponse.json({
            success: true,
            message: "Submission received and queued for compliance review"
        }, { status: 200 });

    } catch (error: any) {
        console.error("API Error details:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error: " + (error.message || String(error))
        }, { status: 500 });
    }
}
