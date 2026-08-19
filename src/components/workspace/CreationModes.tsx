'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Layers, Image, Circle, Hexagon, Box, Sparkles,
  Check, ChevronRight, Info, Settings, Zap, Crown
} from 'lucide-react';

export const creationModes = [
  {
    id: 'relief',
    label: 'Relieve',
    description: 'Convierte tu imagen en un relieve 3D con profundidad variable. Ideal para cuadros, señalética y decoración de pared.',
    icon: Layers,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    tags: ['2.5D', 'Pared', 'Decoración'],
    settings: ['depth', 'size', 'smoothing', 'contrast', 'baseThickness', 'resolution'],
    defaultSettings: { depth: 3, size: 100, smoothing: 50, contrast: 50, baseThickness: 2, resolution: 256 },
    pro: false,
  },
  {
    id: 'lithophane',
    label: 'Litofanía',
    description: 'Crea una litofanía que revela la imagen al transluz. Perfecta para lámparas, cortinas de luz y regalos.',
    icon: Image,
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    tags: ['Transluz', 'Lámparas', 'Regalos'],
    settings: ['depth', 'size', 'smoothing', 'contrast', 'minThickness', 'maxThickness', 'resolution'],
    defaultSettings: { depth: 2.5, size: 80, smoothing: 30, contrast: 70, minThickness: 0.4, maxThickness: 3, resolution: 512 },
    pro: false,
  },
  {
    id: 'medallion',
    label: 'Medallón',
    description: 'Genera un medallón circular/ovalado con tu imagen en relieve. Con aro para colgar. Joyería y llaveros.',
    icon: Circle,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    tags: ['Joyería', 'Colgante', 'Ovalado'],
    settings: ['depth', 'size', 'smoothing', 'contrast', 'borderWidth', 'holeSize', 'shape', 'resolution'],
    defaultSettings: { depth: 2, size: 50, smoothing: 60, contrast: 60, borderWidth: 3, holeSize: 4, shape: 'circle', resolution: 256 },
    pro: false,
  },
  {
    id: 'keychain',
    label: 'Llavero',
    description: 'Diseña llaveros personalizados con tu imagen. Incluye argolla y base reforzada. Listo para imprimir y usar.',
    icon: Hexagon,
    gradient: 'from-green-500 to-teal-500',
    bgGradient: 'from-green-500/10 to-teal-500/10',
    tags: ['Utilitario', 'Argolla', 'Reforzado'],
    settings: ['depth', 'size', 'smoothing', 'contrast', 'baseThickness', 'ringSize', 'roundedCorners', 'resolution'],
    defaultSettings: { depth: 2.5, size: 45, smoothing: 40, contrast: 55, baseThickness: 3, ringSize: 8, roundedCorners: true, resolution: 256 },
    pro: false,
  },
  {
    id: 'figure3d',
    label: 'Figura 3D',
    description: 'Convierte la imagen en una figura 3D completa con volumen real. IA reconstruye la geometría oculta.',
    icon: Box,
    gradient: 'from-rose-500 to-red-500',
    bgGradient: 'from-rose-500/10 to-red-500/10',
    tags: ['3D Real', 'IA Avanzada', 'Volumen'],
    settings: ['detail', 'size', 'smoothing', 'textureQuality', 'hollow', 'wallThickness', 'resolution'],
    defaultSettings: { detail: 80, size: 100, smoothing: 50, textureQuality: 70, hollow: true, wallThickness: 2, resolution: 512 },
    pro: true,
  },
];

interface CreationModesProps {
  selectedMode: string;
  onSelect: (modeId: string) => void;
  className?: string;
}

export function CreationModes({ selectedMode, onSelect, className }: CreationModesProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-heading-sm">Modo de creación</h3>
        <span className="badge badge-primary text-xs">5 opciones</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {creationModes.map((mode, index) => (
          <motion.button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'relative group p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full',
              selectedMode === mode.id
                ? 'border-primary bg-primary/5 shadow-voxel-md shadow-primary/10'
                : 'border-border hover:border-primary/30 bg-card hover:shadow-voxel-sm'
            )}
            aria-pressed={selectedMode === mode.id}
          >
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
              mode.bgGradient
            )}>
              <mode.icon className="w-6 h-6 text-white" />
              {mode.pro && (
                <Crown className="absolute -top-1 -right-1 w-4 h-4 text-amber-500" />
              )}
            </div>

            <h4 className="font-medium text-foreground mb-1">{mode.label}</h4>
            <p className="text-body-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{mode.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {mode.tags.map((tag, i) => (
                <span key={i} className="badge bg-muted text-muted-foreground text-[10px] px-2 py-0.5">{tag}</span>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedMode === mode.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t border-border/50"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-full flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    <Settings className="w-3 h-3" />
                    Ajustes avanzados
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {selectedMode === mode.id && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 rounded-2xl border-2 border-primary/50 pointer-events-none"
              />
            )}
          </motion.button>
        ))}
      </div>

      <ModeDescription mode={creationModes.find(m => m.id === selectedMode)!} />
    </div>
  );
}

function ModeDescription({ mode }: { mode: typeof creationModes[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-muted/50 border border-border/50"
    >
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', mode.bgGradient)}>
          <mode.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{mode.label}</h4>
          <p className="text-body-sm text-muted-foreground mt-1">{mode.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {mode.tags.map((tag, i) => (
              <span key={i} className="badge badge-primary text-xs">{tag}</span>
            ))}
            {mode.pro && <span className="badge bg-amber-500/10 text-amber-500 text-xs">Pro</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}