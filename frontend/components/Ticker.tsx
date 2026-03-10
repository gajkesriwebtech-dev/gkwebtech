import React from 'react';
import { useTranslation } from 'react-i18next';
import { Asterisk } from 'lucide-react';

export const Ticker: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    t("services.seo-optimization.title", "SEO Optimization"),
    t("services.social-media-marketing.title", "Social Media Marketing"),
    t("services.content-strategy.title", "Content Strategy & Branding"),
    t("services.google-meta-ads.title", "Google & Meta Ads"),
    t("services.campaign-planning.title", "Campaign Planning & Analytics"),
    t("services.website-management.title", "Website Management & WordPress"),
    t("services.creative-design.title", "Creative Ad Design & Reels")
  ];

  return (
    <div className="bg-secondary py-6 overflow-hidden relative transform -skew-y-1 origin-bottom-left md:skew-y-0 xl:mx-[-2rem] 2xl:mx-[-4rem]">
      <div className="absolute inset-0 bg-primary opacity-0 md:hidden"></div> {/* Mobile adjustment if needed */}
      <div className="flex w-max whitespace-nowrap animate-marquee-fast md:animate-marquee items-center will-change-transform">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12 text-2xl md:text-3xl font-bold text-primary opacity-90 mr-12">
            <span>{item}</span>
            <Asterisk size={32} strokeWidth={3} className="opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};
