'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Cube, Box, Sparkles, Crown, LayoutDashboard, Globe, Twitter, Github, Discord, Youtube,
  Mail, Heart, Sun, Moon, ArrowRight
} from 'lucide-react';
import { useTheme } from 'next-themes';

const footerLinks = {
  producto: [
    { label: 'Taller', href: '/workspace', icon: Box },
    { label: 'Galería', href: '/showcase', icon: Sparkles },
    { label: 'Precios', href: '/pricing', icon: Crown },
    { label: 'API Docs', href: '/api-docs', icon: LayoutDashboard },
    { label: 'Changelog', href: '/changelog', icon: Sparkles },
    { label: 'Roadmap', href: '/roadmap', icon: LayoutDashboard },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreras', href: '/careers' },
    { label: 'Prensa', href: '/press' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Socios', href: '/partners' },
  ],
  recursos: [
    { label: 'Documentación', href: '/docs' },
    { label: 'Tutoriales', href: '/tutorials' },
    { label: 'Comunidad', href: '/community' },
    { label: 'Plantillas', href: '/templates' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Estado del Sistema', href: '/status' },
  ],
  legal: [
    { label: 'Privacidad', href: '/privacy' },
    { label: 'Términos', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Seguridad', href: '/security' },
    { label: 'RGPD', href: '/gdpr' },
    { label: 'Licencias', href: '/licenses' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/voxelai', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/voxelai', icon: Github },
  { label: 'Discord', href: 'https://discord.gg/voxelai', icon: Discord },
  { label: 'YouTube', href: 'https://youtube.com/@voxelai', icon: Youtube },
];

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl" role="contentinfo">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container-voxel relative py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="VoxelAI Inicio">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="hsl(var(--primary))"/>
                      <stop offset="100%" stopColor="hsl(var(--accent))"/>
                    </linearGradient>
                  </defs>
                  <path d="M4 28V12L16 4L28 12V28L16 20L4 28Z" stroke="url(#footerLogoGradient)" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M16 4V20" stroke="url(#footerLogoGradient)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M8 20L16 28L24 20" stroke="url(#footerLogoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-foreground">VoxelAI</span>
            </Link>
            <p className="text-body-md text-muted-foreground max-w-xs mb-6">
              La plataforma integral de creación 3D con IA. De idea a objeto real en minutos.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Producto">
            <h3 className="font-semibold text-foreground mb-4">Producto</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    {link.icon && <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recursos">
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-body-sm text-muted-foreground">
              © {new Date().getFullYear()} VoxelAI. Hecho con <Heart className="w-4 h-4 text-rose-500" /> para creadores.
            </p>

            <div className="flex items-center gap-4">
              <select
                defaultValue="es"
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 rounded-xl bg-muted border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Idioma"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}