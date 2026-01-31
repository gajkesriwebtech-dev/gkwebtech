import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export type ComparisonRow = {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  performance: string | boolean;
  custom: string | boolean;
};

export type AccordionSection = {
  title: string;
  rows: ComparisonRow[];
};

interface AccordionTableProps {
  sections: AccordionSection[];
  onContact: (plan: string) => void;
}

export const AccordionTable: React.FC<AccordionTableProps> = ({ sections, onContact }) => {
  const [openSections, setOpenSections] = useState<number[]>([0]); // Default first open

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="text-secondary w-5 h-5 mx-auto" />;
    if (value === false) return <X className="text-gray-300 w-5 h-5 mx-auto" />;
    return <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{value}</span>;
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Row (Desktop) */}
      <div className="hidden lg:grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
        <div className="font-bold text-[#1F4037] dark:text-white">Feature</div>
        <div className="font-bold text-center text-gray-600 dark:text-gray-300">Starter</div>
        <div className="font-bold text-center text-gray-600 dark:text-gray-300">Growth</div>
        <div className="font-bold text-center text-gray-600 dark:text-gray-300">Performance</div>
        <div className="font-bold text-center text-secondary">Custom</div>
      </div>

      {sections.map((section, idx) => (
        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
          <button 
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center justify-between p-4 lg:px-6 lg:py-4 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-bold text-[#1F4037] dark:text-white text-lg">{section.title}</h3>
            {openSections.includes(idx) ? (
              <ChevronUp className="text-gray-500" size={20} />
            ) : (
              <ChevronDown className="text-gray-500" size={20} />
            )}
          </button>

          {openSections.includes(idx) && (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {section.rows.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-4 p-4 lg:px-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {/* Feature Name */}
                  <div className="font-medium text-gray-800 dark:text-gray-200 lg:col-span-1 mb-2 lg:mb-0">
                    {row.feature}
                  </div>

                  {/* Mobile Stacked View */}
                  <div className="grid grid-cols-4 lg:hidden gap-2 text-center text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Starter</span>
                      {renderCell(row.starter)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Growth</span>
                      {renderCell(row.growth)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Perf</span>
                      {renderCell(row.performance)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-secondary uppercase text-[10px]">Cust</span>
                      {renderCell(row.custom)}
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:contents">
                    <div className="text-center flex items-center justify-center">{renderCell(row.starter)}</div>
                    <div className="text-center flex items-center justify-center">{renderCell(row.growth)}</div>
                    <div className="text-center flex items-center justify-center">{renderCell(row.performance)}</div>
                    <div className="text-center flex items-center justify-center">{renderCell(row.custom)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  );
};
