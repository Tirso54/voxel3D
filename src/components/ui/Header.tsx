'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download, Globe, User, LogOut, LayoutDashboard, Box, Sparkles, Crown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const navItems = [
  { href: '/workspace', label: 'Taller', icon: Box },
  { href: '/showcase', label: 'Galería', icon: Sparkles },
  { href: '/pricing', label: 'Precios', icon: Crown },
  { href: '/api-docs', label: 'API', icon: LayoutDashboard },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const sessionResult = useSession();
  const session = sessionResult?.data ?? null;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container-voxel h-full flex items-center justify-between" />
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-voxel-sm' : 'bg-background/80 backdrop-blur-xl'
      )}
    >
      <nav className="container-voxel h-full flex items-center justify-between" aria-label="Navegación principal">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Voxel3D Inicio">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="hsl(var(--primary))"/>
                  <stop offset="100%" stopColor="hsl(var(--accent))"/>
                </linearGradient>
              </defs>
              <path d="M4 28V12L16 4L28 12V28L16 20L4 28Z" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M16 4V20" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M8 20L16 28L24 20" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-foreground">Voxel3D</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{item.label}</span>
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
                  initial={false}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <Sun className="w-5 h-5 rotate-0 scale-100 transition-transform duration-300 dark:rotate-90 dark:scale-0" aria-hidden="true" />
            <Moon className="w-5 h-5 absolute rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" aria-hidden="true" />
          </button>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 hidden md:flex"
              >
                <Box className="w-4 h-4" aria-hidden="true" />
                <span>Mi Taller</span>
              </button>
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-card border shadow-voxel-xl p-2"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link href="/workspace" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
                      <Box className="w-4 h-4" />
                      Taller
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/signin" className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                Iniciar sesión
              </Link>
              <Link href="/auth/signup" className="btn-primary text-sm px-5 py-2.5">
                <Sparkles className="w-4 h-4" />
                Empezar gratis
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 pb-6"
          >
            <div className="flex flex-col gap-2 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <hr className="my-2 border-border" />
              {session ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link href="/workspace" className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                    <Box className="w-5 h-5" />
                    Taller
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                    Iniciar sesión
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary justify-center">
                    <Sparkles className="w-4 h-4" />
                    Empezar gratis
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}