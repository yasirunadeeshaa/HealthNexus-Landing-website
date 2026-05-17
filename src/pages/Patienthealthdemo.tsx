import { useState, useEffect } from "react";
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

/* ─── Shared token palette (mirrors VendorBenefits) ─── */
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
  gradPurple:   'linear-gradient(135deg, #6b3fa0 0%, #993556 100%)',
};

/* ─── Mock Data ─── */
const bpData = [
  { date: 'Jan', systolic: 118, diastolic: 76 },
  { date: 'Feb', systolic: 122, diastolic: 79 },
  { date: 'Mar', systolic: 130, diastolic: 84 },
  { date: 'Apr', systolic: 126, diastolic: 81 },
  { date: 'May', systolic: 135, diastolic: 88 },
  { date: 'Jun', systolic: 128, diastolic: 82 },
  { date: 'Jul', systolic: 124, diastolic: 78 },
  { date: 'Aug', systolic: 119, diastolic: 75 },
  { date: 'Sep', systolic: 121, diastolic: 77 },
  { date: 'Oct', systolic: 116, diastolic: 74 },
  { date: 'Nov', systolic: 118, diastolic: 76 },
  { date: 'Dec', systolic: 114, diastolic: 72 },
];

const weightData = [
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

const glucoseData = [
  { date: 'Jan', value: 108 },
  { date: 'Feb', value: 115 },
  { date: 'Mar', value: 122 },
  { date: 'Apr', value: 118 },
  { date: 'May', value: 126 },
  { date: 'Jun', value: 112 },
  { date: 'Jul', value: 105 },
  { date: 'Aug', value: 98  },
  { date: 'Sep', value: 102 },
  { date: 'Oct', value: 96  },
  { date: 'Nov', value: 100 },
  { date: 'Dec', value: 94  },
];

const heartRateData = [
  { date: 'Jan', value: 78 },
  { date: 'Feb', value: 74 },
  { date: 'Mar', value: 80 },
  { date: 'Apr', value: 76 },
  { date: 'May', value: 82 },
  { date: 'Jun', value: 77 },
  { date: 'Jul', value: 73 },
  { date: 'Aug', value: 71 },
  { date: 'Sep', value: 75 },
  { date: 'Oct', value: 72 },
  { date: 'Nov', value: 70 },
  { date: 'Dec', value: 68 },
];

const radarData = [
  { metric: 'Blood Pressure', score: 82,  fullMark: 100 },
  { metric: 'Heart Rate',     score: 91,  fullMark: 100 },
  { metric: 'Weight / BMI',   score: 74,  fullMark: 100 },
  { metric: 'Blood Glucose',  score: 78,  fullMark: 100 },
  { metric: 'O₂ Saturation',  score: 96,  fullMark: 100 },
  { metric: 'Temperature',    score: 94,  fullMark: 100 },
];

const recentReadings = [
  { date: 'Dec 28, 2024', bp: '114/72', hr: '68 bpm', temp: '36.8°C', spo2: '98%', glucose: '94 mg/dL',  status: 'normal'   },
  { date: 'Dec 14, 2024', bp: '116/74', hr: '70 bpm', temp: '37.0°C', spo2: '97%', glucose: '100 mg/dL', status: 'normal'   },
  { date: 'Nov 30, 2024', bp: '118/76', hr: '72 bpm', temp: '36.9°C', spo2: '98%', glucose: '105 mg/dL', status: 'normal'   },
  { date: 'Nov 15, 2024', bp: '121/77', hr: '74 bpm', temp: '37.2°C', spo2: '96%', glucose: '112 mg/dL', status: 'elevated' },
  { date: 'Oct 31, 2024', bp: '126/81', hr: '77 bpm', temp: '37.4°C', spo2: '97%', glucose: '118 mg/dL', status: 'elevated' },
];

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label, unit }: { active?: boolean; payload?: any[]; label?: any; unit?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0',
    }}>
      <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>{p.value}{unit || ''}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Shared: Hero Card wrapper (gradient header + white body) ─── */
const HeroCard = ({ eyebrow, title, subtitle, grad, children, style = {} }: { eyebrow?: string; title?: string; subtitle?: string; grad: string; children?: React.ReactNode; style?: React.CSSProperties }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,.12)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,.13)' : '0 4px 20px rgba(0,0,0,.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow .3s ease, transform .3s ease',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Gradient hero */}
      <div style={{ background: grad, padding: '22px 22px 18px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, right: 20,  width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)',
          color: '#fff', fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 50, marginBottom: 14,
        }}>
          {eyebrow}
        </div>
        <h3 style={{ fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.4px', margin: '0 0 8px' }}>
          {title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0, maxWidth: 400 }}>
          {subtitle}
        </p>
      </div>
      {/* Body */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};

/* ─── Shared: Metric chip row ─── */
const MetricRow = ({ metrics }: { metrics: Array<{ label: string; value: string | number; bg: string; border: string; color: string }> }) => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
    {metrics.map((m: { label: string; value: string | number; bg: string; border: string; color: string }) => (
      <div key={m.label} style={{
        flex: '1 1 70px', background: m.bg,
        border: `1px solid ${m.border}`, borderRadius: 12,
        padding: '10px 12px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: 3 }}>{m.label}</div>
      </div>
    ))}
  </div>
);

/* ─── Shared: Section label ─── */
const SectionLabel = ({ text }: { text: string }) => (
  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 10px' }}>
    {text}
  </p>
);


/* ══════════════════════════════════════════════
   ANALYTICS TAB
══════════════════════════════════════════════ */
const AnalyticsTab = ({ timeRange, setTimeRange }: { timeRange: string; setTimeRange: (value: string) => void }) => {
  const trimData = (data: any[]) => {
    const counts: Record<string, number> = { week: 1, month: 3, '3months': 4, '6months': 6, year: 12 };
    return data.slice(-(counts[timeRange] ?? 12));
  };

  const summaryMetrics = [
    { value: '114/72', label: 'Current BP',     color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
    { value: '68 bpm', label: 'Heart Rate',      color: T.red,    bg: T.redL,    border: T.redBorder    },
    { value: '77.1 kg',label: 'Weight',          color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
    { value: '94',     label: 'Glucose mg/dL',   color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
    { value: '85/100', label: 'Health Score',    color: T.purple, bg: T.purpleL, border: T.purpleBorder },
  ];

  const timeRanges = [['week','1W'],['month','1M'],['3months','3M'],['6months','6M'],['year','1Y']];

  return (
    <div>
      {/* Summary metric strip */}
      <MetricRow metrics={summaryMetrics} />

      {/* Time range selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#9a9790', fontWeight: 600, marginRight: 4 }}>Range:</span>
        {timeRanges.map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTimeRange(v)}
            style={{
              padding: '5px 14px', borderRadius: 8,
              border: `1px solid ${timeRange === v ? T.blue : '#e2e8f0'}`,
              background: timeRange === v ? T.blueL : '#fff',
              color: timeRange === v ? T.blue : '#718096',
              fontSize: '0.72rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all .2s',
            }}
          >{l}</button>
        ))}
      </div>

      {/* Blood Pressure */}
      <HeroCard
        eyebrow="HealthNexus · Vitals"
        title="Blood Pressure Trend"
        subtitle="Avg 121/77 mmHg · 10 Normal / 2 Elevated readings · Improving ↓"
        grad={T.gradBlue}
        style={{ marginBottom: 20 }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={trimData(bpData)}>
            <defs>
              <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={T.red}  stopOpacity={0.15} />
                <stop offset="95%" stopColor={T.red}  stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
            <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" />
            <YAxis tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" domain={[60, 160]} />
            <Tooltip content={<CustomTooltip unit=" mmHg" />} />
            <Legend wrapperStyle={{ paddingTop: 14, fontSize: 12, color: '#718096' }} />
            <ReferenceLine y={120} stroke={T.amber} strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'Pre-hyp', fill: T.amber, fontSize: 10 }} />
            <ReferenceLine y={140} stroke={T.red}   strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'HTN',     fill: T.red,   fontSize: 10 }} />
            <Area    type="monotone" dataKey="systolic"  fill="url(#sysGrad)" stroke="none" />
            <Line    type="monotone" dataKey="systolic"  stroke={T.red}  strokeWidth={2.5} dot={{ fill: T.red,  r: 3.5, strokeWidth: 0 }} name="Systolic"  />
            <Line    type="monotone" dataKey="diastolic" stroke={T.blue} strokeWidth={2.5} dot={{ fill: T.blue, r: 3.5, strokeWidth: 0 }} name="Diastolic" />
          </ComposedChart>
        </ResponsiveContainer>
      </HeroCard>

      {/* Weight & Glucose side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <HeroCard
          eyebrow="HealthNexus · Vitals"
          title="Weight & BMI"
          subtitle="77.1 kg · BMI 25.1 · Down 7.1 kg · Trending ↓"
          grad={T.gradTeal}
        >
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={trimData(weightData)}>
              <defs>
                <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={T.teal} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={T.teal} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
              <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" />
              <YAxis yAxisId="left"  tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" domain={[70, 90]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" domain={[22, 30]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 12, fontSize: 11, color: '#718096' }} />
              <ReferenceLine yAxisId="right" y={24.9} stroke={T.teal} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'BMI max', fill: T.teal, fontSize: 10 }} />
              <Area yAxisId="left"  type="monotone" dataKey="value" fill="url(#wGrad)" stroke="none" />
              <Line yAxisId="left"  type="monotone" dataKey="value" stroke={T.teal}  strokeWidth={2.5} dot={{ fill: T.teal,  r: 3, strokeWidth: 0 }} name="Weight (kg)" />
              <Line yAxisId="right" type="monotone" dataKey="bmi"   stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 3, strokeWidth: 0 }} strokeDasharray="5 5" name="BMI" />
            </ComposedChart>
          </ResponsiveContainer>
        </HeroCard>

        <HeroCard
          eyebrow="HealthNexus · Vitals"
          title="Blood Glucose"
          subtitle="Avg 104 mg/dL · Target 70–130 mg/dL · Improving ↓"
          grad={T.gradAmber}
        >
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={trimData(glucoseData)}>
              <defs>
                <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={T.purple} stopOpacity={0.2}  />
                  <stop offset="95%" stopColor={T.purple} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
              <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" />
              <YAxis tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" domain={[60, 160]} />
              <Tooltip content={({ active, payload, label }) => <CustomTooltip active={active} payload={payload} label={label} unit=" mg/dL" />} />
              <Legend wrapperStyle={{ paddingTop: 12, fontSize: 11, color: '#718096' }} />
              <ReferenceLine y={130} stroke={T.teal} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Target max', fill: T.teal, fontSize: 10 }} />
              <ReferenceLine y={180} stroke={T.red}  strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'High',       fill: T.red,  fontSize: 10 }} />
              <Bar  dataKey="value" fill="url(#gGrad)" radius={[6, 6, 0, 0]} barSize={22} stroke={`rgba(107,63,160,.4)`} strokeWidth={1} name="Glucose (mg/dL)" />
              <Line type="monotone" dataKey="value" stroke={T.purple} strokeWidth={2} dot={false} name="Trend" />
            </ComposedChart>
          </ResponsiveContainer>
        </HeroCard>
      </div>

      {/* Heart Rate */}
      <HeroCard
        eyebrow="HealthNexus · Vitals"
        title="Heart Rate Monitoring"
        subtitle="Avg 74 bpm · Range 68–82 bpm · Resting heart rate improving"
        grad={T.gradPurple}
        style={{ marginBottom: 20 }}
      >
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={trimData(heartRateData)}>
            <defs>
              <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={T.pink} stopOpacity={0.2}  />
                <stop offset="95%" stopColor={T.pink} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
            <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" />
            <YAxis tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" domain={[50, 100]} />
            <Tooltip content={<CustomTooltip unit=" bpm" />} />
            <ReferenceLine y={60}  stroke={T.teal}  strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Min', fill: T.teal,  fontSize: 10 }} />
            <ReferenceLine y={100} stroke={T.amber} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Max', fill: T.amber, fontSize: 10 }} />
            <Area type="monotone" dataKey="value" fill="url(#hrGrad)" stroke="none" />
            <Line type="monotone" dataKey="value" stroke={T.pink} strokeWidth={2.5} dot={{ fill: T.pink, r: 3.5, strokeWidth: 0 }} name="Heart Rate (bpm)" />
          </ComposedChart>
        </ResponsiveContainer>
      </HeroCard>

      {/* Health Radar */}
      <HeroCard
        eyebrow="HealthNexus · Score"
        title="Overall Health Radar"
        subtitle="Composite score across 6 vital metrics — Dec 2024"
        grad={T.gradBlue}
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '0 0 300px' }}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,.08)" />
                <PolarAngleAxis  dataKey="metric" tick={{ fill: '#718096', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#a0aec0', fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke={T.blue} fill={T.blue} fillOpacity={0.2} dot={{ fill: T.blue, r: 4 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SectionLabel text="Metric Breakdown" />
            {radarData.map(d => (
              <div key={d.metric} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.78rem' }}>
                  <span style={{ color: '#718096' }}>{d.metric}</span>
                  <span style={{ fontWeight: 700, color: '#1a202c' }}>{d.score}</span>
                </div>
                <div style={{ background: '#edf2f7', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 4, width: `${d.score}%`,
                    background: d.score >= 90 ? T.teal : d.score >= 75 ? T.blue : T.amber,
                    transition: 'width .8s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </HeroCard>
    </div>
  );
};

/* ══════════════════════════════════════════════
   VITAL SIGNS TAB
══════════════════════════════════════════════ */
const VitalsTab = () => {
  const vitals = [
    { name: 'Heart Rate',     val: '68',    unit: 'bpm',    range: '60–100',       status: 'Normal',     color: T.red,    bg: T.redL,    border: T.redBorder,    bar: 60 },
    { name: 'Blood Pressure', val: '114/72',unit: 'mmHg',   range: '<140/90',      status: 'Optimal',    color: T.blue,   bg: T.blueL,   border: T.blueBorder,   bar: 75 },
    { name: 'Temperature',    val: '36.8',  unit: '°C',     range: '36.5–37.5',    status: 'Normal',     color: T.amber,  bg: T.amberL,  border: T.amberBorder,  bar: 80 },
    { name: 'O₂ Saturation',  val: '98',    unit: '%',      range: '>95',          status: 'Normal',     color: T.teal,   bg: T.tealL,   border: T.tealBorder,   bar: 98 },
    { name: 'Resp. Rate',     val: '15',    unit: '/min',   range: '12–20',        status: 'Normal',     color: T.purple, bg: T.purpleL, border: T.purpleBorder, bar: 55 },
    { name: 'Weight',         val: '77.1',  unit: 'kg',     range: 'BMI 18.5–24.9',status: 'Overweight', color: T.pink,   bg: T.pinkL,   border: T.pinkBorder,   bar: 70 },
    { name: 'Blood Glucose',  val: '94',    unit: 'mg/dL',  range: '70–130',       status: 'Normal',     color: T.amber,  bg: T.amberL,  border: T.amberBorder,  bar: 40 },
  ];

  const insights = [
    { type: 'teal',  icon: '✅', title: 'All key vitals within normal range',   body: 'Blood pressure, heart rate, temperature and oxygen saturation are all within healthy limits.' },
    { type: 'amber', icon: '⚠️', title: 'BMI slightly elevated at 25.1',         body: "Just above the optimal 18.5–24.9 range. Continue your current weight management plan — you're trending in the right direction." },
    { type: 'teal',  icon: '📉', title: 'Excellent progress this year',          body: 'Reduced weight by 7.1 kg, lowered resting heart rate by 10 bpm, and improved blood glucose by 14 mg/dL.' },
  ];

  return (
    <div>
      {/* Vitals grid */}
      <SectionLabel text="Latest Vital Readings" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 28 }}>
        {vitals.map(v => (
          <div key={v.name} style={{
            background: '#fff', border: `1px solid ${v.border}`, borderRadius: 16,
            padding: '16px 18px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,.04)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: v.color, borderRadius: '16px 16px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9a9790' }}>{v.name}</div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 50, background: v.bg, color: v.color }}>{v.status}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 8 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a202c' }}>{v.val}</span>
              <span style={{ fontSize: '0.78rem', color: '#718096' }}>{v.unit}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', marginBottom: 8 }}>Range: {v.range}</div>
            <div style={{ background: '#edf2f7', borderRadius: 4, height: 5, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(v.bar, 100)}%`, height: '100%', background: v.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <SectionLabel text="Health Insights" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {insights.map((ins, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 16px', borderRadius: 12,
            background:     ins.type === 'teal' ? T.tealL  : T.amberL,
            border:        `1px solid ${ins.type === 'teal' ? T.tealBorder : T.amberBorder}`,
            borderLeft:    `3px solid ${ins.type === 'teal' ? T.teal       : T.amber}`,
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{ins.icon}</span>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>{ins.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#718096', lineHeight: 1.5 }}>{ins.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Health Radar in HeroCard */}
      <HeroCard
        eyebrow="HealthNexus · Score"
        title="Overall Health Radar"
        subtitle="Composite score across 6 vital metrics — Dec 2024"
        grad={T.gradBlue}
      >
        <SectionLabel text="Metric Breakdown" />
        {radarData.map(d => (
          <div key={d.metric} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.78rem' }}>
              <span style={{ color: '#718096' }}>{d.metric}</span>
              <span style={{ fontWeight: 700, color: '#1a202c' }}>{d.score}</span>
            </div>
            <div style={{ background: '#edf2f7', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4, width: `${d.score}%`,
                background: d.score >= 90 ? T.teal : d.score >= 75 ? T.blue : T.amber,
                transition: 'width .8s ease',
              }} />
            </div>
          </div>
        ))}
      </HeroCard>
    </div>
  );
};

/* ══════════════════════════════════════════════
   HISTORY TAB
══════════════════════════════════════════════ */
const HistoryTab = () => {
  const summaryStats = [
    { label: 'Total Readings', val: '5'      },
    { label: 'Normal',         val: '3 (60%)'},
    { label: 'Elevated',       val: '2 (40%)'},
    { label: 'Critical',       val: '0 (0%)' },
  ];

  return (
    <div>
      <div style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(102,126,234,.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,.07)',
      }}>
        {/* Hero */}
        <div style={{ background: T.gradBlue, padding: '22px 22px 18px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -50, right: 20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 50, marginBottom: 14 }}>
            HealthNexus · History
          </div>
          <h3 style={{ fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 8px' }}>
            Vital Signs History
          </h3>
          <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
            All recorded readings · Recent visits
          </p>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #edf2f7' }}>
                {['Date','Blood Pressure','Heart Rate','Temperature','SpO₂','Blood Glucose','Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#9a9790', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReadings.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f4f8', background: i % 2 === 0 ? '#fafbfc' : '#fff' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#4a5568', fontSize: '0.78rem' }}>{r.date}</td>
                  <td style={{ padding: '12px 14px', color: '#2d3748', fontSize: '0.78rem' }}>{r.bp}</td>
                  <td style={{ padding: '12px 14px', color: '#2d3748', fontSize: '0.78rem' }}>{r.hr}</td>
                  <td style={{ padding: '12px 14px', color: '#2d3748', fontSize: '0.78rem' }}>{r.temp}</td>
                  <td style={{ padding: '12px 14px', color: '#2d3748', fontSize: '0.78rem' }}>{r.spo2}</td>
                  <td style={{ padding: '12px 14px', color: '#2d3748', fontSize: '0.78rem' }}>{r.glucose}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 50,
                      background: r.status === 'normal' ? T.tealL  : T.amberL,
                      color:      r.status === 'normal' ? T.teal   : T.amber,
                    }}>
                      {r.status === 'normal' ? '✓ Normal' : '⚠ Elevated'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        <div style={{ padding: '18px 22px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, background: '#fafbfc' }}>
          {summaryStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#9a9790', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a202c' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const PatientHealthDemo = () => {
  const [activeTab, setActiveTab]   = useState('analytics');
  const [timeRange, setTimeRange]   = useState('year');
  const [visible,   setVisible]     = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const tabs = [
    { id: 'analytics', label: '📊 Analytics'    },
    { id: 'vitals',    label: '❤️ Vital Signs'  },
    { id: 'history',   label: '🗂 History'       },
  ];

  const bannerChips = [
    { l: 'Height',     v: '175 cm' },
    { l: 'Blood Type', v: 'O+'     },
    { l: 'Allergies',  v: 'None'   },
  ];

  return (
    <div style={{
      fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      background: '#fafbfc',
      color: '#1a202c',
      opacity: visible ? 1 : 0,
      transition: 'opacity .4s ease',
    }}>

      {/* ── Page header ── */}
      <div style={{ textAlign: 'center', padding: '64px 24px 44px' }}>
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
          border: '1px solid rgba(102,126,234,.2)',
          color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: 50, marginBottom: 24,
        }}>
          Patient Portal
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
        }}>
          Your personal{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            health dashboard
          </span>
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
          Track vitals, monitor trends, and stay on top of your health journey — all in one place.
        </p>
      </div>

      {/* ── Info banner strip ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 32px', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
          border: '1px solid rgba(102,126,234,.12)',
          borderRadius: 16, padding: '18px 26px',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.2rem' }}>🏥</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>
              HealthNexus Patient Portal · Demo
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
              Real-time monitoring · AI-powered insights · HIPAA-compliant · Connected care
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['HIPAA', 'AI', 'Real-Time', 'Secure'].map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px',
                textTransform: 'uppercase', padding: '4px 12px', borderRadius: 50,
                background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Patient banner */}
        <div style={{
          background: '#fff', border: '1px solid rgba(102,126,234,.12)',
          borderRadius: 20, padding: '20px 24px', marginBottom: 28,
          display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap',
          boxShadow: '0 2px 12px rgba(0,0,0,.05)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>AP</div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a202c', letterSpacing: '-0.3px' }}>Ashan Perera</div>
            <div style={{ fontSize: '0.78rem', color: '#718096', marginTop: 2 }}>Patient ID: PT-20241028 · 34 years · Male</div>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', marginTop: 3 }}>Dr. Nilmini Fernando · General Medicine · Last visit: Dec 28, 2024</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {bannerChips.map(({ l, v }) => (
              <div key={l} style={{
                background: T.blueL, border: `1px solid ${T.blueBorder}`,
                borderRadius: 10, padding: '8px 14px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: T.blue, opacity: 0.8, marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: T.blue }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: 'flex', gap: 4, marginBottom: 28,
          background: '#fff', border: '1px solid rgba(102,126,234,.12)',
          borderRadius: 13, padding: 4, width: 'fit-content',
          boxShadow: '0 2px 8px rgba(0,0,0,.04)',
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 20px', borderRadius: 9, border: 'none',
                fontSize: '0.78rem', fontWeight: 600,
                background: activeTab === t.id ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'transparent',
                color:      activeTab === t.id ? '#fff' : '#718096',
                transition: 'all .2s ease',
                cursor: 'pointer',
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'analytics' && <AnalyticsTab timeRange={timeRange} setTimeRange={setTimeRange} />}
        {activeTab === 'vitals'    && <VitalsTab />}
        {activeTab === 'history'   && <HistoryTab />}
      </div>
    </div>
  );
};

export default PatientHealthDemo;