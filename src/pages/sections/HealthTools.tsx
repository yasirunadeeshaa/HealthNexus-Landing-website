import { useState } from 'react';

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
  gradPink:     'linear-gradient(135deg, #993556 0%, #6b3fa0 100%)',
};

/* ─── Types ─── */
type BMICategory = 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obese';

const SYMPTOMS = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Sore throat', 'Body aches'] as const;
type Symptom = (typeof SYMPTOMS)[number];

const SYMPTOM_MAP: Record<Symptom, string[]> = {
  Headache:      ['Common Cold — 65% match', 'Tension Headache — 55% match', 'Stress or fatigue — 40% match'],
  Fever:         ['Viral infection — 70% match', 'Flu — 60% match', 'Common Cold — 50% match'],
  Cough:         ['Common Cold — 75% match', 'Bronchitis — 45% match', 'Allergic rhinitis — 35% match'],
  Fatigue:       ['Anaemia — 60% match', 'Thyroid issues — 50% match', 'Poor sleep — 45% match'],
  Nausea:        ['Gastritis — 65% match', 'Food poisoning — 55% match', 'Migraine — 40% match'],
  'Sore throat': ['Pharyngitis — 70% match', 'Tonsillitis — 50% match', 'Common Cold — 45% match'],
  'Body aches':  ['Flu — 75% match', 'Viral fever — 60% match', 'Muscle strain — 40% match'],
};

const RISK_FACTORS = [
  'High blood pressure',
  'Diabetes',
  'Smoking',
  'Family history of heart disease',
  'Sedentary lifestyle',
] as const;

const RISK_LABELS = ['Low Risk', 'Low-Moderate Risk', 'Moderate Risk', 'High Risk', 'Very High Risk'];
const RISK_SUBS   = ['Keep up the healthy lifestyle!', 'Consider a check-up soon.', 'Consult your doctor.', 'Seek medical advice promptly.', 'Please see a doctor immediately.'];
const RISK_WIDTHS = [10, 28, 50, 72, 90];

/* ─── Helpers ─── */
const bmiBadge = (cat: BMICategory): { color: string; bg: string; border: string } => {
  if (cat === 'Normal Weight') return { color: T.teal,  bg: T.tealL,  border: T.tealBorder };
  if (cat === 'Obese')         return { color: T.red,   bg: T.redL,   border: T.redBorder };
  return                                { color: T.amber, bg: T.amberL, border: T.amberBorder };
};

const riskFillColor = (total: number): string => {
  if (total <= 1) return T.gradTeal;
  if (total <= 2) return T.gradAmber;
  return T.gradAmber;
};

const bmiMarkerLeft = (bmi: number): string =>
  `${Math.min(100, Math.max(0, ((bmi - 10) / 35) * 100)).toFixed(1)}%`;

/* ─── SliderRow ─── */
interface SliderRowProps {
  label: string; value: number; min: number; max: number;
  displayValue: string; onChange: (v: number) => void;
}
const SliderRow = ({ label, value, min, max, displayValue, onChange }: SliderRowProps) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 600 }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 700, color: '#fff',
        background: T.gradBlue, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
      }}>{displayValue}</span>
    </div>
    <input
      type="range"
      style={{
        width: '100%', height: 6, background: '#e2e8f0', borderRadius: 4,
        outline: 'none', WebkitAppearance: 'none', appearance: 'none', cursor: 'pointer',
      }}
      min={min} max={max} value={value}
      onChange={e => onChange(parseInt(e.target.value))}
    />
  </div>
);

/* ─── MetricBadge (same as VendorBenefits MetricRow pattern) ─── */
const MetricBadge = ({ value, label, color, bg, border }: {
  value: string; label: string; color: string; bg: string; border: string;
}) => (
  <div style={{
    flex: '1 1 60px', background: bg, border: `1px solid ${border}`,
    borderRadius: 12, padding: '8px 10px', textAlign: 'center',
  }}>
    <div style={{ fontSize: '0.95rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color, opacity: 0.75, marginTop: 3 }}>{label}</div>
  </div>
);

/* ─── CardShell (same as VendorBenefits PartnerCard structure) ─── */
const CardShell = ({ children, hovered, onEnter, onLeave }: {
  children: React.ReactNode; hovered: boolean; onEnter: () => void; onLeave: () => void;
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
    }}
  >
    {children}
  </div>
);

/* ─── CardHero (same as VendorBenefits) ─── */
const CardHero = ({ eyebrow, title, subtitle, grad }: {
  eyebrow: string; title: string; subtitle: string; grad: string;
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
    <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: 320 }}>{subtitle}</p>
  </div>
);

/* ─── SectionLabel & Divider ─── */
const SectionLabel = ({ text }: { text: string }) => (
  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 10px' }}>{text}</p>
);
const Divider = () => (
  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 16px' }} />
);

/* ─── CapRow (identical to VendorBenefits) ─── */
const CapRow = ({ icon, title, desc, accentColor }: {
  icon: string; title: string; desc: string; accentColor: string;
}) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '9px 12px', borderRadius: 10, marginBottom: 6,
        background: hov ? '#eef2f7' : '#f7fafc',
        border: `1px solid ${hov ? accentColor : '#e2e8f0'}`,
        transition: 'background .18s, border-color .18s', cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const HealthTools = () => {
  /* BMI state */
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  const bmiCategory: BMICategory =
    bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Weight' : bmi < 30 ? 'Overweight' : 'Obese';
  const badge = bmiBadge(bmiCategory);

  /* Symptom state */
  const [activeSymptoms, setActiveSymptoms] = useState<Set<Symptom>>(new Set(['Headache']));
  const toggleSymptom = (s: Symptom) =>
    setActiveSymptoms(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  const firstActive = [...activeSymptoms][0] as Symptom | undefined;
  const conditions = firstActive ? SYMPTOM_MAP[firstActive] : ['Select a symptom to see conditions'];

  /* Heart risk state */
  const [checks, setChecks] = useState<boolean[]>(new Array(RISK_FACTORS.length).fill(false));
  const toggleCheck = (i: number) =>
    setChecks(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const riskTotal = checks.filter(Boolean).length;

  /* Hover state */
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="health-tools" style={{
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
          Health Assessment Tools
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
        }}>
          Free health assessment{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>tools</span>
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
          Quick, accurate health tools to help you make informed decisions before your consultation.
        </p>
      </div>

      {/* ── Infrastructure banner ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 40px', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
          border: '1px solid rgba(102,126,234,.12)', borderRadius: 16,
          padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.2rem' }}>🩺</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>
              Three instant health checks — no sign-up required
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
              BMI Calculator · Symptom Checker · Heart Risk Assessment
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Free', 'Instant', 'Private', 'AI-Powered'].map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 50,
                background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three-column grid ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24,
        alignItems: 'start',
      }}>

        {/* ── BMI Calculator ── */}
        <CardShell
          hovered={hoveredCard === 'bmi'}
          onEnter={() => setHoveredCard('bmi')}
          onLeave={() => setHoveredCard(null)}
        >
          <CardHero
            eyebrow="HealthNexus · Tool 01"
            title="BMI Calculator"
            subtitle="Check if you're at a healthy weight range with instant results."
            grad={T.gradBlue}
          />
          <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Live metric badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { value: `${heightCm}`,  label: 'Height cm',  color: T.blue,   bg: T.blueL,   border: T.blueBorder },
                { value: `${weightKg}`,  label: 'Weight kg',  color: T.teal,   bg: T.tealL,   border: T.tealBorder },
                { value: `${bmi}`,       label: 'BMI Score',  color: T.purple, bg: T.purpleL, border: T.purpleBorder },
                { value: bmiCategory.split(' ')[0], label: 'Category', color: badge.color, bg: badge.bg, border: badge.border },
              ].map(m => <MetricBadge key={m.label} {...m} />)}
            </div>

            <Divider />
            <SectionLabel text="Adjust your measurements" />

            <SliderRow label="Height (cm)" value={heightCm} min={140} max={210} displayValue={`${heightCm} cm`} onChange={setHeightCm} />
            <SliderRow label="Weight (kg)" value={weightKg} min={30}  max={160} displayValue={`${weightKg} kg`} onChange={setWeightKg} />

            <Divider />
            <SectionLabel text="Result" />

            {/* BMI result box */}
            <div style={{
              background: badge.bg, border: `1px solid ${badge.border}`,
              borderRadius: 12, padding: '14px 16px', textAlign: 'center', marginBottom: 16,
            }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: badge.color, lineHeight: 1 }}>{bmi}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: badge.color, marginTop: 6 }}>{bmiCategory}</div>
            </div>

            {/* BMI scale */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#a0aec0', marginBottom: 5 }}>
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
              <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#85B7EB 0%,#68d391 25%,#EF9F27 65%,#E24B4A 100%)' }}>
                <div style={{
                  position: 'absolute', top: -4, width: 16, height: 16, borderRadius: '50%',
                  background: '#fff', border: `2.5px solid ${T.purple}`,
                  transform: 'translateX(-50%)', transition: 'left 0.3s ease',
                  left: bmiMarkerLeft(bmi),
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#a0aec0', marginTop: 5 }}>
                <span>&lt;18.5</span><span>18.5</span><span>25</span><span>30+</span>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              {[
                { icon: '📏', title: 'WHO standard ranges',    desc: 'Uses globally accepted BMI thresholds for adults.' },
                { icon: '⚡', title: 'Instant recalculation',  desc: 'Results update live as you move the sliders.' },
              ].map(r => <CapRow key={r.title} icon={r.icon} title={r.title} desc={r.desc} accentColor={T.blue} />)}
            </div>
          </div>
        </CardShell>

        {/* ── Symptom Checker ── */}
        <CardShell
          hovered={hoveredCard === 'symptom'}
          onEnter={() => setHoveredCard('symptom')}
          onLeave={() => setHoveredCard(null)}
        >
          <CardHero
            eyebrow="HealthNexus · Tool 02"
            title="Symptom Checker"
            subtitle="Select your symptoms for instant health insights and possible conditions."
            grad={T.gradTeal}
          />
          <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Metric badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { value: `${SYMPTOMS.length}`,        label: 'Symptoms',    color: T.teal,   bg: T.tealL,   border: T.tealBorder },
                { value: `${activeSymptoms.size}`,    label: 'Selected',    color: T.blue,   bg: T.blueL,   border: T.blueBorder },
                { value: `${conditions.length}`,      label: 'Conditions',  color: T.purple, bg: T.purpleL, border: T.purpleBorder },
                { value: 'AI',                        label: 'Powered',     color: T.amber,  bg: T.amberL,  border: T.amberBorder },
              ].map(m => <MetricBadge key={m.label} {...m} />)}
            </div>

            <Divider />
            <SectionLabel text="Select your symptoms" />

            {/* Symptom tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {SYMPTOMS.map(s => {
                const active = activeSymptoms.has(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 50,
                      cursor: 'pointer', border: '1px solid',
                      transition: 'all 0.16s',
                      background: active ? T.gradTeal : '#f7fafc',
                      color: active ? '#fff' : '#6b7280',
                      borderColor: active ? 'transparent' : '#e2e8f0',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <Divider />
            <SectionLabel text="Possible conditions" />

            {/* Conditions list */}
            <div style={{
              background: T.tealL, border: `1px solid ${T.tealBorder}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 16, flex: 1,
            }}>
              {conditions.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  fontSize: 13, color: '#2d3748', padding: '7px 0',
                  borderBottom: i < conditions.length - 1 ? `1px solid ${T.tealBorder}` : 'none',
                }}>
                  <span style={{ color: T.teal, fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#718096',
              background: T.amberL, border: `1px solid ${T.amberBorder}`,
              borderRadius: 10, padding: '12px 14px', marginBottom: 16, lineHeight: 1.5,
            }}>
              <span style={{ flexShrink: 0, fontSize: '1rem' }}>⚠️</span>
              <span>This is not a diagnosis. Always consult a qualified doctor before taking any action.</span>
            </div>

            <button style={{
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: T.gradTeal, color: '#fff', marginTop: 'auto',
              letterSpacing: '0.3px',
            }}>
              Consult a Doctor →
            </button>
          </div>
        </CardShell>

        {/* ── Heart Risk Assessment ── */}
        <CardShell
          hovered={hoveredCard === 'heart'}
          onEnter={() => setHoveredCard('heart')}
          onLeave={() => setHoveredCard(null)}
        >
          <CardHero
            eyebrow="HealthNexus · Tool 03"
            title="Heart Risk Assessment"
            subtitle="Evaluate your cardiovascular health profile in under 60 seconds."
            grad={T.gradPink}
          />
          <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Metric badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { value: `${RISK_FACTORS.length}`,  label: 'Risk factors', color: T.pink,   bg: T.pinkL,   border: T.pinkBorder },
                { value: `${riskTotal}`,            label: 'Selected',    color: T.red,    bg: T.redL,    border: T.redBorder },
                { value: `${RISK_WIDTHS[riskTotal]}%`, label: 'Risk level', color: T.amber, bg: T.amberL, border: T.amberBorder },
                { value: RISK_LABELS[riskTotal].split(' ')[0], label: 'Status', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
              ].map(m => <MetricBadge key={m.label} {...m} />)}
            </div>

            <Divider />
            <SectionLabel text="Select your risk factors" />

            {/* Checkboxes */}
            <div style={{ marginBottom: 20, flex: 1 }}>
              {RISK_FACTORS.map((factor, i) => (
                <div
                  key={factor}
                  onClick={() => toggleCheck(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 13, color: '#4a5568', fontWeight: 500,
                    padding: '10px 12px', borderRadius: 10, marginBottom: 6,
                    background: checks[i] ? T.pinkL : '#f7fafc',
                    border: `1px solid ${checks[i] ? T.pinkBorder : '#e2e8f0'}`,
                    cursor: 'pointer', transition: 'all .16s',
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: checks[i] ? 'none' : `1.5px solid #cbd5e0`,
                    background: checks[i] ? T.gradPink : 'transparent',
                    transition: 'all 0.16s',
                  }}>
                    {checks[i] && <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ color: checks[i] ? T.pink : '#4a5568' }}>{factor}</span>
                </div>
              ))}
            </div>

            <Divider />
            <SectionLabel text="Risk meter" />

            {/* Risk meter */}
            <div style={{
              background: T.pinkL, border: `1px solid ${T.pinkBorder}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#718096', marginBottom: 8, fontWeight: 600 }}>
                <span>Risk level</span>
                <span style={{ color: T.pink, fontWeight: 700 }}>{riskTotal} factor{riskTotal !== 1 ? 's' : ''}</span>
              </div>
              <div style={{ background: '#edf2f7', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{
                  height: '100%', borderRadius: 6,
                  background: riskFillColor(riskTotal),
                  width: `${RISK_WIDTHS[riskTotal]}%`,
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1a202c' }}>{RISK_LABELS[riskTotal]}</div>
                <div style={{ fontSize: 12, color: '#718096', marginTop: 3 }}>{RISK_SUBS[riskTotal]}</div>
              </div>
            </div>

            <button style={{
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: T.gradPink, color: '#fff',
              letterSpacing: '0.3px',
            }}>
              Get Personalised Tips →
            </button>
          </div>
        </CardShell>

      </div>
    </section>
  );
};

export default HealthTools;