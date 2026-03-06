import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const cookieStore = cookies();
    cookieStore.delete('sidosea_admin_session');

    const url = new URL('/admin/login', req.url);

    return NextResponse.redirect(url, {
        status: 302,
    });
}
