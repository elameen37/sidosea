'use client';
import { motion } from 'framer-motion';

export default function MarketTicker() {
    const prices = [
        { label: "Brent Crude", value: "$82.45", change: "+1.2%", up: true },
        { label: "WTI Crude", value: "$78.12", change: "+0.8%", up: true },
        { label: "Bonny Light", value: "$84.90", change: "-0.3%", up: false },
        { label: "Heating Oil", value: "$2.65", change: "+1.5%", up: true },
        { label: "Natural Gas", value: "$1.82", change: "-2.1%", up: false },
        { label: "Gas Oil", value: "$812.25", change: "+0.4%", up: true }
    ];

    // Duplicate list for infinite scroll
    const scrollingPrices = [...prices, ...prices, ...prices];

    return (
        <div className="bg-brand-navy/95 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden z-40">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1920] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-12 md:gap-24 items-center pl-12"
                >
                    {scrollingPrices.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-white/40 font-bold uppercase text-[10px] tracking-widest">{item.label}</span>
                            <span className="text-white font-mono text-xs md:text-sm font-bold">{item.value}</span>
                            <span className={`text-[10px] font-bold ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                                {item.up ? '▲' : '▼'} {item.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
