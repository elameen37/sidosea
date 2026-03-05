'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ValueBlocks() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    const blocks = [
        {
            title: "Verified Allocation Access",
            desc: "Direct access to state-approved crude oil allocations with full chain-of-custody verification."
        },
        {
            title: "End-to-End Documentation",
            desc: "Comprehensive management of SPA, POP, and shipping documents under international maritime law."
        },
        {
            title: "Regulatory Compliance",
            desc: "Strict adherence to NNPC, NUPRC, and international OFAC/sanctions screening protocols."
        },
        {
            title: "International Buyer Support",
            desc: "Bridging the gap between West African production and global refinery requirements."
        }
    ];

    return (
        <section ref={sectionRef} className="bg-white py-16 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    style={{ y }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {blocks.map((block, i) => (
                        <div key={i} className="group cursor-default bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                            <div className="w-12 h-1 bg-brand-orange mb-6 group-hover:w-full transition-all duration-500"></div>
                            <h3 className="text-brand-navy font-bold text-sm md:text-lg mb-4 uppercase tracking-tight">{block.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-[10px] md:text-sm font-light">{block.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
