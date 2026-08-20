'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-background px-4 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md relative"
        >
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <span className="text-[120px] font-display font-bold bg-gradient-to-b from-primary/30 to-primary/5 bg-clip-text text-transparent leading-none select-none">
              404
            </span>
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3">
            Página no encontrada
          </h1>
          <p className="text-body-md text-muted-foreground mb-8 leading-relaxed">
            La página que buscas no existe o ha sido movida a otra ubicación.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={() => window.history.back()} iconLeft={<ArrowLeft className="w-4 h-4" />}>
              Volver atrás
            </Button>
            <Link href="/">
              <Button size="lg" iconLeft={<Home className="w-4 h-4" />}>
                Ir al inicio
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
