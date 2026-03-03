import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidosea2026';
const AUTH_COOKIE = 'sidosea_admin_session';

export function isAuthenticated(): boolean {
    const cookieStore = cookies();
    return cookieStore.get(AUTH_COOKIE)?.value === 'authenticated';
}

export function verifyCredentials(username: string, password: string): boolean {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export { AUTH_COOKIE };
