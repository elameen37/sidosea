'use client';
import { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import SaveDialog from '@/components/shared/SaveDialog';

export default function ContentEditor() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

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

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

    return (
        <div className="space-y-8">
            <SaveDialog isOpen={showSaved} onClose={() => setShowSaved(false)} message="Content changes saved and published to the live site." />

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
                                value={content.homepage.headline}
                                onChange={e => setContent({ ...content, homepage: { ...content.homepage, headline: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Subheadline</label>
                            <textarea
                                value={content.homepage.subheadline}
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
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">About Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                            <input
                                value={content.about.title || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange text-brand-navy rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">Content</label>
                            <textarea
                                value={content.about.content || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, content: e.target.value } })}
                                className="w-full bg-gray-50 border p-3 text-sm mt-1 outline-none focus:border-brand-orange h-32 text-brand-navy rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange border-b pb-2">Global Presence Locations</h3>
                    {content.locations && content.locations.map((loc: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-100 bg-gray-50 space-y-4 rounded-xl">
                            <div className="grid grid-cols-2 gap-4">
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
                    ))}
                </div>
            </div>
        </div>
    );
}
