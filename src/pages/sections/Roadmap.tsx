import { TrendingUp, Globe, Zap, Brain, Watch, Dna, Smartphone } from 'lucide-react';
import '../Roadmap.css';

const Roadmap = () => {
  return (
    <section id="future-roadmap" className="future-roadmap-section py-5 animate-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-badge">FUTURE VISION</span>
          <h2 className="section-title mt-3">
            Shaping the Future of
            <span className="gradient-text d-block">Digital Healthcare</span>
          </h2>
          <p className="section-subtitle">
            Our ambitious roadmap to revolutionize global healthcare accessibility
          </p>
        </div>

        <div className="roadmap-container">
          <div className="roadmap-section vision-expansion">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="roadmap-content">
                  <h3 className="roadmap-title">
                    <TrendingUp className="me-2" size={28} />
                    Vision & Expansion
                  </h3>

                  <div className="timeline-container mt-4">
                    {[
                      { year: '2026', title: 'Foundation Year', desc: 'Launch core platform with 10K+ users', active: true },
                      { year: '2027', title: 'AI Integration', desc: 'Advanced diagnostics & predictive health', active: false },
                      { year: '2028', title: 'Global Expansion', desc: 'Launch in 15+ countries', active: false },
                      { year: '2029', title: 'Ecosystem Leader', desc: '1M+ active users, full health ecosystem', active: false },
                      { year: '2030', title: 'Healthcare Revolution', desc: 'Setting new standards in digital health', active: false }
                    ].map((item, i) => (
                      <div key={i} className={`timeline-item ${item.active ? 'active' : ''}`}>
                        <div className="timeline-year">{item.year}</div>
                        <div className="timeline-content">
                          <h5>{item.title}</h5>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="expansion-visuals">
                  <div className="expansion-card">
                    <h4><Globe className="me-2" size={24} />International Expansion</h4>
                    <div className="world-map-container">
                      <div className="map-stats">
                        <div className="stat-item">
                          <span className="stat-number">50+</span>
                          <span className="stat-label">Target Countries</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">25+</span>
                          <span className="stat-label">Languages</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">100M+</span>
                          <span className="stat-label">Potential Users</span>
                        </div>
                      </div>
                      <div className="region-list">
                        {[
                          { label: 'South Asia - Q1 2025', active: true },
                          { label: 'Southeast Asia - Q3 2025', active: false },
                          { label: 'Middle East - Q1 2026', active: false },
                          { label: 'Africa - Q3 2026', active: false }
                        ].map((region, i) => (
                          <div key={i} className={`region-item ${region.active ? 'active' : ''}`}>
                            <span className="region-dot"></span>
                            {region.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="feature-pipeline mt-4">
                    <h4><Zap className="me-2" size={24} />Upcoming Features</h4>
                    <div className="feature-cards">
                      {[
                        { icon: <Brain size={20} />, title: 'AI Health Assistant', desc: '24/7 personalized health companion', release: 'Q2 2025' },
                        { icon: <Watch size={20} />, title: 'Wearable Integration', desc: 'Real-time health monitoring', release: 'Q3 2025' },
                        { icon: <Dna size={20} />, title: 'Genomic Health', desc: 'Personalized medicine based on DNA', release: 'Q1 2026' },
                        { icon: <Smartphone size={20} />, title: 'AR Consultations', desc: 'Augmented reality medical exams', release: 'Q4 2026' }
                      ].map((card, i) => (
                        <div key={i} className="pipeline-card">
                          <div className="card-icon">{card.icon}</div>
                          <h6>{card.title}</h6>
                          <p>{card.desc}</p>
                          <span className="release-tag">{card.release}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;