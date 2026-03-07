import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .eq('id', 1)
            .single();

        if (error) throw error;
        return NextResponse.json(data.content);
    } catch (error) {
        console.error("Supabase Content Fetch Error:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { error } = await supabase
            .from('site_content')
            .update({ content: body })
            .eq('id', 1);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Supabase Content Update Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
