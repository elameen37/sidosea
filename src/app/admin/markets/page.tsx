'use client';
import { useState, useEffect } from 'react';
import { 
    Loader2, Save, TrendingUp, ArrowUp, ArrowDown, Plus, 
    Trash2, RefreshCw, X, ChevronRight, Activity, Globe,
    DollarSign, BarChart3, Clock, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

export default function MarketsAdmin() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                setContent(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/content', {
                method: 'POST',
                body: JSON.stringify(content),
            });
            setShowSaved(true);
        } catch (err: any) {
            alert('Save failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const addPrice = () => {
        const newPrice = { label: "NEW COMMODITY", value: "$0.00", change: "+0.00%", up: true };
        setContent({ ...content, market_prices: [...content.market_prices, newPrice] });
    };

    const removePrice = (index: number) => {
        const newPrices = content.market_prices.filter((_: any, i: number) => i !== index);
        setContent({ ...content, market_prices: newPrices });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-black text-brand-navy uppercase tracking-widest animate-pulse">Synchronizing Global Tickers...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Global market tickers synchronized and broadcasted to institutional dashboards." />

            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Global Markets</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Institutional Commodity Pricing & Liquidity Tickers</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <button
                        onClick={addPrice}
                        className="flex-1 xl:flex-none px-8 py-4 bg-gray-50 text-brand-navy border border-transparent hover:border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                        <Plus size={16} /> Add Asset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 xl:flex-none px-10 py-4 bg-brand-orange text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Transmitting...' : 'Commit Updates'}
                    </button>
                </div>
            </div>

            {/* Market Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {(content.market_prices || []).map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                            className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-brand-orange/20 hover:shadow-2xl hover:shadow-brand-navy/5 transition-all relative group overflow-hidden"
                        >
                            <div className="mb-8 flex justify-between items-start">
                                <div className="space-y-1.5 flex-1 pr-6">
                                    <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-1.5">
                                        <Globe size={10} className="text-brand-orange" /> Market Identifier
                                    </label>
                                    <input
                                        value={item.label}
                                        onChange={e => {
                                            const newPrices = [...content.market_prices];
                                            newPrices[index].label = e.target.value.toUpperCase();
                                            setContent({ ...content, market_prices: newPrices });
                                        }}
                                        className="w-full bg-transparent p-0 border-none font-black text-brand-navy uppercase text-lg tracking-tight focus:ring-0 outline-none"
                                        placeholder="e.g. BRENT CRUDE"
                                    />
                                </div>
                                <button
                                    onClick={() => removePrice(index)}
                                    className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 bg-gray-50 rounded-[1.5rem] p-6 mb-2 border border-black/[0.02]">
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-1.5">
                                        <DollarSign size={10} className="text-green-500" /> Unit Price
                                    </label>
                                    <input
                                        value={item.value}
                                        onChange={e => {
                                            const newPrices = [...content.market_prices];
                                            newPrices[index].value = e.target.value;
                                            setContent({ ...content, market_prices: newPrices });
                                        }}
                                        className="w-full bg-transparent border-none p-0 text-sm font-black text-brand-navy font-mono focus:ring-0 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-1.5">
                                        <BarChart3 size={10} className="text-blue-500" /> 24H Delta
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={item.change}
                                            onChange={e => {
                                                const newPrices = [...content.market_prices];
                                                newPrices[index].change = e.target.value;
                                                setContent({ ...content, market_prices: newPrices });
                                            }}
                                            className={`w-full bg-transparent border-none p-0 text-sm font-black font-mono focus:ring-0 outline-none ${item.up ? 'text-green-600' : 'text-red-500'}`}
                                        />
                                        <button
                                            onClick={() => {
                                                const newPrices = [...content.market_prices];
                                                newPrices[index].up = !newPrices[index].up;
                                                setContent({ ...content, market_prices: newPrices });
                                            }}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${item.up ? 'bg-green-100 text-green-600 rotate-0' : 'bg-red-50 text-red-500 rotate-180'}`}
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Background decoration */}
                            <Zap className="absolute -bottom-6 -left-6 text-brand-orange/[0.03]" size={100} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {(!content.market_prices || content.market_prices.length === 0) && (
                    <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-100 text-center flex flex-col items-center justify-center gap-6">
                        <Activity size={64} className="text-gray-100" />
                        <div>
                            <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest">Market Feed Offline</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic">No asset tickers currently active across terminal deployments.</p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="bg-brand-navy p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-brand-orange">
                        <Clock size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter">Ticker Distribution</h4>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Global Broadcast Frequency: Real-time Synchronized</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-gray-800 flex items-center justify-center text-[10px] font-black text-white">
                                {i}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Broadcast Active on {content.market_prices?.length || 0} nodes</p>
                </div>
            </div>
        </div>
    );
}
