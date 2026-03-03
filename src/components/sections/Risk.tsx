'use client';
import { motion } from 'framer-motion';

export default function Risk() {
    const matrix = [
        { risk: "Title Fraud", mitigation: "Strict verification of mandate chain and government allocation letters." },
        { risk: "Payment Default", mitigation: "Transactions secured via non-transferable, confirmed LC or SBLC structures." },
        { risk: "Operational Variance", mitigation: "Independent inspection (SGS/Saybolt) at both load and discharge ports." },
        { risk: "Regulatory Delays", mitigation: "Pre-clearance management with NUPRC and customs synchronization." }
    ];

    return (
        <section id="compliance" className="bg-brand-white py-24 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4 block">Security & Trust</span>
                    <h2 className="text-4xl font-bold text-brand-navy uppercase mb-4">Risk & Compliance Framework</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                        Institutional trading requires rigorous oversight. Our framework references OFAC, EU, and UK sanctions screening to ensure absolute transaction integrity.
                    </p>
                </div>

                <div className="hidden md:block overflow-hidden border border-gray-200 rounded-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-navy text-white uppercase text-[10px] tracking-widest">
                                <th className="px-8 py-6 font-bold">Risk Factor</th>
                                <th className="px-8 py-6 font-bold">Mitigation Strategy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {matrix.map((item, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
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
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {matrix.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-50 p-6 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-1.5 bg-brand-orange"></div>
                                <h3 className="text-brand-navy font-bold uppercase text-xs tracking-wider">{item.risk}</h3>
                            </div>
                            <p className="text-gray-600 text-[10px] leading-relaxed font-light">
                                <span className="text-brand-navy font-bold block mb-1">Mitigation Strategy:</span>
                                {item.mitigation}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
