import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Breadcrumb = {
  name: string;
  item: string;
};

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: object;
  breadcrumbs?: Breadcrumb[];
};

function setTag(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    if (selector.startsWith('meta')) {
      el = document.createElement('meta');
      const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
      const propMatch = selector.match(/meta\[property="([^"]+)"\]/);
      if (nameMatch) (el as HTMLMetaElement).setAttribute('name', nameMatch[1]);
      if (propMatch) (el as HTMLMetaElement).setAttribute('property', propMatch[1]);
    } else if (selector.startsWith('link')) {
      el = document.createElement('link');
      const relMatch = selector.match(/link\[rel="([^"]+)"\]/);
      if (relMatch) (el as HTMLLinkElement).setAttribute('rel', relMatch[1]);
    }
    if (el) document.head.appendChild(el);
  }
  if (el) el.setAttribute(attr, value);
}

// Special helper for hreflang as we need multiple tags with the same rel but different hreflang/href
function setHreflang(lang: string, href: string) {
  const selector = `link[rel="alternate"][hreflang="${lang}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', lang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data?: object | object[]) {
  const id = 'app-structured-data';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  const content = Array.isArray(data) ? data.map(d => JSON.stringify(d)).join('\n') : (data ? JSON.stringify(data) : '');
  
  // For multiple schemas, wrapping in a top-level array or using separate scripts is better.
  // Using an array for @graph or just an array of objects.
  el.textContent = data ? JSON.stringify(data) : '';
}

export const Seo: React.FC<Props> = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  image, 
  type = 'website', 
  structuredData,
  breadcrumbs 
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    // Basic Tags
    if (title) document.title = title;
    if (description) setTag('meta[name="description"]', 'content', description);
    if (keywords) setTag('meta[name="keywords"]', 'content', keywords);
    if (canonical) setTag('link[rel="canonical"]', 'href', canonical);
    setTag('meta[name="robots"]', 'content', 'index,follow');

    // Open Graph
    if (title) setTag('meta[property="og:title"]', 'content', title);
    if (description) setTag('meta[property="og:description"]', 'content', description);
    setTag('meta[property="og:type"]', 'content', type);
    if (canonical) setTag('meta[property="og:url"]', 'content', canonical);
    if (image) setTag('meta[property="og:image"]', 'content', image);
    setTag('meta[property="og:site_name"]', 'content', 'GK WebTech');

    // og:locale mapping
    const localeMap: Record<string, string> = {
      en: 'en_US',
      nl: 'nl_NL',
      de: 'de_DE'
    };
    setTag('meta[property="og:locale"]', 'content', localeMap[currentLang] || 'en_US');

    // Twitter
    if (title) setTag('meta[name="twitter:title"]', 'content', title);
    if (description) setTag('meta[name="twitter:description"]', 'content', description);
    if (image) setTag('meta[name="twitter:image"]', 'content', image);
    setTag('meta[name="twitter:card"]', 'content', 'summary_large_image');

    // Hreflang Tags
    if (canonical) {
      const baseUrl = window.location.origin;
      const urlObj = new URL(canonical);
      let path = urlObj.pathname;

      // Remove leading language segment if it exists
      const pathSegments = path.split('/').filter(Boolean);
      const supportedLangs = ['nl', 'de'];
      if (supportedLangs.includes(pathSegments[0])) {
        path = '/' + pathSegments.slice(1).join('/');
      }

      const cleanPath = path === '/' ? '' : path;

      setHreflang('en', `${baseUrl}${cleanPath}`);
      setHreflang('nl', `${baseUrl}/nl${cleanPath}`);
      setHreflang('de', `${baseUrl}/de${cleanPath}`);
      setHreflang('x-default', `${baseUrl}${cleanPath}`);
    }

    // Structured Data
    let finalSchema: any = structuredData;

    // Combine breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": bc.name,
          "item": bc.item.startsWith('http') ? bc.item : `${window.location.origin}${bc.item}`
        }))
      };

      if (structuredData) {
        // Use an array to house multiple schemas (@graph pattern)
        finalSchema = {
          "@context": "https://schema.org",
          "@graph": [structuredData, breadcrumbSchema]
        };
      } else {
        finalSchema = breadcrumbSchema;
      }
    }

    setJsonLd(finalSchema);

    return () => { };
  }, [title, description, keywords, canonical, image, type, structuredData, currentLang, breadcrumbs]);

  return null;
};
