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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://voxel3d-tirso1.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Voxel3D - Creación de Modelos 3D con Inteligencia Artificial',
    template: '%s | Voxel3D',
  },
  description: 'Transforma texto e imágenes en modelos 3D listos para producción con IA avanzada. Genera texturas, divide para impresión 3D, exporta multicolor y más. Herramientas profesionales de modelado 3D asistido por inteligencia artificial.',
  keywords: ['3D', 'IA', 'generador 3D', 'texto a 3D', 'imagen a 3D', 'impresión 3D', 'modelado 3D', 'IA generativa', 'modelos 3D', 'texturas 3D', 'blender 3D', 'three.js'],
  authors: [{ name: 'Voxel3D' }],
  creator: 'Voxel3D',
  publisher: 'Voxel3D',
  robots: 'index, follow',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: baseUrl,
    siteName: 'Voxel3D',
    title: 'Voxel3D - Creación de Modelos 3D con Inteligencia Artificial',
    description: 'Transforma texto e imágenes en modelos 3D listos para producción con IA avanzada.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voxel3D - Plataforma de creación 3D con inteligencia artificial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voxel3D - Creación de Modelos 3D con Inteligencia Artificial',
    description: 'Transforma texto e imágenes en modelos 3D listos para producción con IA avanzada.',
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