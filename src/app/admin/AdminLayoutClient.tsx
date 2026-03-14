'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from "@/components/shared/AdminSidebar";
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({
    children,
    isAuth
}: {
    children: React.ReactNode;
    isAuth: boolean;
}) {
    const pathname = usePathname();

    // Don't wrap login page with admin layout
    if (!isAuth) {
        return <>{children}</>;
    }

    const getPageTitle = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        if (segments.length <= 1) return 'Dashboard';
        const last = segments[segments.length - 1];
        return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex overflow-x-hidden pt-16 lg:pt-0">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Sleek Top Header - Hidden on mobile as sidebar header takes over */}
                <header className="hidden lg:flex h-20 items-center justify-between px-10 bg-white/50 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
                    <div>
                        <h2 className="text-xl font-black text-brand-navy tracking-tight">{getPageTitle(pathname)}</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Sidosea Logistics Management</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-brand-orange transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search everything..." 
                                className="bg-gray-100/50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-brand-orange/20 transition-all w-64"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                            <button className="p-2.5 text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-white" />
                            </button>
                            
                            <button className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                                <div className="w-9 h-9 bg-brand-navy rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-navy/10">
                                    <User size={18} />
                                </div>
                                <div className="text-left hidden xl:block">
                                    <p className="text-xs font-bold text-brand-navy">Administrator</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Super Admin access</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6 lg:p-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
