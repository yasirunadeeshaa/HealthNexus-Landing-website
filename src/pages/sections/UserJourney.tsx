import { useState } from 'react';

/* ─── Shared token palette (matches VendorBenefits / Benefits) ─── */
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
  pink:         '#993556',
  pinkL:        'rgba(153,53,86,.12)',
  pinkBorder:   'rgba(153,53,86,.2)',
  red:          '#d94f4f',
  redL:         'rgba(217,79,79,.12)',
  redBorder:    'rgba(217,79,79,.2)',
  gradBlue:     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradTeal:     'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  gradPink:     'linear-gradient(135deg, #993556 0%, #6b3fa0 100%)',
  gradAmber:    'linear-gradient(135deg, #b85e0c 0%, #d94f4f 100%)',
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
interface Pill {
  text: string;
  color: string;
  bg: string;
  border: string;
}

interface StepFeature {
  icon: string;
  text: string;
}

interface JourneyStep {
  step: number;
  title: string;
  description: string;
  detail: string;
  icon: string;
  time: string;
  pill: Pill;
  features: StepFeature[];
}

/* ─── Data ─── */
const patientJourney: JourneyStep[] = [
  {
    step: 1,
    title: 'Sign Up in Seconds',
    description: 'Quick registration with social login or mobile OTP',
    detail: 'No paperwork, no waiting. Create your health profile in under 30 seconds with Google, Apple or a one-time mobile PIN.',
    icon: '👤',
    time: '30 sec',
    pill: { text: 'Instant', bg: T.tealL, color: T.teal, border: T.tealBorder },
    features: [
      { icon: '🔒', text: 'HIPAA-compliant profile' },
      { icon: '📱', text: 'OTP or social login' },
      { icon: '🛡️', text: 'End-to-end encrypted' },
    ],
  },
  {
    step: 2,
    title: 'Find Your Doctor',
    description: 'Search by symptoms, specialization, or get AI recommendations',
    detail: 'Our AI matches you to the right specialist based on your symptoms, location, language preference and insurance plan.',
    icon: '🔍',
    time: '1 min',
    pill: { text: 'AI-Powered', bg: T.purpleL, color: T.purple, border: T.purpleBorder },
    features: [
      { icon: '⭐', text: 'Verified reviews & ratings' },
      { icon: '🟢', text: 'Live availability shown' },
      { icon: '👥', text: '10,000+ specialist doctors' },
    ],
  },
  {
    step: 3,
    title: 'Book Instantly',
    description: 'Choose a convenient slot and consultation type',
    detail: 'Pick in-clinic, home visit or video — see real-time slots with live wait times. No phone calls, no hold music.',
    icon: '📅',
    time: '1 min',
    pill: { text: 'Zero Wait', bg: T.amberL, color: T.amber, border: T.amberBorder },
    features: [
      { icon: '⏰', text: 'Real-time slot availability' },
      { icon: '💳', text: 'Insurance pre-authorization' },
      { icon: '🔔', text: 'Instant confirmation SMS' },
    ],
  },
  {
    step: 4,
    title: 'Prepare for Visit',
    description: 'Upload reports, fill questionnaires, test video connection',
    detail: 'Smart pre-consultation forms auto-populate from your health records. Upload labs, scans and previous prescriptions — the doctor sees everything before you arrive.',
    icon: '📋',
    time: '3 min',
    pill: { text: 'Smart Forms', bg: T.purpleL, color: T.purple, border: T.purpleBorder },
    features: [
      { icon: '📄', text: 'Auto-fill from past records' },
      { icon: '🎥', text: 'One-click video test' },
      { icon: '⚠️', text: 'Symptom severity checker' },
    ],
  },
  {
    step: 5,
    title: 'Consult Your Doctor',
    description: 'Join HD video call or visit clinic with digital check-in',
    detail: 'Crystal-clear HD video with built-in noise cancellation. Share your screen, draw on images, and let the doctor annotate your scans in real time.',
    icon: '🎥',
    time: '15–30 min',
    pill: { text: 'HD Video', bg: T.tealL, color: T.teal, border: T.tealBorder },
    features: [
      { icon: '💬', text: 'Live chat alongside video' },
      { icon: '📁', text: 'Shared document viewer' },
      { icon: '🔐', text: 'Session recorded & encrypted' },
    ],
  },
  {
    step: 6,
    title: 'Receive Prescription',
    description: 'Digital e-prescription sent instantly to your phone',
    detail: 'E-prescriptions with drug-interaction warnings are sent directly to partner pharmacies. Order for home delivery or pick-up — tracked in real time.',
    icon: '💊',
    time: '2 min',
    pill: { text: 'E-Prescription', bg: T.pinkL, color: T.pink, border: T.pinkBorder },
    features: [
      { icon: '⚡', text: 'Direct pharmacy pipeline' },
      { icon: '✅', text: 'Drug interaction check' },
      { icon: '💳', text: 'Insurance auto-claim filed' },
    ],
  },
  {
    step: 7,
    title: 'Ongoing Care & Follow-up',
    description: 'Track health metrics, get reminders, book follow-ups',
    detail: 'Your health dashboard tracks vitals, medication adherence and upcoming labs. AI nudges remind you before anything slips through the cracks.',
    icon: '❤️',
    time: 'Continuous',
    pill: { text: 'Smart Reminders', bg: T.tealL, color: T.teal, border: T.tealBorder },
    features: [
      { icon: '⌚', text: 'Wearable sync (Fitbit, Apple)' },
      { icon: '🔄', text: 'Auto follow-up scheduling' },
      { icon: '📊', text: 'Personal health trend reports' },
    ],
  },
];

const doctorJourney: JourneyStep[] = [
  {
    step: 1,
    title: 'Professional Onboarding',
    description: 'Quick verification with medical license and credentials',
    detail: 'Upload your medical license and credentials once. Our verification engine cross-checks with national medical boards and confirms in under 48 hours.',
    icon: '✅',
    time: '< 48 hrs',
    pill: { text: 'Verified Badge', bg: T.tealL, color: T.teal, border: T.tealBorder },
    features: [
      { icon: '🛡️', text: 'National board cross-check' },
      { icon: '🏅', text: 'Verified badge on profile' },
      { icon: '🔐', text: 'Credential vault encrypted' },
    ],
  },
  {
    step: 2,
    title: 'Set Your Schedule',
    description: 'Flexible availability with smart slot management',
    detail: 'Sync your existing calendar or build a new one from scratch. Set per-visit fees, buffer times and blackout dates — all in one view.',
    icon: '🕐',
    time: '5 min',
    pill: { text: 'Auto-Sync', bg: T.purpleL, color: T.purple, border: T.purpleBorder },
    features: [
      { icon: '📅', text: 'Google / Outlook calendar sync' },
      { icon: '⏱️', text: 'Custom buffer times' },
      { icon: '💳', text: 'Per-slot fee configuration' },
    ],
  },
  {
    step: 3,
    title: 'Receive Appointments',
    description: 'Instant notifications with full patient history attached',
    detail: 'Each new booking arrives with the patient\'s full medical history, uploaded reports, and pre-consultation questionnaire — no hunting for records.',
    icon: '🔔',
    time: 'Real-time',
    pill: { text: 'Instant Alerts', bg: T.amberL, color: T.amber, border: T.amberBorder },
    features: [
      { icon: '📄', text: 'Full history pre-loaded' },
      { icon: '💬', text: 'Pre-visit patient message' },
      { icon: '📱', text: 'Push + SMS notification' },
    ],
  },
  {
    step: 4,
    title: 'Conduct Consultations',
    description: 'Advanced tools for diagnosis: annotation, vitals, AI assist',
    detail: 'HD video with real-time transcription, AI-suggested differential diagnoses, scan annotation tools and a built-in SOAP notes editor that auto-saves.',
    icon: '🩺',
    time: '15–45 min',
    pill: { text: 'AI Assist', bg: T.purpleL, color: T.purple, border: T.purpleBorder },
    features: [
      { icon: '🤖', text: 'AI differential diagnosis' },
      { icon: '📝', text: 'Auto SOAP notes transcription' },
      { icon: '🎥', text: 'Scan annotation in-call' },
    ],
  },
  {
    step: 5,
    title: 'Prescribe Digitally',
    description: 'E-prescriptions with drug-interaction safety checks',
    detail: 'Issue legally valid digital prescriptions with one click. The system flags interactions, checks allergies and routes directly to the patient\'s preferred pharmacy.',
    icon: '📄',
    time: '1 min',
    pill: { text: 'Safe & Legal', bg: T.tealL, color: T.teal, border: T.tealBorder },
    features: [
      { icon: '⚠️', text: 'Drug–drug interaction alerts' },
      { icon: '✅', text: 'Allergy cross-check' },
      { icon: '⚡', text: 'Direct pharmacy dispatch' },
    ],
  },
  {
    step: 6,
    title: 'Track Patient Outcomes',
    description: 'Monitor recovery, satisfaction scores and re-admission rates',
    detail: 'A per-patient outcome dashboard tracks medication adherence, follow-up compliance and patient-reported outcomes — so you can intervene early when needed.',
    icon: '📊',
    time: 'Ongoing',
    pill: { text: 'Outcome Data', bg: T.pinkL, color: T.pink, border: T.pinkBorder },
    features: [
      { icon: '⌚', text: 'Wearable vitals feed' },
      { icon: '⭐', text: 'Patient satisfaction score' },
      { icon: '🔄', text: 'Auto follow-up triggers' },
    ],
  },
  {
    step: 7,
    title: 'Grow Your Practice',
    description: 'Analytics, referral network, reviews and revenue insights',
    detail: 'See exactly where patients find you, which services drive revenue and how your ratings compare to peers. Built-in referral tools let you grow your network effortlessly.',
    icon: '📈',
    time: 'Always-on',
    pill: { text: 'Revenue+', bg: T.amberL, color: T.amber, border: T.amberBorder },
    features: [
      { icon: '💰', text: 'Monthly revenue breakdown' },
      { icon: '👥', text: 'Peer referral network' },
      { icon: '📊', text: 'Ranking & visibility score' },
    ],
  },
];

const STATS = [
  { icon: '⏱️', label: '5 Minutes',   sub: 'Avg setup time',        color: T.purple, bg: T.purpleL, border: T.purpleBorder },
  { icon: '🛡️', label: '100% Secure', sub: 'End-to-end encrypted',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
  { icon: '📱', label: 'Mobile First', sub: 'Access anywhere',       color: T.amber,  bg: T.amberL,  border: T.amberBorder },
  { icon: '⚡', label: '< 2 min',     sub: 'Avg booking time',      color: T.pink,   bg: T.pinkL,   border: T.pinkBorder },
];

const stepAccents = [T.purple, T.blue, T.amber, T.teal, T.pink, T.red, T.purple];

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
    <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── StepCard (Desktop) ─── */
const StepCard = ({ step, accent }: { step: JourneyStep; accent: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        background: '#fff',
        border: `1px solid ${hovered ? accent : '#e2e8f0'}`,
        borderRadius: '16px',
        padding: '14px 18px',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,.10)' : '0 2px 10px rgba(0,0,0,.05)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all .22s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: accent,
        opacity: hovered ? 1 : 0,
        transition: 'opacity .22s',
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Step badge */}
      <div style={{
        width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
        background: hovered ? accent : `${accent}18`,
        color: hovered ? '#fff' : accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', fontWeight: 800,
        boxShadow: hovered ? `0 6px 18px ${accent}40` : 'none',
        transition: 'all .22s',
      }}>
        {step.step}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
          <span style={{ fontSize: '1rem' }}>{step.icon}</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c' }}>{step.title}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.67rem', fontWeight: 700,
            padding: '2px 10px', borderRadius: '50px',
            background: step.pill.bg, color: step.pill.color,
            border: `1px solid ${step.pill.border}`,
          }}>{step.pill.text}</span>
          <span style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '0.65rem', fontWeight: 700, color: '#a0aec0',
            background: '#f7fafc', border: '1px solid #e2e8f0',
            padding: '2px 9px', borderRadius: '50px', whiteSpace: 'nowrap',
          }}>⏱ {step.time}</span>
        </div>

        {/* Description */}
        <div style={{ fontSize: '0.73rem', color: '#718096', marginBottom: '5px', lineHeight: 1.5 }}>
          {step.description}
        </div>

        {/* Detail */}
        <div style={{ fontSize: '0.72rem', color: '#4a5568', lineHeight: 1.65, marginBottom: '10px' }}>
          {step.detail}
        </div>

        {/* Feature tags */}
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
          {step.features.map((f, fi) => (
            <span key={fi} style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '0.67rem', fontWeight: 600, color: '#718096',
              background: '#f7fafc', border: '1px solid #e2e8f0',
              padding: '3px 10px', borderRadius: '50px',
            }}>
              <span style={{ color: accent }}>{f.icon}</span> {f.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── StepCard (Mobile accordion) ─── */
const StepCardMobile = ({ step, accent }: { step: JourneyStep; accent: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1px solid ${open ? accent : '#e2e8f0'}`,
      boxShadow: open ? '0 8px 32px rgba(0,0,0,.10)' : '0 2px 10px rgba(0,0,0,.05)',
      transition: 'box-shadow .3s ease, border-color .3s ease',
      marginBottom: '10px',
      position: 'relative',
    }}>
      {/* Left accent bar — always visible */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: accent,
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Accordion header */}
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: '100%', border: 'none', cursor: 'pointer',
          background: open
            ? `linear-gradient(135deg, ${accent}22 0%, ${accent}10 100%)`
            : '#fff',
          padding: '0',
          textAlign: 'left',
          display: 'block',
          transition: 'background .25s',
        }}
      >
        <div style={{
          padding: '13px 14px 13px 18px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          {/* Step badge */}
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
            background: open ? accent : `${accent}18`,
            color: open ? '#fff' : accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', fontWeight: 800,
            boxShadow: open ? `0 4px 14px ${accent}40` : 'none',
            transition: 'all .25s',
          }}>
            {step.step}
          </div>

          {/* Title & pill */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
              <span style={{ fontSize: '0.9rem' }}>{step.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c' }}>{step.title}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                fontSize: '0.62rem', fontWeight: 700,
                padding: '2px 8px', borderRadius: '50px',
                background: step.pill.bg, color: step.pill.color,
                border: `1px solid ${step.pill.border}`,
              }}>{step.pill.text}</span>
            </div>
            <div style={{ fontSize: '0.71rem', color: '#718096', lineHeight: 1.4 }}>
              {step.description}
            </div>
          </div>

          {/* Chevron wrapped to match accent color */}
          <div style={{
            width: '30px', height: '30px', borderRadius: '20%', flexShrink: 0,
            background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevronIcon open={open} />
          </div>
        </div>
      </button>

      {/* Collapsible body */}
      <div style={{
        maxHeight: open ? '800px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ padding: '0 14px 14px 18px' }}>
          <div style={{ height: '1px', background: `${accent}20`, margin: '0 0 12px' }} />

          {/* Time badge */}
          <div style={{ marginBottom: '10px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '0.65rem', fontWeight: 700, color: '#a0aec0',
              background: '#f7fafc', border: '1px solid #e2e8f0',
              padding: '2px 9px', borderRadius: '50px',
            }}>⏱ {step.time}</span>
          </div>

          {/* Detail */}
          <div style={{ fontSize: '0.73rem', color: '#4a5568', lineHeight: 1.65, marginBottom: '12px' }}>
            {step.detail}
          </div>

          {/* Feature tags */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
            {step.features.map((f, fi) => (
              <span key={fi} style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.67rem', fontWeight: 600, color: '#718096',
                background: '#f7fafc', border: '1px solid #e2e8f0',
                padding: '3px 10px', borderRadius: '50px',
              }}>
                <span style={{ color: accent }}>{f.icon}</span> {f.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ─── */
const UserJourney = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');
  const isMobile = useIsMobile();
  const steps = activeTab === 'patient' ? patientJourney : doctorJourney;
  const isPatient = activeTab === 'patient';

  return (
    <section id="user-journey">
      <style>{`
        @media (max-width: 767px) {
          #uj-header {
            padding: 48px 16px 32px !important;
          }
          #uj-stats-strip {
            gap: 8px !important;
            margin-top: 24px !important;
          }
          #uj-stats-strip > div {
            padding: 10px 14px !important;
          }
          #uj-compare-bar {
            margin: 0 16px 24px !important;
          }
          #uj-tab-switcher button {
            padding: 9px 16px !important;
            font-size: 0.78rem !important;
          }
          #uj-hero-card {
            margin: 0 16px 16px !important;
            padding: 18px 16px 16px !important;
          }
          #uj-hero-metrics {
            gap: 8px !important;
          }
          #uj-hero-metrics > div {
            padding: 6px 10px !important;
          }
          #uj-steps-list {
            padding: 0 16px !important;
            margin-bottom: 0px !important;
          }
        }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: '#fafbfc',
        color: '#1a202c',
      }}>

        {/* ── Section header ── */}
        <div id="uj-header" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
            border: '1px solid rgba(102,126,234,.2)',
            color: '#667eea', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '2.5px', textTransform: 'uppercase',
            padding: '6px 20px', borderRadius: '50px', marginBottom: '22px',
          }}>
            ✦ User Journey
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800,
            color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 14px',
          }}>
            Experience the seamless{' '}
            <span style={{
              background: 'linear-gradient(135deg,#667eea,#764ba2)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              healthcare journey
            </span>
          </h2>

          <p style={{ fontSize: '0.93rem', color: '#718096', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
            From sign-up to continuous care — every step designed for speed, safety and simplicity.
          </p>

          {/* Stats strip */}
          <div id="uj-stats-strip" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '36px' }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: '#fff', border: '1px solid rgba(102,126,234,.14)',
                borderRadius: '14px', padding: '14px 22px',
                display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,.05)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: s.bg, border: `1px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                }}>{s.icon}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1a202c', lineHeight: 1 }}>{s.label}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#a0aec0', marginTop: '3px' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Compare strip ── */}
        <div id="uj-compare-bar" style={{ maxWidth: '1100px', margin: '0 auto 32px', padding: '0 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
            border: '1px solid rgba(102,126,234,.12)',
            borderRadius: '16px', padding: '18px 26px',
            display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🗺️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: '2px' }}>
                7 steps. Under 8 minutes to your first consultation.
              </div>
              <div style={{ fontSize: '0.77rem', color: '#718096', lineHeight: 1.6 }}>
                HIPAA-compliant · AI-powered matching · Real-time booking · End-to-end encrypted
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['7 Steps', 'AI Match', 'E-Prescription', '24/7'].map(t => (
                <span key={t} style={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: '50px',
                  background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab switcher ── */}
        <div id="uj-tab-switcher" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', padding: '0 16px' }}>
          <div style={{
            display: 'inline-flex', background: '#fff',
            border: '1px solid rgba(102,126,234,.15)',
            borderRadius: '50px', padding: '4px', gap: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,.06)',
          }}>
            {(['patient', 'doctor'] as const).map(tab => {
              const active = activeTab === tab;
              const grad = tab === 'patient' ? T.gradPink : T.gradTeal;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 24px', borderRadius: '50px',
                    border: 'none', cursor: 'pointer',
                    fontSize: '0.82rem', fontWeight: 700,
                    transition: 'all .22s',
                    background: active ? grad : 'transparent',
                    color: active ? '#fff' : '#718096',
                    boxShadow: active ? '0 4px 16px rgba(0,0,0,.15)' : 'none',
                  }}
                >
                  <span>{tab === 'patient' ? '❤️' : '🩺'}</span>
                  {tab === 'patient' ? 'Patient Journey' : 'Doctor Journey'}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Journey Steps ── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Hero card for active tab */}
          <div id="uj-hero-card" style={{
            background: isPatient ? T.gradPink : T.gradTeal,
            borderRadius: '24px', overflow: 'hidden',
            padding: '22px 24px 20px',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-50px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />

            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
              color: '#fff', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              padding: '4px 14px', borderRadius: '50px', marginBottom: '12px',
            }}>
              HealthNexus · {isPatient ? 'Patient' : 'Doctor'} Journey
            </div>

            <h3 style={{ fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
              {isPatient ? '7 steps from sign-up to continuous care' : '7 steps from onboarding to practice growth'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: '500px' }}>
              {isPatient
                ? 'Everything designed to save you time, reduce cost, and keep your health on track.'
                : 'Built to grow your revenue, cut admin work, and give you more time with patients.'}
            </p>

            {/* Mini metrics */}
            <div id="uj-hero-metrics" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
              {(isPatient
                ? [
                    { v: '40 min', l: 'Saved/Visit' },
                    { v: '60%', l: 'Cost Saving' },
                    { v: '2M+', l: 'Patients' },
                    { v: '24/7', l: 'Support' },
                  ]
                : [
                    { v: '+45%', l: 'Revenue Lift' },
                    { v: '60%', l: 'Less Admin' },
                    { v: 'AI', l: 'Diagnosis Aid' },
                    { v: 'CME', l: 'Credits' },
                  ]
              ).map(m => (
                <div key={m.l} style={{
                  background: 'rgba(255,255,255,.15)',
                  border: '1px solid rgba(255,255,255,.25)',
                  borderRadius: '10px', padding: '8px 14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,.75)', marginTop: '2px' }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps list — desktop vs mobile */}
          <div id="uj-steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((step, idx) =>
              isMobile
                ? <StepCardMobile key={`${activeTab}-${idx}`} step={step} accent={stepAccents[idx % stepAccents.length]} />
                : <StepCard       key={`${activeTab}-${idx}`} step={step} accent={stepAccents[idx % stepAccents.length]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;