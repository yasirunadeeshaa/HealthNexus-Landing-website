import { useState } from "react";

const T = {
  blue:    '#1a5fa8',
  blueL:   'rgba(26,95,168,.12)',
  teal:    '#0d7a5f',
  tealL:   'rgba(13,122,95,.12)',
  amber:   '#b85e0c',
  amberL:  'rgba(184,94,12,.15)',
  red:     '#d94f4f',
  redL:    'rgba(217,79,79,.12)',
  purple:  '#6b3fa0',
  purpleL: 'rgba(107,63,160,.12)',
  gradBlue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradTeal: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
};

/* ── Metric row inside card ── */
const MetricRow = ({ metrics }: { metrics: Array<{ label: string; value: string | number; bg: string; border: string; color: string }> }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
    {metrics.map(m => (
      <div key={m.label} style={{
        flex: '1 1 80px', background: m.bg,
        border: `1px solid ${m.border}`, borderRadius: '12px',
        padding: '12px 14px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px' }}>{m.label}</div>
      </div>
    ))}
  </div>
);

/* ── Feature tag list ── */
const TagList = ({ items, color, bg, border }: { items: string[]; color: string; bg: string; border: string }) => (
  <div style={{ marginBottom: '10px' }}>
    {items.map(t => (
      <span key={t} style={{
        display: 'inline-block', fontSize: '0.72rem', fontWeight: 600,
        color, background: bg, border: `1px solid ${border}`,
        borderRadius: '7px', padding: '4px 10px', margin: '2px',
      }}>{t}</span>
    ))}
  </div>
);

/* ── Model chip ── */
const ModelChip = ({ name, variant = 'primary' }: { name: string; variant?: 'primary' | 'blue' | 'neutral' }) => {
  const s = variant === 'primary'
    ? { background: T.gradTeal, color: '#fff' }
    : variant === 'blue'
    ? { background: T.gradBlue, color: '#fff' }
    : { background: '#edf2f7', color: '#4a5568', border: '1px solid #e2e8f0' };
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '0.4px', padding: '4px 12px', borderRadius: '50px',
      margin: '2px', ...s,
    }}>{name}</span>
  );
};

/* ── Capability row ── */
const CapRow = ({ icon, title }: { icon: string | React.ReactNode; title: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '9px 12px', borderRadius: '10px', marginBottom: '6px',
    background: '#f7fafc', border: '1px solid #e2e8f0',
  }}>
    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c' }}>{title}</span>
  </div>
);

/* ══════════════════════════════════════════
   MODEL CARD
══════════════════════════════════════════ */
const ModelCard = ({ model, onViewDetails }: { model: any; onViewDetails: (id: string) => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,0.12)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.13)'
          : '0 4px 20px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card hero */}
      <div style={{
        background: model.grad,
        padding: '32px 28px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '20px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.28)',
          color: '#fff', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: '50px', marginBottom: '16px',
        }}>
          {model.eyebrow}
        </div>

        <h2 style={{
          fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800,
          color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px',
          margin: '0 0 10px',
        }}>{model.title}</h2>

        <p style={{
          color: 'rgba(255,255,255,0.82)', fontSize: '0.82rem',
          lineHeight: 1.65, margin: '0', maxWidth: '380px',
        }}>{model.subtitle}</p>
      </div>

      {/* Card body */}
      <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Metrics */}
        <MetricRow metrics={model.metrics} />

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,0.15),transparent)', margin: '0 0 20px' }} />

        {/* Models used */}
        <div style={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>AI Models</p>
          <div>{model.models.map((m: { name: string; variant?: 'primary' | 'blue' | 'neutral' }) => <ModelChip key={m.name} name={m.name} variant={m.variant} />)}</div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,0.15),transparent)', margin: '0 0 18px' }} />

        {/* Input features */}
        <div style={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>Key Features</p>
          {model.features.map((f: { label: string; items: string[]; color: string; bg: string; border: string }) => (
            <TagList key={f.label} items={f.items} color={f.color} bg={f.bg} border={f.border} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,0.15),transparent)', margin: '0 0 18px' }} />

        {/* Capabilities */}
        <div style={{ marginBottom: '24px', flex: 1 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>Core Capabilities</p>
          {model.capabilities.map((c: { icon: string | React.ReactNode; title: string }) => <CapRow key={c.title} icon={c.icon} title={c.title} />)}
        </div>

        {/* CTA */}
        <button
          onClick={() => onViewDetails(model.id)}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${model.shadowColor}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 14px ${model.shadowColor}`;
          }}
          style={{
            width: '100%', padding: '14px 0', border: 'none', cursor: 'pointer',
            borderRadius: '14px', background: model.grad, color: '#fff',
            fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.3px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: `0 4px 14px ${model.shadowColor}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          View Full Model Details
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   PAGE DATA
══════════════════════════════════════════ */
const MODELS = [
  {
    id: 'diabetes',
    eyebrow: 'HealthNexus · AI Model 01',
    title: 'Diabetes Prediction & Progression Forecasting',
    subtitle: 'Explainable AI using clinical, lifestyle, and behavioural data to predict risk and forecast 12-month disease progression with SHAP/LIME transparency.',
    grad: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadowColor: 'rgba(102,126,234,0.35)',
    metrics: [
      { value: '94%',   label: 'Accuracy', color: '#0d7a5f', bg: 'rgba(13,122,95,.1)',   border: 'rgba(13,122,95,.2)' },
      { value: '0.96',  label: 'ROC-AUC',  color: '#1a5fa8', bg: 'rgba(26,95,168,.1)',   border: 'rgba(26,95,168,.2)' },
      { value: '92%',   label: 'F1-Score', color: '#0d7a5f', bg: 'rgba(13,122,95,.1)',   border: 'rgba(13,122,95,.2)' },
      { value: '12 Mo', label: 'Forecast', color: '#b85e0c', bg: 'rgba(184,94,12,.1)',   border: 'rgba(184,94,12,.2)' },
    ],
    models: [
      { name: 'XGBoost', variant: 'blue' },
      { name: 'Random Forest', variant: 'blue' },
      { name: 'LightGBM', variant: 'blue' },
      { name: 'Stacked LSTM', variant: 'primary' },
      { name: 'SHAP', variant: 'secondary' },
      { name: 'LIME', variant: 'secondary' },
    ],
    features: [
      { label: 'Clinical', items: ['Blood Glucose', 'HbA1c', 'BMI', 'Blood Pressure'], color: T.teal, bg: T.tealL, border: 'rgba(13,122,95,.2)' },
      { label: 'Lifestyle', items: ['Sugar Intake', 'Smoking', 'Exercise', 'Sleep'], color: T.amber, bg: T.amberL, border: 'rgba(184,94,12,.2)' },
      { label: 'Behavioural', items: ['Walking Steps', 'Stress', 'Sedentary Hrs'], color: T.blue, bg: T.blueL, border: 'rgba(26,95,168,.2)' },
    ],
    capabilities: [
      { icon: '🧬', title: 'Risk Classification (Healthy / Pre-diabetic / Diabetic)' },
      { icon: '📈', title: '12-Month HbA1c & Glucose Progression Forecast' },
      { icon: '👁️', title: 'SHAP / LIME Explainable AI Attribution' },
      { icon: '💡', title: 'Personalised Dietary & Activity Recommendations' },
    ],
  },
  {
    id: 'disease-risk',
    eyebrow: 'HealthNexus · AI Model 02',
    title: 'Explainable Disease Risk Prediction System',
    subtitle: 'Multi-disease AI engine assessing risk for diabetes, heart disease, kidney disease, stroke, and hypertension — with real-time decision support.',
    grad: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
    shadowColor: 'rgba(13,122,95,0.35)',
    metrics: [
      { value: '5',    label: 'Diseases',    color: T.teal,   bg: T.tealL,   border: 'rgba(13,122,95,.2)' },
      { value: 'XAI',  label: 'Explainable', color: T.purple, bg: T.purpleL, border: 'rgba(107,63,160,.2)' },
      { value: 'API',  label: 'Real-Time',   color: T.blue,   bg: T.blueL,   border: 'rgba(26,95,168,.2)' },
      { value: 'SHAP', label: 'Insights',    color: T.amber,  bg: T.amberL,  border: 'rgba(184,94,12,.2)' },
    ],
    models: [
      { name: 'Random Forest', variant: 'primary' },
      { name: 'XGBoost', variant: 'primary' },
      { name: 'LightGBM', variant: 'primary' },
      { name: 'ANN / MLP', variant: 'blue' },
      { name: 'SHAP', variant: 'secondary' },
      { name: 'LIME', variant: 'secondary' },
    ],
    features: [
      { label: 'Clinical', items: ['Blood Pressure', 'Glucose', 'Cholesterol', 'Creatinine'], color: T.teal, bg: T.tealL, border: 'rgba(13,122,95,.2)' },
      { label: 'Demographic', items: ['Age', 'Gender', 'BMI', 'BMI Category'],               color: T.blue, bg: T.blueL, border: 'rgba(26,95,168,.2)' },
      { label: 'Lifestyle', items: ['Smoking', 'Exercise', 'Sleep', 'Alcohol'],               color: T.amber, bg: T.amberL, border: 'rgba(184,94,12,.2)' },
    ],
    capabilities: [
      { icon: '🔬', title: 'End-to-End Risk Pipeline for 5 Diseases' },
      { icon: '📊', title: 'SHAP-Powered Explainable AI Dashboard' },
      { icon: '⚡', title: 'Real-Time FastAPI Prediction Endpoint' },
      { icon: '💡', title: 'Personalised Health Recommendations per Patient' },
    ],
  },
];

/* ══════════════════════════════════════════
   PAGE HEADER
══════════════════════════════════════════ */
const PageHeader = () => (
  <div style={{
    textAlign: 'center',
    padding: '72px 24px 56px',
    background: '#fafbfc',
  }}>
    <div style={{
      display: 'inline-block',
      background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
      border: '1px solid rgba(102,126,234,0.2)',
      color: '#667eea', fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '2.5px', textTransform: 'uppercase',
      padding: '6px 20px', borderRadius: '50px', marginBottom: '24px',
    }}>
      HealthNexus Platform
    </div>
    <h1 style={{
      fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
      color: '#1a202c', letterSpacing: '-1.5px', lineHeight: 1.1,
      margin: '0 0 20px',
    }}>
      AI Model{' '}
      <span style={{
        background: 'linear-gradient(135deg,#667eea,#764ba2)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>Portfolio</span>
    </h1>
    <p style={{
      fontSize: '1rem', color: '#718096', maxWidth: '560px',
      margin: '0 auto', lineHeight: 1.75,
    }}>
      Two production-ready explainable AI systems for clinical risk prediction,
      disease forecasting, and personalised health recommendations.
    </p>

    {/* Stats strip */}
    <div style={{
      display: 'flex', justifyContent: 'center', gap: '12px',
      flexWrap: 'wrap', marginTop: '40px',
    }}>
      {[
        { v: '2',    l: 'AI Models' },
        { v: '6',    l: 'Diseases' },
        { v: 'XAI',  l: 'Explainable' },
        { v: '94%',  l: 'Peak Accuracy' },
      ].map(s => (
        <div key={s.l} style={{
          background: '#fff', border: '1px solid rgba(102,126,234,0.14)',
          borderRadius: '14px', padding: '14px 26px', minWidth: '100px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a202c', lineHeight: 1 }}>{s.v}</div>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a0aec0', marginTop: '4px' }}>{s.l}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════
   COMPARE STRIP
══════════════════════════════════════════ */
const CompareStrip = () => (
  <div style={{
    maxWidth: '1100px', margin: '0 auto 40px', padding: '0 24px',
  }}>
    <div style={{
      background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
      border: '1px solid rgba(102,126,234,0.12)',
      borderRadius: '16px', padding: '20px 28px',
      display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: '1.2rem' }}>🔍</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '3px' }}>
          Both models share a core XAI foundation
        </div>
        <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
          SHAP & LIME explainability · FastAPI-ready · Ensemble ML + Deep Learning · Clinical-grade datasets
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['SHAP', 'LIME', 'XGBoost', 'FastAPI'].map(t => (
          <span key={t} style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px',
            textTransform: 'uppercase', padding: '4px 12px', borderRadius: '50px',
            background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
          }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function AIModelsPage({ onViewDetails }: { onViewDetails?: (id: string) => void }) {
  const handleViewDetails = (id: string) => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      window.location.href = id === 'diabetes'
        ? '/diabetes-prediction'
        : '/disease-risk-prediction';
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#fafbfc',
      color: '#1a202c',
      minHeight: '100vh',
    }}>
      <PageHeader />
      <CompareStrip />

      {/* Two-column card grid */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '28px',
        alignItems: 'start',
      }}>
        {MODELS.map(model => (
          <ModelCard key={model.id} model={model} onViewDetails={handleViewDetails} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        textAlign: 'center', paddingBottom: '48px',
        fontSize: '0.78rem', color: '#a0aec0',
      }}>
        HealthNexus · Explainable AI for Clinical Decision Support
      </div>
    </div>
  );
}