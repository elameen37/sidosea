import Navbar from '@/components/shared/Navbar';
import MarketTicker from '@/components/shared/MarketTicker';
import Hero from '@/components/sections/Hero';
import ValueBlocks from '@/components/sections/ValueBlocks';
import About from '@/components/sections/About';
import Lifecycle from '@/components/sections/Lifecycle';
import Markets from '@/components/sections/Markets';
import Partners from '@/components/sections/Partners';
import Risk from '@/components/sections/Risk';
import Contact from '@/components/sections/Contact';
import ContactInfo from '@/components/sections/ContactInfo';

export default function Home() {
    return (
        <main className="min-h-screen bg-brand-white">
            <Navbar />
            <MarketTicker />
            <Hero />
            <ValueBlocks />
            <About />
            <Lifecycle />
            <Markets />
            <Partners />
            <Risk />
            <Contact />
            <ContactInfo />

            <footer className="bg-brand-navy py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-orange"></div>
                        <span className="text-white font-bold text-sm tracking-tight uppercase">SIDOSEA <span className="font-light">Logistics</span></span>
                    </div>
                    <p className="text-white/20 text-[10px] uppercase tracking-widest">
                        © 2026 SIDOSEA Logistics. All Rights Reserved. Institutional Crude Supply.
                    </p>
                    <div className="flex gap-8 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-orange transition-colors">Compliance Disclosure</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
