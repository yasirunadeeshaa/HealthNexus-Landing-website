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
  purple:       '#6b3fa0',
  purpleL:      'rgba(107,63,160,.12)',
  purpleBorder: 'rgba(107,63,160,.2)',
  gradTeal:     'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  gradBlue:     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradGreen:    'linear-gradient(135deg, #11998e 0%, #0d7a5f 100%)',
  gradAmber:    'linear-gradient(135deg, #b85e0c 0%, #d94f4f 100%)',
  gradPurple:   'linear-gradient(135deg, #6b3fa0 0%, #993556 100%)',
};

/* ─── Hook: detect mobile ─── */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useState(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });
  return isMobile;
};

/* ─── Types ─── */
interface Service {
  icon: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  grad: string;
  shadowColor: string;
  metrics: Array<{ value: string; label: string; color: string; bg: string; border: string }>;
  features: string[];
}

interface SafetyItem {
  icon: string;
  title: string;
  desc: string;
}

interface Step {
  num: number;
  label: string;
  desc: string;
  state: 'done' | 'active' | 'pending';
}

/* ─── Sub-components ─── */

const MetricRow = ({ metrics }: { metrics: Service['metrics'] }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
    {metrics.map(m => (
      <div key={m.label} style={{
        flex: '1 1 60px', background: m.bg,
        border: `1px solid ${m.border}`, borderRadius: '12px',
        padding: '10px 10px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px' }}>{m.label}</div>
      </div>
    ))}
  </div>
);

const CapRow = ({ title, accentColor }: { icon: string; title: string; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 10px', borderRadius: '10px', marginBottom: '5px',
        background: hovered ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hovered ? accentColor : '#e2e8f0'}`,
        transition: 'background .18s, border-color .18s',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '0.85rem', flexShrink: 0, color: accentColor }}>✓</span>
      <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#1a202c' }}>{title}</span>
    </div>
  );
};

/* ─── Chevron Icon ─── */
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 20 20" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
      flexShrink: 0,
    }}
  >
    <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Service Card Body (shared between desktop & mobile) ─── */
const ServiceCardBody = ({ svc }: { svc: Service }) => (
  <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
    <MetricRow metrics={svc.metrics} />

    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 16px' }} />

    <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>
      What's included
    </p>
    {svc.features.map(f => (
      <CapRow key={f} icon="✓" title={f} accentColor={T.teal} />
    ))}
  </div>
);

/* ─── Service Card (Desktop) ─── */
const ServiceCard = ({ svc }: { svc: Service }) => {
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
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Hero */}
      <div style={{
        background: svc.grad,
        padding: '24px 22px 20px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
          color: '#fff', fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: '50px', marginBottom: '12px',
        }}>
          {svc.eyebrow}
        </div>

        <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{svc.icon}</div>

        <h3 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.3px', margin: '0 0 8px' }}>
          {svc.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>
          {svc.subtitle}
        </p>
      </div>

      <ServiceCardBody svc={svc} />
    </div>
  );
};

/* ─── Service Card (Mobile accordion) ─── */
const ServiceCardMobile = ({ svc }: { svc: Service }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(102,126,234,.12)',
      boxShadow: open ? '0 8px 32px rgba(0,0,0,.10)' : '0 2px 10px rgba(0,0,0,.06)',
      transition: 'box-shadow .3s ease',
      marginBottom: '12px',
    }}>
      {/* Accordion header — always visible */}
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: '100%',
          background: svc.grad,
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          textAlign: 'left',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative blobs */}
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', right: '15px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />

        <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
              color: '#fff', fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: '50px', marginBottom: '8px',
            }}>
              {svc.eyebrow}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1.2rem' }}>{svc.icon}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.3px', margin: 0 }}>
                {svc.title}
              </h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,.80)', fontSize: '0.75rem', lineHeight: 1.5, margin: 0 }}>
              {svc.subtitle}
            </p>
          </div>
          {/* Chevron */}
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ChevronIcon open={open} />
          </div>
        </div>
      </button>

      {/* Collapsible body */}
      <div style={{
        maxHeight: open ? '1200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <ServiceCardBody svc={svc} />
      </div>
    </div>
  );
};

/* ─── Data ─── */
const SERVICES: Service[] = [
  {
    icon: '👨‍⚕️',
    eyebrow: 'HealthNexus · Home 01',
    title: 'Doctor Consultations',
    subtitle: 'Experienced physicians visit your home for comprehensive health assessments and specialist referrals.',
    grad: T.gradTeal,
    shadowColor: 'rgba(13,122,95,.35)',
    metrics: [
      { value: 'GP+',   label: 'Specialists',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '24/7',  label: 'Emergency',    color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'Full',  label: 'Assessment',   color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: 'Rx',    label: 'Prescription', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    features: [
      'General physicians & specialists',
      'Complete health assessment',
      'Prescription & follow-up care',
      'Emergency visits available',
      'Digital health summary report',
    ],
  },
  {
    icon: '🤝',
    eyebrow: 'HealthNexus · Home 02',
    title: 'Nursing Care',
    subtitle: 'Professional nursing for post-operative recovery, chronic condition management, and daily patient assistance.',
    grad: T.gradGreen,
    shadowColor: 'rgba(17,153,142,.35)',
    metrics: [
      { value: '24/7', label: 'Support',    color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: 'IV',   label: 'Capable',   color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'Live', label: 'Vitals',    color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: 'RN',   label: 'Certified', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    features: [
      '24/7 nursing support',
      'Wound care & dressing',
      'Medication administration',
      'Vitals monitoring & logging',
      'Care plan coordination',
    ],
  },
  {
    icon: '🧪',
    eyebrow: 'HealthNexus · Home 03',
    title: 'Lab Sample Collection',
    subtitle: 'Certified phlebotomists collect samples at home with strict safety protocols and fast digital results.',
    grad: T.gradBlue,
    shadowColor: 'rgba(102,126,234,.35)',
    metrics: [
      { value: '48h',  label: 'Results',   color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '100+', label: 'Tests',     color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'Safe', label: 'Protocols', color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: 'PDF',  label: 'Reports',   color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    features: [
      'Blood tests & cultures',
      'Urine & stool analysis',
      'COVID-19 & flu tests',
      'Results in 24–48 hours',
      'Digital report delivery',
    ],
  },
  {
    icon: '🏃',
    eyebrow: 'HealthNexus · Home 04',
    title: 'Physiotherapy',
    subtitle: 'Expert physiotherapists help you recover strength and mobility with personalized rehabilitation programs.',
    grad: T.gradPurple,
    shadowColor: 'rgba(107,63,160,.35)',
    metrics: [
      { value: 'Post', label: 'Surgery',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: 'Pain', label: 'Mgmt',    color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'Equip',label: 'Provided', color: T.amber,  bg: T.amberL,  border: T.amberBorder },
      { value: 'Track',label: 'Progress', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    features: [
      'Post-surgery rehabilitation',
      'Pain management therapy',
      'Mobility improvement plans',
      'Equipment provided',
      'Progress tracking reports',
    ],
  },
];

const SAFETY_ITEMS: SafetyItem[] = [
  { icon: '🛡️', title: 'Verified professionals',  desc: 'Background-checked and licensed healthcare providers only' },
  { icon: '🌡️', title: 'Daily health screening',  desc: 'Every visiting professional passes a health check before appointments' },
  { icon: '✨', title: 'Sterile equipment',        desc: 'All medical tools are properly sterilized before each visit' },
  { icon: '📞', title: '24/7 support line',        desc: 'Round-the-clock assistance for emergencies and concerns' },
  { icon: '🪪', title: 'ID-verified entry',        desc: 'Providers carry digital ID badges you can verify on arrival' },
  { icon: '🔒', title: 'Data privacy',             desc: 'Your health records are encrypted and never shared without consent' },
];

const STEPS: Step[] = [
  { num: 1, label: 'Book service',     desc: 'Choose your service type and preferred time slot',         state: 'done' },
  { num: 2, label: 'Get confirmed',    desc: "Receive confirmation with your provider's profile",        state: 'done' },
  { num: 3, label: 'Provider arrives', desc: 'Verified professional arrives at your door on time',       state: 'active' },
  { num: 4, label: 'Receive care',     desc: 'Get expert care and a digital follow-up summary',          state: 'pending' },
];

const stepStyle = {
  done:    { bg: T.tealL,   border: T.tealBorder,   color: T.teal },
  active:  { bg: T.purpleL, border: T.purpleBorder, color: T.purple },
  pending: { bg: '#f1f5f9', border: '#e2e8f0',      color: '#94a3b8' },
};

/* ─── Safety row with hover ─── */
const SafetyRow = ({ item }: { item: SafetyItem }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        padding: '9px 12px', borderRadius: '10px',
        background: hovered ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hovered ? T.teal : '#e2e8f0'}`,
        transition: 'background .18s, border-color .18s',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c', marginBottom: '2px' }}>{item.title}</div>
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.5 }}>{item.desc}</div>
      </div>
    </div>
  );
};

/* ─── Main component ─── */
const HomeVisit = () => {
  const isMobile = useIsMobile();

  return (
    <section id="homevisit">
      <style>{`
        @media (max-width: 767px) {
          #hv-cards-grid {
            display: block !important;
            padding: 0 16px !important;
          }
          #hv-header {
            padding: 48px 16px 32px !important;
          }
          #hv-compare-bar {
            margin: 0 16px 24px !important;
          }
          #hv-safety {
            margin: 24px 16px 0 !important;
            padding: 0 !important;
          }
          #hv-timeline {
            margin: 24px 16px 0 !important;
            padding: 0 0 48px !important;
          }
          #hv-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          #hv-connector-line,
          #hv-connector-fill {
            display: none !important;
          }
        }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: '#fafbfc',
        color: '#1a202c',
      }}>

        {/* ── Section header ── */}
        <div id="hv-header" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
          <div style={{
            display: 'inline-block',
            background: T.tealL,
            border: `1px solid ${T.tealBorder}`,
            color: T.teal, fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '2.5px', textTransform: 'uppercase',
            padding: '6px 20px', borderRadius: '50px', marginBottom: '24px',
          }}>
            Home Healthcare
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800,
            color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
          }}>
            Healthcare That Comes{' '}
            <span style={{
              background: T.gradTeal,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              To Your Doorstep
            </span>
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
            Professional medical care in the comfort of your home — safe, convenient, and fully personalized.
          </p>
        </div>

        {/* ── Compare strip ── */}
        <div id="hv-compare-bar" style={{ maxWidth: '1100px', margin: '0 auto 40px', padding: '0 24px' }}>
          <div style={{
            background: `linear-gradient(135deg,${T.tealL},rgba(26,95,168,.06))`,
            border: `1px solid ${T.tealBorder}`,
            borderRadius: '16px', padding: '20px 28px',
            display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🏠</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '3px' }}>
                All home services share a unified care platform
              </div>
              <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
                Verified professionals · Real-time tracking · Digital reports · 24/7 emergency support
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Verified', 'Tracked', 'Digital', '24/7'].map(t => (
                <span key={t} style={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px',
                  textTransform: 'uppercase', padding: '4px 12px', borderRadius: '50px',
                  background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Service cards ── */}
        {isMobile ? (
          /* Mobile: stacked accordions */
          <div id="hv-cards-grid" style={{ padding: '0 16px' }}>
            {SERVICES.map(svc => (
              <ServiceCardMobile key={svc.title} svc={svc} />
            ))}
          </div>
        ) : (
          /* Desktop: 4-column grid */
          <div id="hv-cards-grid" style={{
            width: '100%', padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            alignItems: 'start',
            boxSizing: 'border-box',
          }}>
            {SERVICES.map(svc => <ServiceCard key={svc.title} svc={svc} />)}
          </div>
        )}

        {/* ── Safety ── */}
        <div id="hv-safety" style={{ margin: '28px auto 0', padding: '0 24px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(102,126,234,.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,.07)',
          }}>
            {/* Safety items */}
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                {SAFETY_ITEMS.map(item => (
                  <SafetyRow key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── How it works ── */}
        <div id="hv-timeline" style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px 80px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(102,126,234,.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,.07)',
          }}>
            {/* Timeline hero */}
            <div style={{
              background: T.gradTeal,
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
                HealthNexus · How It Works
              </div>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 8px' }}>
                Simple booking process
              </h3>
              <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
                From booking to bedside care — in just a few taps.
              </p>
            </div>

            {/* Steps */}
            <div style={{ padding: '28px', position: 'relative' }}>
              <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
                {/* Connector line — hidden on mobile via CSS */}
                <div id="hv-connector-line" style={{
                  position: 'absolute', top: '21px', left: '12.5%', right: '12.5%',
                  height: '2px',
                  background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)',
                  zIndex: 0,
                }} />
                <div id="hv-connector-fill" style={{
                  position: 'absolute', top: '21px', left: '12.5%', width: '37.5%',
                  height: '2px', background: T.gradTeal, zIndex: 0,
                }} />

                <div id="hv-steps-grid" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 0, position: 'relative', zIndex: 1,
                }}>
                  {STEPS.map(s => {
                    const st = stepStyle[s.state];
                    return (
                      <div key={s.num} style={{ textAlign: 'center', padding: '0 8px' }}>
                        <div style={{
                          width: '42px', height: '42px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 12px',
                          fontSize: '0.88rem', fontWeight: 800, color: st.color,
                          background: st.bg,
                          border: `1.5px solid ${st.border}`,
                          boxShadow: s.state === 'active' ? `0 0 0 6px ${st.bg}` : 'none',
                        }}>
                          {s.num}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c', marginBottom: '3px' }}>{s.label}</div>
                        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.4, marginBottom: '4px' }}>{s.desc}</div>
                        <div style={{
                          display: 'inline-block',
                          fontSize: '0.65rem', fontWeight: 700,
                          color: st.color, background: st.bg,
                          border: `1px solid ${st.border}`,
                          padding: '2px 10px', borderRadius: '50px',
                        }}>Step {s.num}</div>
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
};

export default HomeVisit;