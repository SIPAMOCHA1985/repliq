export async function GET() {
  const base = 'https://repliqio.com';
  const pages = ['', '/login', '/signup', '/privacy-policy', '/terms-of-service'];
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      path => `
  <url>
    <loc>${base}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '' ? '1.0' : '0.7'}</priority>
  </url>`
    )
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
