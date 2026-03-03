import { FileText, Users, ShieldAlert, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "New Leads", value: "12", icon: Users, color: "text-blue-500" },
        { label: "Compliance Pending", value: "4", icon: ShieldAlert, color: "text-brand-orange" },
        { label: "Active Allocations", value: "8", icon: TrendingUp, color: "text-green-500" },
        { label: "Site Edits", value: "32", icon: FileText, color: "text-purple-500" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Management console for SIDOSEA Logistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-brand-navy font-mono">{stat.value}</p>
                        </div>
                        <stat.icon className={`${stat.color} opacity-20`} size={32} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-orange"></div> Recent Leads
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "Chevron International Trading", time: "2 hours ago", instrument: "SBLC" },
                            { name: "Vitol Group SA", time: "5 hours ago", instrument: "LC" },
                            { name: "Trafigura PTE Ltd", time: "1 day ago", instrument: "MT103" },
                        ].map((lead, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border border-gray-100">
                                <div>
                                    <p className="text-xs font-bold text-brand-navy uppercase">{lead.name}</p>
                                    <p className="text-[10px] text-gray-400">Received {lead.time} • {lead.instrument} Capability</p>
                                </div>
                                <button className="text-[10px] font-bold uppercase text-brand-orange hover:underline">View</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-navy p-8 rounded-sm shadow-xl text-white">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left">Update Hero Image</button>
                        <button className="w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left">Edit Risk Matrix</button>
                        <button className="w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left">Publish Market Note</button>
                        <button className="w-full p-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors text-left">Upload Profile PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
