'use client';
import { motion } from 'framer-motion';

export default function Markets() {
    const regions = [
        { name: "Europe", desc: "High-yield refining hubs for gasoline and distillates." },
        { name: "United States", desc: "Strategic supply for Gulf Coast and East Coast refineries." },
        { name: "Asia", desc: "Growing demand in emerging industrial and energy sectors." },
        { name: "Emerging Markets", desc: "Facilitating energy security in developing economies." }
    ];

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4 block">Global Footprint</span>
                        <h2 className="text-4xl font-bold text-brand-navy mb-8 uppercase">Markets Served</h2>
                        <div className="space-y-8">
                            {regions.map((region, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="border-l border-gray-200 pl-6 group"
                                >
                                    <h3 className="text-brand-navy font-bold text-sm uppercase mb-2 group-hover:text-brand-orange transition-colors">{region.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{region.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-square lg:aspect-video bg-brand-navy rounded-sm overflow-hidden group">
                        <img
                            src="/images/refinery-sunset.jpg"
                            alt="Global Refining"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>

                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 border-2 border-brand-orange/20 rounded-full animate-ping absolute top-1/2 left-1/2 -ml-12 -mt-12"></div>
                                <div className="w-4 h-4 bg-brand-orange rounded-full relative z-10 shadow-[0_0_20px_rgba(255,95,31,0.5)] mx-auto"></div>
                                <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mt-8">Institutional Trade Flow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
