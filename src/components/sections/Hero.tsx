'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const images = [
    '/images/2.jpg',
    '/images/3.jpg'
];

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [socials, setSocials] = useState<any>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => setSocials(data.socials));
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] md:min-h-screen flex items-center bg-brand-navy overflow-hidden pt-32 pb-64 md:pt-24 md:pb-24">
            {/* Background Images Slider */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                y,
                                scale: 1.1,
                                backgroundImage: `url(${images[index]})`
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Global Background Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/60 to-transparent z-10"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20 md:py-0 flex flex-col md:flex-row items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
                >
                    <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 block">Institutional Crude Supply</span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase tracking-tight">
                        Secure, Compliant Access to Nigerian <span className="text-brand-orange">Bonny Light </span>Crude
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
                        Verified allocations. Structured lifting. Global delivery. <br className="hidden md:block" />
                        The gateway for institutional buyers to West African energy markets.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a href="#contact" className="btn-primary text-center py-4 px-8 text-xs font-bold tracking-widest">Request Supply Discussion</a>
                        <a href="/profile.pdf" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-navy text-center py-4 px-8 text-xs font-bold tracking-widest">Download Corporate Profile</a>
                    </div>
                </motion.div>

                {/* Social Links on Hero */}
                {socials && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden md:flex flex-col gap-8 items-center border-l border-white/10 pl-12"
                    >
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Connect with Us</h4>
                        <div className="h-20 w-px bg-brand-orange/30" />
                        <div className="flex flex-col gap-6">
                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-orange transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-orange transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-orange transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Mobile Socials */}
            {socials && (
                <div className="md:hidden absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-8">
                    <a href={socials.linkedin} className="text-white/50 hover:text-brand-orange transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href={socials.facebook} className="text-white/50 hover:text-brand-orange transition-colors">
                        <Facebook size={18} />
                    </a>
                    <a href={socials.instagram} className="text-white/50 hover:text-brand-orange transition-colors">
                        <Instagram size={18} />
                    </a>
                </div>
            )}

            {/* Decorative Accent */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-navy to-transparent z-20"></div>
        </section>
    );
}
