import fs from 'fs';
import path from 'path';

const baseUrl = 'https://intention-infoservice.com';
const currentDate = new Date().toISOString().split('T')[0];

// Define all routes
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/web-development/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/mobile-apps/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ai-workflows/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ui-ux-branding/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/digital-marketing/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/maintenance/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/custom-solutions/', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/case-studies/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.8', changefreq: 'weekly' },
  { path: '/about/', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms/', priority: '0.5', changefreq: 'yearly' },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

function generateSitemapIndex() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-services.xml</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-blog.xml</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>';
  return xml;
}

// Write sitemaps
const publicDir = './public';

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write main sitemap
const sitemap = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✓ Generated sitemap.xml');

// Write sitemap index
const sitemapIndex = generateSitemapIndex();
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✓ Generated sitemap-index.xml');

console.log('Sitemap generation complete!');
