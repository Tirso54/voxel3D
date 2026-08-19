'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Cube, Image, Sparkles, Scissors, Palette, Layers, Box, Download,
  Printer, Truck, Eye, Heart, Share2, Star, ArrowRight, Play, Zap,
  MousePointer, Wand2, GitBranch, CheckCircle
} from 'lucide-react';

const workflowSteps = [
  {
    id: 1,
    title: 'Describe o Sube',
    description: 'Escribe un prompt, sube una imagen o elige una plantilla',
    icon: MousePointer,
    tools: ['Texto a Imagen', 'Subir Imagen', 'Plantillas'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Genera 3D',
    description: 'IA crea modelo 3D con geometría precisa y detalles nítidos',
    icon: Cube,
    tools: ['Texto a 3D', 'Imagen a 3D', 'Relieve 3D'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Texturiza',
    description: 'Aplica materiales PBR 8K o genera texturas estilizadas',
    icon: Palette,
    tools: ['Texturas PBR', 'Estilizado', 'Multi-material'],
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'Prepara e Imprime',
    description: 'Divide, colorea, repara y envía a slicer o servicio de impresión',
    icon: Printer,
    tools: ['División', 'Multicolor', 'Reparación', 'Servicio Impresión'],
    color: 'from-orange-500 to-red-500',
  },
];

const showcaseItems = [
  { title: 'Guerrero Orco Fantasy', category: 'Personajes', tags: ['Fantasy', 'Detallado', 'Imprimible'], image: '/showcase/orc-warrior.jpg', author: 'Marco3D', likes: 234, views: 5.2 },
  { title: 'Dragón Articulado', category: 'Articulados', tags: ['Mecánico', 'Articulado', 'STL'], image: '/showcase/dragon.jpg', author: 'PrintMaster', likes: 567, views: 12.8 },
  { title: 'Castillo Cuento Hadas', category: 'Arquitectura', tags: ['Low-poly', 'Estilizado', 'Multicolor'], image: '/showcase/castle.jpg', author: 'DreamBuilder', likes: 445, views: 9.1 },
  { title: 'Robot Cyberpunk', category: 'Sci-Fi', tags: ['Cyberpunk', 'Kitbash', 'PBR'], image: '/showcase/robot.jpg', author: 'NeonPrint', likes: 789, views: 18.3 },
  { title: 'Qilin Escultura', category: 'Arte', tags: ['Escultura', 'Orgánico', '8K PBR'], image: '/showcase/qilin.jpg', author: 'SculptorAI', likes: 312, views: 6.7 },
  { title: 'Rover Ártico', category: 'Vehículos', tags: ['Sci-Fi', 'Funcional', 'Mecánico'], image: '/showcase/rover.jpg', author: 'Engineer3D', likes: 423, views: 8.9 },
];

export function Showcase() {
  return (
    <section className="section bg-muted/30 relative" aria-labelledby="showcase-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-accent/3" />
      
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge-primary mb-4 inline-block">Creaciones de la Comunidad</span>
          <h2 id="showcase-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
            Inspírate con <span className="gradient-text">Miles de Modelos</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Explora lo que otros creadores están haciendo. Cada modelo es descargable, remixable y listo para imprimir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {showcaseItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ShowcaseCard item={item} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" iconRight={<ArrowRight className="w-5 h-5" />} className="gap-2">
            Ver Toda la Galería ({showcaseItems.length * 4}+ modelos)
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: typeof showcaseItems[0] }) {
  return (
    <Card variant="hover" padding="none" className="overflow-hidden h-full group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ModelPlaceholder />
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className="badge badge-primary">{item.category}</span>
          <div className="flex gap-1">
            <button className="p-2 rounded-xl bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-voxel-900 transition-colors" aria-label="Me gusta">
              <Heart className="w-4 h-4 text-rose-500" />
            </button>
            <button className="p-2 rounded-xl bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-voxel-900 transition-colors" aria-label="Compartir">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge bg-white/80 dark:bg-voxel-800/80 backdrop-blur-sm text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-heading-md font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 text-body-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {item.likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.views}k
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-body-xs text-muted-foreground">Por {item.author}</span>
          <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3 h-3" />}>
            Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ModelPlaceholder() {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 text-muted-foreground/30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="placeholderGrad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      <path d="M20 100V28L60 8L100 28V100L60 80L20 100Z" stroke="url(#placeholderGrad)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M60 8V80" stroke="url(#placeholderGrad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 62L60 80L90 62" stroke="url(#placeholderGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="45" r="12" stroke="url(#placeholderGrad)" strokeWidth="1.5" fill="url(#placeholderGrad)"/>
    </svg>
  );
}

export function Workflow() {
  return (
    <section className="section bg-background relative" aria-labelledby="workflow-heading">
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge-primary mb-4 inline-block">Flujo de Trabajo Unificado</span>
          <h2 id="workflow-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
            De Idea a Objeto en <span className="gradient-text">4 Pasos</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Sin cambiar de herramientas, sin exportar/importar. Pipeline continuo con IA en cada etapa.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 relative z-10">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <WorkflowStep step={step} index={index} isLast={index === workflowSteps.length - 1} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button size="lg" iconRight={<ArrowRight className="w-5 h-5" />} className="gap-2" asChild>
            <a href="/workspace">Probar el Flujo Completo Gratis</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowStep({ step, index, isLast }: { step: typeof workflowSteps[0]; index: number; isLast: boolean }) {
  const Icon = step.icon;

  return (
    <div className="relative">
      <Card variant="hover" padding="lg" className="h-full relative z-10">
        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br bg-[var(--color)] flex items-center justify-center mb-6 mx-auto" style={{ '--color': step.color }}>
          <Icon className="w-7 h-7 text-white" aria-hidden="true" />
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {step.id}
          </span>
        </div>

        <h3 className="text-heading-md font-semibold text-foreground mb-2 text-center">{step.title}</h3>
        <p className="text-body-sm text-muted-foreground text-center mb-6">{step.description}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {step.tools.map((tool, i) => (
            <span key={i} className="badge bg-muted text-muted-foreground text-xs">{tool}</span>
          ))}
        </div>
      </Card>

      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          className="hidden lg:block absolute top-[70px] left-[calc(100%+16px)] w-[calc(100%-32px)] h-px bg-gradient-to-r from-primary/30 to-transparent"
        />
      )}
    </div>
  );
}