'use client';
import { useState, useEffect } from 'react';
import { Loader2, Save, ShieldCheck, AlertTriangle, Plus, Trash2 } from 'lucide-react';

export default function ComplianceAdmin() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
    };

    const addRisk = () => {
        const newRisk = { risk: "New Risk Factor", mitigation: "Strategy details..." };
        setContent({ ...content, risk_matrix: [...content.risk_matrix, newRisk] });
    };

    const removeRisk = (index: number) => {
        const newMatrix = content.risk_matrix.filter((_: any, i: number) => i !== index);
        setContent({ ...content, risk_matrix: newMatrix });
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Risk & Compliance</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage the institutional risk mitigation framework.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Matrix
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-navy flex items-center gap-2">
                        <ShieldCheck size={16} className="text-brand-orange" /> Active Risk Factors
                    </h3>
                    <button onClick={addRisk} className="text-[10px] font-bold uppercase text-brand-orange flex items-center gap-1 hover:underline">
                        <Plus size={14} /> Add Factor
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {content.risk_matrix.map((item: any, index: number) => (
                        <div key={index} className="p-6 group hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle size={14} className="text-brand-orange" />
                                        <input
                                            value={item.risk}
                                            onChange={e => {
                                                const newMatrix = [...content.risk_matrix];
                                                newMatrix[index].risk = e.target.value;
                                                setContent({ ...content, risk_matrix: newMatrix });
                                            }}
                                            className="bg-transparent font-bold text-brand-navy uppercase text-sm tracking-tight outline-none focus:text-brand-orange w-full"
                                        />
                                    </div>
                                    <textarea
                                        value={item.mitigation}
                                        onChange={e => {
                                            const newMatrix = [...content.risk_matrix];
                                            newMatrix[index].mitigation = e.target.value;
                                            setContent({ ...content, risk_matrix: newMatrix });
                                        }}
                                        className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm text-gray-600 outline-none focus:border-brand-orange h-24 font-light leading-relaxed"
                                    />
                                </div>
                                <button
                                    onClick={() => removeRisk(index)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
