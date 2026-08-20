'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-background px-4 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative"
        >
          <Card variant="glass" padding="lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-display-sm">Crear cuenta</CardTitle>
              <CardDescription>Empieza a crear modelos 3D increíbles hoy mismo</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">¡Cuenta creada!</h3>
                  <p className="text-sm text-muted-foreground">
                    Revisa tu email para confirmar tu cuenta y empezar a crear.
                  </p>
                  <Link href="/auth/signin">
                    <Button size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
                      Ir a iniciar sesión
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nombre
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="password"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input pl-10"
                        minLength={8}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" fullWidth size="lg" loading={loading} iconRight={<ArrowRight className="w-4 h-4" />}>
                    Crear cuenta
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Al crear una cuenta, aceptas nuestros{' '}
                    <Link href="/terms" className="text-primary hover:underline">términos</Link>{' '}
                    y{' '}
                    <Link href="/privacy" className="text-primary hover:underline">política de privacidad</Link>.
                  </p>
                </form>
              )}

              {!submitted && (
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                    Inicia sesión
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </>
  );
}
