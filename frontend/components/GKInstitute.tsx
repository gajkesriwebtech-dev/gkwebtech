import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, BookOpen, Users, Trophy, ExternalLink } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { TiltCard } from './TiltCard';

export const GKInstitute: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <Users className="text-secondary" />, value: '500+', label: t("gkinstitute.students", 'Students Trained') },
    { icon: <BookOpen className="text-secondary" />, value: '15+', label: t("gkinstitute.modules", 'Course Modules') },
    { icon: <Trophy className="text-secondary" />, value: '95%', label: t("gkinstitute.placement", 'Placement Rate') },
  ];

  return (
    <section id="gk-institute-section" className="py-20 px-16 w-full bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-secondary text-sm font-bold uppercase tracking-wider">
              <GraduationCap size={18} />
              <span>{t("gkinstitute.tag", "Learning Center")}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {t("gkinstitute.title_prefix", "GK Institute of")} <span className="text-secondary">{t("gkinstitute.title_highlight", "Digital Marketing")}</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              {t("gkinstitute.description", "Empowering the next generation of digital marketers through hands-on training, live projects, and expert mentorship. Transform your career with industry-recognized certifications.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-secondary/50 transition-colors group">
                  <div className="mb-3 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="https://institute.gkwebtech.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full font-bold hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20"
              >
                <span>{t("gkinstitute.cta", "Visit GK Institute Website")}</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:w-1/2 relative">
            <TiltCard className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Student learning"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-white font-medium italic">
                    "{t("gkinstitute.testimonial", "The best place to learn digital marketing with practical exposure to real-world campaigns.")}"
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center shadow-xl animate-bounce duration-[3s] z-20">
              <Trophy className="text-primary" size={32} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
