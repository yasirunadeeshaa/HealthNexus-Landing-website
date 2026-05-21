import { useState, useEffect } from 'react';

/* ─── Shared token palette (matches VendorBenefits / PricingCalculator / Benefits) ─── */
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
  gradGreen:    'linear-gradient(135deg, #11998e 0%, #1a5fa8 100%)',
};

/* ─── Types ─── */
interface CalculatorInputs {
  doctorVisits:    number;
  visitCost:       number;
  emergencyVisits: number;
  familyMembers:   number;
}

interface ComparisonProps {
  calculatorInputs?: CalculatorInputs;
}

interface ComparisonRow {
  icon: string;
  label: string;
  traditional: { main: string; sub: string };
  mediflow:    { main: string; sub: string };
  category: 'time' | 'cost' | 'access' | 'tech';
}

/* ─── Data ─── */
const COMPARISON_ROWS: ComparisonRow[] = [
  {
    icon: '🗓️',
    label: 'Appointment Booking',
    traditional: { main: 'Phone calls during office hours', sub: '2–3 days wait time' },
    mediflow:    { main: '24/7 instant online booking',    sub: 'Book in under 30 seconds' },
    category: 'time',
  },
  {
    icon: '💰',
    label: 'Consultation Cost',
    traditional: { main: 'LKR 5,000–15,000 + travel',     sub: 'Hidden fees common' },
    mediflow:    { main: 'LKR 2,500–8,000 flat rate',      sub: 'Save up to 60%' },
    category: 'cost',
  },
  {
    icon: '⏱️',
    label: 'Wait Time',
    traditional: { main: '45–90 mins in waiting room',     sub: 'Plus travel time' },
    mediflow:    { main: 'Join instantly, 0 mins wait',    sub: 'From home, office, anywhere' },
    category: 'time',
  },
  {
    icon: '📋',
    label: 'Medical Records',
    traditional: { main: 'Paper files, often misplaced',   sub: 'Requests take days' },
    mediflow:    { main: 'Digital, always accessible',     sub: 'Instant access, 24/7' },
    category: 'tech',
  },
  {
    icon: '🌍',
    label: 'Doctor Access',
    traditional: { main: 'Limited to local area',          sub: 'Few specialists available' },
    mediflow:    { main: 'Global specialist network',      sub: '10,000+ verified doctors' },
    category: 'access',
  },
  {
    icon: '💊',
    label: 'Prescriptions',
    traditional: { main: 'Paper prescriptions only',       sub: 'Visit pharmacy in person' },
    mediflow:    { main: 'E-prescriptions, digital send',  sub: 'Home delivery available' },
    category: 'tech',
  },
  {
    icon: '🚨',
    label: 'Emergency Triage',
    traditional: { main: 'Long ER queues, delayed triage', sub: 'Hours of uncertainty' },
    mediflow:    { main: 'Instant AI triage & doctor link',sub: 'Urgent slots prioritised' },
    category: 'time',
  },
  {
    icon: '🔒',
    label: 'Data Privacy',
    traditional: { main: 'Paper files, inconsistent security', sub: 'Shared without clear consent' },
    mediflow:    { main: 'End-to-end encrypted records',   sub: 'HIPAA-compliant, zero-share' },
    category: 'tech',
  },
];

const CATEGORY_COLORS: Record<string, { color: string; bg: string; border: string; label: string }> = {
  time:   { color: T.purple, bg: T.purpleL, border: T.purpleBorder, label: 'Time' },
  cost:   { color: T.teal,   bg: T.tealL,   border: T.tealBorder,   label: 'Cost' },
  access: { color: T.blue,   bg: T.blueL,   border: T.blueBorder,   label: 'Access' },
  tech:   { color: T.amber,  bg: T.amberL,  border: T.amberBorder,  label: 'Tech' },
};


/** Identical CardHero pattern used across all pages */
const CardHero = ({
  eyebrow, title, subtitle, grad,
}: {
  eyebrow: string; title: string; subtitle?: string; grad: string;
}) => (
  <div style={{ background: grad, padding: '22px 20px 18px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -50, right: 20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
    <div style={{
      display: 'inline-block', background: 'rgba(255,255,255,.18)',
      border: '1px solid rgba(255,255,255,.28)', color: '#fff',
      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
      padding: '4px 14px', borderRadius: 50, marginBottom: 14,
    }}>{eyebrow}</div>
    <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.4px', margin: '0 0 8px' }}>{title}</h3>
    {subtitle && (
      <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: 360 }}>{subtitle}</p>
    )}
  </div>
);

/** Identical CardShell pattern used across all pages */
const CardShell = ({
  children, hovered, onEnter, onLeave, style: extraStyle = {},
}: {
  children: React.ReactNode;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
}) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    style={{
      background: '#fff', borderRadius: 24, overflow: 'hidden',
      border: '1px solid rgba(102,126,234,.12)',
      boxShadow: hovered ? '0 20px 60px rgba(0,0,0,.13)' : '0 4px 20px rgba(0,0,0,.07)',
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'box-shadow .3s ease, transform .3s ease',
      display: 'flex', flexDirection: 'column',
      ...extraStyle,
    }}
  >
    {children}
  </div>
);

/* ─── Comparison Row ─── */
const ComparisonRowItem = ({ row, index, isMobile }: { row: ComparisonRow; index: number; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_COLORS[row.category];

  /* ── Mobile: stacked card layout ── */
  if (isMobile) {
    return (
      <div
        style={{
          borderBottom: '1px solid #f0f4f8',
          background: index % 2 === 0 ? '#fff' : '#fafbfc',
          padding: '14px 14px 16px',
        }}
      >
        {/* Feature header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: cat.bg, border: `1px solid ${cat.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', flexShrink: 0,
          }}>{row.icon}</span>
          <div>
            <div style={{ fontSize: '0.79rem', fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{row.label}</div>
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
              padding: '2px 7px', borderRadius: 50, background: cat.bg, color: cat.color,
            }}>{cat.label}</span>
          </div>
        </div>

        {/* Side-by-side mini columns on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {/* Traditional */}
          <div style={{
            background: 'rgba(217,79,79,.04)', border: '1px solid rgba(217,79,79,.1)',
            borderRadius: 10, padding: '10px 10px',
          }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: T.red, marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              🏥 Traditional
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
              <span style={{ color: T.red, fontSize: '0.8rem', flexShrink: 0, marginTop: 1 }}>✕</span>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#4a5568', lineHeight: 1.4 }}>{row.traditional.main}</div>
                <div style={{ fontSize: '0.65rem', color: '#a0aec0', marginTop: 2 }}>{row.traditional.sub}</div>
              </div>
            </div>
          </div>

          {/* HealthNexus */}
          <div style={{
            background: 'rgba(13,122,95,.05)', border: '1px solid rgba(13,122,95,.15)',
            borderRadius: 10, padding: '10px 10px',
          }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: T.teal, marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              💚 HealthNexus
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
              <span style={{ color: T.teal, fontSize: '0.8rem', flexShrink: 0, marginTop: 1 }}>✓</span>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1a202c', lineHeight: 1.4 }}>{row.mediflow.main}</div>
                <div style={{ fontSize: '0.65rem', color: T.teal, marginTop: 2, fontWeight: 600 }}>{row.mediflow.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop: original 3-col grid layout ── */
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 0,
        borderBottom: '1px solid #f0f4f8',
        background: hovered ? '#f9fbff' : index % 2 === 0 ? '#fff' : '#fafbfc',
        transition: 'background .18s',
      }}
    >
      {/* Feature name */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px',
        borderRight: '1px solid #f0f4f8',
      }}>
        <span style={{
          width: 34, height: 34, borderRadius: 9,
          background: cat.bg, border: `1px solid ${cat.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.95rem', flexShrink: 0,
        }}>{row.icon}</span>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{row.label}</div>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 50, background: cat.bg, color: cat.color,
          }}>{cat.label}</span>
        </div>
      </div>

      {/* Traditional */}
      <div style={{
        padding: '14px 16px', borderRight: '1px solid #f0f4f8',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: hovered ? 'rgba(217,79,79,.04)' : 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ color: T.red, fontSize: '0.85rem', flexShrink: 0, marginTop: 1 }}>✕</span>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4a5568', lineHeight: 1.45 }}>{row.traditional.main}</div>
            <div style={{ fontSize: '0.69rem', color: '#a0aec0', marginTop: 2 }}>{row.traditional.sub}</div>
          </div>
        </div>
      </div>

      {/* HealthNexus */}
      <div style={{
        padding: '14px 16px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: hovered ? 'rgba(13,122,95,.05)' : 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ color: T.teal, fontSize: '0.85rem', flexShrink: 0, marginTop: 1 }}>✓</span>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1a202c', lineHeight: 1.45 }}>{row.mediflow.main}</div>
            <div style={{ fontSize: '0.69rem', color: T.teal, marginTop: 2, fontWeight: 600 }}>{row.mediflow.sub}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const Comparison = ({ }: ComparisonProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  /* ── Mobile detection ── */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filteredRows = activeFilter === 'all'
    ? COMPARISON_ROWS
    : COMPARISON_ROWS.filter(r => r.category === activeFilter);

  const filters = [
    { key: 'all',    label: 'All features', icon: '⚡' },
    { key: 'time',   label: 'Time',          icon: '⏱️' },
    { key: 'cost',   label: 'Cost',          icon: '💰' },
    { key: 'access', label: 'Access',         icon: '🌍' },
    { key: 'tech',   label: 'Technology',     icon: '🔬' },
  ];

  return (
    <section id="comparison" style={{
      fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      background: '#fafbfc',
      color: '#1a202c',
    }}>

      {/* ── Section header ── */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '48px 16px 32px' : '72px 24px 48px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
          border: '1px solid rgba(102,126,234,.2)',
          color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: 50, marginBottom: 24,
        }}>
          ✦ Side-by-Side Comparison
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
        }}>
          Traditional healthcare vs{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            HealthNexus
          </span>
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
          Every dimension of care access, cost, time, and technology reimagined
          for the modern patient and doctor.
        </p>
      </div>

      {/* ── Infrastructure banner ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 40px', padding: isMobile ? '0 14px' : '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
          border: '1px solid rgba(102,126,234,.12)', borderRadius: 16,
          padding: isMobile ? '16px 16px' : '20px 28px',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚖️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>
              Objective, data-backed comparison across 8 key dimensions
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
              Appointment booking · Cost savings · Wait times · Records · Access · Prescriptions · Triage · Privacy
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['8 Metrics', 'Real Data', 'LKR Costs', 'HIPAA'].map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 50,
                background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Comparison table card ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 14px 40px' : '0 24px 40px' }}>
        <CardShell
          hovered={hoveredCard === 'table'}
          onEnter={() => setHoveredCard('table')}
          onLeave={() => setHoveredCard(null)}
        >
          {/* Hero */}
          <CardHero
            eyebrow="HealthNexus · Comparison"
            title="Feature by feature breakdown"
            subtitle="See exactly how HealthNexus outperforms traditional healthcare across every key area."
            grad={T.gradGreen}
          />

          {/* Filter pills — horizontally scrollable on mobile */}
          <div style={{
            padding: isMobile ? '14px 14px 0' : '16px 18px 0',
            display: 'flex', gap: 8,
            overflowX: isMobile ? 'auto' : 'unset',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            /* hide scrollbar but keep scroll functionality */
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          } as React.CSSProperties}>
            {filters.map(f => {
              const active = activeFilter === f.key;
              const cat = f.key !== 'all' ? CATEGORY_COLORS[f.key] : null;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '7px 16px', borderRadius: 50, border: 'none',
                    cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                    transition: 'all .2s',
                    flexShrink: 0,  /* prevents pills from squishing on mobile */
                    background: active
                      ? (cat ? cat.bg : T.blueL)
                      : '#f3f4f6',
                    color: active
                      ? (cat ? cat.color : T.blue)
                      : '#6b7280',
                    outline: active
                      ? `1.5px solid ${cat ? cat.border : T.blueBorder}`
                      : '1.5px solid transparent',
                  }}
                >
                  <span>{f.icon}</span> {f.label}
                </button>
              );
            })}
          </div>

          {/* Table header — hidden on mobile (labels shown inline per row instead) */}
          {!isMobile && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '14px 0 0',
              margin: '16px 18px 0',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              borderBottom: 'none',
            }}>
              <div style={{ padding: '10px 16px', background: '#f7fafc', borderRight: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: 0 }}>Feature</p>
              </div>
              <div style={{
                padding: '10px 16px', borderRight: '1px solid #e2e8f0',
                background: T.redL,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '1rem' }}>🏥</span>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 800, color: T.red, margin: 0 }}>Traditional Healthcare</p>
                  <p style={{ fontSize: '0.62rem', color: '#a0aec0', margin: 0 }}>Clinic & hospital visits</p>
                </div>
              </div>
              <div style={{
                padding: '10px 16px',
                background: T.tealL,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '1rem' }}>💚</span>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 800, color: T.teal, margin: 0 }}>HealthNexus Platform</p>
                  <p style={{ fontSize: '0.62rem', color: T.teal, margin: 0, opacity: 0.7 }}>Digital-first care</p>
                </div>
              </div>
            </div>
          )}

          {/* Rows */}
          <div style={{
            margin: isMobile ? '12px 14px 16px' : '0 18px',
            border: '1px solid #e2e8f0',
            borderTop: isMobile ? '1px solid #e2e8f0' : 'none',
            borderRadius: isMobile ? 12 : '0 0 12px 12px',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            {filteredRows.map((row, i) => (
              <ComparisonRowItem key={row.label} row={row} index={i} isMobile={isMobile} />
            ))}
          </div>
        </CardShell>
      </div>

      {/* ── Savings summary cards (2-col, same grid pattern as other pages) ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 14px 60px' : '0 24px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start',
      }}>
      </div>
    </section>
  );
};

export default Comparison;