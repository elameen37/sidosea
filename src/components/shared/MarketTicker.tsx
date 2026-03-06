'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MarketTicker() {
    const [prices, setPrices] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => setPrices(data.market_prices || []));
    }, []);

    if (prices.length === 0) return null;

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
