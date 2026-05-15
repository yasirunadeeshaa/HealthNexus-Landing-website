import { useState } from 'react';
import { Activity, Brain, Heart, Sparkles, Info, Check } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

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

const RISK_LABELS   = ['Low Risk', 'Low-Moderate Risk', 'Moderate Risk', 'High Risk', 'Very High Risk'];
const RISK_SUBS     = ['Keep up the healthy lifestyle!', 'Consider a check-up soon.', 'Consult your doctor.', 'Seek medical advice promptly.', 'Please see a doctor immediately.'];
const RISK_WIDTHS   = [10, 28, 50, 72, 90];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const bmiBadgeStyle = (cat: BMICategory): { background: string; color: string } => {
  if (cat === 'Normal Weight') return { background: '#E1F5EE', color: '#0F6E56' };
  if (cat === 'Obese')         return { background: '#FCEBEB', color: '#A32D2D' };
  return                                { background: '#FAEEDA', color: '#854F0B' };
};

const riskFillColor = (total: number): string => {
  if (total <= 1) return 'linear-gradient(90deg, #68d391, #38a169)';
  if (total <= 2) return 'linear-gradient(90deg, #FAC775, #EF9F27)';
  return                 'linear-gradient(90deg, #F09595, #E24B4A)';
};

const bmiMarkerLeft = (bmi: number): string =>
  `${Math.min(100, Math.max(0, ((bmi - 10) / 35) * 100)).toFixed(1)}%`;

// ─── SliderRow ────────────────────────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  subLabel: string;
  value: number;
  min: number;
  max: number;
  displayValue: string;
  onChange: (v: number) => void;
}

const SliderRow = ({ label, subLabel, value, min, max, displayValue, onChange }: SliderRowProps) => (
  <div style={{ marginBottom: 18 }}>
    <span style={{ fontSize: 12, fontWeight: 500, color: '#4a5568', display: 'block', marginBottom: 7 }}>
      {label}
    </span>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>{subLabel}</span>
      <span style={{
        fontSize: 11, fontWeight: 600, color: '#fff',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
      }}>
        {displayValue}
      </span>
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

// ─── HealthTools ──────────────────────────────────────────────────────────────

const HealthTools = () => {
  // BMI
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  const bmiCategory: BMICategory =
    bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Weight' : bmi < 30 ? 'Overweight' : 'Obese';

  // Symptoms
  const [activeSymptoms, setActiveSymptoms] = useState<Set<Symptom>>(new Set(['Headache']));
  const toggleSymptom = (s: Symptom) =>
    setActiveSymptoms(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  const firstActive = [...activeSymptoms][0] as Symptom | undefined;
  const conditions = firstActive ? SYMPTOM_MAP[firstActive] : ['Select a symptom to see conditions'];

  // Heart risk
  const [checks, setChecks] = useState<boolean[]>(new Array(RISK_FACTORS.length).fill(false));
  const toggleCheck = (i: number) =>
    setChecks(prev => { const next = [...prev]; next[i] = !next[i]; return next; });
  const riskTotal = checks.filter(Boolean).length;

  return (
    <section
      id="health-tools"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8f9ff 100%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs — same as PricingCalculator */}
      {[
        { size: 500, top: '-160px', left: '-160px', color: '#6366F1' },
        { size: 360, bottom: '-80px', right: '-80px', color: '#EC4899' },
        { size: 280, top: '40%',  left: '50%',       color: '#10B981' },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${b.color}14 0%, transparent 70%)`,
          top: (b as any).top, bottom: (b as any).bottom,
          left: (b as any).left, right: (b as any).right,
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
            <Sparkles size={13} /> Health Tools
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Free Health Assessment
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Tools
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Quick, accurate health tools to help you make informed decisions before your consultation.
          </p>
        </div>

        {/* Three-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 22,
        }}>

          {/* ── BMI Calculator ── */}
          <div style={{
            background: '#fff', border: '1px solid #e8ecf0',
            borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: '#EEEDFE', color: '#534AB7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Activity size={22} />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>BMI Calculator</h4>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Check if you're at a healthy weight range</p>

            <SliderRow
              label="Height (cm)"
              subLabel="Adjust height"
              value={heightCm} min={140} max={210}
              displayValue={`${heightCm} cm`}
              onChange={setHeightCm}
            />
            <SliderRow
              label="Weight (kg)"
              subLabel="Adjust weight"
              value={weightKg} min={30} max={160}
              displayValue={`${weightKg} kg`}
              onChange={setWeightKg}
            />

            {/* BMI result */}
            <div style={{
              background: '#f8f9fa', borderRadius: 10, padding: '14px 16px',
              textAlign: 'center', marginBottom: 14,
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1a202c', lineHeight: 1 }}>{bmi}</div>
              <span style={{
                display: 'inline-block', marginTop: 6,
                fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 20,
                ...bmiBadgeStyle(bmiCategory),
              }}>
                {bmiCategory}
              </span>
            </div>

            {/* BMI scale */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#a0aec0', marginBottom: 5 }}>
                <span>Underweight</span><span>Obese</span>
              </div>
              <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#85B7EB 0%,#68d391 25%,#EF9F27 65%,#E24B4A 100%)' }}>
                <div style={{
                  position: 'absolute', top: -4, width: 16, height: 16, borderRadius: '50%',
                  background: '#fff', border: '2.5px solid #6366F1',
                  transform: 'translateX(-50%)',
                  transition: 'left 0.3s ease',
                  left: bmiMarkerLeft(bmi),
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#a0aec0', marginTop: 5 }}>
                <span>&lt;18.5</span><span>18.5</span><span>25</span><span>30+</span>
              </div>
            </div>
          </div>

          {/* ── Symptom Checker ── */}
          <div style={{
            background: '#fff', border: '1px solid #e8ecf0',
            borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: '#E1F5EE', color: '#0F6E56',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Brain size={22} />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>Symptom Checker</h4>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Select symptoms for instant health insights</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {SYMPTOMS.map(s => {
                const active = activeSymptoms.has(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    style={{
                      fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 20,
                      cursor: 'pointer', border: '1px solid',
                      transition: 'all 0.16s',
                      background: active ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f8f9fa',
                      color: active ? '#fff' : '#6b7280',
                      borderColor: active ? 'transparent' : '#e2e8f0',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Conditions list */}
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '14px 16px', marginBottom: 14, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2d3748', marginBottom: 8 }}>Possible conditions</div>
              <ul style={{ paddingLeft: 16, margin: 0, fontSize: 13, color: '#4a5568', lineHeight: 1.8 }}>
                {conditions.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            {/* Disclaimer */}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-start',
              fontSize: 12, color: '#a0aec0', background: '#f8f9fa',
              borderRadius: 8, padding: '10px 12px', marginBottom: 16, lineHeight: 1.5,
            }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 1, color: '#cbd5e0' }} />
              <span>This is not a diagnosis. Always consult a qualified doctor.</span>
            </div>

            <button style={{
              width: '100%', padding: '11px', borderRadius: 10, border: 'none',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff',
              marginTop: 'auto',
            }}>
              Consult a Doctor →
            </button>
          </div>

          {/* ── Heart Risk ── */}
          <div style={{
            background: '#fff', border: '1px solid #e8ecf0',
            borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: '#FBEAF0', color: '#993556',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Heart size={22} />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>Heart Risk Assessment</h4>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Evaluate your cardiovascular health profile</p>

            {/* Checkboxes */}
            <div style={{ marginBottom: 20, flex: 1 }}>
              {RISK_FACTORS.map((factor, i) => (
                <div
                  key={factor}
                  onClick={() => toggleCheck(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 13, color: '#4a5568', padding: '9px 0',
                    borderBottom: i < RISK_FACTORS.length - 1 ? '1px solid #f0f4f8' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: checks[i] ? 'none' : '1.5px solid #cbd5e0',
                    background: checks[i] ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    transition: 'all 0.16s',
                  }}>
                    {checks[i] && <Check size={11} color="#fff" strokeWidth={3} />}
                  </div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>

            {/* Risk meter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 6, fontWeight: 500 }}>
                <span>Risk level</span>
                <span>{riskTotal} factor{riskTotal !== 1 ? 's' : ''}</span>
              </div>
              <div style={{ background: '#edf2f7', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{
                  height: '100%', borderRadius: 6,
                  background: riskFillColor(riskTotal),
                  width: `${RISK_WIDTHS[riskTotal]}%`,
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#2d3748' }}>
                {RISK_LABELS[riskTotal]}
                <small style={{ display: 'block', fontSize: 11, color: '#a0aec0', fontWeight: 400, marginTop: 2 }}>
                  {RISK_SUBS[riskTotal]}
                </small>
              </div>
            </div>

            <button style={{
              width: '100%', padding: '11px', borderRadius: 10, border: 'none',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 16,
              background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff',
            }}>
              Get Personalised Tips →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HealthTools;