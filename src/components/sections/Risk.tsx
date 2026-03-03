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

                <div className="overflow-hidden border border-gray-200 rounded-sm">
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
            </div>
        </section>
    );
}
