'use client';
import { useState, useEffect } from 'react';
import { 
    Loader2, Save, Plus, Trash2, MapPin, FileUp, 
    Download, Globe, Layout, Share2, Briefcase, 
    CheckCircle2, AlertCircle, RefreshCw, X, ChevronRight,
    FileType, CloudUpload, Info, Home, Smartphone, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaveDialog from '@/components/shared/SaveDialog';

type SectionType = 'homepage' | 'socials' | 'profile' | 'about' | 'locations' | 'careers';

export default function ContentEditor() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionType>('homepage');

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
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                body: JSON.stringify(content),
            });
            if (!res.ok) throw new Error('Save failed');
            setShowSaved(true);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
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

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
            <p className="text-sm font-black text-brand-navy uppercase tracking-widest animate-pulse">Initializing Data Stream...</p>
        </div>
    );

    const sections = [
        { id: 'homepage', label: 'Landing & Identity', icon: Home },
        { id: 'about', label: 'Our Narrative', icon: Layout },
        { id: 'locations', label: 'Global Hubs', icon: MapPin },
        { id: 'careers', label: 'Talent & Careers', icon: Users },
        { id: 'profile', label: 'Corporate Assets', icon: FileType },
        { id: 'socials', label: 'External Channels', icon: Share2 },
    ];

    return (
        <div className="pb-32 relative">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Corporate architecture updated and synchronized across all deployment nodes." />
            <SaveDialog isOpen={showUploadSuccess} onClose={() => setShowUploadSuccess(false)} message="Asset successfully committed to cloud storage. Remember to finalize and publish changes." />

            {/* Header / Sub-nav */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange">
                            <Globe size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Content Architect</h1>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Institutional Data & Global Presence Console</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar no-scrollbar scroll-smooth">
                    {sections.map((sec) => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id as SectionType)}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeSection === sec.id ? 'bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/10' : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'}`}
                        >
                            <sec.icon size={16} />
                            {sec.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 gap-10">
                <AnimatePresence mode="wait">
                    {activeSection === 'homepage' && (
                        <motion.div
                            key="homepage"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <SectionCard title="Frontpage Hero Construction" subtitle="First impression & primary objective">
                                <div className="space-y-6">
                                    <InputWrapper label="Primary Headline" description="The core value proposition shown to visitors">
                                        <input
                                            value={content.homepage?.headline || ''}
                                            onChange={e => setContent({ ...content, homepage: { ...content.homepage, headline: e.target.value } })}
                                            className="form-input-premium"
                                            placeholder="e.g. Revolutionizing Global Energy Logistics"
                                        />
                                    </InputWrapper>
                                    <InputWrapper label="Supporting Narrative" description="Contextual subtext for the landing section">
                                        <textarea
                                            value={content.homepage?.subheadline || ''}
                                            onChange={e => setContent({ ...content, homepage: { ...content.homepage, subheadline: e.target.value } })}
                                            className="form-textarea-premium h-40"
                                            placeholder="Introduce the strategic vision..."
                                        />
                                    </InputWrapper>
                                </div>
                            </SectionCard>
                        </motion.div>
                    )}

                    {activeSection === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <SectionCard title="Mission & Vision" subtitle="The strategic narrative of the organization">
                                <div className="space-y-6">
                                    <InputWrapper label="Section Perspective Title" description="The header for the about section">
                                        <input
                                            value={content.about?.title || ''}
                                            onChange={e => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                                            className="form-input-premium"
                                        />
                                    </InputWrapper>
                                    <InputWrapper label="Deep Dive Content" description="Comprehensive overview of services and history">
                                        <textarea
                                            value={content.about?.content || ''}
                                            onChange={e => setContent({ ...content, about: { ...content.about, content: e.target.value } })}
                                            className="form-textarea-premium h-64"
                                        />
                                    </InputWrapper>
                                </div>
                            </SectionCard>
                        </motion.div>
                    )}

                    {activeSection === 'locations' && (
                        <motion.div
                            key="locations"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center px-4">
                                <div>
                                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tighter">Global Deployment Hubs</h3>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Operational nodes & terminal locations</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newLocs = [...(content.locations || [])];
                                        newLocs.push({ city: "Terminal City", address: "Precision Address", phone: "+000", type: "Distribution Hub" });
                                        setContent({ ...content, locations: newLocs });
                                    }}
                                    className="p-4 bg-brand-orange text-white rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-orange/20 font-black uppercase text-[10px] tracking-widest"
                                >
                                    <Plus size={18} /> Append Location
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content.locations?.map((loc: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-brand-orange/20 transition-all shadow-sm group relative"
                                    >
                                        <button
                                            onClick={() => {
                                                const newLocs = content.locations.filter((_: any, i: number) => i !== index);
                                                setContent({ ...content, locations: newLocs });
                                            }}
                                            className="absolute top-6 right-6 w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">City Center</label>
                                                <input
                                                    value={loc.city}
                                                    onChange={e => {
                                                        const newLocs = [...content.locations];
                                                        newLocs[index].city = e.target.value;
                                                        setContent({ ...content, locations: newLocs });
                                                    }}
                                                    className="w-full bg-gray-50 border-none px-4 py-2.5 text-xs font-black text-brand-navy rounded-xl focus:ring-2 focus:ring-brand-orange/10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Deployment Type</label>
                                                <input
                                                    value={loc.type}
                                                    onChange={e => {
                                                        const newLocs = [...content.locations];
                                                        newLocs[index].type = e.target.value;
                                                        setContent({ ...content, locations: newLocs });
                                                    }}
                                                    className="w-full bg-gray-50 border-none px-4 py-2.5 text-xs font-black text-brand-navy rounded-xl focus:ring-2 focus:ring-brand-orange/10"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Physical Address</label>
                                                <input
                                                    value={loc.address}
                                                    onChange={e => {
                                                        const newLocs = [...content.locations];
                                                        newLocs[index].address = e.target.value;
                                                        setContent({ ...content, locations: newLocs });
                                                    }}
                                                    className="w-full bg-gray-50 border-none px-4 py-3 text-xs font-black text-brand-navy rounded-xl focus:ring-2 focus:ring-brand-orange/10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Operational Contact</label>
                                                <input
                                                    value={loc.phone}
                                                    onChange={e => {
                                                        const newLocs = [...content.locations];
                                                        newLocs[index].phone = e.target.value;
                                                        setContent({ ...content, locations: newLocs });
                                                    }}
                                                    className="w-full bg-gray-50 border-none px-4 py-3 text-xs font-black text-brand-navy rounded-xl focus:ring-2 focus:ring-brand-orange/10"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <SectionCard title="Cartographic Configuration" subtitle="Google Maps visualization integration">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputWrapper label="Terminal Label" description="Brief overlay text on the map">
                                            <input
                                                value={content.map?.label || ''}
                                                onChange={e => setContent({ ...content, map: { ...content.map, label: e.target.value } })}
                                                className="form-input-premium"
                                            />
                                        </InputWrapper>
                                        <InputWrapper label="Institutional Name" description="Full name of the primary terminal">
                                            <input
                                                value={content.map?.name || ''}
                                                onChange={e => setContent({ ...content, map: { ...content.map, name: e.target.value } })}
                                                className="form-input-premium"
                                            />
                                        </InputWrapper>
                                    </div>
                                    <InputWrapper label="Embed Vector URL" description="The iFrame source for spatial visualization">
                                        <input
                                            value={content.map?.url || ''}
                                            onChange={e => setContent({ ...content, map: { ...content.map, url: e.target.value } })}
                                            className="form-input-premium font-mono text-[10px]"
                                        />
                                    </InputWrapper>
                                </div>
                            </SectionCard>
                        </motion.div>
                    )}

                    {activeSection === 'careers' && (
                        <motion.div
                            key="careers"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <SectionCard title="Employer Branding" subtitle="Career page identity construction">
                                <div className="space-y-6">
                                    <InputWrapper label="Career Hero Headline" description="Primary recruitment call to action">
                                        <input
                                            value={content.career?.hero_headline || ''}
                                            onChange={e => setContent({ ...content, career: { ...content.career, hero_headline: e.target.value } })}
                                            className="form-input-premium"
                                        />
                                    </InputWrapper>
                                    <InputWrapper label="Employment Narrative" description="Supporting subtext for potential candidates">
                                        <textarea
                                            value={content.career?.hero_subheadline || ''}
                                            onChange={e => setContent({ ...content, career: { ...content.career, hero_subheadline: e.target.value } })}
                                            className="form-textarea-premium h-32"
                                        />
                                    </InputWrapper>
                                </div>
                            </SectionCard>

                            <div className="flex justify-between items-center px-4">
                                <div>
                                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tighter">Active Vacancies</h3>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Institutional talent acquisition pipeline</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newJobs = [...(content.career?.jobs || [])];
                                        newJobs.push({ title: "Strategic Role", location: "Hub Location", type: "Permanent", description: "", deadline: "" });
                                        setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                    }}
                                    className="p-4 bg-brand-navy text-white rounded-2xl flex items-center gap-2 hover:bg-brand-orange transition-all shadow-xl font-black uppercase text-[10px] tracking-widest"
                                >
                                    <Plus size={18} /> New Position
                                </button>
                            </div>

                            <div className="space-y-6">
                                {content.career?.jobs?.map((job: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        className="bg-white p-8 rounded-[3rem] border-2 border-gray-50 hover:border-brand-orange/20 transition-all shadow-sm group"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="flex-1 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <InputWrapper label="Job Designation" description="">
                                                        <input
                                                            value={job.title}
                                                            onChange={e => {
                                                                const newJobs = [...content.career.jobs];
                                                                newJobs[index].title = e.target.value;
                                                                setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                            }}
                                                            className="form-input-premium border-b-2"
                                                        />
                                                    </InputWrapper>
                                                    <InputWrapper label="Operational Location" description="">
                                                        <input
                                                            value={job.location}
                                                            onChange={e => {
                                                                const newJobs = [...content.career.jobs];
                                                                newJobs[index].location = e.target.value;
                                                                setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                            }}
                                                            className="form-input-premium border-b-2"
                                                        />
                                                    </InputWrapper>
                                                    <InputWrapper label="Employment Status" description="">
                                                        <input
                                                            value={job.type}
                                                            onChange={e => {
                                                                const newJobs = [...content.career.jobs];
                                                                newJobs[index].type = e.target.value;
                                                                setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                            }}
                                                            className="form-input-premium border-b-2"
                                                        />
                                                    </InputWrapper>
                                                    <InputWrapper label="Application Deadline" description="">
                                                        <input
                                                            type="text"
                                                            value={job.deadline || ''}
                                                            onChange={e => {
                                                                const newJobs = [...content.career.jobs];
                                                                newJobs[index].deadline = e.target.value;
                                                                setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                            }}
                                                            placeholder="e.g. June 30, 2026"
                                                            className="form-input-premium border-b-2"
                                                        />
                                                    </InputWrapper>
                                                </div>
                                                <InputWrapper label="Perspective Description" description="Brief summary of responsibilities">
                                                    <textarea
                                                        value={job.description || ''}
                                                        onChange={e => {
                                                            const newJobs = [...content.career.jobs];
                                                            newJobs[index].description = e.target.value;
                                                            setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                        }}
                                                        className="form-textarea-premium h-24"
                                                    />
                                                </InputWrapper>
                                            </div>
                                            <div className="md:w-16 flex md:flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                                                <button
                                                    onClick={() => {
                                                        const newJobs = content.career.jobs.filter((_: any, i: number) => i !== index);
                                                        setContent({ ...content, career: { ...content.career, jobs: newJobs } });
                                                    }}
                                                    className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <SectionCard title="Corporate Asset Management" subtitle="Stakeholder resources & professional documentation">
                                <div className="p-10 bg-brand-navy rounded-[3.5rem] relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                        <div className="w-24 h-24 bg-brand-orange rounded-[2rem] flex items-center justify-center text-white shadow-2xl flex-shrink-0">
                                            {uploading ? <Loader2 size={40} className="animate-spin" /> : <FileType size={40} />}
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Institutional Profile (PDF)</h4>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed max-w-md">
                                                Upload the latest corporate credentials for potential partners and institutional stakeholders to access via the public interface.
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
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
                                                className={`flex items-center gap-3 px-10 py-5 rounded-[1.5rem] cursor-pointer font-black uppercase tracking-widest text-[10px] transition-all ${uploading ? 'bg-white/10 text-white/40' : 'bg-white text-brand-navy hover:bg-brand-orange hover:text-white shadow-2xl hover:scale-105'}`}
                                            >
                                                <CloudUpload size={20} />
                                                {uploading ? 'Committing Data...' : 'Commit New Asset'}
                                            </label>
                                        </div>
                                    </div>

                                    {content.profile_pdf_url && (
                                        <div className="mt-10 pt-10 border-t border-white/5 flex items-center gap-4">
                                            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                                            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Global Asset URL:</p>
                                            <code className="text-[9px] text-brand-orange font-mono truncate max-w-xs">{content.profile_pdf_url}</code>
                                        </div>
                                    )}
                                    <FileType className="absolute -bottom-10 -right-10 text-white/[0.03] rotate-12" size={200} />
                                </div>
                            </SectionCard>
                        </motion.div>
                    )}

                    {activeSection === 'socials' && (
                        <motion.div
                            key="socials"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <SectionCard title="External Connectivity" subtitle="Institutional social presence and communication hubs">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <InputWrapper label="LinkedIn Vector" description="Institutional professional network">
                                        <input
                                            value={content.socials?.linkedin || ''}
                                            onChange={e => setContent({ ...content, socials: { ...content.socials, linkedin: e.target.value } })}
                                            className="form-input-premium"
                                            placeholder="URL Link"
                                        />
                                    </InputWrapper>
                                    <InputWrapper label="Facebook Channel" description="Global community presence">
                                        <input
                                            value={content.socials?.facebook || ''}
                                            onChange={e => setContent({ ...content, socials: { ...content.socials, facebook: e.target.value } })}
                                            className="form-input-premium"
                                            placeholder="URL Link"
                                        />
                                    </InputWrapper>
                                    <InputWrapper label="Instagram Visuals" description="Operational brand insights">
                                        <input
                                            value={content.socials?.instagram || ''}
                                            onChange={e => setContent({ ...content, socials: { ...content.socials, instagram: e.target.value } })}
                                            className="form-input-premium"
                                            placeholder="URL Link"
                                        />
                                    </InputWrapper>
                                </div>
                            </SectionCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Save Bar */}
            <div className="fixed bottom-10 left-1/2 md:left-[55%] -translate-x-1/2 z-50 w-[90%] md:w-[600px]">
                <div className="bg-brand-navy/90 backdrop-blur-2xl p-4 pr-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 pl-4 shrink-0">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-orange">
                            <Info size={20} />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-[10px] text-white font-black uppercase tracking-widest leading-none mb-1">Status: Modified</p>
                            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Pending deployment</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 sm:flex-none px-6 py-4 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-[2] sm:flex-none px-10 py-4 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20"
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {saving ? 'Synchronizing...' : 'Finalize & Publish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionCard({ title, subtitle, children }: any) {
    return (
        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="mb-10">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tighter">{title}</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-1 italic">{subtitle}</p>
            </div>
            {children}
        </div>
    );
}

function InputWrapper({ label, description, children }: any) {
    return (
        <div className="space-y-3">
            <div className="flex flex-col">
                <label className="text-[9px] font-black uppercase text-brand-navy tracking-widest leading-none mb-1">{label}</label>
                {description && <p className="text-[8px] text-gray-400 font-bold uppercase mb-2">{description}</p>}
            </div>
            {children}
        </div>
    );
}
