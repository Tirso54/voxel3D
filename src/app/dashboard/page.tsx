'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Box, Sparkles, CreditCard, Zap, Clock, ArrowRight, Crown } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Modelos creados', value: '47', icon: Box, change: '+12 este mes', color: 'from-blue-500 to-cyan-500' },
  { label: 'Créditos restantes', value: '3,240', icon: CreditCard, change: 'Plan Pro', color: 'from-primary to-accent' },
  { label: 'Horas ahorradas', value: '128', icon: Clock, change: '≈ 16 días de trabajo', color: 'from-purple-500 to-pink-500' },
];

const recentModels = [
  { id: '1', name: 'Litofanía - Montaña', mode: 'Litofanía', status: 'Completado', created: 'Hace 2h' },
  { id: '2', name: 'Llavero - Logo', mode: 'Llavero', status: 'Completado', created: 'Hace 5h' },
  { id: '3', name: 'Medallón - Retrato', mode: 'Medallón', status: 'Completado', created: 'Hace 1d' },
  { id: '4', name: 'Relieve - Mapa', mode: 'Relieve', status: 'Procesando', created: 'Hace 2d' },
];

const statusColors: Record<string, string> = {
  'Completado': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'Procesando': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Error': 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center pt-16">
          <div className="loading-shimmer w-64 h-8 rounded-xl" />
        </main>
      </>
    );
  }

  if (!session) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-voxel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-display-sm font-display font-bold text-foreground">
                  Hola, {session.user?.name || 'Creador'}
                </h1>
                <p className="text-body-md text-muted-foreground mt-1">
                  Aquí tienes un resumen de tu actividad reciente
                </p>
              </div>
              <Link href="/workspace">
                <Button iconLeft={<Zap className="w-4 h-4" />} iconRight={<ArrowRight className="w-4 h-4" />}>
                  Nuevo modelo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card variant="hover" padding="lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-body-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-display-sm font-bold text-foreground mt-1">{stat.value}</p>
                          <p className="text-xs text-primary mt-1">{stat.change}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Modelos recientes</CardTitle>
                      <Link href="/workspace" className="text-sm text-primary hover:underline">
                        Ver todos
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentModels.map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Box className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{model.name}</p>
                              <p className="text-xs text-muted-foreground">{model.mode} · {model.created}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[model.status]}`}>
                            {model.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card variant="gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Plan Pro</p>
                        <p className="text-xs text-muted-foreground">Activo</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Generaciones</span>
                        <span className="font-medium text-foreground">Ilimitadas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Alta calidad</span>
                        <span className="font-medium text-foreground">3,240 créditos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Soporte</span>
                        <span className="font-medium text-foreground">Prioritario</span>
                      </div>
                    </div>
                    <Link href="/pricing">
                      <Button variant="outline" fullWidth size="sm" className="mt-4">
                        Gestionar plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">Consejo rápido</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Para mejores resultados en litofanías, usa imágenes con alto contraste y fondo claro.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
