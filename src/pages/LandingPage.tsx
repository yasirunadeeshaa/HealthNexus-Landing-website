import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Link } from 'react-router-dom';
import mainImage from '../assets/doctor1.jpg';
import logo from '../assets/logo.png';
import { Calendar,Watch,Dna,Home,Settings,Sparkles,Timer, Rocket,Database,Cpu,AlertTriangle,Building2,Users2, Video,Wifi,ChevronLeft,Send, FileText, Shield, Heart, Activity, Phone, Check, Star, Globe, Smartphone, CreditCard, UserCheck, Brain, Clock, Users, Award, Zap,  Monitor, Pill, Stethoscope, MessageSquare, BarChart, AlertCircle, RefreshCw, Clipboard, UserPlus, Search, DollarSign, FileCheck, Bell, Camera, Mic, Share2, ChevronRight, TrendingUp, Package, HeartHandshake, Building,CheckCircle, XCircle } from 'lucide-react';
import './Main.css'
import './Journuy.css'; // Custom styles for the landing page
import './EmergencySection.css'; // Custom styles for the landing page
import './HeroSection.css'
import './LiveDemo.css'
import './Footer.css'; // Custom styles for the landing page
import './Tools.css'; // Custom styles for the animated background
import './Pricing.css';
import './comparison.css';
import './Benifits.css';
import './Features.css';
import './Navigation.css';
import './Roadmap.css'
interface VisibleSections {
  [key: string]: boolean;
}

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibleSections>({});
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeJourney, setActiveJourney] = useState('patient');
  const [activeFeatureCategory, setActiveFeatureCategory] = useState('appointment');
  const [activeDemo, setActiveDemo] = useState('video');
  const [calculatorInputs, setCalculatorInputs] = useState({
    doctorVisits: 6,
    visitCost: 200,
    emergencyVisits: 1,
    familyMembers: 4
  });
  const [bmiInputs, setBmiInputs] = useState({ height: '', weight: '' });
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string } | null>(null);
  const statsRef = useRef<HTMLElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
    rating: 0
  });

  const calculateBMI = () => {
    const height = parseFloat(bmiInputs.height) / 100; // Convert cm to m
    const weight = parseFloat(bmiInputs.weight);
    
    if (height && weight) {
      const bmi = weight / (height * height);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal Weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiResult({ value: parseFloat(bmi.toFixed(1)), category });
    }
  };

  const calculateSavings = () => {
    const traditionalCost = 
      (calculatorInputs.doctorVisits * calculatorInputs.visitCost * calculatorInputs.familyMembers) +
      (calculatorInputs.emergencyVisits * 500 * calculatorInputs.familyMembers);
    
    const mediflowCost = 
      (calculatorInputs.doctorVisits * 60 * calculatorInputs.familyMembers) +
      (calculatorInputs.emergencyVisits * 100 * calculatorInputs.familyMembers);
    
    const savings = traditionalCost - mediflowCost;
    
    return {
      traditional: traditionalCost,
      mediflow: mediflowCost,
      savings: savings
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check visibility of sections
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        if (isInView && section.id) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });

      // Animate stats when in view
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && animatedStats.users === 0) {
          animateStats();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animatedStats.users]);

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
        rating: Number((4.8 * progress).toFixed(1))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "HD Video Consultations",
      description: "Crystal clear video calls with screen sharing and real-time diagnostics",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment booking with automatic reminders and rescheduling",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "E-Prescriptions",
      description: "Digital prescriptions sent directly to your preferred pharmacy",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "End-to-end encryption and HIPAA compliant data protection",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Insurance Made Easy",
      description: "Instant verification and automated claim processing",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Health Assistant",
      description: "24/7 symptom checker and personalized health insights",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const detailedFeatures = {
    appointment: {
      title: "Smart Appointment Management",
      icon: <Calendar />,
      features: [
        {
          icon: <Search />,
          title: "Advanced Doctor Search",
          description: "Filter by 15+ criteria including specialization, language, insurance, and ratings"
        },
        {
          icon: <Clock />,
          title: "Real-time Availability",
          description: "Live slot updates with instant booking confirmation"
        },
        {
          icon: <RefreshCw />,
          title: "Smart Rescheduling",
          description: "AI suggests best alternative slots when rescheduling"
        },
        {
          icon: <Bell />,
          title: "Intelligent Reminders",
          description: "Multi-channel notifications via SMS, email, and push"
        },
        {
          icon: <AlertCircle />,
          title: "Emergency Appointments",
          description: "Priority booking for urgent care with nearest facility finder"
        },
        {
          icon: <Users />,
          title: "Group Sessions",
          description: "Educational workshops and therapy group sessions"
        }
      ]
    },
    consultation: {
      title: "Next-Gen Telemedicine",
      icon: <Video />,
      features: [
        {
          icon: <Camera />,
          title: "HD Video Quality",
          description: "Crystal clear video with automatic quality adjustment"
        },
        {
          icon: <Share2 />,
          title: "Screen Sharing",
          description: "Share medical reports and images during consultation"
        },
        {
          icon: <Mic />,
          title: "AI Transcription",
          description: "Automatic consultation notes with key highlights"
        },
        {
          icon: <FileText />,
          title: "Digital Whiteboard",
          description: "Interactive tools for doctors to explain conditions"
        },
        {
          icon: <Shield />,
          title: "Secure Recording",
          description: "Optional encrypted recording for future reference"
        },
        {
          icon: <MessageSquare />,
          title: "Real-time Chat",
          description: "In-call messaging with file sharing capabilities"
        }
      ]
    },
    health: {
      title: "Comprehensive Health Management",
      icon: <Heart />,
      features: [
        {
          icon: <Activity />,
          title: "Vital Tracking",
          description: "Monitor BP, glucose, weight with trend analysis"
        },
        {
          icon: <Pill />,
          title: "Medication Management",
          description: "Refill reminders, interaction checks, adherence tracking"
        },
        {
          icon: <FileCheck />,
          title: "Smart Health Records",
          description: "OCR-powered document scanning and categorization"
        },
        {
          icon: <BarChart />,
          title: "Health Analytics",
          description: "AI-driven insights and predictive health alerts"
        },
        {
          icon: <Brain />,
          title: "Symptom Checker",
          description: "AI-powered preliminary assessment with urgency indicators"
        },
        {
          icon: <Package />,
          title: "Lab Integration",
          description: "Home sample collection and result tracking"
        }
      ]
    },
    payment: {
      title: "Seamless Payment & Insurance",
      icon: <DollarSign />,
      features: [
        {
          icon: <CreditCard />,
          title: "Multiple Payment Options",
          description: "Cards, wallets, EMI, and insurance coverage"
        },
        {
          icon: <Shield />,
          title: "Insurance Verification",
          description: "Real-time eligibility check and claim estimation"
        },
        {
          icon: <FileCheck />,
          title: "Auto Claim Filing",
          description: "Paperless claim submission with tracking"
        },
        {
          icon: <DollarSign />,
          title: "Transparent Pricing",
          description: "Upfront cost breakdown with no hidden charges"
        },
        {
          icon: <RefreshCw />,
          title: "Easy Refunds",
          description: "Quick refund processing for cancellations"
        },
        {
          icon: <BarChart />,
          title: "Expense Tracking",
          description: "Healthcare spending analytics and tax reports"
        }
      ]
    }
  };

  const patientBenefits = [
    {
      icon: <Clock />,
      title: "Save Time",
      description: "No more waiting rooms - consult from anywhere"
    },
    {
      icon: <DollarSign />,
      title: "Cost Effective",
      description: "Lower consultation fees and zero travel costs"
    },
    {
      icon: <Globe />,
      title: "Global Access",
      description: "Connect with specialists worldwide"
    },
    {
      icon: <Shield />,
      title: "Privacy First",
      description: "Your health data is encrypted and secure"
    },
    {
      icon: <Heart />,
      title: "Continuous Care",
      description: "24/7 health monitoring and support"
    },
    {
      icon: <Users />,
      title: "Family Health",
      description: "Manage health for your entire family"
    }
  ];

  const doctorBenefits = [
    {
      icon: <TrendingUp />,
      title: "Grow Practice",
      description: "Reach more patients and increase revenue by 45%"
    },
    {
      icon: <Clock />,
      title: "Time Efficient",
      description: "Reduce admin work by 60% with automation"
    },
    {
      icon: <BarChart />,
      title: "Analytics Dashboard",
      description: "Track performance and patient satisfaction"
    },
    {
      icon: <Globe />,
      title: "Flexible Hours",
      description: "Work from anywhere at your convenience"
    },
    {
      icon: <FileText />,
      title: "Smart Tools",
      description: "AI-assisted diagnosis and prescription"
    },
    {
      icon: <Award />,
      title: "Professional Growth",
      description: "CME credits and learning opportunities"
    }
  ];

  const patientJourney = [
    {
      step: 1,
      title: "Sign Up in Seconds",
      description: "Quick registration with social login or mobile OTP",
      icon: <UserPlus />
    },
    {
      step: 2,
      title: "Find Your Doctor",
      description: "Search by symptoms, specialization, or get AI recommendations",
      icon: <Search />
    },
    {
      step: 3,
      title: "Book Instantly",
      description: "Choose convenient slot and consultation type",
      icon: <Calendar />
    },
    {
      step: 4,
      title: "Prepare for Visit",
      description: "Upload reports, fill questionnaires, test video",
      icon: <Clipboard />
    },
    {
      step: 5,
      title: "Consult Doctor",
      description: "Join video call or visit clinic with digital check-in",
      icon: <Video />
    },
    {
      step: 6,
      title: "Get Prescription",
      description: "Receive digital prescription and order medicines",
      icon: <FileText />
    },
    {
      step: 7,
      title: "Follow-up Care",
      description: "Track health, get reminders, book follow-ups",
      icon: <Heart />
    }
  ];

  const doctorJourney = [
    {
      step: 1,
      title: "Professional Onboarding",
      description: "Quick verification with medical license and credentials",
      icon: <UserCheck />
    },
    {
      step: 2,
      title: "Set Your Schedule",
      description: "Flexible availability with smart slot management",
      icon: <Clock />
    },
    {
      step: 3,
      title: "Receive Appointments",
      description: "Get notified of bookings with patient history",
      icon: <Bell />
    },
    {
      step: 4,
      title: "Conduct Consultations",
      description: "Use advanced tools for diagnosis and treatment",
      icon: <Stethoscope />
    },
    {
      step: 5,
      title: "Prescribe Digitally",
      description: "E-prescriptions with drug interaction checks",
      icon: <FileText />
    },
    {
      step: 6,
      title: "Track Outcomes",
      description: "Monitor patient progress and satisfaction",
      icon: <BarChart />
    },
    {
      step: 7,
      title: "Grow Practice",
      description: "Analytics, reviews, and referral network",
      icon: <TrendingUp />
    }
  ];

  const services = [
    { icon: <Monitor />, title: "Telemedicine", desc: "Video consultations" },
    { icon: <Pill />, title: "Pharmacy", desc: "Medicine delivery" },
    { icon: <Activity />, title: "Lab Tests", desc: "Home collection" },
    { icon: <Brain />, title: "Mental Health", desc: "Therapy sessions" }
  ];

  
  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="position-fixed w-100 h-100" style={{ zIndex: -1 }}>
        <div className="floating-gradient gradient-1"></div>
        <div className="floating-gradient gradient-2"></div>
        <div className="floating-gradient gradient-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="brand-icon-wrapper">
               <img src={logo} alt="HealthNexus Logo" className="brand-icon"  />
            </div>
            <span className="brand-text ms-2">HealthNexus</span>
          </a>
          
          <button 
            className="navbar-toggler custom-toggler border-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="hamburger-lines">
              <span className={`line line1 ${isMenuOpen ? 'rotate-45' : ''}`}></span>
              <span className={`line line2 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`line line3 ${isMenuOpen ? 'rotate--45' : ''}`}></span>
            </div>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#detailed-features">Capabilities</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#benefits">Benefits</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#user-journey">How it Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#comparison">Comparison</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#future-roadmap">RoadMap</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#health-tools">Tools</a>
              </li>
              
              {/* <li className="nav-item">
                <Link className="nav-link nav-link-animated px-3" to="/api-docs">
                  API Docs
                </Link>
              </li> */}
              
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section position-relative">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
        {/* Particle Effect */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}></div>
          ))}
        </div>
      </div>
        
        <div className="container-fluid px-4">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6 hero-content">
              {/* Enhanced Badge */}
              <div className="badge-wrapper mb-4">
                <span className="badge-gradient animated-badge">
                  <Zap size={16} className="me-1 pulse-icon" />
                  #1 Healthcare Platform 2024
                </span>
                {/* <span className="trust-badge ms-3">
                  <Shield size={16} className="me-1" />
                  HIPAA Certified
                </span> */}
              </div>
              
              {/* Animated Title */}
              <h1 className="hero-titlee mb-4">
                Making Health
                <span className="gradient-textt d-block typing-text">
                  Care Better Together
                </span>
              </h1>
              
              <p className="hero-description mb-4">
                Experience healthcare like never before. Connect instantly with world-class doctors, 
                manage your health digitally, and access cutting-edge medical care from anywhere.
              </p>

              {/* Quick Stats */}
              <div className="services-quick py-5">
                {/* <div className="stat-pill">
                  <span className="stat-number">2M+</span>
                  <span className="stat-label">Happy Patients</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Expert Doctors</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-label">User Rating</span>
                </div> */}
                <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-pill">
                <div className="service-icon">{service.icon}</div>
                <div>
                  <h6 className="mb-0">{service.title}</h6>
                  <small className="text-muted">{service.desc}</small>
                </div>
              </div>
            ))}
          </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="trust-section">
                <p className="trust-text mb-3">Trusted by leading healthcare providers</p>
                <div className="partner-logos">
                  <div className="logo-item">Mayo Clinic</div>
                  <div className="logo-item">Johns Hopkins</div>
                  <div className="logo-item">Cleveland</div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 hero-image-section">
              <div className="hero-visual-wrapper">
                {/* Main Device Mockup */}
                <div className="device-mockup">
                  <div className="device-frame">
                    <div className="device-screen">
                      <img 
                        src={mainImage}
                        alt="Healthcare Professional" 
                        className="screen-image"
                      />
                      {/* Live Consultation Indicator */}
                      
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Floating Cards */}
                <div className="floating-elements">
                  {/* Doctor Card */}
                  <div className="floating-card card-doctor">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <img src="https://i.pravatar.cc/60?img=12" alt="Doctor" className="doctor-avatar" />
                      <div className="doctor-info">
                        <h6>Dr. Sarah Johnson</h6>
                        <p>Cardiologist</p>
                        <div className="availability">
                          <span className="status-dot"></span>
                          Available Now
                        </div>
                      </div>
                      <button className="connect-btn">
                        <Video size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Appointment Card */}
                  <div className="floating-card card-appointment">
                    <div className="appointment-content">
                      <div className="appointment-header">
                        <Calendar size={20} className="text-primary" />
                        <span>Next Appointment</span>
                      </div>
                      <div className="appointment-time">
                        <h5>Today, 3:00 PM</h5>
                        <p>General Checkup</p>
                      </div>
                      <div className="countdown">
                        <Clock size={14} />
                        <span>In 2 hours</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Health Metrics Card */}
                  <div className="floating-card card-metrics">
                    <div className="metrics-content">
                      <h6>Your Health Score</h6>
                      <div className="score-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path className="circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path className="circle"
                            strokeDasharray="85, 100"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="score-text">85%</div>
                      </div>
                      <p>Excellent</p>
                    </div>
                  </div>

                  {/* Success Story Card */}
                  <div className="floating-card card-testimonial">
                    <div className="testimonial-mini">
                      <div className="quote-mark">"</div>
                      <p>Life-changing platform!</p>
                      <div className="testimonial-author">
                        <img src="https://i.pravatar.cc/40?img=5" alt="Patient" />
                        <div>
                          <strong>John D.</strong>
                          <div className="stars">★★★★★</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Ring */}
                <div className="hero-ring ring-1"></div>
                <div className="hero-ring ring-2"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section id="detailed-features" className="detailed-features-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">PLATFORM CAPABILITIES</span>
            <h2 className="section-title mt-3">
              Comprehensive Healthcare
              <span className="gradient-text d-block">Feature Suite</span>
            </h2>
          </div>

          <div className="feature-categories">
            <div className="d-flex justify-content-center mb-5">
              <div className="btn-group feature-tabs" role="group">
                {Object.keys(detailedFeatures).map((category) => (
                  <button
                    key={category}
                    className={`btn ${activeFeatureCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveFeatureCategory(category)}
                  >
                    {detailedFeatures[category as keyof typeof detailedFeatures].icon}
                    <span className="ms-2">{detailedFeatures[category as keyof typeof detailedFeatures].title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="feature-grid">
              {detailedFeatures[activeFeatureCategory as keyof typeof detailedFeatures].features.map((feature, idx) => (
                <div key={idx} className={`detailed-feature-card ${isVisible['detailed-features'] ? 'fade-in-up' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="feature-header">
                    <div className="feature-icon-box">
                      {feature.icon}
                    </div>
                    <h5 className="mb-0">{feature.title}</h5>
                  </div>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Benefits Section */}
      <section id="vendor-benefits" className="vb-section py-5 animate-section">
        <div className="container-fluid py-5">
          {/* Section Header */}
          <div className="text-center mb-5">
            <span className="vb-section-badge">
              <Zap size={16} className="me-1" />
              ECOSYSTEM PARTNERS
            </span>
            <h2 className="vb-section-title mt-3">
              Empowering Every Healthcare
              <span className="vb-gradient-text d-block">Ecosystem Partner</span>
            </h2>
            <p className="vb-section-subtitle">
              Join the digital healthcare revolution and unlock unprecedented growth opportunities
            </p>
          </div>


          {/* Enhanced Vendor Cards Grid */}
          <div className="vb-grid">
            {/* Pharmacies Card */}
            <div className="vb-partner-card vb-pharmacy">
              <div className="vb-card-glow"></div>
              <div className="vb-card-header">
                <div className="vb-icon-wrapper">
                  <Building size={32} />
                  <div className="vb-icon-bg"></div>
                  <div className="vb-icon-pulse"></div>
                </div>
                <div className="vb-header-content">
                  <h4 className="vb-card-title">Pharmacies</h4>
                  
                </div>
              </div>

              <div className="vb-benefits-section">
                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Zap size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Direct Prescription Pipeline</h5>
                    <p>Instant digital prescriptions from 10,000+ doctors</p>
                    <div className="vb-metric">
                      <span className="vb-metric-value">50K+</span>
                      <span className="vb-metric-label">Monthly Orders</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Users size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Expanded Customer Base</h5>
                    <p>Access to 2M+ verified patients</p>
                    <div className="vb-progress">
                      <div className="vb-progress-bar" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Package size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Smart Inventory Management</h5>
                    <p>AI-powered demand forecasting</p>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <CreditCard size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Automated Payments</h5>
                    <p>Instant settlement & reconciliation</p>
                  </div>
                </div>
              </div>

            
            </div>

            {/* Diagnostic Labs Card */}
            <div className="vb-partner-card vb-labs">
              <div className="vb-card-glow"></div>
              <div className="vb-card-header">
                <div className="vb-icon-wrapper">
                  <Activity size={32} />
                  <div className="vb-icon-bg"></div>
                  <div className="vb-icon-pulse"></div>
                </div>
                <div className="vb-header-content">
                  <h4 className="vb-card-title">Diagnostic Labs</h4>
                </div>
              </div>

              <div className="vb-benefits-section">
                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Home size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Home Collection Network</h5>
                    <p>Automated scheduling & routing</p>
                    <div className="vb-metric">
                      <span className="vb-metric-value">15K+</span>
                      <span className="vb-metric-label">Daily Collections</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <FileText size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Digital Report Delivery</h5>
                    <p>Instant report sharing with doctors</p>
                    <div className="vb-status-badge vb-active">
                      <span className="vb-status-dot"></span>
                      Live Integration
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Stethoscope size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Doctor Collaboration</h5>
                    <p>Direct consultations on results</p>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <BarChart size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Analytics Dashboard</h5>
                    <p>Test trends & demand insights</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Insurance Providers Card */}
            <div className="vb-partner-card vb-insurance">
              <div className="vb-card-glow"></div>
              <div className="vb-card-header">
                <div className="vb-icon-wrapper">
                  <Shield size={32} />
                  <div className="vb-icon-bg"></div>
                  <div className="vb-icon-pulse"></div>
                </div>
                <div className="vb-header-content">
                  <h4 className="vb-card-title">Insurance Providers</h4>
                  
                </div>
              </div>

              <div className="vb-benefits-section">
                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Cpu size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Automated Claim Processing</h5>
                    <p>90% faster claim settlements</p>
                    <div className="vb-time-saved">
                      <Clock size={14} />
                      <span>Save 15 days/claim</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Fraud Detection System</h5>
                    <p>AI-powered anomaly detection</p>
                    <div className="vb-metric">
                      <span className="vb-metric-value">99.9%</span>
                      <span className="vb-metric-label">Accuracy</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <CheckCircle size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Real-time Verification</h5>
                    <p>Instant eligibility checks</p>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <FileCheck size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Paperless Workflow</h5>
                    <p>100% digital documentation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospitals & Clinics Card */}
            <div className="vb-partner-card vb-hospitals">
              <div className="vb-card-glow"></div>
              <div className="vb-card-header">
                <div className="vb-icon-wrapper">
                  <Building2 size={32} />
                  <div className="vb-icon-bg"></div>
                  <div className="vb-icon-pulse"></div>
                </div>
                <div className="vb-header-content">
                  <h4 className="vb-card-title">Hospitals & Clinics</h4>
                  
                </div>
              </div>

              <div className="vb-benefits-section">
                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Users size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Patient Flow Optimization</h5>
                    <p>Smart queue management system</p>
                    <div className="vb-metric">
                      <span className="vb-metric-value">60%</span>
                      <span className="vb-metric-label">Less Wait Time</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Database size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Unified Health Records</h5>
                    <p>Centralized patient data access</p>
                    <div className="vb-integration-status">
                      <Wifi size={14} />
                      <span>Cloud Sync</span>
                    </div>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <Users2 size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Multi-doctor Coordination</h5>
                    <p>Seamless referral management</p>
                  </div>
                </div>

                <div className="vb-benefit-item">
                  <div className="vb-benefit-icon">
                    <DollarSign size={16} />
                  </div>
                  <div className="vb-benefit-content">
                    <h5>Revenue Optimization</h5>
                    <p>25% increase in patient volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Process */}
          <div className="vb-integration-section">
            <h3 className="vb-integration-title">Simple Integration Process</h3>
            <div className="vb-process-timeline">
              <div className="vb-process-step vb-completed">
                <div className="vb-step-icon">
                  <FileText size={20} />
                </div>
                <h5>Apply</h5>
                <p>Submit partnership application</p>
                <span className="vb-step-time">Day 1</span>
              </div>
              <div className="vb-process-connector"></div>
              <div className="vb-process-step vb-completed">
                <div className="vb-step-icon">
                  <CheckCircle size={20} />
                </div>
                <h5>Verify</h5>
                <p>Quick verification process</p>
                <span className="vb-step-time">Day 2-3</span>
              </div>
              <div className="vb-process-connector"></div>
              <div className="vb-process-step vb-active">
                <div className="vb-step-icon">
                  <Settings size={20} />
                </div>
                <h5>Integrate</h5>
                <p>API integration & setup</p>
                <span className="vb-step-time">Day 4-7</span>
              </div>
              <div className="vb-process-connector"></div>
              <div className="vb-process-step">
                <div className="vb-step-icon">
                  <Rocket size={20} />
                </div>
                <h5>Launch</h5>
                <p>Go live & start growing</p>
                <span className="vb-step-time">Day 8</span>
              </div>
            </div>
          </div>

          
        </div>

        {/* Background Pattern */}
        <div className="vb-bg-pattern">
          <div className="vb-pattern-circle vb-circle-1"></div>
          <div className="vb-pattern-circle vb-circle-2"></div>
          <div className="vb-pattern-circle vb-circle-3"></div>
        </div>
      </section>

      {/* Benefits Comparison Section */}
      <section id="benefits" className="benefits-comparison py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">BENEFITS</span>
            <h2 className="section-title mt-3">
              Transform Healthcare Experience
              <span className="gradient-text d-block">For Everyone</span>
            </h2>
          </div>

          <div className="comparison-grid">
            <div className="benefit-column patients">
              <h3 className="text-center mb-4">
                <HeartHandshake className="me-2" />
                For Patients
              </h3>
              <ul className="benefit-list">
                {patientBenefits.map((benefit, idx) => (
                  <li key={idx} className={`benefit-item ${isVisible.benefits ? 'fade-in-left' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="benefit-check">
                      <Check size={16} />
                    </div>
                    <div>
                      <h6 className="mb-1">{benefit.title}</h6>
                      <p className="text-muted mb-0 small">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="benefit-column doctors">
              <h3 className="text-center mb-4">
                <Stethoscope className="me-2" />
                For Doctors
              </h3>
              <ul className="benefit-list">
                {doctorBenefits.map((benefit, idx) => (
                  <li key={idx} className={`benefit-item ${isVisible.benefits ? 'fade-in-right' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="benefit-check">
                      <Check size={16} />
                    </div>
                    <div>
                      <h6 className="mb-1">{benefit.title}</h6>
                      <p className="text-muted mb-0 small">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section id="user-journey" className="section py-5 animate-section">
        {/* Animated Background Elements */}
        <div className="uj-bg-wrapper">
          <div className="uj-gradient-orb uj-orb-1"></div>
          <div className="uj-gradient-orb uj-orb-2"></div>
          <div className="uj-gradient-orb uj-orb-3"></div>
          
          {/* Animated Particles */}
          <div className="uj-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="uj-particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}></div>
            ))}
          </div>

          {/* Grid Pattern */}
          <div className="uj-grid-pattern"></div>
        </div>

        {/* Content Wrapper with proper z-index */}
        <div className="uj-content-wrapper">
          <div className="container-fluid py-5">
            {/* Section Header */}
            <div className="text-center mb-5">
              <span className="uj-section-badge">
                <Sparkles size={16} className="me-1" />
                USER JOURNEY
              </span>
              <h2 className="uj-section-title mt-3">
                Experience the Seamless
                <span className="uj-gradient-text d-block">Healthcare Journey</span>
              </h2>
              <p className="uj-section-subtitle">
                From sign-up to continuous care, every step is designed for your convenience
              </p>
            </div>

            {/* Enhanced Journey Tabs */}
            <div className="uj-tabs-wrapper">
              <div className="uj-tabs-container">
                <button
                  className={`uj-tab ${activeJourney === 'patient' ? 'uj-active' : ''}`}
                  onClick={() => setActiveJourney('patient')}
                >
                  <div className="uj-tab-icon">
                    <Heart size={20} />
                  </div>
                  <span className="uj-tab-text">Patient Journey</span>
                  <div className="uj-tab-indicator"></div>
                </button>
                
                <button
                  className={`uj-tab ${activeJourney === 'doctor' ? 'uj-active' : ''}`}
                  onClick={() => setActiveJourney('doctor')}
                >
                  <div className="uj-tab-icon">
                    <Stethoscope size={20} />
                  </div>
                  <span className="uj-tab-text">Doctor Journey</span>
                  <div className="uj-tab-indicator"></div>
                </button>
              </div>
            </div>

            {/* Journey Statistics */}
            <div className="uj-stats-bar">
              <div className="uj-stat-item">
                <div className="uj-stat-icon">
                  <Timer size={20} />
                </div>
                <div className="uj-stat-content">
                  <h4>5 Minutes</h4>
                  <p>Average Setup Time</p>
                </div>
              </div>
              <div className="uj-stat-item">
                <div className="uj-stat-icon">
                  <Shield size={20} />
                </div>
                <div className="uj-stat-content">
                  <h4>100% Secure</h4>
                  <p>End-to-End Encrypted</p>
                </div>
              </div>
              <div className="uj-stat-item">
                <div className="uj-stat-icon">
                  <Smartphone size={20} />
                </div>
                <div className="uj-stat-content">
                  <h4>Mobile First</h4>
                  <p>Access Anywhere</p>
                </div>
              </div>
            </div>

            {/* Enhanced Timeline */}
            <div className="uj-timeline-wrapper">
              <div className="uj-timeline-container">
                {/* Progress Line */}
                <div className="uj-progress-line">
                  <div className="uj-progress-fill"></div>
                </div>

                {/* Journey Steps */}
                {(activeJourney === 'patient' ? patientJourney : doctorJourney).map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`uj-step ${isVisible['user-journey'] ? 'uj-visible' : ''}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Step Number with Animation */}
                    <div className="uj-step-number-wrapper">
                      <div className="uj-step-number">
                        <span>{step.step}</span>
                        <div className="uj-number-bg"></div>
                      </div>
                      <div className="uj-pulse-ring"></div>
                      <div className="uj-pulse-ring uj-pulse-2"></div>
                    </div>

                    {/* Enhanced Step Card */}
                    <div className="uj-step-card">
                      <div className="uj-card-glow"></div>
                      
                      {/* Icon Section */}
                      <div className="uj-icon-section">
                        <div className="uj-icon-wrapper">
                          {step.icon}
                          <div className="uj-icon-bg"></div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="uj-content-section">
                        <h4 className="uj-step-title">{step.title}</h4>
                        <p className="uj-step-description">{step.description}</p>
                        
                        {/* Additional Features */}
                        <div className="uj-features">
                          <span className="uj-feature-tag">
                            <CheckCircle size={14} />
                            Quick & Easy
                          </span>
                          <span className="uj-time-estimate">
                            <Clock size={14} />
                            {idx === 0 ? '30 sec' : idx === 1 ? '1 min' : '2-5 min'}
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="uj-card-hover-effect"></div>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows (optional) */}
                <button className="uj-nav-arrow uj-nav-prev">
                  <ChevronLeft size={24} />
                </button>
                <button className="uj-nav-arrow uj-nav-next">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="live-demo" className="live-demo-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">LIVE DEMO</span>
            <h2 className="section-title mt-3">
              Experience HealthNexus
              <span className="gradient-text d-block">In Action</span>
            </h2>
          </div>

          <div className="demo-container">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="demo-sidebar">
                  <h4 className="mb-4">Try Our Features</h4>
                  <div className="demo-options">
                    <button 
                      className={`demo-option ${activeDemo === 'video' ? 'active' : ''}`}
                      onClick={() => setActiveDemo('video')}
                    >
                      <Video className="me-2" size={20} />
                      Video Consultation
                    </button>
                    <button 
                      className={`demo-option ${activeDemo === 'booking' ? 'active' : ''}`}
                      onClick={() => setActiveDemo('booking')}
                    >
                      <Calendar className="me-2" size={20} />
                      Book Appointment
                    </button>
                    <button 
                      className={`demo-option ${activeDemo === 'doctors' ? 'active' : ''}`}
                      onClick={() => setActiveDemo('doctors')}
                    >
                      <Search className="me-2" size={20} />
                      Find Doctors
                    </button>
                    <button 
                      className={`demo-option ${activeDemo === 'prescription' ? 'active' : ''}`}
                      onClick={() => setActiveDemo('prescription')}
                    >
                      <FileText className="me-2" size={20} />
                      E-Prescription
                    </button>
                  </div>

                  {/* Feature Info Card */}
                  <div className="feature-info-card mt-4">
                    <h5>
                      {activeDemo === 'video' && 'HD Video Calls'}
                      {activeDemo === 'booking' && 'Smart Scheduling'}
                      {activeDemo === 'doctors' && 'Find Specialists'}
                      {activeDemo === 'prescription' && 'Digital Prescriptions'}
                    </h5>
                    <p className="text-muted small">
                      {activeDemo === 'video' && 'Connect with doctors instantly through secure HD video consultations'}
                      {activeDemo === 'booking' && 'Book appointments in seconds with real-time availability'}
                      {activeDemo === 'doctors' && 'Search from 10,000+ verified doctors by specialty and location'}
                      {activeDemo === 'prescription' && 'Get digital prescriptions sent directly to your pharmacy'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-8">
                <div className="demo-screen">
                  <div className="demo-header">
                    <div className="demo-controls">
                      <span className="control red"></span>
                      <span className="control yellow"></span>
                      <span className="control green"></span>
                    </div>
                    <span className="demo-title">
                      HealthNexus - {activeDemo === 'video' && 'Video Consultation'}
                      {activeDemo === 'booking' && 'Appointment Booking'}
                      {activeDemo === 'doctors' && 'Find Doctors'}
                      {activeDemo === 'prescription' && 'E-Prescription'}
                    </span>
                    <div className="demo-time">2:45 PM</div>
                  </div>
                  
                  <div className="demo-content">
                    {/* Video Consultation Demo */}
                    {activeDemo === 'video' && (
                      <div className="video-consultation-demo fade-in">
                        <div className="video-grid">
                          <div className="video-participant doctor">
                            <img src="https://i.pravatar.cc/300?img=12" alt="Doctor" />
                            <div className="participant-info">
                              <span className="name">Dr. Sarah Johnson</span>
                              <span className="status">Cardiologist</span>
                            </div>
                            <div className="connection-quality">
                              <Wifi size={16} />
                              <span>Excellent</span>
                            </div>
                          </div>
                          <div className="video-participant patient">
                            <img src="https://i.pravatar.cc/300?img=5" alt="Patient" />
                            <div className="participant-info">
                              <span className="name">You</span>
                              <span className="status">Connected</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="consultation-tools">
                          <button className="tool-btn">
                            <MessageSquare size={18} />
                            <span>Chat</span>
                          </button>
                          <button className="tool-btn">
                            <FileText size={18} />
                            <span>Notes</span>
                          </button>
                          <button className="tool-btn">
                            <Camera size={18} />
                            <span>Capture</span>
                          </button>
                        </div>
                        
                        <div className="video-controls">
                          <button className="control-btn"><Mic size={20} /></button>
                          <button className="control-btn"><Video size={20} /></button>
                          <button className="control-btn"><Share2 size={20} /></button>
                          <button className="control-btn end-call"><Phone size={20} /></button>
                        </div>
                      </div>
                    )}

                    {/* Booking Demo */}
                    {activeDemo === 'booking' && (
                      <div className="booking-demo fade-in">
                        <div className="booking-calendar">
                          <div className="calendar-header">
                            <h5>December 2024</h5>
                            <div className="calendar-nav">
                              <ChevronLeft size={20} />
                              <ChevronRight size={20} />
                            </div>
                          </div>
                          <div className="calendar-grid">
                            {[...Array(7)].map((_, i) => (
                              <div key={i} className="calendar-day available">
                                <span>{20 + i}</span>
                                <small>4 slots</small>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="time-slots">
                          <h6>Available Times</h6>
                          <div className="slots-grid">
                            {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, i) => (
                              <button key={i} className={`time-slot ${i === 2 ? 'selected' : ''}`}>
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <button className="btn btn-primary w-100 mt-4">
                          Confirm Appointment
                          <CheckCircle className="ms-2" size={20} />
                        </button>
                      </div>
                    )}

                    {/* Find Doctors Demo */}
                    {activeDemo === 'doctors' && (
                      <div className="doctors-demo fade-in">
                        <div className="search-bar mb-4">
                          <Search size={20} />
                          <input type="text" placeholder="Search by specialty, condition, or doctor name" />
                        </div>
                        
                        <div className="filter-tags">
                          <span className="tag active">Cardiologist</span>
                          <span className="tag">Near me</span>
                          <span className="tag">Available today</span>
                          <span className="tag">4+ rating</span>
                        </div>
                        
                        <div className="doctors-list">
                          {[1, 2, 3].map((_, i) => (
                            <div key={i} className="doctor-card">
                              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Doctor" />
                              <div className="doctor-info">
                                <h6>Dr. {['Michael Chen', 'Emily Brown', 'James Wilson'][i]}</h6>
                                <p>{['Cardiologist', 'Heart Specialist', 'Cardiac Surgeon'][i]}</p>
                                <div className="doctor-meta">
                                  <span><Star size={14} /> 4.{8 - i}/5</span>
                                  <span>{15 + i * 5} years exp</span>
                                  <span className="available">Available</span>
                                </div>
                              </div>
                              <button className="book-btn">Book</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* E-Prescription Demo */}
                    {activeDemo === 'prescription' && (
                      <div className="prescription-demo fade-in">
                        <div className="prescription-header">
                          <div className="rx-symbol">℞</div>
                          <div className="prescription-info">
                            <h5>Digital Prescription</h5>
                            <p className="text-muted">Dr. Sarah Johnson • Dec 20, 2024</p>
                          </div>
                        </div>
                        
                        <div className="medications-list">
                          <div className="medication-item">
                            <div className="med-icon">💊</div>
                            <div className="med-details">
                              <h6>Lisinopril</h6>
                              <p>10mg - Once daily with food</p>
                              <span className="duration">30 days supply</span>
                            </div>
                          </div>
                          <div className="medication-item">
                            <div className="med-icon">💊</div>
                            <div className="med-details">
                              <h6>Metformin</h6>
                              <p>500mg - Twice daily</p>
                              <span className="duration">90 days supply</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pharmacy-section">
                          <h6>Send to Pharmacy</h6>
                          <div className="pharmacy-selector">
                            <Building size={20} />
                            <select>
                              <option>CVS Pharmacy - 2 miles</option>
                              <option>Walgreens - 3 miles</option>
                            </select>
                          </div>
                          <button className="btn btn-success w-100 mt-3">
                            Send Prescription
                            <Send className="ms-2" size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response Feature */}
      <section id="emergency" className="emergency-section py-5 animate-section">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-badge">EMERGENCY CARE</span>
              <h2 className="section-title mt-3 mb-4">
                Immediate Help When
                <span className="gradient-text d-block">Every Second Counts</span>
              </h2>
              
              <div className="emergency-features">
                <div className="emergency-feature">
                  <div className="feature-icon-emergency">
                    <AlertCircle size={24} />
                  </div>
                  <div className="feature-content">
                    <h5>One-Tap Emergency</h5>
                    <p>Connect with emergency doctors instantly with priority queue access</p>
                  </div>
                </div>
                
                <div className="emergency-feature">
                  <div className="feature-icon-emergency">
                    <Clock size={24} />
                  </div>
                  <div className="feature-content">
                    <h5>Average Response: 2 Minutes</h5>
                    <p>Fastest emergency consultation connection in the industry</p>
                  </div>
                </div>
                
                <div className="emergency-feature">
                  <div className="feature-icon-emergency">
                    <Building size={24} />
                  </div>
                  <div className="feature-content">
                    <h5>Nearest Facility Finder</h5>
                    <p>Real-time ER wait times and instant directions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="emergency-demo">
                <div className="phone-mockup">
                  <div className="emergency-screen">
                    <div className="emergency-header">
                      <h4 className="text-white mb-3">Emergency Care</h4>
                      <button className="emergency-btn">
                        <AlertCircle size={40} />
                        <span>TAP FOR HELP</span>
                      </button>
                    </div>
                    
                    <div className="nearest-facilities">
                      <h5 className="mb-3">Nearest Emergency Rooms</h5>
                      <div className="facility-list">
                        <div className="facility-item">
                          <div className="facility-info">
                            <h6>City General Hospital</h6>
                            <p>2.3 miles · 8 min drive</p>
                          </div>
                          <div className="wait-time">
                            <span className="time">15</span>
                            <small>min wait</small>
                          </div>
                        </div>
                        <div className="facility-item">
                          <div className="facility-info">
                            <h6>St. Mary's Medical Center</h6>
                            <p>3.1 miles · 12 min drive</p>
                          </div>
                          <div className="wait-time">
                            <span className="time">25</span>
                            <small>min wait</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section id="pricing-calculator" className="pricing-calculator-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">PRICING CALCULATOR</span>
            <h2 className="section-title mt-3">
              Calculate Your
              <span className="gradient-text d-block">Healthcare Savings</span>
            </h2>
          </div>

          <div className="calculator-container">
            <div className="calculator-inputs">
              <h4 className="mb-4">Your Current Healthcare Usage</h4>
              
              <div className="input-group-custom mb-4">
                <label>Doctor visits per year</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="1" 
                  max="24" 
                  value={calculatorInputs.doctorVisits}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, doctorVisits: parseInt(e.target.value)})}
                />
                <span className="range-value">{calculatorInputs.doctorVisits} visits</span>
              </div>
              
              <div className="input-group-custom mb-4">
                <label>Average cost per visit</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="50" 
                  max="500" 
                  step="25" 
                  value={calculatorInputs.visitCost}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, visitCost: parseInt(e.target.value)})}
                />
                <span className="range-value">${calculatorInputs.visitCost}</span>
              </div>
              
              <div className="input-group-custom mb-4">
                <label>Emergency visits per year</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="0" 
                  max="10" 
                  value={calculatorInputs.emergencyVisits}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, emergencyVisits: parseInt(e.target.value)})}
                />
                <span className="range-value">{calculatorInputs.emergencyVisits} visit{calculatorInputs.emergencyVisits !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="input-group-custom mb-4">
                <label>Family members covered</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="1" 
                  max="10" 
                  value={calculatorInputs.familyMembers}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, familyMembers: parseInt(e.target.value)})}
                />
                <span className="range-value">{calculatorInputs.familyMembers} members</span>
              </div>
            </div>

            <div className="calculator-results">
              <h4 className="mb-4">Your Estimated Savings</h4>
              
              <div className="savings-breakdown">
                <div className="savings-row">
                  <span>Traditional Healthcare Cost</span>
                  <span className="amount negative">${calculateSavings().traditional.toLocaleString()}/year</span>
                </div>
                <div className="savings-row">
                  <span>HealthNexus Cost</span>
                  <span className="amount">${calculateSavings().mediflow.toLocaleString()}/year</span>
                </div>
                <div className="savings-row total">
                  <span>Total Annual Savings</span>
                  <span className="amount positive">${calculateSavings().savings.toLocaleString()}</span>
                </div>
              </div>

              <div className="additional-benefits mt-4">
                <h5 className="mb-3">Plus These Benefits:</h5>
                <ul className="benefit-list-calc">
                  <li><Check size={16} /> Save {calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 2} hours of waiting time</li>
                  <li><Check size={16} /> No travel costs (${calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 25}+ saved)</li>
                  <li><Check size={16} /> 24/7 doctor access</li>
                  <li><Check size={16} /> Free health monitoring tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="comparison-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">COMPARISON</span>
            <h2 className="section-title mt-3">
              Traditional Healthcare vs
              <span className="gradient-text d-block">HealthNexus Platform</span>
            </h2>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature</th>
                  <th className="traditional-col">
                    <div className="header-content">
                      <XCircle className="mb-2" size={32} />
                      <h4>Traditional Healthcare</h4>
                    </div>
                  </th>
                  <th className="mediflow-col">
                    <div className="header-content">
                      <CheckCircle className="mb-2" size={32} />
                      <h4>HealthNexus Platform</h4>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">
                    <Clock className="me-2" size={20} />
                    Appointment Booking
                  </td>
                  <td className="traditional">
                    <span className="negative">Phone calls during office hours</span>
                    <small className="d-block text-muted">2-3 days wait time</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">24/7 instant online booking</span>
                    <small className="d-block text-success">Book in 30 seconds</small>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">
                    <DollarSign className="me-2" size={20} />
                    Average Consultation Cost
                  </td>
                  <td className="traditional">
                    <span className="negative">$150-300 + Travel costs</span>
                    <small className="d-block text-muted">Hidden fees common</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">$50-100 flat rate</span>
                    <small className="d-block text-success">Save up to 70%</small>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">
                    <Activity className="me-2" size={20} />
                    Wait Time
                  </td>
                  <td className="traditional">
                    <span className="negative">45-90 minutes in waiting room</span>
                    <small className="d-block text-muted">Plus travel time</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">0 minutes - Join instantly</span>
                    <small className="d-block text-success">From anywhere</small>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">
                    <FileText className="me-2" size={20} />
                    Medical Records
                  </td>
                  <td className="traditional">
                    <span className="negative">Paper files, often lost</span>
                    <small className="d-block text-muted">Request takes days</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">Digital, always accessible</span>
                    <small className="d-block text-success">Instant access 24/7</small>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">
                    <Globe className="me-2" size={20} />
                    Doctor Access
                  </td>
                  <td className="traditional">
                    <span className="negative">Limited to local area</span>
                    <small className="d-block text-muted">Few specialists available</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">Global specialist network</span>
                    <small className="d-block text-success">10,000+ verified doctors</small>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">
                    <Pill className="me-2" size={20} />
                    Prescriptions
                  </td>
                  <td className="traditional">
                    <span className="negative">Paper prescriptions</span>
                    <small className="d-block text-muted">Visit pharmacy in person</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">E-prescriptions to pharmacy</span>
                    <small className="d-block text-success">Home delivery available</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="savings-calculator mt-5">
            <div className="calculator-card">
              <h4 className="text-center mb-4">User Annual Savings with HealthNexus</h4>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="saving-item">
                    <h3 className="saving-amount">${(calculatorInputs.doctorVisits * (calculatorInputs.visitCost - 60) * calculatorInputs.familyMembers).toLocaleString()}+</h3>
                    <p className="saving-label">Consultation Fees</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="saving-item">
                    <h3 className="saving-amount">{calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 2} Hours</h3>
                    <p className="saving-label">Time Saved</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="saving-item">
                    <h3 className="saving-amount">${(calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 25).toLocaleString()}+</h3>
                    <p className="saving-label">Travel Costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Future Roadmap Section  */}
      <section id="future-roadmap" className="future-roadmap-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">FUTURE VISION</span>
            <h2 className="section-title mt-3">
              Shaping the Future of
              <span className="gradient-text d-block">Digital Healthcare</span>
            </h2>
            <p className="section-subtitle">
              Our ambitious roadmap to revolutionize global healthcare accessibility
            </p>
          </div>

          <div className="roadmap-container">
            <div className="roadmap-section vision-expansion">
              <div className="row align-items-center g-5">
                <div className="col-lg-6">
                  <div className="roadmap-content">
                    <h3 className="roadmap-title">
                      <TrendingUp className="me-2" size={28} />
                      Vision & Expansion
                    </h3>
                    
                    <div className="timeline-container mt-4">
                      <div className="timeline-item active">
                        <div className="timeline-year">2026</div>
                        <div className="timeline-content">
                          <h5>Foundation Year</h5>
                          <p>Launch core platform with 10K+ users</p>
                        </div>
                      </div>
                      
                      <div className="timeline-item">
                        <div className="timeline-year">2027</div>
                        <div className="timeline-content">
                          <h5>AI Integration</h5>
                          <p>Advanced diagnostics & predictive health</p>
                        </div>
                      </div>
                      
                      <div className="timeline-item">
                        <div className="timeline-year">2028</div>
                        <div className="timeline-content">
                          <h5>Global Expansion</h5>
                          <p>Launch in 15+ countries</p>
                        </div>
                      </div>
                      
                      <div className="timeline-item">
                        <div className="timeline-year">2029</div>
                        <div className="timeline-content">
                          <h5>Ecosystem Leader</h5>
                          <p>1M+ active users, full health ecosystem</p>
                        </div>
                      </div>
                      
                      <div className="timeline-item">
                        <div className="timeline-year">2030</div>
                        <div className="timeline-content">
                          <h5>Healthcare Revolution</h5>
                          <p>Setting new standards in digital health</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className="expansion-visuals">
                    <div className="expansion-card">
                      <h4><Globe className="me-2" size={24} />International Expansion</h4>
                      <div className="world-map-container">
                        <div className="map-stats">
                          <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Target Countries</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">Languages</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">100M+</span>
                            <span className="stat-label">Potential Users</span>
                          </div>
                        </div>
                        <div className="region-list">
                          <div className="region-item active">
                            <span className="region-dot"></span>
                            South Asia - Q1 2025
                          </div>
                          <div className="region-item">
                            <span className="region-dot"></span>
                            Southeast Asia - Q3 2025
                          </div>
                          <div className="region-item">
                            <span className="region-dot"></span>
                            Middle East - Q1 2026
                          </div>
                          <div className="region-item">
                            <span className="region-dot"></span>
                            Africa - Q3 2026
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="feature-pipeline mt-4">
                      <h4><Zap className="me-2" size={24} />Upcoming Features</h4>
                      <div className="feature-cards">
                        <div className="pipeline-card">
                          <div className="card-icon">
                            <Brain size={20} />
                          </div>
                          <h6>AI Health Assistant</h6>
                          <p>24/7 personalized health companion</p>
                          <span className="release-tag">Q2 2025</span>
                        </div>
                        <div className="pipeline-card">
                          <div className="card-icon">
                            <Watch size={20} />
                          </div>
                          <h6>Wearable Integration</h6>
                          <p>Real-time health monitoring</p>
                          <span className="release-tag">Q3 2025</span>
                        </div>
                        <div className="pipeline-card">
                          <div className="card-icon">
                            <Dna size={20} />
                          </div>
                          <h6>Genomic Health</h6>
                          <p>Personalized medicine based on DNA</p>
                          <span className="release-tag">Q1 2026</span>
                        </div>
                        <div className="pipeline-card">
                          <div className="card-icon">
                            <Smartphone size={20} />
                          </div>
                          <h6>AR Consultations</h6>
                          <p>Augmented reality medical exams</p>
                          <span className="release-tag">Q4 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">FEATURES</span>
            <h2 className="section-title mt-3">
              Everything You Need for
              <span className="gradient-text d-block">Modern Healthcare</span>
            </h2>
            <p className="section-subtitle">
              Cutting-edge technology meets compassionate care
            </p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className={`feature-card h-100 ${isVisible.features ? 'fade-in-up' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`feature-icon-wrapper bg-gradient ${feature.gradient}`}>
                    {feature.icon}
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                  
                   
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Health Tools */}
      <section id="health-tools" className="health-tools-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">HEALTH TOOLS</span>
            <h2 className="section-title mt-3">
              Free Health Assessment
              <span className="gradient-text d-block">Tools</span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="health-tool-card">
                <div className="tool-icon">
                  <Activity size={32} />
                </div>
                <h4>BMI Calculator</h4>
                <p className="text-muted mb-4">Check if you're at a healthy weight</p>
                
                <div className="bmi-calculator">
                  <div className="form-group mb-3">
                    <label>Height (cm)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="170" 
                      value={bmiInputs.height}
                      onChange={(e) => setBmiInputs({...bmiInputs, height: e.target.value})}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Weight (kg)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="70" 
                      value={bmiInputs.weight}
                      onChange={(e) => setBmiInputs({...bmiInputs, weight: e.target.value})}
                    />
                  </div>
                  <button className="btn btn-primary w-100" onClick={calculateBMI}>Calculate BMI</button>
                  
                  {bmiResult && (
                    <div className="bmi-result mt-3">
                      <h5>Your BMI: {bmiResult.value}</h5>
                      <span className={`badge ${
                        bmiResult.category === 'Normal Weight' ? 'bg-success' : 
                        bmiResult.category === 'Underweight' ? 'bg-warning' :
                        bmiResult.category === 'Overweight' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {bmiResult.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="health-tool-card">
                <div className="tool-icon">
                  <Brain size={32} />
                </div>
                <h4>Symptom Checker</h4>
                <p className="text-muted mb-4">Get instant health insights</p>
                
                <div className="symptom-checker">
                  <div className="symptom-tags">
                    <span className="symptom-tag active">Headache</span>
                    <span className="symptom-tag">Fever</span>
                    <span className="symptom-tag">Cough</span>
                    <span className="symptom-tag">Fatigue</span>
                    <span className="symptom-tag">+ Add more</span>
                  </div>
                  
                  <div className="symptom-result mt-4">
                    <div className="alert alert-info">
                      <h6>Possible Conditions:</h6>
                      <ul className="mb-0">
                        <li>Common Cold (65% match)</li>
                        <li>Flu (45% match)</li>
                        <li>Stress (40% match)</li>
                      </ul>
                    </div>
                    <button className="btn btn-primary w-100 mt-3">
                      Consult a Doctor
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="health-tool-card">
                <div className="tool-icon">
                  <Heart size={32} />
                </div>
                <h4>Heart Risk Assessment</h4>
                <p className="text-muted mb-4">Evaluate your cardiovascular health</p>
                
                <div className="risk-assessment">
                  <div className="risk-factors">
                    <label className="risk-item">
                      <input type="checkbox" /> High blood pressure
                    </label>
                    <label className="risk-item">
                      <input type="checkbox" /> Diabetes
                    </label>
                    <label className="risk-item">
                      <input type="checkbox" /> Smoking
                    </label>
                    <label className="risk-item">
                      <input type="checkbox" /> Family history
                    </label>
                  </div>
                  
                  <button className="btn btn-primary w-100 mt-3">Assess Risk</button>
                  
                  <div className="risk-meter mt-3">
                    <div className="meter-bar">
                      <div className="meter-fill" style={{width: '30%'}}></div>
                    </div>
                    <p className="text-center mt-2">
                      <strong>Low Risk</strong>
                      <small className="d-block">Keep up the healthy lifestyle!</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-top py-5">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="footer-brand">
                  <div className="d-flex align-items-center mb-3">
                    <Heart className="text-primary me-2" size={32} />
                    <span className="fs-4 fw-bold">HealthNexus</span>
                  </div>
                  <p className="footer-description">
                    Your trusted partner in digital healthcare, making quality medical care accessible to everyone, everywhere.
                  </p>
                  <div className="social-links mt-4">
                    <a href="#" className="social-link">
                      <Globe size={20} />
                    </a>
                    <a href="#" className="social-link">
                      <Smartphone size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <h5 className="footer-title">Product</h5>
                <ul className="footer-links">
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">For Doctors</a></li>
                  <li><a href="#">For Hospitals</a></li>
                </ul>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <h5 className="footer-title">Company</h5>
                <ul className="footer-links">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Press</a></li>
                </ul>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <h5 className="footer-title">Support</h5>
                <ul className="footer-links">
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <h5 className="footer-title">Download</h5>
                <div className="app-buttons">
                  <button className="app-button mb-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                  </button>
                  <button className="app-button">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom py-4">
            <div className="text-center">
              <p className="mb-0">© 2024 HealthNexus. All rights reserved. Made with ❤️ for better health.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;