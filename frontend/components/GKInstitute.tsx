import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export const GKInstitute: React.FC = () => {
  const features = [
    "SEO & Growth Marketing",
    "Social Media Marketing",
    "Paid Advertising & Analytics",
    "Real Client Projects",
    "Internship Opportunities",
  ];

  return (
    <section
      id="gk-institute-section"
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <SectionHeader
          label="GK Institute"
          title="Build Your Digital Marketing Career"
          subtitle="with GK Institute"
          center={true}
        />

        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg leading-relaxed">
            Learn digital marketing through real client projects, mentorship, and
            hands-on training programs designed to prepare you for real industry
            work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition hover:shadow-md"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FDB827] flex items-center justify-center text-[#1F4037]">
                  <CheckCircle2 size={18} strokeWidth={3} />
                </div>
                <span className="font-semibold text-[#1F4037] dark:text-gray-200 text-left">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://institute.gkwebtech.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1F4037] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform group"
          >
            <span>Visit GK Institute</span>
            <span className="w-8 h-8 rounded-full bg-[#FDB827] text-[#1F4037] flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowRight size={18} strokeWidth={3} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GKInstitute;
