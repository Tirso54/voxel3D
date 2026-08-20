'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Box, Zap, CheckCircle } from 'lucide-react';

export function CTA() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-accent/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-5" />
      
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center p-8 lg:p-16 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Nuevo: v3.0 con 2048³ y Texturas 8K PBR</span>
          </div>

          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-display-lg font-display font-bold text-foreground mb-6"
          >
            ¿Listo para Crear en 3D?
            <br />
            <span className="gradient-text">Empieza Gratis Hoy</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Únete a 100,000+ creadores. 10 generaciones gratis cada mes. Sin tarjeta de crédito.
            Cancela en cualquier momento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button size="xl" iconRight={<ArrowRight className="w-5 h-5" />} className="gap-3 min-w-[280px]">
              <Sparkles className="w-5 h-5" />
              Crear mi Primer Modelo
            </Button>
            <Button variant="outline" size="xl" iconRight={<Box className="w-5 h-5" />} className="gap-3 min-w-[280px]">
              Explorar el Taller
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>10 generaciones gratis/mes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Acceso completo v3.0</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 pt-10 border-t border-border/50 flex flex-wrap items-center justify-center gap-8 text-body-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span><strong>30s</strong> promedio por generación</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Box className="w-4 h-4 text-primary" />
              <span><strong>2048³</strong> resolución máxima</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span><strong>8K PBR</strong> texturas producción</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}