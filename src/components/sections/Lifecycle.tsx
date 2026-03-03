'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Lifecycle() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const steps = [
        { title: "Allocation Validation", desc: "Rigorous vetting of government-backed crude allocations to ensure supply continuity." },
        { title: "Commercial Structuring", desc: "Developing secure SPA terms aligned with international maritime and trading law." },
        { title: "Regulatory Compliance", desc: "Vessel vetting, OFAC screening, and NUPRC pre-clearance management." },
        { title: "Lifting Coordination", desc: "Strategic management of vessel nominatons and terminal loading windows." },
        { title: "Documentation Execution", desc: "Generation of verified POP, Bill of Lading, and Quality/Quantity reports." },
        { title: "Financial Settlement", desc: "Structured payment release through institutional banking and LC/SBLC mechanisms." }
    ];

    return (
        <section id="services" className="bg-brand-navy py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 md:mb-16 text-center md:text-left">
                    <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Transaction Blueprint</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">The Lifecycle of a Secure Trade</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px bg-white/10 border border-white/10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setActiveStep(i)}
                            onMouseLeave={() => setActiveStep(null)}
                            onClick={() => setActiveStep(activeStep === i ? null : i)}
                            className="relative bg-brand-navy p-6 md:p-8 h-64 md:h-80 flex flex-col justify-between cursor-pointer group transition-all duration-500 overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 bg-brand-orange transition-all duration-500 ${activeStep === i ? 'h-full' : 'h-0 group-hover:h-full'}`}></div>

                            <div className="relative z-10">
                                <span className={`text-brand-orange font-mono text-3xl md:text-4xl font-bold block mb-4 md:mb-6 transition-opacity ${activeStep === i ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>0{i + 1}</span>
                                <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-wider leading-relaxed">{step.title}</h3>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: activeStep === i ? 1 : 0,
                                    y: activeStep === i ? 0 : 20
                                }}
                                className="relative z-10"
                            >
                                <p className="text-white/60 text-[10px] md:text-xs leading-relaxed">{step.desc}</p>
                            </motion.div>

                            {/* Decorative Number Background */}
                            <div className="absolute -bottom-10 -right-10 text-[8rem] md:text-[10rem] font-bold text-white/[0.02] pointer-events-none group-hover:text-white/[0.05] transition-all">
                                {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
