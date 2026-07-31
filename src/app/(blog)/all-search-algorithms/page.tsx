import React from 'react';
import type { Metadata } from 'next';
import { SearchAlgoTOC } from '@/components/search-algo/SearchAlgoTOC';
import { AlgorithmSection } from '@/components/search-algo/AlgorithmSection';
import { SearchAlgoFooter } from '@/components/search-algo/SearchAlgoFooter';
import { SEARCH_ALGORITHMS } from '@/components/search-algo/algorithmsData';
import styles from '@/components/search-algo/search-algo.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kmstech.co';

export const metadata: Metadata = {
    title: 'All Search Algorithms Masterclass | KMS Tech',
    description:
        'Explore an interactive, visual guide to 13 fundamental search algorithms. Features live step-by-step visualizers, real-world industry use cases, time/space complexity analysis, and interactive animations.',
    keywords: [
        'search algorithms',
        'algorithms',
        'binary search visualizer',
        'breadth first search',
        'depth first search',
        'dijkstra algorithm',
        'A star pathfinding',
        'KMP string search',
        'hash table search',
        'interactive algorithm simulator',
    ],
    alternates: {
        canonical: `${SITE_URL}/all-search-algorithms`,
    },
    openGraph: {
        title: 'All Search Algorithms Masterclass: Interactive Visualizer & Use Cases | KMS Tech',
        description:
            'An interactive visual guide covering 13 search algorithms across sequential, interval, graph, pathfinding, string, and hash table categories.',
        url: `${SITE_URL}/all-search-algorithms`,
        siteName: 'KMS Tech',
        type: 'website',
        images: [
            {
                url: `${SITE_URL}/og-images/all-search-algorithms.gif`,
                width: 1200,
                height: 630,
                alt: 'All Search Algorithms Masterclass - KMS Tech Interactive Engine',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Search Algorithms Masterclass | KMS Tech',
        description:
            'Interactive visualizer and real-world industry use cases for 13 fundamental search algorithms.',
        images: [`${SITE_URL}/og-images/all-search-algorithms.gif`],
    },
};

export default function AllSearchAlgorithmsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'All Search Algorithms Masterclass: Interactive Visualizer & Industry Use Cases',
        description:
            'Comprehensive interactive guide featuring step-by-step visualizers, time/space complexity analysis, and real-world software architecture applications for 13 fundamental search algorithms.',
        image: `${SITE_URL}/og-images/all-search-algorithms.gif`,
        author: {
            '@type': 'Organization',
            name: 'KMS Tech',
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'KMS Tech',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/kmstech-next.png`,
            },
        },
        mainEntityOfPage: `${SITE_URL}/all-search-algorithms`,
        educationalUse: 'Interactive Learning Suite',
    };

    return (
        <div className={styles.pageContainer}>
            {/* JSON-LD Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <header className={styles.heroSection}>
                <h1 className={styles.heroTitle}>All Search Algorithms Masterclass</h1>
                <p className={styles.heroSubtitle}>
                    An interactive, visual, and real-world guide to fundamental search algorithms. Explore live array scans, graph traversals, pathfinding heuristics, string matching, and hash table indexing.
                </p>
            </header>

            {/* Main Content Layout with Sticky TOC & Algorithm Cards */}
            <div className={styles.contentWrapper}>
                {/* Animated Sticky TOC */}
                <SearchAlgoTOC />

                {/* Sections List */}
                <main className={styles.sectionsContainer} role="main" aria-label="Search Algorithms Content">
                    {SEARCH_ALGORITHMS.map((algo) => (
                        <AlgorithmSection key={algo.id} algo={algo} />
                    ))}
                </main>
            </div>

            {/* Sticky Glassmorphic Footer */}
            <SearchAlgoFooter />
        </div>
    );
}
