import { NextResponse } from 'next/server';
import { LeadSchema } from '@/lib/schemas';
import fs from 'fs/promises';
import path from 'path';

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

        // 2. Persist to JSON file
        const leadsPath = path.join(process.cwd(), 'src/lib/leads.json');
        let leads = [];
        try {
            const content = await fs.readFile(leadsPath, 'utf-8');
            leads = JSON.parse(content);
        } catch (e) {
            // File might not exist or be empty
        }

        const newLead = {
            ...data,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        leads.unshift(newLead);
        await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2));

        console.log('Lead Submission Persisted:', newLead);

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
