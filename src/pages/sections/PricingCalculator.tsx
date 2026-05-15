import { useState, type JSX } from 'react';
import { Check, Info, Sliders, Medal, List, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface CalculatorInputs {
  doctorVisits: number;
  visitCost: number;
  emergencyVisits: number;
  includeTravel: boolean;
  includeTime: boolean;
  familyMode: boolean;
  familyCount: number;
}

type Scenario = 'light' | 'moderate' | 'heavy' | 'family';

const SCENARIOS: Record<Scenario, Partial<CalculatorInputs>> = {
  light:    { doctorVisits: 4,  visitCost: 4000, emergencyVisits: 0, familyMode: false },
  moderate: { doctorVisits: 8,  visitCost: 5000, emergencyVisits: 1, familyMode: false },
  heavy:    { doctorVisits: 16, visitCost: 7000, emergencyVisits: 3, familyMode: false },
  family:   { doctorVisits: 12, visitCost: 5500, emergencyVisits: 2, familyMode: true, familyCount: 3 },
};

const SCENARIO_LABELS: Record<Scenario, string> = {
  light:    'Light user',
  moderate: 'Moderate',
  heavy:    'High usage',
  family:   'Family plan',
};

const DEFAULT_INPUTS: CalculatorInputs = {
  doctorVisits:    6,
  visitCost:       5000,
  emergencyVisits: 1,
  includeTravel:   true,
  includeTime:     true,
  familyMode:      false,
  familyCount:     3,
};

const fmt = (n: number) =>
  'LKR ' + Math.round(n).toLocaleString('en-LK');

const pct = (n: number) =>
  Math.min(100, Math.round(n)) + '%';

const statItems: { icon: JSX.Element; label: string; sub: string; bg: string; color: string; }[] = [
  { icon: <Sliders size={18} />,   label: '5 Minutes',   sub: 'Avg setup time',       bg: '#EEEDFE', color: '#534AB7' },
  { icon: <Check size={18} />,     label: '100% Secure', sub: 'End-to-end encrypted', bg: '#E1F5EE', color: '#0F6E56' },
  { icon: <Info size={18} />,      label: 'Mobile First', sub: 'Access anywhere',     bg: '#FAEEDA', color: '#854F0B' },
  { icon: <Medal size={18} />,     label: '< 2 min',     sub: 'Avg booking time',     bg: '#FBEAF0', color: '#993556' },
];

// ─── SliderRow ───────────────────────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  displayValue: string;
  onChange: (v: number) => void;
}

const SliderRow = ({ label, value, min, max, step = 1, displayValue, onChange }: SliderRowProps) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 500 }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 600, color: '#fff',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
      }}>{displayValue}</span>
    </div>
    <input
      type="range"
      style={{
        width: '100%', height: 6, background: '#e2e8f0', borderRadius: 4,
        outline: 'none', WebkitAppearance: 'none', appearance: 'none', cursor: 'pointer',
      }}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(parseInt(e.target.value))}
    />
  </div>
);

// ─── ToggleRow ────────────────────────────────────────────────────────────────

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow = ({ label, checked, onChange }: ToggleRowProps) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: 13, color: '#4a5568', padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  }}>
    <span>{label}</span>
    <label style={{ position: 'relative', display: 'inline-block', width: 38, height: 22, flexShrink: 0 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
      />
      <span style={{
        position: 'absolute', inset: 0,
        background: checked ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#cbd5e0',
        borderRadius: 22, cursor: 'pointer', transition: 'background 0.2s',
        display: 'block',
      }}>
        <span style={{
          position: 'absolute', height: 16, width: 16,
          left: checked ? 19 : 3, bottom: 3,
          background: '#fff', borderRadius: '50%',
          transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          display: 'block',
        }} />
      </span>
    </label>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const PricingCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const set = (patch: Partial<CalculatorInputs>) =>
    setInputs(prev => ({ ...prev, ...patch }));

  const applyScenario = (key: Scenario) => {
    setActiveScenario(key);
    set(SCENARIOS[key]);
  };

  const { doctorVisits, visitCost, emergencyVisits, includeTravel, includeTime, familyMode, familyCount } = inputs;
  const mult = familyMode ? familyCount : 1;

  const consult     = doctorVisits * visitCost * mult;
  const emgCost     = emergencyVisits * 15000 * mult;
  const travelCost  = includeTravel ? doctorVisits * 2500 * mult : 0;
  const timeCost    = includeTime   ? doctorVisits * 3 * 1000 * mult : 0;
  const traditional = consult + emgCost + travelCost + timeCost;

  const onlineVisitCost = visitCost - 1000;
  const platformFee     = familyMode ? 18000 : 12000;
  const HealthNexus        = doctorVisits * onlineVisitCost * mult + platformFee;

  const savings    = traditional - HealthNexus;
  const roiPct     = traditional > 0 ? (savings / traditional) * 100 : 0;
  const hoursSaved = doctorVisits * 3 * mult;
  const barMedi    = traditional > 0 ? Math.round((HealthNexus / traditional) * 100) : 0;

  return (
    <section
      id="pricing-calculator"
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
        { size: 280, top: '40%',  left: '50%',     color: '#10B981' },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${b.color}14 0%, transparent 70%)`,
          top: b.top, bottom: (b as any).bottom, left: b.left, right: (b as any).right,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#6366F1', background: '#EEEDFE', border: '1px solid #AFA9EC',
            padding: '6px 16px', borderRadius: 50, marginBottom: 20,
          }}>
            <Sparkles size={13} /> Smart Savings Calculator
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Calculate Your
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Healthcare Savings
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Compare traditional hospital costs with online healthcare — see your real annual benefit.
          </p>
        </div>

        {/* Scenario tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, marginRight: 4 }}>Quick scenario:</span>
            <div style={{
              display: 'inline-flex', background: '#f3f4f6',
              borderRadius: 50, padding: 4, gap: 4, flexWrap: 'wrap',
            }}>
              {(Object.keys(SCENARIOS) as Scenario[]).map(key => {
                const active = activeScenario === key;
                return (
                  <button
                    key={key}
                    onClick={() => applyScenario(key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '10px 20px', borderRadius: 50, border: 'none',
                      cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      transition: 'all 0.22s',
                      background: active ? 'linear-gradient(135deg, #6366F1, #EC4899)' : 'transparent',
                      color: active ? '#fff' : '#6b7280',
                      boxShadow: active ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                    }}
                  >
                    {SCENARIO_LABELS[key]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginBottom: '2.5rem',
        }}>
          {statItems.map((s, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16,
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: s.bg, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c' }}>{s.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 28, maxWidth: 1060, margin: '0 auto',
        }}>

          {/* LEFT: INPUTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Usage sliders card */}
            <div style={{
              background: '#fff', border: '1px solid #e8ecf0',
              borderRadius: 16, padding: 24, marginBottom: 16,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: '#2d3748', marginBottom: 20,
              }}>
                <Sliders size={17} aria-hidden />
                Your usage
              </div>

              <SliderRow
                label="Doctor visits per year"
                value={doctorVisits}
                min={1} max={24}
                displayValue={`${doctorVisits} visit${doctorVisits !== 1 ? 's' : ''}`}
                onChange={v => set({ doctorVisits: v })}
              />
              <SliderRow
                label="Avg. physical visit cost"
                value={visitCost}
                min={2000} max={15000} step={500}
                displayValue={`LKR ${visitCost.toLocaleString()}`}
                onChange={v => set({ visitCost: v })}
              />
              <SliderRow
                label="Emergency visits per year"
                value={emergencyVisits}
                min={0} max={10}
                displayValue={`${emergencyVisits} visit${emergencyVisits !== 1 ? 's' : ''}`}
                onChange={v => set({ emergencyVisits: v })}
              />
            </div>

            {/* Assumptions card */}
            <div style={{
              background: '#fff', border: '1px solid #e8ecf0',
              borderRadius: 16, padding: 24, marginBottom: 16,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: '#2d3748', marginBottom: 20,
              }}>
                <Sliders size={17} aria-hidden />
                Assumptions
              </div>

              <ToggleRow
                label="Include travel costs (LKR 2,500/visit)"
                checked={includeTravel}
                onChange={v => set({ includeTravel: v })}
              />
              <ToggleRow
                label="Include time value (3 hrs × LKR 1,000)"
                checked={includeTime}
                onChange={v => set({ includeTime: v })}
              />
              <ToggleRow
                label="Include family members"
                checked={familyMode}
                onChange={v => set({ familyMode: v })}
              />

              {familyMode && (
                <SliderRow
                  label="Family members"
                  value={familyCount}
                  min={2} max={8}
                  displayValue={`${familyCount} members`}
                  onChange={v => set({ familyCount: v })}
                />
              )}
            </div>

            {/* Benefits card */}
            <div style={{
              background: '#fff', border: '1px solid #e8ecf0',
              borderRadius: 16, padding: 24, marginBottom: 16,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: '#2d3748', marginBottom: 20,
              }}>
                <Medal size={17} aria-hidden />
                Why patients save more
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  <>No long hospital queues — consult from anywhere</>,
                  <>Save <strong style={{ color: '#2d3748' }}>{hoursSaved} hours</strong> every year on travel &amp; waiting</>,
                  <>Zero fuel or transport costs per visit</>,
                  <>Online consultations cost less than physical visits</>,
                  <>Faster follow-ups without rebooking delays</>,
                ].map((text, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontSize: 13, color: '#4a5568', padding: '9px 0',
                    borderBottom: i < 4 ? '1px solid #f0f4f8' : 'none',
                    lineHeight: 1.5,
                  }}>
                    <Check size={16} aria-hidden style={{ flexShrink: 0, color: '#38a169', marginTop: 1 }} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Hero savings card */}
            <div style={{
              background: '#fff', border: '1px solid #e8ecf0',
              borderRadius: 16, padding: 24, marginBottom: 16,
            }}>
              {/* Savings hero */}
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f5f7fa, #e9ecef)',
                borderRadius: 12, padding: '24px 20px 20px', marginBottom: 20,
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#718096', marginBottom: 6 }}>
                  ESTIMATED ANNUAL SAVINGS
                </p>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: '#38a169', lineHeight: 1.1, marginBottom: 6 }}>
                  {fmt(savings)}
                </h2>
                <p style={{ fontSize: 12, color: '#718096' }}>
                  {familyMode ? `For ${familyCount} family members` : 'Money + time combined'}
                </p>
              </div>

              {/* Metric cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { val: fmt(traditional), lbl: 'Traditional cost', color: '#e53e3e' },
                  { val: fmt(HealthNexus),    lbl: 'HealthNexus cost',    color: '#38a169' },
                  { val: `${hoursSaved} hrs`, lbl: 'Time saved',    color: '#2d3748' },
                  { val: pct(roiPct),      lbl: 'Cost reduction',   color: '#38a169' },
                ].map((m, i) => (
                  <div key={i} style={{
                    background: '#f8f9fa', borderRadius: 10, padding: '14px 12px',
                    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4,
                  }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: m.color, lineHeight: 1.2 }}>{m.val}</span>
                    <span style={{ fontSize: 11, color: '#a0aec0', fontWeight: 500 }}>{m.lbl}</span>
                  </div>
                ))}
              </div>

              {/* Cost comparison bars */}
              <div style={{ marginBottom: 16 }}>
                {[
                  { label: 'Traditional', value: fmt(traditional), width: '100%', color: '#fc8181' },
                  { label: 'HealthNexus',    value: fmt(HealthNexus),    width: `${barMedi}%`, color: '#68d391' },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 12, color: '#718096', marginBottom: 5, fontWeight: 500,
                    }}>
                      <span>{bar.label}</span>
                      <span>{bar.value}</span>
                    </div>
                    <div style={{ background: '#edf2f7', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 6, background: bar.color,
                        width: bar.width, transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ROI bar */}
              <div style={{ border: '1px solid #e8ecf0', borderRadius: 10, padding: '14px 16px' }}>
                <p style={{ fontSize: 11, color: '#a0aec0', fontWeight: 500, marginBottom: 8 }}>
                  Savings rate vs. traditional healthcare
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, background: '#edf2f7', borderRadius: 6, height: 12, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #68d391, #38a169)',
                      borderRadius: 6, transition: 'width 0.4s ease',
                      width: `${Math.min(100, roiPct)}%`,
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 44, textAlign: 'right', color: '#38a169' }}>
                    {pct(roiPct)}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown card */}
            <div style={{
              background: '#fff', border: '1px solid #e8ecf0',
              borderRadius: 16, padding: 24,
            }}>
              <button
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%',
                  color: '#2d3748', fontSize: 14, fontWeight: 600,
                }}
                onClick={() => setShowBreakdown(p => !p)}
                aria-expanded={showBreakdown}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <List size={17} aria-hidden />
                  Cost breakdown
                </span>
                {showBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showBreakdown && (
                <>
                  {[
                    { dot: '#fc8181', label: 'Hospital consultations', val: fmt(consult),                            color: '#e53e3e' },
                    { dot: '#fc8181', label: 'Emergency visits',       val: fmt(emgCost),                           color: '#e53e3e' },
                    { dot: '#fc8181', label: 'Travel costs',           val: fmt(travelCost),                        color: '#e53e3e' },
                    { dot: '#fc8181', label: 'Time value lost',        val: fmt(timeCost),                          color: '#e53e3e' },
                    { dot: '#68d391', label: 'Online consultations',   val: fmt(doctorVisits * onlineVisitCost * mult), color: '#38a169' },
                    { dot: '#68d391', label: 'HealthNexus platform fee',  val: fmt(platformFee),                       color: '#38a169' },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '11px 0', borderBottom: '1px solid #f0f4f8',
                      fontSize: 13, color: '#4a5568',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          display: 'inline-block', width: 8, height: 8,
                          borderRadius: '50%', background: row.dot, flexShrink: 0,
                        }} />
                        {row.label}
                      </span>
                      <span style={{ color: row.color }}>{row.val}</span>
                    </div>
                  ))}

                  {/* Total row */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0 11px', borderTop: '2px solid #e2e8f0', marginTop: 4,
                    fontSize: 14, fontWeight: 700, color: '#2d3748',
                  }}>
                    <span>Net annual benefit</span>
                    <span style={{ color: '#38a169' }}>{fmt(savings)}</span>
                  </div>
                </>
              )}

              {/* Plan note */}
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                fontSize: 12, color: '#a0aec0', background: '#f8f9fa',
                borderRadius: 8, padding: '12px 14px', marginTop: 16, lineHeight: 1.5,
              }}>
                <Info size={15} aria-hidden style={{ flexShrink: 0, marginTop: 1, color: '#cbd5e0' }} />
                <span>
                  {familyMode
                    ? `Estimated for ${familyCount} family members. Platform fee adjusted for family plan. Emergency avg LKR 15,000.`
                    : 'Estimates based on typical Sri Lankan healthcare costs. Emergency visits at LKR 15,000 avg.'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;