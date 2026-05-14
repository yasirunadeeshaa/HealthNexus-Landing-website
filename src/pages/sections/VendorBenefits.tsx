import {
  Zap, Building, Users, CreditCard, Activity, FileText, Stethoscope, BarChart,
  Shield, Cpu, AlertTriangle, Clock, CheckCircle, FileCheck, Building2, Database, Users2,
  DollarSign, Home, Wifi, Settings, Rocket, Brain, TrendingUp, TrendingDown
} from 'lucide-react';

const VendorBenefits = () => {
  const partners = [
    {
      icon: <Building size={22} />,
      color: '#534AB7',
      bg: '#EEEDFE',
      title: 'Pharmacies',
      subtitle: 'Prescription & inventory pipeline',
      benefits: [
        {
          icon: <Zap size={15} />,
          title: 'Direct prescription pipeline',
          desc: 'Instant digital prescriptions from 10,000+ verified doctors.',
          pill: { icon: <TrendingUp size={11} />, text: '50K+ monthly orders', style: 'purple' },
        },
        {
          icon: <Users size={15} />,
          title: 'Expanded customer base',
          desc: 'Access to 2M+ verified patients on the platform.',
        },
        {
          icon: <Brain size={15} />,
          title: 'AI inventory management',
          desc: 'Demand forecasting reduces overstock and shortages.',
        },
        {
          icon: <CreditCard size={15} />,
          title: 'Automated payments',
          desc: 'Instant settlement & reconciliation built in.',
        },
      ],
    },
    {
      icon: <Activity size={22} />,
      color: '#993556',
      bg: '#FBEAF0',
      title: 'Diagnostic Labs',
      subtitle: 'Test orders, collection & reporting',
      benefits: [
        {
          icon: <Home size={15} />,
          title: 'Home collection network',
          desc: 'Automated scheduling & routing for home sample pickup.',
          pill: { icon: <TrendingUp size={11} />, text: '15K+ daily collections', style: 'purple' },
        },
        {
          icon: <FileText size={15} />,
          title: 'Digital report delivery',
          desc: 'Instant report sharing directly with referring doctors.',
          pill: { icon: <CheckCircle size={11} />, text: 'Live integration', style: 'green' },
        },
        {
          icon: <Stethoscope size={15} />,
          title: 'Doctor collaboration',
          desc: 'Direct consultations on results via in-platform messaging.',
        },
        {
          icon: <BarChart size={15} />,
          title: 'Analytics dashboard',
          desc: 'Test volume trends and demand insights in one view.',
        },
      ],
    },
    {
      icon: <Shield size={22} />,
      color: '#0F6E56',
      bg: '#E1F5EE',
      title: 'Insurance Providers',
      subtitle: 'Claims, fraud detection & verification',
      benefits: [
        {
          icon: <Cpu size={15} />,
          title: 'Automated claim processing',
          desc: 'AI-driven pipeline delivers 90% faster settlements.',
          pill: { icon: <Clock size={11} />, text: 'Save 15 days/claim', style: 'green' },
        },
        {
          icon: <AlertTriangle size={15} />,
          title: 'Fraud detection',
          desc: 'Real-time anomaly detection with 99.9% accuracy.',
          pill: { icon: <TrendingUp size={11} />, text: '99.9% accuracy', style: 'purple' },
        },
        {
          icon: <CheckCircle size={15} />,
          title: 'Real-time verification',
          desc: 'Instant eligibility checks at point of care.',
        },
        {
          icon: <FileCheck size={15} />,
          title: 'Paperless workflow',
          desc: '100% digital documentation end-to-end.',
        },
      ],
    },
    {
      icon: <Building2 size={22} />,
      color: '#854F0B',
      bg: '#FAEEDA',
      title: 'Hospitals & Clinics',
      subtitle: 'Patient flow, records & coordination',
      benefits: [
        {
          icon: <Users size={15} />,
          title: 'Patient flow optimisation',
          desc: 'Smart queue management cuts wait times significantly.',
          pill: { icon: <TrendingDown size={11} />, text: '60% less wait time', style: 'amber' },
        },
        {
          icon: <Database size={15} />,
          title: 'Unified health records',
          desc: 'Centralised patient data with cloud sync across departments.',
          pill: { icon: <Wifi size={11} />, text: 'Cloud sync', style: 'green' },
        },
        {
          icon: <Users2 size={15} />,
          title: 'Multi-doctor coordination',
          desc: 'Seamless referral and handoff management between teams.',
        },
        {
          icon: <DollarSign size={15} />,
          title: 'Revenue optimisation',
          desc: '25% increase in patient volume through platform discovery.',
        },
      ],
    },
  ];

  const steps = [
    { icon: <FileText size={18} />, label: 'Apply', desc: 'Submit partnership application', day: 'Day 1', state: 'done' },
    { icon: <CheckCircle size={18} />, label: 'Verify', desc: 'Quick verification process', day: 'Day 2–3', state: 'done' },
    { icon: <Settings size={18} />, label: 'Integrate', desc: 'API integration & setup', day: 'Day 4–7', state: 'active' },
    { icon: <Rocket size={18} />, label: 'Launch', desc: 'Go live & start growing', day: 'Day 8', state: '' },
  ];

  const pillStyles: Record<string, { bg: string; color: string }> = {
    purple: { bg: '#EEEDFE', color: '#534AB7' },
    green:  { bg: '#E1F5EE', color: '#0F6E56' },
    amber:  { bg: '#FAEEDA', color: '#854F0B' },
    pink:   { bg: '#FBEAF0', color: '#993556' },
  };

  const stepStyles = {
    done:   { bg: '#E1F5EE', border: '#5DCAA5', color: '#0F6E56' },
    active: { bg: '#EEEDFE', border: '#7F77DD', color: '#534AB7' },
    '':     { bg: '#f9fafb', border: '#e5e7eb', color: '#9ca3af' },
  };

  return (
    <section
      id="vendor-benefits"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8f9ff 10%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background blobs */}
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
            <Zap size={13} /> Ecosystem Partners
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Empowering every healthcare
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              ecosystem partner
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Join the digital healthcare revolution and unlock unprecedented growth
            opportunities across the entire care network.
          </p>
        </div>

        {/* ── Partner Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}>
          {partners.map((p, pi) => (
            <div
              key={pi}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'transform 0.22s, box-shadow 0.22s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
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
                  background: p.bg, color: p.color,
                }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{p.subtitle}</div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.benefits.map((b, bi) => (
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
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = p.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.background = '#f9fafb';
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'transparent';
                    }}
                  >
                    <div style={{ color: p.color, marginTop: 2, flexShrink: 0 }}>{b.icon}</div>
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

        {/* ── Integration Timeline ── */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 24,
          padding: '2.5rem 2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          <div className="text-center mb-4">
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>
              Simple integration process
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>
              From application to live in under 8 days
            </div>
          </div>

          <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: 21, left: '12.5%', right: '12.5%',
              height: 1, background: '#e5e7eb', zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', top: 21, left: '12.5%', width: '37.5%',
              height: 1, background: '#10B981', zIndex: 0,
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative', zIndex: 1 }}>
              {steps.map((s, si) => {
                const st = stepStyles[s.state as keyof typeof stepStyles];
                return (
                  <div key={si} style={{ textAlign: 'center', padding: '0 8px' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 12px',
                      background: st.bg, border: `1.5px solid ${st.border}`,
                      color: st.color,
                      boxShadow: s.state === 'active' ? `0 0 0 6px ${st.bg}` : 'none',
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 11.5, color: '#9ca3af', lineHeight: 1.4, marginBottom: 4 }}>{s.desc}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: st.color }}>{s.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VendorBenefits;