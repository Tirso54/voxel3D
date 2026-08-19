'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Cube, Zap, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const features = [
  { icon: Cube, title: 'Texto a 3D', desc: 'Genera modelos 3D completos desde descripciones en lenguaje natural', highlight: 'v3.0' },
  { icon: Sparkles, title: 'Imagen a 3D', desc: 'Convierte una sola imagen en modelo 3D de alta fidelidad con geometría inteligente', highlight: '2048³' },
  { icon: Zap, title: 'Texturas PBR 8K', desc: 'Materiales listos para producción con mapas de roughness, metalness, normal y AO', highlight: '8K' },
  { icon: Download, title: 'División Inteligente', desc: 'Separa modelos complejos con conectores automáticos para impresión y ensamblaje fácil', highlight: 'Auto' },
  { icon: CheckCircle, title: 'Multicolor Listo', desc: 'Detección precisa de regiones de color y matching de filamentos para impresión directa', highlight: 'CMYK+' },
  { icon: ExternalLink, title: 'Exportación Universal', desc: 'STL, OBJ, 3MF, GLB, USDZ + envío directo a Bambu, Orca, Prusa, Cura', highlight: '5+ fmt' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-5" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container-voxel relative z-10 py-20 lg:py-32"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative h-full w-full rounded-full bg-primary" />
            </span>
            <span>Nuevo: VoxelAI v3.0 - Resolución 2048³, Texturas 8K PBR, Listo para Producción</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-display-xl font-display font-bold text-foreground mb-6 text-balance"
          >
            Convierte Cualquier Idea en{' '}
            <span className="gradient-text">Modelos 3D Listos para el Mundo Real</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            La plataforma todo en uno: Texto → Imagen → 3D → Texturas → División → Impresión.
            Potenciada por IA de vanguardia. Sin experiencia previa necesaria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="xl" iconRight={<ArrowRight className="w-5 h-5" />} className="gap-3">
              <Sparkles className="w-5 h-5" />
              Probar Gratis Ahora
            </Button>
            <Button variant="outline" size="xl" iconRight={<ExternalLink className="w-5 h-5" />} className="gap-3">
              Ver Demos en Vivo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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
              <span>Cancelar en cualquier momento</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative mt-20"
        >
          <div className="relative aspect-[4/3] max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl border border-border/50 bg-gradient-to-b from-card to-card/50 overflow-hidden shadow-voxel-2xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-10" />
              <div className="p-6 flex items-center justify-center min-h-[400px]">
                <ModelShowcase />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ModelShowcase() {
  const models = [
    { name: 'Robot', progress: 100, color: 'from-blue-500 to-cyan-500' },
    { name: 'Personaje', progress: 100, color: 'from-purple-500 to-pink-500' },
    { name: 'Arquitectura', progress: 100, color: 'from-amber-500 to-orange-500' },
    { name: 'Producto', progress: 100, color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {models.map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br bg-[var(--color)] p-1"
            style={{ '--color': model.color }}
          >
            <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
              <div className="relative w-24 h-24 mb-4">
                <Model3DPreview index={i} />
              </div>
              <h4 className="text-heading-md font-semibold text-foreground">{model.name}</h4>
              <p className="text-body-xs text-muted-foreground mt-1">Modelo generado</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r bg-[var(--color)]"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <StatCard value="2048³" label="Resolución Máxima" icon="Cube" />
        <StatCard value="8K" label="Texturas PBR" icon="Sparkles" />
        <StatCard value="<30s" label="Tiempo Promedio" icon="Zap" />
      </div>
    </div>
  );
}

function Model3DPreview({ index }: { index: number }) {
  const shapes = [
    <svg viewBox="0 0 100 100" className="w-full h-full text-primary" key="0">
      <g transform="rotate(-15 50 50)">
        <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <rect x="30" y="30" width="40" height="40" rx="4" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.4" />
        <rect x="42" y="42" width="16" height="16" rx="2" fill="currentColor" />
      </g>
    </svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500" key="1">
      <ellipse cx="50" cy="35" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <ellipse cx="50" cy="35" rx="12" ry="15" fill="currentColor" opacity="0.2" />
      <path d="M50 55 Q50 75 35 85 Q30 90 25 88 Q20 86 20 80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M50 55 Q50 75 65 85 Q70 90 75 88 Q80 86 80 80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="42" cy="30" r="3" fill="currentColor" />
      <circle cx="58" cy="30" r="3" fill="currentColor" />
    </svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500" key="2">
      <path d="M20 80 L30 30 L70 30 L80 80 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M30 30 L40 50 L60 50 L70 30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="35" y="50" width="30" height="30" fill="currentColor" opacity="0.2" />
      <line x1="50" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="40" y1="50" x2="40" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="60" y1="50" x2="60" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full text-green-500" key="3">
      <ellipse cx="50" cy="55" rx="25" ry="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <ellipse cx="50" cy="55" rx="20" ry="12" fill="currentColor" opacity="0.15" />
      <path d="M30 55 Q30 35 50 25 Q70 35 70 55" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="50" cy="55" r="8" fill="currentColor" opacity="0.3" />
      <rect x="45" y="45" width="10" height="20" rx="2" fill="currentColor" />
    </svg>,
  ];

  return (
    <motion.div
      animate={{ rotateY: [0, 10, -10, 0], rotateX: [0, -5, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {shapes[index]}
    </motion.div>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors"
    >
      <Icon className="w-6 h-6 mx-auto text-primary mb-2" />
      <div className="text-2xl font-display font-bold text-foreground">{value}</div>
      <div className="text-body-xs text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}