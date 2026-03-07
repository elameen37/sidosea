'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Shield,
    Globe,
    LogOut,
    ArrowUpRight,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const fetchPendingCount = () => {
            fetch('/api/leads')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setPendingCount(data.filter((l: any) => l.status === 'pending').length);
                    }
                })
                .catch(err => console.error(err));
        };

        fetchPendingCount();
        const interval = setInterval(fetchPendingCount, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard", color: "text-brand-orange" },
        { href: "/admin/content", icon: FileText, label: "Content Editor" },
        { href: "/admin/leads", icon: ArrowUpRight, label: "Form Submissions" },
        { href: "/admin/compliance", icon: Shield, label: "Risk Matrix" },
        { href: "/admin/markets", icon: Globe, label: "Global Markets" },
    ];

    return (
        <>
            {/* Desktop Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-brand-navy text-white p-2 rounded-r-lg border border-white/10 shadow-xl hover:bg-brand-orange transition-all duration-300"
                style={{ left: isOpen ? '256px' : '0' }}
            >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-brand-navy text-white p-4 rounded-full shadow-2xl border border-white/10"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <motion.aside
                initial={false}
                animate={{
                    width: isOpen ? 256 : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`bg-brand-navy text-white flex flex-col shrink-0 overflow-hidden relative z-40 h-screen lg:sticky lg:top-0 ${!isOpen && 'lg:hidden'} lg:flex`}
            >
                <div className="w-64 flex flex-col h-full">
                    <div className="p-8 border-b border-white/5 flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-orange flex items-center justify-center">
                            <span className="text-white font-bold text-xs">S</span>
                        </div>
                        <span className="font-bold text-sm tracking-tight uppercase">Admin <span className="font-light">Panel</span></span>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 text-sm rounded-sm transition-colors group ${pathname === item.href ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
                                onClick={() => {
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                            >
                                <item.icon size={16} className={pathname === item.href ? (item.color || "text-brand-orange") : "group-hover:text-white transition-colors"} />
                                <span className={pathname === item.href ? "text-white font-bold flex-1" : "group-hover:text-white transition-colors flex-1"}>{item.label}</span>
                                {item.href === '/admin/leads' && pendingCount > 0 && (
                                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {pendingCount}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/5">
                        <form action="/api/auth/logout" method="POST">
                            <button type="submit" className="flex items-center gap-3 p-3 w-full text-white/40 text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">
                                <LogOut size={14} /> Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Overlay - Only when open on mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-transparent z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
