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
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                        >
                            Global Footprint
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8 uppercase tracking-tight">Markets Served</h2>
                        <div className="space-y-6 md:space-y-8 text-left max-w-xl mx-auto lg:mx-0">
                            {regions.map((region, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="border-l border-gray-200 pl-4 md:pl-6 group"
                                >
                                    <h3 className="text-brand-navy font-bold text-xs md:text-sm uppercase mb-1 group-hover:text-brand-orange transition-colors tracking-wider">{region.name}</h3>
                                    <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed font-light">{region.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-video lg:aspect-video bg-brand-navy rounded-sm overflow-hidden group">
                        <img
                            src="/images/refinery-sunset.jpg"
                            alt="Global Refining"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>

                        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                            <div className="text-center relative z-10">
                                <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-brand-orange/20 rounded-full animate-ping absolute top-1/2 left-1/2 -ml-8 -mt-8 md:-ml-12 md:-mt-12"></div>
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-brand-orange rounded-full relative z-10 shadow-[0_0_20px_rgba(255,95,31,0.5)] mx-auto"></div>
                                <p className="text-white font-bold text-[8px] md:text-[10px] uppercase tracking-[0.3em] mt-6 md:mt-8">Institutional Trade Flow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
