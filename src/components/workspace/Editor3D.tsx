'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Sliders, Minimize, Maximize, RotateCcw, Eye, EyeOff,
  Download, Box, Zap, AlertTriangle, CheckCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { creationModes } from './CreationModes';

interface SliderConfig {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon?: React.ReactNode;
  description?: string;
}

interface Editor3DProps {
  mode: string;
  settings: Record<string, number | boolean>;
  onSettingsChange: (settings: Record<string, number | boolean>) => void;
  onGenerate: (quality: 'preview' | 'high') => void;
  isGenerating: boolean;
  generationProgress: number;
  previewUrl?: string;
  modelUrl?: string;
  errors?: ModelError[];
  className?: string;
}

interface ModelError {
  type: 'thin_wall' | 'weak_area' | 'overhang' | 'non_manifold' | 'floating' | 'size';
  severity: 'warning' | 'error' | 'info';
  message: string;
  location?: string;
}

const modeSettings: Record<string, SliderConfig[]> = {
  relief: [
    { key: 'depth', label: 'Profundidad', min: 0.5, max: 10, step: 0.5, unit: 'mm', description: 'Altura máxima del relieve' },
    { key: 'size', label: 'Tamaño', min: 20, max: 300, step: 5, unit: 'mm', description: 'Ancho del modelo final' },
    { key: 'smoothing', label: 'Suavizado', min: 0, max: 100, step: 5, unit: '%', description: 'Suaviza transiciones bruscas' },
    { key: 'contrast', label: 'Contraste', min: 0, max: 100, step: 5, unit: '%', description: 'Refuerza diferencias de tono' },
    { key: 'baseThickness', label: 'Base', min: 1, max: 10, step: 0.5, unit: 'mm', description: 'Grosor de la base plana' },
    { key: 'resolution', label: 'Resolución', min: 128, max: 1024, step: 64, unit: 'px', description: 'Detalle de la malla' },
  ],
  lithophane: [
    { key: 'depth', label: 'Profundidad máx', min: 1, max: 5, step: 0.1, unit: 'mm', description: 'Espesor en zonas más oscuras' },
    { key: 'size', label: 'Tamaño', min: 40, max: 250, step: 5, unit: 'mm', description: 'Ancho de la litofanía' },
    { key: 'smoothing', label: 'Suavizado', min: 0, max: 100, step: 5, unit: '%', description: 'Reduce artefactos' },
    { key: 'contrast', label: 'Contraste', min: 0, max: 100, step: 5, unit: '%', description: 'Mejora definición' },
    { key: 'minThickness', label: 'Mín. grosor', min: 0.2, max: 1.5, step: 0.1, unit: 'mm', description: 'Zonas más claras (translúcidas)' },
    { key: 'maxThickness', label: 'Máx. grosor', min: 1, max: 5, step: 0.1, unit: 'mm', description: 'Zonas más oscuras (opacas)' },
    { key: 'resolution', label: 'Resolución', min: 256, max: 1024, step: 64, unit: 'px', description: 'Calidad de detalle' },
  ],
  medallion: [
    { key: 'depth', label: 'Profundidad relieve', min: 0.5, max: 5, step: 0.5, unit: 'mm' },
    { key: 'size', label: 'Diámetro', min: 20, max: 100, step: 5, unit: 'mm' },
    { key: 'smoothing', label: 'Suavizado', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'contrast', label: 'Contraste', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'borderWidth', label: 'Borde', min: 1, max: 10, step: 0.5, unit: 'mm', description: 'Ancho del marco exterior' },
    { key: 'holeSize', label: 'Argolla', min: 2, max: 8, step: 0.5, unit: 'mm', description: 'Diámetro del orificio' },
    { key: 'resolution', label: 'Resolución', min: 128, max: 512, step: 64, unit: 'px' },
  ],
  keychain: [
    { key: 'depth', label: 'Profundidad', min: 0.5, max: 5, step: 0.5, unit: 'mm' },
    { key: 'size', label: 'Tamaño', min: 25, max: 80, step: 5, unit: 'mm' },
    { key: 'smoothing', label: 'Suavizado', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'contrast', label: 'Contraste', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'baseThickness', label: 'Base', min: 2, max: 8, step: 0.5, unit: 'mm', description: 'Refuerzo inferior' },
    { key: 'ringSize', label: 'Argolla', min: 4, max: 12, step: 0.5, unit: 'mm' },
    { key: 'resolution', label: 'Resolución', min: 128, max: 512, step: 64, unit: 'px' },
  ],
  figure3d: [
    { key: 'detail', label: 'Nivel detalle', min: 10, max: 100, step: 5, unit: '%', description: 'Complejidad geométrica IA' },
    { key: 'size', label: 'Tamaño', min: 30, max: 200, step: 5, unit: 'mm' },
    { key: 'smoothing', label: 'Suavizado', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'textureQuality', label: 'Calidad textura', min: 10, max: 100, step: 10, unit: '%', description: 'Resolución mapas PBR' },
    { key: 'wallThickness', label: 'Pared hueca', min: 1, max: 5, step: 0.5, unit: 'mm', description: 'Si está hueca' },
    { key: 'resolution', label: 'Resolución malla', min: 256, max: 1024, step: 64, unit: 'px' },
  ],
};

const booleanSettings: Record<string, { key: string; label: string; description: string }[]> = {
  medallion: [{ key: 'shape', label: 'Forma circular', description: 'Circular (off = ovalado)' }],
  keychain: [{ key: 'roundedCorners', label: 'Esquinas redondeadas', description: 'Bordes suaves en la base' }],
  figure3d: [{ key: 'hollow', label: 'Figura hueca', description: 'Ahorra material y tiempo' }],
};

export function Editor3D({
  mode,
  settings,
  onSettingsChange,
  onGenerate,
  isGenerating,
  generationProgress,
  previewUrl,
  modelUrl,
  errors = [],
  className,
}: Editor3DProps) {
  const [expanded, setExpanded] = useState(true);
  const [showErrors, setShowErrors] = useState(errors.length > 0);
  const sliders = modeSettings[mode] || modeSettings.relief;
  const booleans = booleanSettings[mode] || [];

  const handleSliderChange = useCallback((key: string, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  }, [settings, onSettingsChange]);

  const handleBooleanChange = useCallback((key: string, value: boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  }, [settings, onSettingsChange]);

  const handleReset = useCallback(() => {
    const modeConfig = creationModes.find(m => m.id === mode);
    if (modeConfig) {
      onSettingsChange(modeConfig.defaultSettings as unknown as Record<string, number | boolean>);
    }
  }, [mode, onSettingsChange]);

  useEffect(() => {
    if (errors.length > 0) setShowErrors(true);
  }, [errors]);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Editor en tiempo real</h3>
          {errors.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="badge bg-amber-500/10 text-amber-500"
            >
              {errors.length} {errors.length === 1 ? 'aviso' : 'avisos'}
            </motion.span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} iconLeft={expanded ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />} />
      </div>

      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {sliders.map((slider) => (
                <SliderControl
                  key={slider.key}
                  config={slider}
                  value={(settings[slider.key] as number) || slider.min}
                  onChange={(v) => handleSliderChange(slider.key, v)}
                />
              ))}
              {booleans.map((bool) => (
                <BooleanControl
                  key={bool.key}
                  config={bool}
                  value={(settings[bool.key] as boolean) || false}
                  onChange={(v) => handleBooleanChange(bool.key, v)}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Button variant="outline" size="sm" iconLeft={<RotateCcw className="w-4 h-4" />} onClick={handleReset}>
                Restablecer
              </Button>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Los cambios se aplican en vista previa al soltar el slider</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showErrors && errors.length > 0 && (
        <ErrorPanel errors={errors} onDismiss={() => setShowErrors(false)} />
      )}

      <GenerationActions
        onGenerate={onGenerate}
        isGenerating={isGenerating}
        progress={generationProgress}
        previewUrl={previewUrl}
        modelUrl={modelUrl}
      />
    </div>
  );
}

function SliderControl({ config, value, onChange }: { config: SliderConfig; value: number; onChange: (v: number) => void }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
  };

  const handleBlur = () => {
    onChange(localValue);
  };

  const percentage = ((localValue - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="space-y-2 p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {config.icon}
          <div>
            <label className="font-medium text-sm">{config.label}</label>
            {config.description && <p className="text-[11px] text-muted-foreground">{config.description}</p>}
          </div>
        </div>
        <span className="font-mono text-sm text-primary bg-primary/10 px-2 py-0.5 rounded">
          {localValue}{config.unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className="w-full h-2 appearance-none bg-transparent cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%)`,
            borderRadius: '9999px',
          }}
        />
        <div className="absolute bottom-full left-0 right-0 flex justify-between text-[10px] text-muted-foreground mb-1">
          <span>{config.min}{config.unit}</span>
          <span>{config.max}{config.unit}</span>
        </div>
      </div>
    </div>
  );
}

function BooleanControl({ config, value, onChange }: { config: { key: string; label: string; description: string }; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
      <label className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <div>
            <span className="font-medium text-sm">{config.label}</span>
            <p className="text-[11px] text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </label>
    </div>
  );
}

function ErrorPanel({ errors, onDismiss }: { errors: ModelError[]; onDismiss: () => void }) {
  const severityColors = {
    error: 'bg-red-500/10 border-red-500/30 text-red-500',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
  };
  const severityIcons = {
    error: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Análisis del modelo
        </h4>
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          <EyeOff className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {errors.map((error, i) => {
          const ErrorIcon = severityIcons[error.severity];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn('flex items-start gap-3 p-3 rounded-lg border', severityColors[error.severity])}
            >
              <ErrorIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">{error.message}</p>
                {error.location && <p className="text-[11px] text-muted-foreground mt-0.5">Ubicación: {error.location}</p>}
              </div>
              <span className="badge text-xs px-2 py-0.5 capitalize">{error.severity}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function GenerationActions({
  onGenerate,
  isGenerating,
  progress,
  previewUrl,
  modelUrl,
}: {
  onGenerate: (quality: 'preview' | 'high') => void;
  isGenerating: boolean;
  progress: number;
  previewUrl?: string;
  modelUrl?: string;
}) {
  return (
    <div className="space-y-3 pt-2 border-t border-border/50">
      <AnimatePresence mode="wait">
        {isGenerating ? (
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
            <div className="flex items-center justify-between text-sm">
              <span>Generando {progress > 50 ? 'alta calidad' : 'vista previa'}...</span>
              <span className="font-mono text-primary">{progress}%</span>
            </div>
            <Button variant="outline" size="sm" className="w-full" disabled>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Procesando con IA...
            </Button>
          </motion.div>
        ) : previewUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-green-700 dark:text-green-300">¡Vista previa lista!</p>
                <p className="text-sm text-muted-foreground">Revisa el modelo y genera la versión final</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                className="flex-1 gap-2"
                iconLeft={<Zap className="w-5 h-5" />}
                onClick={() => onGenerate('high')}
              >
                Generar alta calidad
              </Button>
              <Button variant="outline" size="lg" iconLeft={<Box className="w-5 h-5" />}>Descargar STL</Button>
            </div>
          </motion.div>
        ) : modelUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Box className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">¡Modelo completado!</p>
                <p className="text-sm text-muted-foreground">Listo para imprimir en tu impresora</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="lg" className="flex-1 gap-2" iconLeft={<Download className="w-5 h-5" />}>Descargar STL</Button>
              <Button variant="outline" size="lg" iconLeft={<Zap className="w-5 h-5" />}>Nueva generación</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-2"
              iconLeft={<Eye className="w-5 h-5" />}
              onClick={() => onGenerate('preview')}
            >
              Vista rápida (~5s)
            </Button>
            <Button
              size="lg"
              className="flex-1 gap-2"
              iconLeft={<Box className="w-5 h-5" />}
              onClick={() => onGenerate('high')}
            >
              Alta calidad (~30s)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
