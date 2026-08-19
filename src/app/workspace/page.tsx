'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  Cube, Image, Sparkles, Palette, Scissors, Layers, Printer, Truck,
  Upload, Download, Settings, Play, Pause, RotateCw, Trash2, Copy,
  Eye, Heart, Share2, MoreHorizontal, ChevronLeft, ChevronRight,
  Type, MousePointer, Zap, Box, Globe, History, Layers as LayersIcon
} from 'lucide-react';

const tools = [
  { id: 'text-to-3d', label: 'Texto a 3D', icon: Type, description: 'Genera modelos 3D desde descripción en lenguaje natural', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
  { id: 'image-to-3d', label: 'Imagen a 3D', icon: Image, description: 'Convierte una imagen en modelo 3D de alta fidelidad', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
  { id: 'text-to-image', label: 'Texto a Imagen', icon: Sparkles, description: 'Crea imágenes de referencia para tu pipeline 3D', gradient: 'from-amber-500 to-orange-500', color: 'amber' },
  { id: 'stylized-texture', label: 'Texturas PBR', icon: Palette, description: 'Genera mapas de textura 8K completos (Albedo, Roughness, Normal, etc.)', gradient: 'from-green-500 to-teal-500', color: 'green' },
  { id: 'split-to-print', label: 'División Inteligente', icon: Scissors, description: 'Separa modelos complejos con conectores automáticos', gradient: 'from-red-500 to-pink-500', color: 'red' },
  { id: 'multi-color', label: 'Multicolor', icon: Palette, description: 'Detección de colores y preparación para impresión multicolor', gradient: 'from-cyan-500 to-blue-500', color: 'cyan' },
  { id: 'relief-3d', label: 'Relieve 3D', icon: LayersIcon, description: 'Convierte imágenes 2D/logos en relieves 3D imprimibles', gradient: 'from-indigo-500 to-purple-500', color: 'indigo' },
  { id: 'print-ready', label: 'Listo para Imprimir', icon: Printer, description: 'Reparación, soportes, orientación y envío a slicer', gradient: 'from-orange-500 to-red-500', color: 'orange' },
  { id: 'print-service', label: 'Servicio Impresión', icon: Truck, description: 'Imprimimos y enviamos tu modelo a tu puerta', gradient: 'from-rose-500 to-pink-500', color: 'rose' },
];

const recentProjects = [
  { id: '1', name: 'Robot Cyberpunk v3', tool: 'text-to-3d', status: 'completed', thumbnail: '/thumbs/robot.jpg', created: 'Hace 2h', size: '2.4M tris' },
  { id: '2', name: 'Dragón Articulado', tool: 'image-to-3d', status: 'completed', thumbnail: '/thumbs/dragon.jpg', created: 'Hace 5h', size: '5.1M tris' },
  { id: '3', name: 'Castillo Fantasy', tool: 'text-to-3d', status: 'processing', thumbnail: '/thumbs/castle.jpg', created: 'Hace 1d', size: '—' },
  { id: '4', name: 'Qilin Escultura', tool: 'stylized-texture', status: 'completed', thumbnail: '/thumbs/qilin.jpg', created: 'Hace 2d', size: '3.2M tris' },
  { id: '5', name: 'Rover Ártico', tool: 'split-to-print', status: 'completed', thumbnail: '/thumbs/rover.jpg', created: 'Hace 3d', size: '1.8M tris' },
  { id: '6', name: 'Personaje Anime', tool: 'multi-color', status: 'failed', thumbnail: '/thumbs/anime.jpg', created: 'Hace 4d', size: '—' },
];

export default function WorkspacePage() {
  const [activeTool, setActiveTool] = useState<string>('text-to-3d');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tool = tools.find(t => t.id === activeTool) || tools[0];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex">
        <aside
          className={cn(
            'fixed lg:static inset-y-0 left-0 z-40 w-72 bg-card border-r border-border flex flex-col transition-all duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <h2 className="font-display font-semibold text-heading-md">Herramientas</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="Cerrar sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto" role="navigation" aria-label="Herramientas de creación">
            {tools.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group',
                  activeTool === t.id
                    ? 'bg-primary text-primary-foreground shadow-voxel-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="absolute inset-0 bg-gradient-to-br bg-[var(--gradient)] rounded-lg opacity-20" style={{ '--gradient': t.gradient }} />
                  <t.icon className="relative w-5 h-5 text-white" style={{ '--gradient': t.gradient }} />
                </span>
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/50">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Cube className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Plan Pro</p>
                <p className="text-xs text-muted-foreground">8,847 / ∞ generaciones</p>
              </div>
            </div>
          </div>
        </aside>

        {(!sidebarOpen) && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-voxel-lg"
            aria-label="Abrir herramientas"
          >
            <Cube className="w-6 h-6" />
          </button>
        )}

        <main className="flex-1 lg:ml-0 min-w-0 flex flex-col">
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border px-4 py-3 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-heading-lg">{tool.label}</h1>
                <p className="text-body-sm text-muted-foreground">{tool.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" iconLeft={<History className="w-4 h-4" />}>Historial</Button>
                <Button variant="ghost" size="sm" iconLeft={<Globe className="w-4 h-4" />}>Comunidad</Button>
                <Button variant="outline" size="sm" iconLeft={<Settings className="w-4 h-4" />}>Config</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 lg:w-2/3 p-4 lg:p-6 overflow-y-auto">
              <ToolWorkspace tool={tool} />
            </div>

            <aside className="lg:w-1/3 border-l border-border bg-card/50 flex flex-col hidden lg:flex">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Vista Previa 3D</h3>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-muted" aria-label="Rotar"><RotateCw className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-muted" aria-label="Pantalla completa"><Settings className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 relative">
                <ModelViewer3D />
              </div>
              <div className="p-4 border-t border-border space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <StatMini label="Vértices" value="245K" />
                  <StatMini label="Caras" value="489K" />
                  <StatMini label="Texturas" value="4K" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" iconLeft={<Download className="w-4 h-4" />}>Descargar STL</Button>
                  <Button variant="outline" size="sm" className="flex-1" iconLeft={<Box className="w-4 h-4" />}>Enviar a Slicer</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" iconLeft={<Eye className="w-4 h-4" />} className="flex-1">Ver Malla</Button>
                  <Button variant="ghost" size="sm" iconLeft={<Share2 className="w-4 h-4" />} className="flex-1">Compartir</Button>
                </div>
              </div>
            </aside>
          </div>

          <div className="border-t border-border bg-background/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Proyectos Recientes</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('grid')} className="p-2 rounded-lg hover:bg-muted" aria-label="Vista cuadrícula"><Cube className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('list')} className="p-2 rounded-lg hover:bg-muted" aria-label="Vista lista"><LayersIcon className="w-4 h-4" /></button>
                </div>
              </div>
              <div className={cn('gap-4', viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3')}>
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} viewMode={viewMode} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

function ToolWorkspace({ tool }: { tool: typeof tools[0] }) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if ((!prompt && !image) || generating) return;
    setGenerating(true);
    setProgress(0);
    const stages = [10, 25, 45, 65, 85, 100];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 800));
      setProgress(stage);
    }
    setGenerating(false);
    setResult('model.glb');
  };

  return (
    <Card variant="glass" padding="lg" className="h-full">
      <CardHeader>
        <CardTitle className="text-heading-md">Generar Nuevo Modelo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {tool.id === 'text-to-3d' || tool.id === 'text-to-image' ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Describe tu modelo</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Un robot cyberpunk con armadura plateada, ojos brillantes azules, estilo anime, listo para impresión 3D..."
              className="textarea min-h-[120px] resize-y"
              rows={5}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>Usa lenguaje natural. Sé específico sobre estilo, materiales y detalles.</span>
            </div>
          </div>
        ) : tool.id === 'image-to-3d' || tool.id === 'relief-3d' || tool.id === 'stylized-texture' ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Sube una imagen de referencia</label>
            <div
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all',
                image ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50'
              )}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
              />
              {image ? (
                <div className="space-y-2">
                  <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <p className="text-sm font-medium">{image.name}</p>
                  <p className="text-xs text-muted-foreground">{(image.size / 1024).toFixed(1)} KB</p>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setImage(null); }} iconLeft={<Trash2 className="w-4 h-4" />}>Cambiar</Button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                  <p className="text-xs text-muted-foreground/70">PNG, JPG, WebP hasta 10MB</p>
                </>
              )}
            </div>
            {tool.id === 'image-to-3d' && (
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" defaultChecked />
                  <span className="text-sm">Eliminar fondo automáticamente</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" defaultChecked />
                  <span className="text-sm">Optimizar para impresión</span>
                </label>
              </div>
            )}
          </div>
        ) : tool.id === 'split-to-print' || tool.id === 'multi-color' || tool.id === 'print-ready' ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Selecciona un modelo generado</label>
            <div className="grid grid-cols-2 gap-3">
              {recentProjects.filter(p => p.status === 'completed').slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  className="relative aspect-square rounded-xl border-2 border-border hover:border-primary overflow-hidden transition-colors group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Cube className="w-12 h-12 text-primary/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs font-medium text-white truncate">{p.name}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" iconLeft={<Upload className="w-4 h-4" />} className="w-full">Subir otro archivo</Button>
          </div>
        ) : (
          <div className="space-y-4 text-center py-8">
            <tool.icon className="w-16 h-16 mx-auto text-primary/50" />
            <h4 className="font-semibold">Configuración de {tool.label}</h4>
            <p className="text-sm text-muted-foreground">Las opciones específicas aparecerán aquí.</p>
          </div>
        )}

        <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="flex-1 gap-2"
            iconLeft={generating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            onClick={handleGenerate}
            disabled={generating || (!prompt && !image)}
          >
            {generating ? `Generando... ${progress}%` : `Generar ${tool.label}`}
          </Button>
          <Button variant="outline" size="lg" iconLeft={<Copy className="w-4 h-4" />}>Duplicar</Button>
        </div>

        <AnimatePresence mode="wait">
          {generating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Procesando con IA...</span>
                <span>{progress}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 animate-pulse" />
                <span>Esto puede tardar 30-60 segundos</span>
              </div>
            </motion.div>
          )}
          {result && !generating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Cube className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">¡Modelo generado!</p>
                  <p className="text-sm text-muted-foreground">Listo para previsualizar y descargar</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" iconLeft={<Eye className="w-4 h-4" />}>Ver</Button>
                <Button size="sm" iconLeft={<Download className="w-4 h-4" />}>Descargar</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function ModelViewer3D() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-10" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary/30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="modelGrad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            <path d="M40 180V60L100 20L160 60V180L100 140L40 180Z" stroke="url(#modelGrad)" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M100 20V140" stroke="url(#modelGrad)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M60 110L100 140L140 110" stroke="url(#modelGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <g transform="rotate(-15 100 100)">
              <rect x="70" y="70" width="60" height="60" rx="8" fill="url(#modelGrad)" opacity="0.3" />
              <rect x="85" y="85" width="30" height="30" rx="4" fill="url(#modelGrad)" opacity="0.5" />
            </g>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-body-sm text-muted-foreground">Modelo 3D interactivo</p>
          <p className="text-xs text-muted-foreground/70">Arrastra para rotar • Scroll para zoom • Click derecho para pan</p>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-muted/50">
      <div className="text-heading-sm font-semibold text-foreground">{value}</div>
      <div className="text-body-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ProjectCard({ project, viewMode }: { project: typeof recentProjects[0]; viewMode: 'grid' | 'list' }) {
  const statusColors = {
    completed: 'text-green-500 bg-green-500/10',
    processing: 'text-amber-500 bg-amber-500/10',
    failed: 'text-red-500 bg-red-500/10',
  };

  const getToolIcon = (toolId: string) => {
    const t = tools.find(t => t.id === toolId);
    return t?.icon || Cube;
  };

  const ToolIcon = getToolIcon(project.tool);

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <ToolIcon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{project.name}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <ToolIcon className="w-3 h-3" />
              {tools.find(t => t.id === project.tool)?.label}
            </span>
            <span>{project.size}</span>
            <span>{project.created}</span>
          </div>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[project.status])}>
          {project.status === 'completed' ? 'Listo' : project.status === 'processing' ? 'Procesando' : 'Error'}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Ver"><Eye className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Descargar"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Más"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-voxel-md transition-shadow">
      <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <ToolIcon className="w-16 h-16 text-primary/30" />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm" aria-label="Ver"><Eye className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm" aria-label="Descargar"><Download className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-medium truncate">{project.name}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ToolIcon className="w-3 h-3" />
          <span>{tools.find(t => t.id === project.tool)?.label}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[project.status])}>
            {project.status === 'completed' ? 'Listo' : project.status === 'processing' ? 'Procesando' : 'Error'}
          </span>
          <span className="text-xs text-muted-foreground">{project.created}</span>
        </div>
      </div>
    </div>
  );
}