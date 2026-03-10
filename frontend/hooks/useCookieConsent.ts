import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookieConsent';

export interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    acceptedAt: string | null;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
    acceptedAt: null,
};

export const useCookieConsent = () => {
    const [consent, setConsent] = useState<CookiePreferences>(() => {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === 'object') return parsed;
            } catch (e) {
                console.error('Failed to parse cookie consent:', e);
            }
        }
        return DEFAULT_PREFERENCES;
    });

    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const handleReopen = () => setShowSettings(true);
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === COOKIE_CONSENT_KEY && e.newValue) {
                try {
                    setConsent(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Failed to parse storage update:', err);
                }
            }
        };

        window.addEventListener('reopen-cookie-settings', handleReopen);
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('reopen-cookie-settings', handleReopen);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const saveConsent = (prefs: Partial<CookiePreferences>) => {
        const updated = {
            ...consent,
            ...prefs,
            essential: true, // Always true
            acceptedAt: new Date().toISOString(),
        };
        setConsent(updated);
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updated));
        setShowSettings(false);
    };

    const acceptAll = () => {
        saveConsent({
            analytics: true,
            marketing: true,
            preferences: true,
        });
    };

    const rejectNonEssential = () => {
        saveConsent({
            analytics: false,
            marketing: false,
            preferences: false,
        });
    };

    const hasGivenConsent = consent.acceptedAt !== null;

    return {
        consent,
        hasGivenConsent,
        showSettings,
        setShowSettings,
        acceptAll,
        rejectNonEssential,
        saveConsent,
    };
};
