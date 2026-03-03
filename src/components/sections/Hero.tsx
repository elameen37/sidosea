'use client';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center bg-brand-navy overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10"></div>

            {/* Visual background (Nigerian offshore vessel) */}
            <div className="absolute inset-0 bg-[url('/images/tanker-aerial.jpg')] bg-cover bg-center"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Institutional Crude Supply</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Secure, Compliant Access to Nigerian <span className="text-brand-orange">Bonny Light</span> Crude
                    </h1>
                    <p className="text-xl text-white/70 mb-10 leading-relaxed font-light">
                        Verified allocations. Structured lifting. Global delivery. <br />
                        The gateway for institutional buyers to West African energy markets.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#contact" className="btn-primary text-center">Request Supply Discussion</a>
                        <a href="/profile.pdf" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-navy text-center">Download Corporate Profile</a>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Accent */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-navy to-transparent z-20"></div>
        </section>
    );
}
