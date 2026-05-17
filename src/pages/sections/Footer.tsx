import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  GraduationCap,
} from "lucide-react";

import logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { label: "AI Diabetes Prediction", href: "#" },
      { label: "Smart Appointments", href: "#" },
      { label: "Health Dashboard", href: "#" },
      { label: "Patient Profile Control", href: "#" },
      { label: "Doctor Portal", href: "#" },
    ],
    project: [
      { label: "About the Project", href: "#" },
      { label: "Tech Stack", href: "#" },
      { label: "ML Model Details", href: "#" },
      { label: "Research Paper", href: "#" },
      { label: "GitHub Repository", href: "#" },
    ],
    team: [
      { label: "Meet the Team", href: "#" },
      { label: "Supervisor", href: "#" },
      { label: "Acknowledgements", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  };

  const socials = [
    { icon: <Github size={18} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  ];

  const techStack = ["React", "Spring Boot", "Python", "TensorFlow", "MySQL"];

  return (
    <>
      <style>{`
        .f-section {
          position: relative;
          background: linear-gradient(180deg, #f8f6ff 0%, #f0eeff 40%, #e8e4ff 100%);
          overflow: hidden;
          font-family: inherit;
        }
        .f-section::before {
          content: '';
          position: absolute;
          top: -200px; left: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .f-section::after {
          content: '';
          position: absolute;
          bottom: -150px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(240,147,251,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .f-top-border {
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%, #667eea 20%, #764ba2 40%,
            #f093fb 60%, #4facfe 80%, transparent 100%);
        }

        /* ── Main grid ── */
        .f-main { padding: 40px 0 32px; position: relative; z-index: 1; }
        .f-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.1fr;
          gap: 40px;
        }

        /* ── Brand ── */
        .f-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .f-logo-icon {
          width: 50px; height: 40px; border-radius: 1px;
          background: white;
          border: 1.5px solid rgba(102,126,234,0.2);
          box-shadow: 6px 6px 20px rgba(102,126,234,0.5);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          padding: 4px;
        }
        .f-logo-img {
          width: 100%; height: 100%;
          object-fit: contain;
        }
        .f-logo-text {
          font-size: 1.4rem; font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        /* ── Student intro card ── */
        .f-student-card {
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(102,126,234,0.15);
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(6px);
        }
        .f-student-name {
          font-size: 0.95rem; font-weight: 700; color: #2d3748;
          margin: 0 0 2px;
        }
        .f-student-role {
          font-size: 0.775rem; font-weight: 600;
          color: #667eea; margin: 0 0 10px;
          display: flex; align-items: center; gap: 5px;
        }
        .f-student-desc {
          font-size: 0.8rem; color: #64748b; line-height: 1.7; margin: 0;
        }

        .f-contact-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .f-contact-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.8125rem; color: #64748b; transition: color 0.2s;
        }
        .f-contact-item:hover { color: #667eea; }
        .f-contact-icon { color: #667eea; flex-shrink: 0; display: flex; }

        /* ── Link columns ── */
        .f-col-title {
          font-size: 0.8125rem; font-weight: 700; color: #2d3748;
          text-transform: uppercase; letter-spacing: 1px;
          margin: 0 0 18px; position: relative; padding-bottom: 12px;
        }
        .f-col-title::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 28px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #667eea, #f093fb);
        }
        .f-link-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .f-link {
          font-size: 0.875rem; color: #64748b; text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s ease; padding: 3px 0;
        }
        .f-link-arrow {
          font-size: 12px; opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease; color: #667eea;
        }
        .f-link:hover { color: #667eea; }
        .f-link:hover .f-link-arrow { opacity: 1; transform: translateX(0); }

        /* ── Tech badges ── */
        .f-tech-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .f-tech-badge {
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 20px;
          background: rgba(102,126,234,0.1); color: #4c35a0;
          border: 1px solid rgba(102,126,234,0.2);
          transition: all 0.2s; cursor: default;
        }
        .f-tech-badge:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white; border-color: transparent;
        }

        /* ── Socials (now in bottom bar) ── */
        .f-socials { display: flex; gap: 8px; }
        .f-social-btn {
          width: 32px; height: 32px; border-radius: 10px;
          background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(102,126,234,0.2);
          color: #667eea;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: all 0.25s ease;
        }
        .f-social-btn:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white; border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102,126,234,0.35);
        }

        /* ── Bottom bar ── */
        .f-bottom {
          border-top: 1px solid rgba(102,126,234,0.12);
          padding: 16px 0; position: relative; z-index: 1;
          margin-top: -50px;
        }
        .f-bottom-inner {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .f-bottom-left, .f-bottom-right {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .f-proj-tag { font-size: 12px; font-weight: 600; color: #64748b; }
        .f-bottom-right { font-size: 12px; color: #8896a8; }
        .f-bottom-link {
          font-size: 12px; color: #667eea;
          text-decoration: none; transition: opacity 0.2s;
        }
        .f-bottom-link:hover { opacity: 0.7; }
        .f-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #cbd5e0; display: inline-block;
        }
        .f-mt { margin-top: 28px; }

        /* ── Download column ── */
        .f-coming-soon-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700;
          padding: 5px 12px; border-radius: 20px;
          background: linear-gradient(135deg, rgba(102,126,234,0.12), rgba(240,147,251,0.12));
          color: #667eea;
          border: 1.5px solid rgba(102,126,234,0.25);
          margin-bottom: 14px;
          letter-spacing: 0.4px;
        }
        .f-coming-soon-badge::before {
          content: '';
          width: 7px; height: 7px; border-radius: 50%;
          background: #667eea;
          animation: f-blink 1.5s ease-in-out infinite;
        }
        @keyframes f-blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        .f-app-desc {
          font-size: 0.8rem; color: #8896a8; line-height: 1.6; margin-bottom: 16px;
        }
        .f-app-btn-wrap { display: flex; flex-direction: column; gap: 10px; }
        .f-app-btn {
          position: relative;
          display: block;
          border-radius: 6px;
          overflow: hidden;
          filter: grayscale(30%);
          cursor: not-allowed;
          transition: opacity 0.2s;
        }
        .f-app-btn:hover { opacity: 0.65; }
        .f-app-btn img { display: block; width: 148px; height: auto; }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .f-grid { grid-template-columns: 2fr 1fr 1fr; gap: 32px; }
          .f-col-last, .f-download-col { grid-column: auto; }
        }
        @media (max-width: 1100px) {
          .f-grid { grid-template-columns: 1.5fr 1fr 1fr; gap: 36px; }
          .f-col-last { grid-column: 1 / -1; }
        }
        @media (max-width: 992px) {
          .f-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .f-brand-col { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .f-grid { grid-template-columns: 1fr; gap: 28px; }
          .f-bottom-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>

      <footer className="f-section">
        <div className="f-top-border" />

        {/* ── Main content ── */}
        <div className="f-main">
          <div className="container">
            <div className="f-grid">
              {/* Brand */}
              <div className="f-brand-col">
                <div className="f-logo">
                  <div className="f-logo-icon">
                    <img
                      src={logo}
                      alt="HealthNexus logo"
                      style={{
                        width: "28px",
                        height: "28px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <span className="f-logo-text">HealthNexus</span>
                </div>

                {/* ── Student intro card ── */}
                <div className="f-student-card">
                  <p className="f-student-name">
                    A. Yasiru Nadeesha Aththanayaka
                  </p>
                  <p className="f-student-role">
                    <GraduationCap size={13} />
                    Software Engineering Student · Final Year Project
                  </p>
                  <p className="f-student-desc">
                    I am a Software Engineering student at the University of
                    Westminster, and HealthNexus is my Final Year Project an
                    AI-powered healthcare application redefining digital
                    healthcare by connecting patients with verified doctors,
                    predicting risks with AI, and putting health data control
                    back in your hands.
                  </p>
                </div>

                {/* Contact details */}
                <div className="f-contact-list">
                  {[
                    {
                      icon: <Mail size={15} />,
                      text: "W2054011@westminster.ac.uk",
                    },
                    { icon: <Phone size={15} />, text: "+94 76 287 3746" },
                    {
                      icon: <GraduationCap size={15} />,
                      text: "University of Westminster, UK",
                    },
                    {
                      icon: <GraduationCap size={15} />,
                      text: "BEng (Hons) Software Engineering",
                    },
                  ].map((c, i) => (
                    <div key={i} className="f-contact-item">
                      <span className="f-contact-icon">{c.icon}</span>
                      {c.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <h5 className="f-col-title">Platform</h5>
                <ul className="f-link-list">
                  {links.platform.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="f-link">
                        <span className="f-link-arrow">→</span>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project */}
              <div>
                <h5 className="f-col-title">Project</h5>
                <ul className="f-link-list">
                  {links.project.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="f-link">
                        <span className="f-link-arrow">→</span>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team + Tech */}
              <div className="f-col-last">
                <h5 className="f-col-title">Team</h5>
                <ul className="f-link-list">
                  {links.team.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="f-link">
                        <span className="f-link-arrow">→</span>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <h5 className="f-col-title f-mt">Built With</h5>
                <div className="f-tech-badges">
                  {techStack.map((t) => (
                    <span key={t} className="f-tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download */}
              <div className="f-download-col">
                <h5 className="f-col-title">Download</h5>
                <div className="f-coming-soon-badge">Coming Soon</div>
                <p className="f-app-desc">
                  HealthNexus mobile app is on its way launching on both
                  platforms upon project completion.
                </p>
                <div className="f-app-btn-wrap">
                  <div className="f-app-btn">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                    />
                  </div>
                  <div className="f-app-btn">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="f-bottom">
          <div className="container">
            <div className="f-bottom-inner">
              <div className="f-bottom-left">
                <span className="f-proj-tag">🎓 Final Year Project</span>
                <span className="f-dot" />
                <span className="f-proj-tag">🤖 AI / ML</span>
                <span className="f-dot" />
                <span className="f-proj-tag">🌐 Web + Mobile</span>
              </div>
              <div className="f-socials">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="f-social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="f-bottom-right">
                <span>© {currentYear} HealthNexus · All rights reserved</span>
                <span className="f-dot" />
                <a href="#" className="f-bottom-link">
                  Privacy Policy
                </a>
                <span className="f-dot" />
                <a href="#" className="f-bottom-link">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
