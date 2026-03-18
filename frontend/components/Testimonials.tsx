import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { testimonialsData } from '../data';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors" id="testimonials">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-24">
        <SectionHeader
          label={t("testimonials.label", "Client Success")}
          title={t("testimonials.title", "What Our")}
          subtitle={t("testimonials.subtitle", "Partners Say")}
          center
        />

        <div className="relative max-w-6xl mx-auto mt-12">
          {/* Mobile: Horizontal Swipe, Desktop: Grid */}
          <div className="flex flex-col md:block">
            <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {testimonialsData.map((item, idx) => (
                <div key={idx} className="min-w-[85vw] md:min-w-0 snap-center h-full">
                  <TiltCard className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl dark:shadow-none border border-gray-300 dark:border-gray-700 relative group active:scale-95 md:hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="absolute top-8 right-8 opacity-10">
                      <Quote size={64} className="text-primary dark:text-white fill-current" />
                    </div>
                    <div className="flex gap-1 mb-6 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} />
                      ))}
                      <span className="text-text-dark dark:text-white font-bold ml-2 text-sm">{item.rating}.0</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-sm">
                      {t(`testimonials.data.${item.id}.text`, item.text)}
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={t(`testimonials.data.${item.id}.name`, item.name)}
                        loading="lazy"
                        decoding="async"
                        width="48"
                        height="48"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                      />
                      <div>
                        <h4 className="font-bold text-text-dark dark:text-white text-sm">{t(`testimonials.data.${item.id}.name`, item.name)}</h4>
                        <p className="text-xs text-gray-400">{t(`testimonials.data.${item.id}.role`, item.role)}</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};