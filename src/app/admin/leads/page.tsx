'use client';
import { useState, useEffect } from 'react';
import { Loader2, Mail, Building2, Calendar, FileCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadsAdmin() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);

    useEffect(() => {
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Form Submissions</h1>
                <p className="text-gray-500 text-sm mt-1">Review and manage qualified institutional leads.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                    {leads.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                            <p className="text-gray-400">No leads received yet.</p>
                        </div>
                    ) : (
                        leads.map((lead) => (
                            <motion.div
                                key={lead.id}
                                layoutId={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${selectedLead?.id === lead.id ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-gray-100'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-brand-navy">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy uppercase text-sm tracking-tight">{lead.companyName}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] bg-brand-navy text-white px-2 py-0.5 rounded-full font-bold">{lead.bankingInstrument}</span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Calendar size={10} /> {new Date(lead.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${lead.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                        {lead.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="xl:col-span-1">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                key={selectedLead.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-brand-navy text-white p-8 rounded-2xl shadow-2xl sticky top-8"
                            >
                                <h2 className="text-xl font-bold uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Lead Details</h2>

                                <div className="space-y-6">
                                    <DetailItem icon={Building2} label="Company" value={selectedLead.companyName} />
                                    <DetailItem icon={FileCheck} label="License/ID" value={selectedLead.license} />
                                    <DetailItem icon={Mail} label="Email" value={selectedLead.corporateEmail} />
                                    <DetailItem icon={MapPin} label="Region" value={selectedLead.deliveryRegion} />

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Volume</p>
                                            <p className="text-sm font-bold">{selectedLead.annualVolume}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Instrument</p>
                                            <p className="text-sm font-bold text-brand-orange">{selectedLead.bankingInstrument}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button className="w-full py-4 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-navy transition-all">
                                            Mark as Reviewed
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-200 text-center h-64 flex flex-col items-center justify-center sticky top-8">
                                <FileCheck size={48} className="text-gray-200 mb-4" />
                                <p className="text-gray-400 text-sm">Select a lead to view full corporate profile & technical allocation specs.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={18} className="text-brand-orange" />
            </div>
            <div>
                <p className="text-[8px] uppercase tracking-widest text-white/40">{label}</p>
                <p className="text-sm font-medium mt-0.5">{value}</p>
            </div>
        </div>
    );
}
