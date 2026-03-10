import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { CookieToggle } from './CookieToggle';
import { CookiePreferences } from '../../hooks/useCookieConsent';

interface CookieSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPreferences: CookiePreferences;
    onSave: (preferences: Partial<CookiePreferences>) => void;
}

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
    isOpen,
    onClose,
    initialPreferences,
    onSave,
}) => {
    const [prefs, setPrefs] = useState(initialPreferences);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(prefs);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative bg-white dark:bg-[#0F172A] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all border border-gray-100 dark:border-gray-800"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookie-settings-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1F4037]/10 dark:bg-[#FDB827]/10 flex items-center justify-center text-[#1F4037] dark:text-[#FDB827]">
                            <Settings size={22} />
                        </div>
                        <h2 id="cookie-settings-title" className="text-xl font-bold text-[#1F4037] dark:text-white">
                            Cookie Preferences
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-[#1F4037] dark:text-gray-200 uppercase tracking-wider">Essential Cookies</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">ALWAYS ON</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            Required for the website to function correctly. These cannot be disabled and are used for security and sessions.
                        </p>
                    </div>

                    <CookieToggle
                        id="analytics"
                        label="Analytics Cookies"
                        enabled={prefs.analytics}
                        onChange={(val) => setPrefs(prev => ({ ...prev, analytics: val }))}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 px-1 pb-4">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>

                    <CookieToggle
                        id="marketing"
                        label="Marketing Cookies"
                        enabled={prefs.marketing}
                        onChange={(val) => setPrefs(prev => ({ ...prev, marketing: val }))}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 px-1 pb-4">
                        Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                    </p>

                    <CookieToggle
                        id="preferences"
                        label="Preference Cookies"
                        enabled={prefs.preferences}
                        onChange={(val) => setPrefs(prev => ({ ...prev, preferences: val }))}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 px-1 pb-4">
                        Enable a website to remember information that changes the way the website behaves or looks, like your preferred language.
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-[#1F4037] dark:bg-[#FDB827] text-white dark:text-[#1F4037] rounded-2xl font-bold shadow-lg shadow-[#1F4037]/20 dark:shadow-[#FDB827]/20 hover:scale-[1.02] transition-all active:scale-95"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};
