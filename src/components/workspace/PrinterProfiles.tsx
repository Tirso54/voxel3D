'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Printer, Check, ChevronDown, ChevronUp, Maximize, Minimize,
  Box, Cpu, Zap, Shield, AlertTriangle, Info, ExternalLink,
  Wifi, Usb, SdCard, Bluetooth
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PrinterProfile {
  id: string;
  name: string;
  brand: string;
  type: 'FDM' | 'SLA' | 'SLS';
  buildVolume: { x: number; y: number; z: number };
  nozzleSizes: number[];
  materials: string[];
  features: string[];
  connectivity: string[];
  recommended: boolean;
  popular: boolean;
  icon: string;
  color: string;
}

export const printerProfiles: PrinterProfile[] = [
  {
    id: 'bambu-a1-mini',
    name: 'A1 Mini',
    brand: 'Bambu Lab',
    type: 'FDM',
    buildVolume: { x: 180, y: 180, z: 180 },
    nozzleSizes: [0.2, 0.4, 0.6, 0.8],
    materials: ['PLA', 'PETG', 'TPU', 'PVA', 'ASA'],
    features: ['AMS Lite', 'Calibración automática', 'Cámara', 'Compensación vibración'],
    connectivity: ['WiFi', 'Bluetooth', 'USB', 'SD'],
    recommended: true,
    popular: true,
    icon: 'bambu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'bambu-p1s',
    name: 'P1S',
    brand: 'Bambu Lab',
    type: 'FDM',
    buildVolume: { x: 256, y: 256, z: 256 },
    nozzleSizes: [0.2, 0.4, 0.6, 0.8],
    materials: ['PLA', 'PETG', 'ABS', 'ASA', 'PC', 'PA', 'TPU', 'PVA'],
    features: ['AMS', 'Cámara cerrada', 'Cámara', 'Compensación vibración', 'Filtro carbón'],
    connectivity: ['WiFi', 'Bluetooth', 'USB', 'SD', 'Ethernet'],
    recommended: true,
    popular: true,
    icon: 'bambu',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'bambu-x1c',
    name: 'X1 Carbon',
    brand: 'Bambu Lab',
    type: 'FDM',
    buildVolume: { x: 256, y: 256, z: 256 },
    nozzleSizes: [0.2, 0.4, 0.6, 0.8],
    materials: ['PLA', 'PETG', 'ABS', 'ASA', 'PC', 'PA', 'TPU', 'PVA', 'Fibra carbono'],
    features: ['AMS', 'LiDAR', 'IA detección fallos', 'Cámara cerrada', 'Filtro HEPA'],
    connectivity: ['WiFi', 'Bluetooth', 'USB', 'SD', 'Ethernet'],
    recommended: true,
    popular: false,
    icon: 'bambu',
    color: 'from-voxel-800 to-voxel-900',
  },
  {
    id: 'ender-3-v3-ke',
    name: 'Ender 3 V3 KE',
    brand: 'Creality',
    type: 'FDM',
    buildVolume: { x: 220, y: 220, z: 240 },
    nozzleSizes: [0.4, 0.6, 0.8],
    materials: ['PLA', 'PETG', 'TPU', 'ABS'],
    features: ['Direct drive', 'Nivelación auto', 'Alta velocidad', 'Klipper'],
    connectivity: ['USB', 'SD', 'WiFi (opcional)'],
    recommended: false,
    popular: true,
    icon: 'creality',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'ender-3-v3-se',
    name: 'Ender 3 V3 SE',
    brand: 'Creality',
    type: 'FDM',
    buildVolume: { x: 220, y: 220, z: 250 },
    nozzleSizes: [0.4],
    materials: ['PLA', 'PETG', 'TPU'],
    features: ['Direct drive', 'Nivelación CR Touch', 'Silenciosa'],
    connectivity: ['USB', 'SD'],
    recommended: false,
    popular: true,
    icon: 'creality',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'prusa-mk4',
    name: 'Original Prusa MK4',
    brand: 'Prusa Research',
    type: 'FDM',
    buildVolume: { x: 250, y: 210, z: 220 },
    nozzleSizes: [0.25, 0.4, 0.6, 0.8],
    materials: ['PLA', 'PETG', 'ASA', 'PC', 'PA', 'TPU', 'Fibra carbono'],
    features: ['Nextruder', 'Input Shaper', 'Pressure Advance', 'MMU3 compatible', 'Red abierta'],
    connectivity: ['USB', 'SD', 'WiFi', 'Ethernet', 'PrusaLink'],
    recommended: true,
    popular: true,
    icon: 'prusa',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'prusa-mini',
    name: 'Original Prusa MINI+',
    brand: 'Prusa Research',
    type: 'FDM',
    buildVolume: { x: 180, y: 180, z: 180 },
    nozzleSizes: [0.25, 0.4, 0.6],
    materials: ['PLA', 'PETG', 'ASA', 'TPU'],
    features: ['Estructura rígida', 'SuperPINDA', 'MMU compatible', 'Red abierta'],
    connectivity: ['USB', 'SD', 'WiFi', 'Ethernet', 'PrusaLink'],
    recommended: true,
    popular: true,
    icon: 'prusa',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'elegoo-saturn-4',
    name: 'Saturn 4 Ultra',
    brand: 'Elegoo',
    type: 'SLA',
    buildVolume: { x: 218, y: 122, z: 260 },
    nozzleSizes: [],
    materials: ['Resina estándar', 'Resina dura', 'Resina flexible', 'Resina fundible', 'Resina dental'],
    features: ['10K mono', 'Calentador', 'Purificador aire', 'Nivelación auto', 'Detección fallos'],
    connectivity: ['USB', 'WiFi', 'Ethernet'],
    recommended: false,
    popular: true,
    icon: 'elegoo',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'anycubic-photon-mono-m7',
    name: 'Photon Mono M7 Pro',
    brand: 'Anycubic',
    type: 'SLA',
    buildVolume: { x: 163, y: 102, z: 180 },
    nozzleSizes: [],
    materials: ['Resina estándar', 'Resina dura', 'Resina flexible', 'Resina fundible'],
    features: ['14K mono', 'COB', 'Calentador inteligente', 'Nivelación auto', 'Detección residuos'],
    connectivity: ['USB', 'WiFi'],
    recommended: false,
    popular: false,
    icon: 'anycubic',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'custom',
    name: 'Otra / Personalizada',
    brand: 'Genérica',
    type: 'FDM',
    buildVolume: { x: 200, y: 200, z: 200 },
    nozzleSizes: [0.4],
    materials: ['PLA', 'PETG'],
    features: ['Configuración manual'],
    connectivity: ['SD', 'USB'],
    recommended: false,
    popular: false,
    icon: 'custom',
    color: 'from-voxel-500 to-voxel-600',
  },
];

interface PrinterProfilesProps {
  selectedPrinter: string;
  onSelect: (printerId: string) => void;
  modelDimensions?: { x: number; y: number; z: number };
  className?: string;
}

export function PrinterProfiles({ selectedPrinter, onSelect, modelDimensions, className }: PrinterProfilesProps) {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const printer = printerProfiles.find(p => p.id === selectedPrinter) || printerProfiles[0];
  const fits = modelDimensions ? checkFit(modelDimensions, printer) : true;

  const visiblePrinters = showAll ? printerProfiles : printerProfiles.filter(p => p.recommended || p.popular);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Printer className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Perfil de impresora</h3>
          {!fits && modelDimensions && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="badge bg-red-500/10 text-red-500"
            >
              Modelo no cabe
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Menos' : 'Todos'} ({printerProfiles.length})
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} iconLeft={expanded ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />} />
        </div>
      </div>

      <div className="relative">
        <SelectedPrinterCard printer={printer} fits={fits} modelDimensions={modelDimensions} onChange={() => setExpanded(true)} />

        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setExpanded(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card rounded-2xl border shadow-voxel-xl"
              >
                <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur z-10">
                  <h3 className="font-semibold">Seleccionar impresora</h3>
                  <Button variant="ghost" size="sm" onClick={() => setExpanded(false)}>
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-4 space-y-4">
                  <PrinterSearch />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {visiblePrinters.map((p, i) => (
                      <motion.button
                        key={p.id}
                        onClick={() => { onSelect(p.id); setExpanded(false); }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          'relative p-4 rounded-xl border-2 transition-all text-left',
                          selectedPrinter === p.id
                            ? 'border-primary bg-primary/5 shadow-voxel-sm'
                            : 'border-border hover:border-primary/30 bg-card'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', p.color)}>
                            <Printer className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">{p.name}</span>
                              {p.recommended && <span className="badge badge-primary text-xs">Recomendada</span>}
                              {p.popular && <span className="badge bg-amber-500/10 text-amber-500 text-xs">Popular</span>}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{p.brand} · {p.type}</p>
                            <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-muted-foreground">
                              <span>Vol: {p.buildVolume.x}×{p.buildVolume.y}×{p.buildVolume.z}mm</span>
                              {modelDimensions && !checkFit(modelDimensions, p) && (
                                <span className="text-red-500">⚠ No cabe</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {selectedPrinter === p.id && (
                          <Check className="absolute top-2 right-2 w-5 h-5 text-primary bg-primary/10 rounded-full p-0.5" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-40" onClick={() => setExpanded(false)} />
      )}
    </div>
  );
}

function SelectedPrinterCard({ printer, fits, modelDimensions, onChange }: {
  printer: PrinterProfile;
  fits: boolean;
  modelDimensions?: { x: number; y: number; z: number };
  onChange: () => void;
}) {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ boxShadow: '0 10px 25px -5px hsl(var(--primary) / 0.1)' }}
      className={cn(
        'w-full p-4 rounded-xl border-2 transition-all text-left group',
        fits ? 'border-primary/30 bg-primary/5' : 'border-red-500/30 bg-red-500/5'
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', printer.color)}>
          <Printer className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{printer.name}</span>
            <span className="text-xs text-muted-foreground">{printer.brand}</span>
            {printer.recommended && <span className="badge badge-primary text-xs">Recomendada</span>}
            {printer.popular && <span className="badge bg-amber-500/10 text-amber-500 text-xs">Popular</span>}
          </div>
          <p className="text-sm text-muted-foreground truncate">{printer.type} · Vol: {printer.buildVolume.x}×{printer.buildVolume.y}×{printer.buildVolume.z}mm</p>
        </div>
        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>

      {modelDimensions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-border/50 space-y-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tu modelo</span>
            <span className="font-mono">{modelDimensions.x}×{modelDimensions.y}×{modelDimensions.z}mm</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Volumen impresora</span>
            <span className="font-mono">{printer.buildVolume.x}×{printer.buildVolume.y}×{printer.buildVolume.z}mm</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(modelDimensions.x/printer.buildVolume.x, modelDimensions.y/printer.buildVolume.y, modelDimensions.z/printer.buildVolume.z) * 100)}%` }}
              className={cn('h-full rounded-full transition-all duration-500', fits ? 'bg-green-500' : 'bg-red-500')}
            />
          </div>
          <p className={cn('text-xs font-medium', fits ? 'text-green-500' : 'text-red-500')}>
            {fits ? '✓ El modelo cabe correctamente' : '⚠ El modelo NO cabe - se escalará automáticamente'}
          </p>
        </motion.div>
      )}
    </motion.button>
  );
}

function PrinterSearch() {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Buscar impresora (marca, modelo)..."
        className="input pl-10"
      />
      <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </div>
  );
}

function checkFit(model: { x: number; y: number; z: number }, printer: PrinterProfile): boolean {
  return model.x <= printer.buildVolume.x && model.y <= printer.buildVolume.y && model.z <= printer.buildVolume.z;
}

import { useState } from 'react';