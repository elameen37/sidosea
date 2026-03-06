import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: leads, error } = await supabase
            .from('leads')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;

        return NextResponse.json(leads || []);
    } catch (error) {
        console.error("Supabase Fetch Error:", error);
        return NextResponse.json([], { status: 200 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();

        const { error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Supabase Update Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Supabase Delete Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
