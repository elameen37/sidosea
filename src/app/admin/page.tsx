'use client';
import { useState, useEffect } from 'react';
import { FileText, Users, ShieldAlert, TrendingUp, Loader2 } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            });
    }, []);

    const stats = [
        { label: "New Leads", value: leads.length.toString(), icon: Users, color: "text-blue-500" },
        { label: "Compliance Pending", value: leads.filter(l => l.status === 'pending').length.toString(), icon: ShieldAlert, color: "text-brand-orange" },
        { label: "Active Allocations", value: "8", icon: TrendingUp, color: "text-green-500" },
        { label: "Site Edits", value: "12", icon: FileText, color: "text-purple-500" },
    ];

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Management console for SIDOSEA Logistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-brand-navy font-mono">{stat.value}</p>
                        </div>
                        <stat.icon className={`${stat.color} opacity-20`} size={32} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-brand-navy uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-orange"></div> Recent Leads
                        </h3>
                        <Link href="/admin/leads" className="text-[10px] font-bold uppercase text-brand-orange hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {leads.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No leads received yet.</p>
                        ) : (
                            leads.slice(0, 5).map((lead, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="text-xs font-bold text-brand-navy uppercase">{lead.companyName}</p>
                                        <p className="text-[10px] text-gray-400">Received {new Date(lead.timestamp).toLocaleDateString()} • {lead.bankingInstrument} Capability</p>
                                    </div>
                                    <Link href="/admin/leads" className="text-[10px] font-bold uppercase text-brand-orange hover:underline">View</Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-brand-navy p-8 rounded-2xl shadow-xl text-white">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/admin/content" className="block w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left rounded-lg">Update Hero Content</Link>
                        <Link href="/admin/compliance" className="block w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left rounded-lg">Edit Risk Matrix</Link>
                        <Link href="/admin/markets" className="block w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left rounded-lg">Update Market Prices</Link>
                        <button className="w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left rounded-lg">Upload Profile PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
