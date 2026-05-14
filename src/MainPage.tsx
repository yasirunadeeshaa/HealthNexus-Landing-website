import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Section Components
import NavigationBar from './pages/sections/NavBar';
import HeroSection from './pages/sections/HeroSection';
import DetailedFeatures from './pages/sections/DetailedFeatures';
import AIModel from './pages/sections/AiModel';
import VendorBenefits from './pages/sections/VendorBenefits';
import Benefits from './pages/sections/Benefits';
import UserJourney from './pages/sections/UserJourney';
import LiveDemo from './pages/sections/LiveDemo';
import HomeVisit from './pages/sections/DoorStep';
import PricingCalculator from './pages/sections/PricingCalculator';
import Comparison from './pages/sections/Comparison';
import Roadmap from './pages/sections/Roadmap';
import HealthTools from './pages/sections/HealthTools';
import Footer from './pages/sections/Footer';

interface VisibleSections {
  [key: string]: boolean;
}

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState<VisibleSections>({});
  const [activeJourney, setActiveJourney] = useState('patient');
  const [activeFeatureCategory, setActiveFeatureCategory] = useState('appointment');
  const [activeDemo, setActiveDemo] = useState('video');
  const [calculatorInputs, setCalculatorInputs] = useState({
    doctorVisits: 6,
    visitCost: 200,
    emergencyVisits: 1,
    familyMembers: 4,
  });

  const statsRef = useRef<HTMLElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0, doctors: 0, appointments: 0, rating: 0,
  });

  const calculateSavings = () => {
    const traditionalCost =
      (calculatorInputs.doctorVisits * calculatorInputs.visitCost * calculatorInputs.familyMembers) +
      (calculatorInputs.emergencyVisits * 500 * calculatorInputs.familyMembers);
    const mediflowCost =
      (calculatorInputs.doctorVisits * 60 * calculatorInputs.familyMembers) +
      (calculatorInputs.emergencyVisits * 100 * calculatorInputs.familyMembers);
    return {
      traditional: traditionalCost,
      mediflow: mediflowCost,
      savings: traditionalCost - mediflowCost,
    };
  };

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedStats({
        users: Math.floor(500000 * progress),
        doctors: Math.floor(10000 * progress),
        appointments: Math.floor(2000000 * progress),
        rating: Number((4.8 * progress).toFixed(1)),
      });
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
  };

  // Scroll-based visibility for animated sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && section.id) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && animatedStats.users === 0) {
          animateStats();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedStats.users]);

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      <NavigationBar />
      <HeroSection />
      <AIModel />
      <DetailedFeatures
        activeFeatureCategory={activeFeatureCategory}
        setActiveFeatureCategory={setActiveFeatureCategory}
        isVisible={isVisible}
      />
      <VendorBenefits />
      <Benefits isVisible={isVisible} />
      <HomeVisit />
      <UserJourney
        activeJourney={activeJourney}
        setActiveJourney={setActiveJourney}
        isVisible={isVisible}
      />
      <LiveDemo
        activeDemo={activeDemo}
        setActiveDemo={setActiveDemo}
      />
      <PricingCalculator
        calculatorInputs={calculatorInputs}
        setCalculatorInputs={setCalculatorInputs}
        calculateSavings={calculateSavings}
      />
      <Comparison calculatorInputs={calculatorInputs} />
      <Roadmap />
      <HealthTools />
      <Footer />
    </div>
  );
};

export default LandingPage;