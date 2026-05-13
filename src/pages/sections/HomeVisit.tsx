import {
  Home, Stethoscope, Heart, UserCheck, HeartHandshake, TestTube, Activity,
  CheckCircle, Shield, Thermometer, Sparkles, Phone
} from 'lucide-react';
import '../HomeVisit.css';

const HomeVisit = () => {
  return (
    <section id="home-visit" className="hv-section py-5 animate-section">
      <div className="hv-bg-wrapper">
        <div className="hv-gradient-orb hv-orb-1"></div>
        <div className="hv-gradient-orb hv-orb-2"></div>
        <div className="hv-floating-icon hv-icon-1"><Home size={40} /></div>
        <div className="hv-floating-icon hv-icon-2"><Stethoscope size={35} /></div>
        <div className="hv-floating-icon hv-icon-3"><Heart size={30} /></div>
      </div>

      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="hv-section-badge">
            <Home size={16} className="me-1" />
            HOME HEALTHCARE
          </span>
          <h2 className="hv-section-title mt-3">
            Healthcare That Comes
            <span className="hv-gradient-text d-block">To Your Doorstep</span>
          </h2>
          <p className="hv-section-subtitle">
            Professional medical care in the comfort of your home - safe, convenient, and personalized
          </p>
        </div>

        <div className="hv-services-grid">
          {/* Doctor Consultations */}
          <div className="hv-service-card hv-featured">
            <div className="hv-card-glow"></div>
            <div className="hv-service-header">
              <div className="hv-service-icon"><UserCheck size={32} /></div>
              <h3 className="hv-service-title">Doctor Consultations</h3>
            </div>
            <p className="hv-service-desc">Experienced doctors visit your home for comprehensive health checkups and consultations</p>
            <ul className="hv-feature-list">
              {['General physicians & specialists', 'Complete health assessment', 'Prescription & follow-up care', 'Emergency visits available'].map((item, i) => (
                <li key={i}><CheckCircle size={16} className="text-success" />{item}</li>
              ))}
            </ul>
          </div>

          {/* Nursing Care */}
          <div className="hv-service-card">
            <div className="hv-card-glow"></div>
            <div className="hv-service-header">
              <div className="hv-service-icon"><HeartHandshake size={32} /></div>
              <h3 className="hv-service-title">Nursing Care</h3>
            </div>
            <p className="hv-service-desc">Professional nursing services for post-operative care, chronic conditions, and daily assistance</p>
            <ul className="hv-feature-list">
              {['24/7 nursing support', 'Wound care & dressing', 'Medication administration', 'Vitals monitoring'].map((item, i) => (
                <li key={i}><CheckCircle size={16} className="text-success" />{item}</li>
              ))}
            </ul>
          </div>

          {/* Lab Tests */}
          <div className="hv-service-card">
            <div className="hv-card-glow"></div>
            <div className="hv-service-header">
              <div className="hv-service-icon"><TestTube size={32} /></div>
              <h3 className="hv-service-title">Lab Sample Collection</h3>
            </div>
            <p className="hv-service-desc">Certified phlebotomists collect samples from your home with proper safety protocols</p>
            <ul className="hv-feature-list">
              {['Blood tests & cultures', 'Urine & stool tests', 'COVID-19 & flu tests', 'Results in 24-48 hours'].map((item, i) => (
                <li key={i}><CheckCircle size={16} className="text-success" />{item}</li>
              ))}
            </ul>
          </div>

          {/* Physiotherapy */}
          <div className="hv-service-card">
            <div className="hv-card-glow"></div>
            <div className="hv-service-header">
              <div className="hv-service-icon"><Activity size={32} /></div>
              <h3 className="hv-service-title">Physiotherapy</h3>
            </div>
            <p className="hv-service-desc">Expert physiotherapists help you recover and regain mobility with personalized exercises</p>
            <ul className="hv-feature-list">
              {['Post-surgery rehabilitation', 'Pain management', 'Mobility improvement', 'Equipment provided'].map((item, i) => (
                <li key={i}><CheckCircle size={16} className="text-success" />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="hv-process-section">
          <h3 className="hv-process-title">How Home Visit Works</h3>
          <div className="hv-process-timeline">
            <div className="hv-process-line"></div>
            {[
              { num: 1, title: 'Book Service', desc: 'Choose service type and preferred time slot' },
              { num: 2, title: 'Get Confirmed', desc: 'Receive confirmation with professional details' },
              { num: 3, title: 'Professional Visits', desc: 'Healthcare provider arrives at scheduled time' },
              { num: 4, title: 'Receive Care', desc: 'Get professional medical care at home' }
            ].map(({ num, title, desc }) => (
              <div key={num} className="hv-process-step">
                <div className="hv-step-number">{num}</div>
                <div className="hv-step-content">
                  <h5>{title}</h5>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Measures */}
        <div className="hv-safety-section">
          <h3 className="hv-safety-title">Your Safety, Our Priority</h3>
          <div className="hv-safety-grid">
            <div className="hv-safety-item">
              <Shield size={24} />
              <h5>Verified Professionals</h5>
              <p>Background checked and certified healthcare providers</p>
            </div>
            <div className="hv-safety-item">
              <Thermometer size={24} />
              <h5>Health Screening</h5>
              <p>Daily health checks for all visiting professionals</p>
            </div>
            <div className="hv-safety-item">
              <Sparkles size={24} />
              <h5>Sanitized Equipment</h5>
              <p>All medical equipment properly sterilized</p>
            </div>
            <div className="hv-safety-item">
              <Phone size={24} />
              <h5>24/7 Support</h5>
              <p>Round-the-clock assistance for emergencies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVisit;