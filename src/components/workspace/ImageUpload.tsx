'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Upload, Image, X, Check, Loader2, AlertTriangle,
  Eye, Edit, RotateCw, Download, Trash2, Zap,
  FileImage, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  currentImage?: { file: File; preview: string } | null;
  onRemove: () => void;
  isProcessing?: boolean;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

export function ImageUpload({
  onImageSelect,
  currentImage,
  onRemove,
  isProcessing = false,
  acceptedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'],
  maxSizeMB = 10,
  className,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((f: File): boolean => {
    if (!acceptedTypes.includes(f.type)) {
      setError('Formato no soportado. Usa PNG, JPG, WebP o BMP.');
      return false;
    }
    if (f.size > maxSizeMB * 1024 * 1024) {
      setError(`Archivo demasiado grande. Máximo ${maxSizeMB}MB.`);
      return false;
    }
    setError(null);
    return true;
  }, [acceptedTypes, maxSizeMB]);

  const handleFile = useCallback((f: File) => {
    if (!validateFile(f)) return;
    
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    onImageSelect(f, url);
  }, [validateFile, onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = '';
  }, [handleFile]);

  const removeImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    onRemove();
  }, [preview, onRemove]);

  if (currentImage && !preview) {
    setPreview(currentImage.preview);
    setFile(currentImage.file);
  }

  return (
    <div className={cn('relative', className)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer',
          dragActive && !isProcessing ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50 hover:bg-muted/30',
          isProcessing ? 'opacity-50 cursor-wait' : '',
          currentImage || preview ? 'border-transparent p-0' : ''
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
          disabled={isProcessing}
        />

        <AnimatePresence mode="wait">
          {(!currentImage && !preview) ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-colors',
                dragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}>
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-lg">Sube tu imagen</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, WebP, BMP · Máx. {maxSizeMB}MB</p>
              </div>
              <p className="text-xs text-muted-foreground">Arrastra y suelta o haz clic para explorar</p>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center justify-center gap-1"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </motion.p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl z-10"
          >
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-medium">Procesando imagen...</p>
            <p className="text-sm text-muted-foreground">Eliminando fondo y optimizando</p>
          </motion.div>
        )}

        {(currentImage || preview) && (
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src={preview!}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="bg-white/90 dark:bg-voxel-900/90" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} aria-label="Cambiar imagen">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="bg-white/90 dark:bg-voxel-900/90" onClick={(e) => { e.stopPropagation(); removeImage(); }} aria-label="Eliminar imagen">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="bg-white/90 dark:bg-voxel-900/90" onClick={(e) => { e.stopPropagation(); }} aria-label="Rotar">
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white/90 dark:bg-voxel-900/90" onClick={(e) => { e.stopPropagation(); }} aria-label="Descargar original">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {(currentImage || preview) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileImage className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{file?.name || currentImage?.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file?.size || currentImage?.file.size || 0) > 1024 * 1024
                    ? `${((file?.size || currentImage?.file.size || 0) / (1024 * 1024)).toFixed(1)} MB`
                    : `${((file?.size || currentImage?.file.size || 0) / 1024).toFixed(0)} KB`}
                  · {file?.type || currentImage?.file.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge bg-green-500/10 text-green-500 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Lista para generar
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}