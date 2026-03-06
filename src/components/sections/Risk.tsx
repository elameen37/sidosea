'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Risk() {
    const [matrix, setMatrix] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => setMatrix(data.risk_matrix || []));
    }, []);

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yHeader = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const yTable = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    return (
        <section id="compliance" ref={sectionRef} className="bg-brand-white py-24 md:py-32 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    style={{ y: yHeader }}
                    className="mb-16 text-center"
                >
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4 block">Security & Trust</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-navy uppercase mb-4">Risk & Compliance Framework</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Institutional trading requires rigorous oversight. Our framework references OFAC, EU, and UK sanctions screening to ensure absolute transaction integrity.
                    </p>
                </motion.div>

                <motion.div
                    style={{ y: yTable }}
                    className="hidden md:block overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-xl"
                >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-navy text-white uppercase text-[10px] tracking-widest">
                                <th className="px-8 py-6 font-bold">Risk Factor</th>
                                <th className="px-8 py-6 font-bold">Mitigation Strategy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {matrix.map((item, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-8 py-8 font-bold text-brand-navy uppercase text-xs tracking-wider w-1/3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-brand-orange"></div>
                                            {item.risk}
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 text-gray-600 text-sm font-light leading-relaxed">
                                        {item.mitigation}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Mobile Card View */}
                <motion.div
                    style={{ y: yTable }}
                    className="md:hidden space-y-4"
                >
                    {matrix.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 p-6 border border-gray-100 rounded-2xl shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-1.5 bg-brand-orange"></div>
                                <h3 className="text-brand-navy font-bold uppercase text-xs tracking-wider">{item.risk}</h3>
                            </div>
                            <p className="text-gray-600 text-[10px] leading-relaxed font-light">
                                <span className="text-brand-navy font-bold block mb-1">Mitigation Strategy:</span>
                                {item.mitigation}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
