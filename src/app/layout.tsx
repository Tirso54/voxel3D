import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
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
    default: 'VoxelAI - Plataforma Integral de Creación 3D con IA',
    template: '%s | VoxelAI',
  },
  description: 'Convierte cualquier idea en modelos 3D listos para producción. Texto a 3D, Imagen a 3D, Texturas, División para impresión, Multicolor y más. Potenciado por IA de vanguardia.',
  keywords: ['3D', 'IA', 'generador 3D', 'texto a 3D', 'imagen a 3D', 'impresión 3D', 'modelado 3D', 'IA generativa'],
  authors: [{ name: 'VoxelAI' }],
  creator: 'VoxelAI',
  publisher: 'VoxelAI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://voxelai.com',
    siteName: 'VoxelAI',
    title: 'VoxelAI - Plataforma Integral de Creación 3D con IA',
    description: 'Convierte cualquier idea en modelos 3D listos para producción.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VoxelAI - Creación 3D con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoxelAI - Plataforma Integral de Creación 3D con IA',
    description: 'Convierte cualquier idea en modelos 3D listos para producción.',
    images: ['/og-image.png'],
    creator: '@voxelai',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

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
        {children}
      </body>
    </html>
  );
}