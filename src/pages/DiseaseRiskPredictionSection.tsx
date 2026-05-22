import React, { useState } from 'react';
import PremiumNav from './sections/NavBar';
import Footer from './sections/Footer';

import heroBg from '../assets/backgroun1.webp';

/* ─── Design tokens (unchanged) ─── */
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

/* ─── Global responsive CSS (matches diabetes page pattern) ─── */
const STYLES = `
.drp-root {
  font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fafbfc;
  color: #1a202c;
  width: 100%;
}
.drp-root .hero {
  padding: 84px 48px 156px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.drp-root .hero-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 0;
}
.drp-root .hero-inner { position: relative; z-index: 1; }
.drp-root .hero-eye {
  display: inline-block;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.30);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 20px;
  border-radius: 50px;
  margin-bottom: 24px;
}
.drp-root .hero h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -1px;
  margin: 0 0 18px;
}
.drp-root .hero-sub {
  color: rgba(255,255,255,0.82);
  font-size: 1rem;
  max-width: 680px;
  margin: 0 auto 36px;
  line-height: 1.7;
}
.drp-root .stat-strip { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.drp-root .stat-cell {
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 16px;
  padding: 16px 28px;
  min-width: 110px;
}
.drp-root .stat-v { font-size: 1.5rem; font-weight: 800; color: #fff; line-height: 1; }
.drp-root .stat-l { font-size: 0.7rem; color: rgba(255,255,255,0.72); font-weight: 600; letter-spacing: 0.5px; margin-top: 4px; text-transform: uppercase; }

.drp-root .page { max-width: 1100px; margin: 0 auto; padding: 48px 24px 64px; }
.drp-root .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(13,122,95,0.2), transparent); margin: 40px 0; }
.drp-root .section-hd { margin-bottom: 28px; }
.drp-root .eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #0d7a5f; margin-bottom: 6px; }
.drp-root .section-h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 800; color: #1a202c; letter-spacing: -0.5px; line-height: 1.2; margin: 0; }
.drp-root .section-h2 span { background: linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.drp-root .section-sub { font-size: 0.88rem; color: #718096; margin-top: 10px; line-height: 1.7; max-width: 760px; }

/* Grid layouts */
.drp-root .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.drp-root .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.drp-root .grid5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px; }
.drp-root .grid2-data { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 20px; }

.drp-root .card { background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border: 1px solid rgba(13,122,95,0.08); }

/* Demo grid */
.drp-root .demo-grid { display: grid; grid-template-columns: 1fr 1fr; }
.drp-root .demo-left { border-right: 1px solid #f0f4f8; }

/* Data cards grid */
.drp-root .data-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

/* Roadmap grid */
.drp-root .roadmap-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

/* Limitation grid */
.drp-root .limit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 20px; }

/* Tech / benefit grid */
.drp-root .benefit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* Accuracy breakdown */
.drp-root .accuracy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }

/* Explainability grid */
.drp-root .explain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ── Responsive breakpoints ── */
@media (max-width: 900px) {
  .drp-root .grid5 { grid-template-columns: repeat(2, 1fr); }
  .drp-root .grid3 { grid-template-columns: repeat(2, 1fr); }
  .drp-root .grid2 { grid-template-columns: 1fr; }
  .drp-root .demo-grid { grid-template-columns: 1fr; }
  .drp-root .demo-left { border-right: none; border-bottom: 1px solid #f0f4f8; }
  .drp-root .benefit-grid { grid-template-columns: repeat(2, 1fr); }
  .drp-root .data-grid { grid-template-columns: repeat(2, 1fr); }
  .drp-root .accuracy-grid { grid-template-columns: 1fr; }
  .drp-root .explain-grid { grid-template-columns: 1fr; }
  .drp-root .limit-grid { grid-template-columns: 1fr; }
  .drp-root .roadmap-grid { grid-template-columns: 1fr; }
  .drp-root .hero { padding: 48px 24px 80px; }
}

@media (max-width: 640px) {
  .drp-root .grid5 { grid-template-columns: repeat(2, 1fr); }
  .drp-root .grid3 { grid-template-columns: 1fr; }
  .drp-root .benefit-grid { grid-template-columns: 1fr; }
  .drp-root .data-grid { grid-template-columns: 1fr; }
  .drp-root .stat-strip { gap: 8px; }
  .drp-root .stat-cell { padding: 12px 16px; min-width: 80px; }
  .drp-root .stat-v { font-size: 1.2rem; }
  .drp-root .hero h1 { font-size: 1.6rem; }
  .drp-root .hero-sub { font-size: 0.88rem; }
  .drp-root .page { padding: 32px 16px 48px; }
  .drp-root .card { padding: 18px 16px; }
}

@media (max-width: 480px) {
  .drp-root .grid5 { grid-template-columns: 1fr; }
  .drp-root .demo-grid { grid-template-columns: 1fr; }
}
`;

/* ─── Disease Card ─── */
interface DiseaseCardProps {
  icon: string; name: string; color: string; bg: string; border: string;
  whatItChecks: string; earlySign: string; auc: string;
}
const DiseaseCard: React.FC<DiseaseCardProps> = ({ icon, name, color, bg, border, whatItChecks, earlySign, auc }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
    padding: '20px 12px', borderRadius: '16px', background: bg,
    border: `1px solid ${border}`, textAlign: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }}>
    <span style={{ fontSize: '2rem' }}>{icon}</span>
    <span style={{ fontSize: '0.85rem', fontWeight: 800, color, letterSpacing: '0.3px' }}>{name}</span>
    <span style={{ fontSize: '0.72rem', color: '#4a5568', lineHeight: 1.5 }}>{whatItChecks}</span>
    <div style={{ width: '100%', height: '1px', background: border, margin: '2px 0' }} />
    <span style={{ fontSize: '0.68rem', color: '#718096', lineHeight: 1.4, fontStyle: 'italic' }}>"{earlySign}"</span>
    <span style={{
      fontSize: '0.72rem', fontWeight: 700, color,
      background: 'rgba(255,255,255,0.7)', border: `1px solid ${border}`,
      borderRadius: '6px', padding: '3px 10px', marginTop: '2px',
    }}>{auc} accurate</span>
  </div>
);

/* ─── Step Card ─── */
const StepCard: React.FC<{ num: number; icon: string; title: string; desc: string; isLast?: boolean }> = ({ num, icon, title, desc, isLast }) => (
  <div style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '16px' }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', flexShrink: 0, color: '#fff', fontWeight: 800,
      }}>{icon}</div>
      {!isLast && <div style={{ width: '2px', flex: 1, background: 'rgba(13,122,95,0.15)', marginTop: '6px', minHeight: '24px' }} />}
    </div>
    <div style={{ paddingBottom: isLast ? '0' : '24px', flex: 1, paddingTop: '8px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '3px' }}>Step {num}</div>
      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a202c', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '0.82rem', color: '#718096', lineHeight: 1.65 }}>{desc}</div>
    </div>
  </div>
);

/* ─── Interactive Demo ─── */
const InteractiveDemo: React.FC = () => {
  const [age, setAge] = useState(45);
  const [bmi, setBmi] = useState(27);
  const [glucose, setGlucose] = useState(110);
  const [activity, setActivity] = useState(120);
  const [smoking, setSmoking] = useState('never');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const calcRisks = () => {
    const ageFactor   = (age - 30) / 70;
    const bmiFactor   = Math.max(0, (bmi - 22) / 20);
    const glucFactor  = Math.max(0, (glucose - 90) / 110);
    const actFactor   = Math.max(0, (180 - activity) / 180) * 0.5;
    const smokeFactor = smoking === 'current' ? 0.18 : smoking === 'former' ? 0.08 : 0;

    return {
      diabetes:     Math.min(0.95, Math.max(0.05, 0.10 + glucFactor * 0.45 + bmiFactor * 0.25 + ageFactor * 0.15 + smokeFactor)),
      heart:        Math.min(0.95, Math.max(0.05, 0.08 + ageFactor * 0.3 + bmiFactor * 0.2 + smokeFactor * 1.2 + actFactor)),
      kidney:       Math.min(0.95, Math.max(0.05, 0.05 + ageFactor * 0.2 + bmiFactor * 0.12 + glucFactor * 0.15)),
      stroke:       Math.min(0.95, Math.max(0.05, 0.06 + ageFactor * 0.25 + smokeFactor * 1.1 + bmiFactor * 0.1 + actFactor * 0.4)),
      hypertension: Math.min(0.95, Math.max(0.05, 0.10 + bmiFactor * 0.3 + ageFactor * 0.2 + actFactor * 0.3 + smokeFactor * 0.5)),
    };
  };

  const risks = calcRisks();
  const getRiskLevel = (v: number) => v <= 0.30 ? 'LOW' : v <= 0.60 ? 'MODERATE' : 'HIGH';
  const getRiskColor = (v: number) => v <= 0.30 ? T.teal : v <= 0.60 ? T.amber : T.red;
  const getRiskBg    = (v: number) => v <= 0.30 ? T.tealL : v <= 0.60 ? T.amberL : T.redL;

  const topFactors = () => [
    { label: 'Fasting Glucose',   value: glucose > 110 ? `${glucose} mg/dL — elevated` : `${glucose} mg/dL — normal`, impact: glucose > 110 ? 'risk' : 'safe' },
    { label: 'BMI',               value: bmi > 25 ? `${bmi} — above healthy range` : `${bmi} — healthy range`, impact: bmi > 25 ? 'risk' : 'safe' },
    { label: 'Physical Activity', value: activity < 150 ? `${activity} min/wk — below WHO target` : `${activity} min/wk — good`, impact: activity < 150 ? 'risk' : 'safe' },
    { label: 'Age',               value: age > 45 ? `${age} — elevated risk age group` : `${age} — lower risk age group`, impact: age > 45 ? 'risk' : 'safe' },
    { label: 'Smoking',           value: smoking === 'current' ? 'Current — high impact' : smoking === 'former' ? 'Former — moderate impact' : 'Non-smoker — protective', impact: smoking !== 'never' ? 'risk' : 'safe' },
  ];

  const handleRun = () => {
    setLoading(true);
    setShowResult(false);
    setTimeout(() => { setLoading(false); setShowResult(true); }, 1200);
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%', height: '6px', appearance: 'none' as any,
    background: 'linear-gradient(90deg, #0d7a5f, #1a5fa8)',
    borderRadius: '4px', outline: 'none', cursor: 'pointer',
  };

  return (
    <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(13,122,95,0.12)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.4rem' }}>🧬</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>Live AI Risk Demo</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem' }}>Adjust patient data below — the AI updates in real time</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '4px 12px', color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', flexShrink: 0 }}>DEMO MODE</div>
      </div>

      {/* Body */}
      <div className="demo-grid">
        {/* Left: inputs */}
        <div className="demo-left" style={{ padding: '24px 28px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '18px' }}>Patient Profile</div>

          {[
            { label: 'Age', min: 20, max: 80, value: age, onChange: (v: number) => setAge(v), display: `${age} yrs`, color: T.teal, note: '' },
          ].map(() => (
            <div key="age" style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4a5568' }}>Age</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: T.teal }}>{age} yrs</span>
              </div>
              <input type="range" min={20} max={80} value={age} onChange={e => setAge(+e.target.value)} style={sliderStyle} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#9a9790', marginTop: '3px' }}><span>20</span><span>80</span></div>
            </div>
          ))}

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4a5568' }}>BMI</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: bmi > 30 ? T.red : bmi > 25 ? T.amber : T.teal }}>
                {bmi} {bmi > 30 ? '· Obese' : bmi > 25 ? '· Overweight' : '· Healthy'}
              </span>
            </div>
            <input type="range" min={16} max={45} value={bmi} onChange={e => setBmi(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#9a9790', marginTop: '3px' }}><span>16</span><span>45</span></div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4a5568' }}>Fasting Blood Sugar</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: glucose > 125 ? T.red : glucose > 100 ? T.amber : T.teal }}>
                {glucose} mg/dL {glucose > 125 ? '· High' : glucose > 100 ? '· Pre-diabetic' : '· Normal'}
              </span>
            </div>
            <input type="range" min={70} max={200} value={glucose} onChange={e => setGlucose(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#9a9790', marginTop: '3px' }}><span>70</span><span>200</span></div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4a5568' }}>Exercise (min/week)</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: activity >= 150 ? T.teal : T.amber }}>
                {activity} min {activity >= 150 ? '· WHO target ✓' : '· Below target'}
              </span>
            </div>
            <input type="range" min={0} max={420} value={activity} onChange={e => setActivity(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#9a9790', marginTop: '3px' }}><span>0</span><span>7 hrs</span></div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '8px' }}>Smoking Status</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['never', 'former', 'current'] as const).map(s => (
                <button key={s} onClick={() => setSmoking(s)} style={{
                  flex: 1, padding: '8px 4px', borderRadius: '10px',
                  border: `2px solid ${smoking === s ? T.teal : '#e2e8f0'}`,
                  background: smoking === s ? T.tealL : '#f7fafc',
                  color: smoking === s ? T.teal : '#718096',
                  fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer',
                }}>
                  {s === 'never' ? '🚭 Never' : s === 'former' ? '⚠️ Former' : '🚬 Current'}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleRun} style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
            color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(13,122,95,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            {loading ? '⏳ Analysing...' : '🔍 Run AI Risk Assessment'}
          </button>
        </div>

        {/* Right: results */}
        <div style={{ padding: '24px 28px', background: '#fafbfc' }}>
          {!showResult && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', color: '#9a9790', textAlign: 'center', gap: '12px' }}>
              <span style={{ fontSize: '3rem' }}>🩺</span>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.6 }}>Adjust the patient data on the left,<br />then click Run Assessment</div>
              <div style={{ fontSize: '0.75rem', color: '#b0aaa4' }}>Age, BMI, glucose & lifestyle factors<br />all feed into the 5 AI models</div>
            </div>
          )}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', gap: '14px' }}>
              <div style={{ fontSize: '2.5rem', animation: 'spin 1.2s linear infinite' }}>⚙️</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: T.teal }}>Running 5 disease models…</div>
              <div style={{ fontSize: '0.75rem', color: '#9a9790' }}>Calculating risk factors…</div>
              <div style={{ fontSize: '0.75rem', color: '#9a9790' }}>Generating explanations…</div>
            </div>
          )}
          {showResult && !loading && (
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>Risk Assessment Results</div>

              {[
                { icon: '🩸', name: 'Diabetes',      val: risks.diabetes },
                { icon: '❤️',  name: 'Heart Disease', val: risks.heart },
                { icon: '🫘', name: 'Kidney Disease', val: risks.kidney },
                { icon: '🧠', name: 'Stroke Risk',    val: risks.stroke },
                { icon: '💢', name: 'Hypertension',   val: risks.hypertension },
              ].map(d => (
                <div key={d.name} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c' }}>{d.icon} {d.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: getRiskColor(d.val) }}>{Math.round(d.val * 100)}%</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '50px', background: getRiskBg(d.val), color: getRiskColor(d.val), border: `1px solid ${getRiskColor(d.val)}33` }}>
                        {getRiskLevel(d.val)}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.round(d.val * 100)}%`, background: `linear-gradient(90deg, ${getRiskColor(d.val)}88, ${getRiskColor(d.val)})`, borderRadius: '4px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '16px', padding: '14px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>🔍 Why the AI flagged these</div>
                {topFactors().map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '5px 0', borderBottom: '1px solid #f7fafc', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', flexShrink: 0 }}>{f.impact === 'risk' ? '🔴' : '🟢'}</span>
                    <span style={{ fontWeight: 700, color: '#1a202c', width: '110px', flexShrink: 0 }}>{f.label}</span>
                    <span style={{ color: f.impact === 'risk' ? T.red : T.teal, flex: 1, minWidth: 0 }}>{f.value}</span>
                  </div>
                ))}
              </div>

              {(risks.diabetes > 0.3 || risks.heart > 0.3) && (
                <div style={{ marginTop: '12px', padding: '12px 14px', background: T.amberL, borderRadius: '10px', border: `1px solid rgba(184,94,12,.2)`, fontSize: '0.78rem', color: '#7a3f08', lineHeight: 1.55 }}>
                  <strong>💡 AI Recommendation:</strong>{' '}
                  {glucose > 110 ? `Fasting glucose of ${glucose} mg/dL is above normal. An HbA1c test is recommended. ` : ''}
                  {bmi > 27 ? `A 5–10% weight reduction can significantly lower risk across all conditions. ` : ''}
                  {activity < 150 ? `Increasing activity to 150 min/week is the highest-impact lifestyle change. ` : ''}
                  {smoking === 'current' ? `Smoking cessation can reduce cardiovascular risk within 1–2 years.` : ''}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Accuracy Bar ─── */
const AccBar: React.FC<{ label: string; pct: number; color: string }> = ({ label, pct, color }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.82rem' }}>
      <span style={{ fontWeight: 700, color: '#1a202c' }}>{label}</span>
      <span style={{ fontWeight: 800, color }}>{pct}% accurate</span>
    </div>
    <div style={{ height: '10px', background: '#f0f4f8', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: '5px' }} />
    </div>
  </div>
);

/* ─── Risk Level Card ─── */
const RiskCard: React.FC<{ level: string; color: string; bg: string; border: string; icon: string; meaning: string; action: string }> =
  ({ level, color, bg, border, icon, meaning, action }) => (
  <div style={{ padding: '20px', borderRadius: '16px', background: bg, border: `1px solid ${border}`, textAlign: 'center' }}>
    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
    <div style={{ fontSize: '1rem', fontWeight: 800, color, marginBottom: '6px' }}>{level} RISK</div>
    <div style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.55, marginBottom: '10px' }}>{meaning}</div>
    <div style={{ fontSize: '0.75rem', fontWeight: 700, color, padding: '8px 12px', background: 'rgba(255,255,255,0.6)', borderRadius: '10px', border: `1px solid ${border}` }}>{action}</div>
  </div>
);

/* ─── Benefit Card ─── */
const BenefitCard: React.FC<{ icon: string; title: string; desc: string; accentBg: string }> = ({ icon, title, desc, accentBg }) => (
  <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '14px' }}>{icon}</div>
    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1a202c', marginBottom: '6px' }}>{title}</div>
    <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.65 }}>{desc}</div>
  </div>
);

/* ─── Section Header ─── */
const SectionHeader: React.FC<{ eyebrow: string; title: string; highlight: string; sub?: string }> = ({ eyebrow, title, highlight, sub }) => (
  <div className="section-hd">
    <div className="eyebrow">{eyebrow}</div>
    <h2 className="section-h2">{title} <span>{highlight}</span></h2>
    {sub && <p className="section-sub">{sub}</p>}
  </div>
);

/* ─── Main Component ─── */
const DiseaseRiskPredictionSection: React.FC = () => {
  return (
    <>
      <PremiumNav />
      <style>{STYLES}</style>
      <section id="ai-disease-risk-section" className="drp-root">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-overlay" />
          <div className="hero-inner">
            <div className="hero-eye">HealthNexus · Powered-by AI</div>
            <h1>Explainable Multi-Disease<br />Risk Prediction System</h1>
            <p className="hero-sub">
              A multi-disease AI prediction engine using clinical, demographic, and lifestyle data
              to assess risk for five major chronic conditions simultaneously with full SHAP/LIME
              explainability, production FastAPI microservice, and real-time decision support.
            </p>
            <div className="stat-strip">
              {[
                { v: '5',      l: 'Diseases covered' },
                { v: '3',      l: 'Models compared' },
                { v: 'XAI',    l: 'Explainable AI' },
                { v: 'SHAP',   l: 'Feature insights' },
                { v: '<100ms', l: 'Inference latency' },
                { v: '15',     l: 'Trained instances' },
              ].map(s => (
                <div className="stat-cell" key={s.l}>
                  <div className="stat-v">{s.v}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="page">

          {/* ── 1. What does this AI do? ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="What This AI Does"
              title="One Assessment."
              highlight="Five Disease Risk Scores."
              sub="When a patient completes their health profile in HealthNexus, the AI instantly analyses their data and calculates how likely they are to develop five serious chronic conditions before symptoms appear. Each disease gets its own dedicated AI model trained on clinically validated datasets."
            />
            <div className="grid5">
              <DiseaseCard icon="🩸" name="Diabetes"       color={T.blue}   bg={T.blueL}   border="rgba(26,95,168,.2)"   whatItChecks="Checks blood sugar, insulin levels & BMI"         earlySign="Often silent for years before diagnosis"         auc="88–92%" />
              <DiseaseCard icon="❤️"  name="Heart Disease"  color={T.red}    bg={T.redL}    border="rgba(217,79,79,.2)"   whatItChecks="Checks cholesterol, blood pressure & age"          earlySign="Leading cause of death, largely preventable"     auc="90–94%" />
              <DiseaseCard icon="🫘" name="Kidney Disease" color={T.teal}   bg={T.tealL}   border="rgba(13,122,95,.2)"   whatItChecks="Checks creatinine, blood urea & albumin"           earlySign="Over 90% of cases caught only in late stages"    auc="97–99%" />
              <DiseaseCard icon="🧠" name="Stroke Risk"    color={T.purple} bg={T.purpleL} border="rgba(107,63,160,.2)"  whatItChecks="Checks lifestyle, smoking & blood pressure"         earlySign="80% of strokes are preventable with early action" auc="86–91%" />
              <DiseaseCard icon="💢" name="Hypertension"   color={T.amber}  bg={T.amberL}  border="rgba(184,94,12,.2)"   whatItChecks="Checks activity, weight & stress indicators"        earlySign="The 'silent killer' — rarely has symptoms"       auc="87–92%" />
            </div>
          </div>

          <div className="divider" />

          {/* ── 2. Interactive Demo ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="Live Example"
              title="Try It:"
              highlight="See the AI in Action"
              sub="Adjust the patient data below and click Run Assessment to see how the AI calculates risk scores and explains exactly which health factors are driving the result."
            />
            <InteractiveDemo />
          </div>

          <div className="divider" />

          {/* ── 3. How it works ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader eyebrow="How It Works" title="From Patient Data" highlight="to Risk Report in 4 Steps" />
            <div className="card" style={{ maxWidth: '700px' }}>
              <StepCard num={1} icon="📋" title="Patient fills in their health profile"
                desc="The patient enters basic details once: age, weight, blood test results from their latest checkup, lifestyle habits (activity, sleep, smoking). Everything they'd normally tell their doctor." />
              <StepCard num={2} icon="🔄" title="The system prepares the data"
                desc="HealthNexus cleans and standardises the data — handling missing values, converting units, and formatting everything so the AI models can read it correctly. This happens in under a second." />
              <StepCard num={3} icon="🤖" title="Five AI models analyse the data simultaneously"
                desc="Each disease has its own dedicated AI model — trained on thousands of real patient records — that calculates a risk probability between 0% and 100%. All five run in parallel and return results in under 100 milliseconds." />
              <StepCard num={4} icon="💡" title="The AI explains its reasoning" isLast
                desc={'The system doesn\'t just show a number — it highlights which specific factors drove the score. "Your risk is elevated primarily because of your blood sugar level (+18%) and BMI (+12%)." This gives the patient and doctor clear, actionable next steps.'} />
            </div>
          </div>

          <div className="divider" />

          {/* ── 4. What do the risk levels mean ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="Understanding Results"
              title="What Each"
              highlight="Risk Level Means"
              sub="The AI translates complex probabilities into three clear, actionable categories that both patients and healthcare professionals can immediately understand."
            />
            <div className="grid3">
              <RiskCard level="LOW"      color={T.teal}   bg={T.tealL}   border="rgba(13,122,95,.2)"  icon="✅"
                meaning="Your health indicators are within a healthy range for this condition. Keep up your current habits."
                action="Continue healthy habits — routine checkup recommended" />
              <RiskCard level="MODERATE" color={T.amber}  bg={T.amberL}  border="rgba(184,94,12,.2)" icon="⚠️"
                meaning="Some risk factors are present. The condition is not inevitable — lifestyle changes now can significantly lower your risk."
                action="Review AI recommendations — consider lifestyle adjustments" />
              <RiskCard level="HIGH"     color={T.red}    bg={T.redL}    border="rgba(217,79,79,.2)"  icon="🔴"
                meaning="Multiple risk factors are flagged. This does not mean you have the disease — it means early medical review is strongly recommended."
                action="Consult a healthcare professional for further evaluation" />
            </div>
            <div style={{ marginTop: '16px', padding: '16px 20px', background: '#f0f4f8', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.65 }}>
              <strong style={{ color: '#1a202c' }}>Important:</strong> These are risk scores, not diagnoses. A 74% risk score means the patient's health profile closely resembles patients in our training data who developed the condition — it is an early warning signal, not a confirmed medical finding. All high-risk results should be reviewed by a qualified healthcare professional.
            </div>
          </div>

          <div className="divider" />

          {/* ── 5. Explainability ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="Why Patients Trust It"
              title="The AI Shows Its"
              highlight="Work Always"
              sub="Most AI systems give you a number and nothing else. HealthNexus uses SHAP (used widely in clinical AI research) to break down every prediction into its contributing factors so patients and doctors understand exactly why the score is what it is."
            />
            <div className="explain-grid">
              {/* Example breakdown */}
              <div className="card">
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>Example: Patient with 74% diabetes risk</div>
                <div style={{ padding: '14px 16px', background: T.redL, borderRadius: '12px', border: `1px solid rgba(217,79,79,.2)`, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>🩸</span>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: T.red }}>74%</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>Diabetes risk · HIGH</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a9790', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>What's driving this score</div>
                {[
                  { label: '🔴 Fasting glucose — 142 mg/dL',  bar: 100, val: '+18.4%', risk: true },
                  { label: '🔴 BMI — 31.2 (Obese range)',      bar: 64,  val: '+11.7%', risk: true },
                  { label: '🔴 Age — 47 years',                bar: 43,  val: '+7.9%',  risk: true },
                  { label: '🔴 Former smoker',                 bar: 23,  val: '+4.3%',  risk: true },
                  { label: '🟢 Exercise — 90 min/week',        bar: 33,  val: '−6.1%',  risk: false },
                  { label: '🟢 Sleep — 6.5 hrs/night',         bar: 21,  val: '−3.8%',  risk: false },
                ].map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px', flexWrap: 'nowrap' }}>
                    <span style={{ fontSize: '0.72rem', color: '#4a5568', minWidth: 0, flex: '0 0 160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.label}</span>
                    <div style={{ flex: 1, height: '8px', background: '#f0f4f8', borderRadius: '4px', overflow: 'hidden', minWidth: '40px' }}>
                      <div style={{ height: '100%', width: `${f.bar}%`, background: f.risk ? T.red : T.teal, borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, color: f.risk ? T.red : T.teal }}>{f.val}</span>
                  </div>
                ))}
                <div style={{ marginTop: '12px', padding: '10px 14px', background: '#f7fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#718096', lineHeight: 1.5 }}>
                  Red = factors pushing risk <strong style={{ color: T.red }}>higher</strong> &nbsp;·&nbsp; Green = <strong style={{ color: T.teal }}>protective</strong> factors
                </div>
              </div>

              {/* Automated recommendations */}
              <div className="card">
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>Auto-generated patient recommendations</div>
                <div style={{ fontSize: '0.82rem', color: '#718096', lineHeight: 1.65, marginBottom: '14px' }}>
                  When the AI identifies the top risk-driving factors, it automatically generates plain-language,
                  evidence-based recommendations personalised to that patient's specific values.
                </div>
                {[
                  { icon: '🩸', factor: 'Fasting Glucose at 142', rec: '"Your blood sugar is above the normal range. We recommend scheduling an HbA1c blood test and reviewing your diet with a nutritionist."' },
                  { icon: '⚖️', factor: 'BMI at 31.2', rec: '"A 5–10% reduction in body weight is clinically shown to significantly reduce your diabetes and heart disease risk."' },
                  { icon: '🏃', factor: 'Exercise 90 min/wk', rec: '"Increasing your activity to 150 min/week (e.g. 30 min walks, 5 days) is the most impactful change you can make right now."' },
                ].map(r => (
                  <div key={r.factor} style={{ padding: '12px 14px', background: '#f7fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{r.icon} {r.factor}</div>
                    <div style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.55, fontStyle: 'italic' }}>{r.rec}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── 6. Accuracy ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="AI Accuracy"
              title="How Accurate"
              highlight="Are the Predictions?"
              sub="Each AI model was tested against real patient data it had never seen before. The results below show how well each model distinguishes between patients who developed the condition and those who didn't."
            />
            <div className="accuracy-grid">
              <div className="card">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a9790', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Prediction accuracy by disease</div>
                <AccBar label="🫘 Kidney Disease"  pct={98} color={T.teal}   />
                <AccBar label="❤️ Heart Disease"   pct={92} color={T.red}    />
                <AccBar label="💢 Hypertension"    pct={90} color={T.amber}  />
                <AccBar label="🩸 Diabetes"        pct={90} color={T.blue}   />
                <AccBar label="🧠 Stroke Risk"     pct={88} color={T.purple} />
                <div style={{ marginTop: '12px', fontSize: '0.72rem', color: '#9a9790', lineHeight: 1.5 }}>
                  Accuracy measured by AUC-ROC — a medical standard that measures how well the AI separates healthy from at-risk patients across all thresholds.
                </div>
              </div>
              <div className="card">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a9790', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>What makes this medically reliable</div>
                {[
                  { icon: '✅', title: 'Tested on unseen data',      desc: 'Models are trained and tested on separate datasets — the AI is never tested on data it learned from.' },
                  { icon: '✅', title: 'Handles rare cases',          desc: 'Special techniques (SMOTE) ensure the AI doesn\'t ignore rare but serious conditions like stroke, where only 5% of patients are positive.' },
                  { icon: '✅', title: 'Sensitivity over accuracy',   desc: 'The AI is tuned to catch sick patients — a "missed" patient is more dangerous than a false alarm. We prioritise not missing real cases.' },
                  { icon: '✅', title: 'Three models compared',       desc: 'We tested XGBoost, Random Forest, and Neural Network models on all five diseases. The best performer was selected for each.' },
                ].map(r => (
                  <div key={r.title} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.78rem' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{r.icon}</span>
                    <div><strong style={{ color: '#1a202c' }}>{r.title}</strong> — <span style={{ color: '#718096' }}>{r.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── 7. Benefits ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader eyebrow="Value to Patients & Healthcare" title="What This Changes" highlight="for Your Patients" />
            <div className="benefit-grid">
              <BenefitCard icon="⏱️" accentBg={T.tealL}
                title="Early detection before symptoms"
                desc="Chronic diseases like diabetes and hypertension are silent for years. This system catches warning signs months or years before a patient would normally be diagnosed — when intervention is easiest and cheapest." />
              <BenefitCard icon="📊" accentBg={T.blueL}
                title="Complete picture in one assessment"
                desc="Instead of separate tests for each condition, one health profile submission returns risk scores for all five diseases simultaneously — giving both patient and doctor a full chronic disease overview." />
              <BenefitCard icon="🎯" accentBg={T.purpleL}
                title="Personalised, not generic advice"
                desc="Recommendations are generated from the patient's actual data — not boilerplate health tips. A patient with high glucose gets glucose-specific guidance; one with low activity gets activity-specific targets." />
              <BenefitCard icon="🔍" accentBg={T.amberL}
                title="Transparent reasoning patients trust"
                desc="Every risk score comes with a clear explanation of which factors drove it and by how much. Patients aren't left with a confusing number — they understand why, and what they can do about it." />
              <BenefitCard icon="🔒" accentBg={T.tealL}
                title="Secure & integrated into HealthNexus"
                desc="The AI runs as a secure internal service — patient data never leaves the HealthNexus system. Predictions are stored in the patient's record and accessible by their healthcare provider." />
              <BenefitCard icon="⚡" accentBg={T.redL}
                title="Instant results — under 100ms"
                desc="The entire analysis — five disease models, explanations, and recommendations — completes in under one tenth of a second. No waiting, no delays for the patient or clinician." />
            </div>
          </div>

          <div className="divider" />

          {/* ── 8. Data used ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader
              eyebrow="What Data the AI Uses"
              title="Information Already in"
              highlight="the Patient's Profile"
              sub="No additional tests or appointments are needed. The AI works from data the patient already has — standard blood test results, basic measurements, and a short lifestyle questionnaire."
            />
            <div className="data-grid">
              {[
                {
                  icon: '🩺', title: 'From blood tests', color: T.blue, bg: T.blueL,
                  items: ['Fasting blood sugar', 'Cholesterol levels', 'Creatinine & blood urea', 'Albumin & hemoglobin', 'Insulin levels'],
                },
                {
                  icon: '📏', title: 'Basic measurements', color: T.teal, bg: T.tealL,
                  items: ['Age', 'Gender', 'Height & weight (BMI)', 'Blood pressure (systolic & diastolic)'],
                },
                {
                  icon: '🌿', title: 'Lifestyle questionnaire', color: T.amber, bg: T.amberL,
                  items: ['Smoking status', 'Hours of sleep per night', 'Weekly physical activity', 'Alcohol consumption', 'Type of work (active/sedentary)'],
                },
              ].map(g => (
                <div key={g.title} className="card" style={{ borderTop: `3px solid ${g.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{g.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1a202c' }}>{g.title}</span>
                  </div>
                  {g.items.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '8px', padding: '6px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.8rem', color: '#4a5568' }}>
                      <span style={{ color: g.color, fontWeight: 700 }}>·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* ── 9. Limitations ── */}
          <div style={{ marginBottom: '8px' }}>
            <SectionHeader eyebrow="Important to Know" title="What This AI" highlight="Is and Isn't" />
            <div className="limit-grid">
              {[
                { icon: '✅', title: 'It IS an early warning tool',      desc: 'Designed to identify risk patterns early — like a smoke detector. It helps patients and doctors know where to look before problems become serious.' },
                { icon: '❌', title: 'It is NOT a diagnostic tool',       desc: 'A high-risk score is not a diagnosis. It means the patient\'s profile resembles patients who developed the condition. A doctor must confirm any findings.' },
                { icon: '✅', title: 'It IS personalised to each patient', desc: 'Every score is calculated fresh from the patient\'s actual current data — not a generic population average.' },
                { icon: '❌', title: 'It does NOT replace medical advice', desc: 'This tool is a decision-support aid. It surfaces risk and explains it — but clinical decisions always remain with the healthcare professional.' },
              ].map(l => (
                <div key={l.title} style={{ background: '#fff', borderRadius: '14px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{l.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', marginBottom: '5px' }}>{l.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>{l.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <div style={{ padding: '20px 24px', borderRadius: '16px', background: 'linear-gradient(135deg,rgba(13,122,95,.06),rgba(26,95,168,.08))', border: '1px solid rgba(13,122,95,.15)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>🚀 What's next — planned improvements</div>
              <div className="roadmap-grid">
                {[
                  ['Wearable device integration', 'Direct sync with Apple Watch, Fitbit, and CGM devices for continuous monitoring instead of snapshots.'],
                  ['Trend tracking over time',    'Track how a patient\'s risk scores change month-to-month as they make lifestyle improvements.'],
                  ['Doctor dashboard',            'A dedicated view for healthcare providers to see all high-risk patients in their cohort at a glance.'],
                  ['More conditions covered',     'Expanding from 5 to 10+ conditions including thyroid disorders, liver disease, and mental health risk factors.'],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem' }}>
                    <span style={{ color: T.teal, fontWeight: 800, flexShrink: 0 }}>→</span>
                    <div><strong style={{ color: '#1a202c' }}>{title}</strong> — <span style={{ color: '#718096' }}>{desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default DiseaseRiskPredictionSection;