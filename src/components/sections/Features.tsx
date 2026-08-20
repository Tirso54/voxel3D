'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Image, Sparkles, Scissors, Palette, Layers, Box, Printer, Truck
} from 'lucide-react';

const features = [
  {
    id: 'text-to-3d',
    icon: Box,
    title: 'Texto a 3D',
    subtitle: 'De palabras a mundos',
    description: 'Describe tu idea en lenguaje natural y genera modelos 3D completos con geometría precisa, proporciones correctas y detalles nítidos. Compatible con prompts complejos y referencias de estilo.',
    highlights: ['Resolución 2048³', 'Geometría múltiple', 'Estilos artísticos', 'Optimización automática'],
    stats: { speed: '< 30s', quality: 'Producción', formats: '5+' },
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
  },
  {
    id: 'image-to-3d',
    icon: Image,
    title: 'Imagen a 3D',
    subtitle: 'Una imagen, infinitas posibilidades',
    description: 'Sube una sola imagen y reconstruye inteligentemente forma, estructura y detalle. Completación de geometría oculta, eliminación de fondo automática y optimización para impresión 3D.',
    highlights: ['Fidelidad extrema', 'Geometría inteligente', 'Sin fondo necesario', 'Múltiples vistas'],
    stats: { speed: '< 45s', quality: 'Ultra HD', formats: '5+' },
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple',
  },
  {
    id: 'text-to-image',
    icon: Sparkles,
    title: 'Texto a Imagen',
    subtitle: 'Conceptos visuales al instante',
    description: 'Genera imágenes de referencia perfectas para tu pipeline 3D. Modelos Nano Banana, GPT Image 2 y más. Variaciones rápidas, control de estilo y edición iterativa.',
    highlights: ['Múltiples modelos IA', 'Variaciones instantáneas', 'Control de estilo', 'Edición por máscara'],
    stats: { speed: '< 10s', quality: '4K', formats: 'PNG/WebP' },
    gradient: 'from-amber-500 to-orange-500',
    color: 'amber',
  },
  {
    id: 'stylized-texture',
    icon: Palette,
    title: 'Texturas Estilizadas',
    subtitle: 'PBR 8K listo para render',
    description: 'Genera mapas de textura completos: Albedo, Roughness, Metalness, Normal, AO, Height, Emission. Estilos fotorrealistas, pintados a mano, cel-shaded, low-poly y más.',
    highlights: ['Resolución 8K', 'Maps PBR completos', 'Estilos ilimitados', 'Tileable seamless'],
    stats: { speed: '< 20s', quality: '8K PBR', formats: 'EXR/PNG' },
    gradient: 'from-green-500 to-teal-500',
    color: 'green',
  },
  {
    id: 'split-to-print',
    icon: Scissors,
    title: 'División para Impresión',
    subtitle: 'Ensamblaje sin dolor',
    description: 'Divide automáticamente modelos complejos en piezas imprimibles. Genera conectores (dovetail, pins, magnets, screws), orientación óptima y layout automático en bandeja.',
    highlights: ['Conectores auto', 'Orientación óptima', 'Layout bandeja', 'Simulación ensamblaje'],
    stats: { speed: '< 15s', quality: 'Listo imprimir', formats: 'STL/3MF' },
    gradient: 'from-red-500 to-pink-500',
    color: 'red',
  },
  {
    id: 'multi-color',
    icon: Palette,
    title: 'Impresión Multicolor',
    subtitle: 'Un modelo, muchos colores',
    description: 'Detección automática de regiones de color, separación inteligente de filamentos, purga optimizada y slicing directo para Bambu Lab AMS, Prusa MMU, ERCF y más.',
    highlights: ['Detección IA', 'Matching filamentos', 'Purga optimizada', 'Slicing directo'],
    stats: { speed: '< 10s', quality: 'CMYK+', formats: '3MF/GCODE' },
    gradient: 'from-cyan-500 to-blue-500',
    color: 'cyan',
  },
  {
    id: 'relief-3d',
    icon: Layers,
    title: 'Relieve 3D',
    subtitle: '2.5D a 3D real',
    description: 'Convierte imágenes 2D, logos, texto y patrones en relieves 3D con control de profundidad, biselado, estilos de grabado y base personalizable. Ideal para señalética, medallas, arte.',
    highlights: ['Control profundidad', 'Estilos bisel', 'Base personalizable', 'Vector a relieve'],
    stats: { speed: '< 10s', quality: 'Alta detalle', formats: 'STL/OBJ' },
    gradient: 'from-indigo-500 to-purple-500',
    color: 'indigo',
  },
  {
    id: 'print-ready',
    icon: Printer,
    title: 'Listo para Imprimir',
    subtitle: 'De digital a físico',
    description: 'Verificación automática (manifold, wall thickness, overhangs), reparación de malla, suportes inteligentes, orientación óptima y envío directo a tu slicer favorito.',
    highlights: ['Auto-reparación', 'Suportes inteligentes', 'Integración slicers', 'Cola de impresión'],
    stats: { speed: '< 5s', quality: 'Garantizado', formats: 'Universal' },
    gradient: 'from-orange-500 to-red-500',
    color: 'orange',
  },
  {
    id: 'print-service',
    icon: Truck,
    title: 'Servicio de Impresión',
    subtitle: 'Sin impresora, sin problema',
    description: 'Elige material (PLA, PETG, ABS, TPU, Resina, Metal, Cerámica), tamaño y acabado. Nosotros imprimimos, post-procesamos y enviamos a tu puerta con tracking en tiempo real.',
    highlights: ['15+ materiales', 'Envío global', 'Tracking tiempo real', 'Garantía calidad'],
    stats: { speed: '3-7 días', quality: 'Profesional', formats: 'Físico' },
    gradient: 'from-rose-500 to-pink-500',
    color: 'rose',
  },
];

export function Features() {
  return (
    <section className="section bg-background relative" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-accent/3" />
      
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge-primary mb-4 inline-block">Todas las Herramientas en Una Plataforma</span>
          <h2 id="features-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
            Pipeline Completo: <span className="gradient-text">Idea → 3D → Realidad</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Cada herramienta está diseñada para funcionar sola o en cadena. Salta pasos, itera rápido y llega a resultado final sin fricción.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <FeatureCard feature={feature} index={index} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-body-md text-muted-foreground mb-6 max-w-2xl mx-auto">
            ¿Quieres ver cómo funcionan juntos? Explora el taller interactivo y prueba el pipeline completo gratis.
          </p>
          <a href="/workspace" className="btn-primary inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Abrir Taller
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <Card variant="hover" padding="lg" className="relative overflow-hidden group h-full">
      <div className="relative z-10">
        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white" style={{ background: feature.gradient.includes('blue') ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : feature.gradient.includes('purple') ? 'linear-gradient(135deg, #a855f7, #ec4899)' : feature.gradient.includes('amber') ? 'linear-gradient(135deg, #f59e0b, #f97316)' : feature.gradient.includes('green') ? 'linear-gradient(135deg, #22c55e, #14b8a6)' : feature.gradient.includes('red') ? 'linear-gradient(135deg, #ef4444, #ec4899)' : feature.gradient.includes('cyan') ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : feature.gradient.includes('indigo') ? 'linear-gradient(135deg, #6366f1, #a855f7)' : feature.gradient.includes('orange') ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'linear-gradient(135deg, #f43f5e, #ec4899)' }}>
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="mb-4">
          <h3 className="text-heading-md font-semibold text-foreground mb-1">{feature.title}</h3>
          <p className="text-body-sm text-muted-foreground">{feature.subtitle}</p>
        </div>

        <p className="text-body-md text-muted-foreground mb-6 line-clamp-3">{feature.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {feature.highlights.map((highlight, i) => (
            <span key={i} className="badge badge-primary text-xs px-2 py-1">
              {highlight}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <StatMini label="Velocidad" value={feature.stats.speed} />
          <StatMini label="Calidad" value={feature.stats.quality} />
          <StatMini label="Formatos" value={feature.stats.formats} />
        </div>
      </div>
    </Card>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-heading-sm font-semibold text-foreground">{value}</div>
      <div className="text-body-xs text-muted-foreground">{label}</div>
    </div>
  );
}