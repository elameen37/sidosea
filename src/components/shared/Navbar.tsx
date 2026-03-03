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
                        <span className="text-white font-bold text-lg md:text-xl tracking-tight uppercase">SIDOSEA <span className="font-light">Logistics</span></span>
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
                        <Link href="#about" className="hover:text-brand-orange transition-colors">About</Link>
                        <Link href="#services" className="hover:text-brand-orange transition-colors">Services</Link>
                        <Link href="#compliance" className="hover:text-brand-orange transition-colors">Compliance</Link>
                        <Link href="#contact" className="btn-primary py-2 px-6">Request Supply</Link>
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
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 text-white/80 font-medium text-sm tracking-wide uppercase pb-4">
                                <Link onClick={toggleMenu} href="#about" className="hover:text-brand-orange transition-colors block py-2">About</Link>
                                <Link onClick={toggleMenu} href="#services" className="hover:text-brand-orange transition-colors block py-2">Services</Link>
                                <Link onClick={toggleMenu} href="#compliance" className="hover:text-brand-orange transition-colors block py-2">Compliance</Link>
                                <Link onClick={toggleMenu} href="#contact" className="btn-primary py-3 text-center mt-2 w-full">Request Supply</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
