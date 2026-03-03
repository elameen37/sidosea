import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    const contentPath = path.join(process.cwd(), 'src/lib/content.json');
    const content = await fs.readFile(contentPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
}

export async function POST(req: Request) {
    const body = await req.json();
    const contentPath = path.join(process.cwd(), 'src/lib/content.json');
    await fs.writeFile(contentPath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
}
