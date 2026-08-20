'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stage, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  RotateCcw, Maximize, Minimize, Eye, EyeOff,
  Download, Box, Settings, Zap, AlertTriangle, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ModelViewer3DProps {
  modelUrl?: string;
  previewUrl?: string;
  errors?: Array<{ type: string; severity: string; message: string }>;
  onDownload?: () => void;
  onFullscreen?: () => void;
  className?: string;
  autoRotate?: boolean;
  showGrid?: boolean;
}

const ModelScene = ({ modelUrl, previewUrl, errors, showGrid, autoRotate }: {
  modelUrl?: string;
  previewUrl?: string;
  errors?: Array<{ type: string; severity: string; message: string }>;
  showGrid?: boolean;
  autoRotate?: boolean;
}) => {
  const { scene, camera, gl } = useThree();
  const [loaded, setLoaded] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current && loaded) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  useEffect(() => {
    if (modelUrl || previewUrl) {
      setLoaded(false);
      const timer = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [modelUrl, previewUrl]);

  return (
    <group ref={groupRef}>
      <Environment
        preset="studio"
        background={false}
        ground={showGrid ? 'projected' : false}
      />
      
      {showGrid && (
        <Stage
          width={10}
          height={10}
          segments={20}
          contactShadow={false}
          opacity={0.3}
        />
      )}

      <ContactShadows
        opacity={0.3}
        scale={5}
        blur={2}
        far={10}
      />

      {(modelUrl || previewUrl) && (
        <Suspense fallback={<LoadingPlaceholder />}>
          <ModelLoader url={modelUrl || previewUrl!} onLoad={() => setLoaded(true)} />
        </Suspense>
      )}

      {!modelUrl && !previewUrl && (
        <EmptyState />
      )}

      {errors && errors.length > 0 && (
        <ErrorIndicators errors={errors} />
      )}
    </group>
  );
};

function ModelLoader({ url, onLoad }: { url: string; onLoad: () => void }) {
  const gltf = useLoader(GLTFLoader, url);
  
  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.metalness = 0.1;
            child.material.roughness = 0.8;
          }
        }
      });
      
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      gltf.scene.position.sub(center);
      gltf.scene.scale.multiplyScalar(2 / maxDim);
      
      onLoad();
    }
  }, [gltf]);

  return gltf ? <primitive object={gltf.scene} dispose={null} /> : null;
}

function LoadingPlaceholder() {
  return (
    <group>
      <motion.mesh
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        position={[0, 0.5, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#e4e4e7"
          metalness={0.1}
          roughness={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </motion.mesh>
      <motion.mesh
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        position={[0, -0.5, 0]}
      >
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#71717a" metalness={0.1} roughness={0.8} />
      </motion.mesh>
    </group>
  );
}

function EmptyState() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#e4e4e7"
          metalness={0.1}
          roughness={0.8}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#71717a" metalness={0.1} roughness={0.8} />
      </mesh>
      <Html
        position={[0, -1.2, 0]}
        fullscreen
        center
        transform
        sprites
        distanceFactor={5}
        zIndexRange={[100, 100]}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Box className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">Sube una imagen para generar el modelo 3D</p>
        </motion.div>
      </Html>
    </group>
  );
}

function ErrorIndicators({ errors }: { errors: Array<{ type: string; severity: string; message: string }> }) {
  return (
    <group>
      {errors.map((error, i) => (
        <Html
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2 + 1,
            (Math.random() - 0.5) * 2
          ]}
          fullscreen
          center
          transform
          sprites
          distanceFactor={3}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium pointer-events-none',
              error.severity === 'error' && 'bg-red-500 text-white',
              error.severity === 'warning' && 'bg-amber-500 text-white',
              error.severity === 'info' && 'bg-blue-500 text-white'
            )}
          >
            ⚠ {error.type}
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

import { Suspense, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { primitive } from '@react-three/fiber';
import { cn } from '@/lib/utils';

export function ModelViewer3D({
  modelUrl,
  previewUrl,
  errors = [],
  onDownload,
  onFullscreen,
  className,
  autoRotate = false,
  showGrid = true,
}: ModelViewer3DProps) {
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'matcap'>('solid');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    onFullscreen?.();
  };

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <div className="absolute top-3 right-3 z-10 flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => setViewMode('solid')} className={viewMode === 'solid' ? 'bg-primary text-primary-foreground' : ''}>
          <Box className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setViewMode('wireframe')} className={viewMode === 'wireframe' ? 'bg-primary text-primary-foreground' : ''}>
          <Box className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleFullscreen} iconLeft={expanded ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />} />
      </div>

      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          style={{ touchAction: 'none' }}
        >
          <ModelScene
            modelUrl={modelUrl}
            previewUrl={previewUrl}
            errors={errors}
            showGrid={showGrid}
            autoRotate={autoRotate}
          />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={10}
            polarAngle={[0, Math.PI / 2]}
          />
        </Canvas>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-2">
        <AnimatePresence mode="wait">
          {modelUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <Button variant="outline" size="sm" iconLeft={<Download className="w-4 h-4" />} onClick={onDownload}>
                Descargar STL
              </Button>
              <Button variant="ghost" size="sm" iconLeft={<Eye className="w-4 h-4" />}>
                Ver malla
              </Button>
              <Button variant="ghost" size="sm" iconLeft={<Box className="w-4 h-4" />}>
                Enviar a slicer
              </Button>
            </motion.div>
          ) : previewUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <Button size="sm" iconLeft={<Zap className="w-4 h-4" />}>Generar alta calidad</Button>
              <Button variant="outline" size="sm" iconLeft={<Box className="w-4 h-4" />}>Descargar preview</Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {(errors.length > 0 || modelUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 right-3 flex justify-center"
        >
          <div className="flex items-center gap-3 flex-wrap px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-voxel-lg text-sm">
            {errors.length > 0 && (
              <span className="flex items-center gap-1 text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                {errors.length} avisos
              </span>
            )}
            {modelUrl && (
              <span className="flex items-center gap-1 text-green-500">
                <CheckCircle className="w-4 h-4" />
                Modelo listo
              </span>
            )}
            {previewUrl && !modelUrl && (
              <span className="flex items-center gap-1 text-primary">
                <Zap className="w-4 h-4 animate-pulse" />
                Vista previa
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';