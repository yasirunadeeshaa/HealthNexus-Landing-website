import { Check, HeartHandshake, Stethoscope, Clock, DollarSign, Globe, Shield, Heart, Users, TrendingUp, BarChart, FileText, Award } from 'lucide-react';
import '../Benifits.css';

interface VisibleSections {
  [key: string]: boolean;
}

interface BenefitsProps {
  isVisible: VisibleSections;
}

const patientBenefits = [
  { icon: <Clock />, title: "Save Time", description: "No more waiting rooms - consult from anywhere" },
  { icon: <DollarSign />, title: "Cost Effective", description: "Lower consultation fees and zero travel costs" },
  { icon: <Globe />, title: "Global Access", description: "Connect with specialists worldwide" },
  { icon: <Shield />, title: "Privacy First", description: "Your health data is encrypted and secure" },
  { icon: <Heart />, title: "Continuous Care", description: "24/7 health monitoring and support" },
  { icon: <Users />, title: "Family Health", description: "Manage health for your entire family" }
];

const doctorBenefits = [
  { icon: <TrendingUp />, title: "Grow Practice", description: "Reach more patients and increase revenue by 45%" },
  { icon: <Clock />, title: "Time Efficient", description: "Reduce admin work by 60% with automation" },
  { icon: <BarChart />, title: "Analytics Dashboard", description: "Track performance and patient satisfaction" },
  { icon: <Globe />, title: "Flexible Hours", description: "Work from anywhere at your convenience" },
  { icon: <FileText />, title: "Smart Tools", description: "AI-assisted diagnosis and prescription" },
  { icon: <Award />, title: "Professional Growth", description: "CME credits and learning opportunities" }
];

const Benefits = ({ isVisible }: BenefitsProps) => {
  return (
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
                <li
                  key={idx}
                  className={`benefit-item ${isVisible.benefits ? 'fade-in-left' : ''}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="benefit-check"><Check size={16} /></div>
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
                <li
                  key={idx}
                  className={`benefit-item ${isVisible.benefits ? 'fade-in-right' : ''}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="benefit-check"><Check size={16} /></div>
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
  );
};

export default Benefits;