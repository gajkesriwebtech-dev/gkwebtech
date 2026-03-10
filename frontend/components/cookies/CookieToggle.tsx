import React from 'react';

interface CookieToggleProps {
    id: string;
    label: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
}

export const CookieToggle: React.FC<CookieToggleProps> = ({
    id,
    label,
    enabled,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors px-1 rounded-lg">
            <label
                htmlFor={id}
                className="text-sm font-semibold text-[#1F4037] dark:text-gray-200 cursor-pointer flex-grow pr-4"
            >
                {label}
            </label>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={enabled}
                disabled={disabled}
                onClick={() => !disabled && onChange(!enabled)}
                className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FDB827] focus:ring-offset-2
          ${enabled ? 'bg-[#1F4037] dark:bg-[#FDB827]' : 'bg-gray-200 dark:bg-gray-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <span
                    aria-hidden="true"
                    className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
                />
            </button>
        </div>
    );
};
