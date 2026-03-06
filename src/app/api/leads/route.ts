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
