import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidosea2026';
const AUTH_COOKIE = 'sidosea_admin_session';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
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

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
