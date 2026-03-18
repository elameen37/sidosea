'use client';
import { useState } from 'react';
import { ShieldCheck, UserPlus, Loader2, CheckCircle2, AlertCircle, X, Shield, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminRegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Institutional passwords do not match' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'New administrator successfully synchronized' });
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setMessage({ type: 'error', text: data.error || 'Synchronization failure' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network connection interrupted' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="mb-10 relative z-10">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tighter flex items-center gap-3">
                    <ShieldCheck className="text-brand-orange" size={24} /> Register New Admin
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Institutional Credential Provisioning</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`p-5 rounded-2xl flex items-center gap-4 border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}
                        >
                            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed flex-1">{message.text}</p>
                            <button type="button" onClick={() => setMessage(null)} className="opacity-50 hover:opacity-100">
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-brand-navy tracking-widest block pl-2">Username</label>
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={18} />
                            <input
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-gray-50 border-none px-14 py-4 text-xs font-black text-brand-navy rounded-2xl focus:ring-2 focus:ring-brand-orange/10 transition-all placeholder:text-gray-300"
                                placeholder="Corporate Identifier"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-brand-navy tracking-widest block pl-2">Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-none px-14 py-4 text-xs font-black text-brand-navy rounded-2xl focus:ring-2 focus:ring-brand-orange/10 transition-all placeholder:text-gray-300"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-brand-navy tracking-widest block pl-2">Confirm Key</label>
                            <div className="relative group">
                                <Shield className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-none px-14 py-4 text-xs font-black text-brand-navy rounded-2xl focus:ring-2 focus:ring-brand-orange/10 transition-all placeholder:text-gray-300"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        disabled={loading}
                        className="w-full bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/20 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                        {loading ? 'Synchronizing Node...' : 'Register Administrator'}
                    </button>
                </div>
            </form>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
