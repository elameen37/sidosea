import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LayoutDashboard, FileText, Shield, Globe, LogOut, ArrowUpRight } from "lucide-react";

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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-navy text-white flex flex-col shrink-0">
                <div className="p-8 border-b border-white/5 flex items-center gap-2">
                    <div className="w-6 h-6 bg-brand-orange flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                    </div>
                    <span className="font-bold text-sm tracking-tight uppercase">Admin <span className="font-light">Panel</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 p-3 bg-white/5 rounded-sm text-sm hover:bg-white/10 transition-colors">
                        <LayoutDashboard size={16} className="text-brand-orange" /> Dashboard
                    </Link>
                    <Link href="/admin/content" className="flex items-center gap-3 p-3 text-white/60 text-sm hover:bg-white/5 rounded-sm transition-colors">
                        <FileText size={16} /> Content Editor
                    </Link>
                    <Link href="/admin/leads" className="flex items-center gap-3 p-3 text-white/60 text-sm hover:bg-white/5 rounded-sm transition-colors">
                        <ArrowUpRight size={16} /> Form Submissions
                    </Link>
                    <Link href="/admin/compliance" className="flex items-center gap-3 p-3 text-white/60 text-sm hover:bg-white/5 rounded-sm transition-colors">
                        <Shield size={16} /> Risk Matrix
                    </Link>
                    <Link href="/admin/markets" className="flex items-center gap-3 p-3 text-white/60 text-sm hover:bg-white/5 rounded-sm transition-colors">
                        <Globe size={16} /> Global Markets
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function LogoutButton() {
    return (
        <form action="/api/auth/logout" method="POST">
            <button type="submit" className="flex items-center gap-3 p-3 w-full text-white/40 text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">
                <LogOut size={14} /> Sign Out
            </button>
        </form>
    );
}
