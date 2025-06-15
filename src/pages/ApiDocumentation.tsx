import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Code, Calendar, Video, FileText, Activity, Shield, Zap, Globe, 
  FileCode, Book, Github, Download, MessageSquare, BarChart, 
  CheckCircle, TrendingDown, TrendingUp, Server, AlertTriangle,
  Cpu, Coffee, Database, Cloud, Lock, Wifi, Package, Layers,
  Play, ArrowLeft,
} from 'lucide-react';
import './ApiDocumentation.css'; // Create this CSS file

const ApiDocumentation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="api-docs-page">
      {/* Navigation Bar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <ArrowLeft className="me-2" size={24} />
            Back to Home
          </a>
          
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#api-explorer">API Explorer</a>
            <a className="nav-link" href="#performance">Performance</a>
            <a className="nav-link" href="#documentation">Docs</a>
          </div>
        </div>
      </nav>
<section id="technical-demo" className="td-section py-5 animate-section">
  <div className="container py-5">
    <div className="text-center mb-5">
      <span className="td-section-badge">TECHNICAL EXCELLENCE</span>
      <h2 className="td-section-title mt-3">
        Enterprise-Grade
        <span className="td-gradient-text d-block">Technical Infrastructure</span>
      </h2>
      <p className="td-section-subtitle">
        Built with cutting-edge technology for scalability, security, and performance
      </p>
    </div>

    <div className="td-api-section mb-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="td-api-explorer">
            <div className="td-api-header">
              <h3 className="td-api-title">
                <Code className="me-2" size={24} />
                Interactive API Explorer
              </h3>
              <div className="td-api-version">
                <span className="td-version-badge">v1.0</span>
                <span className="td-status-indicator">
                  <span className="td-status-dot"></span>
                  Live
                </span>
              </div>
            </div>

            {/* <!-- API Endpoint Tabs --> */}
            <div className="td-endpoint-tabs">
              <button className="td-tab-btn td-active" data-endpoint="appointments">
                <Calendar size={16} />
                Appointments
              </button>
              <button className="td-tab-btn" data-endpoint="consultations">
                <Video size={16} />
                Consultations
              </button>
              <button className="td-tab-btn" data-endpoint="prescriptions">
                <FileText size={16} />
                Prescriptions
              </button>
              <button className="td-tab-btn" data-endpoint="health">
                <Activity size={16} />
                Health Records
              </button>
            </div>

            {/* <!-- API Explorer Content --> */}
            <div className="td-api-content">
              {/* <!-- Request Builder --> */}
              <div className="td-request-builder">
                <div className="td-method-url">
                  <span className="td-method td-post">POST</span>
                  <input type="text" className="td-url-input" value="/api/v1/appointments" readOnly />
                  <button className="td-try-btn">
                    <Play size={16} />
                    Try it
                  </button>
                </div>

                {/* <!-- Request Headers --> */}
                <div className="td-request-section">
                  <h5 className="td-section-label">Headers</h5>
                  <div className="td-headers-list">
                    <div className="td-header-item">
                      <span className="td-header-key">Authorization</span>
                      <span className="td-header-value">Bearer eyJhbGciOiJIUzI1NiIs...</span>
                    </div>
                    <div className="td-header-item">
                      <span className="td-header-key">Content-Type</span>
                      <span className="td-header-value">application/json</span>
                    </div>
                  </div>
                </div>

                {/* <!-- Request Body --> */}
                <div className="td-request-section">
                  <h5 className="td-section-label">Request Body</h5>
                  <div className="td-code-editor">
                    <pre className="td-code-block"><code>{`{
  "doctorId": "doc123",
  "patientId": "patient456",
  "appointmentDate": "2024-12-25",
  "slotId": "slot123",
  "consultationType": "VIDEO",
  "reasonForVisit": "Regular checkup",
  "symptoms": ["Chest pain", "Shortness of breath"],
  "severity": "MODERATE"
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* <!-- Response Preview --> */}
              <div className="td-response-preview">
                <div className="td-response-header">
                  <h5 className="td-section-label">Response</h5>
                  <div className="td-response-meta">
                    <span className="td-status-code td-success">200 OK</span>
                    <span className="td-response-time">124ms</span>
                  </div>
                </div>
                <div className="td-code-editor">
                  <pre className="td-code-block"><code>{`{
  "success": true,
  "data": {
    "appointmentId": "apt789",
    "bookingReference": "APT-2024-789",
    "status": "CONFIRMED",
    "doctor": {
      "id": "doc123",
      "name": "Dr. Sarah Johnson",
      "specialization": "Cardiology"
    },
    "scheduledTime": {
      "date": "2024-12-25",
      "startTime": "09:00",
      "endTime": "09:30"
    }
  }
}`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* <!-- API Features Sidebar --> */}
          <div className="td-api-features">
            <h4 className="td-features-title">API Features</h4>
            
            <div className="td-feature-card">
              <div className="td-feature-icon">
                <Shield size={20} />
              </div>
              <div className="td-feature-content">
                <h6>JWT Authentication</h6>
                <p>Secure token-based auth with refresh tokens</p>
              </div>
            </div>

            <div className="td-feature-card">
              <div className="td-feature-icon">
                <Zap size={20} />
              </div>
              <div className="td-feature-content">
                <h6>Real-time WebSocket</h6>
                <p>Live updates for appointments & consultations</p>
              </div>
            </div>

            <div className="td-feature-card">
              <div className="td-feature-icon">
                <Globe size={20} />
              </div>
              <div className="td-feature-content">
                <h6>RESTful Design</h6>
                <p>Clean, intuitive API following best practices</p>
              </div>
            </div>

            <div className="td-feature-card">
              <div className="td-feature-icon">
                <FileCode size={20} />
              </div>
              <div className="td-feature-content">
                <h6>SDK Support</h6>
                <p>Available in JS, Python, Java, PHP</p>
              </div>
            </div>

            {/* <!-- Developer Resources --> */}
            <div className="td-dev-resources">
              <h5>Developer Resources</h5>
              <a href="#" className="td-resource-link">
                <Book size={16} />
                Full API Documentation
              </a>
              <a href="#" className="td-resource-link">
                <Github size={16} />
                GitHub Repository
              </a>
              <a href="#" className="td-resource-link">
                <Download size={16} />
                Download SDK
              </a>
              <a href="#" className="td-resource-link">
                <MessageSquare size={16} />
                Developer Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* <!-- Performance Metrics --> */}
    <div className="td-performance-section">
      <h3 className="td-section-heading text-center mb-4">
        <BarChart size={28} className="me-2" />
        Performance Metrics & Reliability
      </h3>

      <div className="row g-4">
        {/* <!-- Uptime Stats --> */}
        <div className="col-lg-3 col-md-6">
          <div className="td-metric-card td-uptime">
            <div className="td-metric-icon">
              <Activity size={24} />
            </div>
            <div className="td-metric-content">
              <h4 className="td-metric-value">99.95%</h4>
              <p className="td-metric-label">Uptime SLA</p>
              <div className="td-metric-chart">
                <div className="td-uptime-bars">
                  {[100, 99.9, 100, 99.8, 100, 100, 99.9].map((val, i) => (
                    <div key={i} className="td-bar" style={{height: `${val}%`}}></div>
                  ))}
                </div>
                <span className="td-chart-label">Last 7 days</span>
              </div>
            </div>
            <div className="td-metric-footer">
              <CheckCircle size={16} className="text-success me-1" />
              <span>No downtime in 30 days</span>
            </div>
          </div>
        </div>

        {/* <!-- Response Time --> */}
        <div className="col-lg-3 col-md-6">
          <div className="td-metric-card td-response">
            <div className="td-metric-icon">
              <Zap size={24} />
            </div>
            <div className="td-metric-content">
              <h4 className="td-metric-value">124ms</h4>
              <p className="td-metric-label">Avg Response Time</p>
              <div className="td-response-breakdown">
                <div className="td-response-item">
                  <span className="td-endpoint-name">GET /users</span>
                  <span className="td-time">89ms</span>
                </div>
                <div className="td-response-item">
                  <span className="td-endpoint-name">POST /appointments</span>
                  <span className="td-time">124ms</span>
                </div>
                <div className="td-response-item">
                  <span className="td-endpoint-name">GET /doctors</span>
                  <span className="td-time">156ms</span>
                </div>
              </div>
            </div>
            <div className="td-metric-footer">
              <TrendingDown size={16} className="text-success me-1" />
              <span>15% faster than last month</span>
            </div>
          </div>
        </div>

        {/* <!-- API Calls --> */}
        <div className="col-lg-3 col-md-6">
          <div className="td-metric-card td-api-calls">
            <div className="td-metric-icon">
              <Server size={24} />
            </div>
            <div className="td-metric-content">
              <h4 className="td-metric-value">2.5M</h4>
              <p className="td-metric-label">API Calls/Day</p>
              <div className="td-traffic-graph">
                <svg viewBox="0 0 100 40" className="td-graph">
                  <polyline
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    points="0,30 20,25 40,20 60,15 80,10 100,5"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="td-metric-footer">
              <TrendingUp size={16} className="text-success me-1" />
              <span>Growing 20% monthly</span>
            </div>
          </div>
        </div>

        {/* <!-- Error Rate --> */}
        <div className="col-lg-3 col-md-6">
          <div className="td-metric-card td-error-rate">
            <div className="td-metric-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="td-metric-content">
              <h4 className="td-metric-value">0.02%</h4>
              <p className="td-metric-label">Error Rate</p>
              <div className="td-error-types">
                <div className="td-error-item">
                  <span className="td-error-code">4xx</span>
                  <div className="td-error-bar">
                    <div className="td-error-fill" style={{width: '30%'}}></div>
                  </div>
                  <span className="td-error-percent">0.015%</span>
                </div>
                <div className="td-error-item">
                  <span className="td-error-code">5xx</span>
                  <div className="td-error-bar">
                    <div className="td-error-fill td-error-500" style={{width: '10%'}}></div>
                  </div>
                  <span className="td-error-percent">0.005%</span>
                </div>
              </div>
            </div>
            <div className="td-metric-footer">
              <Shield size={16} className="text-success me-1" />
              <span>Industry-leading reliability</span>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Load Testing Results --> */}
      <div className="td-load-testing mt-5">
        <h4 className="td-subsection-title">
          <Cpu size={20} className="me-2" />
          Load Testing Results
        </h4>
        
        <div className="row g-4 mt-3">
          <div className="col-md-6">
            <div className="td-load-card">
              <h5>Concurrent Users Test</h5>
              <div className="td-load-stats">
                <div className="td-load-item">
                  <span className="td-load-label">Peak Concurrent Users</span>
                  <span className="td-load-value">50,000</span>
                </div>
                <div className="td-load-item">
                  <span className="td-load-label">Avg Response Time</span>
                  <span className="td-load-value">245ms</span>
                </div>
                <div className="td-load-item">
                  <span className="td-load-label">Success Rate</span>
                  <span className="td-load-value">99.98%</span>
                </div>
              </div>
              <div className="td-load-graph">
                <div className="td-graph-placeholder">
                  <span>Response Time vs Concurrent Users</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="td-load-card">
              <h5>Stress Test Results</h5>
              <div className="td-stress-results">
                <div className="td-stress-item">
                  <div className="td-stress-header">
                    <span>Normal Load (1K users)</span>
                    <span className="td-stress-status td-pass">PASS</span>
                  </div>
                  <div className="td-progress-bar">
                    <div className="td-progress-fill" style={{width: '100%'}}></div>
                  </div>
                </div>
                <div className="td-stress-item">
                  <div className="td-stress-header">
                    <span>High Load (10K users)</span>
                    <span className="td-stress-status td-pass">PASS</span>
                  </div>
                  <div className="td-progress-bar">
                    <div className="td-progress-fill" style={{width: '100%'}}></div>
                  </div>
                </div>
                <div className="td-stress-item">
                  <div className="td-stress-header">
                    <span>Peak Load (50K users)</span>
                    <span className="td-stress-status td-pass">PASS</span>
                  </div>
                  <div className="td-progress-bar">
                    <div className="td-progress-fill" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Technology Stack --> */}
      <div className="td-tech-stack mt-5">
        <h4 className="td-subsection-title text-center mb-4">
          <Layers size={20} className="me-2" />
          Technology Stack
        </h4>
        
        <div className="td-tech-grid">
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Coffee size={32} />
            </div>
            <span>Spring Boot</span>
          </div>
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Database size={32} />
            </div>
            <span>PostgreSQL</span>
          </div>
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Cloud size={32} />
            </div>
            <span>AWS</span>
          </div>
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Lock size={32} />
            </div>
            <span>JWT Auth</span>
          </div>
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Wifi size={32} />
            </div>
            <span>WebSocket</span>
          </div>
          <div className="td-tech-item">
            <div className="td-tech-logo">
              <Package size={32} />
            </div>
            <span>Docker</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default ApiDocumentation;