import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidosea2026';
const AUTH_COOKIE = 'sidosea_admin_session';

// Helper to verify PBKDF2 hashed password
function verifyPassword(password: string, storedHash: string) {
    const [salt, hash] = storedHash.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // 1. Check Primary: Database-backed Admins
        const { data: admin, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', username)
            .single();

        let isValid = false;

        if (admin && !error) {
            isValid = verifyPassword(password, admin.password_hash);
        } else {
            // 2. Fallback: Secondary Environment Variable Admin
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                isValid = true;
            }
        }

        if (isValid) {
            const cookieStore = cookies();
            cookieStore.set(AUTH_COOKIE, 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 8, // 8 hours
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: 'Invalid institutional credentials' }, { status: 401 });
    } catch (err) {
        console.error('Login Error:', err);
        return NextResponse.json({ success: false, message: 'Institutional synchronization failure' }, { status: 500 });
    }
}
