import { Calendar, Video, FileText, Shield, CreditCard, Brain, Search, Clock, RefreshCw, Bell, AlertCircle, Users, Camera, Share2, Mic, Heart, Activity, Pill, FileCheck, BarChart, Package, DollarSign } from 'lucide-react';
import '../Features.css';

interface VisibleSections {
  [key: string]: boolean;
}

interface DetailedFeaturesProps {
  activeFeatureCategory: string;
  setActiveFeatureCategory: (category: string) => void;
  isVisible: VisibleSections;
}

const detailedFeatures = {
  appointment: {
    title: "Smart Appointment Management",
    icon: <Calendar />,
    features: [
      { icon: <Search />, title: "Advanced Doctor Search", description: "Filter by 15+ criteria including specialization, language, insurance, and ratings" },
      { icon: <Clock />, title: "Real-time Availability", description: "Live slot updates with instant booking confirmation" },
      { icon: <RefreshCw />, title: "Smart Rescheduling", description: "AI suggests best alternative slots when rescheduling" },
      { icon: <Bell />, title: "Intelligent Reminders", description: "Multi-channel notifications via SMS, email, and push" },
      { icon: <AlertCircle />, title: "Emergency Appointments", description: "Priority booking for urgent care with nearest facility finder" },
      { icon: <Users />, title: "Group Sessions", description: "Educational workshops and therapy group sessions" }
    ]
  },
  consultation: {
    title: "Next-Gen Telemedicine",
    icon: <Video />,
    features: [
      { icon: <Camera />, title: "HD Video Quality", description: "Crystal clear video with automatic quality adjustment" },
      { icon: <Share2 />, title: "Screen Sharing", description: "Share medical reports and images during consultation" },
      { icon: <Mic />, title: "AI Transcription", description: "Automatic consultation notes with key highlights" },
      { icon: <FileText />, title: "Digital Whiteboard", description: "Interactive tools for doctors to explain conditions" },
      { icon: <Shield />, title: "Secure Recording", description: "Optional encrypted recording for future reference" },
      { icon: <Bell />, title: "Real-time Chat", description: "In-call messaging with file sharing capabilities" }
    ]
  },
  health: {
    title: "Comprehensive Health Management",
    icon: <Heart />,
    features: [
      { icon: <Activity />, title: "Vital Tracking", description: "Monitor BP, glucose, weight with trend analysis" },
      { icon: <Pill />, title: "Medication Management", description: "Refill reminders, interaction checks, adherence tracking" },
      { icon: <FileCheck />, title: "Smart Health Records", description: "OCR-powered document scanning and categorization" },
      { icon: <BarChart />, title: "Health Analytics", description: "AI-driven insights and predictive health alerts" },
      { icon: <Brain />, title: "Symptom Checker", description: "AI-powered preliminary assessment with urgency indicators" },
      { icon: <Package />, title: "Lab Integration", description: "Home sample collection and result tracking" }
    ]
  },
  payment: {
    title: "Seamless Payment & Insurance",
    icon: <DollarSign />,
    features: [
      { icon: <CreditCard />, title: "Multiple Payment Options", description: "Cards, wallets, EMI, and insurance coverage" },
      { icon: <Shield />, title: "Insurance Verification", description: "Real-time eligibility check and claim estimation" },
      { icon: <FileCheck />, title: "Auto Claim Filing", description: "Paperless claim submission with tracking" },
      { icon: <DollarSign />, title: "Transparent Pricing", description: "Upfront cost breakdown with no hidden charges" },
      { icon: <RefreshCw />, title: "Easy Refunds", description: "Quick refund processing for cancellations" },
      { icon: <BarChart />, title: "Expense Tracking", description: "Healthcare spending analytics and tax reports" }
    ]
  }
};

const DetailedFeatures = ({ activeFeatureCategory, setActiveFeatureCategory, isVisible }: DetailedFeaturesProps) => {
  return (
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
              <div
                key={idx}
                className={`detailed-feature-card ${isVisible['detailed-features'] ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="feature-header">
                  <div className="feature-icon-box">{feature.icon}</div>
                  <h5 className="mb-0">{feature.title}</h5>
                </div>
                <p className="text-muted mb-0">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;