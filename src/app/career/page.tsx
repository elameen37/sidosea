import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';

export const metadata = {
    title: 'Careers',
    description: 'Join SIDOSEA Logistics and help shape the future of institutional crude oil trading and logistics in Nigeria.'
};

export default function CareerPage() {
    return (
        <main className="min-h-screen bg-brand-navy">
            <Navbar />

            {/* Career Hero */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/tanker-aerial.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left">
                    <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 block">Careers at SIDOSEA</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
                        Shape the Future of <br className="hidden md:block"/>
                        <span className="text-brand-orange">Energy Logistics</span>
                    </h1>
                    <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
                        We are a premier institutional crude oil trading and logistics company. 
                        Join our team of experts in Lagos, Port Harcourt, and London to build compliant, secure, and structured energy supply chains.
                    </p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-24 px-6 bg-brand-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy uppercase tracking-tight mb-4">Why SIDOSEA?</h2>
                        <div className="h-1 w-20 bg-brand-orange mx-auto md:mx-0"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xl mb-6">01</div>
                            <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wide mb-3">Global Impact</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Work on high-stakes institutional supply contracts that power refineries and government energy entities worldwide.
                            </p>
                        </div>
                        <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xl mb-6">02</div>
                            <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wide mb-3">Uncompromising Ethics</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Compliance is in our DNA. We operate strictly under Nigerian industry standards and NNPC/NNPC Ltd guidelines.
                            </p>
                        </div>
                        <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xl mb-6">03</div>
                            <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wide mb-3">Career Growth</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                From logistics operations in Port Harcourt to international liaison in London, your growth potential is limitless.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
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
                        {/* Placeholder Job */}
                        <div className="group bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/10 hover:border-brand-orange/50 transition-all cursor-pointer">
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-brand-orange transition-colors">Logistics Operations Manager</h3>
                                <div className="flex items-center gap-4 text-white/50 text-sm font-mono">
                                    <span>Lagos, Nigeria</span>
                                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                    <span>Full-time</span>
                                </div>
                            </div>
                            <button className="mt-6 md:mt-0 text-brand-orange text-sm font-bold tracking-[0.2em] uppercase border border-brand-orange px-6 py-3 hover:bg-brand-orange hover:text-brand-navy transition-colors">
                                Apply Now
                            </button>
                        </div>

                        {/* Placeholder Job */}
                        <div className="group bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/10 hover:border-brand-orange/50 transition-all cursor-pointer">
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-brand-orange transition-colors">Compliance Officer</h3>
                                <div className="flex items-center gap-4 text-white/50 text-sm font-mono">
                                    <span>London, UK / Remote</span>
                                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                    <span>Full-time</span>
                                </div>
                            </div>
                            <button className="mt-6 md:mt-0 text-brand-orange text-sm font-bold tracking-[0.2em] uppercase border border-brand-orange px-6 py-3 hover:bg-brand-orange hover:text-brand-navy transition-colors">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shared Footer */}
            <footer className="bg-[#0a0f18] py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-orange"></div>
                        <span className="text-white font-bold text-sm tracking-tight uppercase">SIDOSEA <span className="font-light">Logistics</span></span>
                    </Link>
                    <p className="text-white/20 text-[10px] uppercase tracking-widest text-center">
                        © 2026 SIDOSEA Logistics. All Rights Reserved. Institutional Crude Supply.
                    </p>
                    <div className="flex gap-8 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        <Link href="/#privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
                        <Link href="/#compliance" className="hover:text-brand-orange transition-colors">Compliance Disclosure</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
