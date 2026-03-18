'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, CheckCircle, FileText, Loader2, AlertCircle } from 'lucide-react';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    jobDescription?: string;
}

export default function JobApplicationModal({ isOpen, onClose, jobTitle, jobDescription }: JobApplicationModalProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form data state
    const [formData, setFormData] = useState({
        applicant_name: '',
        email: '',
        phone: '',
        description: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!validTypes.includes(selectedFile.type)) {
                setErrorMsg('Please upload a PDF or DOCX file.');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                setErrorMsg('File size must be under 5MB.');
                return;
            }

            setFile(selectedFile);
            setErrorMsg('');
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            setErrorMsg('Please attach your CV to apply.');
            return;
        }

        setStatus('submitting');
        setErrorMsg('');

        try {
            const data = new FormData();
            data.append('job_title', jobTitle);
            data.append('applicant_name', formData.applicant_name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('description', formData.description);
            data.append('cv', file);

            const response = await fetch('/api/apply', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit application');
            }

            setStatus('success');
            // Auto close after 3 seconds
            setTimeout(() => {
                handleCloseForm();
            }, 3000);

        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMsg(error.message || 'An unexpected error occurred. Please try again later.');
        }
    };

    const handleCloseForm = () => {
        setStatus('idle');
        setFile(null);
        setErrorMsg('');
        setFormData({ applicant_name: '', email: '', phone: '', description: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={status !== 'submitting' ? handleCloseForm : undefined}
                        className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col pointer-events-auto border border-gray-100 overflow-hidden relative">
                            
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-navy uppercase tracking-tight">Apply Now</h3>
                                    <p className="text-gray-500 text-xs mt-1">Application for: <span className="text-brand-orange font-semibold">{jobTitle}</span></p>
                                </div>
                                <button 
                                    onClick={status !== 'submitting' ? handleCloseForm : undefined}
                                    disabled={status === 'submitting'}
                                    className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Status Screens */}
                            {status === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, padding: 0, height: 0 }}
                                    animate={{ opacity: 1, padding: 48, height: 'auto' }}
                                    className="flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-brand-navy uppercase tracking-tight">Application Successfully Sent</h4>
                                    <p className="text-sm text-gray-500 max-w-xs font-light">
                                        Thank you for applying for the {jobTitle} position at SIDOSEA Logistics. Our talent acquisition team will review your CV shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="p-6 overflow-y-auto">
                                    {jobDescription && (
                                        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em] mb-3">Position Description</p>
                                            <p className="text-sm text-brand-navy/70 leading-relaxed font-light whitespace-pre-line italic">
                                                &quot;{jobDescription}&quot;
                                            </p>
                                        </div>
                                    )}
                                    
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        
                                        {status === 'error' && (
                                            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm flex items-start gap-2">
                                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                                <p>{errorMsg}</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Full Name *</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    disabled={status === 'submitting'}
                                                    value={formData.applicant_name}
                                                    onChange={e => setFormData({...formData, applicant_name: e.target.value})}
                                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm outline-none focus:border-brand-orange text-brand-navy rounded-xl transition-colors disabled:opacity-50"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Email Address *</label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    disabled={status === 'submitting'}
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm outline-none focus:border-brand-orange text-brand-navy rounded-xl transition-colors disabled:opacity-50"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                disabled={status === 'submitting'}
                                                value={formData.phone}
                                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm outline-none focus:border-brand-orange text-brand-navy rounded-xl transition-colors disabled:opacity-50"
                                                placeholder="+234 800 000 0000"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Cover Letter / Description</label>
                                            <textarea 
                                                rows={4}
                                                disabled={status === 'submitting'}
                                                value={formData.description}
                                                onChange={e => setFormData({...formData, description: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm outline-none focus:border-brand-orange text-brand-navy rounded-xl transition-colors disabled:opacity-50 resize-none font-light"
                                                placeholder="Tell us why you are a great fit for SIDOSEA Logistics..."
                                            />
                                        </div>

                                        {/* File Upload Area */}
                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Resume / CV (PDF or DOCX) *</label>
                                            
                                            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors relative ${file ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50'} ${status === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
                                                
                                                <input 
                                                    type="file" 
                                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                    onChange={handleFileChange}
                                                    ref={fileInputRef}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                
                                                {file ? (
                                                    <div className="flex items-center justify-between bg-white border border-brand-orange/30 p-4 rounded-xl shadow-sm z-10 relative">
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange shrink-0">
                                                                <FileText size={20} />
                                                            </div>
                                                            <div className="text-left overflow-hidden">
                                                                <p className="text-sm font-semibold text-brand-navy truncate">{file.name}</p>
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            type="button" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleRemoveFile();
                                                            }}
                                                            className="text-gray-400 hover:text-red-500 p-2 shrink-0 z-20 relative cursor-pointer"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center space-y-2 text-gray-500 pointer-events-none">
                                                        <UploadCloud size={32} className="text-gray-400" />
                                                        <p className="text-sm font-medium">Click to browse or drag & drop</p>
                                                        <p className="text-[10px] uppercase tracking-widest opacity-70">Max size: 5MB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Submit Area */}
                                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                            <button 
                                                type="button"
                                                onClick={handleCloseForm}
                                                disabled={status === 'submitting'}
                                                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit"
                                                disabled={status === 'submitting' || !file}
                                                className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-[#ff4f00] transition-colors flex items-center gap-2 group disabled:opacity-50 disabled:hover:bg-brand-orange"
                                            >
                                                {status === 'submitting' ? (
                                                    <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                                                ) : (
                                                    <>Submit Application <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block">→</motion.span></>
                                                )}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
