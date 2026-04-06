export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /onboarding
Disallow: /generating
Disallow: /api/

Sitemap: https://repliqio.com/sitemap.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
