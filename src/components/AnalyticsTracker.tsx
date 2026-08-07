'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackScrollDepth, trackOutboundClick } from '@/lib/gtag';

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const trackedScrolls = useRef<Set<number>>(new Set());

    // 1. Automatic SPA Page View Tracking on Route Change
    useEffect(() => {
        const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
        trackPageView(url);
        // Reset scroll thresholds on route change
        trackedScrolls.current.clear();
    }, [pathname, searchParams]);

    // 2. Automatic Scroll Depth Tracking (25%, 50%, 75%, 90%)
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollHeight <= 0) return;

            const percentage = Math.round((scrollTop / scrollHeight) * 100);
            const thresholds = [25, 50, 75, 90];

            thresholds.forEach((threshold) => {
                if (percentage >= threshold && !trackedScrolls.current.has(threshold)) {
                    trackedScrolls.current.add(threshold);
                    trackScrollDepth(threshold);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // 3. Automatic Outbound Click Tracking
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target || !target.href) return;

            const href = target.href;
            const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

            if (isExternal) {
                trackOutboundClick(href, target.textContent || '');
            }
        };

        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    return null;
}
