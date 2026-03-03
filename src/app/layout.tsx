import { Metadata } from 'next';
import './globals.css';
import PageLoader from '@/components/shared/PageLoader';
import BackToTop from '@/components/shared/BackToTop';

export const metadata: Metadata = {
    title: 'SIDOSEA Logistics | Institutional Nigerian Crude Oil Export',
    description: 'Verified allocations. Structured lifting. Global delivery. Secure and compliant access to Nigerian Bonny Light Crude oil for global refineries.',
    keywords: ['Bonny Light', 'BLCO', 'Nigerian Crude Oil', 'Energy Trading', 'Oil Logistics', 'SIDOSEA'],
    openGraph: {
        title: 'SIDOSEA Logistics - Nigerian Crude Export Facilitation',
        description: 'Structured lifting and global delivery of Bonny Light Crude.',
        images: ['/images/tanker-aerial.jpg'],
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased">
                <PageLoader />
                {children}
                <BackToTop />
            </body>
        </html>
    );
}
