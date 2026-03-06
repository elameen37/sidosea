'use client';
import { useState, useEffect } from 'react';
import { Loader2, Save, TrendingUp, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
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
        await fetch('/api/content', {
            method: 'POST',
            body: JSON.stringify(content),
        });
        setSaving(false);
        setShowSaved(true);
    };

    const addPrice = () => {
        const newPrice = { label: "New Asset", value: "$0.00", change: "+0.0%", up: true };
        setContent({ ...content, market_prices: [...content.market_prices, newPrice] });
    };

    const removePrice = (index: number) => {
        const newPrices = content.market_prices.filter((_: any, i: number) => i !== index);
        setContent({ ...content, market_prices: newPrices });
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Market tickers updated and published to the live site." />

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Global Markets</h1>
                    <p className="text-gray-500 text-sm mt-1">Update live market tickers and crude oil benchmarks.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Tickers
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-navy flex items-center gap-2">
                        <TrendingUp size={16} className="text-brand-orange" /> Real-time Price Feeds
                    </h3>
                    <button onClick={addPrice} className="text-[10px] font-bold uppercase text-brand-orange flex items-center gap-1 hover:underline">
                        <Plus size={14} /> Add Asset
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.market_prices.map((item: any, index: number) => (
                        <div key={index} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/30 space-y-4 group relative">
                            <button
                                onClick={() => removePrice(index)}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>

                            <div>
                                <label className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Asset Name</label>
                                <input
                                    value={item.label}
                                    onChange={e => {
                                        const newPrices = [...content.market_prices];
                                        newPrices[index].label = e.target.value;
                                        setContent({ ...content, market_prices: newPrices });
                                    }}
                                    className="w-full bg-transparent font-bold text-gray-500 uppercase text-sm outline-none focus:text-brand-orange"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Price</label>
                                    <input
                                        value={item.value}
                                        onChange={e => {
                                            const newPrices = [...content.market_prices];
                                            newPrices[index].value = e.target.value;
                                            setContent({ ...content, market_prices: newPrices });
                                        }}
                                        className="w-full bg-white border border-gray-100 p-2 rounded-lg text-xs font-mono font-bold text-gray-500 outline-none focus:border-brand-orange"
                                    />
                                </div>
                                <div>
                                    <label className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Change</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={item.change}
                                            onChange={e => {
                                                const newPrices = [...content.market_prices];
                                                newPrices[index].change = e.target.value;
                                                setContent({ ...content, market_prices: newPrices });
                                            }}
                                            className="w-full bg-white border border-gray-100 p-2 rounded-lg text-xs font-mono font-bold outline-none focus:border-brand-orange"
                                        />
                                        <button
                                            onClick={() => {
                                                const newPrices = [...content.market_prices];
                                                newPrices[index].up = !newPrices[index].up;
                                                setContent({ ...content, market_prices: newPrices });
                                            }}
                                            className={`p-2 rounded-lg transition-colors ${item.up ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                        >
                                            {item.up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
