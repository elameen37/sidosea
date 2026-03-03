export default function ValueBlocks() {
    const blocks = [
        {
            title: "Verified Allocation Access",
            desc: "Direct access to state-approved crude oil allocations with full chain-of-custody verification."
        },
        {
            title: "End-to-End Documentation",
            desc: "Comprehensive management of SPA, POP, and shipping documents under international maritime law."
        },
        {
            title: "Regulatory Compliance",
            desc: "Strict adherence to NNPC, NUPRC, and international OFAC/sanctions screening protocols."
        },
        {
            title: "International Buyer Support",
            desc: "Bridging the gap between West African production and global refinery requirements."
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {blocks.map((block, i) => (
                        <div key={i} className="group cursor-default">
                            <div className="w-12 h-1 bg-brand-orange mb-6 group-hover:w-full transition-all duration-500"></div>
                            <h3 className="text-brand-navy font-bold text-lg mb-4 uppercase tracking-wider">{block.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{block.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
