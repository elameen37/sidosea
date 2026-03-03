'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Animation variants for individual letters to create a wave effect
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: { duration: 0.5, ease: 'easeInOut' }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', damping: 12, stiffness: 200 }
        }
    };

    const text = "SIDOSEA Logistics".split("");

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loader"
                    initial="show"
                    animate="show"
                    exit="exit"
                    variants={containerVariants}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-navy"
                >
                    {/* Subtle background pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[500px] h-[500px] bg-brand-orange rounded-full blur-[150px] opacity-20 pointer-events-none"
                    />

                    <div className="flex space-x-1 relative z-10 overflow-hidden text-white font-bold text-3xl md:text-5xl tracking-widest uppercase">
                        {text.map((char, index) => (
                            <motion.span
                                key={index}
                                variants={letterVariants}
                                className={char === " " ? "w-4" : ""}
                                style={{ color: index < 7 ? 'var(--neon-orange)' : 'white' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="w-48 h-0.5 bg-brand-orange mt-8 origin-left"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
