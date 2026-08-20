import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://voxel3d-tirso1.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/workspace', '/dashboard', '/showcase', '/pricing', '/auth'].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1 : path === '/workspace' ? 0.9 : 0.7,
    })
  );

  return routes;
}
