import { NextResponse } from 'next/server';

export async function GET() {
    const diagnostics = {
        ai: {
            status: 'unknown',
            message: 'Checking...',
        },
        supabase: {
            status: 'unknown',
            message: 'Checking...',
        }
    };

    // Check Gemini API
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
        diagnostics.ai.status = 'error';
        diagnostics.ai.message = 'Missing API Key';
    } else {
        try {
            // Use a very small request to test connectivity
            const testURL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey.trim()}`;
            const aiRes = await fetch(testURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: 'hi' }] }] }),
            });

            if (aiRes.ok) {
                diagnostics.ai.status = 'healthy';
                diagnostics.ai.message = 'Operational';
            } else if (aiRes.status === 429) {
                diagnostics.ai.status = 'warning';
                diagnostics.ai.message = 'Quota Exhausted';
            } else {
                diagnostics.ai.status = 'error';
                diagnostics.ai.message = 'Invalid Config';
            }
        } catch {
            diagnostics.ai.status = 'error';
            diagnostics.ai.message = 'Connection Failed';
        }
    }

    // Check Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        diagnostics.supabase.status = 'error';
        diagnostics.supabase.message = 'Missing Credentials';
    } else {
        try {
            const sbRes = await fetch(`${supabaseUrl}/rest/v1/content?select=count`, {
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`
                }
            });
            if (sbRes.ok) {
                diagnostics.supabase.status = 'healthy';
                diagnostics.supabase.message = 'Optimized';
            } else {
                diagnostics.supabase.status = 'error';
                diagnostics.supabase.message = 'Auth Failure';
            }
        } catch {
            diagnostics.supabase.status = 'error';
            diagnostics.supabase.message = 'Connection Failed';
        }
    }

    return NextResponse.json(diagnostics);
}
