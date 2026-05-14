import {
  Home, UserCheck, HeartHandshake, TestTube, Activity,
  CheckCircle, Shield, Thermometer, Sparkles, Phone, Lock, BadgeCheck, PhoneCall
} from 'lucide-react';

const HomeVisit = () => {
  const services = [
    {
      icon: <UserCheck size={28} />,
      title: 'Doctor consultations',
      badge: 'Most booked',
      featured: true,
      desc: 'Experienced physicians visit your home for comprehensive health assessments and specialist referrals.',
      features: [
        'General physicians & specialists',
        'Complete health assessment',
        'Prescription & follow-up care',
        'Emergency visits available',
        'Digital health summary report',
      ],
    },
    {
      icon: <HeartHandshake size={28} />,
      title: 'Nursing care',
      desc: 'Professional nursing for post-operative recovery, chronic condition management, and daily patient assistance.',
      features: [
        '24/7 nursing support',
        'Wound care & dressing',
        'Medication administration',
        'Vitals monitoring & logging',
        'Care plan coordination',
      ],
    },
    {
      icon: <TestTube size={28} />,
      title: 'Lab sample collection',
      desc: 'Certified phlebotomists collect samples at home with strict safety protocols and fast digital results.',
      features: [
        'Blood tests & cultures',
        'Urine & stool analysis',
        'COVID-19 & flu tests',
        'Results in 24–48 hours',
        'Digital report delivery',
      ],
    },
    {
      icon: <Activity size={28} />,
      title: 'Physiotherapy',
      desc: 'Expert physiotherapists help you recover strength and mobility with personalized rehabilitation programs.',
      features: [
        'Post-surgery rehabilitation',
        'Pain management therapy',
        'Mobility improvement plans',
        'Equipment provided',
        'Progress tracking reports',
      ],
    },
  ];

  const steps = [
    { num: 1, title: 'Book service', desc: 'Choose your service type and preferred time slot' },
    { num: 2, title: 'Get confirmed', desc: 'Receive confirmation with your provider\'s profile' },
    { num: 3, title: 'Provider arrives', desc: 'Verified professional arrives at your door on time' },
    { num: 4, title: 'Receive care', desc: 'Get expert care and a digital follow-up summary' },
  ];

  const safetyItems = [
    { icon: <Shield size={20} />, title: 'Verified professionals', desc: 'Background-checked and licensed healthcare providers only' },
    { icon: <Thermometer size={20} />, title: 'Daily health screening', desc: 'Every visiting professional passes a health check before appointments' },
    { icon: <Sparkles size={20} />, title: 'Sterile equipment', desc: 'All medical tools are properly sterilized before each visit' },
    { icon: <PhoneCall size={20} />, title: '24/7 support line', desc: 'Round-the-clock assistance for emergencies and concerns' },
    { icon: <BadgeCheck size={20} />, title: 'ID-verified entry', desc: 'Providers carry digital ID badges you can verify on arrival' },
    { icon: <Lock size={20} />, title: 'Data privacy', desc: 'Your health records are encrypted and never shared without consent' },
  ];

  const stats = [
    { num: '500+', label: 'Professionals' },
    { num: '24/7', label: 'Availability' },
    { num: '48h', label: 'Lab results' },
    { num: '98%', label: 'Satisfaction' },
  ];

  const teal = {
    50: '#E1F5EE',
    100: '#9FE1CB',
    200: '#5DCAA5',
    400: '#1D9E75',
    600: '#0F6E56',
    800: '#085041',
  };

  return (
    <section
      id="home-visit"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8fff9 100%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      {[
        { size: 480, top: '-140px', left: '-140px', color: '#1D9E75' },
        { size: 340, bottom: '-80px', right: '-80px', color: '#5DCAA5' },
        { size: 260, top: '45%', left: '52%', color: '#0F6E56' },
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

        {/* Header */}
        <div className="text-center mb-5">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: teal[600], background: teal[50],
            border: `1px solid ${teal[200]}`, padding: '6px 16px', borderRadius: 50,
            marginBottom: 20,
          }}>
            <Home size={13} /> Home Healthcare
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Healthcare That Comes
            <span style={{
              display: 'block',
              background: `linear-gradient(135deg, ${teal[400]} 0%, ${teal[600]} 60%, #047857 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              To Your Doorstep
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Professional medical care in the comfort of your home — safe, convenient, and fully personalized.
          </p>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 28,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 14,
              padding: '14px 18px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: teal[600], lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 14,
        }}>
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} teal={teal} />
          ))}
        </div>

        {/* How it works */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          marginBottom: 14,
          padding: '1.5rem 2rem',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 20 }}>
            How it works
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 16, left: 'calc(12.5% + 8px)', right: 'calc(12.5% + 8px)',
              height: 1, background: '#e5e7eb',
            }} />
            {steps.map(({ num, title, desc }) => (
              <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 8px' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: teal[50], border: `1px solid ${teal[200]}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: teal[600],
                  marginBottom: 10, position: 'relative', zIndex: 1,
                }}>{num}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          marginBottom: 14,
          padding: '1.5rem 2rem',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 20 }}>
            Your safety, our priority
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {safetyItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px',
                background: '#f9fafb',
                borderRadius: 12,
              }}>
                <div style={{ color: teal[600], marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: teal[50],
          border: `1px solid ${teal[200]}`,
          borderRadius: 20,
          padding: '1.5rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: teal[800], marginBottom: 4 }}>Ready to book a home visit?</div>
            <div style={{ fontSize: 13, color: teal[600] }}>Available today — slots filling fast in your area</div>
          </div>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: teal[600], color: '#fff',
            border: 'none', borderRadius: 12,
            padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            <Phone size={16} /> Book a visit
          </button>
        </div>

      </div>
    </section>
  );
};

/* Isolated card with hover */
const ServiceCard = ({ svc, teal }: any) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: svc.featured ? `1.5px solid ${teal[200]}` : '1px solid #e5e7eb',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 30px rgba(15,110,86,0.10)' : '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s',
        padding: '1.25rem 1.5rem',
      }}
    >
      {svc.badge && (
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 600,
          color: teal[800], background: teal[50],
          border: `1px solid ${teal[200]}`,
          padding: '2px 10px', borderRadius: 50, marginBottom: 10,
        }}>{svc.badge}</span>
      )}
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: svc.featured ? teal[600] : teal[50],
        color: svc.featured ? '#fff' : teal[600],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 12,
      }}>{svc.icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>{svc.title}</div>
      <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 14 }}>{svc.desc}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {svc.features.map((f: string, i: number) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
            <CheckCircle size={14} style={{ color: teal[400], flexShrink: 0, marginTop: 1 }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from 'react';
export default HomeVisit;