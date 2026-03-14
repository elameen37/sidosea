import { cookies } from "next/headers";
import AdminLayoutClient from "./AdminLayoutClient";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const isAuth = cookieStore.get('sidosea_admin_session')?.value === 'authenticated';

    return <AdminLayoutClient isAuth={isAuth}>{children}</AdminLayoutClient>;
}
