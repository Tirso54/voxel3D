'use client';

import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Pricing, Testimonials } from '@/components/sections/Pricing';
import { CTA } from '@/components/sections/CTA';

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="section bg-muted/30 relative" aria-labelledby="pricing-hero-heading">
          <div className="container-voxel relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="badge-primary mb-4 inline-block">Precios Simples y Transparentes</span>
              <h1 id="pricing-hero-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
                Elige el Plan que <span className="gradient-text">Se Adapte a Ti</span>
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Sin sorpresas. Cambia de plan cuando quieras. Prueba Pro gratis 14 días.
              </p>
            </motion.div>
          </div>
        </section>

        <Pricing />
        <Testimonials />

        <section className="section bg-background relative" aria-labelledby="faq-heading">
          <div className="container-voxel relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 id="faq-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
                Preguntas <span className="gradient-text">Frecuentes</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

const faqs = [
  {
    q: '¿Qué incluye el plan Gratis?',
    a: 'El plan Gratis incluye 10 generaciones al mes, acceso a Texto a 3D v3.0, Imagen a 3D, Texturas PBR 4K, División básica, Multicolor (2 colores), exportación STL/OBJ y acceso a la comunidad y plantillas.'
  },
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí, puedes actualizar, degradar o cancelar tu plan en cualquier momento. Los cambios de plan surten efecto inmediatamente y se prorratean.'
  },
  {
    q: '¿Necesito tarjeta de crédito para la prueba gratis?',
    a: 'No, la prueba gratis de 14 días del plan Pro no requiere tarjeta de crédito. Solo necesitas crear una cuenta.'
  },
  {
    q: '¿Qué formatos de archivo se admiten?',
    a: 'Admitimos STL, OBJ, 3MF, GLB, USDZ, PLY, FBX, DAE y exportación directa a Bambu Studio, OrcaSlicer, PrusaSlicer, Cura y SuperSlicer.'
  },
  {
    q: '¿Puedo usar los modelos comercialmente?',
    a: 'Sí, todos los modelos generados son tuyos para uso comercial. Consulta nuestros Términos de Servicio para detalles completos.'
  },
  {
    q: '¿Cómo funciona el servicio de impresión?',
    a: 'Subes tu modelo, eliges material (PLA, PETG, ABS, TPU, Resina, Metal, Cerámica), tamaño y acabado. Nosotros imprimimos, post-procesamos y enviamos con tracking en 3-7 días.'
  },
  {
    q: '¿Hay API disponible?',
    a: 'Sí, el plan Pro incluye 10k requests/mes y el plan Equipo 100k requests/mes. Documentación completa en /api-docs.'
  },
  {
    q: '¿Qué soporte se ofrece?',
    a: 'Gratis: comunidad y docs. Pro: soporte prioritario por email/chat (respuesta <24h). Equipo: soporte dedicado, SLA 99.9%, gestor de cuenta.'
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="text-left"
    >
      <details className="group card p-4">
        <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
          <span className="font-medium text-foreground">{faq.q}</span>
          <ChevronDownIcon className={cn('w-5 h-5 text-muted-foreground transition-transform', open && 'rotate-180')} />
        </summary>
        <div className="mt-4 pt-4 border-t border-border/50 text-muted-foreground leading-relaxed">
          {faq.a}
        </div>
      </details>
    </motion.div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';