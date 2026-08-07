'use client';

import { sendGAEvent } from '@next/third-parties/google';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-N8DS3MQWYX';

/**
 * Dispatch a generic custom event to GA4
 */
export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
    try {
        sendGAEvent('event', action, params);
    } catch {
        // Safe fallback in non-browser or test environments
    }
};

/**
 * 1. Track Page Views (SPA Route Transitions)
 */
export const trackPageView = (url: string) => {
    trackEvent('page_view', {
        page_location: url,
        page_title: typeof document !== 'undefined' ? document.title : '',
    });
};

/**
 * 2. Track Scroll Depths (25%, 50%, 75%, 90%)
 */
export const trackScrollDepth = (depthPercentage: number) => {
    trackEvent('scroll', {
        percent_scrolled: depthPercentage,
    });
};

/**
 * 3. Track Outbound Clicks (External Links)
 */
export const trackOutboundClick = (url: string, text?: string) => {
    trackEvent('click', {
        outbound: true,
        link_url: url,
        link_text: text || '',
    });
};

/**
 * Track user interactions on the Search Algorithms Masterclass
 */
export const trackAlgoInteraction = (algoId: string, action: 'play' | 'step' | 'reset' | 'target_change') => {
    trackEvent(`algo_${action}`, {
        event_category: 'Algorithm Visualizer',
        event_label: algoId,
    });
};

/**
 * Track user outreach conversions (Phone, WhatsApp, Email)
 */
export const trackContactClick = (channel: 'phone' | 'whatsapp' | 'email') => {
    trackEvent('click_contact', {
        event_category: 'Contact Conversion',
        event_label: channel,
    });
};

/**
 * Track SPA modal views (About, Services, Concerns, Contact, Blog)
 */
export const trackModalView = (modalName: string) => {
    trackEvent('view_modal', {
        event_category: 'Navigation Modal',
        event_label: modalName,
    });
};
