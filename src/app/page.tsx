import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Showcase } from '@/components/sections/Showcase';
import { Workflow } from '@/components/sections/Showcase';
import { Pricing, Testimonials } from '@/components/sections/Pricing';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" id="main-content">
        <Hero />
        <Features />
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