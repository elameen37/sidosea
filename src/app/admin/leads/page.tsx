'use client';
import { useState, useEffect, useRef } from 'react';
import { 
    Loader2, Mail, Building2, Calendar, FileCheck, MapPin, 
    Download, FileSpreadsheet, Trash2, CheckCircle2, Clock, 
    MoreVertical, RefreshCw, Filter, Search, ChevronRight, X,
    ArrowUpRight, Activity, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

export default function LeadsAdmin() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [showSaved, setShowSaved] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');
    const [showReportMenu, setShowReportMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const reportRef = useRef<HTMLDivElement>(null);

    const fetchLeads = () => {
        setLoading(true);
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleMarkReviewed = async (lead: any) => {
        const newStatus = lead.status === 'reviewed' ? 'pending' : 'reviewed';
        await fetch('/api/leads', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: lead.id, status: newStatus }),
        });
        const updatedLeads = leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l);
        setLeads(updatedLeads);
        setSelectedLead({ ...lead, status: newStatus });
        setSavedMessage(newStatus === 'reviewed' ? 'Lead verified and archived.' : 'Lead status restored to pending.');
        setShowSaved(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead? This action is permanent.')) return;
        await fetch('/api/leads', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setLeads(leads.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        setSavedMessage('Lead removed from system.');
        setShowSaved(true);
    };

    const filteredLeads = leads.filter(l => 
        l.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.corporateEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.bankingInstrument?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-bold text-brand-navy uppercase tracking-widest animate-pulse">Accessing Leads Database...</p>
        </div>
    );

    return (
        <div className="space-y-8 relative">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message={savedMessage} />

            {/* Header Section */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Form Submissions</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Qualified Institutional Lead Management</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="relative flex-1 xl:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by company, email or instrument..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-black text-brand-navy focus:ring-2 focus:ring-brand-orange/20 transition-all"
                        />
                    </div>
                    <button 
                        onClick={fetchLeads}
                        className="p-3.5 bg-gray-50 text-brand-navy rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all shadow-sm"
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    
                    <div className="relative" ref={reportRef}>
                        <button 
                            onClick={() => setShowReportMenu(!showReportMenu)}
                            className="px-6 py-3.5 bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 flex items-center gap-2"
                        >
                            <Download size={16} /> Export
                        </button>
                        
                        <AnimatePresence>
                            {showReportMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 w-64 overflow-hidden z-[100]"
                                >
                                    <div className="p-3 space-y-1">
                                        <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-2xl transition-all group">
                                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                                <FileSpreadsheet size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-brand-navy uppercase tracking-tight">Excel Spreadsheet</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Full Detailed CSV</p>
                                            </div>
                                        </button>
                                        <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-2xl transition-all group">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                                <FileCheck size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-brand-navy uppercase tracking-tight">JSON Archive</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Raw Data Format</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 p-4 border-t border-gray-100 italic text-[9px] text-gray-400 text-center font-bold tracking-widest uppercase">
                                        Encrypted Secure Export
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Leads List */}
                <div className="xl:col-span-7 space-y-4">
                    {filteredLeads.length === 0 ? (
                        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center">
                            <Building2 size={48} className="mx-auto text-gray-100 mb-6" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">No matching lead profiles found</p>
                        </div>
                    ) : (
                        filteredLeads.map((lead, i) => (
                            <motion.div
                                key={lead.id}
                                layoutId={lead.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedLead(lead)}
                                className={`group bg-white p-6 rounded-[2rem] border-2 transition-all cursor-pointer hover:shadow-xl hover:shadow-brand-navy/5 ${selectedLead?.id === lead.id ? 'border-brand-orange ring-4 ring-brand-orange/5' : 'border-gray-50 hover:border-gray-200'}`}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedLead?.id === lead.id ? 'bg-brand-orange text-white rotate-6' : 'bg-gray-50 text-brand-navy group-hover:bg-brand-navy group-hover:text-white'}`}>
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-brand-navy uppercase text-sm tracking-tight group-hover:text-brand-orange transition-colors">{lead.companyName}</h3>
                                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                <span className="text-[9px] font-black uppercase tracking-widest bg-brand-navy/5 text-brand-navy px-2.5 py-1 rounded-lg">{lead.bankingInstrument}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                                                    <Calendar size={12} className="text-brand-orange" /> {new Date(lead.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                                        <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl flex items-center gap-2 ${lead.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'pending' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`} />
                                            {lead.status}
                                        </div>
                                        <ChevronRight size={18} className={`text-gray-200 group-hover:translate-x-1 group-hover:text-brand-orange transition-all ${selectedLead?.id === lead.id ? 'rotate-90 text-brand-orange' : ''}`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Detail View / Drawer for Mobile is same component but responsive */}
                <div className="xl:col-span-5 relative">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                key={selectedLead.id}
                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.98, x: 20 }}
                                className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-md xl:backdrop-blur-none xl:relative xl:z-0 xl:inset-auto xl:bg-transparent flex items-end xl:items-start justify-center xl:justify-start overflow-hidden"
                            >
                                {/* Mobile/Tablet Close Overlay */}
                                <div className="absolute inset-0 xl:hidden" onClick={() => setSelectedLead(null)} />
                                
                                <div className="w-full h-[85vh] xl:h-auto bg-brand-navy xl:bg-brand-navy text-white p-8 xl:p-10 rounded-t-[3rem] xl:rounded-[3rem] shadow-2xl relative z-10 sticky top-10 flex flex-col overflow-y-auto custom-scrollbar border border-white/5">
                                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10 shrink-0">
                                        <div>
                                            <h2 className="text-xl font-black uppercase tracking-tighter text-brand-orange">Institutional Profile</h2>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Verification Console</p>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedLead(null)}
                                            className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all group"
                                        >
                                            <X size={20} className="text-white/40 group-hover:text-white" />
                                        </button>
                                    </div>

                                    <div className="space-y-8 flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                                            <DetailItemPremium icon={Building2} label="Corporate Entity" value={selectedLead.companyName} />
                                            <DetailItemPremium icon={ShieldCheck} label="Operational License" value={selectedLead.license || 'Not provided'} />
                                            <DetailItemPremium icon={Mail} label="Corporate Communication" value={selectedLead.corporateEmail} />
                                            <DetailItemPremium icon={MapPin} label="Delivery Logistics Hub" value={selectedLead.deliveryRegion} />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group hover:bg-white/10 transition-all">
                                                <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-black mb-2">Annual Volume</p>
                                                <p className="text-lg font-black tracking-tight">{selectedLead.annualVolume}</p>
                                                <Activity className="absolute bottom-4 right-4 text-white/5 group-hover:text-brand-orange/20 transition-colors" size={24} />
                                            </div>
                                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group hover:bg-white/10 transition-all">
                                                <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-black mb-2">Capabilities</p>
                                                <p className="text-lg font-black tracking-tight text-brand-orange">{selectedLead.bankingInstrument}</p>
                                                <ArrowUpRight className="absolute bottom-4 right-4 text-white/5 group-hover:text-brand-orange/20 transition-colors" size={24} />
                                            </div>
                                        </div>

                                        <div className="pt-6 space-y-3 shrink-0 pb-10">
                                            <button
                                                onClick={() => handleMarkReviewed(selectedLead)}
                                                className={`group w-full py-5 text-xs font-black uppercase tracking-[0.25em] rounded-2xl transition-all flex items-center justify-center gap-3 ${selectedLead.status === 'reviewed' ? 'bg-white/5 text-white/40 border border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500' : 'bg-brand-orange text-white shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98]'}`}
                                            >
                                                {selectedLead.status === 'reviewed' ? (
                                                    <><RefreshCw size={16} /> Restore to Pending</>
                                                ) : (
                                                    <><CheckCircle2 size={16} /> Verify & Approve</>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedLead.id)}
                                                className="w-full py-4 text-red-400 bg-red-400/5 hover:bg-red-400 hover:text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-2xl transition-all border border-red-400/10 flex items-center justify-center gap-3"
                                            >
                                                <Trash2 size={16} /> Blacklist / Delete profile
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Subpixel detail */}
                                    <div className="absolute top-0 right-10 w-32 h-32 bg-brand-orange/5 blur-[100px] rounded-full" />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="hidden xl:flex bg-white/40 p-12 rounded-[3.5rem] border border-dashed border-gray-200 text-center min-h-[500px] flex-col items-center justify-center sticky top-10">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <ShieldCheck size={32} className="text-gray-200" />
                                </div>
                                <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest">Awaiting selection</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-2 max-w-[200px] leading-relaxed italic">Select a corporate profile to access secure data & allocation logistics.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function DetailItemPremium({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-5 group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-brand-orange transition-all duration-300">
                <Icon size={20} className="text-brand-orange group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black mb-1">{label}</p>
                <p className="text-sm font-bold tracking-tight text-white/90">{value}</p>
            </div>
        </div>
    );
}
