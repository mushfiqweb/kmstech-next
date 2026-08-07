'use client';

import { sendGAEvent } from '@next/third-parties/google';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-N8DS3MQWYX';

/**
 * Dispatch a generic custom event to GA4
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    try {
        sendGAEvent('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    } catch {
        // Safe fallback in non-browser or test environments
    }
};

/**
 * Track user interactions on the Search Algorithms Masterclass
 */
export const trackAlgoInteraction = (algoId: string, action: 'play' | 'step' | 'reset' | 'target_change') => {
    trackEvent(`algo_${action}`, 'Algorithm Visualizer', algoId);
};

/**
 * Track user outreach conversions (Phone, WhatsApp, Email)
 */
export const trackContactClick = (channel: 'phone' | 'whatsapp' | 'email') => {
    trackEvent('click_contact', 'Contact Conversion', channel);
};

/**
 * Track SPA modal views (About, Services, Concerns, Contact, Blog)
 */
export const trackModalView = (modalName: string) => {
    trackEvent('view_modal', 'Navigation Modal', modalName);
};
