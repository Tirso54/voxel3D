'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  Box, Heart, Share2, Download, Eye, Tag, Filter, ChevronDown,
  Search, Grid, List, Loader2, Sparkles, Star
} from 'lucide-react';

const categories = ['Todos', 'Personajes', 'Arquitectura', 'Vehículos', 'Arte', 'Funcionales', 'Joyería', 'Miniaturas'];
const tags = ['Fantasy', 'Sci-Fi', 'Low-poly', 'Realista', 'Estilizado', 'Articulado', 'Multicolor', 'PBR', 'Imprimible', 'Gratis'];

const showcaseItems = Array.from({ length: 24 }, (_, i) => ({
  id: `${i + 1}`,
  title: [
    'Guerrero Orco Fantasy', 'Dragón Articulado', 'Castillo Cuento Hadas', 'Robot Cyberpunk',
    'Qilin Escultura', 'Rover Ártico', 'Personaje Anime', 'Coche Clásico',
    'Espada Élfica', 'Dron Cuadricóptero', 'Mandala Geométrico', 'Figura Anime',
    'Armadura Medieval', 'Nave Espacial', 'Fuente Ornamental', 'Robot Asistente',
    'Criatura Marina', 'Torre Reloj', 'Exoesqueleto', 'Jarrón Cerámica',
    'Mecha Gigante', 'Puente Colgante', 'Estatuilla Buda', 'Cuchillo Táctico'
  ][i],
  category: ['Personajes', 'Articulados', 'Arquitectura', 'Sci-Fi', 'Arte', 'Vehículos', 'Personajes', 'Vehículos', 'Arte', 'Vehículos', 'Arte', 'Personajes', 'Personajes', 'Vehículos', 'Arquitectura', 'Sci-Fi', 'Arte', 'Arquitectura', 'Sci-Fi', 'Arte', 'Sci-Fi', 'Arquitectura', 'Arte', 'Funcionales'][i],
  tags: tags.slice(i % 5, (i % 5) + 3),
  author: ['Marco3D', 'PrintMaster', 'DreamBuilder', 'NeonPrint', 'SculptorAI', 'Engineer3D', 'AnimeFan', 'ClassicCar', 'FantasyForge', 'DronePro', 'GeoArtist', 'OtakuMaker', 'HistoryBuff', 'SpaceCadet', 'ArchitectAI', 'BotBuilder', 'OceanExplorer', 'TimeKeeper', 'CyberPunk', 'PotteryPro', 'MechaFan', 'BridgeBuilder', 'ZenMaster', 'TacticalGear'][i],
  likes: Math.floor(Math.random() * 1000) + 50,
  views: (Math.random() * 20 + 1).toFixed(1),
  downloads: Math.floor(Math.random() * 500) + 10,
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  featured: i < 3,
}));

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  const filteredItems = showcaseItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(t => item.tags.includes(t));
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTags && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.likes - a.likes;
      case 'recent': return 0;
      case 'downloads': return b.downloads - a.downloads;
      case 'rating': return parseFloat(b.rating) - parseFloat(a.rating);
      default: return 0;
    }
  });

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="section bg-muted/30 relative" aria-labelledby="showcase-heading">
          <div className="container-voxel relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="badge-primary mb-4 inline-block">Explora la Comunidad</span>
              <h1 id="showcase-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
                Galería de <span className="gradient-text">Creaciones 3D</span>
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Descubre miles de modelos creados por la comunidad. Todos listos para descargar, remixar e imprimir.
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Buscar modelos, creadores, etiquetas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-12 pr-4"
                    aria-label="Buscar modelos"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input py-2.5 min-w-[160px]"
                    aria-label="Filtrar por categoría"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input py-2.5 min-w-[160px]"
                    aria-label="Ordenar por"
                  >
                    <option value="popular">Más Populares</option>
                    <option value="recent">Más Recientes</option>
                    <option value="downloads">Más Descargados</option>
                    <option value="rating">Mejor Valorados</option>
                  </select>
                  <div className="flex items-center gap-1 bg-muted rounded-xl p-1" role="group" aria-label="Modo de vista">
                    <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-background shadow-voxel-sm' : '')} aria-label="Vista cuadrícula"><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-background shadow-voxel-sm' : '')} aria-label="Vista lista"><List className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>

              {selectedTags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {selectedTags.map(tag => (
                    <span key={tag} className="badge bg-primary text-primary-foreground flex items-center gap-1">
                      {tag}
                      <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))} className="ml-1" aria-label={`Quitar ${tag}`}>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </motion.div>
              )}

              <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Etiquetas populares">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                    className={cn(
                      'badge px-3 py-1.5 transition-all',
                      selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  'gap-6',
                  viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'
                )}
              >
                {sortedItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <ShowcaseCard item={item} viewMode={viewMode} />
                  </motion.article>
                ))}
              </motion.div>

              {sortedItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Box className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-heading-md font-semibold mb-2">No se encontraron modelos</h3>
                  <p className="text-muted-foreground">Intenta ajustar tus filtros o búsqueda</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <Button variant="outline" size="lg" iconLeft={<Loader2 className="w-5 h-5" />} disabled={loading}>
                  {loading ? 'Cargando más...' : `Cargar más (${sortedItems.length} de ${showcaseItems.length})`}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ShowcaseCard({ item, viewMode }: { item: typeof showcaseItems[0]; viewMode: 'grid' | 'list' }) {
  return (
    <Card variant="hover" padding="none" className={cn('overflow-hidden flex flex-col h-full', viewMode === 'list' && 'flex-row max-h-48')}>
      <div className={cn('relative overflow-hidden', viewMode === 'grid' ? 'aspect-[4/3]' : 'w-64 flex-shrink-0')}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-grid opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ModelThumbnail />
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className="badge bg-primary/90 text-primary-foreground">{item.category}</span>
          <div className="flex gap-1 justify-end">
            <button className="p-2 rounded-xl bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-voxel-900 transition-colors" aria-label="Me gusta">
              <Heart className="w-4 h-4 text-rose-500" />
            </button>
            <button className="p-2 rounded-xl bg-white/90 dark:bg-voxel-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-voxel-900 transition-colors" aria-label="Compartir">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge bg-white/80 dark:bg-voxel-800/80 backdrop-blur-sm text-xs">{tag}</span>
          ))}
        </div>
        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="badge bg-amber-500 text-amber-500-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Destacado
            </span>
          </div>
        )}
      </div>
      <CardContent className={cn('p-4 flex flex-col flex-1', viewMode === 'list' && 'justify-between')}>
        <div className={cn(viewMode === 'list' && 'flex-1')}>
          <h3 className="text-heading-sm font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-3 text-body-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 fill-current" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {item.views}k
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {item.downloads}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 4).map(tag => (
              <span key={tag} className="badge bg-muted text-muted-foreground text-xs">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-medium">
              {item.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-body-xs text-muted-foreground">{item.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-medium text-warning">
              <Star className="w-3 h-3 fill-current" />
              {item.rating}
            </span>
            <Button variant="ghost" size="sm" iconLeft={<Eye className="w-3 h-3" />} className="gap-1">Ver</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ModelThumbnail() {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 text-muted-foreground/30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="thumbGrad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      <path d="M20 100V28L60 8L100 28V100L60 80L20 100Z" stroke="url(#thumbGrad)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M60 8V80" stroke="url(#thumbGrad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 62L60 80L90 62" stroke="url(#thumbGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}