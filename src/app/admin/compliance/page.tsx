'use client';
import { useState, useEffect } from 'react';
import { 
    Loader2, Save, ShieldCheck, AlertTriangle, Plus, 
    Trash2, ShieldAlert, CheckCircle2, Info, ChevronRight,
    RefreshCw, X, HelpCircle, Activity, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

export default function ComplianceAdmin() {
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

    const addRisk = () => {
        const newRisk = { risk: "NEW RISK FACTOR", mitigation: "Strategy implementation details..." };
        setContent({ ...content, risk_matrix: [...content.risk_matrix, newRisk] });
    };

    const removeRisk = (index: number) => {
        const newMatrix = content.risk_matrix.filter((_: any, i: number) => i !== index);
        setContent({ ...content, risk_matrix: newMatrix });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-black text-brand-navy uppercase tracking-widest animate-pulse">Loading Risk Framework...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Corporate risk framework updated and synchronized with institutional standards." />

            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Compliance Matrix</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Institutional Risk & Governance Framework</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <button
                        onClick={addRisk}
                        className="flex-1 xl:flex-none px-8 py-4 bg-gray-50 text-brand-navy border border-transparent hover:border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                        <Plus size={16} /> Append Factor
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 xl:flex-none px-10 py-4 bg-brand-orange text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Synchronizing...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Risk Items Grid */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {content.risk_matrix.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                            className="group bg-white rounded-[2.5rem] border-2 border-gray-50 hover:border-brand-orange/20 hover:shadow-2xl hover:shadow-brand-navy/5 transition-all p-8 md:p-10 relative overflow-hidden"
                        >
                            <div className="flex flex-col lg:flex-row gap-10">
                                <div className="flex-none flex items-start">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-orange group-hover:bg-brand-navy group-hover:text-white transition-all duration-500">
                                        <ShieldAlert size={24} />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                                             Risk Identifier <Activity size={10} className="text-brand-orange" />
                                        </label>
                                        <input
                                            value={item.risk}
                                            onChange={e => {
                                                const newMatrix = [...content.risk_matrix];
                                                newMatrix[index].risk = e.target.value;
                                                setContent({ ...content, risk_matrix: newMatrix });
                                            }}
                                            placeholder="Enter risk factor name..."
                                            className="w-full bg-transparent border-b-2 border-gray-100 py-3 text-lg font-black text-brand-navy uppercase tracking-tight focus:border-brand-orange transition-colors outline-none placeholder:text-gray-200"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                                            Institutional Mitigation Strategy <CheckCircle2 size={10} className="text-green-500" />
                                        </label>
                                        <textarea
                                            value={item.mitigation}
                                            onChange={e => {
                                                const newMatrix = [...content.risk_matrix];
                                                newMatrix[index].mitigation = e.target.value;
                                                setContent({ ...content, risk_matrix: newMatrix });
                                            }}
                                            placeholder="Details on how this risk is mitigated..."
                                            className="form-textarea-premium"
                                        />
                                    </div>
                                </div>

                                <div className="flex-none flex lg:flex-col items-center justify-center gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10">
                                    <button
                                        onClick={() => removeRisk(index)}
                                        className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group/del"
                                        title="Purge Factor"
                                    >
                                        <Trash2 size={20} className="group-hover/del:rotate-12 transition-transform" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Decorative background number */}
                            <span className="absolute -bottom-10 -right-6 text-[12rem] font-black text-gray-50/50 select-none pointer-events-none">
                                {index + 1}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {content.risk_matrix.length === 0 && (
                    <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-100 text-center flex flex-col items-center justify-center gap-6">
                        <ShieldCheck size={64} className="text-gray-100" />
                        <div>
                            <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest">Safe Perimeter Established</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic">No active risk factors currently recorded in the framework.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
