'use client';
import { motion } from 'framer-motion';

export default function Partners() {
    const partners = [
        { name: "NNPC", logo: "NNPC" },
        { name: "NUPRC", logo: "NUPRC" },
        { name: "SGS", logo: "SGS" },
        { name: "Saybolt", logo: "Saybolt" },
        { name: "Vitol", logo: "Vitol" },
        { name: "Trafigura", logo: "Trafigura" }
    ];

    return (
        <section className="bg-white py-12 md:py-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">Institutional Network</span>
                    <h2 className="text-xl md:text-2xl font-bold text-brand-navy uppercase tracking-tight">Verified Partners & Stakeholders</h2>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-50 px-8 py-4 rounded-xl border border-gray-100 min-w-[140px] flex items-center justify-center hover:bg-white hover:shadow-md transition-all group"
                        >
                            <span className="text-brand-navy font-black text-lg md:text-xl tracking-tighter group-hover:text-brand-orange transition-colors">{partner.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
