import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const leadsPath = path.join(process.cwd(), 'src/lib/leads.json');
        const content = await fs.readFile(leadsPath, 'utf-8');
        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();
        const leadsPath = path.join(process.cwd(), 'src/lib/leads.json');
        const content = await fs.readFile(leadsPath, 'utf-8');
        const leads = JSON.parse(content);

        const updatedLeads = leads.map((lead: any) =>
            lead.id === id ? { ...lead, status } : lead
        );

        try {
            await fs.writeFile(leadsPath, JSON.stringify(updatedLeads, null, 2));
        } catch (e) {
            console.error("Failed to update leads file:", e);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const leadsPath = path.join(process.cwd(), 'src/lib/leads.json');
        const content = await fs.readFile(leadsPath, 'utf-8');
        const leads = JSON.parse(content);

        const filteredLeads = leads.filter((lead: any) => lead.id !== id);
        try {
            await fs.writeFile(leadsPath, JSON.stringify(filteredLeads, null, 2));
        } catch (e) {
            console.error("Failed to delete from leads file:", e);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
