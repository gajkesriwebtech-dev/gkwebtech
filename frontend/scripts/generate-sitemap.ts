import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://gkwebtech.cloud';
const DATA_FILE_PATH = path.resolve(__dirname, '../data.ts');

// Priority Map
const PRIORITY_MAP: Record<string, string> = {
    '/': '1.0',
    '/pricing': '0.9',
    '/services': '0.85',
    '/courses': '0.75',
    '/blogs': '0.7',
    '/portfolio': '0.7',
    '/tools': '0.4',
    '/privacy': '0.3',
    '/terms': '0.3'
};

const staticRoutes = [
    '/', // Changed from '' to '/' for trailing slash
    '/services',
    '/courses',
    '/portfolio',
    '/blogs',
    '/tools',
    '/privacy',
    '/terms',
    '/pricing'
];

function extractData(fileContent: string, arrayName: string): {id: string, updatedAt: string}[] {
    const items: {id: string, updatedAt: string}[] = [];
    const arrayRegex = new RegExp(`export const ${arrayName}(?::\\s*[^=]+)?\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
    const match = fileContent.match(arrayRegex);
    
    if (match && match[1]) {
        const content = match[1];
        // Split by `id:`
        const parts = content.split(/id:\s*["']/);
        
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            const idEndQuote = part.indexOf('"') !== -1 ? part.indexOf('"') : part.indexOf("'");
            if (idEndQuote === -1) continue;
            
            const id = part.substring(0, idEndQuote);
            
            // Look for updatedAt
            let updatedAt = '';
            const dateMatch = part.match(/updatedAt:\s*["']([^"']+)["']/);
            if (dateMatch) {
                updatedAt = dateMatch[1];
            } else {
                // Fallback if not found (should be found now)
                updatedAt = new Date().toISOString().split('T')[0];
            }
            
            items.push({ id, updatedAt });
        }
    }
    return items;
}

function extractBlogDates(fileContent: string): {id: string, date: string}[] {
    const blogs: {id: string, date: string}[] = [];
    const arrayRegex = new RegExp(`export const blogsData(?::\\s*[^=]+)?\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
    const match = fileContent.match(arrayRegex);

    if (match && match[1]) {
        const content = match[1];
        const parts = content.split(/id:\s*["']/);
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            const idEndQuote = part.indexOf('"') !== -1 ? part.indexOf('"') : part.indexOf("'");
            if (idEndQuote === -1) continue;
            
            const id = part.substring(0, idEndQuote);
            
            let date = '';
            const dateMatch = part.match(/date:\s*["']([^"']+)["']/);
            if (dateMatch) {
                date = dateMatch[1];
            }
            
            blogs.push({ id, date });
        }
    }
    return blogs;
}

function generateSitemap() {
  const dataContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
  
  const services = extractData(dataContent, 'servicesData');
  const courses = extractData(dataContent, 'coursesData');
  const projects = extractData(dataContent, 'projectsData');
  const blogs = extractBlogDates(dataContent);

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Static Routes
  staticRoutes.forEach(route => {
    // If route is '/', join correctly
    const loc = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
    urls.push({
      loc,
      lastmod: new Date().toISOString().split('T')[0], // Static pages can keep today or we can hardcode
      changefreq: 'monthly',
      priority: PRIORITY_MAP[route] || '0.5'
    });
  });

  // Dynamic Routes - Services
  services.forEach(item => {
    urls.push({
      loc: `${BASE_URL}/service/${item.id}`,
      lastmod: item.updatedAt,
      changefreq: 'weekly',
      priority: '0.85' // Request: Services -> 0.85
    });
  });

  // Dynamic Routes - Courses
  courses.forEach(item => {
    urls.push({
      loc: `${BASE_URL}/course/${item.id}`,
      lastmod: item.updatedAt,
      changefreq: 'weekly',
      priority: '0.75' // Request: Courses -> 0.75
    });
  });

  // Dynamic Routes - Blogs
  blogs.forEach(blog => {
    let date = new Date().toISOString().split('T')[0];
    if (blog.date) {
        const parsedDate = new Date(blog.date);
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toISOString().split('T')[0];
        }
    }

    urls.push({
      loc: `${BASE_URL}/blog/${blog.id}`,
      lastmod: date, // Keep original blog date logic
      changefreq: 'monthly',
      priority: '0.7' // Request: Blogs -> 0.7
    });
  });

  // Dynamic Routes - Portfolio (Projects)
  projects.forEach(item => {
    urls.push({
      loc: `${BASE_URL}/portfolio/${item.id}`,
      lastmod: item.updatedAt,
      changefreq: 'monthly',
      priority: '0.7' // Request: Portfolio -> 0.7
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
  console.log(`Total URLs: ${urls.length}`);
}

generateSitemap();
