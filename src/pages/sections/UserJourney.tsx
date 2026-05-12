import {
  Sparkles, Heart, Stethoscope, Timer, Shield, Smartphone, ChevronLeft, ChevronRight,
  CheckCircle, Clock, UserPlus, Search, Calendar, Clipboard, Video, FileText,
  Bell, BarChart, TrendingUp, UserCheck
} from 'lucide-react';
import '../Journuy.css';

interface VisibleSections {
  [key: string]: boolean;
}

interface UserJourneyProps {
  activeJourney: string;
  setActiveJourney: (journey: string) => void;
  isVisible: VisibleSections;
}

const patientJourney = [
  { step: 1, title: "Sign Up in Seconds", description: "Quick registration with social login or mobile OTP", icon: <UserPlus /> },
  { step: 2, title: "Find Your Doctor", description: "Search by symptoms, specialization, or get AI recommendations", icon: <Search /> },
  { step: 3, title: "Book Instantly", description: "Choose convenient slot and consultation type", icon: <Calendar /> },
  { step: 4, title: "Prepare for Visit", description: "Upload reports, fill questionnaires, test video", icon: <Clipboard /> },
  { step: 5, title: "Consult Doctor", description: "Join video call or visit clinic with digital check-in", icon: <Video /> },
  { step: 6, title: "Get Prescription", description: "Receive digital prescription and order medicines", icon: <FileText /> },
  { step: 7, title: "Follow-up Care", description: "Track health, get reminders, book follow-ups", icon: <Heart /> }
];

const doctorJourney = [
  { step: 1, title: "Professional Onboarding", description: "Quick verification with medical license and credentials", icon: <UserCheck /> },
  { step: 2, title: "Set Your Schedule", description: "Flexible availability with smart slot management", icon: <Clock /> },
  { step: 3, title: "Receive Appointments", description: "Get notified of bookings with patient history", icon: <Bell /> },
  { step: 4, title: "Conduct Consultations", description: "Use advanced tools for diagnosis and treatment", icon: <Stethoscope /> },
  { step: 5, title: "Prescribe Digitally", description: "E-prescriptions with drug interaction checks", icon: <FileText /> },
  { step: 6, title: "Track Outcomes", description: "Monitor patient progress and satisfaction", icon: <BarChart /> },
  { step: 7, title: "Grow Practice", description: "Analytics, reviews, and referral network", icon: <TrendingUp /> }
];

const UserJourney = ({ activeJourney, setActiveJourney, isVisible }: UserJourneyProps) => {
  return (
    <section id="user-journey" className="section py-5 animate-section">
      <div className="uj-bg-wrapper">
        <div className="uj-gradient-orb uj-orb-1"></div>
        <div className="uj-gradient-orb uj-orb-2"></div>
        <div className="uj-gradient-orb uj-orb-3"></div>
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
        <div className="uj-grid-pattern"></div>
      </div>

      <div className="uj-content-wrapper">
        <div className="container-fluid py-5">
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

          <div className="uj-tabs-wrapper">
            <div className="uj-tabs-container">
              <button
                className={`uj-tab ${activeJourney === 'patient' ? 'uj-active' : ''}`}
                onClick={() => setActiveJourney('patient')}
              >
                <div className="uj-tab-icon"><Heart size={20} /></div>
                <span className="uj-tab-text">Patient Journey</span>
                <div className="uj-tab-indicator"></div>
              </button>
              <button
                className={`uj-tab ${activeJourney === 'doctor' ? 'uj-active' : ''}`}
                onClick={() => setActiveJourney('doctor')}
              >
                <div className="uj-tab-icon"><Stethoscope size={20} /></div>
                <span className="uj-tab-text">Doctor Journey</span>
                <div className="uj-tab-indicator"></div>
              </button>
            </div>
          </div>

          <div className="uj-stats-bar">
            <div className="uj-stat-item">
              <div className="uj-stat-icon"><Timer size={20} /></div>
              <div className="uj-stat-content">
                <h4>5 Minutes</h4>
                <p>Average Setup Time</p>
              </div>
            </div>
            <div className="uj-stat-item">
              <div className="uj-stat-icon"><Shield size={20} /></div>
              <div className="uj-stat-content">
                <h4>100% Secure</h4>
                <p>End-to-End Encrypted</p>
              </div>
            </div>
            <div className="uj-stat-item">
              <div className="uj-stat-icon"><Smartphone size={20} /></div>
              <div className="uj-stat-content">
                <h4>Mobile First</h4>
                <p>Access Anywhere</p>
              </div>
            </div>
          </div>

          <div className="uj-timeline-wrapper">
            <div className="uj-timeline-container">
              <div className="uj-progress-line">
                <div className="uj-progress-fill"></div>
              </div>

              {(activeJourney === 'patient' ? patientJourney : doctorJourney).map((step, idx) => (
                <div
                  key={idx}
                  className={`uj-step ${isVisible['user-journey'] ? 'uj-visible' : ''}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="uj-step-number-wrapper">
                    <div className="uj-step-number">
                      <span>{step.step}</span>
                      <div className="uj-number-bg"></div>
                    </div>
                    <div className="uj-pulse-ring"></div>
                    <div className="uj-pulse-ring uj-pulse-2"></div>
                  </div>

                  <div className="uj-step-card">
                    <div className="uj-card-glow"></div>
                    <div className="uj-icon-section">
                      <div className="uj-icon-wrapper">
                        {step.icon}
                        <div className="uj-icon-bg"></div>
                      </div>
                    </div>
                    <div className="uj-content-section">
                      <h4 className="uj-step-title">{step.title}</h4>
                      <p className="uj-step-description">{step.description}</p>
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
                    <div className="uj-card-hover-effect"></div>
                  </div>
                </div>
              ))}

              <button className="uj-nav-arrow uj-nav-prev"><ChevronLeft size={24} /></button>
              <button className="uj-nav-arrow uj-nav-next"><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;