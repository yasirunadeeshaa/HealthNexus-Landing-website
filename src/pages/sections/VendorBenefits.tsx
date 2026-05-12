import {
  Zap, Building, Users, Package, CreditCard, Activity, FileText, Stethoscope, BarChart,
  Shield, Cpu, AlertTriangle, Clock, CheckCircle, FileCheck, Building2, Database, Users2,
  DollarSign, Home, Wifi, Settings, Rocket
} from 'lucide-react';
import '../Benifits.css';

const VendorBenefits = () => {
  return (
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

        {/* Vendor Cards Grid */}
        <div className="vb-grid">
          {/* Pharmacies */}
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
                <div className="vb-benefit-icon"><Zap size={16} /></div>
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
                <div className="vb-benefit-icon"><Users size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Expanded Customer Base</h5>
                  <p>Access to 2M+ verified patients</p>
                  <div className="vb-progress">
                    <div className="vb-progress-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="vb-benefit-item">
                <div className="vb-benefit-icon"><Package size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Smart Inventory Management</h5>
                  <p>AI-powered demand forecasting</p>
                </div>
              </div>
              <div className="vb-benefit-item">
                <div className="vb-benefit-icon"><CreditCard size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Automated Payments</h5>
                  <p>Instant settlement & reconciliation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Labs */}
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
                <div className="vb-benefit-icon"><Home size={16} /></div>
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
                <div className="vb-benefit-icon"><FileText size={16} /></div>
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
                <div className="vb-benefit-icon"><Stethoscope size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Doctor Collaboration</h5>
                  <p>Direct consultations on results</p>
                </div>
              </div>
              <div className="vb-benefit-item">
                <div className="vb-benefit-icon"><BarChart size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Analytics Dashboard</h5>
                  <p>Test trends & demand insights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Providers */}
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
                <div className="vb-benefit-icon"><Cpu size={16} /></div>
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
                <div className="vb-benefit-icon"><AlertTriangle size={16} /></div>
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
                <div className="vb-benefit-icon"><CheckCircle size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Real-time Verification</h5>
                  <p>Instant eligibility checks</p>
                </div>
              </div>
              <div className="vb-benefit-item">
                <div className="vb-benefit-icon"><FileCheck size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Paperless Workflow</h5>
                  <p>100% digital documentation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hospitals & Clinics */}
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
                <div className="vb-benefit-icon"><Users size={16} /></div>
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
                <div className="vb-benefit-icon"><Database size={16} /></div>
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
                <div className="vb-benefit-icon"><Users2 size={16} /></div>
                <div className="vb-benefit-content">
                  <h5>Multi-doctor Coordination</h5>
                  <p>Seamless referral management</p>
                </div>
              </div>
              <div className="vb-benefit-item">
                <div className="vb-benefit-icon"><DollarSign size={16} /></div>
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
              <div className="vb-step-icon"><FileText size={20} /></div>
              <h5>Apply</h5>
              <p>Submit partnership application</p>
              <span className="vb-step-time">Day 1</span>
            </div>
            <div className="vb-process-connector"></div>
            <div className="vb-process-step vb-completed">
              <div className="vb-step-icon"><CheckCircle size={20} /></div>
              <h5>Verify</h5>
              <p>Quick verification process</p>
              <span className="vb-step-time">Day 2-3</span>
            </div>
            <div className="vb-process-connector"></div>
            <div className="vb-process-step vb-active">
              <div className="vb-step-icon"><Settings size={20} /></div>
              <h5>Integrate</h5>
              <p>API integration & setup</p>
              <span className="vb-step-time">Day 4-7</span>
            </div>
            <div className="vb-process-connector"></div>
            <div className="vb-process-step">
              <div className="vb-step-icon"><Rocket size={20} /></div>
              <h5>Launch</h5>
              <p>Go live & start growing</p>
              <span className="vb-step-time">Day 8</span>
            </div>
          </div>
        </div>
      </div>

      <div className="vb-bg-pattern">
        <div className="vb-pattern-circle vb-circle-1"></div>
        <div className="vb-pattern-circle vb-circle-2"></div>
        <div className="vb-pattern-circle vb-circle-3"></div>
      </div>
    </section>
  );
};

export default VendorBenefits;