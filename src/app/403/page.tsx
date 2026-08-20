'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ShieldOff, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-background px-4 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md relative"
        >
          <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <ShieldOff className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-display-lg font-display font-bold text-foreground mb-4">
            403
          </h1>
          <h2 className="text-heading-lg font-semibold text-foreground mb-2">
            Acceso denegado
          </h2>
          <p className="text-body-md text-muted-foreground mb-8">
            No tienes permisos para acceder a esta página. Si crees que esto es un error, contacta al soporte.
          </p>
          <Link href="/">
            <Button size="lg" iconLeft={<ArrowLeft className="w-4 h-4" />}>
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </main>
    </>
  );
}
