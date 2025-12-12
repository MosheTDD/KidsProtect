import { FeatureSection } from '@/components/feature-section';

import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className='min-h-screen bg-[#f7fbff] text-[#0f1f43]'>
      <div className='bg-linear-to-b from-[#eef4ff] via-[#f6f9ff] to-[#f7fbff]'>
        <Header />
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
