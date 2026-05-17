import { useState } from 'react';

/* ─── Shared token palette (matches VendorBenefits) ─── */
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
  green:        '#2d8c5c',
  greenL:       'rgba(45,140,92,.12)',
  greenBorder:  'rgba(45,140,92,.2)',
  gradPink:     'linear-gradient(135deg, #993556 0%, #6b3fa0 100%)',
  gradTeal:     'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
};

/* ─── Types ─── */
interface Pill {
  text: string;
  color: string;
  bg: string;
}

interface Benefit {
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
  pill?: Pill;
}

interface Metric {
  value: string;
  label: string;
  color: string;
  bg: string;
  border: string;
}

interface Insight {
  icon: string;
  bg: string;
  border: string;
  title: string;
  body: string;
}

interface BenefitCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  grad: string;
  accentColor: string;
  metrics: Metric[];
  insight: Insight;
  benefits: Benefit[];
}

/* ─── Sub-components ─── */

const MetricRow = ({ metrics }: { metrics: Metric[] }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '16px 18px 0' }}>
    {metrics.map(m => (
      <div
        key={m.label}
        style={{
          flex: '1 1 70px',
          background: m.bg,
          border: `1px solid ${m.border}`,
          borderRadius: '12px',
          padding: '10px 12px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px' }}>{m.label}</div>
      </div>
    ))}
  </div>
);

const InsightBar = ({ insight }: { insight: Insight }) => (
  <div style={{
    margin: '0 18px 20px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: insight.bg,
    border: `1px solid ${insight.border}`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  }}>
    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{insight.icon}</span>
    <div style={{ fontSize: '0.75rem', color: '#4a5568', lineHeight: 1.55 }}>
      <strong style={{ fontWeight: 700, color: '#1a202c' }}>{insight.title}</strong>{' '}
      {insight.body}
    </div>
  </div>
);

const BenefitRow = ({
  benefit,
  accentColor,
}: {
  benefit: Benefit;
  accentColor: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '10px 12px',
        borderRadius: '10px',
        marginBottom: '6px',
        background: hovered ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hovered ? accentColor : '#e2e8f0'}`,
        borderLeft: `3px solid ${hovered ? accentColor : 'transparent'}`,
        transition: 'background .18s, border-color .18s',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: benefit.iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95rem',
        flexShrink: 0,
        marginTop: '1px',
      }}>
        {benefit.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '2px' }}>{benefit.title}</div>
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.5 }}>{benefit.desc}</div>
        {benefit.pill && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.67rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '50px',
            marginTop: '6px',
            background: benefit.pill.bg,
            color: benefit.pill.color,
          }}>
            {benefit.pill.text}
          </span>
        )}
      </div>
    </div>
  );
};

/* ─── Benefit Card ─── */
const BenefitCardComponent = ({ card }: { card: BenefitCard }) => {
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
        background: card.grad,
        padding: '24px 22px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,.18)',
          border: '1px solid rgba(255,255,255,.28)',
          color: '#fff',
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '4px 14px',
          borderRadius: '50px',
          marginBottom: '14px',
        }}>
          {card.eyebrow}
        </div>

        <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.4px', margin: '0 0 8px' }}>
          {card.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: '360px' }}>
          {card.subtitle}
        </p>
      </div>

      {/* Metrics */}
      <MetricRow metrics={card.metrics} />

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '16px 18px' }} />

      {/* Insight */}
      <InsightBar insight={card.insight} />

      {/* Benefits label */}
      <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 18px 8px' }}>
        Key Benefits
      </p>

      {/* Benefits list */}
      <div style={{ padding: '0 18px 20px' }}>
        {card.benefits.map(b => (
          <BenefitRow key={b.title} benefit={b} accentColor={card.accentColor} />
        ))}
      </div>
    </div>
  );
};

/* ─── Data ─── */
const BENEFIT_CARDS: BenefitCard[] = [
  {
    eyebrow: 'HealthNexus · For Patients',
    title: 'Patient Experience',
    subtitle: 'Care that finds you — fast, private, affordable, and always available.',
    grad: T.gradPink,
    accentColor: T.pink,
    metrics: [
      { value: '40 min', label: 'Saved/Visit',  color: T.pink,   bg: T.pinkL,   border: T.pinkBorder },
      { value: '2M+',   label: 'Patients',      color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: '0',     label: 'Travel Cost',   color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '24/7',  label: 'Support',       color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    insight: {
      icon: '💡',
      bg: T.pinkL,
      border: T.pinkBorder,
      title: 'Why it matters:',
      body: '63% of patients skip care due to wait times and cost. HealthNexus removes both barriers — putting quality healthcare within reach for everyone, everywhere.',
    },
    benefits: [
      {
        icon: '⚡',
        iconBg: 'rgba(153,53,86,.1)',
        title: 'Instant consultations',
        desc: 'Connect with a verified doctor in under 3 minutes, any time of day or night.',
        pill: { text: 'Avg. 3 min wait', color: T.pink, bg: T.pinkL },
      },
      {
        icon: '💰',
        iconBg: 'rgba(184,94,12,.1)',
        title: 'Up to 60% cost savings',
        desc: 'Telemedicine fees are a fraction of in-clinic costs. No travel, no parking, no hidden fees.',
        pill: { text: '60% cheaper on avg.', color: T.amber, bg: T.amberL },
      },
      {
        icon: '🌍',
        iconBg: 'rgba(26,95,168,.1)',
        title: 'Global specialist access',
        desc: 'Browse and book verified specialists across 40+ specialties worldwide — including rare conditions.',
        pill: { text: '10,000+ doctors', color: T.blue, bg: T.blueL },
      },
      {
        icon: '🔒',
        iconBg: 'rgba(13,122,95,.1)',
        title: 'Bank-grade privacy & encryption',
        desc: 'End-to-end encrypted records. Your data is never sold or shared without explicit consent.',
      },
      {
        icon: '❤️',
        iconBg: 'rgba(217,79,79,.1)',
        title: 'Continuous care & monitoring',
        desc: 'Smart health reminders, chronic condition tracking, and follow-up nudges built right in.',
      },
      {
        icon: '👨‍👩‍👧',
        iconBg: 'rgba(107,63,160,.1)',
        title: 'Family health hub',
        desc: 'Manage appointments, prescriptions, and records for every family member from one account.',
        pill: { text: 'Multi-profile support', color: T.purple, bg: T.purpleL },
      },
      {
        icon: '📋',
        iconBg: 'rgba(13,122,95,.1)',
        title: 'Unified health records',
        desc: 'All your lab results, prescriptions, visit notes, and imaging — searchable in one place.',
      },
      {
        icon: '💊',
        iconBg: 'rgba(184,94,12,.1)',
        title: 'E-prescription delivery',
        desc: 'Doctors send prescriptions digitally, straight to your preferred pharmacy for same-day fulfillment.',
      },
    ],
  },
  {
    eyebrow: 'HealthNexus · For Doctors',
    title: 'Doctor Growth Suite',
    subtitle: 'Tools that cut admin, grow revenue, and let you focus on what matters most — patients.',
    grad: T.gradTeal,
    accentColor: T.teal,
    metrics: [
      { value: '+45%', label: 'Revenue Lift',     color: T.teal,   bg: T.tealL,   border: T.tealBorder },
      { value: '60%',  label: 'Less Admin',       color: T.blue,   bg: T.blueL,   border: T.blueBorder },
      { value: 'AI',   label: 'Diagnosis Assist', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
      { value: 'CME',  label: 'Credits Included', color: T.amber,  bg: T.amberL,  border: T.amberBorder },
    ],
    insight: {
      icon: '📊',
      bg: T.tealL,
      border: T.tealBorder,
      title: 'The opportunity:',
      body: 'Doctors on HealthNexus see an average 45% revenue increase within 6 months — driven by reduced no-shows, faster admin, and access to a verified patient base of 2M+.',
    },
    benefits: [
      {
        icon: '📈',
        iconBg: 'rgba(13,122,95,.1)',
        title: '45% average revenue growth',
        desc: 'Expand your reach to 2M+ verified patients. More consultations, zero extra overhead.',
        pill: { text: '+45% in 6 months', color: T.teal, bg: T.tealL },
      },
      {
        icon: '🤖',
        iconBg: 'rgba(107,63,160,.1)',
        title: 'AI-assisted clinical tools',
        desc: 'AI summarises patient history, flags anomalies, drafts SOAP notes, and suggests diagnoses.',
        pill: { text: 'AI-powered', color: T.purple, bg: T.purpleL },
      },
      {
        icon: '⏱️',
        iconBg: 'rgba(184,94,12,.1)',
        title: '60% less administrative overhead',
        desc: 'Automated scheduling, smart reminders, and digital billing slash paperwork dramatically.',
        pill: { text: '60% time saved', color: T.amber, bg: T.amberL },
      },
      {
        icon: '📊',
        iconBg: 'rgba(26,95,168,.1)',
        title: 'Live performance analytics',
        desc: 'Real-time dashboards for patient satisfaction, consultation volume, earnings, and reviews.',
      },
      {
        icon: '🗓️',
        iconBg: 'rgba(13,122,95,.1)',
        title: 'Flexible scheduling & telemedicine',
        desc: 'Work from anywhere. Set your own hours, accept walk-ins, or batch appointments by specialty.',
      },
      {
        icon: '🩺',
        iconBg: 'rgba(153,53,86,.1)',
        title: 'Digital prescriptions & referrals',
        desc: 'One-click e-prescriptions routed to nearby pharmacies. Seamless specialist referrals built in.',
      },
      {
        icon: '🎓',
        iconBg: 'rgba(184,94,12,.1)',
        title: 'CME credits & professional growth',
        desc: 'Access curated clinical education and earn CME credits directly inside the platform.',
        pill: { text: 'Credits included', color: T.amber, bg: T.amberL },
      },
      {
        icon: '⭐',
        iconBg: 'rgba(107,63,160,.1)',
        title: 'Reputation & review management',
        desc: 'Build your profile with verified ratings, showcase specialties, and grow through patient referrals.',
      },
    ],
  },
];

/* ─── Main component ─── */
const Benefits = () => (
  <section id="benefits">
  <div style={{
    fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    background: '#fafbfc',
    color: '#1a202c',
  }}>

    {/* ── Section header ── */}
    <div style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
        border: '1px solid rgba(102,126,234,.22)',
        color: '#667eea',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        padding: '6px 20px',
        borderRadius: '50px',
        marginBottom: '22px',
      }}>
        ✦ Platform Benefits
      </div>

      <h2 style={{
        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
        fontWeight: 800,
        color: '#1a202c',
        letterSpacing: '-1px',
        lineHeight: 1.15,
        margin: '0 0 14px',
      }}>
        Built for everyone in{' '}
        <span style={{
          background: 'linear-gradient(135deg,#667eea,#764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          the care journey
        </span>
      </h2>

      <p style={{ fontSize: '0.93rem', color: '#718096', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
        Whether you're seeking care or delivering it, HealthNexus gives patients and
        doctors a smarter, faster, more connected experience.
      </p>

    </div>

    {/* ── Compare strip ── */}
    <div style={{ maxWidth: '1100px', margin: '0 auto 40px', padding: '0 24px' }}>
      <div style={{
        background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
        border: '1px solid rgba(102,126,234,.12)',
        borderRadius: '16px',
        padding: '18px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '1.2rem' }}>🤝</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '2px' }}>
            One platform. Two powerful perspectives.
          </div>
          <div style={{ fontSize: '0.77rem', color: '#718096', lineHeight: 1.6 }}>
            HIPAA-compliant · AI-powered · Real-time sync · End-to-end encrypted
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['HIPAA', 'AI', 'Real-Time', 'Encrypted'].map(t => (
            <span key={t} style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '50px',
              background: '#fff',
              color: '#4a5568',
              border: '1px solid #e2e8f0',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>

    {/* ── Two-column card grid ── */}
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 24px 80px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '22px',
      alignItems: 'start',
      boxSizing: 'border-box',
    }}>
      {BENEFIT_CARDS.map(card => (
        <BenefitCardComponent key={card.title} card={card} />
      ))}
    </div>
  </div>
  </section>
);

export default Benefits;