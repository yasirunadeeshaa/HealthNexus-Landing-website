import {
  Calendar, Video, Heart, DollarSign,
  Search, Clock, RefreshCw, Bell, AlertCircle, Users,
  Camera, Share2, Mic, FileText, Shield,
  Activity, Pill, FileCheck, BarChart, Brain, Package,
  CreditCard, Zap, TrendingUp,
} from 'lucide-react';

interface VisibleSections {
  [key: string]: boolean;
}

interface DetailedFeaturesProps {
  activeFeatureCategory: string;
  setActiveFeatureCategory: (category: string) => void;
  isVisible: VisibleSections;
}

const categories = [
  {
    key: 'appointment',
    label: 'Appointments',
    icon: <Calendar size={16} />,
    color: '#534AB7',
    bg: '#EEEDFE',
    border: '#AFA9EC',
    title: 'Smart Appointment Management',
    subtitle: 'Book, reschedule, and track in real time',
    features: [
      { icon: <Search size={15} />, title: 'Advanced doctor search', desc: 'Filter by 15+ criteria: specialization, language, insurance, ratings.' },
      { icon: <Clock size={15} />, title: 'Real-time availability', desc: 'Live slot updates with instant booking confirmation.' },
      { icon: <RefreshCw size={15} />, title: 'Smart rescheduling', desc: 'AI suggests the best alternative slots automatically.', pill: { text: 'AI-powered', color: '#534AB7', bg: '#EEEDFE' } },
      { icon: <Bell size={15} />, title: 'Intelligent reminders', desc: 'Multi-channel notifications via SMS, email, and push.' },
      { icon: <AlertCircle size={15} />, title: 'Emergency appointments', desc: 'Priority booking for urgent care with nearest facility finder.' },
      { icon: <Users size={15} />, title: 'Group sessions', desc: 'Educational workshops and therapy group sessions.' },
    ],
  },
  {
    key: 'consultation',
    label: 'Telemedicine',
    icon: <Video size={16} />,
    color: '#993556',
    bg: '#FBEAF0',
    border: '#ED93B1',
    title: 'Next-Gen Telemedicine',
    subtitle: 'Crystal-clear, secure virtual consultations',
    features: [
      { icon: <Camera size={15} />, title: 'HD video quality', desc: 'Crystal-clear video with automatic quality adjustment.', pill: { text: 'HD adaptive', color: '#993556', bg: '#FBEAF0' } },
      { icon: <Share2 size={15} />, title: 'Screen sharing', desc: 'Share medical reports and images during consultation.' },
      { icon: <Mic size={15} />, title: 'AI transcription', desc: 'Automatic consultation notes with key highlights.' },
      { icon: <FileText size={15} />, title: 'Digital whiteboard', desc: 'Interactive tools for doctors to explain conditions.' },
      { icon: <Shield size={15} />, title: 'Secure recording', desc: 'Optional encrypted recording for future reference.' },
      { icon: <Bell size={15} />, title: 'Real-time chat', desc: 'In-call messaging with file sharing capabilities.' },
    ],
  },
  {
    key: 'health',
    label: 'Health Records',
    icon: <Heart size={16} />,
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#5DCAA5',
    title: 'Comprehensive Health Management',
    subtitle: 'Your complete health picture, always in sync',
    features: [
      { icon: <Activity size={15} />, title: 'Vital tracking', desc: 'Monitor BP, glucose, weight with trend analysis.', pill: { text: 'Live sync', color: '#0F6E56', bg: '#E1F5EE' } },
      { icon: <Pill size={15} />, title: 'Medication management', desc: 'Refill reminders, interaction checks, adherence tracking.' },
      { icon: <FileCheck size={15} />, title: 'Smart health records', desc: 'OCR-powered document scanning and categorization.' },
      { icon: <BarChart size={15} />, title: 'Health analytics', desc: 'AI-driven insights and predictive health alerts.' },
      { icon: <Brain size={15} />, title: 'Symptom checker', desc: 'AI-powered preliminary assessment with urgency indicators.' },
      { icon: <Package size={15} />, title: 'Lab integration', desc: 'Home sample collection and result tracking.' },
    ],
  },
  {
    key: 'payment',
    label: 'Payments',
    icon: <DollarSign size={16} />,
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
    title: 'Seamless Payment & Insurance',
    subtitle: 'Transparent billing with zero friction',
    features: [
      { icon: <CreditCard size={15} />, title: 'Multiple payment options', desc: 'Cards, wallets, EMI, and insurance coverage.' },
      { icon: <Shield size={15} />, title: 'Insurance verification', desc: 'Real-time eligibility check and claim estimation.', pill: { text: 'Instant check', color: '#854F0B', bg: '#FAEEDA' } },
      { icon: <FileCheck size={15} />, title: 'Auto claim filing', desc: 'Paperless claim submission with full tracking.' },
      { icon: <DollarSign size={15} />, title: 'Transparent pricing', desc: 'Upfront cost breakdown with no hidden charges.' },
      { icon: <RefreshCw size={15} />, title: 'Easy refunds', desc: 'Quick refund processing for cancellations.' },
      { icon: <BarChart size={15} />, title: 'Expense tracking', desc: 'Healthcare spending analytics and tax reports.' },
    ],
  },
];

const DetailedFeatures = ({ activeFeatureCategory, setActiveFeatureCategory }: DetailedFeaturesProps) => {
  const active = categories.find(c => c.key === activeFeatureCategory) ?? categories[0];

  return (
    <section
      id="detailed-features"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8f9ff 100%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      {[
        { size: 480, top: '-140px', left: '-140px', color: '#6366F1' },
        { size: 340, bottom: '-80px', right: '-80px', color: '#EC4899' },
        { size: 260, top: '45%', left: '52%', color: '#10B981' },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color}18 0%, transparent 70%)`,
            top: (b as any).top,
            bottom: (b as any).bottom,
            left: (b as any).left,
            right: (b as any).right,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="container-fluid px-4 px-lg-5" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="text-center mb-5">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#6366F1', background: '#EEEDFE',
            border: '1px solid #AFA9EC', padding: '6px 16px', borderRadius: 50,
            marginBottom: 20,
          }}>
            <Zap size={13} /> Platform Capabilities
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Comprehensive Healthcare
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Feature Suite
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Every tool your care journey needs — built for patients, doctors, and the ecosystem around them.
          </p>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 50,
            padding: 5,
            gap: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            {categories.map(cat => {
              const isActive = cat.key === activeFeatureCategory;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFeatureCategory(cat.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '9px 20px',
                    borderRadius: 50,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    background: isActive ? cat.color : 'transparent',
                    color: isActive ? '#fff' : '#6b7280',
                    boxShadow: isActive ? `0 4px 14px ${cat.color}44` : 'none',
                  }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Card ── */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '1.25rem 1.75rem',
            background: '#fafafa',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active.bg, color: active.color, fontSize: 20,
            }}>
              {active.icon}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{active.title}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{active.subtitle}</div>
            </div>
          </div>

          {/* Feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 10,
            padding: '1.25rem',
          }}>
            {active.features.map((f, i) => (
              <FeatureRow key={i} feature={f} color={active.color} />
            ))}
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 14,
          marginTop: 20,
        }}>
          {[
            { num: '15+', label: 'Search filters', color: '#534AB7' },
            { num: '99.9%', label: 'Video uptime', color: '#993556' },
            { num: '60%', label: 'Less admin work', color: '#0F6E56' },
            { num: '24/7', label: 'Health monitoring', color: '#854F0B' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 16,
              padding: '16px 20px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ── Isolated row component so hover works per-row ── */
const FeatureRow = ({
  feature,
  color,
}: {
  feature: { icon: React.ReactNode; title: string; desc: string; pill?: { text: string; color: string; bg: string } };
  color: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '10px 12px',
        background: hovered ? '#f3f4f6' : '#f9fafb',
        borderRadius: 12,
        borderLeft: `2.5px solid ${hovered ? color : 'transparent'}`,
        transition: 'background 0.18s, border-color 0.18s',
        cursor: 'default',
      }}
    >
      <div style={{ color, marginTop: 2, flexShrink: 0 }}>{feature.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{feature.title}</div>
        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{feature.desc}</div>
        {feature.pill && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600,
            padding: '3px 9px', borderRadius: 50,
            marginTop: 6,
            background: feature.pill.bg,
            color: feature.pill.color,
          }}>
            <TrendingUp size={10} /> {feature.pill.text}
          </span>
        )}
      </div>
    </div>
  );
};

// React import needed for useState in FeatureRow
import React from 'react';

export default DetailedFeatures;