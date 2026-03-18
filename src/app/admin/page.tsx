'use client';
import { useState, useEffect } from 'react';
import { FileText, Users, ShieldAlert, TrendingUp, Loader2, RefreshCw, ArrowUpRight, Activity, Zap, CheckCircle2 } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [diagnostics, setDiagnostics] = useState<any>(null);

    const fetchLeads = () => {
        setLoading(true);
        Promise.all([
            fetch('/api/leads').then(res => res.json()),
            fetch('/api/admin/diagnostics').then(res => res.json())
        ])
        .then(([leadsData, diagData]) => {
            setLeads(leadsData);
            setDiagnostics(diagData);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const stats = [
        { label: "New Leads", value: leads.length.toString(), icon: Users, color: "from-blue-500 to-indigo-600", trend: "+12%" },
        { label: "Compliance Pending", value: leads.filter((l: any) => l.status === 'pending').length.toString(), icon: ShieldAlert, color: "from-orange-400 to-brand-orange", trend: "Critical" },
        { label: "Active Allocations", value: "8", icon: TrendingUp, color: "from-emerald-400 to-emerald-600", trend: "+2" },
        { label: "Site Edits", value: "12", icon: FileText, color: "from-purple-500 to-violet-600", trend: "Normal" },
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-bold text-brand-navy uppercase tracking-widest animate-pulse">Initializing Dashboard...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-500 hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg group-hover:text-brand-orange group-hover:bg-brand-orange/5 transition-colors">
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-brand-navy tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Leads - LG: SPAN 2 */}
                <div className="lg:col-span-2 bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                            <h3 className="text-lg font-black text-brand-navy uppercase tracking-tighter flex items-center gap-3">
                                <Activity className="text-brand-orange" size={20} /> Recent Leads
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time submission monitoring</p>
                        </div>
                        <Link href="/admin/leads" className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-orange hover:gap-3 transition-all tracking-widest">
                            View Console <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {leads.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <Zap size={40} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Awaiting new submissions</p>
                            </div>
                        ) : (
                            leads.slice(0, 5).map((lead: any, i: number) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-5 bg-white hover:bg-gray-50 rounded-[1.5rem] border border-gray-100 transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-navy group-hover:scale-110 transition-transform">
                                            <Users size={20} className="text-brand-orange" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-brand-navy uppercase tracking-tight">{lead.companyName}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] text-gray-400 font-medium">Received {new Date(lead.timestamp).toLocaleDateString()}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                <span className="text-[9px] font-black uppercase text-brand-orange tracking-widest">{lead.bankingInstrument}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/admin/leads" className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all">
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                    
                    {/* Background Decorative Element */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />
                </div>

                {/* Quick Actions Panel */}
                <div className="space-y-8">
                    <div className="bg-brand-navy p-10 rounded-[2.5rem] shadow-2xl shadow-brand-navy/30 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                                <Zap className="text-brand-orange" size={16} /> Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <QuickActionLink href="/admin/content" label="Update Content" icon={FileText} />
                                <QuickActionLink href="/admin/compliance" label="Edit Risk Matrix" icon={ShieldAlert} />
                                <QuickActionLink href="/admin/markets" label="Market Prices" icon={TrendingUp} />
                                <QuickActionLink href="/admin/users" label="Admin Management" icon={Users} />
                                <button className="w-full group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-orange transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-orange transition-colors">
                                            <ArrowUpRight size={14} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Upload Profile PDF</span>
                                    </div>
                                    <CheckCircle2 size={14} className="text-white/20 group-hover:text-white" />
                                </button>
                            </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange opacity-10 rounded-full blur-3xl" />
                    </div>

                    {/* Operational Status Card */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${diagnostics?.ai?.status === 'healthy' && diagnostics?.supabase?.status === 'healthy' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
                                <Activity size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-brand-navy leading-none">
                                    {diagnostics?.ai?.status === 'healthy' && diagnostics?.supabase?.status === 'healthy' ? 'Systems Normal' : 'Action Required'}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Platform Integrity</p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {/* AI Service Status */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400">SIDA (AI Services)</span>
                                    <span className={`italic ${diagnostics?.ai?.status === 'healthy' ? 'text-green-500' : diagnostics?.ai?.status === 'warning' ? 'text-orange-500' : 'text-red-500'}`}>
                                        {diagnostics?.ai?.message || 'Syncing...'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: diagnostics?.ai?.status === 'healthy' ? '100%' : diagnostics?.ai?.status === 'warning' ? '60%' : '10%' }}
                                        className={`h-full rounded-full ${diagnostics?.ai?.status === 'healthy' ? 'bg-green-500' : diagnostics?.ai?.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Database Status */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400">Institutional Database</span>
                                    <span className={`italic ${diagnostics?.supabase?.status === 'healthy' ? 'text-green-500' : 'text-red-500'}`}>
                                        {diagnostics?.supabase?.message || 'Syncing...'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: diagnostics?.supabase?.status === 'healthy' ? '100%' : '10%' }}
                                        className={`h-full rounded-full ${diagnostics?.supabase?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickActionLink({ href, label, icon: Icon }: any) {
    return (
        <Link href={href} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-brand-navy transition-all duration-300 group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <Icon size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <ArrowUpRight size={14} className="text-white/20 group-hover:text-brand-navy" />
        </Link>
    );
}
