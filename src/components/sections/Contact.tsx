'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LeadSchema, LeadFormValues } from '@/lib/schemas';
import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LeadFormValues>({
        resolver: zodResolver(LeadSchema)
    });

    const onSubmit = async (data: LeadFormValues) => {
        setStatus('loading');
        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || 'Submission failed');

            setStatus('success');
            setMessage('Your supply engagement request has been submitted for compliance review.');
            reset();
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <section id="contact" className="bg-brand-navy py-24 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 -skew-x-12 transform translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 md:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    <div className="text-center lg:text-left">
                        <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Direct Engagement</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-8 leading-tight tracking-tight">
                            Serious Buyers. <br />Structured Transactions.
                        </h2>
                        <div className="space-y-6 text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                            <p>
                                SIDOSEA Logistics only engages with verified institutional buyers, refineries, and established trading houses.
                            </p>
                            <p>
                                Submissions are screened against international compliance databases. Rejection is automatic for non-compliant banking instruments or unverifiable corporate identities.
                            </p>
                            <div className="pt-8 border-t border-white/10">
                                <p className="text-brand-orange font-bold uppercase tracking-[0.2em] mb-2 text-[10px]">Compliance Requirement</p>
                                <p className="text-[10px] md:text-xs">All engagement requires a signed NDA and proof of banking capability (LC/SBLC/MT103).</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 md:p-10 rounded-sm shadow-2xl"
                    >
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-brand-navy mb-4 uppercase">Submission Received</h3>
                                <p className="text-gray-600 mb-8">{message}</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn-primary w-full"
                                >
                                    New Submission
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Company Name</label>
                                        <input
                                            {...register('companyName')}
                                            placeholder="e.g. Global Refining Corp"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                                        />
                                        {errors.companyName && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.companyName.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Refinery / Trading License</label>
                                        <input
                                            {...register('license')}
                                            placeholder="License ID / Registration"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                                        />
                                        {errors.license && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.license.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Annual Volume Requirement</label>
                                        <input
                                            {...register('annualVolume')}
                                            placeholder="e.g. 12,000,000 Barrels"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                                        />
                                        {errors.annualVolume && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.annualVolume.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Banking Instrument</label>
                                        <select
                                            {...register('bankingInstrument')}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors appearance-none"
                                        >
                                            <option value="">Select Instrument</option>
                                            <option value="LC">Letter of Credit (LC)</option>
                                            <option value="SBLC">Standby LC (SBLC)</option>
                                            <option value="MT103">MT103 / Direct Transfer</option>
                                        </select>
                                        {errors.bankingInstrument && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.bankingInstrument.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Region of Delivery</label>
                                    <input
                                        {...register('deliveryRegion')}
                                        placeholder="e.g. Rotterdam, ARA, Houston"
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                                    />
                                    {errors.deliveryRegion && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.deliveryRegion.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Corporate Email</label>
                                    <input
                                        {...register('corporateEmail')}
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
                                    />
                                    {errors.corporateEmail && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.corporateEmail.message}</p>}
                                </div>

                                <div className="flex items-start gap-3 py-4">
                                    <input
                                        type="checkbox"
                                        {...register('ndaAccepted')}
                                        className="mt-1 w-4 h-4 accent-brand-orange"
                                    />
                                    <label className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold tracking-tight">
                                        I acknowledge that this submission constitutes a formal request for supply discussion and that all data provided is subject to verification. I agree to sign a mutual NDA upon initial vetting.
                                    </label>
                                </div>
                                {errors.ndaAccepted && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.ndaAccepted.message}</p>}

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <p className="text-xs font-bold uppercase">{message}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing compliance...
                                        </>
                                    ) : (
                                        'Submit Supply Engagement Request'
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
