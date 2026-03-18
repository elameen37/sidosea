'use client';
import AdminRegistrationForm from '@/components/admin/AdminRegistrationForm';
import { Shield, ChevronRight, Home, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminManagementPage() {
    return (
        <div className="pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-3 mb-10 px-4">
                <Link href="/admin" className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-brand-orange shadow-sm border border-gray-50 transition-all flex items-center justify-center">
                    <Home size={16} />
                </Link>
                <ChevronRight size={14} className="text-gray-300" />
                <div className="px-5 py-2.5 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-navy/10 flex items-center gap-2">
                    <Users size={14} /> Admin Management
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Info Side */}
                <div className="lg:col-span-5 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-brand-navy p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-brand-navy/20"
                    >
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                                <Shield size={32} />
                            </div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Access Control <br/><span className="text-brand-orange">Console</span></h1>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed max-w-sm mb-10">
                                This secure interface allows existing administrators to provision new institutional access nodes. 
                                Ensure all new users are vetted according to SIDOSEA compliance guidelines.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full" />
                                    <p className="text-[9px] font-black uppercase tracking-widest">PBKDF2 Hashing Enabled</p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full" />
                                    <p className="text-[9px] font-black uppercase tracking-widest">Service Role Isolation</p>
                                </div>
                            </div>
                        </div>
                        <Shield className="absolute -bottom-20 -right-20 text-white/[0.03] rotate-12" size={300} />
                    </motion.div>

                    <Link href="/admin" className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 hover:text-brand-navy transition-all group pl-4">
                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Return to Command Center
                    </Link>
                </div>

                {/* Form Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-7"
                >
                    <AdminRegistrationForm />
                </motion.div>
            </div>
        </div>
    );
}
