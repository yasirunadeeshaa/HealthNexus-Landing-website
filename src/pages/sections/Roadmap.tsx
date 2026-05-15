import { TrendingUp, Globe, Zap, Brain, Watch, Dna, Smartphone, CheckCircle, Rocket, ShieldCheck,} from 'lucide-react';

const Roadmap = () => {
  const timelineItems = [
    {
      year: '2026',
      title: 'Foundation Year',
      desc: 'Launch core platform, onboard 10K+ users across South Asia. Build clinical partnerships and establish trust with regulatory bodies.',
      active: true,
      tags: [{ label: 'Active', color: '#0F6E56', bg: '#E1F5EE' }, { label: 'South Asia launch', color: '#185FA5', bg: '#E6F1FB' }],
    },
    {
      year: '2027',
      title: 'AI Integration',
      desc: 'Deploy advanced diagnostics, predictive health models, and a 24/7 AI health assistant. Wearable device sync and real-time vitals monitoring.',
      active: false,
      tags: [{ label: 'Upcoming', color: '#534AB7', bg: '#EEEDFE' }, { label: 'ML diagnostics', color: '#854F0B', bg: '#FAEEDA' }],
    },
    {
      year: '2028',
      title: 'Global Expansion',
      desc: 'Scale to 15+ countries across Southeast Asia, Middle East, and Africa. Launch 25+ languages and local compliance frameworks.',
      active: false,
      tags: [{ label: 'Planned', color: '#5F5E5A', bg: '#F1EFE8' }, { label: '15+ countries', color: '#3B6D11', bg: '#EAF3DE' }],
    },
    {
      year: '2029',
      title: 'Ecosystem Leader',
      desc: 'Reach 1M+ active users. Launch a full health ecosystem: pharmacy, insurance integrations, and genomic medicine partnerships.',
      active: false,
      tags: [{ label: 'Planned', color: '#5F5E5A', bg: '#F1EFE8' }, { label: '1M users', color: '#993556', bg: '#FBEAF0' }],
    },
    {
      year: '2030',
      title: 'Healthcare Revolution',
      desc: 'Set new global standards in digital health infrastructure. Drive policy influence, publish outcomes research, and establish the platform as category-defining.',
      active: false,
      tags: [{ label: 'Planned', color: '#5F5E5A', bg: '#F1EFE8' }, { label: 'Industry standard', color: '#3C3489', bg: '#EEEDFE' }],
    },
  ];

  const regions = [
    { label: 'South Asia', quarter: 'Q1 2025', active: true, pct: 100, barColor: '#6366F1' },
    { label: 'Southeast Asia', quarter: 'Q3 2025', active: false, pct: 45, barColor: '#0F6E56', status: 'In progress' },
    { label: 'Middle East', quarter: 'Q1 2026', active: false, pct: 12, barColor: '#854F0B', status: 'Planned' },
    { label: 'Africa', quarter: 'Q3 2026', active: false, pct: 5, barColor: '#993556', status: 'Planned' },
    { label: 'Europe & Americas', quarter: '2027+', active: false, pct: 0, barColor: '#5F5E5A', status: 'Future' },
  ];

  const featureCards = [
    {
      icon: <Brain size={18} />,
      title: 'AI Health Assistant',
      desc: '24/7 personalized health companion powered by large language models. Symptom triage, medication reminders, and chronic condition management.',
      release: 'Q2 2025',
      tagColor: '#534AB7',
      tagBg: '#EEEDFE',
      iconColor: '#534AB7',
      iconBg: '#EEEDFE',
    },
    {
      icon: <Watch size={18} />,
      title: 'Wearable Integration',
      desc: 'Real-time sync with leading health wearables. Track heart rate, SpO2, sleep quality, and activity — all in one unified health dashboard.',
      release: 'Q3 2025',
      tagColor: '#0F6E56',
      tagBg: '#E1F5EE',
      iconColor: '#0F6E56',
      iconBg: '#E1F5EE',
    },
    {
      icon: <Dna size={18} />,
      title: 'Genomic Health',
      desc: 'DNA-based personalized medicine recommendations. Risk stratification for hereditary conditions and pharmacogenomics for safer prescribing.',
      release: 'Q1 2026',
      tagColor: '#185FA5',
      tagBg: '#E6F1FB',
      iconColor: '#185FA5',
      iconBg: '#E6F1FB',
    },
    {
      icon: <Smartphone size={18} />,
      title: 'AR Consultations',
      desc: 'Augmented reality-enhanced remote medical examinations. Clinicians guide patients through physical checks from anywhere in the world.',
      release: 'Q4 2026',
      tagColor: '#854F0B',
      tagBg: '#FAEEDA',
      iconColor: '#854F0B',
      iconBg: '#FAEEDA',
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Health Insurance Bridge',
      desc: 'Seamless insurance claim automation and pre-authorization workflows. Reduce admin burden by up to 70% for clinicians and patients alike.',
      release: 'Q2 2027',
      tagColor: '#993556',
      tagBg: '#FBEAF0',
      iconColor: '#993556',
      iconBg: '#FBEAF0',
    },
    {
      icon: <Brain size={18} />,
      title: 'Predictive Diagnostics',
      desc: 'ML models trained on millions of clinical records for early detection of diabetes, cardiovascular disease, and oncological markers.',
      release: 'Q3 2027',
      tagColor: '#3B6D11',
      tagBg: '#EAF3DE',
      iconColor: '#3B6D11',
      iconBg: '#EAF3DE',
    },
    {
      icon: <Globe size={18} />,
      title: 'Multilingual Platform',
      desc: 'Full platform localization across 25+ languages. Medical terminology accuracy validated by native-speaking clinicians in every target market.',
      release: 'Q1 2028',
      tagColor: '#5F5E5A',
      tagBg: '#F1EFE8',
      iconColor: '#5F5E5A',
      iconBg: '#F1EFE8',
    },
    {
      icon: <Zap size={18} />,
      title: 'Chronic Care Management',
      desc: 'Dedicated care pathways for diabetes, hypertension, and mental health. Automated follow-ups and outcome tracking for long-term patient journeys.',
      release: 'Q3 2028',
      tagColor: '#A32D2D',
      tagBg: '#FCEBEB',
      iconColor: '#A32D2D',
      iconBg: '#FCEBEB',
    },
  ];

  const metrics = [
    { icon: '👥', label: 'Target users by end of 2026', value: '10K+', trend: 'Foundation phase', trendColor: '#6366F1' },
    { icon: '🌍', label: 'Target countries by 2030', value: '50+', trend: 'Global expansion', trendColor: '#0F6E56' },
    { icon: '🧠', label: 'AI features in pipeline', value: '4', trend: '2025–2026', trendColor: '#854F0B' },
    { icon: '📊', label: 'Addressable user base', value: '100M+', trend: 'Long-term potential', trendColor: '#3B6D11' },
  ];

  const kpiRows = [
    { label: 'Year 1 active users', value: '10,000' },
    { label: 'Year 3 active users', value: '150,000' },
    { label: 'Year 5 active users', value: '1,000,000+' },
    { label: 'Clinical partners (2026)', value: '25+' },
    { label: 'Insurance integrations', value: '2029' },
    { label: 'Regulatory approvals', value: '15+ jurisdictions' },
  ];

  // --- Reusable sub-components ---

  const CardHeader = ({
    iconBg,
    iconColor,
    icon,
    title,
    sub,
  }: {
    iconBg: string;
    iconColor: string;
    icon: React.ReactNode;
    title: string;
    sub: string;
  }) => (
    <div
      style={{
        padding: '1rem 1.25rem',
        background: '#fafafa',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>{sub}</div>
      </div>
    </div>
  );

  const Tag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 50,
        background: bg,
        color,
        lineHeight: 1.6,
      }}
    >
      {label}
    </span>
  );


  return (
    <section
      id="future-roadmap"
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
            <Rocket size={13} /> Future Vision
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
            Shaping the Future of
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital Healthcare
            </span>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: '#6b7280',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Our strategic roadmap to revolutionize global healthcare accessibility — from AI diagnostics
            to genomic medicine and beyond.
          </p>
        </div>

        {/* ── Metric Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14,
            marginBottom: 20,
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: '1rem 1.25rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>{m.value}</div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: m.trendColor }}>{m.trend}</div>
            </div>
          ))}
        </div>

        {/* ── Main Grid: Timeline + Expansion ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* ── Timeline Card ── */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <CardHeader
              iconBg="#EEEDFE"
              iconColor="#534AB7"
              icon={<TrendingUp size={20} />}
              title="Strategic Timeline"
              sub="Five-year growth milestones"
            />

            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ position: 'relative', paddingLeft: 36 }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 8,
                    bottom: 8,
                    width: 2,
                    background: 'linear-gradient(180deg, #6366F1 0%, #EC4899 100%)',
                    borderRadius: 2,
                  }}
                />

                {timelineItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      marginBottom: i < timelineItems.length - 1 ? 14 : 0,
                      padding: '10px 12px',
                      background: item.active ? '#EEEDFE' : '#f9fafb',
                      borderRadius: 12,
                      border: item.active ? '1px solid #AFA9EC' : '1px solid transparent',
                      opacity: item.active ? 1 : 0.7,
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.opacity = '1';
                      el.style.background = '#f3f4f6';
                      el.style.borderColor = '#6366F1';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.opacity = item.active ? '1' : '0.7';
                      el.style.background = item.active ? '#EEEDFE' : '#f9fafb';
                      el.style.borderColor = item.active ? '#AFA9EC' : 'transparent';
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: -30,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: item.active ? '#6366F1' : '#fff',
                        border: '2px solid #6366F1',
                        boxShadow: item.active ? '0 0 0 4px rgba(99,102,241,0.18)' : 'none',
                        zIndex: 1,
                      }}
                    />

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', marginBottom: 2, letterSpacing: '0.4px' }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, marginBottom: 8 }}>
                      {item.desc}
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {item.tags.map((tag, ti) => (
                        <Tag key={ti} {...tag} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── International Expansion Card ── */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <CardHeader
                iconBg="#E1F5EE"
                iconColor="#0F6E56"
                icon={<Globe size={20} />}
                title="International Expansion"
                sub="Regional rollout schedule"
              />

              <div style={{ padding: '1.25rem 1.5rem' }}>
                {/* Stats row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '0.875rem 1rem',
                    background: '#f9fafb',
                    borderRadius: 12,
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {[
                    { number: '50+', label: 'Target Countries' },
                    { number: '25+', label: 'Languages' },
                    { number: '100M+', label: 'Potential Users' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#6366F1', marginBottom: 2 }}>{s.number}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Region list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {regions.map((r, i) => (
                    <div key={i}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 11px',
                          background: r.active ? '#EEEDFE' : '#f9fafb',
                          borderRadius: 10,
                          borderLeft: r.active ? '2.5px solid #6366F1' : '2.5px solid transparent',
                          fontSize: 13,
                          color: r.active ? '#3C3489' : '#6b7280',
                          fontWeight: r.active ? 600 : 400,
                          marginBottom: 4,
                          cursor: 'default',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f3f4f6'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = r.active ? '#EEEDFE' : '#f9fafb'; }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: r.active ? '#6366F1' : '#d1d5db',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1 }}>{r.label}</span>
                        <span style={{ fontSize: 11, color: r.active ? '#534AB7' : '#9ca3af' }}>{r.quarter}</span>
                        {r.active ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: 10,
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: 50,
                              background: '#E1F5EE',
                              color: '#085041',
                            }}
                          >
                            <CheckCircle size={10} /> Live
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, color: '#9ca3af' }}>{r.status}</span>
                        )}
                      </div>
                      {/* Progress bar */}
                      <div
                        style={{
                          height: 4,
                          background: '#f0f0f0',
                          borderRadius: 50,
                          overflow: 'hidden',
                          marginBottom: 2,
                          marginLeft: 4,
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${r.pct}%`,
                            background: r.barColor,
                            borderRadius: 50,
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                      <div style={{ fontSize: 10, color: '#9ca3af', textAlign: 'right', marginBottom: 4 }}>{r.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Growth Targets KPI Card ── */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <CardHeader
                iconBg="#FAEEDA"
                iconColor="#854F0B"
                icon={<TrendingUp size={20} />}
                title="Growth Targets"
                sub="Key performance indicators"
              />

              <div style={{ padding: '1rem 1.5rem' }}>
                {kpiRows.map((row, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '7px 0',
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: '#6b7280' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: '#1a202c' }}>{row.value}</span>
                    </div>
                    {i < kpiRows.length - 1 && (
                      <div style={{ height: 1, background: '#f5f5f5' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Upcoming Features Card (full width) ── */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <CardHeader
            iconBg="#FAEEDA"
            iconColor="#854F0B"
            icon={<Zap size={20} />}
            title="Upcoming Features"
            sub="Next-generation capabilities in the pipeline"
          />

          <div
            style={{
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {featureCards.map((card, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '12px 14px',
                  background: '#f9fafb',
                  borderRadius: 14,
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.18s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = '#f3f4f6';
                  el.style.borderColor = '#6366F1';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 6px 20px rgba(99,102,241,0.1)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = '#f9fafb';
                  el.style.borderColor = '#e5e7eb';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: card.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.iconColor,
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', marginBottom: 3 }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, marginBottom: 6 }}>{card.desc}</div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 9px',
                      borderRadius: 50,
                      background: card.tagBg,
                      color: card.tagColor,
                    }}
                  >
                    {card.release}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #future-roadmap {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Roadmap;