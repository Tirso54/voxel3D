import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Showcase } from '@/components/sections/Showcase';
import { Workflow } from '@/components/sections/Showcase';
import { Pricing, Testimonials } from '@/components/sections/Pricing';
import { CTA } from '@/components/sections/CTA';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://voxel3d-tirso1.vercel.app';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Voxel3D',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  description: 'Transforma texto e imágenes en modelos 3D listos para producción con IA avanzada.',
  url: baseUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '12400',
  },
};

const stats = [
  { label: 'Modelos generados', value: '2.4M+' },
  { label: 'Usuarios activos', value: '180K+' },
  { label: 'Formatos exportados', value: '15+' },
  { label: 'Satisfacción', value: '98%' },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen" id="main-content">
        <Hero />
        <Features />
        <section className="py-20 border-y border-border/50 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Workflow />
        <Showcase />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}