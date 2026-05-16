import React from 'react';

/* ─── Design tokens ─── */
const T = {
  teal:   '#0d7a5f',
  tealL:  'rgba(13,122,95,.12)',
  blue:   '#1a5fa8',
  blueL:  'rgba(26,95,168,.12)',
  amber:  '#b85e0c',
  amberL: 'rgba(184,94,12,.15)',
  red:    '#d94f4f',
  redL:   'rgba(217,79,79,.12)',
  purple: '#6b3fa0',
  purpleL:'rgba(107,63,160,.12)',
  grad:   'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
} as const;

/* ─── Inline styles ─── */
const S: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: '#fafbfc',
    color: '#1a202c',
    width: '100%',
  },
  hero: {
    background: T.grad,
    padding: '64px 48px 56px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroEye: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.30)',
    color: '#fff',
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '6px 20px',
    borderRadius: '50px',
    marginBottom: '24px',
  },
  heroH1: {
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.15,
    letterSpacing: '-1px',
    margin: '0 0 18px',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: '1rem',
    maxWidth: '640px',
    margin: '0 auto 36px',
    lineHeight: 1.7,
  },
  statStrip: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statCell: {
    background: 'rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '16px',
    padding: '16px 28px',
    minWidth: '110px',
  },
  statV: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1,
  },
  statL: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.72)',
    fontWeight: 600,
    letterSpacing: '0.5px',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px 64px',
  },
  sectionHd: {
    marginBottom: '28px',
  },
  eyebrow: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: T.teal,
    marginBottom: '6px',
  },
  h2: {
    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
    fontWeight: 800,
    color: '#1a202c',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    margin: '0',
  },
  h2Span: {
    background: T.grad,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(13,122,95,0.2), transparent)',
    margin: '36px 0',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  grid5: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    border: '1px solid rgba(13,122,95,0.08)',
  },
  modelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '8px',
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
  },
  modelName: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a202c',
  },
  modelRole: {
    fontSize: '0.75rem',
    color: '#718096',
    marginTop: '2px',
  },
  badgePrimary: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: T.grad,
    color: '#fff',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  badgeSecondary: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: '#edf2f7',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  badgeXai: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: T.purpleL,
    color: T.purple,
    border: '1px solid rgba(107,63,160,0.2)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  subLabel: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    color: '#9a9790',
    marginBottom: '10px',
    marginTop: '0',
  },
  challengeRow: {
    display: 'flex',
    gap: '14px',
    padding: '16px 18px',
    borderRadius: '14px',
    marginBottom: '12px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  challengeIcon: {
    fontSize: '1.4rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  challengeTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '4px',
  },
  challengeDesc: {
    fontSize: '0.75rem',
    color: '#718096',
    lineHeight: 1.6,
  },
  viewMoreBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: T.grad,
    color: '#fff',
    fontSize: '0.88rem',
    fontWeight: 700,
    padding: '14px 32px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 15px rgba(13,122,95,0.4)',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  viewMoreWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(13,122,95,0.12)',
  },
};

/* ─── Model row ─── */
interface ModelRowProps { name: string; role: string; badge: string; variant?: 'primary' | 'xai' | 'secondary'; }
const ModelRow: React.FC<ModelRowProps> = ({ name, role, badge, variant = 'primary' }) => (
  <div style={S.modelRow}>
    <div>
      <div style={S.modelName}>{name}</div>
      <div style={S.modelRole}>{role}</div>
    </div>
    <span style={variant === 'primary' ? S.badgePrimary : variant === 'xai' ? S.badgeXai : S.badgeSecondary}>
      {badge}
    </span>
  </div>
);

/* ─── Disease card ─── */
interface DiseaseCardProps { icon: string; name: string; color: string; bg: string; border: string; }
const DiseaseCard: React.FC<DiseaseCardProps> = ({ icon, name, color, bg, border }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 12px',
    borderRadius: '14px',
    background: bg,
    border: `1px solid ${border}`,
    textAlign: 'center',
  }}>
    <span style={{ fontSize: '1.6rem' }}>{icon}</span>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, color, letterSpacing: '0.3px' }}>{name}</span>
  </div>
);

/* ─── Feature tag helper ─── */
const featureTagStyle = (color: string, bg: string, border: string): React.CSSProperties => ({
  display: 'inline-block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color,
  background: bg,
  border: `1px solid ${border}`,
  borderRadius: '8px',
  padding: '5px 11px',
  margin: '3px',
});

/* ─── Section label ─── */
const SectionLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ ...S.subLabel, ...style }}>{children}</p>
);

/* ─── Main component ─── */
interface Props { onViewMore?: (id: string) => void; }

const DiseaseRiskPredictionSection: React.FC<Props> = ({ onViewMore }) => {
  const handleViewMore = () => {
    if (onViewMore) onViewMore('disease-risk');
    else window.location.href = '/ai-models/disease-risk-prediction';
  };

  const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(13,122,95,0.5)';
  };
  const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(13,122,95,0.4)';
  };

  return (
    <section id="ai-disease-risk-section" style={S.root}>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroEye}>HealthNexus · AI Model 02</div>
        <h1 style={S.heroH1}>Explainable Disease<br />Risk Prediction System</h1>
        <p style={S.heroSub}>
          A multi-disease AI prediction engine using clinical, demographic, and lifestyle data
          to assess risk for diabetes, heart disease, kidney disease, stroke, and hypertension —
          with full SHAP/LIME explainability and real-time decision support.
        </p>
        <div style={S.statStrip}>
          {[
            { v: '5',         l: 'Diseases Covered' },
            { v: 'XAI',       l: 'Explainable AI' },
            { v: 'Real-Time', l: 'Prediction API' },
            { v: 'SHAP',      l: 'Feature Insights' },
          ].map(s => (
            <div style={S.statCell} key={s.l}>
              <div style={S.statV}>{s.v}</div>
              <div style={S.statL}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.page}>

        {/* Diseases predicted */}
        <div style={{ marginBottom: '8px' }}>
          <div style={S.sectionHd}>
            <div style={S.eyebrow}>Multi-Disease Coverage</div>
            <h2 style={S.h2}>Conditions <span style={S.h2Span}>Predicted by the System</span></h2>
          </div>
          <div style={S.grid5}>
            <DiseaseCard icon="🩸" name="Diabetes"       color={T.blue}   bg={T.blueL}   border="rgba(26,95,168,.2)" />
            <DiseaseCard icon="❤️"  name="Heart Disease"  color={T.red}    bg={T.redL}    border="rgba(217,79,79,.2)" />
            <DiseaseCard icon="🫘" name="Kidney Disease"  color={T.teal}   bg={T.tealL}   border="rgba(13,122,95,.2)" />
            <DiseaseCard icon="🧠" name="Stroke Risk"     color={T.purple} bg={T.purpleL} border="rgba(107,63,160,.2)" />
            <DiseaseCard icon="💢" name="Hypertension"    color={T.amber}  bg={T.amberL}  border="rgba(184,94,12,.2)" />
          </div>
        </div>

        <div style={S.divider} />

        {/* AI Models */}
        <div style={{ marginBottom: '8px' }}>
          <div style={S.sectionHd}>
            <div style={S.eyebrow}>AI Models</div>
            <h2 style={S.h2}>Proposed <span style={S.h2Span}>Model Architecture</span></h2>
          </div>
          <div style={S.grid2}>
            <div>
              <SectionLabel>Traditional ML models</SectionLabel>
              <ModelRow name="Random Forest"       role="Primary multi-disease risk classifier"         badge="Primary"       variant="primary" />
              <ModelRow name="XGBoost"             role="High-performance gradient boosting"             badge="Primary"       variant="primary" />
              <ModelRow name="LightGBM"            role="Fast, memory-efficient boosting"                badge="Ensemble"      variant="primary" />
              <ModelRow name="Logistic Regression" role="Interpretable clinical baseline"                badge="Baseline"      variant="secondary" />

              <SectionLabel style={{ marginTop: '16px' }}>Deep learning</SectionLabel>
              <ModelRow name="ANN / MLP" role="Multilayer perceptron for non-linear patterns" badge="Deep Learning" variant="secondary" />

              <SectionLabel style={{ marginTop: '16px' }}>Explainability</SectionLabel>
              <ModelRow name="SHAP" role="Global & local feature attribution per disease" badge="XAI" variant="xai" />
              <ModelRow name="LIME" role="Local surrogate model explanations"              badge="XAI" variant="xai" />
            </div>

            <div>
              <SectionLabel>Input features</SectionLabel>

              {/* Clinical */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical</div>
                <div>
                  {['Blood Pressure', 'Glucose', 'Cholesterol', 'Creatinine'].map(f => (
                    <span key={f} style={featureTagStyle(T.teal, T.tealL, 'rgba(13,122,95,.2)')}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Demographic */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.blue, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Demographic</div>
                <div>
                  {['Age', 'Gender', 'BMI', 'BMI Category'].map(f => (
                    <span key={f} style={featureTagStyle(T.blue, T.blueL, 'rgba(26,95,168,.2)')}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Lifestyle */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.amber, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lifestyle</div>
                <div>
                  {['Smoking', 'Exercise', 'Sleep Quality', 'Alcohol'].map(f => (
                    <span key={f} style={featureTagStyle(T.amber, T.amberL, 'rgba(184,94,12,.2)')}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Derived */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.purple, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Derived</div>
                <div>
                  {['Risk Scores', 'BMI Category'].map(f => (
                    <span key={f} style={featureTagStyle(T.purple, T.purpleL, 'rgba(107,63,160,.2)')}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={S.divider} />

        {/* System capabilities */}
        <div style={{ marginBottom: '8px' }}>
          <div style={S.sectionHd}>
            <div style={S.eyebrow}>Technical Contributions</div>
            <h2 style={S.h2}>Core <span style={S.h2Span}>System Capabilities</span></h2>
          </div>
          <div style={S.grid2}>
            {([
              { icon: '🔬', title: 'Risk Prediction Pipeline',     desc: 'End-to-end ML pipeline classifying risk level for 5 diseases from a single patient health profile.' },
              { icon: '📊', title: 'Explainable AI Dashboard',     desc: 'SHAP-powered feature importance visualizations showing which clinical or lifestyle factors drive each prediction.' },
              { icon: '⚡', title: 'Real-Time Prediction API',     desc: 'FastAPI backend serving instant risk scores for integration into doctor dashboards and patient portals.' },
              { icon: '💡', title: 'Personalised Recommendations', desc: 'Auto-generates targeted health recommendations based on the top risk-driving features per patient.' },
            ] as const).map(c => (
              <div key={c.title} style={S.challengeRow}>
                <div style={S.challengeIcon}>{c.icon}</div>
                <div>
                  <div style={S.challengeTitle}>{c.title}</div>
                  <div style={S.challengeDesc}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.divider} />

        {/* Datasets */}
        <div style={{ marginBottom: '8px' }}>
          <div style={S.sectionHd}>
            <div style={S.eyebrow}>Datasets</div>
            <h2 style={S.h2}>Candidate <span style={S.h2Span}>Dataset Strategy</span></h2>
          </div>
          <div style={S.card}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg,rgba(13,122,95,.08),rgba(26,95,168,.08))' }}>
                  {(['Dataset', 'Target Disease', 'Type'] as const).map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  { name: 'UCI Heart Disease',  disease: 'Heart Disease',  type: 'Clinical',     tc: T.red,    tb: T.redL },
                  { name: 'PIMA Diabetes',      disease: 'Diabetes',       type: 'Clinical',     tc: T.blue,   tb: T.blueL },
                  { name: 'CKD Dataset',        disease: 'Kidney Disease', type: 'Clinical',     tc: T.teal,   tb: T.tealL },
                  { name: 'Framingham Dataset', disease: 'Stroke & CVD',   type: 'Longitudinal', tc: T.purple, tb: T.purpleL },
                ] as const).map((d, i) => (
                  <tr key={d.name} style={{ borderBottom: i < 3 ? '1px solid #f0f4f8' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1a202c' }}>{d.name}</td>
                    <td style={{ padding: '12px 16px', color: '#4a5568' }}>{d.disease}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '50px', background: d.tb, color: d.tc, border: `1px solid ${d.tc}33` }}>
                        {d.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Research gap note */}
        <div style={{ marginTop: '24px', padding: '20px 24px', borderRadius: '14px', background: 'linear-gradient(135deg,rgba(13,122,95,.06),rgba(26,95,168,.08))', border: '1px solid rgba(13,122,95,.15)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🎯</span>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '5px' }}>Research Gap Addressed</div>
              <div style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.7 }}>
                Existing disease prediction systems focus mainly on prediction accuracy while providing limited interpretability for patients and healthcare professionals — reducing clinical trust and practical usability. This system addresses that gap through integrated Explainable AI (SHAP/LIME) across all 5 disease models.
              </div>
            </div>
          </div>
        </div>

        {/* View More button */}
        <div style={S.viewMoreWrap}>
          <button
            style={S.viewMoreBtn}
            onClick={handleViewMore}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            View Full Model Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default DiseaseRiskPredictionSection;