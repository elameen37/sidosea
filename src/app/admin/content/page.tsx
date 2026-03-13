'use client';
import { useState, useEffect } from 'react';
import { Loader2, Save, Plus, Trash2, MapPin, FileUp, Download } from 'lucide-react';
import SaveDialog from '@/components/shared/SaveDialog';

export default function ContentEditor() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                setContent(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/content', {
            method: 'POST',
            body: JSON.stringify(content),
        });
        setSaving(false);
        setShowSaved(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setContent({ ...content, profile_pdf_url: data.publicUrl });
            setShowUploadSuccess(true);
        } catch (error: any) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Content changes saved and published to the live site." />
            <SaveDialog isOpen={showUploadSuccess} onClose={() => setShowUploadSuccess(false)} message="Corporate Profile PDF successfully uploaded to secure storage! Please remember to click 'Save Changes' to publish the new link." />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-brand-navy uppercase tracking-widest">Content Editor</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Hero Section</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Headline</label>
                            <input
                                value={content.homepage?.headline || ''}
                                onChange={e => setContent({ ...content, homepage: { ...content.homepage, headline: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Subheadline</label>
                            <textarea
                                value={content.homepage?.subheadline || ''}
                                onChange={e => setContent({ ...content, homepage: { ...content.homepage, subheadline: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange h-24 text-brand-navy rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">LinkedIn</label>
                            <input
                                value={content.socials?.linkedin || ''}
                                onChange={e => setContent({ ...content, socials: { ...content.socials, linkedin: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Facebook</label>
                            <input
                                value={content.socials?.facebook || ''}
                                onChange={e => setContent({ ...content, socials: { ...content.socials, facebook: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Instagram</label>
                            <input
                                value={content.socials?.instagram || ''}
                                onChange={e => setContent({ ...content, socials: { ...content.socials, instagram: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Corporate Profile PDF</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Current PDF URL</label>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <Download size={16} className="text-brand-orange" />
                                <input
                                    value={content.profile_pdf_url || ''}
                                    readOnly
                                    className="bg-transparent text-[11px] text-gray-400 w-full outline-none"
                                    placeholder="No file uploaded yet"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                id="pdf-upload"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <label
                                htmlFor="pdf-upload"
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold uppercase tracking-widest text-[10px] transition-all ${uploading ? 'bg-gray-200 text-gray-400' : 'bg-brand-navy text-white hover:bg-brand-orange shadow-lg shadow-brand-navy/10'}`}
                            >
                                {uploading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
                                {uploading ? 'Uploading...' : 'Upload New PDF'}
                            </label>
                        </div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-medium italic">Max size: 5MB. Recommended: Compact PDF for fast loading.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">About Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                            <input
                                value={content.about?.title || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Content</label>
                            <textarea
                                value={content.about?.content || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, content: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange h-32 text-brand-navy rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange">Global Presence Hubs</h3>
                        <button
                            onClick={() => {
                                const newLocs = [...(content.locations || [])];
                                newLocs.push({ city: "New City", address: "Full Address", phone: "+000", type: "Hub Type" });
                                setContent({ ...content, locations: newLocs });
                            }}
                            className="bg-brand-navy text-white text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-brand-orange transition-colors font-bold uppercase tracking-widest"
                        >
                            <Plus size={14} /> Add Location
                        </button>
                    </div>

                    <div className="space-y-4">
                        {content.locations && content.locations.map((loc: any, index: number) => (
                            <div key={index} className="p-4 border border-gray-100 bg-gray-50 space-y-4 rounded-xl relative group">
                                <button
                                    onClick={() => {
                                        const newLocs = content.locations.filter((_: any, i: number) => i !== index);
                                        setContent({ ...content, locations: newLocs });
                                    }}
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-2 gap-4 pr-8">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-gray-400">City</label>
                                        <input
                                            value={loc.city}
                                            onChange={e => {
                                                const newLocs = [...content.locations];
                                                newLocs[index].city = e.target.value;
                                                setContent({ ...content, locations: newLocs });
                                            }}
                                            className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Type</label>
                                        <input
                                            value={loc.type}
                                            onChange={e => {
                                                const newLocs = [...content.locations];
                                                newLocs[index].type = e.target.value;
                                                setContent({ ...content, locations: newLocs });
                                            }}
                                            className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Address</label>
                                        <input
                                            value={loc.address}
                                            onChange={e => {
                                                const newLocs = [...content.locations];
                                                newLocs[index].address = e.target.value;
                                                setContent({ ...content, locations: newLocs });
                                            }}
                                            className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Phone</label>
                                        <input
                                            value={loc.phone}
                                            onChange={e => {
                                                const newLocs = [...content.locations];
                                                newLocs[index].phone = e.target.value;
                                                setContent({ ...content, locations: newLocs });
                                            }}
                                            className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Global Map Settings</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400">Terminal Label (Overlay)</label>
                                <input
                                    value={content.map?.label || ''}
                                    onChange={e => setContent({ ...content, map: { ...content.map, label: e.target.value } })}
                                    className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                                    placeholder="e.g. Main Logistics Terminal"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400">Terminal Name</label>
                                <input
                                    value={content.map?.name || ''}
                                    onChange={e => setContent({ ...content, map: { ...content.map, name: e.target.value } })}
                                    className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                                    placeholder="e.g. Port of Lagos / Lekki Hub"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Google Maps Embed URL (Iframe Src)</label>
                            <input
                                value={content.map?.url || ''}
                                onChange={e => setContent({ ...content, map: { ...content.map, url: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                                placeholder="Paste the src attribute from Google Maps embed code"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Career Page Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Hero Headline</label>
                            <input
                                value={content.career?.hero_headline || ''}
                                onChange={e => setContent({ ...content, career: { ...content.career, hero_headline: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                                placeholder="e.g. Shape the Future of Energy Logistics"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Hero Subheadline</label>
                            <textarea
                                value={content.career?.hero_subheadline || ''}
                                onChange={e => setContent({ ...content, career: { ...content.career, hero_subheadline: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange h-24 text-brand-navy rounded-xl"
                                placeholder="e.g. Join our team of experts..."
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-navy">Open Positions</h4>
                            <button
                                onClick={() => {
                                    const newJobs = [...(content.career?.jobs || [])];
                                    newJobs.push({ title: "New Position", location: "Location", type: "Full-time" });
                                    setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                }}
                                className="bg-brand-navy text-white text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-brand-orange transition-colors font-bold uppercase tracking-widest"
                            >
                                <Plus size={14} /> Add Job
                            </button>
                        </div>
                        <div className="space-y-4">
                            {content.career?.jobs && content.career.jobs.map((job: any, index: number) => (
                                <div key={index} className="p-4 border border-gray-100 bg-gray-50 space-y-4 rounded-xl relative group">
                                    <button
                                        onClick={() => {
                                            const newJobs = content.career.jobs.filter((_: any, i: number) => i !== index);
                                            setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                        }}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Job Title</label>
                                            <input
                                                value={job.title}
                                                onChange={e => {
                                                    const newJobs = [...content.career.jobs];
                                                    newJobs[index].title = e.target.value;
                                                    setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                }}
                                                className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Location</label>
                                            <input
                                                value={job.location}
                                                onChange={e => {
                                                    const newJobs = [...content.career.jobs];
                                                    newJobs[index].location = e.target.value;
                                                    setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                }}
                                                className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Type</label>
                                            <input
                                                value={job.type}
                                                onChange={e => {
                                                    const newJobs = [...content.career.jobs];
                                                    newJobs[index].type = e.target.value;
                                                    setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                }}
                                                className="w-full bg-white border p-2 text-xs mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!content.career?.jobs || content.career.jobs.length === 0) && (
                                <p className="text-sm text-gray-400 italic">No open positions listed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
