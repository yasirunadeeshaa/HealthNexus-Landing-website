import { useState, type JSX } from 'react';

/* ─── Shared token palette (same as VendorBenefits) ─── */
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
  gradGreen:    'linear-gradient(135deg, #11998e 0%, #1a5fa8 100%)',
};

/* ─── Types ─── */
interface CalculatorInputs {
  doctorVisits:    number;
  visitCost:       number;
  emergencyVisits: number;
  includeTravel:   boolean;
  includeTime:     boolean;
  familyMode:      boolean;
  familyCount:     number;
}

type Scenario = 'light' | 'moderate' | 'heavy' | 'family';

const SCENARIOS: Record<Scenario, Partial<CalculatorInputs>> = {
  light:    { doctorVisits: 4,  visitCost: 4000, emergencyVisits: 0, familyMode: false },
  moderate: { doctorVisits: 8,  visitCost: 5000, emergencyVisits: 1, familyMode: false },
  heavy:    { doctorVisits: 16, visitCost: 7000, emergencyVisits: 3, familyMode: false },
  family:   { doctorVisits: 12, visitCost: 5500, emergencyVisits: 2, familyMode: true, familyCount: 3 },
};

const SCENARIO_META: Record<Scenario, { label: string; icon: string }> = {
  light:    { label: 'Light user',  icon: '🌱' },
  moderate: { label: 'Moderate',    icon: '⚡' },
  heavy:    { label: 'High usage',  icon: '🔥' },
  family:   { label: 'Family plan', icon: '👨‍👩‍👧' },
};

const DEFAULT_INPUTS: CalculatorInputs = {
  doctorVisits: 6, visitCost: 5000, emergencyVisits: 1,
  includeTravel: true, includeTime: true, familyMode: false, familyCount: 3,
};

const fmt = (n: number) => 'LKR ' + Math.round(n).toLocaleString('en-LK');
const pct = (n: number) => Math.min(100, Math.round(n)) + '%';

/* ─── SliderRow ─── */
interface SliderRowProps {
  label: string; value: number; min: number; max: number;
  step?: number; displayValue: string; onChange: (v: number) => void;
}

const SliderRow = ({ label, value, min, max, step = 1, displayValue, onChange }: SliderRowProps) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 600 }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 700, color: '#fff',
        background: T.gradBlue, padding: '3px 12px',
        borderRadius: 20, whiteSpace: 'nowrap',
      }}>{displayValue}</span>
    </div>
    <input
      type="range"
      style={{
        width: '100%', height: 6, background: '#e2e8f0', borderRadius: 4,
        outline: 'none', WebkitAppearance: 'none', appearance: 'none', cursor: 'pointer',
      }}
      min={min} max={max} step={step} value={value}
      onChange={e => onChange(parseInt(e.target.value))}
    />
  </div>
);

/* ─── ToggleRow ─── */
interface ToggleRowProps { label: string; checked: boolean; onChange: (v: boolean) => void; }

const ToggleRow = ({ label, checked, onChange }: ToggleRowProps) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: 13, color: '#4a5568', fontWeight: 500,
    padding: '10px 0', borderBottom: '1px solid #f0f4f8',
  }}>
    <span>{label}</span>
    <label style={{ position: 'relative', display: 'inline-block', width: 38, height: 22, flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <span style={{
        position: 'absolute', inset: 0,
        background: checked ? T.gradTeal : '#cbd5e0',
        borderRadius: 22, cursor: 'pointer', transition: 'background 0.2s', display: 'block',
      }}>
        <span style={{
          position: 'absolute', height: 16, width: 16,
          left: checked ? 19 : 3, bottom: 3,
          background: '#fff', borderRadius: '50%', transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)', display: 'block',
        }} />
      </span>
    </label>
  </div>
);

/* ─── MetricBadge (same pattern as VendorBenefits MetricRow) ─── */
const MetricBadge = ({ value, label, color, bg, border }: {
  value: string; label: string; color: string; bg: string; border: string;
}) => (
  <div style={{
    flex: '1 1 70px', background: bg, border: `1px solid ${border}`,
    borderRadius: 12, padding: '10px 12px', textAlign: 'center',
  }}>
    <div style={{ fontSize: '1.05rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color, opacity: 0.75, marginTop: 3 }}>{label}</div>
  </div>
);

/* ─── Card shell matching VendorBenefits PartnerCard structure ─── */
const CardShell = ({ children, hovered, onEnter, onLeave }: {
  children: React.ReactNode; hovered: boolean;
  onEnter: () => void; onLeave: () => void;
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
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);

/* ─── Hero header (matches VendorBenefits card hero) ─── */
const CardHero = ({ eyebrow, title, subtitle, grad }: {
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

/* ─── CapRow (identical to VendorBenefits) ─── */
const CapRow = ({ icon, title, desc, accentColor }: {
  icon: string; title: string; desc: string | JSX.Element; accentColor: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '9px 12px', borderRadius: 10, marginBottom: 6,
        background: hovered ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hovered ? accentColor : '#e2e8f0'}`,
        transition: 'background .18s, border-color .18s', cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
};

/* ─── SectionLabel ─── */
const SectionLabel = ({ text }: { text: string }) => (
  <p style={{
    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px',
    textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px',
  }}>{text}</p>
);

/* ─── Divider ─── */
const Divider = () => (
  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />
);

/* ─── Main Component ─── */
const PricingCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const set = (patch: Partial<CalculatorInputs>) => setInputs(prev => ({ ...prev, ...patch }));

  const applyScenario = (key: Scenario) => {
    setActiveScenario(key);
    set(SCENARIOS[key]);
  };

  const { doctorVisits, visitCost, emergencyVisits, includeTravel, includeTime, familyMode, familyCount } = inputs;
  const mult         = familyMode ? familyCount : 1;
  const consult      = doctorVisits * visitCost * mult;
  const emgCost      = emergencyVisits * 15000 * mult;
  const travelCost   = includeTravel ? doctorVisits * 2500 * mult : 0;
  const timeCost     = includeTime   ? doctorVisits * 3 * 1000 * mult : 0;
  const traditional  = consult + emgCost + travelCost + timeCost;
  const onlineVisitCost = visitCost - 1000;
  const platformFee  = familyMode ? 18000 : 12000;
  const healthNexus  = doctorVisits * onlineVisitCost * mult + platformFee;
  const savings      = traditional - healthNexus;
  const roiPct       = traditional > 0 ? (savings / traditional) * 100 : 0;
  const hoursSaved   = doctorVisits * 3 * mult;
  const barMedi      = traditional > 0 ? Math.round((healthNexus / traditional) * 100) : 0;

  return (
    <section id="pricing-calculator" style={{
      fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      background: '#fafbfc', color: '#1a202c',
    }}>

      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
          border: '1px solid rgba(102,126,234,.2)',
          color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: 50, marginBottom: 24,
        }}>
          Smart Savings Calculator
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
        }}>
          Calculate your{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>healthcare savings</span>
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
          Compare traditional hospital costs with online healthcare — see your real annual benefit.
        </p>
      </div>

      {/* ── Infrastructure banner (same as VendorBenefits) ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 40px', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
          border: '1px solid rgba(102,126,234,.12)', borderRadius: 16,
          padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.2rem' }}>🧮</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>
              All estimates based on real Sri Lankan healthcare costs
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
              Doctor consultations · Emergency visits · Travel &amp; time · Family coverage · HealthNexus platform
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['LKR', 'AI-Powered', 'Live Calc', 'Family'].map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 50,
                background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scenario tabs ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 36px', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginRight: 4 }}>Quick scenario:</span>
          <div style={{ display: 'inline-flex', background: '#f3f4f6', borderRadius: 50, padding: 4, gap: 4, flexWrap: 'wrap' }}>
            {(Object.keys(SCENARIOS) as Scenario[]).map(key => {
              const active = activeScenario === key;
              const meta = SCENARIO_META[key];
              return (
                <button key={key} onClick={() => applyScenario(key)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 50, border: 'none',
                  cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  transition: 'all 0.22s',
                  background: active ? T.gradBlue : 'transparent',
                  color: active ? '#fff' : '#6b7280',
                  boxShadow: active ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                }}>
                  {meta.icon} {meta.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Two-column grid ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start',
      }}>

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* Inputs card */}
          <CardShell
            hovered={hoveredCard === 'inputs'}
            onEnter={() => setHoveredCard('inputs')}
            onLeave={() => setHoveredCard(null)}
          >
            <CardHero
              eyebrow="HealthNexus · Calculator"
              title="Your usage"
              subtitle="Adjust the sliders to match your healthcare habits."
              grad={T.gradBlue}
            />
            <div style={{ padding: '16px 18px', flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                {[
                  { value: `${doctorVisits}`,      label: 'Visits/yr',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
                  { value: `LKR ${(visitCost/1000).toFixed(0)}K`, label: 'Per visit', color: T.blue,   bg: T.blueL,   border: T.blueBorder },
                  { value: `${emergencyVisits}`,   label: 'Emergency',  color: T.amber,  bg: T.amberL,  border: T.amberBorder },
                  { value: `${hoursSaved}h`,        label: 'Time/yr',    color: T.purple, bg: T.purpleL, border: T.purpleBorder },
                ].map(m => <MetricBadge key={m.label} {...m} />)}
              </div>
              <Divider />
              <SectionLabel text="Adjust your inputs" />
              <SliderRow
                label="Doctor visits per year"
                value={doctorVisits} min={1} max={24}
                displayValue={`${doctorVisits} visit${doctorVisits !== 1 ? 's' : ''}`}
                onChange={v => set({ doctorVisits: v })}
              />
              <SliderRow
                label="Avg. physical visit cost"
                value={visitCost} min={2000} max={15000} step={500}
                displayValue={`LKR ${visitCost.toLocaleString()}`}
                onChange={v => set({ visitCost: v })}
              />
              <SliderRow
                label="Emergency visits per year"
                value={emergencyVisits} min={0} max={10}
                displayValue={`${emergencyVisits} visit${emergencyVisits !== 1 ? 's' : ''}`}
                onChange={v => set({ emergencyVisits: v })}
              />
            </div>
          </CardShell>

          {/* Assumptions card */}
          <CardShell
            hovered={hoveredCard === 'assumptions'}
            onEnter={() => setHoveredCard('assumptions')}
            onLeave={() => setHoveredCard(null)}
          >
            <CardHero
              eyebrow="HealthNexus · Options"
              title="Assumptions"
              subtitle="Toggle hidden costs to see your true savings."
              grad={T.gradTeal}
            />
            <div style={{ padding: '16px 18px', flex: 1 }}>
              <ToggleRow label="Include travel costs (LKR 2,500/visit)" checked={includeTravel} onChange={v => set({ includeTravel: v })} />
              <ToggleRow label="Include time value (3 hrs × LKR 1,000)" checked={includeTime}   onChange={v => set({ includeTime: v })} />
              <ToggleRow label="Include family members"                  checked={familyMode}    onChange={v => set({ familyMode: v })} />
              {familyMode && (
                <div style={{ marginTop: 14 }}>
                  <SliderRow
                    label="Family members"
                    value={familyCount} min={2} max={8}
                    displayValue={`${familyCount} members`}
                    onChange={v => set({ familyCount: v })}
                  />
                </div>
              )}
            </div>
          </CardShell>

          {/* Benefits card */}
          <CardShell
            hovered={hoveredCard === 'benefits'}
            onEnter={() => setHoveredCard('benefits')}
            onLeave={() => setHoveredCard(null)}
          >
            <CardHero
              eyebrow="HealthNexus · Advantages"
              title="Why patients save more"
              grad={T.gradAmber}
            />
            <div style={{ padding: '16px 18px', flex: 1 }}>
              <SectionLabel text="Key benefits" />
              {[
                { icon: '🚫', title: 'No hospital queues',            desc: 'Consult from anywhere — home, office, or on the go.' },
                { icon: '⏱️', title: `Save ${hoursSaved} hours every year`, desc: 'Eliminate travel and waiting room time completely.' },
                { icon: '🚗', title: 'Zero transport costs',          desc: 'No fuel or taxi fare per visit.' },
                { icon: '💸', title: 'Lower consultation fees',       desc: 'Online visits cost less than physical appointments.' },
                { icon: '🔄', title: 'Faster follow-ups',            desc: 'No rebooking delays for quick check-ins.' },
              ].map(b => <CapRow key={b.title} icon={b.icon} title={b.title} desc={b.desc} accentColor={T.amber} />)}
            </div>
          </CardShell>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>

          {/* Results card */}
          <CardShell
            hovered={hoveredCard === 'results'}
            onEnter={() => setHoveredCard('results')}
            onLeave={() => setHoveredCard(null)}
          >
            <CardHero
              eyebrow="HealthNexus · Savings"
              title="Your estimated savings"
              subtitle={familyMode ? `Calculated for ${familyCount} family members` : 'Money + time combined, annually'}
              grad={T.gradGreen}
            />
            <div style={{ padding: '16px 18px', flex: 1 }}>

              {/* Savings hero number */}
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f5f7fa, #e9ecef)',
                borderRadius: 12, padding: '20px 16px 16px', marginBottom: 20,
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#718096', marginBottom: 6 }}>
                  ESTIMATED ANNUAL SAVINGS
                </p>
                <h2 style={{ fontSize: 30, fontWeight: 800, color: T.teal, lineHeight: 1.1, marginBottom: 6 }}>
                  {fmt(savings)}
                </h2>
                <p style={{ fontSize: 12, color: '#718096' }}>
                  {familyMode ? `For ${familyCount} family members` : 'Money + time combined'}
                </p>
              </div>

              {/* Metric badges (same pattern as partner cards) */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                {[
                  { value: fmt(traditional), label: 'Traditional',    color: T.red,    bg: T.redL,    border: T.redBorder },
                  { value: fmt(healthNexus), label: 'HealthNexus',    color: T.teal,   bg: T.tealL,   border: T.tealBorder },
                  { value: `${hoursSaved}h`, label: 'Time saved',     color: T.blue,   bg: T.blueL,   border: T.blueBorder },
                  { value: pct(roiPct),      label: 'Cost reduction', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
                ].map(m => <MetricBadge key={m.label} {...m} />)}
              </div>

              <Divider />
              <SectionLabel text="Cost comparison" />

              {/* Comparison bars */}
              {[
                { label: 'Traditional healthcare', value: fmt(traditional), width: '100%',       color: '#fc8181' },
                { label: 'HealthNexus',            value: fmt(healthNexus), width: `${barMedi}%`, color: '#68d391' },
              ].map(bar => (
                <div key={bar.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#718096', marginBottom: 5, fontWeight: 600 }}>
                    <span>{bar.label}</span><span>{bar.value}</span>
                  </div>
                  <div style={{ background: '#edf2f7', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 6, background: bar.color, width: bar.width, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}

              {/* ROI bar */}
              <div style={{ border: '1px solid #e8ecf0', borderRadius: 10, padding: '14px 16px', marginTop: 16 }}>
                <p style={{ fontSize: 11, color: '#a0aec0', fontWeight: 500, marginBottom: 8 }}>
                  Savings rate vs. traditional healthcare
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, background: '#edf2f7', borderRadius: 6, height: 12, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: T.gradTeal,
                      borderRadius: 6, transition: 'width 0.4s ease',
                      width: `${Math.min(100, roiPct)}%`,
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, minWidth: 44, textAlign: 'right', color: T.teal }}>
                    {pct(roiPct)}
                  </span>
                </div>
              </div>
            </div>
          </CardShell>

          {/* Breakdown card */}
          <CardShell
            hovered={hoveredCard === 'breakdown'}
            onEnter={() => setHoveredCard('breakdown')}
            onLeave={() => setHoveredCard(null)}
          >
            <CardHero
              eyebrow="HealthNexus · Detail"
              title="Cost breakdown"
              subtitle="Expand to see exactly where the savings come from."
              grad={T.gradBlue}
            />
            <div style={{ padding: '16px 18px', flex: 1 }}>
                <>
                  <SectionLabel text="Traditional costs" />
                  {[
                    { dot: '#fc8181', label: 'Hospital consultations', val: fmt(consult) },
                    { dot: '#fc8181', label: 'Emergency visits',       val: fmt(emgCost) },
                    { dot: '#fc8181', label: 'Travel costs',           val: fmt(travelCost) },
                    { dot: '#fc8181', label: 'Time value lost',        val: fmt(timeCost) },
                  ].map(row => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', borderBottom: '1px solid #f0f4f8',
                      fontSize: 13, color: '#4a5568',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
                        {row.label}
                      </span>
                      <span style={{ color: T.red, fontWeight: 700 }}>{row.val}</span>
                    </div>
                  ))}

                  <div style={{ marginTop: 16, marginBottom: 8 }}>
                    <SectionLabel text="HealthNexus costs" />
                  </div>
                  {[
                    { dot: '#68d391', label: 'Online consultations',    val: fmt(doctorVisits * (visitCost - 1000) * mult) },
                    { dot: '#68d391', label: 'HealthNexus platform fee', val: fmt(platformFee) },
                  ].map(row => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', borderBottom: '1px solid #f0f4f8',
                      fontSize: 13, color: '#4a5568',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
                        {row.label}
                      </span>
                      <span style={{ color: T.teal, fontWeight: 700 }}>{row.val}</span>
                    </div>
                  ))}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0 4px', borderTop: '2px solid #e2e8f0', marginTop: 4,
                    fontSize: 14, fontWeight: 800, color: '#2d3748',
                  }}>
                    <span>Net annual benefit</span>
                    <span style={{ color: T.teal }}>{fmt(savings)}</span>
                  </div>
                </>
              {/* Info note */}
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                fontSize: 12, color: '#a0aec0',
                background: T.blueL, border: `1px solid ${T.blueBorder}`,
                borderRadius: 10, padding: '12px 14px', marginTop: 16, lineHeight: 1.5,
              }}>
                <span style={{ flexShrink: 0, fontSize: '1rem' }}>ℹ️</span>
                <span>
                  {familyMode
                    ? `Estimated for ${familyCount} family members. Platform fee adjusted for family plan. Emergency avg LKR 15,000.`
                    : 'Estimates based on typical Sri Lankan healthcare costs. Emergency visits at LKR 15,000 avg.'}
                </span>
              </div>
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;