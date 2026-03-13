'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DownloadCloud, Mail, Phone, Calendar, RefreshCw, FileText } from 'lucide-react';

export default function JobApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('job_applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDownloadCV = (url: string) => {
        // Open the Supabase storage URL directly which triggers a download or opens in new tab
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-brand-navy uppercase tracking-tight">Job Applications</h2>
                    <p className="text-sm text-gray-500 mt-1">Review candidates and download CVs</p>
                </div>
                <button 
                    onClick={fetchApplications}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-brand-navy rounded-lg border hover:bg-gray-100 transition-colors text-sm font-semibold"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 pl-6 flex items-center justify-center text-gray-400 gap-2">
                        <RefreshCw size={20} className="animate-spin" /> Loading candidates...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <FileText size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No job applications received yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-100">
                                    <th className="p-4 pl-6 font-bold">Candidate</th>
                                    <th className="p-4 font-bold">Applied Role</th>
                                    <th className="p-4 font-bold">Resume / CV</th>
                                    <th className="p-4 font-bold">Contact Details</th>
                                    <th className="p-4 pr-6 font-bold text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <p className="font-bold text-brand-navy text-sm">{app.applicant_name}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange">
                                                {app.job_title}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => handleDownloadCV(app.cv_url)}
                                                className="flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors uppercase tracking-wider"
                                            >
                                                <DownloadCloud size={16} /> Download
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-orange">
                                                    <Mail size={12} /> {app.email}
                                                </a>
                                                {app.phone && (
                                                    <a href={`tel:${app.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-orange">
                                                        <Phone size={12} /> {app.phone}
                                                    </a>
                                                )}
                                            </div>
                                            {app.description && (
                                                <div className="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded border truncate max-w-[200px]" title={app.description}>
                                                    {app.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 pr-6 text-right text-xs text-gray-400 font-mono whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Calendar size={12} />
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="mt-1 text-[10px]">
                                                {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
