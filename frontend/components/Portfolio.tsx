import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { ArrowRight, Play, Image as ImageIcon, MapPin } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../data';

export const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  // Only show the first 3 projects on the home page
  const displayedProjects = projectsData.slice(0, 3);

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors" id="portfolio">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeader
            label={t("portfolio_page.work", "Our Work")}
            title={t("portfolio_page.title_prefix", "Capturing")}
            subtitle={t("portfolio_page.title_highlight", "Heritage & Luxury")}
          />
          <div className="mb-12">
            <Button variant="primary" icon="arrow" href="/portfolio">{t("portfolio_page.title_highlight", "View Full Gallery")}</Button>
          </div>
        </div>

        {/* Mobile: Horizontal Swipe, Desktop: Vertical Stack */}
        <div className="flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 gap-4 md:gap-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {displayedProjects.map((project, idx) => (
            <div key={idx} className="min-w-[90vw] md:min-w-0 snap-center md:mb-16 last:mb-0">
              <Link to={`/portfolio/${project.id}`} className="block group h-full">
                <TiltCard className="group relative bg-white dark:bg-gray-800 rounded-[2.5rem] p-4 shadow-xl dark:shadow-none md:hover:shadow-2xl active:scale-[0.98] transition-all duration-500 overflow-hidden border border-gray-300 dark:border-gray-700 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">

                    {/* Image Section */}
                    <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                      <div className="absolute inset-0 bg-black/10 md:group-hover:bg-black/0 transition-colors z-10"></div>
                      <img
                        src={project.image}
                        alt={t(`portfolio.${project.id}.title`, project.title)}
                        loading="lazy"
                        decoding="async" /* Performance: Decode off main thread */
                        width="800"
                        height="600"
                        className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Floating Media Badges */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-primary">
                          <Play size={14} fill="currentColor" />
                          <span>{project.mediaStats.videos} {t("portfolio.videos", "Videos")}</span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-primary">
                          <ImageIcon size={14} />
                          <span>{project.mediaStats.photos} {t("portfolio.photos", "Photos")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 lg:pr-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-secondary font-semibold text-sm mb-3">
                        <MapPin size={16} />
                        <span>{t(`portfolio.${project.id}.location`, project.location)}</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-white mb-4 md:group-hover:text-primary dark:md:group-hover:text-secondary transition-colors">
                        {t(`portfolio.${project.id}.title`, project.title)}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-[#2D5C4B] bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-emerald-300 rounded-full text-xs font-semibold tracking-wide uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-8">
                        {t(`portfolio.${project.id}.description`, project.description)}
                      </p>

                      <div className="flex items-center gap-4 mt-auto">
                        <button className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center md:group-hover:bg-secondary md:group-hover:text-primary transition-colors">
                          <ArrowRight size={24} />
                        </button>
                        <span className="font-medium text-sm text-gray-400 dark:text-gray-500 md:group-hover:text-secondary transition-colors">{t("portfolio.view_case", "View Project Case Study")}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
