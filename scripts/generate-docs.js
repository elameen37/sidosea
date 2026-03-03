const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType } = require('docx');
const fs = require('fs');
const path = require('path');

const NAVY = '0A192F';
const ORANGE = 'FF5F1F';
const LIGHT_GRAY = 'F2F2F2';
const WHITE = 'FFFFFF';

// ─────────── DOCUMENTATION ───────────

function createDocumentation() {
    const doc = new Document({
        styles: {
            default: {
                heading1: { run: { font: 'Calibri', size: 32, bold: true, color: NAVY } },
                heading2: { run: { font: 'Calibri', size: 26, bold: true, color: ORANGE } },
                document: { run: { font: 'Calibri', size: 22 } },
            }
        },
        sections: [{
            properties: {},
            children: [
                // Title Page
                new Paragraph({
                    spacing: { before: 4000 }, alignment: AlignmentType.CENTER, children: [
                        new TextRun({ text: 'SIDOSEA LOGISTICS', font: 'Calibri', size: 56, bold: true, color: NAVY }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, children: [
                        new TextRun({ text: 'Corporate Website — Technical Documentation', font: 'Calibri', size: 28, color: ORANGE }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [
                        new TextRun({ text: 'Version 1.0 | March 2026', font: 'Calibri', size: 22, color: '666666' }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
                        new TextRun({ text: 'Prepared by CraftWave Solutions', font: 'Calibri', size: 22, color: '666666', italics: true }),
                    ]
                }),

                // 1. Executive Summary
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '1. Executive Summary' }),
                    ]
                }),
                new Paragraph({
                    spacing: { after: 200 }, children: [
                        new TextRun({ text: 'SIDOSEA Logistics is a modern, institutional-grade corporate website designed for a Nigerian crude oil export facilitation company specializing in Bonny Light Crude Oil (BLCO). The platform reflects authority, compliance strength, structured execution capability, and international trading professionalism.' }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'The website is built as a Single Page Application (SPA) using React with Next.js App Router, featuring server-side rendering, SEO optimization, and a lightweight content management system (CMS) for internal administration.' }),
                    ]
                }),

                // 2. Technology Stack
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '2. Technology Stack' }),
                    ]
                }),
                createTechTable([
                    ['Component', 'Technology', 'Purpose'],
                    ['Framework', 'Next.js 14 (App Router)', 'Server-side rendering, routing, API routes'],
                    ['UI Library', 'React 18', 'Component-based user interface'],
                    ['Styling', 'Tailwind CSS 3', 'Utility-first CSS framework'],
                    ['Animation', 'Framer Motion', 'Smooth page transitions and micro-animations'],
                    ['Form Validation', 'Zod + react-hook-form', 'Schema-based input validation'],
                    ['Icons', 'Lucide React', 'Consistent SVG icon library'],
                    ['Typography', 'IBM Plex Sans / Mono', 'Professional institutional typeface'],
                    ['Authentication', 'Cookie-based session', 'Lightweight admin panel auth'],
                    ['Language', 'TypeScript', 'Type-safe development'],
                ]),

                // 3. Site Architecture
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '3. Site Architecture & Sections' }),
                    ]
                }),
                ...createSectionList([
                    { name: 'Navigation Bar', desc: 'Sticky glassmorphism navbar with responsive hamburger menu, brand mark, and a live "MARKETS OPEN" pulsing indicator.' },
                    { name: 'Page Loader', desc: 'Full-screen animated splash screen with wave text transition displaying "SIDOSEA Logistics" on initial page load.' },
                    { name: 'Hero Section', desc: 'Full-viewport hero with background imagery (tanker/inspection lab), animated headline, subheadline, and dual CTA buttons.' },
                    { name: 'Value Blocks', desc: 'Four-column grid highlighting core propositions: Verified Allocations, Documentation Management, Compliance Screening, Market Access.' },
                    { name: 'About / Identity', desc: 'Two-column layout with company positioning text and an interactive Bonny Light Technical Profile panel (API Gravity, Sulfur Content, Market Premium, Primary Yields).' },
                    { name: 'Transaction Lifecycle', desc: 'Interactive 6-step horizontal diagram: Allocation Validation → Commercial Structuring → Regulatory Compliance → Lifting Coordination → Documentation Execution → Financial Settlement.' },
                    { name: 'Markets Served', desc: 'Global market coverage (Europe, United States, Asia, Emerging Markets) with refinery sunset imagery.' },
                    { name: 'Risk & Compliance', desc: 'Institutional risk matrix covering Title Fraud, Payment Default, Operational Variance, and Regulatory Delays with structured mitigation strategies.' },
                    { name: 'Supply Engagement Form', desc: 'Lead qualification form with Zod validation, banking instrument dropdown, volume range selection, and NDA checkbox. Submissions sent to /api/lead.' },
                    { name: 'Footer', desc: 'Three-column footer with Lagos, London, and Houston office locations.' },
                    { name: 'Back to Top', desc: 'Modern center-positioned floating button that appears on scroll with smooth animation.' },
                ]),

                // 4. CMS & Admin
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '4. Content Management System (CMS)' }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'The platform includes a lightweight admin panel accessible at /admin/login. Features include:' }),
                    ]
                }),
                ...['Dashboard with key statistics (leads, compliance, allocations, edits)', 'Content editor for homepage and about section text', 'Lead submission viewer', 'Risk matrix management', 'Quick action buttons for common tasks'].map(item =>
                    new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: item })] })
                ),
                new Paragraph({
                    spacing: { before: 200 }, children: [
                        new TextRun({ text: 'Authentication: ', bold: true }),
                        new TextRun({ text: 'Cookie-based session auth with environment variable credentials (ADMIN_USERNAME / ADMIN_PASSWORD).' }),
                    ]
                }),

                // 5. API Endpoints
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '5. API Endpoints' }),
                    ]
                }),
                createTechTable([
                    ['Endpoint', 'Method', 'Description'],
                    ['/api/lead', 'POST', 'Submit lead qualification form data with Zod validation'],
                    ['/api/content', 'GET', 'Retrieve CMS-managed content from content.json'],
                    ['/api/content', 'POST', 'Update CMS content (authenticated)'],
                    ['/api/auth/login', 'POST', 'Admin authentication with cookie session'],
                    ['/api/auth/logout', 'POST', 'Clear admin session cookie'],
                ]),

                // 6. Design System
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '6. Design System' }),
                    ]
                }),
                new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: 'Color Palette' })] }),
                createTechTable([
                    ['Color', 'Hex Code', 'Usage'],
                    ['Neon Orange', '#FF5F1F', 'Primary accent, CTAs, highlights'],
                    ['Navy Blue', '#0A192F', 'Primary backgrounds, headings'],
                    ['Off-White', '#F8F9FA', 'Content backgrounds, body text areas'],
                    ['Green', '#22C55E', 'Live status indicators (MARKETS OPEN)'],
                ]),
                new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: 'Typography' })] }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Primary: ', bold: true }), new TextRun({ text: 'IBM Plex Sans (weights: 300-700)' }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Monospace: ', bold: true }), new TextRun({ text: 'IBM Plex Mono (data panels, technical specs)' }),
                    ]
                }),

                // 7. File Structure
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '7. Project File Structure' }),
                    ]
                }),
                ...['src/app/page.tsx — Main SPA homepage',
                    'src/app/layout.tsx — Root layout with SEO metadata and fonts',
                    'src/app/globals.css — Global styles and Tailwind config',
                    'src/components/shared/Navbar.tsx — Responsive navigation bar',
                    'src/components/shared/PageLoader.tsx — Animated page loader',
                    'src/components/shared/BackToTop.tsx — Back to top button',
                    'src/components/sections/Hero.tsx — Hero section',
                    'src/components/sections/About.tsx — About and Bonny Light panel',
                    'src/components/sections/Lifecycle.tsx — 6-step transaction diagram',
                    'src/components/sections/Markets.tsx — Markets served',
                    'src/components/sections/Risk.tsx — Risk & compliance matrix',
                    'src/components/sections/Contact.tsx — Lead qualification form',
                    'src/components/sections/ValueBlocks.tsx — Core value propositions',
                    'src/lib/schemas.ts — Zod validation schemas',
                    'src/lib/auth.ts — Authentication utilities',
                    'src/lib/content.json — CMS content store',
                    'src/app/api/ — API route handlers',
                    'src/app/admin/ — Admin panel pages',
                    'public/images/ — Optimized image assets',
                ].map(item =>
                    new Paragraph({ bullet: { level: 0 }, spacing: { after: 50 }, children: [new TextRun({ text: item, font: 'Consolas', size: 18 })] })
                ),

                // 8. Performance & Security
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: '8. Performance & Security' }),
                    ]
                }),
                ...['Server-side rendering for optimal SEO and initial load performance',
                    'Image optimization via Next.js Image component',
                    'Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy',
                    'Zod-based input validation on both client and server',
                    'HttpOnly, Secure, SameSite cookie-based authentication',
                    'Environment variable-based credential management',
                ].map(item =>
                    new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: item })] })
                ),
            ]
        }]
    });
    return doc;
}

// ─────────── BILL OF QUANTITIES ───────────

function createBOQ() {
    const RATE_NGN_USD = 1550; // approximate exchange rate

    const items = [
        { sn: 1, desc: 'Project Planning & Architecture', details: 'Requirements analysis, architecture design, component hierarchy, implementation planning', unit: 'Lot', qty: 1, rateUSD: 500 },
        { sn: 2, desc: 'UI/UX Design System', details: 'Brand color palette, typography, Tailwind CSS configuration, global styles, responsive design tokens', unit: 'Lot', qty: 1, rateUSD: 400 },
        { sn: 3, desc: 'Navigation Bar Component', details: 'Sticky glassmorphism navbar, responsive hamburger menu, MARKETS OPEN indicator, scroll behavior', unit: 'Ea', qty: 1, rateUSD: 250 },
        { sn: 4, desc: 'Page Loader Animation', details: 'Full-screen splash with wave text transition, Framer Motion animation, brand styling', unit: 'Ea', qty: 1, rateUSD: 200 },
        { sn: 5, desc: 'Hero Section', details: 'Full-viewport hero with background image overlay, animated headline, dual CTA buttons', unit: 'Ea', qty: 1, rateUSD: 350 },
        { sn: 6, desc: 'Value Blocks Section', details: 'Four-column grid with animated indicators, hover effects, responsive layout', unit: 'Ea', qty: 1, rateUSD: 200 },
        { sn: 7, desc: 'About / Identity Section', details: 'Two-column layout, Bonny Light Technical Profile data panel with image overlay', unit: 'Ea', qty: 1, rateUSD: 350 },
        { sn: 8, desc: 'Transaction Lifecycle Diagram', details: 'Interactive 6-step horizontal diagram with hover expansion, auto-rotation, step descriptions', unit: 'Ea', qty: 1, rateUSD: 450 },
        { sn: 9, desc: 'Markets Served Section', details: 'Regional market cards, refinery sunset imagery, animated layout', unit: 'Ea', qty: 1, rateUSD: 250 },
        { sn: 10, desc: 'Risk & Compliance Matrix', details: 'Institutional risk table with structured mitigation strategies, responsive grid', unit: 'Ea', qty: 1, rateUSD: 300 },
        { sn: 11, desc: 'Supply Engagement Form', details: 'Lead qualification form with Zod validation, react-hook-form, banking instrument dropdown, NDA checkbox, success/error states', unit: 'Ea', qty: 1, rateUSD: 500 },
        { sn: 12, desc: 'Footer Component', details: 'Three-column footer with office locations (Lagos, London, Houston), brand positioning', unit: 'Ea', qty: 1, rateUSD: 150 },
        { sn: 13, desc: 'Back to Top Button', details: 'Center-positioned floating button with scroll detection, Framer Motion animation', unit: 'Ea', qty: 1, rateUSD: 100 },
        { sn: 14, desc: 'Admin Authentication System', details: 'Cookie-based login/logout API routes, secure session management, protected routes', unit: 'Lot', qty: 1, rateUSD: 350 },
        { sn: 15, desc: 'Admin Dashboard', details: 'Statistics overview, recent leads display, quick action buttons, sidebar navigation', unit: 'Ea', qty: 1, rateUSD: 400 },
        { sn: 16, desc: 'Admin Content Editor', details: 'Real-time content editing for homepage/about sections, API integration, save functionality', unit: 'Ea', qty: 1, rateUSD: 350 },
        { sn: 17, desc: 'API Routes Development', details: 'Lead submission endpoint, content CRUD endpoints, authentication endpoints with validation', unit: 'Lot', qty: 1, rateUSD: 300 },
        { sn: 18, desc: 'SEO & Metadata Configuration', details: 'OpenGraph tags, meta descriptions, keywords, structured data, sitemap readiness', unit: 'Lot', qty: 1, rateUSD: 200 },
        { sn: 19, desc: 'Security Headers & Hardening', details: 'X-Frame-Options, CSP readiness, XSS protection, referrer policy, HTTPS enforcement config', unit: 'Lot', qty: 1, rateUSD: 200 },
        { sn: 20, desc: 'Image Assets & Optimization', details: 'Institutional imagery (tanker, inspection lab, refinery, storage tanks), optimization and integration', unit: 'Lot', qty: 1, rateUSD: 250 },
        { sn: 21, desc: 'Responsive Design & Testing', details: 'Mobile, tablet, desktop breakpoints, cross-browser testing, performance validation', unit: 'Lot', qty: 1, rateUSD: 350 },
        { sn: 22, desc: 'Deployment Configuration', details: 'Production build setup, environment configuration, Vercel/hosting readiness', unit: 'Lot', qty: 1, rateUSD: 200 },
    ];

    const totalUSD = items.reduce((sum, i) => sum + (i.qty * i.rateUSD), 0);
    const totalNGN = totalUSD * RATE_NGN_USD;

    const noBorder = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };
    const thinBorder = { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } };

    const headerRow = new TableRow({
        tableHeader: true,
        children: ['S/N', 'Description', 'Details', 'Unit', 'Qty', 'Rate (USD)', 'Amount (USD)', 'Amount (NGN)'].map((text, i) =>
            new TableCell({
                width: { size: i === 2 ? 3000 : i === 1 ? 2000 : 1000, type: WidthType.DXA },
                shading: { type: ShadingType.SOLID, color: NAVY },
                borders: thinBorder,
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER, children: [
                        new TextRun({ text, font: 'Calibri', size: 18, bold: true, color: WHITE }),
                    ]
                })],
            })
        ),
    });

    const dataRows = items.map((item, idx) =>
        new TableRow({
            children: [
                cell(String(item.sn), idx),
                cell(item.desc, idx, false, AlignmentType.LEFT),
                cell(item.details, idx, false, AlignmentType.LEFT, 16),
                cell(item.unit, idx),
                cell(String(item.qty), idx),
                cell(formatUSD(item.rateUSD), idx, false, AlignmentType.RIGHT),
                cell(formatUSD(item.qty * item.rateUSD), idx, false, AlignmentType.RIGHT),
                cell(formatNGN(item.qty * item.rateUSD * RATE_NGN_USD), idx, false, AlignmentType.RIGHT),
            ]
        })
    );

    const totalRow = new TableRow({
        children: [
            new TableCell({
                columnSpan: 6, shading: { type: ShadingType.SOLID, color: NAVY }, borders: thinBorder, children: [
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'GRAND TOTAL', font: 'Calibri', size: 20, bold: true, color: WHITE })] }),
                ]
            }),
            new TableCell({
                shading: { type: ShadingType.SOLID, color: ORANGE }, borders: thinBorder, children: [
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatUSD(totalUSD), font: 'Calibri', size: 20, bold: true, color: WHITE })] }),
                ]
            }),
            new TableCell({
                shading: { type: ShadingType.SOLID, color: ORANGE }, borders: thinBorder, children: [
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatNGN(totalNGN), font: 'Calibri', size: 20, bold: true, color: WHITE })] }),
                ]
            }),
        ]
    });

    const doc = new Document({
        styles: {
            default: {
                heading1: { run: { font: 'Calibri', size: 32, bold: true, color: NAVY } },
                heading2: { run: { font: 'Calibri', size: 26, bold: true, color: ORANGE } },
                document: { run: { font: 'Calibri', size: 22 } },
            }
        },
        sections: [{
            properties: {},
            children: [
                // Title
                new Paragraph({
                    spacing: { before: 3000 }, alignment: AlignmentType.CENTER, children: [
                        new TextRun({ text: 'SIDOSEA LOGISTICS', font: 'Calibri', size: 56, bold: true, color: NAVY }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, children: [
                        new TextRun({ text: 'Bill of Quantities (BOQ)', font: 'Calibri', size: 32, color: ORANGE }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
                        new TextRun({ text: 'Corporate Website Development', font: 'Calibri', size: 24, color: '666666' }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
                        new TextRun({ text: 'Version 1.0 | March 2026', font: 'Calibri', size: 22, color: '999999' }),
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
                        new TextRun({ text: 'Prepared by CraftWave Solutions', font: 'Calibri', size: 22, color: '999999', italics: true }),
                    ]
                }),

                // Exchange Rate Note
                new Paragraph({
                    heading: HeadingLevel.HEADING_2, spacing: { before: 600 }, children: [
                        new TextRun({ text: 'Exchange Rate Basis' }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'All Naira amounts are calculated at an indicative rate of ' }),
                        new TextRun({ text: '₦1,550 / $1 USD', bold: true, color: ORANGE }),
                        new TextRun({ text: '. Final invoicing will reflect the prevailing CBN rate at the time of engagement.' }),
                    ]
                }),

                // BOQ Table
                new Paragraph({
                    heading: HeadingLevel.HEADING_1, spacing: { before: 600 }, children: [
                        new TextRun({ text: 'Itemized Bill of Quantities' }),
                    ]
                }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [headerRow, ...dataRows, totalRow],
                }),

                // Summary
                new Paragraph({
                    heading: HeadingLevel.HEADING_2, spacing: { before: 600 }, children: [
                        new TextRun({ text: 'Summary' }),
                    ]
                }),
                createTechTable([
                    ['Description', 'Amount (USD)', 'Amount (NGN)'],
                    ['Total Development Cost', formatUSD(totalUSD), formatNGN(totalNGN)],
                ]),

                // Terms
                new Paragraph({
                    heading: HeadingLevel.HEADING_2, spacing: { before: 600 }, children: [
                        new TextRun({ text: 'Terms & Conditions' }),
                    ]
                }),
                ...['Payment Terms: 50% upfront, 50% on delivery and acceptance.',
                    'Timeline: 2-3 weeks from project kickoff to deployment.',
                    'Scope: Pricing covers all items listed above. Additional features or pages will be quoted separately.',
                    'Revisions: Up to 2 rounds of design revisions included per section.',
                    'Hosting: Deployment configuration is included; hosting costs are separate.',
                    'Support: 30 days post-launch support included for bug fixes.',
                ].map(item =>
                    new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: item })] })
                ),
            ]
        }]
    });
    return doc;
}

// ─────────── HELPERS ───────────

function cell(text, rowIdx, bold = false, align = AlignmentType.CENTER, fontSize = 18) {
    const thinBorder = { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } };
    return new TableCell({
        borders: thinBorder,
        shading: rowIdx % 2 === 0 ? { type: ShadingType.SOLID, color: LIGHT_GRAY } : undefined,
        children: [new Paragraph({
            alignment: align, children: [
                new TextRun({ text, font: 'Calibri', size: fontSize, bold }),
            ]
        })],
    });
}

function formatUSD(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatNGN(amount) {
    return '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function createTechTable(data) {
    const thinBorder = { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } };
    const rows = data.map((row, rIdx) =>
        new TableRow({
            tableHeader: rIdx === 0,
            children: row.map(cellText =>
                new TableCell({
                    shading: rIdx === 0 ? { type: ShadingType.SOLID, color: NAVY } : rIdx % 2 === 0 ? { type: ShadingType.SOLID, color: LIGHT_GRAY } : undefined,
                    borders: thinBorder,
                    children: [new Paragraph({
                        children: [
                            new TextRun({ text: cellText, font: 'Calibri', size: 20, bold: rIdx === 0, color: rIdx === 0 ? WHITE : '333333' }),
                        ]
                    })],
                })
            ),
        })
    );
    return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows });
}

function createSectionList(sections) {
    const result = [];
    sections.forEach(s => {
        result.push(new Paragraph({
            spacing: { before: 200 }, children: [
                new TextRun({ text: s.name, bold: true, color: NAVY }),
            ]
        }));
        result.push(new Paragraph({
            children: [
                new TextRun({ text: s.desc, color: '555555' }),
            ]
        }));
    });
    return result;
}

// ─────────── MAIN ───────────

async function main() {
    const outDir = path.join(__dirname, '..', 'src', 'docs');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    console.log('Generating documentation...');
    const docDoc = createDocumentation();
    const docBuffer = await Packer.toBuffer(docDoc);
    fs.writeFileSync(path.join(outDir, 'SIDOSEA_Logistics_Documentation.docx'), docBuffer);
    console.log('✅ Documentation saved to src/docs/SIDOSEA_Logistics_Documentation.docx');

    console.log('Generating BOQ...');
    const boqDoc = createBOQ();
    const boqBuffer = await Packer.toBuffer(boqDoc);
    fs.writeFileSync(path.join(outDir, 'SIDOSEA_Logistics_BOQ.docx'), boqBuffer);
    console.log('✅ BOQ saved to src/docs/SIDOSEA_Logistics_BOQ.docx');
}

main().catch(console.error);
