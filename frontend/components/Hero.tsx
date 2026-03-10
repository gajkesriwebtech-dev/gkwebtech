import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 bg-bg-light dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left Content */}
          <div className="flex-1 z-10">
            <div className="inline-block relative mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-text-dark dark:text-white leading-tight mb-6 animate-fade-in-up opacity-0 transition-colors" style={{ animationDelay: '0.3s' }}>
              <span className="text-secondary decoration-secondary decoration-4">{t("hero.title_prefix", "GK WebTech,")}</span><br />
              {t("hero.title_main", "Digital Marketing")}<br />
              {t("hero.title_suffix", "Agency With Global Presence.")}
            </h1>

            <p className="text-gray-700 dark:text-gray-400 max-w-lg mb-8 text-lg animate-fade-in-up opacity-0 transition-colors" style={{ animationDelay: '0.5s' }}>
              {t("hero.subtitle", "We are an experienced Digital Marketing Agency helping brands scale with data-driven strategies, SEO, and creative campaigns.")}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s' }}>
              <Button onClick={scrollToContact} variant="primary" icon="arrow" href="/services">{t("hero.cta_book", "Book Consultation")}</Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <div className="aspect-[4/5] relative">
                {/* Yellow background shape */}
                <div className="absolute right-0 top-10 w-3/4 h-3/4 bg-secondary rounded-full opacity-90 blur-3xl"></div>
                <div className="absolute right-10 bottom-0 w-64 h-64 bg-secondary rounded-full z-0"></div>

                {/* Main Image */}
                <img
                  src="/images/hero-lcp-1400.webp"
                  srcSet={`
                    /images/hero-lcp-640.webp 640w,
                    /images/hero-lcp-768.webp 768w,
                    /images/hero-lcp-1024.webp 1024w,
                    /images/hero-lcp-1400.webp 1400w
                  `}
                  sizes="(max-width: 640px) 100vw, 512px"
                  alt="GK WebTech"
                  width={700}
                  height={875}
                  fetchPriority="high"
                  loading="eager" /* LCP Optimization: Priority load for hero image */
                  className="relative z-10 w-full h-full object-cover rounded-b-full object-top mask-image-bottom"
                  style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                />

                {/* Floating Badges */}
                <div className="absolute top-1/2 -right-4 md:-right-12 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                      <defs>
                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                      </defs>
                      <text fontSize="12" fill="#fff" fontWeight="bold" letterSpacing="2">
                        <textPath xlinkHref="#circle" className="text-primary fill-current">
                          {t("hero.results_label", "GET RESULTS")} * {t("hero.results_label", "GET RESULTS")} *
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ArrowUpRight className="text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-primary rounded-full -z-10 scale-90"></div>
                  </div>
                </div>

                <div className="absolute bottom-20 -left-4 md:-left-8 z-20 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-gray-100 dark:border-gray-700 transition-colors" style={{ animationDuration: '4s' }}>
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-bold">$$</div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{t("hero.results_label", "Results")}</p>
                    <p className="font-bold text-sm dark:text-white">{t("hero.roi_value", "300% ROI")}</p>
                  </div>
                </div>

                <div className="absolute top-20 left-0 z-20 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                  {t("hero.marketing_partners", "Marketing Partners")}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
