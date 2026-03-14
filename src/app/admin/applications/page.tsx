'use client';
import { useState, useEffect } from 'react';
import { 
    Loader2, Mail, User, Calendar, FileText, Download, 
    Trash2, Briefcase, ChevronRight, X, Activity, Bug,
    DownloadCloud, Search, RefreshCw, CheckCircle2,
    FileType, ShieldAlert, Phone, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

export default function JobApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [showSaved, setShowSaved] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');
    const [showDebug, setShowDebug] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/applications');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');
            setApplications(data || []);
        } catch (error: any) {
            console.error('Error fetching applications:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDelete = async (id: string, cvUrl?: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        
        try {
            const res = await fetch('/api/applications', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, cvUrl }),
            });
            if (!res.ok) throw new Error('Failed to delete application');
            
            setApplications(applications.filter(a => a.id !== id));
            if (selectedApp?.id === id) setSelectedApp(null);
            setSavedMessage('Application removed from records.');
            setShowSaved(true);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const filteredApps = applications.filter(a => 
        a.applicant_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-black text-brand-navy uppercase tracking-widest animate-pulse">Scanning Talent Pool...</p>
        </div>
    );

    return (
        <div className="space-y-8 relative">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message={savedMessage} />

            {/* Header Section */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange">
                        <Briefcase size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Job Applications</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Acquisition & Talent Management Console</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="relative flex-1 xl:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search applicants or roles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange/20 transition-all"
                        />
                    </div>
                    <button 
                        onClick={fetchApplications}
                        className="p-3.5 bg-gray-50 text-brand-navy rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all shadow-sm"
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={() => setShowDebug(!showDebug)}
                        className={`p-3.5 rounded-2xl border transition-all ${showDebug ? 'bg-brand-navy text-white' : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'}`}
                    >
                        <Bug size={20} />
                    </button>
                </div>
            </div>

            {/* Debug Panel */}
            <AnimatePresence>
                {showDebug && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-brand-navy rounded-[2.5rem] p-10 overflow-hidden shadow-2xl border border-white/5"
                    >
                        <h4 className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <Bug size={16} /> System Diagnostics: Active Payload Data
                        </h4>
                        <pre className="text-[10px] text-white/40 font-mono bg-black/20 p-8 rounded-[2rem] overflow-x-auto custom-scrollbar border border-white/5">
                            {JSON.stringify(applications, null, 2)}
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] text-red-600 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                    <ShieldAlert size={20} /> {error}
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Apps List */}
                <div className="xl:col-span-7 space-y-4">
                    {filteredApps.length === 0 ? (
                        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center">
                            <User size={48} className="mx-auto text-gray-100 mb-6" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">No matching applications received</p>
                        </div>
                    ) : (
                        filteredApps.map((app, i) => (
                            <motion.div
                                key={app.id}
                                layoutId={app.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedApp(app)}
                                className={`group bg-white p-6 rounded-[2rem] border-2 transition-all cursor-pointer hover:shadow-xl hover:shadow-brand-navy/5 ${selectedApp?.id === app.id ? 'border-brand-orange ring-4 ring-brand-orange/5' : 'border-gray-50 hover:border-gray-200'}`}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedApp?.id === app.id ? 'bg-brand-orange text-white rotate-6' : 'bg-gray-50 text-brand-navy group-hover:bg-brand-navy group-hover:text-white'}`}>
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-brand-navy uppercase text-sm tracking-tight group-hover:text-brand-orange transition-colors">{app.applicant_name}</h3>
                                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                <span className="text-[9px] font-black uppercase tracking-widest bg-brand-navy/10 text-brand-navy px-2.5 py-1 rounded-lg">Position: {app.job_title}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                                                    <Calendar size={12} className="text-brand-orange" /> {new Date(app.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className={`text-gray-200 group-hover:translate-x-1 group-hover:text-brand-orange transition-all ${selectedApp?.id === app.id ? 'rotate-90 text-brand-orange' : ''}`} />
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Details / Drawer */}
                <div className="xl:col-span-5 relative">
                    <AnimatePresence mode="wait">
                        {selectedApp ? (
                            <motion.div
                                key={selectedApp.id}
                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.98, x: 20 }}
                                className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-md xl:backdrop-blur-none xl:relative xl:z-0 xl:inset-auto xl:bg-transparent flex items-end xl:items-start justify-center xl:justify-start overflow-hidden"
                            >
                                <div className="absolute inset-0 xl:hidden" onClick={() => setSelectedApp(null)} />
                                
                                <div className="w-full h-[85vh] xl:h-auto bg-brand-navy text-white p-8 xl:p-10 rounded-t-[3rem] xl:rounded-[3rem] shadow-2xl relative z-10 sticky top-10 flex flex-col overflow-y-auto custom-scrollbar border border-white/5">
                                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10 shrink-0">
                                        <div>
                                            <h2 className="text-xl font-black uppercase tracking-tighter text-brand-orange">Candidate Profile</h2>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Institutional Hire Assessment</p>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedApp(null)}
                                            className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all group"
                                        >
                                            <X size={20} className="text-white/40 group-hover:text-white" />
                                        </button>
                                    </div>

                                    <div className="space-y-8 flex-1">
                                        <div className="space-y-6">
                                            <DetailItemPremium icon={User} label="Applicant Identity" value={selectedApp.applicant_name} />
                                            <DetailItemPremium icon={Briefcase} label="Target Position" value={selectedApp.job_title} />
                                            <DetailItemPremium icon={Mail} label="Contact Channel" value={selectedApp.email} />
                                            {selectedApp.phone && <DetailItemPremium icon={Phone} label="Direct Contact" value={selectedApp.phone} />}
                                            <DetailItemPremium icon={Clock} label="Submission Log" value={new Date(selectedApp.created_at).toLocaleString()} />
                                        </div>

                                        {selectedApp.description && (
                                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                                <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-black mb-3">Cover Letter / Expertise Summary</p>
                                                <p className="text-xs leading-relaxed text-white/80 italic">{selectedApp.description}</p>
                                            </div>
                                        )}

                                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 relative group overflow-hidden">
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
                                                        <FileType size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 leading-none mb-1.5">Curriculum Vitae</p>
                                                        <p className="text-sm font-black whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{selectedApp.cv_url.split('/').pop()}</p>
                                                    </div>
                                                </div>
                                                <a 
                                                    href={selectedApp.cv_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-navy rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl hover:scale-105"
                                                >
                                                    <DownloadCloud size={16} /> Secure Access CV
                                                </a>
                                            </div>
                                            <FileText className="absolute -bottom-4 -right-4 text-white/[0.02] transform rotate-12" size={120} />
                                        </div>

                                        <div className="pt-6 pb-10">
                                            <button
                                                onClick={() => handleDelete(selectedApp.id, selectedApp.cv_url)}
                                                className="w-full py-5 text-red-100 bg-red-500/10 hover:bg-red-50 text-[10px] font-black uppercase tracking-[0.25em] rounded-2xl transition-all border border-red-500/10 flex items-center justify-center gap-3 group"
                                            >
                                                <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Purge Candidate File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="hidden xl:flex bg-white/40 p-12 rounded-[3.5rem] border border-dashed border-gray-200 text-center min-h-[500px] flex-col items-center justify-center sticky top-10">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Briefcase size={32} className="text-gray-200" />
                                </div>
                                <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest">Awaiting assessment</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-2 max-w-[200px] leading-relaxed italic">Select an applicant candidate to review professional credentials & expertise summary.</p>
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
