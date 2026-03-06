'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, Mail, Building2, Calendar, FileCheck, MapPin, Download, FileSpreadsheet, Trash2, CheckCircle, Clock, MoreVertical, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

export default function LeadsAdmin() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [showSaved, setShowSaved] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');
    const [showReportMenu, setShowReportMenu] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    const fetchLeads = () => {
        setLoading(true);
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    // Close report menu on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (reportRef.current && !reportRef.current.contains(e.target as Node)) {
                setShowReportMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleMarkReviewed = async (lead: any) => {
        const newStatus = lead.status === 'reviewed' ? 'pending' : 'reviewed';
        await fetch('/api/leads', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: lead.id, status: newStatus }),
        });
        setLeads(leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l));
        setSelectedLead({ ...lead, status: newStatus });
        setSavedMessage(newStatus === 'reviewed' ? 'Lead marked as reviewed.' : 'Lead status reset to pending.');
        setShowSaved(true);
    };

    const handleDelete = async (id: string) => {
        await fetch('/api/leads', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setLeads(leads.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        setSavedMessage('Lead deleted successfully.');
        setShowSaved(true);
    };

    const downloadCSV = () => {
        const headers = ['Company', 'License/ID', 'Email', 'Volume', 'Instrument', 'Region', 'Status', 'Date'];
        const rows = leads.map(l => [
            l.companyName,
            l.license,
            l.corporateEmail,
            l.annualVolume,
            l.bankingInstrument,
            l.deliveryRegion,
            l.status,
            new Date(l.timestamp).toLocaleDateString()
        ]);

        const csv = [headers, ...rows].map(row => row.map((cell: string) => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sidosea-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        setShowReportMenu(false);
    };

    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sidosea-leads-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setShowReportMenu(false);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message={savedMessage} />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Form Submissions</h1>
                        <p className="text-gray-500 text-sm mt-1">Review and manage qualified institutional leads.</p>
                    </div>
                    <button
                        onClick={fetchLeads}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-brand-orange"
                        title="Refresh Submissions"
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>

                {/* Report Menu */}
                <div className="relative" ref={reportRef}>
                    <button
                        onClick={() => setShowReportMenu(!showReportMenu)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Download size={16} /> Export Report
                    </button>

                    <AnimatePresence>
                        {showReportMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden z-50"
                            >
                                <div className="p-2">
                                    <button
                                        onClick={downloadCSV}
                                        className="w-full flex items-center gap-3 p-3 text-sm hover:bg-gray-50 rounded-lg transition-colors text-brand-navy"
                                    >
                                        <FileSpreadsheet size={16} className="text-green-500" />
                                        <div className="text-left">
                                            <p className="font-bold text-xs uppercase">CSV Report</p>
                                            <p className="text-[10px] text-gray-400">Spreadsheet format</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={downloadJSON}
                                        className="w-full flex items-center gap-3 p-3 text-sm hover:bg-gray-50 rounded-lg transition-colors text-brand-navy"
                                    >
                                        <FileCheck size={16} className="text-blue-500" />
                                        <div className="text-left">
                                            <p className="font-bold text-xs uppercase">JSON Export</p>
                                            <p className="text-[10px] text-gray-400">Raw data format</p>
                                        </div>
                                    </button>
                                </div>
                                <div className="border-t border-gray-100 p-3">
                                    <p className="text-[10px] text-gray-400 text-center">{leads.length} total records</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-2xl font-bold text-brand-navy font-mono">{leads.length}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-2xl font-bold text-orange-500 font-mono">{leads.filter(l => l.status === 'pending').length}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Pending</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-2xl font-bold text-green-500 font-mono">{leads.filter(l => l.status === 'reviewed').length}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Reviewed</p>
                </div>
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
                                    <div className="flex items-center gap-2">
                                        <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${lead.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {lead.status === 'pending' ? <Clock size={10} className="inline mr-1" /> : <CheckCircle size={10} className="inline mr-1" />}
                                            {lead.status}
                                        </div>
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

                                    <div className="pt-4 space-y-3">
                                        <button
                                            onClick={() => handleMarkReviewed(selectedLead)}
                                            className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${selectedLead.status === 'reviewed' ? 'bg-white/10 text-white/60 hover:bg-orange-500 hover:text-white' : 'bg-brand-orange text-white hover:bg-white hover:text-brand-navy'}`}
                                        >
                                            {selectedLead.status === 'reviewed' ? '↺ Reset to Pending' : '✓ Mark as Reviewed'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedLead.id)}
                                            className="w-full py-3 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={14} /> Delete Lead
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
