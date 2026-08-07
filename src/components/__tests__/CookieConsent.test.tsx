import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CookieConsent } from '../CookieConsent';

describe('CookieConsent Component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders cookie consent banner when no consent is saved in localStorage', () => {
        render(<CookieConsent />);

        act(() => {
            jest.advanceTimersByTime(1200);
        });

        expect(screen.getByRole('region', { name: /Cookie Consent Banner/i })).toBeInTheDocument();
        expect(screen.getByText(/Cookie Preferences/i)).toBeInTheDocument();
    });

    it('does not render if consent is already granted in localStorage', () => {
        localStorage.setItem('kmstech_cookie_consent', 'granted');
        render(<CookieConsent />);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(screen.queryByRole('region', { name: /Cookie Consent Banner/i })).not.toBeInTheDocument();
    });

    it('saves granted consent when clicking Got it button', () => {
        render(<CookieConsent />);

        act(() => {
            jest.advanceTimersByTime(1200);
        });

        const acceptBtn = screen.getByRole('button', { name: /Accept Cookies/i });
        fireEvent.click(acceptBtn);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(localStorage.getItem('kmstech_cookie_consent')).toBe('granted');
    });

    it('auto-closes after 6 seconds and sets dismissed state', () => {
        render(<CookieConsent />);

        act(() => {
            jest.advanceTimersByTime(1200); // Entrance timer
        });

        expect(screen.getByRole('region', { name: /Cookie Consent Banner/i })).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(6500); // Auto-close timer + animation
        });

        expect(localStorage.getItem('kmstech_cookie_consent')).toBe('dismissed');
    });
});
