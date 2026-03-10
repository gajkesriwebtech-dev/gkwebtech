import fs from 'fs';

const sitemapPath = 'c:/Users/lenovo/Downloads/gajkesari-webtech---digital-marketing-agency/frontend/public/sitemap.xml';
const content = fs.readFileSync(sitemapPath, 'utf8');

const urlRegex = /<url>[\s\S]*?<loc>(.*?)<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>[\s\S]*?<changefreq>(.*?)<\/changefreq>[\s\S]*?<priority>(.*?)<\/priority>[\s\S]*?<\/url>/g;

let match;
const urls = [];

while ((match = urlRegex.exec(content)) !== null) {
    urls.push({
        loc: match[1],
        lastmod: match[2],
        changefreq: match[3],
        priority: match[4]
    });
}

const languages = ['nl', 'de'];

const newUrls = [...urls];

urls.forEach(u => {
    const urlObj = new URL(u.loc);
    const pathname = urlObj.pathname;

    languages.forEach(lang => {
        let newPathname;
        if (pathname === '/') {
            newPathname = `/${lang}`;
        } else {
            // if it doesn't already start with /nl or /de
            if (!pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`) {
                newPathname = `/${lang}${pathname}`;
            } else {
                newPathname = pathname;
            }
        }

        if (newPathname !== pathname) {
            newUrls.push({
                loc: `${urlObj.origin}${newPathname}`,
                lastmod: u.lastmod,
                changefreq: u.changefreq,
                priority: u.priority
            });
        }
    });
});

let newXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

newUrls.forEach(u => {
    newXml += `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
});

newXml += `</urlset>`;

fs.writeFileSync(sitemapPath, newXml);
console.log('Sitemap generated with', newUrls.length, 'URLs');
