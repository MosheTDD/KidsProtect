import { FeatureSection } from '@/components/feature-section';

import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { NavigationHeader } from './components/navigation-header';
import { BottomSection } from './components/bottom-section';

function App() {
  return (
    <div className='min-h-screen bg-[#f7fbff] text-[#0f1f43]'>
      <div className='bg-linear-to-b from-[#eef4ff] via-[#f6f9ff] to-[#f7fbff]'>
        <NavigationHeader />
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
      </div>
      <BottomSection />
    </div>
  );
}

export default App;
