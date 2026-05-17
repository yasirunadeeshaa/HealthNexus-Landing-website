import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
  Area,
} from 'recharts';

/* ─── Shared token palette ─── */
const T = {
  blue:    '#1a5fa8',
  blueL:   'rgba(26,95,168,.12)',
  blueBorder: 'rgba(26,95,168,.2)',
  teal:    '#0d7a5f',
  tealL:   'rgba(13,122,95,.12)',
  tealBorder: 'rgba(13,122,95,.2)',
  amber:   '#b85e0c',
  amberL:  'rgba(184,94,12,.15)',
  amberBorder: 'rgba(184,94,12,.2)',
  red:     '#d94f4f',
  redL:    'rgba(217,79,79,.12)',
  redBorder: 'rgba(217,79,79,.2)',
  purple:  '#6b3fa0',
  purpleL: 'rgba(107,63,160,.12)',
  purpleBorder: 'rgba(107,63,160,.2)',
  gradBlue:  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradTeal:  'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  gradAmber: 'linear-gradient(135deg, #b85e0c 0%, #d94f4f 100%)',
  gradGreen: 'linear-gradient(135deg, #11998e 0%, #1a5fa8 100%)',
};

/* ─── Types ─── */
interface TagGroup {
  items: string[];
  color: string;
  bg: string;
  border: string;
}

interface Capability {
  icon: string;
  title: string;
}

interface Metric {
  value: string;
  label: string;
  color: string;
  bg: string;
  border: string;
}

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface Category {
  key: string;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  grad: string;
  shadowColor: string;
  metrics: Metric[];
  tagGroups: TagGroup[];
  capabilities: Capability[];
  stats: Stat[];
  showChart?: boolean;
}

/* ─── Glucose chart data (from PatientHealthDemo) ─── */
const ALL_GLUCOSE_DATA = [
  { date: 'Jan', value: 108 },
  { date: 'Feb', value: 115 },
  { date: 'Mar', value: 122 },
  { date: 'Apr', value: 118 },
  { date: 'May', value: 126 },
  { date: 'Jun', value: 112 },
  { date: 'Jul', value: 105 },
  { date: 'Aug', value: 98  },
  { date: 'Sep', value: 135 },
  { date: 'Oct', value: 96  },
  { date: 'Nov', value: 100 },
  { date: 'Dec', value: 94  },
];

const ALL_WEIGHT_DATA = [
  { date: 'Jan', value: 84.2, bmi: 27.4 },
  { date: 'Feb', value: 83.5, bmi: 27.2 },
  { date: 'Mar', value: 82.8, bmi: 27.0 },
  { date: 'Apr', value: 82.1, bmi: 26.7 },
  { date: 'May', value: 81.4, bmi: 26.5 },
  { date: 'Jun', value: 80.9, bmi: 26.3 },
  { date: 'Jul', value: 80.2, bmi: 26.1 },
  { date: 'Aug', value: 79.5, bmi: 25.9 },
  { date: 'Sep', value: 79.0, bmi: 25.7 },
  { date: 'Oct', value: 78.3, bmi: 25.5 },
  { date: 'Nov', value: 77.8, bmi: 25.3 },
  { date: 'Dec', value: 77.1, bmi: 25.1 },
];

const RANGES: { label: string; count: number }[] = [
  { label: '3M', count: 3 },
  { label: '6M', count: 6 },
  { label: '1Y', count: 12 },
];

/* ─── Custom Tooltip for glucose chart ─── */
const GlucoseTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0',
    }}>
      <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>{p.value} mg/dL</span>
        </div>
      ))}
    </div>
  );
};

const WeightBMIPreviewChart = () => {
  const [activeRange, setActiveRange] = useState(12);
  const data = ALL_WEIGHT_DATA.slice(-activeRange);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 4px' }}>
          Sample Chart — Weight & BMI
        </p>
        <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>
          77.1 kg · BMI 25.1 · Down 7.1 kg · Trending ↓
        </p>
      </div>

      {/* Range pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {RANGES.map(r => (
          <button
            key={r.label}
            onClick={() => setActiveRange(r.count)}
            style={{
              padding: '4px 13px', borderRadius: 8, border: `1px solid ${activeRange === r.count ? '#667eea' : '#e2e8f0'}`,
              background: activeRange === r.count ? 'rgba(102,126,234,.1)' : '#fff',
              color: activeRange === r.count ? '#667eea' : '#718096',
              fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all .15s', fontFamily: 'inherit',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: T.teal, display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', color: '#718096', fontWeight: 600 }}>Weight (kg)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 18, height: 2, background: T.amber, display: 'inline-block', borderRadius: 1, borderTop: '2px dashed' }} />
          <span style={{ fontSize: '0.7rem', color: '#718096', fontWeight: 600 }}>BMI</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={T.teal} stopOpacity={0.18} />
              <stop offset="95%" stopColor={T.teal} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
          <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} />
          <YAxis yAxisId="left"  tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} domain={[70, 90]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} domain={[22, 30]} />
          <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div style={{
                  background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0',
                }}>
                  <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
                  {payload.map((p: any, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                      <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
                      <span style={{ fontWeight: 600, color: '#fff' }}>
                        {p.value} {p.name === 'BMI' ? '' : 'kg'}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }} />
          <ReferenceLine yAxisId="right" y={24.9} stroke={T.teal} strokeDasharray="5 4" strokeOpacity={0.7}
            label={{ value: 'BMI max', fill: T.teal, fontSize: 10, position: 'insideTopRight' }} />
          <Area yAxisId="left" type="monotone" dataKey="value" fill="url(#weightGrad)" stroke="none" />
          <Line yAxisId="left"  type="monotone" dataKey="value" stroke={T.teal}  strokeWidth={2} dot={{ fill: T.teal,  r: 3, strokeWidth: 0 }} name="Weight (kg)" />
          <Line yAxisId="right" type="monotone" dataKey="bmi"   stroke={T.amber} strokeWidth={2} dot={{ fill: T.amber, r: 3, strokeWidth: 0 }} strokeDasharray="5 5" name="BMI" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ─── Glucose Preview Chart ─── */
const GlucosePreviewChart = ({ onViewAll }: { onViewAll: () => void }) => {
  const [activeRange, setActiveRange] = useState(12);

  const data = ALL_GLUCOSE_DATA.slice(-activeRange);

  return (
    <div style={{ marginTop: 20 }}>
      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />

      {/* Chart header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 4px' }}>
            Sample Chart — Blood Glucose
          </p>
          <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>
            Avg 104 mg/dL · Target 70–130 mg/dL · Improving ↓
          </p>
        </div>

        {/* View all charts button */}
        <button
          onClick={onViewAll}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 18px', borderRadius: 10,
            border: '1.5px solid #667eea',
            background: 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))',
            color: '#667eea', fontSize: '0.75rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg,rgba(102,126,234,.16),rgba(118,75,162,.16))';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(102,126,234,.25)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View all charts
        </button>
      </div>

      {/* Range pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {RANGES.map(r => (
          <button
            key={r.label}
            onClick={() => setActiveRange(r.count)}
            style={{
              padding: '4px 13px', borderRadius: 8, border: `1px solid ${activeRange === r.count ? '#667eea' : '#e2e8f0'}`,
              background: activeRange === r.count ? 'rgba(102,126,234,.1)' : '#fff',
              color: activeRange === r.count ? '#667eea' : '#718096',
              fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all .15s', fontFamily: 'inherit',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: T.purple, display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', color: '#718096', fontWeight: 600 }}>Glucose (mg/dL)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 18, height: 2, background: T.teal, display: 'inline-block', borderRadius: 1 }} />
          <span style={{ fontSize: '0.7rem', color: '#718096', fontWeight: 600 }}>Target max (130)</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={T.purple} stopOpacity={0.22} />
              <stop offset="95%" stopColor={T.purple} stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#a0aec0', fontSize: 11 }}
            stroke="#e2e8f0"
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#a0aec0', fontSize: 11 }}
            stroke="#e2e8f0"
            tickLine={false}
            domain={[60, 160]}
          />
          <Tooltip content={<GlucoseTooltip />} />
          <ReferenceLine
            y={130}
            stroke={T.teal}
            strokeDasharray="5 4"
            strokeOpacity={0.7}
            label={{ value: 'Target max', fill: T.teal, fontSize: 10, position: 'insideTopRight' }}
          />
          <ReferenceLine
            y={180}
            stroke={T.red}
            strokeDasharray="5 4"
            strokeOpacity={0.6}
            label={{ value: 'High', fill: T.red, fontSize: 10, position: 'insideTopRight' }}
          />
          <Bar
            dataKey="value"
            fill="url(#glucoseGrad)"
            stroke="rgba(107,63,160,.4)"
            strokeWidth={1}
            radius={[6, 6, 0, 0]}
            barSize={20}
            name="Glucose (mg/dL)"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={T.purple}
            strokeWidth={2}
            dot={false}
            name="Trend"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ─── Shared sub-components ─── */
const MetricRow = ({ metrics }: { metrics: Metric[] }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
    {metrics.map(m => (
      <div
        key={m.label}
        style={{
          flex: '1 1 80px',
          background: m.bg,
          border: `1px solid ${m.border}`,
          borderRadius: '12px',
          padding: '12px 14px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{
          fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px',
        }}>{m.label}</div>
      </div>
    ))}
  </div>
);

const CapRow = ({ icon, title }: { icon: string; title: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '9px 12px', borderRadius: '10px', marginBottom: '6px',
    background: '#f7fafc', border: '1px solid #e2e8f0',
  }}>
    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c' }}>{title}</span>
  </div>
);

/* ─── Data ─── */
const CATEGORIES: Category[] = [
  {
    key: 'appointment',
    label: 'Appointments',
    eyebrow: 'HealthNexus · Feature 01',
    title: 'Smart Appointment Management',
    subtitle: 'Book, reschedule, and track appointments in real time with AI-powered slot suggestions and intelligent multi-channel reminders.',
    grad: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadowColor: 'rgba(102,126,234,.35)',
    metrics: [
      { value: '15+',  label: 'Search Filters', color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
      { value: 'Live', label: 'Availability',   color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
      { value: 'AI',   label: 'Rescheduling',   color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
      { value: '24/7', label: 'Booking',         color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    tagGroups: [
      { items: ['Specialization', 'Language', 'Insurance', 'Ratings'],  color: T.teal,  bg: T.tealL,  border: T.tealBorder  },
      { items: ['SMS Alerts', 'Email', 'Push Notifications'],            color: T.amber, bg: T.amberL, border: T.amberBorder },
      { items: ['Group Sessions', 'Emergency Priority Booking'],         color: T.blue,  bg: T.blueL,  border: T.blueBorder  },
    ],
    capabilities: [
      { icon: '🔍', title: 'Advanced doctor search with 15+ filters: specialization, language, insurance, ratings' },
      { icon: '⚡', title: 'Real-time slot updates with instant booking confirmation' },
      { icon: '🔄', title: 'AI suggests the best alternative slots automatically on reschedule' },
      { icon: '🔔', title: 'Multi-channel reminders via SMS, email, and push notifications' },
      { icon: '🚨', title: 'Emergency priority booking with nearest facility finder' },
      { icon: '👥', title: 'Group educational workshops and therapy session booking' },
    ],
    stats: [
      { value: '15+',  label: 'Search filters',  color: T.blue   },
      { value: '<30s', label: 'Avg booking time', color: T.teal   },
      { value: 'AI',   label: 'Smart reschedule', color: T.amber  },
      { value: '24/7', label: 'Availability',     color: T.purple },
    ],
    showChart: false,
  },
  {
    key: 'consultation',
    label: 'Telemedicine',
    eyebrow: 'HealthNexus · Feature 02',
    title: 'Next-Gen Telemedicine',
    subtitle: 'Crystal-clear, encrypted virtual consultations with AI transcription, digital whiteboard, and real-time in-call chat capabilities.',
    grad: T.gradTeal,
    shadowColor: 'rgba(13,122,95,.35)',
    metrics: [
      { value: 'HD',    label: 'Video Quality', color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
      { value: '99.9%', label: 'Uptime',        color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
      { value: 'AI',    label: 'Transcription', color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
      { value: 'E2E',   label: 'Encrypted',     color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    tagGroups: [
      { items: ['HD Adaptive', 'Auto Quality Adjust', 'Screen Share'], color: T.teal,  bg: T.tealL,  border: T.tealBorder  },
      { items: ['AI Notes', 'Key Highlights', 'Auto Summary'],         color: T.amber, bg: T.amberL, border: T.amberBorder },
      { items: ['Digital Whiteboard', 'File Sharing', 'Recording'],    color: T.blue,  bg: T.blueL,  border: T.blueBorder  },
    ],
    capabilities: [
      { icon: '📷', title: 'Crystal-clear HD video with automatic quality adjustment' },
      { icon: '🖥️', title: 'Share medical reports and images during the consultation' },
      { icon: '🎙️', title: 'AI transcription with automatic consultation notes & key highlights' },
      { icon: '✏️', title: 'Interactive digital whiteboard for doctors to explain conditions' },
      { icon: '🔒', title: 'Optional encrypted session recording for future reference' },
      { icon: '💬', title: 'In-call messaging with file sharing capabilities' },
    ],
    stats: [
      { value: '99.9%', label: 'Video uptime',       color: T.teal   },
      { value: 'HD',    label: 'Adaptive quality',   color: T.blue   },
      { value: 'AI',    label: 'Auto transcription', color: T.amber  },
      { value: 'E2E',   label: 'Encrypted calls',    color: T.purple },
    ],
    showChart: false,
  },
  {
    key: 'health',
    label: 'Health Records',
    eyebrow: 'HealthNexus · Feature 03',
    title: 'Comprehensive Health Management',
    subtitle: 'Your complete health picture always in sync — vitals, medications, lab results, and AI-driven predictive health alerts in one place.',
    grad: T.gradGreen,
    shadowColor: 'rgba(17,153,142,.35)',
    metrics: [
      { value: 'Live', label: 'Vital Sync',   color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
      { value: 'OCR',  label: 'Doc Scan',     color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
      { value: 'AI',   label: 'Insights',     color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
      { value: 'Lab',  label: 'Integration',  color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    tagGroups: [
      {
        items: ['Blood Pressure', 'Glucose', 'Weight', 'Medication', 'Immunizations', 'Allergies', 'Medical Reports', 'Trend Charts'],
        color: T.teal, bg: T.tealL, border: T.tealBorder,
      },
      { items: ['Refill Reminders', 'Interaction Checks', 'Adherence'], color: T.amber, bg: T.amberL, border: T.amberBorder },
      { items: ['OCR Scanning', 'AI Categorization', 'Lab Results'],    color: T.blue,  bg: T.blueL,  border: T.blueBorder  },
    ],
    capabilities: [
      { icon: '📊', title: 'Monitor BP, glucose, weight with trend analysis and alerts' },
      { icon: '💊', title: 'Medication refill reminders, interaction checks, adherence tracking' },
      { icon: '📄', title: 'OCR-powered document scanning and smart categorization' },
      { icon: '🧠', title: 'AI-driven health insights and predictive health alerts' },
      { icon: '🩺', title: 'AI-powered symptom checker with urgency indicators' },
      { icon: '🧪', title: 'Home sample collection and lab result tracking integration' },
    ],
    stats: [
      { value: 'Live', label: 'Vital monitoring',  color: T.teal   },
      { value: '60%',  label: 'Less admin work',   color: T.blue   },
      { value: 'AI',   label: 'Predictive alerts', color: T.amber  },
      { value: '24/7', label: 'Health tracking',   color: T.purple },
    ],
    showChart: true,
  },
  {
    key: 'payment',
    label: 'Payments',
    eyebrow: 'HealthNexus · Feature 04',
    title: 'Seamless Payment & Insurance',
    subtitle: 'Transparent billing with zero friction — real-time insurance verification, paperless auto claim filing, and full expense analytics.',
    grad: 'linear-gradient(135deg, #6b3fa0 0%, #993556 100%)',
    shadowColor: 'rgba(107,63,160,.35)',
    metrics: [
      { value: 'Multi',   label: 'Payment Modes', color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
      { value: 'Instant', label: 'Insur. Check',  color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
      { value: 'Auto',    label: 'Claim Filing',  color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
      { value: '0',       label: 'Hidden Fees',   color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    tagGroups: [
      { items: ['Cards', 'Digital Wallets', 'EMI', 'Insurance'],        color: T.teal,  bg: T.tealL,  border: T.tealBorder  },
      { items: ['Eligibility Check', 'Claim Estimation'],                color: T.amber, bg: T.amberL, border: T.amberBorder },
      { items: ['Expense Analytics', 'Tax Reports', 'Refunds'],         color: T.blue,  bg: T.blueL,  border: T.blueBorder  },
    ],
    capabilities: [
      { icon: '💳', title: 'Cards, digital wallets, EMI options, and insurance coverage' },
      { icon: '🛡️', title: 'Real-time insurance eligibility check and claim estimation' },
      { icon: '📋', title: 'Paperless auto claim submission with full status tracking' },
      { icon: '🧾', title: 'Upfront cost breakdown with zero hidden charges' },
      { icon: '🔄', title: 'Quick refund processing for appointment cancellations' },
      { icon: '📈', title: 'Healthcare spending analytics and downloadable tax reports' },
    ],
    stats: [
      { value: 'Instant', label: 'Insurance check',  color: T.amber  },
      { value: 'Auto',    label: 'Claim filing',     color: T.teal   },
      { value: '0',       label: 'Hidden charges',   color: T.red    },
      { value: 'Full',    label: 'Expense tracking', color: T.purple },
    ],
    showChart: false,
  },
];

/* ─── Tab button ─── */
const TabButton = ({
  cat,
  isActive,
  onClick,
}: {
  cat: Category;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '9px 20px', borderRadius: '50px', border: 'none',
        cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
        fontFamily: 'inherit',
        transition: 'all .2s',
        background: isActive
          ? cat.grad
          : hovered
          ? 'rgba(102,126,234,.08)'
          : 'transparent',
        color: isActive ? '#fff' : hovered ? '#4a5568' : '#718096',
        boxShadow: isActive ? `0 4px 14px ${cat.shadowColor}` : 'none',
      }}
    >
      {cat.label}
    </button>
  );
};

/* ─── Main component ─── */
const DetailedFeatures = () => {
   const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>(CATEGORIES[2].key);
  const cat = CATEGORIES.find(c => c.key === activeKey) ?? CATEGORIES[0];

  const handleViewAll = () => {
    // Navigate to health analytics page — replace with your router call, e.g.:
    // router.push('/health/analytics');
    navigate('/patient-demo');
    console.log('Navigate to full health analytics dashboard');
  };

  return (
    <section id="capabilities">
    <div style={{
      fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      background: '#fafbfc',
      color: '#1a202c',
    }}>

      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', padding: '72px 24px 48px', background: '#fafbfc' }}>
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
          border: '1px solid rgba(102,126,234,.2)',
          color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: '50px', marginBottom: '24px',
        }}>
          Platform Capabilities
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15,
          margin: '0 0 16px',
        }}>
          Comprehensive Healthcare{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Feature Suite
          </span>
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
          Every tool your care journey needs — built for patients, doctors, and the ecosystem around them.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Tab bar ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            background: '#fff',
            border: '1px solid rgba(102,126,234,.14)',
            borderRadius: '50px',
            padding: '5px',
            gap: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,.06)',
            flexWrap: 'wrap',
          }}>
            {CATEGORIES.map(c => (
              <TabButton
                key={c.key}
                cat={c}
                isActive={c.key === activeKey}
                onClick={() => setActiveKey(c.key)}
              />
            ))}
          </div>
        </div>

        {/* ── Feature card ── */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(102,126,234,.12)',
          boxShadow: '0 4px 20px rgba(0,0,0,.07)',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Card hero */}
          <div style={{
            background: cat.grad,
            padding: '32px 28px 28px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'rgba(255,255,255,.07)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '-60px', right: '20px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'rgba(255,255,255,.05)', pointerEvents: 'none',
            }} />

            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,.18)',
              border: '1px solid rgba(255,255,255,.28)',
              color: '#fff', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              padding: '5px 16px', borderRadius: '50px', marginBottom: '16px',
            }}>
              {cat.eyebrow}
            </div>

            <h3 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800,
              color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px',
              margin: '0 0 10px',
            }}>
              {cat.title}
            </h3>

            <p style={{
              color: 'rgba(255,255,255,.82)', fontSize: '0.82rem',
              lineHeight: 1.65, margin: 0, maxWidth: '500px',
            }}>
              {cat.subtitle}
            </p>
          </div>

          {/* Card body */}
          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>

            {/* Metrics */}
            <MetricRow metrics={cat.metrics} />

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 20px' }} />

            {/* Tags */}
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>
                Key Inputs
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.tagGroups.flatMap((g, gi) =>
                  g.items.map(item => (
                    <span
                      key={`${gi}-${item}`}
                      style={{
                        display: 'inline-block', fontSize: '0.72rem', fontWeight: 600,
                        color: g.color, background: g.bg, border: `1px solid ${g.border}`,
                        borderRadius: '7px', padding: '4px 10px',
                      }}
                    >{item}</span>
                  ))
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />

            {/* Capabilities */}
            <div style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>
                Core Capabilities
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {cat.capabilities.map(c => (
                  <CapRow key={c.title} icon={c.icon} title={c.title} />
                ))}
              </div>
            </div>

            {/* ── Blood Glucose chart (Health Records tab only) ── */}
            {/* ── Blood Glucose chart (Health Records tab only) ── */}
            {cat.showChart && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                
                <div>
                  <WeightBMIPreviewChart />
                </div>
                <div>
                  <GlucosePreviewChart onViewAll={handleViewAll} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '12px',
          flexWrap: 'wrap', marginTop: '28px',
        }}>
          {cat.stats.map(s => (
            <div key={s.label} style={{
              background: '#fff', border: '1px solid rgba(102,126,234,.14)',
              borderRadius: '14px', padding: '14px 26px', minWidth: '110px',
              boxShadow: '0 2px 10px rgba(0,0,0,.05)', flex: '1 1 100px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a0aec0', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default DetailedFeatures;