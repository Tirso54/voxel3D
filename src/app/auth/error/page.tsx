'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'Error de configuración del servidor.',
    AccessDenied: 'Acceso denegado.',
    Verification: 'El enlace de verificación ha expirado o ya fue usado.',
    Default: 'Ha ocurrido un error al iniciar sesión.',
  };

  const message = errorMessages[error || ''] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">Error de autenticación</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
