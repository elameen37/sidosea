import { NextResponse } from 'next/server';
import { LeadSchema } from '@/lib/schemas';

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

        // 2. Mock Backend Logic (Rate Limiting, Banking Check)
        // In a real app, we would:
        // - Check Upstash/Redis for rate limiting
        // - Check blacklisted domains/emails
        // - Persist to DB
        // - Send email via Resend/SendGrid

        console.log('Lead Submission Received:', data);

        // Simulate delay for "compliance check"
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            success: true,
            message: "Submission received and queued for compliance review"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}
