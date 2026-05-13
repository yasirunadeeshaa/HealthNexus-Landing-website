import { Video, Calendar, FileText, Shield, CreditCard, Brain } from 'lucide-react';
import '../Features.css';

interface VisibleSections {
  [key: string]: boolean;
}

interface FeaturesProps {
  isVisible: VisibleSections;
}

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

const Features = ({ isVisible }: FeaturesProps) => {
  return (
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
              <div
                className={`feature-card h-100 ${isVisible.features ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
  );
};

export default Features;