'use client';

import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Box, Code, Terminal, Key, Shield, Globe, Zap, BookOpen,
  Copy, Check, ExternalLink, ChevronRight, Moon, Sun,
  FileCode, Server, Database, Users, Activity
} from 'lucide-react';

const endpoints = [
  {
    category: 'Generación 3D',
    items: [
      { method: 'POST', path: '/api/v1/3d/text-to-3d', desc: 'Genera modelo 3D desde texto', auth: true },
      { method: 'POST', path: '/api/v1/3d/image-to-3d', desc: 'Convierte imagen a modelo 3D', auth: true },
      { method: 'POST', path: '/api/v1/3d/text-to-image', desc: 'Genera imagen de referencia', auth: true },
      { method: 'GET', path: '/api/v1/3d/models/{id}', desc: 'Obtiene estado del modelo', auth: true },
      { method: 'GET', path: '/api/v1/3d/models/{id}/download', desc: 'Descarga modelo generado', auth: true },
    ]
  },
  {
    category: 'Texturas y Materiales',
    items: [
      { method: 'POST', path: '/api/v1/textures/generate', desc: 'Genera texturas PBR completas', auth: true },
      { method: 'POST', path: '/api/v1/textures/stylized', desc: 'Texturas estilizadas (cel-shaded, low-poly)', auth: true },
      { method: 'GET', path: '/api/v1/textures/{id}/maps', desc: 'Obtiene mapas de textura (albedo, roughness, normal...)', auth: true },
    ]
  },
  {
    category: 'Preparación para Impresión',
    items: [
      { method: 'POST', path: '/api/v1/print/split', desc: 'Divide modelo con conectores automáticos', auth: true },
      { method: 'POST', path: '/api/v1/print/multicolor', desc: 'Prepara modelo para impresión multicolor', auth: true },
      { method: 'POST', path: '/api/v1/print/optimize', desc: 'Repara, orienta y añade soportes', auth: true },
      { method: 'POST', path: '/api/v1/print/slice', desc: 'Genera G-code para impresora específica', auth: true },
    ]
  },
  {
    category: 'Servicio de Impresión',
    items: [
      { method: 'POST', path: '/api/v1/print-service/quote', desc: 'Obtiene cotización de impresión', auth: true },
      { method: 'POST', path: '/api/v1/print-service/order', desc: 'Crea orden de impresión', auth: true },
      { method: 'GET', path: '/api/v1/print-service/orders', desc: 'Lista órdenes del usuario', auth: true },
      { method: 'GET', path: '/api/v1/print-service/orders/{id}/tracking', desc: 'Tracking de envío', auth: true },
    ]
  },
  {
    category: 'Gestión de Proyectos',
    items: [
      { method: 'GET', path: '/api/v1/projects', desc: 'Lista proyectos del usuario', auth: true },
      { method: 'POST', path: '/api/v1/projects', desc: 'Crea nuevo proyecto', auth: true },
      { method: 'GET', path: '/api/v1/projects/{id}', desc: 'Detalles del proyecto', auth: true },
      { method: 'PATCH', path: '/api/v1/projects/{id}', desc: 'Actualiza proyecto', auth: true },
      { method: 'DELETE', path: '/api/v1/projects/{id}', desc: 'Elimina proyecto', auth: true },
    ]
  },
];

const codeExamples = {
  javascript: `const response = await fetch('https://api.voxel3d.com/api/v1/3d/text-to-3d', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'A cyberpunk robot with silver armor, glowing blue eyes, anime style, 3D printable',
    resolution: '2048',
    style: 'photorealistic',
    optimize_for_print: true
  })
});

const data = await response.json();
console.log('Model ID:', data.model_id);
console.log('Status:', data.status);`,
  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
}

payload = {
    'prompt': 'A cyberpunk robot with silver armor, glowing blue eyes, anime style, 3D printable',
    'resolution': '2048',
    'style': 'photorealistic',
    'optimize_for_print': True
}

response = requests.post(
    'https://api.voxel3d.com/api/v1/3d/text-to-3d',
    headers=headers,
    json=payload
)

data = response.json()
print(f"Model ID: {data['model_id']}")
print(f"Status: {data['status']}")`,
  curl: `curl -X POST https://api.voxel3d.com/api/v1/3d/text-to-3d \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A cyberpunk robot with silver armor, glowing blue eyes, anime style, 3D printable",
    "resolution": "2048",
    "style": "photorealistic",
    "optimize_for_print": true
  }'`,
};

export default function APIDocsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTab, setActiveTab] = useState<'javascript' | 'python' | 'curl'>('javascript');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="section bg-muted/30 relative" aria-labelledby="api-heading">
          <div className="container-voxel relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="badge-primary mb-4 inline-block">Documentación para Desarrolladores</span>
              <h1 id="api-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
                API <span className="gradient-text">Referencia Completa</span>
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Integra Voxel3D en tus aplicaciones. RESTful, WebSockets, SDKs oficiales y más.
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-6">
                <aside className="lg:col-span-1">
                  <Card variant="glass" padding="lg" className="sticky top-24 h-fit">
                    <CardHeader className="mb-4">
                      <CardTitle className="text-heading-sm">Autenticación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-xl bg-muted/50 font-mono text-sm">
                        <span className="text-green-500">Authorization:</span> Bearer <span className="text-primary">sk_live_...</span>
                      </div>
                      <Button variant="outline" className="w-full" iconLeft={<Key className="w-4 h-4" />}>
                        Obtener API Key
                      </Button>
                      <div className="pt-4 border-t border-border/50 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-4 h-4" />
                          <span>Rate limit: 100 req/min</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Zap className="w-4 h-4" />
                          <span>Latencia media: 45ms</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="w-4 h-4" />
                          <span>Uptime: 99.99%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="glass" padding="lg" className="sticky top-24 h-fit mt-6">
                    <CardHeader className="mb-4">
                      <CardTitle className="text-heading-sm">SDKs Oficiales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                        <FileCode className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">JavaScript / TypeScript</p>
                          <p className="text-xs text-muted-foreground">npm i @voxel3d/sdk</p>
                        </div>
                      </a>
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                        <Terminal className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">Python</p>
                          <p className="text-xs text-muted-foreground">pip install voxel3d</p>
                        </div>
                      </a>
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                        <Server className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">Go</p>
                          <p className="text-xs text-muted-foreground">go get github.com/voxel3d/go-sdk</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </aside>

                <div className="lg:col-span-3 space-y-6">
                  <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Categorías de API">
                    {endpoints.map((cat, i) => (
                      <button
                        key={cat.category}
                        onClick={() => setActiveCategory(i)}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                          activeCategory === i
                            ? 'bg-primary text-primary-foreground shadow-voxel-sm'
                            : 'bg-muted hover:bg-muted/80'
                        )}
                        role="tab"
                        aria-selected={activeCategory === i}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>

                  <Card variant="glass" padding="none" className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full" role="table">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Método</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descripción</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auth</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Probar</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {endpoints[activeCategory].items.map((endpoint, i) => (
                            <tr key={endpoint.path} className="hover:bg-muted/50 transition-colors">
                              <td className="px-6 py-4">
                                <span className={cn(
                                  'px-2.5 py-1 rounded-lg text-xs font-mono font-semibold',
                                  endpoint.method === 'GET' && 'bg-green-500/10 text-green-500',
                                  endpoint.method === 'POST' && 'bg-blue-500/10 text-blue-500',
                                  endpoint.method === 'PATCH' && 'bg-amber-500/10 text-amber-500',
                                  endpoint.method === 'DELETE' && 'bg-red-500/10 text-red-500',
                                )}>
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-sm text-foreground">{endpoint.path}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{endpoint.desc}</td>
                              <td className="px-6 py-4">
                                {endpoint.auth ? (
                                  <span className="flex items-center gap-1 text-xs text-green-500">
                                    <Shield className="w-3 h-3" />
                                    Requerida
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" iconLeft={<ExternalLink className="w-3 h-3" />}>
                                  Probar
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  <Card variant="glass" padding="lg">
                    <div className="flex items-center justify-between mb-6">
                      <CardTitle className="text-heading-md">Ejemplo: Texto a 3D</CardTitle>
                      <div className="flex items-center gap-2" role="tablist" aria-label="Lenguaje de ejemplo">
                        {(['javascript', 'python', 'curl'] as const).map(lang => (
                          <button
                            key={lang}
                            onClick={() => setActiveTab(lang)}
                            className={cn(
                              'px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all',
                              activeTab === lang
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            )}
                            role="tab"
                            aria-selected={activeTab === lang}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2 px-4 py-2 bg-muted/50 rounded-t-xl">
                        <span className="text-xs text-muted-foreground">text-to-3d.example.{activeTab}</span>
                        <Button variant="ghost" size="sm" iconLeft={<Copy className="w-3 h-3" />} onClick={() => navigator.clipboard.writeText(codeExamples[activeTab])}>
                          Copiar
                        </Button>
                      </div>
                      <pre className={cn(
                        'p-4 rounded-b-xl overflow-x-auto font-mono text-sm leading-relaxed',
                        darkMode ? 'bg-voxel-950 text-voxel-100' : 'bg-voxel-100 text-voxel-900'
                      )}>
                        <code>{codeExamples[activeTab]}</code>
                      </pre>
                    </div>
                  </Card>

                  <Card variant="glass" padding="lg">
                    <CardTitle className="text-heading-md mb-6">Respuesta de Ejemplo</CardTitle>
                    <pre className={cn(
                      'p-4 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed',
                      darkMode ? 'bg-voxel-950 text-voxel-100' : 'bg-voxel-100 text-voxel-900'
                    )}>
                      <code>{JSON.stringify({
                        model_id: "mdl_abc123def456",
                        status: "processing",
                        estimated_time: 35,
                        progress_url: "https://api.voxel3d.com/api/v1/3d/models/mdl_abc123def456",
                        download_url: "https://api.voxel3d.com/api/v1/3d/models/mdl_abc123def456/download",
                        metadata: {
                          vertices: 245832,
                          faces: 489124,
                          textures: ["albedo", "roughness", "normal", "metalness", "ao"],
                          formats: ["stl", "obj", "3mf", "glb", "usdz"]
                        }
                      }, null, 2)}</code>
                    </pre>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { useState } from 'react';