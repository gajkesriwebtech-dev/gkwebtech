import React from 'react';
import { useTranslation } from 'react-i18next';
import { Seo } from './Seo';

export const Tools: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <Seo
        title={t('seo.tools.title', 'Free Tools | GK WebTech | GKWebTech')}
        description={t('seo.tools.description', 'Access free digital marketing tools and resources provided by GK WebTech to help you optimize your online presence.')}
        keywords={t('seo.tools.keywords', 'free tools, SEO tools, marketing resources')}
        canonical={`${window.location.origin}/tools`}
        image={`${window.location.origin}/images/logo.png`}
        type="website"
      />
      <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-4">
        Coming Soon
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Tools & downloads are under construction 🚀
      </p>
    </div>
  );
};
