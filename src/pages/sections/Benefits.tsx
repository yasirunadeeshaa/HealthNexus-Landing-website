import {
  Clock, DollarSign, Globe, Shield, Heart, Users,
  TrendingUp, BarChart, Award, Brain, MapPin,
  HeartHandshake, Stethoscope, Zap, Sparkles,
} from 'lucide-react';

interface VisibleSections {
  [key: string]: boolean;
}

interface BenefitsProps {
  isVisible: VisibleSections;
}

const patientBenefits = [
  {
    icon: <Clock size={15} />,
    title: 'Save time',
    desc: 'No more waiting rooms — consult from anywhere, anytime.',
    pill: { icon: <TrendingUp size={11} />, text: '~40 min saved/visit', style: 'pink' },
  },
  {
    icon: <DollarSign size={15} />,
    title: 'Cost effective',
    desc: 'Lower consultation fees and zero travel costs, guaranteed.',
  },
  {
    icon: <Globe size={15} />,
    title: 'Global specialist access',
    desc: 'Connect with verified specialists worldwide, on demand.',
    pill: { icon: <Sparkles size={11} />, text: '10,000+ doctors', style: 'purple' },
  },
  {
    icon: <Shield size={15} />,
    title: 'Privacy first',
    desc: 'Your health data is encrypted and never shared without consent.',
  },
  {
    icon: <Heart size={15} />,
    title: 'Continuous care',
    desc: '24/7 health monitoring, reminders, and support built in.',
  },
  {
    icon: <Users size={15} />,
    title: 'Family health hub',
    desc: 'Manage appointments and records for your entire family.',
  },
];

const doctorBenefits = [
  {
    icon: <TrendingUp size={15} />,
    title: 'Grow your practice',
    desc: 'Reach more patients and increase revenue by up to 45%.',
    pill: { icon: <TrendingUp size={11} />, text: '+45% revenue', style: 'green' },
  },
  {
    icon: <Clock size={15} />,
    title: 'Time efficiency',
    desc: 'Reduce admin overhead by 60% with smart automation.',
    pill: { icon: <Sparkles size={11} />, text: '60% less admin', style: 'amber' },
  },
  {
    icon: <BarChart size={15} />,
    title: 'Analytics dashboard',
    desc: 'Track performance, patient satisfaction, and key metrics live.',
  },
  {
    icon: <MapPin size={15} />,
    title: 'Work from anywhere',
    desc: 'Flexible scheduling — see patients on your own terms.',
  },
  {
    icon: <Brain size={15} />,
    title: 'AI-assisted tools',
    desc: 'Smart diagnosis aids, digital prescriptions, and note summaries.',
  },
  {
    icon: <Award size={15} />,
    title: 'Professional growth',
    desc: 'CME credits and curated learning opportunities built in.',
  },
];

const stats = [
  { num: '2M+', label: 'Verified patients on platform', color: '#534AB7' },
  { num: '24/7', label: 'Always-on health support', color: '#0F6E56' },
  { num: '99.9%', label: 'Uptime & data reliability', color: '#993556' },
];

const pillStyles: Record<string, { bg: string; color: string }> = {
  purple: { bg: '#EEEDFE', color: '#534AB7' },
  green:  { bg: '#E1F5EE', color: '#0F6E56' },
  amber:  { bg: '#FAEEDA', color: '#854F0B' },
  pink:   { bg: '#FBEAF0', color: '#993556' },
};

const Benefits = ({ }: BenefitsProps) => {
  const columns = [
    {
      icon: <HeartHandshake size={22} />,
      color: '#993556',
      bg: '#FBEAF0',
      title: 'For Patients',
      subtitle: 'Care that comes to you',
      benefits: patientBenefits,
    },
    {
      icon: <Stethoscope size={22} />,
      color: '#0F6E56',
      bg: '#E1F5EE',
      title: 'For Doctors',
      subtitle: 'Tools that grow your practice',
      benefits: doctorBenefits,
    },
  ];

  return (
    <section
      id="benefits"
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
            background: `radial-gradient(circle, ${b.color}18 0%, transparent 70%)`,
            top: (b as any).top,
            bottom: (b as any).bottom,
            left: (b as any).left,
            right: (b as any).right,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="container-fluid px-4 px-lg-5" style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%'  }}>

        {/* Header */}
        <div className="text-center mb-5">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#6366F1', background: '#EEEDFE',
            border: '1px solid #AFA9EC', padding: '6px 16px', borderRadius: 50,
            marginBottom: 20,
          }}>
            <Zap size={13} /> Benefits
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Transform Healthcare Experience
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              For Everyone
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you're seeking care or delivering it, our platform is built to make
            every interaction faster, smarter, and more meaningful.
          </p>
        </div>

        {/* Two-column card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          marginBottom: 20,
        }}>
          {columns.map((col, ci) => (
            <div
              key={ci}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.22s, box-shadow 0.22s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
              }}
            >
              {/* Card header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                background: '#fafafa',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: col.bg, color: col.color,
                }}>
                  {col.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{col.title}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{col.subtitle}</div>
                </div>
              </div>

              {/* Benefits list */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.benefits.map((b, bi) => (
                  <div
                    key={bi}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '10px 12px',
                      background: '#f9fafb', borderRadius: 12,
                      borderLeft: '2.5px solid transparent',
                      transition: 'background 0.18s, border-color 0.18s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.background = '#f3f4f6';
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = col.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.background = '#f9fafb';
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'transparent';
                    }}
                  >
                    <div style={{ color: col.color, marginTop: 2, flexShrink: 0 }}>{b.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{b.desc}</div>
                      {b.pill && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 11, fontWeight: 600,
                          padding: '3px 9px', borderRadius: 50,
                          marginTop: 6,
                          background: pillStyles[b.pill.style].bg,
                          color: pillStyles[b.pill.style].color,
                        }}>
                          {b.pill.icon} {b.pill.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: '18px 20px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{
                fontSize: '1.6rem', fontWeight: 700,
                color: s.color, lineHeight: 1, marginBottom: 4,
              }}>
                {s.num}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;