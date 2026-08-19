'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  Image, Cube, Zap, Download, Settings, RotateCcw, Trash2,
  History, Globe, Sparkles, CheckCircle, AlertTriangle,
  ChevronLeft, ChevronRight, Layers, Info, Eye, EyeOff
} from 'lucide-react';
import { CreationModes, creationModes } from '@/components/workspace/CreationModes';
import { Editor3D } from '@/components/workspace/Editor3D';
import { PrinterProfiles } from '@/components/workspace/PrinterProfiles';
import { ImageUpload } from '@/components/workspace/ImageUpload';
import { ModelViewer3D } from '@/components/workspace/ModelViewer3D';

const recentProjects = [
  { id: '1', name: 'Litofanía - Montaña', mode: 'lithophane', status: 'completed', preview: '/thumbs/litho-mountain.jpg', created: 'Hace 2h', dims: '80×80×3mm' },
  { id: '2', name: 'Llavero - Logo Empresa', mode: 'keychain', status: 'completed', preview: '/thumbs/keychain-logo.jpg', created: 'Hace 5h', dims: '45×45×8mm' },
  { id: '3', name: 'Medallón - Retrato', mode: 'medallion', status: 'completed', preview: '/thumbs/medallion-portrait.jpg', created: 'Hace 1d', dims: '50×50×4mm' },
  { id: '4', name: 'Relieve - Mapa Topográfico', mode: 'relief', status: 'processing', preview: '/thumbs/relief-map.jpg', created: 'Hace 2d', dims: '—' },
  { id: '5', name: 'Figura 3D - Personaje', mode: 'figure3d', status: 'completed', preview: '/thumbs/figure-character.jpg', created: 'Hace 3d', dims: '100×60×80mm' },
  { id: '6', name: 'Litofanía - Foto Familia', mode: 'lithophane', status: 'failed', preview: '/thumbs/litho-family.jpg', created: 'Hace 4d', dims: '—' },
];

const modeIcons: Record<string, React.ElementType> = {
  relief: Layers,
  lithophane: Image,
  medallion: Sparkles,
  keychain: Cube,
  figure3d: Cube,
};

export default function WorkspacePage() {
  const [activeMode, setActiveMode] = useState<string>('relief');
  const [settings, setSettings] = useState<Record<string, number | boolean>>({});
  const [selectedPrinter, setSelectedPrinter] = useState<string>('bambu-a1-mini');
  const [currentImage, setCurrentImage] = useState<{ file: File; preview: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationQuality, setGenerationQuality] = useState<'preview' | 'high'>('preview');
  const [modelErrors, setModelErrors] = useState<Array<{ type: string; severity: string; message: string }>>([]);
  const [modelDimensions, setModelDimensions] = useState<{ x: number; y: number; z: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const modeConfig = creationModes.find(m => m.id === activeMode);
    if (modeConfig) {
      setSettings({ ...modeConfig.defaultSettings });
    }
  }, [activeMode]);

  const handleGenerate = useCallback(async (quality: 'preview' | 'high') => {
    if (!currentImage || isGenerating) return;
    
    setGenerationQuality(quality);
    setIsGenerating(true);
    setGenerationProgress(0);
    setModelErrors([]);
    setModelUrl(null);
    if (quality === 'preview') setPreviewUrl(null);

    const stages = quality === 'preview' 
      ? [15, 35, 55, 75, 90, 100]
      : [10, 20, 35, 50, 65, 78, 88, 95, 100];
    
    const delays = quality === 'preview' ? [400, 500, 600, 500, 400, 300] : [600, 800, 1000, 1200, 1000, 800, 600, 400, 200];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(r => setTimeout(r, delays[i]));
      setGenerationProgress(stages[i]);
    }

    setIsGenerating(false);
    setGenerationProgress(100);

    if (quality === 'preview') {
      setPreviewUrl('/models/preview-' + activeMode + '.glb');
      setModelDimensions({ x: 80, y: 80, z: 3 });
      setModelErrors([
        { type: 'Pared delgada', severity: 'warning', message: 'Algunas zonas < 0.4mm en el relieve' },
        { type: 'Voladizo', severity: 'info', message: 'Áreas con > 45° requieren soportes' },
      ]);
    } else {
      setModelUrl('/models/final-' + activeMode + '.stl');
      setPreviewUrl(null);
      setModelDimensions({ x: 80, y: 80, z: 3 });
      setModelErrors([
        { type: 'Pared delgada', severity: 'warning', message: 'Base en 2 zonas < 0.4mm' },
      ]);
    }
  }, [currentImage, activeMode, isGenerating]);

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setCurrentImage({ file, preview });
    setPreviewUrl(null);
    setModelUrl(null);
    setModelErrors([]);
    setModelDimensions(null);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setCurrentImage(null);
    setPreviewUrl(null);
    setModelUrl(null);
    setModelErrors([]);
    setModelDimensions(null);
  }, []);

  const handleResetSettings = useCallback(() => {
    const modeConfig = creationModes.find(m => m.id === activeMode);
    if (modeConfig) {
      setSettings({ ...modeConfig.defaultSettings });
    }
  }, [activeMode]);

  const currentModeConfig = creationModes.find(m => m.id === activeMode);

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
            <h2 className="font-display font-semibold text-heading-md">Imagen → STL</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="Cerrar panel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto" role="navigation" aria-label="Modos de creación">
            {creationModes.map((mode, i) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group',
                  activeMode === mode.id
                    ? 'bg-primary text-primary-foreground shadow-voxel-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="absolute inset-0 bg-gradient-to-br bg-[var(--gradient)] rounded-lg opacity-20" style={{ '--gradient': mode.gradient }} />
                  <mode.icon className="relative w-5 h-5 text-white" />
                  {mode.pro && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-amber-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </span>
                  )}
                </span>
                <span className="truncate">{mode.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/50">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
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
            <Image className="w-6 h-6" />
          </button>
        )}

        <main className="flex-1 lg:ml-0 min-w-0 flex flex-col">
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border px-4 py-3 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-heading-lg flex items-center gap-2">
                  <Image className="w-6 h-6 text-primary" />
                  Imagen → STL en un clic
                </h1>
                <p className="text-body-sm text-muted-foreground">Sube una foto, elige el modo y obtén tu modelo listo para imprimir</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)} iconLeft={<History className="w-4 h-4" />}>
                  Historial
                </Button>
                <Button variant="ghost" size="sm" iconLeft={<Globe className="w-4 h-4" />}>Comunidad</Button>
                <Button variant="outline" size="sm" iconLeft={<Settings className="w-4 h-4" />}>Config</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 lg:w-1/2 p-4 lg:p-6 overflow-y-auto space-y-6">
              <Card variant="glass" padding="lg" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-heading-sm">1. Sube tu imagen</h2>
                    <p className="text-body-sm text-muted-foreground">PNG, JPG, WebP · Máx. 10MB · Fondo se elimina automáticamente</p>
                  </div>
                  <Button variant="ghost" size="sm" iconLeft={<Info className="w-4 h-4" />}>Consejos</Button>
                </div>

                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={currentImage}
                  onRemove={handleRemoveImage}
                  isProcessing={isGenerating}
                />
              </Card>

              <Card variant="glass" padding="lg" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-heading-sm">2. Elige modo de creación</h2>
                  <span className="badge badge-primary text-xs">5 opciones</span>
                </div>
                <CreationModes
                  selectedMode={activeMode}
                  onSelect={setActiveMode}
                />
              </Card>

              <Card variant="glass" padding="lg" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-heading-sm">3. Ajustes en tiempo real</h2>
                  <Button variant="ghost" size="sm" onClick={handleResetSettings} iconLeft={<RotateCcw className="w-4 h-4" />}>Restablecer</Button>
                </div>
                <Editor3D
                  mode={activeMode}
                  settings={settings}
                  onSettingsChange={setSettings}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  generationProgress={generationProgress}
                  previewUrl={previewUrl}
                  modelUrl={modelUrl}
                  errors={modelErrors}
                />
              </Card>

              <Card variant="glass" padding="lg" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-heading-sm">4. Perfil de impresora</h2>
                  <span className="badge badge-primary text-xs">Auto-ajuste</span>
                </div>
                <PrinterProfiles
                  selectedPrinter={selectedPrinter}
                  onSelect={setSelectedPrinter}
                  modelDimensions={modelDimensions || undefined}
                />
              </Card>
            </div>

            <aside className="lg:w-1/2 border-l border-border bg-card/50 flex flex-col hidden lg:flex">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Vista previa 3D</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" iconLeft={<RotateCcw className="w-4 h-4" />} aria-label="Auto-rotar" />
                  <Button variant="ghost" size="sm" iconLeft={<Eye className="w-4 h-4" />} aria-label="Pantalla completa" />
                </div>
              </div>
              <div className="flex-1 relative min-h-[500px]">
                <ModelViewer3D
                  modelUrl={modelUrl}
                  previewUrl={previewUrl}
                  errors={modelErrors}
                  onDownload={() => modelUrl && window.open(modelUrl, '_blank')}
                  autoRotate={!isGenerating && !!modelUrl}
                />
              </div>
              <div className="p-4 border-t border-border space-y-3">
                {modelDimensions && (
                  <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-muted/50">
                    <div>
                      <div className="text-heading-sm font-semibold">{modelDimensions.x}mm</div>
                      <div className="text-body-xs text-muted-foreground">Ancho</div>
                    </div>
                    <div>
                      <div className="text-heading-sm font-semibold">{modelDimensions.y}mm</div>
                      <div className="text-body-xs text-muted-foreground">Alto</div>
                    </div>
                    <div>
                      <div className="text-heading-sm font-semibold">{modelDimensions.z}mm</div>
                      <div className="text-body-xs text-muted-foreground">Profundidad</div>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  {modelUrl ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1" iconLeft={<Download className="w-4 h-4" />} onClick={() => modelUrl && window.open(modelUrl, '_blank')}>
                        Descargar STL
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" iconLeft={<Box className="w-4 h-4" />}>Enviar a slicer</Button>
                    </>
                  ) : previewUrl ? (
                    <>
                      <Button size="sm" className="flex-1" iconLeft={<Zap className="w-4 h-4" />} onClick={() => handleGenerate('high')}>
                        Generar alta calidad
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" iconLeft={<Cube className="w-4 h-4" }}>Descargar preview</Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Image className="w-4 h-4 mr-2" />
                      Sube una imagen primero
                    </Button>
                  )}
                </div>
                {modelErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-300"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">{modelErrors.length} avisos de impresión</span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      {modelErrors.map((e, i) => (
                        <li key={i} className="text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {e.message}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </aside>
          </div>

          <div className="border-t border-border bg-background/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Historial reciente</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('grid')} className="p-2 rounded-lg hover:bg-muted" aria-label="Cuadrícula"><Layers className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('list')} className="p-2 rounded-lg hover:bg-muted" aria-label="Lista"><Layers className="w-4 h-4" style={{ transform: 'rotate(90deg)' }} /></button>
                </div>
              </div>
              <div className={cn('gap-4', viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3')}>
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} viewMode={viewMode} modeIcons={modeIcons} />
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

function ProjectCard({ project, viewMode, modeIcons }: { 
  project: typeof recentProjects[0]; 
  viewMode: 'grid' | 'list';
  modeIcons: Record<string, React.ElementType>;
}) {
  const statusColors = {
    completed: 'text-green-500 bg-green-500/10',
    processing: 'text-amber-500 bg-amber-500/10',
    failed: 'text-red-500 bg-red-500/10',
  };
  const ModeIcon = modeIcons[project.mode] || Cube;

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <ModeIcon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{project.name}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <ModeIcon className="w-3 h-3" />
              {creationModes.find(m => m.id === project.mode)?.label}
            </span>
            <span>{project.dims}</span>
            <span>{project.created}</span>
          </div>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[project.status])}>
          {project.status === 'completed' ? 'Listo' : project.status === 'processing' ? 'Procesando' : 'Error'}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Ver"><Eye className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Descargar"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg hover:bg-muted" aria-label="Eliminar"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-voxel-md transition-shadow">
      <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <ModeIcon className="w-16 h-16 text-primary/30" />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm" aria-label="Ver"><Eye className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm" aria-label="Descargar"><Download className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-medium truncate">{project.name}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ModeIcon className="w-3 h-3" />
          <span>{creationModes.find(m => m.id === project.mode)?.label}</span>
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