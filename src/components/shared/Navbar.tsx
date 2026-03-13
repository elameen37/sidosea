'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-navy/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Desktop & Mobile Header Row */}
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
                            <span className="text-white font-bold text-xs">S</span>
                        </div>
                        <span className="text-white font-bold text-base md:text-xl tracking-tight uppercase">SIDOSEA <span className="font-light">Logistics</span></span>
                    </Link>

                    {/* Markets Open Indicator (Visible on Desktop & Mobile) */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                        />
                        <span className="text-green-500 text-[10px] font-bold tracking-widest uppercase"> MARKETS OPEN</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-white/80 font-medium text-sm tracking-wide uppercase">
                        <Link href="/#services" className="hover:text-brand-orange transition-colors">Services</Link>
                        <Link href="/#compliance" className="hover:text-brand-orange transition-colors">Compliance</Link>
                        
                        {/* MORE Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-brand-orange transition-colors uppercase outline-none focus:outline-none">
                                More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                            <div className="absolute top-full left-0 mt-6 w-56 bg-brand-navy border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col pt-2 pb-2 rounded-sm before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
                                <Link href="/#about" className="px-6 py-4 hover:bg-white/5 hover:text-brand-orange transition-colors">About</Link>
                                <Link href="/career" className="px-6 py-4 hover:bg-white/5 hover:text-brand-orange transition-colors">Career</Link>
                                <Link href="/#contact-info" className="px-6 py-4 hover:bg-white/5 hover:text-brand-orange transition-colors">Global Presence</Link>
                            </div>
                        </div>

                        <Link href="/#contact" className="btn-primary py-2 px-6">Request Supply</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <div className="flex sm:hidden items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-full">
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                            />
                            <span className="text-green-500 text-[9px] font-bold tracking-widest uppercase">OPEN</span>
                        </div>
                        <button onClick={toggleMenu} className="text-white p-2">
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            {/* Backdrop shadow */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="md:hidden fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[-1]"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                className="md:hidden absolute top-full left-4 right-4 mt-2 bg-brand-navy border border-white/10 shadow-2xl overflow-hidden rounded-sm"
                            >
                                <div className="p-8 flex flex-col gap-6 text-white/90 font-medium text-sm tracking-[0.2em] uppercase">
                                    <Link onClick={toggleMenu} href="/#services" className="hover:text-brand-orange transition-colors flex items-center justify-between group">
                                        Services <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-white/20 group-hover:text-brand-orange"> → </motion.div>
                                    </Link>
                                    <Link onClick={toggleMenu} href="/#compliance" className="hover:text-brand-orange transition-colors flex items-center justify-between group">
                                        Compliance <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="text-white/20 group-hover:text-brand-orange"> → </motion.div>
                                    </Link>
                                    
                                    <div className="-mx-8 h-px bg-white/5 my-2" />
                                    <span className="text-white/40 text-[10px] tracking-[0.3em]">MORE</span>
                                    
                                    <Link onClick={toggleMenu} href="/#about" className="pl-4 hover:text-brand-orange transition-colors flex items-center justify-between group">
                                        About <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-white/20 group-hover:text-brand-orange"> → </motion.div>
                                    </Link>
                                    <Link onClick={toggleMenu} href="/career" className="pl-4 hover:text-brand-orange transition-colors flex items-center justify-between group">
                                        Career <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="text-white/20 group-hover:text-brand-orange"> → </motion.div>
                                    </Link>
                                    <Link onClick={toggleMenu} href="/#contact-info" className="pl-4 hover:text-brand-orange transition-colors flex items-center justify-between group">
                                        Global Presence <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }} className="text-white/20 group-hover:text-brand-orange"> → </motion.div>
                                    </Link>

                                    <div className="h-px bg-white/10 my-2" />

                                    <Link onClick={toggleMenu} href="#contact" className="w-full bg-brand-orange text-white py-4 text-center font-bold tracking-[0.3em] hover:bg-white hover:text-brand-navy transition-all active:scale-95">
                                        Request Supply
                                    </Link>

                                    <div className="flex items-center justify-center gap-4 pt-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-green-500 text-[9px] font-bold tracking-[0.3em]">MARKETS OPEN</span>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
