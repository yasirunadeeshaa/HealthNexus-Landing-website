import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, Video, FileText, Shield, Heart, Activity, Phone, Check, Star, ArrowRight, Globe, Smartphone, CreditCard, UserCheck, Brain, Clock, Users, Award, Zap, ChevronDown, PlayCircle, Monitor, Pill, Stethoscope, MessageSquare, BarChart, AlertCircle, RefreshCw, Lock, Clipboard, UserPlus, Search, DollarSign, FileCheck, Bell, Database, Camera, Mic, Share2, ChevronRight, TrendingUp, Package, HeartHandshake, Building,CheckCircle, XCircle } from 'lucide-react';

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

  const vendorBenefits = [
    {
      category: "Pharmacies",
      icon: <Building />,
      benefits: [
        "Direct prescription delivery pipeline",
        "Increased customer base",
        "Digital inventory management",
        "Automated order processing"
      ]
    },
    {
      category: "Diagnostic Labs",
      icon: <Activity />,
      benefits: [
        "Home collection requests",
        "Digital report delivery",
        "Seamless doctor integration",
        "Payment gateway integration"
      ]
    },
    {
      category: "Insurance Providers",
      icon: <Shield />,
      benefits: [
        "Automated claim processing",
        "Fraud detection system",
        "Real-time verification",
        "Reduced paperwork"
      ]
    },
    {
      category: "Hospitals & Clinics",
      icon: <Building />,
      benefits: [
        "Patient flow management",
        "Digital health records",
        "Multi-doctor coordination",
        "Revenue optimization"
      ]
    }
  ];

  const securityFeatures = [
    {
      icon: <Lock />,
      title: "End-to-End Encryption",
      description: "Military-grade encryption for all data"
    },
    {
      icon: <Shield />,
      title: "HIPAA Compliant",
      description: "Meets all healthcare data standards"
    },
    {
      icon: <Database />,
      title: "Secure Cloud Storage",
      description: "Redundant backups with 99.9% uptime"
    },
    {
      icon: <UserCheck />,
      title: "Two-Factor Authentication",
      description: "Extra layer of account security"
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
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="brand-icon-wrapper">
              <Heart className="brand-icon" size={32} />
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
                <a className="nav-link nav-link-animated px-3" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#detailed-features">Capabilities</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#benefits">Benefits</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#how-it-works">How it Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#security">Security</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#comparison">Comparison</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-animated px-3" href="#health-tools">Tools</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6 hero-content">
              <div className="badge-wrapper mb-4">
                <span className="badge-gradient">
                  <Zap size={16} className="me-1" />
                  #1 Healthcare Platform 2024
                </span>
              </div>
              
              <h1 className="hero-title mb-4">
                Your Health,<span className="gradient-text d-block">Our Priority</span>
              </h1>
              
              <p className="hero-description mb-5">
                Experience healthcare like never before. Connect instantly with world-class doctors, 
                manage your health digitally, and access cutting-edge medical care from anywhere.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-5">
                <button className="btn btn-primary-gradient btn-lg px-5 py-3">
                  Start Your Journey
                  <ArrowRight className="ms-2 arrow-icon" size={20} />
                </button>
                <button className="btn btn-glass-dark btn-lg px-5 py-3">
                  <PlayCircle className="me-2" size={20} />
                  Watch Demo
                </button>
              </div>
              
              <div className="hero-stats d-flex flex-wrap gap-4">
                {['24/7 Available', 'Verified Doctors', 'Instant Connect'].map((item, idx) => (
                  <div key={idx} className="stat-item d-flex align-items-center">
                    <div className="check-circle">
                      <Check size={16} />
                    </div>
                    <span className="ms-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6 hero-image-section">
              <div className="hero-image-wrapper">
                <div className="hero-main-image">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" 
                    alt="Healthcare Professional" 
                    className="img-fluid rounded-4"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                {/* Floating Cards */}
                <div className="floating-card card-1">
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-success">
                      <Video size={20} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">Dr. Sarah Online</h6>
                      <small className="text-muted">Join consultation</small>
                    </div>
                  </div>
                </div>
                
                <div className="floating-card card-2">
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary">
                      <Calendar size={20} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">Next Available</h6>
                      <small className="text-muted">In 15 minutes</small>
                    </div>
                  </div>
                </div>
                
                <div className="floating-card card-3">
                  <div className="rating-card">
                    <div className="stars mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" className="text-warning" />
                      ))}
                    </div>
                    <small>4.9/5 Patient Rating</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>


      {/* Services Quick Access */}
      <section className="services-quick py-5">
        <div className="container">
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
                  <a href="#" className="feature-link">
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
      <section id="user-journey" className="user-journey-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge text-white bg-white bg-opacity-25">USER JOURNEY</span>
            <h2 className="section-title mt-3 text-white">
              See How It Works
            </h2>
          </div>

          <div className="journey-container">
            <div className="journey-tabs">
              <button
                className={`journey-tab ${activeJourney === 'patient' ? 'active' : ''}`}
                onClick={() => setActiveJourney('patient')}
              >
                <Heart className="me-2" size={20} />
                Patient Journey
              </button>
              <button
                className={`journey-tab ${activeJourney === 'doctor' ? 'active' : ''}`}
                onClick={() => setActiveJourney('doctor')}
              >
                <Stethoscope className="me-2" size={20} />
                Doctor Journey
              </button>
            </div>

            <div className="journey-timeline">
              <div className="timeline-track"></div>
              {(activeJourney === 'patient' ? patientJourney : doctorJourney).map((step, idx) => (
                <div key={idx} className={`journey-step ${isVisible['user-journey'] ? 'fade-in-up' : ''}`} style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <div className="step-icon-wrapper">
                      {step.icon}
                    </div>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                  {idx < (activeJourney === 'patient' ? patientJourney : doctorJourney).length - 1 && (
                    <ChevronRight className="step-arrow" size={24} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Benefits Section */}
      <section id="vendor-benefits" className="vendor-benefits py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">ECOSYSTEM</span>
            <h2 className="section-title mt-3">
              Benefits for Healthcare
              <span className="gradient-text d-block">Ecosystem Partners</span>
            </h2>
          </div>

          <div className="row g-4">
            {vendorBenefits.map((vendor, idx) => (
              <div key={idx} className="col-lg-6">
                <div className={`vendor-card ${isVisible['vendor-benefits'] ? 'fade-in-up' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="vendor-header">
                    <div className="vendor-icon">
                      {vendor.icon}
                    </div>
                    <h4 className="vendor-title">{vendor.category}</h4>
                  </div>
                  <ul className="vendor-benefits-list">
                    {vendor.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx}>
                        <CheckCircle size={16} className="text-success me-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">SECURITY</span>
            <h2 className="section-title mt-3">
              Your Data is
              <span className="gradient-text d-block">Safe & Secure</span>
            </h2>
          </div>

          <div className="row g-4">
            {securityFeatures.map((feature, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className={`security-card ${isVisible.security ? 'fade-in-up' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="security-icon">
                    {feature.icon}
                  </div>
                  <h5>{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="live-demo" className="live-demo-section py-5 animate-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="section-badge">LIVE DEMO</span>
            <h2 className="section-title mt-3">
              Experience MediFlow
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
                    <span className="demo-title">MediFlow - Video Consultation</span>
                  </div>
                  
                  <div className="demo-content">
                    <div className="video-consultation-demo">
                      <div className="video-grid">
                        <div className="video-participant doctor">
                          <img src="https://i.pravatar.cc/300?img=12" alt="Doctor" />
                          <div className="participant-info">
                            <span className="name">Dr. Sarah Johnson</span>
                            <span className="status">Cardiologist</span>
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
                      
                      <div className="video-controls">
                        <button className="control-btn"><Mic size={20} /></button>
                        <button className="control-btn"><Video size={20} /></button>
                        <button className="control-btn"><Share2 size={20} /></button>
                        <button className="control-btn end-call"><Phone size={20} /></button>
                      </div>
                    </div>
                  </div>
                </div>
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
              <span className="gradient-text d-block">MediFlow Platform</span>
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
                      <h4>MediFlow Platform</h4>
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
              <h4 className="text-center mb-4">User Annual Savings with MediFlow</h4>
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
                  <span>MediFlow Cost</span>
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
                    <span className="fs-4 fw-bold">MediFlow</span>
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
              <p className="mb-0">© 2024 MediFlow. All rights reserved. Made with ❤️ for better health.</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* CSS Variables */
        :root {
          --primary: #667eea;
          --secondary: #764ba2;
          --accent: #f093fb;
          --warning: #feca57;
          --success: #48bb78;
          --dark: #1a202c;
          --light: #f7fafc;
          --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
          --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
          --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
          --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
        }

        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
          background: #fafbfc;
        }

        /* Floating Background Gradients */
        .floating-gradient {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .gradient-1 {
          width: 600px;
          height: 600px;
          background: var(--gradient-primary);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .gradient-2 {
          width: 500px;
          height: 500px;
          background: var(--gradient-secondary);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .gradient-3 {
          width: 400px;
          height: 400px;
          background: var(--gradient-accent);
          bottom: -10%;
          left: 30%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -50px) scale(1.1); }
          50% { transform: translate(-30px, 30px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        /* Navigation Styles */
        .navbar {
          padding: 1.2rem 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navbar-transparent {
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 1rem 0;
        }

        .brand-icon-wrapper {
          width: 45px;
          height: 45px;
          background: var(--gradient-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          transition: transform 0.3s ease;
        }

        .navbar-brand:hover .brand-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .brand-icon {
          color: white;
        }

        .brand-text {
          font-size: 1.4rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Custom Hamburger Menu */
        .hamburger-lines {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 20px;
          width: 28px;
        }

        .line {
          display: block;
          height: 3px;
          width: 100%;
          border-radius: 2px;
          background: var(--dark);
          transition: all 0.3s ease;
        }

        .line1.rotate-45 {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .line2.opacity-0 {
          opacity: 0;
        }

        .line3.rotate--45 {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Nav Links */
        .nav-link-animated {
          position: relative;
          font-weight: 500;
          color: var(--dark) !important;
          transition: color 0.3s ease;
        }

        .nav-link-animated::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link-animated:hover::after {
          width: 100%;
        }

        /* Button Styles */
        .btn {
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn-gradient-primary {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-gradient-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          color: white;
        }

        .btn-primary-gradient {
          background: var(--gradient-primary);
          color: white;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }

        .btn-primary-gradient:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          color: white;
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--dark);
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .btn-glass-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .btn-glass-dark:hover {
          background: rgba(0, 0, 0, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        .btn-glass-light {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .btn-glass-light:hover {
          background: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        .btn-white {
          background: white;
          color: var(--dark);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .hero-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .hero-shape {
          position: absolute;
          opacity: 0.1;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: var(--gradient-primary);
          border-radius: 50%;
          top: -20%;
          right: -10%;
          filter: blur(100px);
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: var(--gradient-secondary);
          border-radius: 50%;
          bottom: -20%;
          left: -10%;
          filter: blur(100px);
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          background: var(--gradient-accent);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          filter: blur(100px);
          transform: translate(-50%, -50%);
        }

        .hero-content {
          padding-top: 100px;
          animation: fadeInUp 1s ease;
        }

        .badge-wrapper {
          display: inline-block;
        }

        .badge-gradient {
          background: var(--gradient-primary);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--dark);
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #718096;
          line-height: 1.8;
          animation: fadeInUp 1s ease 0.4s both;
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }

        .btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        .hero-stats {
          animation: fadeInUp 1s ease 0.6s both;
        }

        .stat-item {
          position: relative;
          color: #2d3748;
          font-weight: 500;
        }

        .check-circle {
          width: 24px;
          height: 24px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
        }

        /* Hero Image Section */
        .hero-image-section {
          padding-top: 100px;
        }

        .hero-image-wrapper {
          position: relative;
          animation: fadeIn 1.5s ease;
        }

        .hero-main-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .hero-main-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(102, 126, 234, 0.1) 100%);
        }

        /* Floating Cards */
        .floating-card {
          position: absolute;
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          animation: floatCard 3s ease-in-out infinite;
        }

        .card-1 {
          top: 10%;
          left: -20px;
          animation-delay: 0s;
        }

        .card-2 {
          bottom: 30%;
          right: -20px;
          animation-delay: 1s;
        }

        .card-3 {
          bottom: 10%;
          left: 20px;
          animation-delay: 2s;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .bg-success {
          background: #48bb78;
        }

        .bg-primary {
          background: var(--primary);
        }

        .rating-card {
          text-align: center;
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        .scroll-icon {
          color: var(--primary);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        /* Stats Section */
        .stats-section {
          background: white;
          position: relative;
          z-index: 10;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          border-radius: 16px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: var(--primary);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.1);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 0.5rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          color: #718096;
          font-weight: 500;
          font-size: 1.1rem;
        }

        /* Services Quick Access */
        .services-quick {
          background: #f8f9fa;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .service-pill {
          background: white;
          border-radius: 50px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .service-pill:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        /* Features Section */
        .features-section {
          background: white;
          position: relative;
          overflow: hidden;
        }

        .section-badge {
          background: rgba(102, 126, 234, 0.1);
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--dark);
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #718096;
          margin-top: 1rem;
        }

        .feature-card {
          background: #f8f9fa;
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .feature-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          position: relative;
        }

        .bg-gradient.from-blue-500.to-indigo-600 {
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
        }

        .bg-gradient.from-purple-500.to-pink-600 {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }

        .bg-gradient.from-green-500.to-teal-600 {
          background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
        }

        .bg-gradient.from-orange-500.to-red-600 {
          background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
        }

        .bg-gradient.from-cyan-500.to-blue-600 {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
        }

        .bg-gradient.from-pink-500.to-rose-600 {
          background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .feature-description {
          color: #718096;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }

        .feature-link:hover {
          gap: 0.75rem;
          color: var(--secondary);
        }

        /* Detailed Features Section */
        .detailed-features-section {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .feature-tabs {
          background: white;
          border-radius: 50px;
          padding: 5px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          display: inline-flex;
          gap: 5px;
        }

        .feature-tabs .btn {
          border-radius: 45px;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .feature-tabs .btn-outline-primary {
          background: transparent;
          color: var(--primary);
          border: none;
        }

        .feature-tabs .btn-primary {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-top: 50px;
        }

        .detailed-feature-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }

        .detailed-feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border-left-color: var(--primary);
        }

        .feature-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .feature-icon-box {
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
        }

        /* Benefits Comparison */
        .benefits-comparison {
          background: white;
          padding: 80px 0;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 50px;
        }

        .benefit-column {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 30px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .benefit-column.patients {
          border-top: 5px solid var(--primary);
        }

        .benefit-column.doctors {
          border-top: 5px solid var(--secondary);
        }

        .benefit-list {
          list-style: none;
          padding: 0;
        }

        .benefit-item {
          display: flex;
          align-items: start;
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateX(10px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .benefit-check {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 15px;
          flex-shrink: 0;
        }

        /* User Journey Section */
        .user-journey-section {
          background: var(--gradient-primary);
          padding: 80px 0;
          color: white;
          position: relative;
        }

        .journey-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          padding: 10px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .journey-tab {
          padding: 15px 40px;
          background: transparent;
          border: none;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 40px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .journey-tab.active {
          background: rgba(255,255,255,0.2);
        }

        .journey-timeline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 30px;
        }

        .timeline-track {
          position: absolute;
          top: 50px;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255,255,255,0.2);
          z-index: 0;
        }

        .journey-step {
          flex: 1;
          text-align: center;
          position: relative;
          z-index: 1;
          min-width: 150px;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: white;
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-weight: 800;
          font-size: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .step-content {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
          margin-top: 20px;
        }

        .step-icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }

        .step-title {
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .step-description {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .step-arrow {
          position: absolute;
          right: -15px;
          top: 40px;
          color: rgba(255,255,255,0.5);
        }

        /* Vendor Benefits Section */
        .vendor-benefits {
          background: #f8f9fa;
        }

        .vendor-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          height: 100%;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .vendor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .vendor-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
        }

        .vendor-icon {
          width: 60px;
          height: 60px;
          background: var(--gradient-primary);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 20px;
        }

        .vendor-title {
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--dark);
          margin: 0;
        }

        .vendor-benefits-list {
          list-style: none;
          padding: 0;
        }

        .vendor-benefits-list li {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          color: #4a5568;
        }

        /* Security Section */
        .security-section {
          background: white;
        }

        .security-card {
          text-align: center;
          padding: 30px;
          border-radius: 20px;
          background: #f8f9fa;
          height: 100%;
          transition: all 0.3s ease;
        }

        .security-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .security-icon {
          width: 80px;
          height: 80px;
          background: var(--gradient-primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 40px;
        }

        .compliance-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .compliance-badge {
          background: var(--gradient-primary);
          color: white;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        /* How It Works Section */
        .how-it-works-section {
          background: #f8f9fa;
          position: relative;
        }

        .process-timeline {
          position: relative;
          margin-top: 4rem;
        }

        .timeline-line {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 2px;
          background: linear-gradient(to right, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%);
          z-index: 1;
        }

        .process-step {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 800;
          color: #e2e8f0;
          margin-bottom: 1rem;
        }

        .step-icon {
          width: 120px;
          height: 120px;
          background: white;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
          transition: all 0.4s ease;
        }

        .process-step:hover .step-icon {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .step-description {
          color: #718096;
          line-height: 1.6;
        }

        /* Testimonials Section */
        .testimonials-section {
          background: #f8f9fa;
          position: relative;
        }

        .testimonial-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card-main {
          background: white;
          border-radius: 30px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .testimonial-card-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--gradient-primary);
        }

        .quote-icon {
          color: #e2e8f0;
          margin-bottom: 2rem;
        }

        .testimonial-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: var(--dark);
          margin-bottom: 2rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .author-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info h5 {
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.25rem;
        }

        .author-info p {
          color: #718096;
          margin: 0;
        }

        .rating {
          margin-left: auto;
        }

        .testimonial-nav {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e2e8f0;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot.active {
          width: 40px;
          border-radius: 6px;
          background: var(--gradient-primary);
        }

        /* CTA Section */
        .cta-section {
          background: var(--gradient-primary);
          position: relative;
          overflow: hidden;
        }

        .cta-wrapper {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 4rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
        }

        .cta-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .trust-indicators {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-weight: 500;
        }

        /* Language Banner */
        .language-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: sticky;
          top: 0;
          z-index: 1020;
        }

        .language-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-x: auto;
        }

        .language-content {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .language-flags {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .flag-item {
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .flag-item:hover {
          transform: scale(1.2);
        }

        .more-languages {
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        /* Live Demo Section */
        .live-demo-section {
          background: #f8f9fa;
        }

        .demo-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .demo-sidebar {
          background: white;
          border-radius: 20px;
          padding: 30px;
          height: 100%;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .demo-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .demo-option {
          padding: 15px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          text-align: left;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .demo-option:hover,
        .demo-option.active {
          border-color: var(--primary);
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          transform: translateX(5px);
        }

        .demo-option.active {
          color: var(--primary);
        }

        .demo-screen {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          height: 500px;
        }

        .demo-header {
          background: #2d3748;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .demo-controls {
          display: flex;
          gap: 8px;
        }

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control.red { background: #ff5f57; }
        .control.yellow { background: #ffbd2e; }
        .control.green { background: #28ca42; }

        .demo-title {
          color: white;
          font-weight: 500;
        }

        .demo-content {
          padding: 30px;
          height: calc(100% - 60px);
          background: #f8f9fa;
        }

        .video-consultation-demo {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .video-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          flex: 1;
        }

        .video-participant {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          background: #1a202c;
        }

        .video-participant img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .participant-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          padding: 20px;
          color: white;
        }

        .participant-info .name {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .participant-info .status {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .video-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .control-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }

        .control-btn.end-call {
          background: #ff4444;
          color: white;
        }

        /* Comparison Section */
        .comparison-section {
          background: white;
        }

        .comparison-table-wrapper {
          overflow-x: auto;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .comparison-table {
          width: 100%;
          background: white;
          border-collapse: collapse;
        }

        .comparison-table thead {
          background: #f8f9fa;
        }

        .comparison-table th {
          padding: 30px;
          text-align: center;
          border-bottom: 2px solid #e2e8f0;
        }

        .feature-col {
          text-align: left !important;
          width: 30%;
        }

        .traditional-col .header-content {
          color: #e53e3e;
        }

        .mediflow-col .header-content {
          color: #48bb78;
        }

        .header-content h4 {
          margin: 0;
          font-size: 1.5rem;
        }

        .comparison-table tbody tr {
          border-bottom: 1px solid #e2e8f0;
        }

        .comparison-table tbody tr:hover {
          background: #f8f9fa;
        }

        .comparison-table td {
          padding: 25px 30px;
        }

        .feature-name {
          font-weight: 600;
          display: flex;
          align-items: center;
          color: var(--dark);
        }

        .traditional {
          text-align: center;
        }

        .mediflow {
          text-align: center;
        }

        .negative {
          color: #e53e3e;
          font-weight: 600;
        }

        .positive {
          color: #48bb78;
          font-weight: 600;
        }

        .savings-calculator {
          max-width: 800px;
          margin: 0 auto;
        }

        .calculator-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        .saving-item {
          text-align: center;
        }

        .saving-amount {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .saving-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Emergency Section */
        .emergency-section {
          background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
        }

        .emergency-features {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin: 30px 0;
        }

        .emergency-feature {
          display: flex;
          align-items: start;
          gap: 20px;
        }

        .feature-icon-emergency {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e53e3e;
          box-shadow: 0 5px 20px rgba(229, 62, 62, 0.2);
          flex-shrink: 0;
        }

        .emergency-demo {
          display: flex;
          justify-content: center;
        }

        .phone-mockup {
          width: 350px;
          height: 700px;
          background: #1a202c;
          border-radius: 40px;
          padding: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }

        .emergency-screen {
          background: #2d3748;
          height: 100%;
          border-radius: 25px;
          padding: 30px;
          color: white;
        }

        .emergency-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .emergency-btn {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
          border: none;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(255, 68, 68, 0.5);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 10px 40px rgba(255, 68, 68, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 15px 50px rgba(255, 68, 68, 0.7); }
          100% { transform: scale(1); box-shadow: 0 10px 40px rgba(255, 68, 68, 0.5); }
        }

        .emergency-btn span {
          font-weight: 700;
          margin-top: 10px;
        }

        .nearest-facilities {
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 20px;
        }

        .facility-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .facility-item {
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .facility-info h6 {
          margin: 0 0 5px 0;
          font-size: 1rem;
        }

        .facility-info p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .wait-time {
          text-align: center;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          padding: 10px 15px;
        }

        .wait-time .time {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .wait-time small {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        /* Pricing Calculator Section */
        .pricing-calculator-section {
          background: #f8f9fa;
        }

        .calculator-container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .input-group-custom {
          margin-bottom: 25px;
        }

        .input-group-custom label {
          display: block;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--dark);
        }

        .form-range {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 5px;
          outline: none;
          -webkit-appearance: none;
        }

        .form-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--gradient-primary);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }

        .range-value {
          display: inline-block;
          background: var(--gradient-primary);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
          margin-top: 10px;
        }

        .calculator-results {
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 40px;
        }

        .savings-breakdown {
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
        }

        .savings-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .savings-row:last-child {
          border-bottom: none;
        }

        .savings-row.total {
          padding-top: 20px;
          margin-top: 10px;
          border-top: 2px solid #e2e8f0;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .amount {
          font-weight: 600;
        }

        .amount.negative {
          color: #e53e3e;
        }

        .amount.positive {
          color: #48bb78;
        }

        .benefit-list-calc {
          list-style: none;
          padding: 0;
        }

        .benefit-list-calc li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: #4a5568;
        }

        /* Health Tools Section */
        .health-tools-section {
          background: white;
        }

        .health-tool-card {
          background: #f8f9fa;
          border-radius: 20px;
          padding: 30px;
          height: 100%;
          transition: all 0.3s ease;
          text-align: center;
        }

        .health-tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .tool-icon {
          width: 80px;
          height: 80px;
          background: var(--gradient-primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .bmi-result {
          background: white;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
        }

        .symptom-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .symptom-tag {
          background: white;
          border: 2px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .symptom-tag:hover,
        .symptom-tag.active {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }

        .symptom-result .alert {
          text-align: left;
        }

        .risk-factors {
          text-align: left;
          margin: 20px 0;
        }

        .risk-item {
          display: block;
          padding: 10px;
          margin-bottom: 10px;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .risk-item:hover {
          background: #e2e8f0;
        }

        .risk-item input {
          margin-right: 10px;
        }

        .risk-meter {
          margin-top: 20px;
        }

        .meter-bar {
          height: 20px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
          transition: width 0.5s ease;
        }

        /* Blog Section */
        .blog-section {
          background: #f8f9fa;
        }

        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          height: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .blog-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.1);
        }

        .blog-category {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--gradient-primary);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .blog-category.platform-update {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }

        .blog-content {
          padding: 30px;
        }

        .blog-content h4 {
          margin-bottom: 15px;
          font-size: 1.3rem;
          line-height: 1.4;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0;
          color: #718096;
          font-size: 0.875rem;
        }

        .read-more {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.3s ease;
        }

        .read-more:hover {
          gap: 10px;
          color: var(--secondary);
        }

        /* Footer */
        .footer-section {
          background: var(--dark);
          color: white;
        }

        .footer-brand {
          margin-bottom: 2rem;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--gradient-primary);
          transform: translateY(-3px);
        }

        .footer-title {
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 1rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-links a:hover {
          color: white;
          padding-left: 10px;
        }

        .app-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 0.75rem;
          width: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .app-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .app-button img {
          height: 40px;
          width: auto;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
        }

        .fade-in-left {
          animation: fadeInLeft 0.8s ease forwards;
          opacity: 0;
        }

        .fade-in-right {
          animation: fadeInRight 0.8s ease forwards;
          opacity: 0;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .journey-timeline {
            flex-direction: column;
            gap: 40px;
          }

          .timeline-track {
            display: none;
          }

          .step-arrow {
            display: none;
          }

          .calculator-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 992px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .demo-screen {
            height: 400px;
          }

          .video-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .timeline-line {
            display: none;
          }
          
          .floating-card {
            display: none;
          }
          
          .cta-wrapper {
            padding: 2rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }

          .feature-tabs {
            flex-direction: column;
            width: 100%;
          }

          .feature-tabs .btn {
            width: 100%;
            justify-content: center;
          }

          .journey-tabs {
            flex-direction: column;
            width: 100%;
          }

          .journey-tab {
            width: 100%;
            justify-content: center;
          }

          .comparison-table {
            font-size: 0.875rem;
          }

          .comparison-table th,
          .comparison-table td {
            padding: 15px;
          }

          .phone-mockup {
            width: 300px;
            height: 600px;
          }

          .calculator-container {
            padding: 30px;
          }

          .health-tool-card {
            margin-bottom: 20px;
          }

          .language-banner {
            font-size: 0.875rem;
          }

          .language-flags {
            gap: 5px;
          }

          .flag-item {
            font-size: 20px;
          }

          .demo-sidebar {
            margin-bottom: 30px;
          }

          .blog-card {
            margin-bottom: 20px;
          }
        }

        /* Form Controls */
        .form-control {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: var(--dark);
          background-color: white;
          background-clip: padding-box;
          border: 2px solid #e2e8f0;
          appearance: none;
          border-radius: 12px;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .form-control:focus {
          color: var(--dark);
          background-color: white;
          border-color: var(--primary);
          outline: 0;
          box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--dark);
        }

        /* Alert Styles */
        .alert {
          position: relative;
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
          border: 1px solid transparent;
          border-radius: 0.5rem;
        }

        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #bee5eb;
        }

        /* Badge Styles */
        .badge {
          display: inline-block;
          padding: 0.35em 0.65em;
          font-size: 0.75em;
          font-weight: 700;
          line-height: 1;
          color: white;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.375rem;
        }

        .bg-success {
          background-color: #48bb78 !important;
        }

        .bg-warning {
          background-color: #feca57 !important;
        }

        .bg-danger {
          background-color: #e53e3e !important;
        }

        /* Additional Hover Effects and Animations */
        .demo-option {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .emergency-btn:hover {
          transform: scale(1.1);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 68, 68, 0.6);
          color: white;
        }

        .btn-outline-primary {
          color: var(--primary);
          border: 2px solid var(--primary);
          background: transparent;
        }

        .btn-outline-primary:hover {
          background: var(--gradient-primary);
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }

        /* Loading states for interactive elements */
        .calculating {
          opacity: 0.6;
          pointer-events: none;
        }

        /* Accessibility improvements */
        .btn:focus,
        .form-control:focus,
        .demo-option:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Print styles */
        @media print {
          .navbar,
          .language-banner,
          .cta-section,
          .footer-section {
            display: none;
          }

          .comparison-table {
            page-break-inside: avoid;
          }
        }

        /* Additional Utility Classes */
        .transition-all {
          transition: all 0.3s ease;
        }

        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .w-6 { width: 1.5rem; }
        .h-6 { height: 1.5rem; }
      `}</style>
    </div>
  );
};

export default LandingPage;