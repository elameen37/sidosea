'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2, ShieldCheck, ChevronRight, Globe, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.message || 'Invalid institutional credentials');
            }
        } catch {
            setError('System synchronization failure. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-[120px]" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-20 h-20 bg-brand-orange mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-orange/20"
                    >
                        <ShieldCheck className="text-white" size={40} />
                    </motion.div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Institutional Access</h1>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-2">SIDOSEA Logistics Global Console</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em] ml-1 flex items-center gap-2">
                            <User size={12} className="text-brand-orange" /> Authentication Identity
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border-2 border-white/5 p-4 rounded-2xl text-sm text-white focus:border-brand-orange outline-none transition-all group-hover:bg-white/[0.08]"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em] ml-1 flex items-center gap-2">
                            <Lock size={12} className="text-brand-orange" /> Access Matrix Key
                        </label>
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border-2 border-white/5 p-4 rounded-2xl text-sm text-white focus:border-brand-orange outline-none transition-all group-hover:bg-white/[0.08]"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center py-2 px-4 bg-red-500/10 rounded-xl flex items-center justify-center gap-2">
                                    <Activity size={12} /> {error}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-brand-orange text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-orange/20 group"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                Log In to Command Center
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em]">Secure Institutional Node: Connected</p>
                    </div>
                </div>
            </motion.div>

            {/* Decorative Globe Icon */}
            <Globe className="absolute -bottom-20 -left-20 text-white/[0.02] rotate-12" size={400} />
        </div>
    );
}
