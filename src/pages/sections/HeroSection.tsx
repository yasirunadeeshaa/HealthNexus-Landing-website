import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainImage from '../../assets/doctor1.jpg';
import {
  Calendar, Video, Zap, Clock
} from 'lucide-react';
import '../HeroSection.css';

const HeroSection = () => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-vh-100 position-relative overflow-hidden">

      {/* Animated Background */}
      <div className="position-fixed w-100 h-100" style={{ zIndex: -1 }}>
        <div className="floating-gradient gradient-1"></div>
        <div className="floating-gradient gradient-2"></div>
        <div className="floating-gradient gradient-3"></div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="hero-section position-relative">
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container-fluid px-4">
          <div className="row align-items-center min-vh-100 py-5">

            {/* ── Left column ── */}
          <div className="col-lg-6 hero-content">
            <div className="badge-wrapper mb-4">
              <span className="badge-gradient animated-badge">
                <Zap size={16} className="me-1 pulse-icon" />
                #1 AI-Powered Healthcare · 2028
              </span>
            </div>

            <h1 className="hero-titlee mb-4">
              Making Health
              <span className="gradient-textt d-block typing-text">
                Care Better Together
              </span>
            </h1>

            <p className="hero-description mb-4">
              Experience healthcare like never before. 
              A smart healthcare platform that connects patients with verified doctors,
              tracks health in real time, and uses AI to predict risks — all in one place.
            </p>

            <div className="hero-highlights">
              {[
                { icon: "🔐", color: "ic-purple", title: "Patient Profile Access Control",  desc: "Patients own who views their records — approve, revoke or limit per doctor" },
                { icon: "🧠", color: "ic-pink",   title: "AI Diabetes Prediction",   desc: "ML model forecasts risk at 3, 6 & 12 months using clinical & lifestyle data" },
                { icon: "📅", color: "ic-blue",   title: "Smart Appointments",       desc: "Real-time availability, booking, rescheduling and calendar sync" },
                { icon: "📊", color: "ic-green",  title: "Health Dashboard",         desc: "Vital signs, glucose trends and explainable AI insights in one view" },
              ].map((item, i) => (
                <div key={i} className="hl-card">
                  <div className={`hl-icon ${item.color}`}>{item.icon}</div>
                  <div>
                    <h6 className="hl-title">{item.title}</h6>
                    <small className="hl-desc">{item.desc}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Target Goals */}
            <div className="mb-2">
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#8896a8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                🎯 Platform Goals
              </span>
            </div>
            <div className="hero-stats-row">
              {[
                { num: "50K+",   label: "Target Patients"   },
                { num: "1,200+", label: "Doctor Capacity"   },
                { num: "98%",    label: "Satisfaction Goal" },
                { num: "<5 min", label: "Target Wait Time"  },
              ].map((s, i) => (
                <div key={i} className="hero-stat-item">
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="hero-proj-footer">
              <span className="proj-badge pb-fyp">🎓 Final Year Project</span>
              <span className="divider-dot" />
              <span className="proj-badge pb-ai">🤖 AI / ML Model</span>
              <span className="divider-dot" />
              <span className="proj-badge pb-fs">🌐 Web + Mobile Application</span>
            </div>

          </div>
            {/* ── Right column ── */}
            <div className="col-lg-6 hero-image-section">
              <div className="hero-visual-wrapper">
                <div className="device-mockup">
                  <div className="device-frame">
                    <div className="device-screen">
                      <img
                        src={mainImage}
                        alt="Healthcare Professional"
                        className="screen-image"
                      />
                    </div>
                  </div>
                </div>

                <div className="floating-elements">
                  {/* Doctor Card */}
                  <div className="floating-card card-doctor">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <img
                        src="https://i.pravatar.cc/60?img=12"
                        alt="Doctor"
                        className="doctor-avatar"
                      />
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
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
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

                  {/* Testimonial Card */}
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

                <div className="hero-ring ring-1"></div>
                <div className="hero-ring ring-2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;