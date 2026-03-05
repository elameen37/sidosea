import { cookies } from "next/headers";
import AdminSidebar from "@/components/shared/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const isAuth = cookieStore.get('sidosea_admin_session')?.value === 'authenticated';

    // Don't wrap login page with admin layout
    if (!isAuth) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex overflow-x-hidden">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
