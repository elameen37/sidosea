'use client';
import { motion } from 'framer-motion';

export default function About() {
    const specs = [
        { label: "API Gravity", value: "32–35°" },
        { label: "Sulfur Content", value: "~0.14%" },
        { label: "Market Premium", value: "Premium to Brent" },
        { label: "Primary Yields", value: "Gasoline & Distillates" }
    ];

    return (
        <section id="about" className="bg-brand-white py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4 block">Our Identity</span>
                    <h2 className="text-4xl font-bold text-brand-navy mb-8 uppercase leading-tight">
                        A Structured Transaction Facilitator for Global Energy
                    </h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed font-light">
                        <p>
                            SIDOSEA Logistics operates as a high-authority crude supply operator, bridging the gap between Nigerian production and international refinery demand. We specialize in the facilitation of Bonny Light Crude Oil (BLCO).
                        </p>
                        <p>
                            Our operations are compliance-led, ensuring every lifting is backed by verified allocation access and rigorous regulatory adherence. We provide a transparent, institutional-grade gateway for large-scale energy traders.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-brand-navy p-10 rounded-sm shadow-2xl relative overflow-hidden group"
                >
                    {/* Subtle Background Image Overlay */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                        <img src="/images/inspection-lab.jpg" alt="Quality Control" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full -mr-16 -mt-16"></div>
                    <h3 className="relative z-10 text-white font-bold text-xl mb-8 uppercase tracking-widest border-b border-white/10 pb-4">
                        Bonny Light Technical Profile
                    </h3>
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {specs.map((spec, i) => (
                            <div key={i} className="border-l-2 border-brand-orange pl-6">
                                <span className="text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold block mb-1">{spec.label}</span>
                                <span className="text-white font-mono text-xl">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 mt-12 p-4 bg-white/5 rounded-sm border border-white/10">
                        <p className="text-white/60 text-xs leading-relaxed italic">
                            &quot;High gasoline and distillate yields. Strong demand across European, North American, and Asian refining hubs.&quot;
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
