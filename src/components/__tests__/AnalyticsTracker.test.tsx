import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AnalyticsTracker } from '../AnalyticsTracker';
import * as gtag from '@/lib/gtag';

jest.mock('next/navigation', () => ({
    usePathname: () => '/all-search-algorithms',
    useSearchParams: () => new URLSearchParams('page=1'),
}));

jest.mock('@/lib/gtag', () => ({
    trackPageView: jest.fn(),
    trackScrollDepth: jest.fn(),
    trackOutboundClick: jest.fn(),
}));

describe('AnalyticsTracker Component', () => {
    it('dispatches page_view event on route change', () => {
        render(<AnalyticsTracker />);
        expect(gtag.trackPageView).toHaveBeenCalledWith('/all-search-algorithms?page=1');
    });

    it('dispatches click event for external outbound links', () => {
        render(<AnalyticsTracker />);

        const anchor = document.createElement('a');
        anchor.href = 'https://external-domain.com/test';
        anchor.textContent = 'External Link';
        document.body.appendChild(anchor);

        fireEvent.click(anchor);

        expect(gtag.trackOutboundClick).toHaveBeenCalledWith('https://external-domain.com/test', 'External Link');
        document.body.removeChild(anchor);
    });
});
