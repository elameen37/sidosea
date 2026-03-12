import { Metadata } from 'next';
import './globals.css';
import PageLoader from '@/components/shared/PageLoader';
import BackToTop from '@/components/shared/BackToTop';
import ChatAssistant from '@/components/shared/ChatAssistant';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: {
        default: 'SIDOSEA Logistics | Institutional Nigerian Crude Oil Export',
        template: '%s | SIDOSEA Logistics'
    },
    description: 'Verified allocations. Structured lifting. Global delivery. Secure and compliant access to Nigerian Bonny Light Crude oil for global refineries.',
    keywords: ['Bonny Light', 'BLCO', 'Nigerian Crude Oil', 'Energy Trading', 'Oil Logistics', 'SIDOSEA', 'Crude Oil Export', 'Nigerian Energy'],
    authors: [{ name: 'SIDOSEA Logistics' }],
    creator: 'SIDOSEA Logistics',
    publisher: 'SIDOSEA Logistics',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'SIDOSEA Logistics',
        title: 'SIDOSEA Logistics | Institutional Nigerian Crude Oil Export',
        description: 'Structured lifting and global delivery of Bonny Light Crude. Secure and compliant energy logistics.',
        images: [
            {
                url: '/images/tanker-aerial.jpg',
                width: 1200,
                height: 630,
                alt: 'SIDOSEA Logistics - Crude Oil Tanker',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SIDOSEA Logistics | Institutional Nigerian Crude Oil Export',
        description: 'Structured lifting and global delivery of Bonny Light Crude.',
        images: ['/images/tanker-aerial.jpg'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SIDOSEA Logistics',
        url: 'https://sidosea.com',
        logo: 'https://sidosea.com/logo.png',
        description: 'Institutional Nigerian Crude Oil Export and Logistics operator specializing in Bonny Light Crude Oil (BLCO).',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Plot 15, Admiralty Way, Lekki Phase 1',
            addressLocality: 'Lagos',
            addressCountry: 'NG'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+234-803-000-0000',
            contactType: 'customer service'
        }
    };

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased">
                <PageLoader />
                {children}
                <BackToTop />
                <ChatAssistant />
            </body>
        </html>
    );
}
