import { useState } from 'react';

/* ─── Shared token palette ─── */
const T = {
  blue:         '#1a5fa8',
  blueL:        'rgba(26,95,168,.12)',
  blueBorder:   'rgba(26,95,168,.2)',
  teal:         '#0d7a5f',
  tealL:        'rgba(13,122,95,.12)',
  tealBorder:   'rgba(13,122,95,.2)',
  amber:        '#b85e0c',
  amberL:       'rgba(184,94,12,.15)',
  amberBorder:  'rgba(184,94,12,.2)',
  red:          '#d94f4f',
  redL:         'rgba(217,79,79,.12)',
  redBorder:    'rgba(217,79,79,.2)',
  purple:       '#6b3fa0',
  purpleL:      'rgba(107,63,160,.12)',
  purpleBorder: 'rgba(107,63,160,.2)',
  pink:         '#993556',
  pinkL:        'rgba(153,53,86,.12)',
  pinkBorder:   'rgba(153,53,86,.2)',
  gradBlue:     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradTeal:     'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  gradAmber:    'linear-gradient(135deg, #b85e0c 0%, #d94f4f 100%)',
  gradPurple:   'linear-gradient(135deg, #6b3fa0 0%, #993556 100%)',
};

/* ─── Types ─── */
interface Pill {
  icon: string;
  text: string;
  color: string;
  bg: string;
}

interface Benefit {
  icon: string;
  title: string;
  desc: string;
  pill?: Pill;
}

interface Partner {
  eyebrow: string;
  title: string;
  subtitle: string;
  grad: string;
  shadowColor: string;
  accentColor: string;
  metrics: Array<{ value: string; label: string; color: string; bg: string; border: string }>;
  benefits: Benefit[];
}

interface Step {
  icon: string;
  label: string;
  desc: string;
  day: string;
  state: 'done' | 'active' | 'pending';
}

/* ─── Sub-components ─── */

const MetricRow = ({ metrics }: { metrics: Partner['metrics'] }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
    {metrics.map(m => (
      <div key={m.label} style={{
        flex: '1 1 70px', background: m.bg,
        border: `1px solid ${m.border}`, borderRadius: '12px',
        padding: '10px 12px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px' }}>{m.label}</div>
      </div>
    ))}
  </div>
);

const CapRow = ({
  icon, title, desc, pill, accentColor,
}: {
  icon: string; title: string; desc: string; pill?: Pill; accentColor: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        padding: '9px 12px', borderRadius: '10px', marginBottom: '6px',
        background: hovered ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hovered ? accentColor : '#e2e8f0'}`,
        transition: 'background .18s, border-color .18s',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c', marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.5 }}>{desc}</div>
        {pill && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.68rem', fontWeight: 700,
            padding: '3px 9px', borderRadius: '50px', marginTop: '6px',
            background: pill.bg, color: pill.color,
          }}>
            {pill.icon} {pill.text}
          </span>
        )}
      </div>
    </div>
  );
};

/* ─── Partner card ─── */
const PartnerCard = ({ partner }: { partner: Partner }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,.12)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,.13)' : '0 4px 20px rgba(0,0,0,.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow .3s ease, transform .3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero */}
      <div style={{
        background: partner.grad,
        padding: '22px 20px 18px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
          color: '#fff', fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: '50px', marginBottom: '14px',
        }}>
          {partner.eyebrow}
        </div>

        <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.4px', margin: '0 0 8px' }}>
          {partner.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: '360px' }}>
          {partner.subtitle}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        <MetricRow metrics={partner.metrics} />

        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />

        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>
          Key Benefits
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
          {partner.benefits.map(b => (
            <CapRow
              key={b.title}
              icon={b.icon}
              title={b.title}
              desc={b.desc}
              pill={b.pill}
              accentColor={partner.accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Data ─── */
const PARTNERS: Partner[] = [
  {
    eyebrow: 'HealthNexus · Partner 01',
    title: 'Pharmacies',
    subtitle: 'Direct prescription pipeline and AI-powered inventory management for growth.',
    grad: T.gradBlue,
    shadowColor: 'rgba(102,126,234,.35)',
    accentColor: T.blue,
    metrics: [
      { value: '10K+', label: 'Doctors',      color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '2M+',  label: 'Patients',     color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: '50K',  label: 'Monthly Orders', color: T.amber, bg: T.amberL, border: T.amberBorder },
      { value: 'AI',   label: 'Inventory',    color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    benefits: [
      {
        icon: '⚡',
        title: 'Direct prescription pipeline',
        desc: 'Instant digital prescriptions from 10,000+ verified doctors.',
        pill: { icon: '📈', text: '50K+ monthly orders', color: T.purple, bg: T.purpleL },
      },
      {
        icon: '👥',
        title: 'Expanded customer base',
        desc: 'Access to 2M+ verified patients on the platform.',
      },
      {
        icon: '🧠',
        title: 'AI inventory management',
        desc: 'Demand forecasting reduces overstock and shortages.',
      },
      {
        icon: '💳',
        title: 'Automated payments',
        desc: 'Instant settlement and reconciliation built in.',
      },
    ],
  },
  {
    eyebrow: 'HealthNexus · Partner 02',
    title: 'Diagnostic Labs',
    subtitle: 'Automated home collection, digital reporting, and real-time doctor collaboration.',
    grad: T.gradTeal,
    shadowColor: 'rgba(13,122,95,.35)',
    accentColor: T.teal,
    metrics: [
      { value: '15K', label: 'Daily Collections', color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: 'Live', label: 'Report Delivery',  color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'AI',   label: 'Scheduling',       color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: '100%', label: 'Digital',          color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    benefits: [
      {
        icon: '🏠',
        title: 'Home collection network',
        desc: 'Automated scheduling and routing for home sample pickup.',
        pill: { icon: '📈', text: '15K+ daily collections', color: T.purple, bg: T.purpleL },
      },
      {
        icon: '📄',
        title: 'Digital report delivery',
        desc: 'Instant report sharing directly with referring doctors.',
        pill: { icon: '✅', text: 'Live integration', color: T.teal, bg: T.tealL },
      },
      {
        icon: '🩺',
        title: 'Doctor collaboration',
        desc: 'Direct consultations on results via in-platform messaging.',
      },
      {
        icon: '📊',
        title: 'Analytics dashboard',
        desc: 'Test volume trends and demand insights in one view.',
      },
    ],
  },
  {
    eyebrow: 'HealthNexus · Partner 03',
    title: 'Insurance Providers',
    subtitle: 'AI-driven claim processing, fraud detection, and real-time eligibility verification.',
    grad: 'linear-gradient(135deg, #11998e 0%, #1a5fa8 100%)',
    shadowColor: 'rgba(17,153,142,.35)',
    accentColor: T.teal,
    metrics: [
      { value: '90%',  label: 'Faster Claims',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '99.9%',label: 'Fraud Accuracy', color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: '15d',  label: 'Time Saved',     color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: '100%', label: 'Paperless',      color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    benefits: [
      {
        icon: '🤖',
        title: 'Automated claim processing',
        desc: 'AI-driven pipeline delivers 90% faster settlements.',
        pill: { icon: '⏱️', text: 'Save 15 days/claim', color: T.teal, bg: T.tealL },
      },
      {
        icon: '🚨',
        title: 'Fraud detection',
        desc: 'Real-time anomaly detection with 99.9% accuracy.',
        pill: { icon: '📈', text: '99.9% accuracy', color: T.purple, bg: T.purpleL },
      },
      {
        icon: '✅',
        title: 'Real-time verification',
        desc: 'Instant eligibility checks at point of care.',
      },
      {
        icon: '📋',
        title: 'Paperless workflow',
        desc: '100% digital documentation end-to-end.',
      },
    ],
  },
  {
    eyebrow: 'HealthNexus · Partner 04',
    title: 'Hospitals & Clinics',
    subtitle: 'Smart patient flow, unified records, and revenue optimisation across departments.',
    grad: T.gradPurple,
    shadowColor: 'rgba(107,63,160,.35)',
    accentColor: T.purple,
    metrics: [
      { value: '60%', label: 'Less Wait Time',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '25%', label: 'More Volume',     color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'Cloud',label: 'Sync',           color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: 'AI',  label: 'Queue Mgmt',     color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    benefits: [
      {
        icon: '👥',
        title: 'Patient flow optimisation',
        desc: 'Smart queue management cuts wait times significantly.',
        pill: { icon: '📉', text: '60% less wait time', color: T.amber, bg: T.amberL },
      },
      {
        icon: '🗄️',
        title: 'Unified health records',
        desc: 'Centralised patient data with cloud sync across departments.',
        pill: { icon: '☁️', text: 'Cloud sync', color: T.teal, bg: T.tealL },
      },
      {
        icon: '🔗',
        title: 'Multi-doctor coordination',
        desc: 'Seamless referral and handoff management between teams.',
      },
      {
        icon: '💰',
        title: 'Revenue optimisation',
        desc: '25% increase in patient volume through platform discovery.',
      },
    ],
  },
];

const STEPS: Step[] = [
  { icon: '📄', label: 'Apply',     desc: 'Submit partnership application', day: 'Day 1',   state: 'done' },
  { icon: '✅', label: 'Verify',    desc: 'Quick verification process',     day: 'Day 2–3', state: 'done' },
  { icon: '⚙️', label: 'Integrate', desc: 'API integration & setup',        day: 'Day 4–7', state: 'active' },
  { icon: '🚀', label: 'Launch',    desc: 'Go live & start growing',        day: 'Day 8',   state: 'pending' },
];

const stepStyle = {
  done:    { bg: T.tealL,   border: T.tealBorder,   color: T.teal },
  active:  { bg: T.purpleL, border: T.purpleBorder, color: T.purple },
  pending: { bg: '#f1f5f9', border: '#e2e8f0',      color: '#94a3b8' },
};

/* ─── Main component ─── */
const VendorBenefits = () => (
  <section id="vendorbenefits">
  <div style={{
    fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    background: '#fafbfc',
    color: '#1a202c',
  }}>

    {/* ── Section header ── */}
    <div style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
        border: '1px solid rgba(102,126,234,.2)',
        color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        padding: '6px 20px', borderRadius: '50px', marginBottom: '24px',
      }}>
        Ecosystem Partners
      </div>

      <h2 style={{
        fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800,
        color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
      }}>
        Empowering every healthcare{' '}
        <span style={{
          background: 'linear-gradient(135deg,#667eea,#764ba2)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          ecosystem partner
        </span>
      </h2>

      <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
        Join the digital healthcare revolution and unlock unprecedented growth
        opportunities across the entire care network.
      </p>
    </div>

    <div style={{ maxWidth: '1100px', margin: '0 auto 40px', padding: '0 24px' }}>
      <div style={{
        background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
        border: '1px solid rgba(102,126,234,.12)',
        borderRadius: '16px', padding: '20px 28px',
        display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '1.2rem' }}>🤝</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '3px' }}>
            All partners share a unified digital infrastructure
          </div>
          <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
            Single API integration · Real-time data sync · AI-powered automation · HIPAA-compliant platform
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['API', 'AI', 'HIPAA', 'Real-Time'].map(t => (
            <span key={t} style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', padding: '4px 12px', borderRadius: '50px',
              background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>

    {/* ── Partner cards grid ── */}
    <div style={{
      width: '100%', padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      alignItems: 'start',
      boxSizing: 'border-box',
    }}>
      {PARTNERS.map(p => <PartnerCard key={p.title} partner={p} />)}
    </div>

    {/* ── Integration timeline ── */}
    <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px 80px' }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,.07)',
      }}>
        {/* Timeline hero */}
        <div style={{
          background: T.gradBlue,
          padding: '28px 28px 24px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
            color: '#fff', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '4px 14px', borderRadius: '50px', marginBottom: '14px',
          }}>
            HealthNexus · Onboarding
          </div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 8px' }}>
            Simple integration process
          </h3>
          <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
            From application to live in under 8 days — zero friction onboarding.
          </p>
        </div>

        {/* Steps */}
        <div style={{ padding: '28px', position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              position: 'absolute', top: '21px', left: '12.5%', right: '12.5%',
              height: '2px',
              background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', top: '21px', left: '12.5%', width: '37.5%',
              height: '2px', background: T.gradTeal, zIndex: 0,
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative', zIndex: 1 }}>
              {STEPS.map((s, i) => {
                const st = stepStyle[s.state];
                return (
                  <div key={i} style={{ textAlign: 'center', padding: '0 8px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 12px',
                      fontSize: '1.1rem',
                      background: st.bg,
                      border: `1.5px solid ${st.border}`,
                      boxShadow: s.state === 'active' ? `0 0 0 6px ${st.bg}` : 'none',
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c', marginBottom: '3px' }}>{s.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.4, marginBottom: '4px' }}>{s.desc}</div>
                    <div style={{
                      display: 'inline-block',
                      fontSize: '0.65rem', fontWeight: 700,
                      color: st.color, background: st.bg,
                      border: `1px solid ${st.border}`,
                      padding: '2px 10px', borderRadius: '50px',
                    }}>{s.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
);

export default VendorBenefits;