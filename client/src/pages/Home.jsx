import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VideoSection from '../components/VideoSection';
import PackagesSection from '../components/PackagesSection';
import LeadForm from '../components/LeadForm';
import HighlightsSection from '../components/HighlightsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogPreviewList from '../components/BlogPreviewList';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import StatsBand from '../components/StatsBand';
import FeatureStrip from '../components/FeatureStrip';
import AboutAcademy from '../components/AboutAcademy';

const Home = () => {
  const packagesRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();
  const [heroGallery, setHeroGallery] = useState([]);

  const scrollToSection = (target) => {
    const sectionMap = {
      packages: packagesRef,
      contact: contactRef,
      home: { current: document.body }
    };

    const sectionRef = sectionMap[target];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  return (
    <>
      <Navbar onNavigate={scrollToSection} />
      <main className="page-shell">
        <HeroSection onEnquireClick={() => scrollToSection('contact')} onGalleryReady={setHeroGallery} />
        <AnimatedSection>
          <StatsBand />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureStrip />
        </AnimatedSection>
        <AnimatedSection>
          <AboutAcademy heroGallery={heroGallery} />
        </AnimatedSection>
        <AnimatedSection>
          <VideoSection />
        </AnimatedSection>
        <AnimatedSection ref={packagesRef}>
          <PackagesSection onEnrollClick={() => scrollToSection('contact')} />
        </AnimatedSection>
        <AnimatedSection ref={contactRef}>
          <LeadForm />
        </AnimatedSection>
        <AnimatedSection>
          <HighlightsSection />
        </AnimatedSection>
        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>
        <AnimatedSection>
          <BlogPreviewList />
        </AnimatedSection>
        <AnimatedSection>
          <CTASection onCta={() => scrollToSection('contact')} />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
};

export default Home;
