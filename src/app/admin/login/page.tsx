'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2 } from 'lucide-react';

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
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-10 rounded-sm shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-brand-orange mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Admin Access</h1>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-2">SIDOSEA Logistics CMS</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
                            <User size={12} /> Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
                            <Lock size={12} /> Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] uppercase font-bold text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
