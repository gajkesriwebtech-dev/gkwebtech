import React from 'react';
import { Shield, Settings } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { CookieSettingsModal } from './CookieSettingsModal';

export const CookieConsentModal: React.FC = () => {
    const {
        consent,
        hasGivenConsent,
        showSettings,
        setShowSettings,
        acceptAll,
        rejectNonEssential,
        saveConsent,
    } = useCookieConsent();

    // If consent is already given, don't show the modal unless settings are open
    if (hasGivenConsent && !showSettings) return null;

    return (
        <>
            {!hasGivenConsent && (
                <div
                    className="fixed bottom-6 right-6 z-[90] w-full max-w-[400px] p-4 pointer-events-none"
                    role="complementary"
                    aria-label="Cookie consent banner"
                >
                    <div className="bg-white dark:bg-[#0F172A] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 p-6 pointer-events-auto transform transition-all duration-500 ease-out translate-y-0 opacity-100 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Shield size={22} strokeWidth={2.5} />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold text-[#1F4037] dark:text-white mb-1">
                                    We Value Your Privacy
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    We use cookies to improve your experience, analyze site traffic, and provide better services. You can choose which cookies you allow. <a href="/privacy" className="text-green-600 dark:text-green-400 hover:underline font-medium">Cookie Policy</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={acceptAll}
                                className="w-full py-3 bg-[#1F4037] dark:bg-green-900/40 hover:bg-[#162e28] dark:hover:bg-green-800/60 text-white dark:text-green-400 border border-transparent dark:border-green-500/30 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-md dark:shadow-none"
                            >
                                Accept All Cookies
                            </button>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={rejectNonEssential}
                                    className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800/40 hover:bg-gray-200 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/50 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98]"
                                >
                                    Reject Non-Essential
                                </button>

                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="px-4 py-2.5 flex items-center gap-2 text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded-2xl text-sm font-bold transition-colors"
                                >
                                    <span>Customize</span>
                                    <Settings size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <CookieSettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                initialPreferences={consent}
                onSave={saveConsent}
            />
        </>
    );
};
