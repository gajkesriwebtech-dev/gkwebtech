import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { TrendingUp, Users, Heart } from 'lucide-react';
import { TiltCard } from './TiltCard';

const getReasonKey = (title: string) => {
  if (title.includes("Data-Driven")) return "data-driven";
  if (title.includes("Experienced")) return "experienced-team";
  if (title.includes("Client Success")) return "client-focus";
  return title.toLowerCase().replace(/\s+/g, '-');
};

const reasons = [
  {
    icon: TrendingUp,
    title: "Data-Driven Strategies",
    description: "We leverage advanced analytics and market insights to build strategies that are measurable, adaptable, and guaranteed to perform. No guesswork, just results."
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our diverse team of digital experts brings years of experience across various industries, ensuring top-tier execution and innovative problem-solving for every campaign."
  },
  {
    icon: Heart,
    title: "Client Success Focus",
    description: "Your growth is our North Star. We prioritize transparent communication, tailored solutions, and a partnership mentality to ensure your long-term success."
  }
];

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          label={t("choose_us.label", "Why Choose Us")}
          title={t("choose_us.title", "Designed for")}
          subtitle={t("choose_us.subtitle", "Your Growth")}
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {reasons.map((item, idx) => {
            const key = getReasonKey(item.title);
            return (
              <TiltCard key={idx} className="group p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 shadow-xl dark:shadow-none hover:border-secondary hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full">
                {/* Decorative background circle */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors"></div>

                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm flex items-center justify-center text-primary dark:text-secondary mb-8 group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-gray-700">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">
                  {t(`choose_us.reasons.${key}.title`, item.title)}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  {t(`choose_us.reasons.${key}.description`, item.description)}
                </p>

                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 mt-8 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-secondary group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};