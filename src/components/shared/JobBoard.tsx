'use client';

import { useState } from 'react';
import JobApplicationModal from './JobApplicationModal';

export default function JobBoard({ jobs }: { jobs: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');

    const handleApply = (jobTitle: string) => {
        setSelectedJob(jobTitle);
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

                <div className="space-y-4">
                    {jobs.length > 0 ? (
                        jobs.map((job: any, index: number) => (
                            <div key={index} className="group bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/10 hover:border-brand-orange/50 transition-all cursor-pointer">
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-brand-orange transition-colors">{job.title}</h3>
                                    <div className="flex items-center gap-4 text-white/50 text-sm font-mono">
                                        <span>{job.location}</span>
                                        <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                        <span>{job.type}</span>
                                    </div>
                                    {job.description && (
                                        <p className="text-white/40 text-sm font-light mt-3 max-w-xl leading-relaxed">{job.description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleApply(job.title)}
                                    className="mt-6 md:mt-0 text-brand-orange text-sm font-bold tracking-[0.2em] uppercase border border-brand-orange px-6 py-3 hover:bg-brand-orange hover:text-brand-navy transition-colors text-center inline-block"
                                >
                                    Apply Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white/5 border border-white/10 p-12 text-center rounded-2xl">
                            <p className="text-white/50 text-lg font-light">We currently have no open positions. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>

            <JobApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                jobTitle={selectedJob} 
            />
        </section>
    );
}
