'use client';
import { useState, useEffect } from 'react';
import { DownloadCloud, Mail, Phone, Calendar, RefreshCw, FileText, Trash2 } from 'lucide-react';

export default function JobApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/applications');
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch applications');
            }
            
            setApplications(data || []);
        } catch (error: any) {
            console.error('Error fetching applications:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        
        try {
            const res = await fetch('/api/applications', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete application');
            }

            setApplications(applications.filter(app => app.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDownloadCV = (url: string) => {
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

            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-sm">
                    {error}
                </div>
            )}

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
                                    <th className="p-4 font-bold text-center">Actions</th>
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
                                                <div className="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded border line-clamp-2 max-w-[250px]" title={app.description}>
                                                    {app.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => handleDelete(app.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                title="Delete Application"
                                            >
                                                <Trash2 size={16} />
                                            </button>
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
