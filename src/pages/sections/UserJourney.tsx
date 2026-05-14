import { useState } from 'react';
import {
  Sparkles, Heart, Stethoscope, Timer, Shield, Smartphone,
  CheckCircle, Clock, UserPlus, Search, Calendar, Clipboard,
  Video, FileText, Bell, BarChart, TrendingUp, UserCheck,
  Zap, Lock, Star, Activity, MessageSquare, Pill, RefreshCw,
  Award, Users, CreditCard, AlertCircle, ChevronRight
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────
interface StepFeature {
  icon: React.ReactNode;
  text: string;
}

interface JourneyStep {
  step: number;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  time: string;
  pill: { text: string; color: string; bg: string };
  features: StepFeature[];
}

// ─── Data ──────────────────────────────────────────────────────
const patientJourney: JourneyStep[] = [
  {
    step: 1,
    title: 'Sign Up in Seconds',
    description: 'Quick registration with social login or mobile OTP',
    detail: 'No paperwork, no waiting. Create your health profile in under 30 seconds with Google, Apple or a one-time mobile PIN.',
    icon: <UserPlus size={20} />,
    time: '30 sec',
    pill: { text: 'Instant', bg: '#E1F5EE', color: '#0F6E56' },
    features: [
      { icon: <Lock size={12} />, text: 'HIPAA-compliant profile' },
      { icon: <Smartphone size={12} />, text: 'OTP or social login' },
      { icon: <Shield size={12} />, text: 'End-to-end encrypted' },
    ],
  },
  {
    step: 2,
    title: 'Find Your Doctor',
    description: 'Search by symptoms, specialization, or get AI recommendations',
    detail: 'Our AI matches you to the right specialist based on your symptoms, location, language preference and insurance plan.',
    icon: <Search size={20} />,
    time: '1 min',
    pill: { text: 'AI-Powered', bg: '#EEEDFE', color: '#534AB7' },
    features: [
      { icon: <Star size={12} />, text: 'Verified reviews & ratings' },
      { icon: <Activity size={12} />, text: 'Live availability shown' },
      { icon: <Users size={12} />, text: '10,000+ specialist doctors' },
    ],
  },
  {
    step: 3,
    title: 'Book Instantly',
    description: 'Choose a convenient slot and consultation type',
    detail: 'Pick in-clinic, home visit or video — see real-time slots with live wait times. No phone calls, no hold music.',
    icon: <Calendar size={20} />,
    time: '1 min',
    pill: { text: 'Zero Wait', bg: '#FAEEDA', color: '#854F0B' },
    features: [
      { icon: <Clock size={12} />, text: 'Real-time slot availability' },
      { icon: <CreditCard size={12} />, text: 'Insurance pre-authorization' },
      { icon: <Bell size={12} />, text: 'Instant confirmation SMS' },
    ],
  },
  {
    step: 4,
    title: 'Prepare for Visit',
    description: 'Upload reports, fill questionnaires, test video connection',
    detail: 'Smart pre-consultation forms auto-populate from your health records. Upload labs, scans and previous prescriptions — the doctor sees everything before you arrive.',
    icon: <Clipboard size={20} />,
    time: '3 min',
    pill: { text: 'Smart Forms', bg: '#EEEDFE', color: '#534AB7' },
    features: [
      { icon: <FileText size={12} />, text: 'Auto-fill from past records' },
      { icon: <Video size={12} />, text: 'One-click video test' },
      { icon: <AlertCircle size={12} />, text: 'Symptom severity checker' },
    ],
  },
  {
    step: 5,
    title: 'Consult Your Doctor',
    description: 'Join HD video call or visit clinic with digital check-in',
    detail: 'Crystal-clear HD video with built-in noise cancellation. Share your screen, draw on images, and let the doctor annotate your scans in real time.',
    icon: <Video size={20} />,
    time: '15–30 min',
    pill: { text: 'HD Video', bg: '#E1F5EE', color: '#0F6E56' },
    features: [
      { icon: <MessageSquare size={12} />, text: 'Live chat alongside video' },
      { icon: <FileText size={12} />, text: 'Shared document viewer' },
      { icon: <Shield size={12} />, text: 'Session recorded & encrypted' },
    ],
  },
  {
    step: 6,
    title: 'Receive Prescription',
    description: 'Digital e-prescription sent instantly to your phone',
    detail: 'E-prescriptions with drug-interaction warnings are sent directly to partner pharmacies. Order for home delivery or pick-up — tracked in real time.',
    icon: <Pill size={20} />,
    time: '2 min',
    pill: { text: 'E-Prescription', bg: '#FBEAF0', color: '#993556' },
    features: [
      { icon: <Zap size={12} />, text: 'Direct pharmacy pipeline' },
      { icon: <CheckCircle size={12} />, text: 'Drug interaction check' },
      { icon: <CreditCard size={12} />, text: 'Insurance auto-claim filed' },
    ],
  },
  {
    step: 7,
    title: 'Ongoing Care & Follow-up',
    description: 'Track health metrics, get reminders, book follow-ups',
    detail: 'Your health dashboard tracks vitals, medication adherence and upcoming labs. AI nudges remind you before anything slips through the cracks.',
    icon: <Heart size={20} />,
    time: 'Continuous',
    pill: { text: 'Smart Reminders', bg: '#E1F5EE', color: '#0F6E56' },
    features: [
      { icon: <Activity size={12} />, text: 'Wearable sync (Fitbit, Apple)' },
      { icon: <RefreshCw size={12} />, text: 'Auto follow-up scheduling' },
      { icon: <BarChart size={12} />, text: 'Personal health trend reports' },
    ],
  },
];

const doctorJourney: JourneyStep[] = [
  {
    step: 1,
    title: 'Professional Onboarding',
    description: 'Quick verification with medical license and credentials',
    detail: 'Upload your medical license and credentials once. Our verification engine cross-checks with national medical boards and confirms in under 48 hours.',
    icon: <UserCheck size={20} />,
    time: '< 48 hrs',
    pill: { text: 'Verified Badge', bg: '#E1F5EE', color: '#0F6E56' },
    features: [
      { icon: <Shield size={12} />, text: 'National board cross-check' },
      { icon: <Award size={12} />, text: 'Verified badge on profile' },
      { icon: <Lock size={12} />, text: 'Credential vault encrypted' },
    ],
  },
  {
    step: 2,
    title: 'Set Your Schedule',
    description: 'Flexible availability with smart slot management',
    detail: 'Sync your existing calendar or build a new one from scratch. Set per-visit fees, buffer times and blackout dates — all in one view.',
    icon: <Clock size={20} />,
    time: '5 min',
    pill: { text: 'Auto-Sync', bg: '#EEEDFE', color: '#534AB7' },
    features: [
      { icon: <Calendar size={12} />, text: 'Google / Outlook calendar sync' },
      { icon: <Timer size={12} />, text: 'Custom buffer times' },
      { icon: <CreditCard size={12} />, text: 'Per-slot fee configuration' },
    ],
  },
  {
    step: 3,
    title: 'Receive Appointments',
    description: 'Instant notifications with full patient history attached',
    detail: 'Each new booking arrives with the patient\'s full medical history, uploaded reports, and pre-consultation questionnaire — no hunting for records.',
    icon: <Bell size={20} />,
    time: 'Real-time',
    pill: { text: 'Instant Alerts', bg: '#FAEEDA', color: '#854F0B' },
    features: [
      { icon: <FileText size={12} />, text: 'Full history pre-loaded' },
      { icon: <MessageSquare size={12} />, text: 'Pre-visit patient message' },
      { icon: <Smartphone size={12} />, text: 'Push + SMS notification' },
    ],
  },
  {
    step: 4,
    title: 'Conduct Consultations',
    description: 'Advanced tools for diagnosis: annotation, vitals, AI assist',
    detail: 'HD video with real-time transcription, AI-suggested differential diagnoses, scan annotation tools and a built-in SOAP notes editor that auto-saves.',
    icon: <Stethoscope size={20} />,
    time: '15–45 min',
    pill: { text: 'AI Assist', bg: '#EEEDFE', color: '#534AB7' },
    features: [
      { icon: <Activity size={12} />, text: 'AI differential diagnosis' },
      { icon: <FileText size={12} />, text: 'Auto SOAP notes transcription' },
      { icon: <Video size={12} />, text: 'Scan annotation in-call' },
    ],
  },
  {
    step: 5,
    title: 'Prescribe Digitally',
    description: 'E-prescriptions with drug-interaction safety checks',
    detail: 'Issue legally valid digital prescriptions with one click. The system flags interactions, checks allergies and routes directly to the patient\'s preferred pharmacy.',
    icon: <FileText size={20} />,
    time: '1 min',
    pill: { text: 'Safe & Legal', bg: '#E1F5EE', color: '#0F6E56' },
    features: [
      { icon: <AlertCircle size={12} />, text: 'Drug–drug interaction alerts' },
      { icon: <CheckCircle size={12} />, text: 'Allergy cross-check' },
      { icon: <Zap size={12} />, text: 'Direct pharmacy dispatch' },
    ],
  },
  {
    step: 6,
    title: 'Track Patient Outcomes',
    description: 'Monitor recovery, satisfaction scores and re-admission rates',
    detail: 'A per-patient outcome dashboard tracks medication adherence, follow-up compliance and patient-reported outcomes — so you can intervene early when needed.',
    icon: <BarChart size={20} />,
    time: 'Ongoing',
    pill: { text: 'Outcome Data', bg: '#FBEAF0', color: '#993556' },
    features: [
      { icon: <Activity size={12} />, text: 'Wearable vitals feed' },
      { icon: <Star size={12} />, text: 'Patient satisfaction score' },
      { icon: <RefreshCw size={12} />, text: 'Auto follow-up triggers' },
    ],
  },
  {
    step: 7,
    title: 'Grow Your Practice',
    description: 'Analytics, referral network, reviews and revenue insights',
    detail: 'See exactly where patients find you, which services drive revenue and how your ratings compare to peers. Built-in referral tools let you grow your network effortlessly.',
    icon: <TrendingUp size={20} />,
    time: 'Always-on',
    pill: { text: 'Revenue+', bg: '#FAEEDA', color: '#854F0B' },
    features: [
      { icon: <TrendingUp size={12} />, text: 'Monthly revenue breakdown' },
      { icon: <Users size={12} />, text: 'Peer referral network' },
      { icon: <BarChart size={12} />, text: 'Ranking & visibility score' },
    ],
  },
];

// ─── Color palette helpers ─────────────────────────────────────
const stepAccents = [
  '#6366F1', '#8B5CF6', '#EC4899', '#0F6E56',
  '#854F0B', '#993556', '#534AB7',
];

const statItems = [
  { icon: <Timer size={18} />, label: '5 Minutes', sub: 'Avg setup time', bg: '#EEEDFE', color: '#534AB7' },
  { icon: <Shield size={18} />, label: '100% Secure', sub: 'End-to-end encrypted', bg: '#E1F5EE', color: '#0F6E56' },
  { icon: <Smartphone size={18} />, label: 'Mobile First', sub: 'Access anywhere', bg: '#FAEEDA', color: '#854F0B' },
  { icon: <Zap size={18} />, label: '< 2 min', sub: 'Avg booking time', bg: '#FBEAF0', color: '#993556' },
];

// ─── Component ────────────────────────────────────────────────
const UserJourney = () => {
  const [activeJourney, setActiveJourney] = useState<'patient' | 'doctor'>('patient');
  const steps = activeJourney === 'patient' ? patientJourney : doctorJourney;

  return (
    <section
      id="user-journey"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8f9ff 100%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      {[
        { size: 500, top: '-160px', left: '-160px', color: '#6366F1' },
        { size: 360, bottom: '-80px', right: '-80px', color: '#EC4899' },
        { size: 280, top: '40%', left: '50%', color: '#10B981' },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color}14 0%, transparent 70%)`,
            top: (b as any).top,
            bottom: (b as any).bottom,
            left: (b as any).left,
            right: (b as any).right,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.25rem',
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#6366F1',
              background: '#EEEDFE',
              border: '1px solid #AFA9EC',
              padding: '6px 16px',
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            <Sparkles size={13} /> User Journey
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.6rem)',
              fontWeight: 700,
              color: '#1a202c',
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Experience the Seamless
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Healthcare Journey
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            From sign-up to continuous care — every step designed for your convenience.
          </p>
        </div>

        {/* ── Tab switcher ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              background: '#f3f4f6',
              borderRadius: 50,
              padding: 4,
              gap: 4,
            }}
          >
            {(['patient', 'doctor'] as const).map(tab => {
              const active = activeJourney === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveJourney(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 22px',
                    borderRadius: 50,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'all 0.22s',
                    background: active
                      ? tab === 'patient'
                        ? 'linear-gradient(135deg, #6366F1, #EC4899)'
                        : 'linear-gradient(135deg, #0F6E56, #10B981)'
                      : 'transparent',
                    color: active ? '#fff' : '#6b7280',
                    boxShadow: active ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                  }}
                >
                  {tab === 'patient' ? <Heart size={16} /> : <Stethoscope size={16} />}
                  {tab === 'patient' ? 'Patient Journey' : 'Doctor Journey'}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginBottom: '2.5rem',
          }}
        >
          {statItems.map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: s.bg,
                  color: s.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c' }}>{s.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Journey Steps ── */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connector line (desktop) */}
          <div
            style={{
              position: 'absolute',
              left: 23,
              top: 24,
              bottom: 24,
              width: 2,
              background: 'linear-gradient(180deg, #6366F1 0%, #EC4899 100%)',
              borderRadius: 2,
              opacity: 0.25,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {steps.map((step, idx) => {
              const accent = stepAccents[idx % stepAccents.length];
              return (
                <StepCard key={`${activeJourney}-${idx}`} step={step} accent={accent} idx={idx} />
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          style={{
            marginTop: '2.5rem',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 20,
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>
            Ready to get started?
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>
            Join 2M+ users already on the platform — free to sign up, no credit card needed.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              }}
            >
              <Heart size={16} /> Join as Patient <ChevronRight size={14} />
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 50,
                border: '1.5px solid #0F6E56',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: '#fff',
                color: '#0F6E56',
              }}
            >
              <Stethoscope size={16} /> Join as Doctor <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Step Card sub-component ───────────────────────────────────
const StepCard = ({
  step,
  accent,
}: {
  step: JourneyStep;
  accent: string;
  idx: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        background: '#fff',
        border: `1px solid ${hovered ? accent + '55' : '#e5e7eb'}`,
        borderRadius: 20,
        padding: '1.25rem 1.5rem',
        boxShadow: hovered
          ? `0 12px 40px ${accent}18`
          : '0 4px 16px rgba(0,0,0,0.04)',
        transition: 'all 0.22s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: accent,
          borderRadius: '20px 0 0 20px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.22s',
        }}
      />

      {/* Step number badge */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          background: hovered ? accent : `${accent}18`,
          color: hovered ? '#fff' : accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 18,
          fontWeight: 800,
          transition: 'all 0.22s',
          boxShadow: hovered ? `0 6px 20px ${accent}40` : 'none',
        }}
      >
        {step.step}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 6,
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 4,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ color: accent }}>{step.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a202c' }}>{step.title}</div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 9px',
                  borderRadius: 50,
                  background: step.pill.bg,
                  color: step.pill.color,
                }}
              >
                {step.pill.text}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, lineHeight: 1.5 }}>
              {step.description}
            </div>
            <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.65, marginBottom: 10 }}>
              {step.detail}
            </div>
          </div>

          {/* Time badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              flexShrink: 0,
              padding: '4px 10px',
              background: '#f3f4f6',
              borderRadius: 50,
              whiteSpace: 'nowrap',
            }}
          >
            <Clock size={11} /> {step.time}
          </div>
        </div>

        {/* Feature tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {step.features.map((f, fi) => (
            <span
              key={fi}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                fontWeight: 500,
                color: '#6b7280',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                padding: '3px 10px',
                borderRadius: 50,
              }}
            >
              <span style={{ color: accent }}>{f.icon}</span>
              {f.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserJourney;