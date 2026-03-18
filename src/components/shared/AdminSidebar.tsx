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
    ChevronRight,
    Briefcase,
    Settings,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
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
        { href: "/admin/leads", icon: ArrowUpRight, label: "Form Submissions", badge: pendingCount },
        { href: "/admin/applications", icon: Briefcase, label: "Job Applications" },
        { href: "/admin/compliance", icon: Shield, label: "Risk Matrix" },
        { href: "/admin/markets", icon: Globe, label: "Global Markets" },
        { href: "/admin/users", icon: Settings, label: "Admin Management" },
    ];

    const sidebarVariants = {
        expanded: { width: 280 },
        collapsed: { width: 80 },
        mobileOpen: { x: 0 },
        mobileClosed: { x: '-100%' }
    };

    return (
        <>
            {/* Mobile Header - Sleek Glassmorphism */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-[60] flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-sm italic">S</span>
                    </div>
                    <span className="font-black text-brand-navy tracking-tighter uppercase text-sm">Sidosea <span className="text-brand-orange font-light">Admin</span></span>
                </div>
                <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 text-brand-navy hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[70]"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <motion.aside
                initial={false}
                variants={sidebarVariants}
                animate={typeof window !== 'undefined' && window.innerWidth < 1024 ? (isMobileOpen ? 'mobileOpen' : 'mobileClosed') : (isCollapsed ? 'collapsed' : 'expanded')}
                className={`fixed lg:sticky top-0 left-0 h-screen bg-brand-navy text-white z-[80] shadow-2xl flex flex-col transition-all duration-300 ease-in-out border-r border-white/5`}
            >
                {/* Logo Section */}
                <div className={`p-6 border-b border-white/5 flex items-center h-20 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-[#ff7a00] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                            <span className="text-white font-black text-lg italic">S</span>
                        </div>
                        {!isCollapsed && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col"
                            >
                                <span className="font-black tracking-tighter uppercase text-sm leading-none">Sidosea</span>
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Logistics Admin</span>
                            </motion.div>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-2 text-white/60 hover:text-white">
                        <X size={20} />
                    </button>
                    {/* Desktop Collapse Button */}
                    {!isMobileOpen && (
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex p-2 text-white/20 hover:text-brand-orange transition-colors"
                        >
                            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`relative flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            >
                                <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    <item.icon size={22} className={isActive ? "text-brand-orange" : "group-hover:text-white"} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                {!isCollapsed && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex-1 flex justify-between items-center whitespace-nowrap"
                                    >
                                        <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-inherit'}`}>
                                            {item.label}
                                        </span>
                                        {item.badge !== undefined && item.badge > 0 && (
                                            <span className="bg-brand-orange text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-lg shadow-brand-orange/20 animate-pulse">
                                                {item.badge}
                                            </span>
                                        )}
                                    </motion.div>
                                )}
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeIndicator"
                                        className="absolute left-0 w-1 h-8 bg-brand-orange rounded-r-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    {!isCollapsed && (
                        <div className="px-4 py-3 bg-white/5 rounded-2xl mb-4 flex items-center gap-3 border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <Settings size={14} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">System Status</span>
                                <span className="text-[9px] text-green-400 flex items-center gap-1">
                                    <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" /> Global Operations Live
                                </span>
                            </div>
                        </div>
                    )}
                    
                    <form action="/api/auth/logout" method="POST">
                        <button 
                            type="submit" 
                            className={`flex items-center gap-4 p-3.5 w-full text-white/40 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:text-red-400 hover:bg-red-400/5 transition-all group ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <LogOut size={18} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                            {!isCollapsed && <span>Sign Out</span>}
                        </button>
                    </form>
                </div>
            </motion.aside>
        </>
    );
}
