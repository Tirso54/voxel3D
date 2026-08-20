import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Voxel3D - Plataforma Integral de Creación 3D con IA',
    template: '%s | Voxel3D',
  },
  description: 'Convierte cualquier idea en modelos 3D listos para producción. Texto a 3D, Imagen a 3D, Texturas, División para impresión, Multicolor y más. Potenciado por IA de vanguardia.',
  keywords: ['3D', 'IA', 'generador 3D', 'texto a 3D', 'imagen a 3D', 'impresión 3D', 'modelado 3D', 'IA generativa'],
  authors: [{ name: 'Voxel3D' }],
  creator: 'Voxel3D',
  publisher: 'Voxel3D',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://voxel3d.com',
    siteName: 'Voxel3D',
    title: 'Voxel3D - Plataforma Integral de Creación 3D con IA',
    description: 'Convierte cualquier idea en modelos 3D listos para producción.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voxel3D - Creación 3D con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voxel3D - Plataforma Integral de Creación 3D con IA',
    description: 'Convierte cualquier idea en modelos 3D listos para producción.',
    images: ['/og-image.png'],
    creator: '@voxel3d',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hitem3dstatic.zaohaowu.net" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}