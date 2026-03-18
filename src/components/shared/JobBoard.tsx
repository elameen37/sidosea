'use client';

import { useState } from 'react';
import JobApplicationModal from './JobApplicationModal';

export default function JobBoard({ jobs }: { jobs: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobData, setSelectedJobData] = useState<any>(null);

    const handleApply = (job: any) => {
        setSelectedJobData(job);
        setIsModalOpen(true);
    };

    return (
        <section className="py-24 px-6 bg-brand-navy relative border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-4">Open Positions</h2>
                        <div className="h-1 w-20 bg-brand-orange"></div>
                    </div>
                    <p className="text-white/50 text-sm tracking-widest uppercase">
                        No active openings? Send your CV to careers@sidosea.com
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.length > 0 ? (
                        jobs.map((job: any, index: number) => (
                            <div 
                                key={index} 
                                className="group bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 hover:border-brand-orange/50 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-brand-orange/10 text-brand-orange text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-lg">
                                            {job.type}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3 group-hover:text-brand-orange transition-colors">
                                        {job.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 text-white/50 text-xs font-mono mb-6">
                                        <span>{job.location}</span>
                                    </div>

                                    {job.description && (
                                        <p className="text-white/40 text-sm font-light mb-8 leading-relaxed line-clamp-3">
                                            {job.description}
                                        </p>
                                    )}

                                    {job.deadline && (
                                        <div className="mb-8 pt-4 border-t border-white/5">
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mb-1">Application Deadline</p>
                                            <p className="text-xs text-brand-orange font-bold font-mono">{job.deadline}</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleApply(job)}
                                    className="w-full text-white text-xs font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 py-4 hover:bg-brand-orange hover:text-brand-navy hover:border-brand-orange transition-all text-center"
                                >
                                    Apply Now
                                </button>
                                
                                {/* Background design element */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white/5 border border-white/10 p-12 text-center rounded-2xl">
                            <p className="text-white/50 text-lg font-light">We currently have no open positions. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>

            <JobApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                jobTitle={selectedJobData?.title || ''} 
                jobDescription={selectedJobData?.description || ''}
            />
        </section>
    );
}
