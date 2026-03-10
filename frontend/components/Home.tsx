import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Ticker } from './Ticker';
import { Services } from './Services';
import { About } from './About';
import { WhyChooseUs } from './WhyChooseUs';
import { Team } from './Team';
import { Techstack } from './Techstack';
import { Portfolio } from './Portfolio';
import { Contact } from './Contact';
import { Testimonials } from './Testimonials';
import { Blog } from './Blog';
import { FAQ } from './FAQ';
import { Seo } from './Seo';
import { GKInstitute } from './GKInstitute';

export const Home: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if we need to scroll to a specific section based on state or hash
    if (location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Seo
        title={t('seo.home.title', 'GK WebTech | Digital Marketing Agency | GKWebTech')}
        description={t('seo.home.description', 'GK WebTech is a performance-driven digital marketing agency offering SEO, PPC, and branding solutions. GKWebTech helps businesses grow online.')}
        keywords={t('seo.home.keywords', 'GKWebTech, digital marketing agency, SEO, PPC, social media, web development, training')}
        canonical={`${window.location.origin}/`}
        image={`${window.location.origin}/images/logo.png`}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GK WebTech",
          "alternateName": "GKWebTech",
          "url": `${window.location.origin}/`
        }}
      />
      <Hero />
      <Ticker />
      <Services />
      <About />
      <WhyChooseUs />
      <Team />
      <Techstack />
      <Portfolio />
      <Testimonials />
      <Blog />
      <FAQ />
      <GKInstitute />
      <Contact />
    </>
  );
};
