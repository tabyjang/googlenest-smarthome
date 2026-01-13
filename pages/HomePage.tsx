import React, { useState, useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import InteractiveDemo from '../components/demo/InteractiveDemo';
import Estimator from '../components/estimator/Estimator';
import VoiceExperience from '../components/VoiceExperience';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <HeroSection scrollY={scrollY} />
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-32 px-6 bg-gray-50">
        <InteractiveDemo />
      </section>

      {/* Estimator Section */}
      <section id="estimator" className="py-32 px-6">
        <Estimator />
      </section>

      {/* Voice Experience Section */}
      <section id="voice" className="py-32 px-6 bg-gray-900 overflow-hidden">
        <VoiceExperience />
      </section>
    </>
  );
};

export default HomePage;
