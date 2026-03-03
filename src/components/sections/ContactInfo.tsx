'use client';
import { motion } from 'framer-motion';
import { Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

const locations = [
    {
        city: 'Lagos',
        address: 'Plot 15, Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
        phone: '+234 (0) 803 000 0000',
        type: 'Operational Headquarters'
    },
    {
        city: 'London',
        address: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK',
        phone: '+44 (0) 20 7000 0000',
        type: 'International Trading Office'
    },
    {
        city: 'Houston',
        address: '1200 Smith St, Houston, TX 77002, United States',
        phone: '+1 (713) 000 0000',
        type: 'Logistics & Energy Hub'
    }
];

export default function ContactInfo() {
    return (
        <section id="contact-info" className="bg-brand-white py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Addresses & Contact Details */}
                    <div className="space-y-12">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block"
                            >
                                Global Presence
                            </motion.span>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy uppercase tracking-tight">
                                Institutional <span className="font-light">Connect</span>
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-lg leading-relaxed">
                                Direct access to our operational hubs and authorized trading desks across major energy markets.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-6 bg-gray-50 border border-gray-100 hover:border-brand-orange/30 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors">
                                            <MapPin size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">{loc.city}</h3>
                                                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{loc.type}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed mb-3">{loc.address}</p>
                                            <a
                                                href={`tel:${loc.phone.replace(/\s/g, '')}`}
                                                className="flex items-center gap-2 text-brand-navy font-mono text-xs hover:text-brand-orange transition-colors"
                                            >
                                                <Phone size={12} className="text-brand-orange" />
                                                {loc.phone}
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="h-[400px] lg:h-full min-h-[500px] relative bg-gray-100 border border-gray-200 overflow-hidden"
                    >
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent pointer-events-none z-10" />

                        {/* Map Frame */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.558376483321!2d3.473539824641595!3d6.438996501198424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4480e0c8d17%3A0xe6440263f68d6f55!2sLekki%20Phase%201%2C%20Lagos!5e0!3m2!1sen!2sng!4v1709425000000!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="relative z-0"
                        />

                        {/* Float Info */}
                        <div className="absolute bottom-6 left-6 right-6 z-20 bg-brand-navy p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Main Logistics Terminal</p>
                                <h4 className="text-white font-bold uppercase tracking-tight text-sm">Port of Lagos / Lekki Hub</h4>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] bg-brand-orange text-white px-4 py-2 font-bold uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all">
                                <ExternalLink size={14} /> Open in Maps
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
