'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Check, X, Sparkles, Box, Image, Palette, Scissors, Printer, Truck, Zap, Crown, Infinity, Lock, Unlock, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Gratis',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfecto para empezar y explorar',
    features: [
      { name: '10 generaciones/mes', included: true },
      { name: 'Texto a 3D (v3.0)', included: true },
      { name: 'Imagen a 3D', included: true },
      { name: 'Texturas PBR 4K', included: true },
      { name: 'División básica', included: true },
      { name: 'Multicolor (2 colores)', included: true },
      { name: 'Exportación STL/OBJ', included: true },
      { name: 'Comunidad y plantillas', included: true },
      { name: 'Texturas 8K PBR', included: false },
      { name: 'División avanzada + conectores', included: false },
      { name: 'Multicolor ilimitado', included: false },
      { name: 'Servicio de impresión', included: false },
      { name: 'API Access', included: false },
      { name: 'Soporte prioritario', included: false },
    ],
    cta: 'Empezar Gratis',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 24 },
    description: 'Para creadores serios y profesionales',
    features: [
      { name: 'Generaciones ilimitadas', included: true },
      { name: 'Texto a 3D (v3.0) prioritario', included: true },
      { name: 'Imagen a 3D ultra-rápido', included: true },
      { name: 'Texturas 8K PBR completas', included: true },
      { name: 'División avanzada + conectores', included: true },
      { name: 'Multicolor ilimitado + AMS/MMU', included: true },
      { name: 'Exportación todos formatos', included: true },
      { name: 'Comunidad + plantillas premium', included: true },
      { name: 'Proyectos privados ilimitados', included: true },
      { name: 'Historial 90 días', included: true },
      { name: 'Cola prioritaria', included: true },
      { name: 'Servicio impresión (descuento 20%)', included: true },
      { name: 'API Access (10k req/mes)', included: true },
      { name: 'Soporte prioritario', included: true },
    ],
    cta: 'Comenzar Pro',
    variant: 'primary' as const,
    popular: true,
    badge: 'Más Popular',
  },
  {
    name: 'Equipo',
    price: { monthly: 79, yearly: 65 },
    description: 'Para estudios y equipos colaborativos',
    features: [
      { name: 'Todo en Pro', included: true },
      { name: '5 asientos incluidos', included: true },
      { name: 'Espacio de trabajo compartido', included: true },
      { name: 'Colaboración en tiempo real', included: true },
      { name: 'Control de versiones', included: true },
      { name: 'Biblioteca de assets del equipo', included: true },
      { name: 'Facturación centralizada', included: true },
      { name: 'SSO/SAML', included: true },
      { name: 'API Access (100k req/mes)', included: true },
      { name: 'Soporte dedicado', included: true },
      { name: 'SLA 99.9%', included: true },
      { name: 'Servicio impresión (descuento 40%)', included: true },
      { name: 'Onboarding personalizado', included: true },
      { name: 'Gestor de cuenta dedicado', included: true },
    ],
    cta: 'Contactar Ventas',
    variant: 'outline' as const,
    popular: false,
  },
];

const billingIntervals = ['monthly', 'yearly'] as const;

export function Pricing() {
  return (
    <section className="section bg-muted/30 relative" aria-labelledby="pricing-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-accent/3" />
      
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="badge-primary mb-4 inline-block">Precios Transparentes</span>
          <h2 id="pricing-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
            Elige tu <span className="gradient-text">Plan Perfecto</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Sin sorpresas. Cambia de plan cuando quieras. Todo incluye prueba gratis de 14 días en Pro.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 p-1 rounded-xl bg-muted border border-border">
            {billingIntervals.map((interval) => (
              <button
                key={interval}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  interval === 'yearly'
                    ? 'bg-primary text-primary-foreground shadow-voxel-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {interval === 'monthly' ? 'Mensual' : 'Anual'}
                {interval === 'yearly' && <span className="ml-2 badge badge-success text-xs">Ahorra 20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center text-body-sm text-muted-foreground"
        >
          <p>Todos los planes incluyen prueba gratuita de 14 días. Cancela en cualquier momento. Sin compromiso.</p>
          <p className="mt-2"><a href="/faq" className="text-primary hover:underline">Ver FAQ completas →</a></p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const isYearly = true; // Default to yearly for display

  return (
    <Card
      variant={plan.popular ? 'gradient' : 'hover'}
      padding="lg"
      className={cn('relative flex flex-col h-full', plan.popular && 'ring-2 ring-primary/50')}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge bg-primary text-primary-foreground">{plan.badge}</span>
        </div>
      )}

      <CardHeader className="text-center mb-6">
        <div className="flex items-center justify-center gap-1 mb-3">
          <span className="text-4xl font-display font-bold text-foreground">
            ${isYearly ? plan.price.yearly : plan.price.monthly}
          </span>
          <span className="text-body-md text-muted-foreground self-end mb-1">/mes</span>
        </div>
        {isYearly && (
          <span className="badge badge-success text-xs">Facturado ${plan.price.yearly * 12}/año</span>
        )}
        <CardTitle className="text-heading-lg">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 mb-6">
        <ul className="space-y-3" role="list">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              {feature.included ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span className={cn('text-body-sm', feature.included ? 'text-foreground' : 'text-muted-foreground/70 line-through')}>
                {feature.name}
              </span>
            </motion.li>
          ))}
        </ul>
      </CardContent>

      <div className="pt-4 border-t border-border/50">
        <Button
          variant={plan.variant}
          className="w-full"
          size="lg"
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

const testimonials = [
  {
    quote: "Voxel3D cambió completamente mi flujo de trabajo. De concepto a modelo imprimible en minutos, no horas. La calidad 2048³ es increíble.",
    author: "Sarah Chen",
    role: "Diseñadora Industrial",
    company: "Formlabs",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
  },
  {
    quote: "La división automática con conectores me ahorra horas de CAD manual. Ahora imprimo modelos complejos en mi Bambu Lab sin dolor de cabeza.",
    author: "Marcus Johnson",
    role: "Maker & YouTuber",
      company: "PrintItRight",
      avatar: "/avatars/marcus.jpg",
      rating: 5,
    },
    {
      quote: "Usamos la API para generar miles de assets 3D para nuestro juego. La consistencia y calidad superan a cualquier otra solución del mercado.",
      author: "Elena Rodriguez",
      role: "CTO",
      company: "IndieGame Studio",
      avatar: "/avatars/elena.jpg",
      rating: 5,
    },
    {
      quote: "El servicio de impresión es un game changer. Subo el modelo, elijo material y llega a mi puerta en 3 días. Calidad profesional garantizada.",
      author: "David Park",
      role: "Arquitecto",
      company: "Park & Associates",
      avatar: "/avatars/david.jpg",
      rating: 5,
    },
  ];

export function Testimonials() {
  return (
    <section className="section bg-background relative" aria-labelledby="testimonials-heading">
      <div className="container-voxel relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge-primary mb-4 inline-block">Amado por Creadores</span>
          <h2 id="testimonials-heading" className="text-display-lg font-display font-bold text-foreground mb-4">
            Confiado por <span className="gradient-text">100,000+ Creadores</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-8 opacity-60">
            <img src="/logos/bambu.svg" alt="Bambu Lab" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="/logos/xtool.svg" alt="XTool" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="/logos/netease.svg" alt="NetEase" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="/logos/reuters.svg" alt="Reuters" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="/logos/wsj.svg" alt="WSJ" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
          <Button variant="outline" size="lg">
            Ver Más Casos de Éxito →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card variant="hover" padding="lg" className="h-full">
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
        ))}
      </div>
      <p className="text-body-md text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium">
          {testimonial.author.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium text-foreground">{testimonial.author}</div>
          <div className="text-body-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </Card>
  );
}

function Star({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}