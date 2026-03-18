import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('admins')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUser) {
            return NextResponse.json({ error: 'Administrator already exists in synchronization' }, { status: 409 });
        }

        const password_hash = hashPassword(password);

        const { error } = await supabase
            .from('admins')
            .insert([{ username, password_hash }]);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, message: 'Institutional administrator registered' });
    } catch (err: any) {
        console.error('Registration Error:', err);
        return NextResponse.json({ error: 'Internal synchronization failure: ' + err.message }, { status: 500 });
    }
}
