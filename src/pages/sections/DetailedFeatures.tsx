import { Building, Calendar, Camera, CheckCircle, ChevronLeft, ChevronRight, FileText, Filter, MapPin, MessageSquare, Mic, Phone, Pill, Search, Send, Share2, Shield, Star, Stethoscope, Video, Wifi } from 'lucide-react';
import { useState, useEffect, useRef, type JSX } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from 'recharts';

/* ─── Mobile hook ─── */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
};

/* ─── Shared token palette ─── */
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
  gradPurple:   'linear-gradient(135deg, #6b3fa0 0%, #993556 100%)',
};

/* ─── Chart Data ─── */
const ALL_GLUCOSE_DATA = [
  { date: 'Jan', value: 108 }, { date: 'Feb', value: 115 }, { date: 'Mar', value: 122 },
  { date: 'Apr', value: 118 }, { date: 'May', value: 126 }, { date: 'Jun', value: 112 },
  { date: 'Jul', value: 105 }, { date: 'Aug', value: 98  }, { date: 'Sep', value: 135 },
  { date: 'Oct', value: 96  }, { date: 'Nov', value: 100 }, { date: 'Dec', value: 94  },
];
const ALL_WEIGHT_DATA = [
  { date: 'Jan', value: 84.2, bmi: 27.4 }, { date: 'Feb', value: 83.5, bmi: 27.2 },
  { date: 'Mar', value: 82.8, bmi: 27.0 }, { date: 'Apr', value: 82.1, bmi: 26.7 },
  { date: 'May', value: 81.4, bmi: 26.5 }, { date: 'Jun', value: 80.9, bmi: 26.3 },
  { date: 'Jul', value: 80.2, bmi: 26.1 }, { date: 'Aug', value: 79.5, bmi: 25.9 },
  { date: 'Sep', value: 79.0, bmi: 25.7 }, { date: 'Oct', value: 78.3, bmi: 25.5 },
  { date: 'Nov', value: 77.8, bmi: 25.3 }, { date: 'Dec', value: 77.1, bmi: 25.1 },
];
const BP_DATA = [
  { date: 'Jan', systolic: 118, diastolic: 76 }, { date: 'Feb', systolic: 122, diastolic: 79 },
  { date: 'Mar', systolic: 130, diastolic: 84 }, { date: 'Apr', systolic: 126, diastolic: 81 },
  { date: 'May', systolic: 135, diastolic: 88 }, { date: 'Jun', systolic: 128, diastolic: 82 },
  { date: 'Jul', systolic: 124, diastolic: 78 }, { date: 'Aug', systolic: 119, diastolic: 75 },
  { date: 'Sep', systolic: 121, diastolic: 77 }, { date: 'Oct', systolic: 116, diastolic: 74 },
  { date: 'Nov', systolic: 118, diastolic: 76 }, { date: 'Dec', systolic: 114, diastolic: 72 },
];
const HR_DATA = [
  { date: 'Jan', value: 78 }, { date: 'Feb', value: 74 }, { date: 'Mar', value: 80 },
  { date: 'Apr', value: 76 }, { date: 'May', value: 82 }, { date: 'Jun', value: 77 },
  { date: 'Jul', value: 73 }, { date: 'Aug', value: 71 }, { date: 'Sep', value: 75 },
  { date: 'Oct', value: 72 }, { date: 'Nov', value: 70 }, { date: 'Dec', value: 68 },
];
const RADAR_DATA = [
  { metric: 'Blood Pressure', score: 82, fullMark: 100 },
  { metric: 'Heart Rate',     score: 91, fullMark: 100 },
  { metric: 'Weight / BMI',   score: 74, fullMark: 100 },
  { metric: 'Blood Glucose',  score: 78, fullMark: 100 },
  { metric: 'O₂ Saturation',  score: 96, fullMark: 100 },
  { metric: 'Temperature',    score: 94, fullMark: 100 },
];
const RECENT_READINGS = [
  { date: 'Dec 28, 2024', bp: '114/72', hr: '68 bpm', temp: '36.8°C', spo2: '98%', glucose: '94 mg/dL',  status: 'normal'   },
  { date: 'Dec 14, 2024', bp: '116/74', hr: '70 bpm', temp: '37.0°C', spo2: '97%', glucose: '100 mg/dL', status: 'normal'   },
  { date: 'Nov 30, 2024', bp: '118/76', hr: '72 bpm', temp: '36.9°C', spo2: '98%', glucose: '105 mg/dL', status: 'normal'   },
  { date: 'Nov 15, 2024', bp: '121/77', hr: '74 bpm', temp: '37.2°C', spo2: '96%', glucose: '112 mg/dL', status: 'elevated' },
  { date: 'Oct 31, 2024', bp: '126/81', hr: '77 bpm', temp: '37.4°C', spo2: '97%', glucose: '118 mg/dL', status: 'elevated' },
];

const RANGES = [{ label: '3M', count: 3 }, { label: '6M', count: 6 }, { label: '1Y', count: 12 }];
type DemoTab = { key: keyof typeof infoCards; icon: JSX.Element; label: string };
const tabs: DemoTab[] = [
  { key: 'video',        icon: <Video size={16} />,       label: 'Video consultation' },
  { key: 'booking',      icon: <Calendar size={16} />,    label: 'Book appointment' },
  { key: 'doctors',      icon: <Stethoscope size={16} />, label: 'Find doctors' },
  { key: 'prescription', icon: <FileText size={16} />,    label: 'E-prescription' },
];

const infoCards = {
  video:        { label: 'Feature highlight', title: 'HD video calls',            desc: 'Crystal-clear, encrypted video with noise cancellation, screen sharing and in-call annotation tools.' },
  booking:      { label: 'Smart scheduling',  title: 'Book in seconds',           desc: 'See real-time slot availability, choose visit type and get instant confirmation — no phone calls.' },
  doctors:      { label: 'Doctor search',     title: 'Find the right specialist', desc: 'Browse 10,000+ verified doctors filtered by specialty, rating, language and live availability.' },
  prescription: { label: 'E-prescription',    title: 'Digital prescriptions',     desc: 'Legally valid e-prescriptions with drug-interaction checks sent directly to your chosen pharmacy.' },
};

const barTitles = {
  video:        'HealthNexus — Video Consultation',
  booking:      'HealthNexus — Appointment Booking',
  doctors:      'HealthNexus — Find Doctors',
  prescription: 'HealthNexus — E-Prescription',
};

const demoDoctors = [
  { img: 'https://i.pravatar.cc/100?img=10', name: 'Dr. Michael Chen',  spec: 'Cardiologist',    rating: '4.8', exp: 15, lang: 'EN, ZH', slots: 3 },
  { img: 'https://i.pravatar.cc/100?img=11', name: 'Dr. Emily Brown',   spec: 'Heart specialist', rating: '4.7', exp: 20, lang: 'EN',     slots: 1 },
  { img: 'https://i.pravatar.cc/100?img=13', name: 'Dr. James Wilson',  spec: 'Cardiac surgeon',  rating: '4.6', exp: 25, lang: 'EN, ES', slots: 5 },
];

const calDays    = [20, 21, 22, 23, 24, 25, 26];
const timeSlots  = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
const filterTags = ['Cardiologist', 'Near me', 'Available today', '4+ rating'];

const pill = {
  purple: { bg: '#EEEDFE', color: '#534AB7', border: '#AFA9EC' },
  teal:   { bg: '#E1F5EE', color: '#0F6E56', border: '#5DCAA5' },
  amber:  { bg: '#FAEEDA', color: '#854F0B', border: '#EF9F27' },
  pink:   { bg: '#FBEAF0', color: '#993556', border: '#ED93B1' },
  blue:   { bg: '#E6F1FB', color: '#185FA5', border: '#85B7EB' },
};

/* ─── Shared Tooltip ─── */
const ChartTooltip = ({ active, payload, label, unit = '' }: { active?: any; payload?: any; label?: any; unit?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0',
    }}>
      <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
      {payload.map((p: { color?: string; name?: string; value?: string | number }, i: number) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>{p.value}{unit}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Modal Chart Card ─── */
const ModalChartCard = ({ grad, eyebrow, title, subtitle, children }: { grad: string; eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) => (
  <div style={{
    background: '#fff', borderRadius: 20, overflow: 'hidden',
    border: '1px solid rgba(102,126,234,.1)',
    boxShadow: '0 4px 24px rgba(0,0,0,.08)',
  }}>
    <div style={{ background: grad, padding: '18px 20px 14px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)', color: '#fff', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 50, marginBottom: 10 }}>{eyebrow}</div>
      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 5px', letterSpacing: '-0.3px' }}>{title}</h4>
      <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '0.72rem', margin: 0, lineHeight: 1.5 }}>{subtitle}</p>
    </div>
    <div style={{ padding: '16px 18px' }}>{children}</div>
  </div>
);

/* ─── Vitals Grid Card ─── */
type VitalCardProps = {
  name: string; val: string | number; unit?: string; range?: string;
  status?: string; color?: string; bg?: string; border?: string; bar?: number;
};
const VitalCard: React.FC<VitalCardProps> = ({ name, val, unit = '', range = '', status = '', color = '#68d391', bg = 'rgba(104,211,145,.12)', border = 'rgba(0,0,0,0.06)', bar = 0 }) => (
  <div style={{ background: '#fff', border: `1px solid ${border}`, borderRadius: 14, padding: '14px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color, borderRadius: '14px 14px 0 0' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9a9790' }}>{name}</div>
      <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: bg, color }}>{status}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
      <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a202c' }}>{val}</span>
      <span style={{ fontSize: '0.72rem', color: '#718096' }}>{unit}</span>
    </div>
    <div style={{ fontSize: '0.63rem', color: '#a0aec0', marginBottom: 7 }}>Range: {range}</div>
    <div style={{ background: '#edf2f7', borderRadius: 4, height: 4, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(bar, 100)}%`, height: '100%', background: color, borderRadius: 4 }} />
    </div>
  </div>
);

/* ══════════════════════════════════════════════
  HEALTH CHARTS MODAL
══════════════════════════════════════════════ */
interface HealthChartsModalProps { isOpen: boolean; onClose: () => void }
const HealthChartsModal: React.FC<HealthChartsModalProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>('analytics');
  const [timeRange, setTimeRange] = useState<number>(12);
  const [visible, setVisible] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) { setTimeout(() => setVisible(true), 20); document.body.style.overflow = 'hidden'; }
    else { setVisible(false); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trim = <T,>(data: T[]) => data.slice(-timeRange);

  const TABS = [
    { id: 'analytics', label: '📊 Analytics' },
    { id: 'vitals',    label: '❤️ Vitals'    },
    { id: 'history',   label: '🗂 History'    },
  ];

  const VITALS = [
    { name: 'Heart Rate',     val: '68',     unit: 'bpm',   range: '60–100',        status: 'Normal',     color: T.red,    bg: T.redL,    border: T.redBorder,    bar: 60 },
    { name: 'Blood Pressure', val: '114/72', unit: 'mmHg',  range: '<140/90',       status: 'Optimal',    color: T.blue,   bg: T.blueL,   border: T.blueBorder,   bar: 75 },
    { name: 'Temperature',    val: '36.8',   unit: '°C',    range: '36.5–37.5',     status: 'Normal',     color: T.amber,  bg: T.amberL,  border: T.amberBorder,  bar: 80 },
    { name: 'O₂ Saturation',  val: '98',     unit: '%',     range: '>95',           status: 'Normal',     color: T.teal,   bg: T.tealL,   border: T.tealBorder,   bar: 98 },
    { name: 'Resp. Rate',     val: '15',     unit: '/min',  range: '12–20',         status: 'Normal',     color: T.purple, bg: T.purpleL, border: T.purpleBorder, bar: 55 },
    { name: 'Weight',         val: '77.1',   unit: 'kg',    range: 'BMI 18.5–24.9', status: 'Overweight', color: T.pink,   bg: T.pinkL,   border: T.pinkBorder,   bar: 70 },
    { name: 'Blood Glucose',  val: '94',     unit: 'mg/dL', range: '70–130',        status: 'Normal',     color: T.amber,  bg: T.amberL,  border: T.amberBorder,  bar: 40 },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,12,20,.65)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '8px' : '16px',
        opacity: visible ? 1 : 0, transition: 'opacity .25s ease',
      }}
    >
      <div style={{
        background: '#fafbfc', borderRadius: isMobile ? 20 : 28, width: '100%', maxWidth: 1060,
        maxHeight: 'calc(100vh - 16px)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.15)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(.97)',
        transition: 'transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease',
      }}>

        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
          padding: isMobile ? '14px 16px 12px' : '22px 28px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14, minWidth: 0 }}>
            <div style={{
              width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: '50%',
              background: 'rgba(255,255,255,.2)', border: '2px solid rgba(255,255,255,.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMobile ? '0.8rem' : '0.95rem', fontWeight: 800, color: '#fff', flexShrink: 0,
            }}>AP</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Test Patient</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,.75)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>
                {isMobile ? 'PT-20241028 · 34 yrs · Male' : 'Patient ID: PT-20241028 · 34 yrs · Male · Dr. Nilmini Fernando'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14, flexShrink: 0 }}>
            {!isMobile && (
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 50 }}>Health Dashboard</div>
            )}
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{
          padding: isMobile ? '10px 12px 0' : '14px 28px 0',
          background: '#fff', borderBottom: '1px solid rgba(102,126,234,.1)',
          display: 'flex', gap: isMobile ? 2 : 4, flexShrink: 0,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: isMobile ? '7px 12px' : '8px 20px', borderRadius: '10px 10px 0 0', border: 'none',
              fontSize: isMobile ? '0.72rem' : '0.78rem', fontWeight: 600, cursor: 'pointer',
              background: activeTab === t.id ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'transparent',
              color: activeTab === t.id ? '#fff' : '#718096',
              borderBottom: activeTab === t.id ? 'none' : '2px solid transparent',
              transition: 'all .2s', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '24px 28px 28px' }}>

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {[
                  { value: '114/72', label: 'BP',           color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
                  { value: '68 bpm', label: 'Heart Rate',   color: T.red,    bg: T.redL,    border: T.redBorder    },
                  { value: '77.1 kg',label: 'Weight',       color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
                  { value: '94',     label: 'Glucose',      color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
                  { value: '85/100', label: 'Health Score', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
                ].map(m => (
                  <div key={m.label} style={{ flex: '1 1 60px', background: m.bg, border: `1px solid ${m.border}`, borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                    <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: 3 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#9a9790', fontWeight: 600, marginRight: 4 }}>Range:</span>
                {([['3M', 3], ['6M', 6], ['1Y', 12]] as const).map(([l, v]) => (
                  <button key={l} onClick={() => setTimeRange(v)} style={{
                    padding: '5px 14px', borderRadius: 8,
                    border: `1px solid ${timeRange === v ? T.blue : '#e2e8f0'}`,
                    background: timeRange === v ? T.blueL : '#fff',
                    color: timeRange === v ? T.blue : '#718096',
                    fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit',
                  }}>{l}</button>
                ))}
              </div>

              <ModalChartCard grad={T.gradBlue} eyebrow="HealthNexus · Vitals" title="Blood Pressure Trend" subtitle="Avg 121/77 mmHg · 10 Normal / 2 Elevated readings · Improving ↓">
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
                  <ComposedChart data={trim(BP_DATA)} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mSysGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={T.red} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={T.red} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
                    <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} />
                    <YAxis tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} domain={[60, 160]} />
                    <Tooltip content={<ChartTooltip unit=" mmHg" />} />
                    <Legend wrapperStyle={{ paddingTop: 12, fontSize: 11, color: '#718096' }} />
                    <ReferenceLine y={120} stroke={T.amber} strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'Pre-hyp', fill: T.amber, fontSize: 10, position: 'insideTopRight' }} />
                    <ReferenceLine y={140} stroke={T.red}   strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'HTN',     fill: T.red,   fontSize: 10, position: 'insideTopRight' }} />
                    <Area type="monotone" dataKey="systolic"  fill="url(#mSysGrad)" stroke="none" />
                    <Line type="monotone" dataKey="systolic"  stroke={T.red}  strokeWidth={2.5} dot={{ fill: T.red,  r: 3.5, strokeWidth: 0 }} name="Systolic"  />
                    <Line type="monotone" dataKey="diastolic" stroke={T.blue} strokeWidth={2.5} dot={{ fill: T.blue, r: 3.5, strokeWidth: 0 }} name="Diastolic" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ModalChartCard>

              {/* Weight & Glucose — stacked on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, margin: '16px 0' }}>
                <ModalChartCard grad={T.gradTeal} eyebrow="HealthNexus · Vitals" title="Weight & BMI" subtitle="77.1 kg · BMI 25.1 · Down 7.1 kg · Trending ↓">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
                    <ComposedChart data={trim(ALL_WEIGHT_DATA)} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="mWGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={T.teal} stopOpacity={0.18} />
                          <stop offset="95%" stopColor={T.teal} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
                      <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" tickLine={false} />
                      <YAxis yAxisId="left"  tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" tickLine={false} domain={[70, 90]} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" tickLine={false} domain={[22, 30]} />
                      <Tooltip content={({ active, payload, label }) => <ChartTooltip active={active} payload={payload} label={label} />} />
                      <Legend wrapperStyle={{ paddingTop: 10, fontSize: 10, color: '#718096' }} />
                      <ReferenceLine yAxisId="right" y={24.9} stroke={T.teal} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'BMI max', fill: T.teal, fontSize: 9, position: 'insideTopRight' }} />
                      <Area yAxisId="left" type="monotone" dataKey="value" fill="url(#mWGrad)" stroke="none" />
                      <Line yAxisId="left"  type="monotone" dataKey="value" stroke={T.teal}  strokeWidth={2.5} dot={{ fill: T.teal,  r: 3, strokeWidth: 0 }} name="Weight (kg)" />
                      <Line yAxisId="right" type="monotone" dataKey="bmi"   stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 3, strokeWidth: 0 }} strokeDasharray="5 5" name="BMI" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ModalChartCard>

                <ModalChartCard grad={T.gradAmber} eyebrow="HealthNexus · Vitals" title="Blood Glucose" subtitle="Avg 104 mg/dL · Target 70–130 mg/dL · Improving ↓">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
                    <ComposedChart data={trim(ALL_GLUCOSE_DATA)} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="mGGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={T.purple} stopOpacity={0.22} />
                          <stop offset="95%" stopColor={T.purple} stopOpacity={0.04} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
                      <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" tickLine={false} />
                      <YAxis tick={{ fill: '#a0aec0', fontSize: 10 }} stroke="#e2e8f0" tickLine={false} domain={[60, 160]} />
                      <Tooltip content={({ active, payload, label }) => <ChartTooltip active={active} payload={payload} label={label} unit=" mg/dL" />} />
                      <Legend wrapperStyle={{ paddingTop: 10, fontSize: 10, color: '#718096' }} />
                      <ReferenceLine y={130} stroke={T.teal} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Target max', fill: T.teal, fontSize: 9, position: 'insideTopRight' }} />
                      <ReferenceLine y={180} stroke={T.red}  strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'High',       fill: T.red,  fontSize: 9, position: 'insideTopRight' }} />
                      <Bar  dataKey="value" fill="url(#mGGrad)" radius={[5,5,0,0]} barSize={20} stroke="rgba(107,63,160,.4)" strokeWidth={1} name="Glucose (mg/dL)" />
                      <Line type="monotone" dataKey="value" stroke={T.purple} strokeWidth={2} dot={false} name="Trend" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ModalChartCard>
              </div>

              <ModalChartCard grad={T.gradPurple} eyebrow="HealthNexus · Vitals" title="Heart Rate Monitoring" subtitle="Avg 74 bpm · Range 68–82 bpm · Resting heart rate improving">
                <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
                  <ComposedChart data={trim(HR_DATA)} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mHRGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={T.pink} stopOpacity={0.2}  />
                        <stop offset="95%" stopColor={T.pink} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
                    <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} />
                    <YAxis tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} domain={[50, 100]} />
                    <Tooltip content={({ active, payload, label }) => <ChartTooltip active={active} payload={payload} label={label} unit=" bpm" />} />
                    <ReferenceLine y={60}  stroke={T.teal}  strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Min', fill: T.teal,  fontSize: 10, position: 'insideTopRight' }} />
                    <ReferenceLine y={100} stroke={T.amber} strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'Max', fill: T.amber, fontSize: 10, position: 'insideTopRight' }} />
                    <Area type="monotone" dataKey="value" fill="url(#mHRGrad)" stroke="none" />
                    <Line type="monotone" dataKey="value" stroke={T.pink} strokeWidth={2.5} dot={{ fill: T.pink, r: 3.5, strokeWidth: 0 }} name="Heart Rate (bpm)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ModalChartCard>

              <div style={{ marginTop: 16 }}>
                <ModalChartCard grad={T.gradBlue} eyebrow="HealthNexus · Score" title="Overall Health Radar" subtitle="Composite score across 6 vital metrics — Dec 2024">
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={{ flex: isMobile ? 'none' : '0 0 280px', width: isMobile ? '100%' : 'auto' }}>
                      <ResponsiveContainer width="100%" height={isMobile ? 200 : 260}>
                        <RadarChart data={RADAR_DATA}>
                          <PolarGrid stroke="rgba(0,0,0,.08)" />
                          <PolarAngleAxis  dataKey="metric" tick={{ fill: '#718096', fontSize: isMobile ? 9 : 11 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#a0aec0', fontSize: 10 }} />
                          <Radar name="Score" dataKey="score" stroke={T.blue} fill={T.blue} fillOpacity={0.2} dot={{ fill: T.blue, r: 4 }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ flex: 1, minWidth: 180, width: isMobile ? '100%' : 'auto' }}>
                      <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 12px' }}>Metric Breakdown</p>
                      {RADAR_DATA.map(d => (
                        <div key={d.metric} style={{ marginBottom: 13 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.76rem' }}>
                            <span style={{ color: '#718096' }}>{d.metric}</span>
                            <span style={{ fontWeight: 700, color: '#1a202c' }}>{d.score}</span>
                          </div>
                          <div style={{ background: '#edf2f7', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                            <div style={{ height: '100%', borderRadius: 4, width: `${d.score}%`, background: d.score >= 90 ? T.teal : d.score >= 75 ? T.blue : T.amber, transition: 'width .8s ease' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalChartCard>
              </div>
            </div>
          )}

          {/* VITALS TAB */}
          {activeTab === 'vitals' && (
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 14px' }}>Latest Vital Readings</p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit,minmax(170px,1fr))', gap: 10, marginBottom: 22 }}>
                {VITALS.map(v => <VitalCard key={v.name} {...v} />)}
              </div>

              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 12px' }}>Health Insights</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                {[
                  { type: 'teal',  icon: '✅', title: 'All key vitals within normal range',   body: 'Blood pressure, heart rate, temperature and oxygen saturation are all within healthy limits.' },
                  { type: 'amber', icon: '⚠️', title: 'BMI slightly elevated at 25.1',         body: "Just above the optimal 18.5–24.9 range. Continue your weight management plan — you're trending in the right direction." },
                  { type: 'teal',  icon: '📉', title: 'Excellent progress this year',          body: 'Reduced weight by 7.1 kg, lowered resting heart rate by 10 bpm, and improved blood glucose by 14 mg/dL.' },
                ].map((ins, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 15px', borderRadius: 12, background: ins.type === 'teal' ? T.tealL : T.amberL, border: `1px solid ${ins.type === 'teal' ? T.tealBorder : T.amberBorder}`, borderLeft: `3px solid ${ins.type === 'teal' ? T.teal : T.amber}` }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{ins.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>{ins.title}</div>
                      <div style={{ fontSize: '0.73rem', color: '#718096', lineHeight: 1.5 }}>{ins.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              <ModalChartCard grad={T.gradBlue} eyebrow="HealthNexus · Score" title="Overall Health Radar" subtitle="Composite score across 6 vital metrics — Dec 2024">
                {RADAR_DATA.map(d => (
                  <div key={d.metric} style={{ marginBottom: 13 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.76rem' }}>
                      <span style={{ color: '#718096' }}>{d.metric}</span>
                      <span style={{ fontWeight: 700, color: '#1a202c' }}>{d.score}</span>
                    </div>
                    <div style={{ background: '#edf2f7', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 4, width: `${d.score}%`, background: d.score >= 90 ? T.teal : d.score >= 75 ? T.blue : T.amber, transition: 'width .8s ease' }} />
                    </div>
                  </div>
                ))}
              </ModalChartCard>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(102,126,234,.12)', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
                <div style={{ background: T.gradBlue, padding: '16px 18px 12px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
                  <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)', color: '#fff', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 50, marginBottom: 10 }}>HealthNexus · History</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 5px' }}>Vital Signs History</h4>
                  <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '0.72rem', margin: 0 }}>All recorded readings · Recent visits</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? 12 : 13, minWidth: isMobile ? 520 : 'auto' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #edf2f7' }}>
                        {['Date','Blood Pressure','Heart Rate','Temperature','SpO₂','Blood Glucose','Status'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '9px 10px', color: '#9a9790', fontWeight: 700, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_READINGS.map((r, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f0f4f8', background: i % 2 === 0 ? '#fafbfc' : '#fff' }}>
                          <td style={{ padding: '10px 10px', fontWeight: 600, color: '#4a5568', fontSize: '0.73rem', whiteSpace: 'nowrap' }}>{r.date}</td>
                          <td style={{ padding: '10px 10px', color: '#2d3748', fontSize: '0.73rem' }}>{r.bp}</td>
                          <td style={{ padding: '10px 10px', color: '#2d3748', fontSize: '0.73rem' }}>{r.hr}</td>
                          <td style={{ padding: '10px 10px', color: '#2d3748', fontSize: '0.73rem' }}>{r.temp}</td>
                          <td style={{ padding: '10px 10px', color: '#2d3748', fontSize: '0.73rem' }}>{r.spo2}</td>
                          <td style={{ padding: '10px 10px', color: '#2d3748', fontSize: '0.73rem' }}>{r.glucose}</td>
                          <td style={{ padding: '10px 10px' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '3px 9px', borderRadius: 50, background: r.status === 'normal' ? T.tealL : T.amberL, color: r.status === 'normal' ? T.teal : T.amber }}>
                              {r.status === 'normal' ? '✓ Normal' : '⚠ Elevated'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: '14px 18px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, background: '#fafbfc' }}>
                  {[{ label: 'Total Readings', val: '5' }, { label: 'Normal', val: '3 (60%)' }, { label: 'Elevated', val: '2 (40%)' }, { label: 'Critical', val: '0 (0%)' }].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#9a9790', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a202c' }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: isMobile ? '10px 14px' : '14px 28px', background: '#fff',
          borderTop: '1px solid rgba(102,126,234,.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0, flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(isMobile ? ['HIPAA', 'Secure'] : ['HIPAA', 'AI-Powered', 'Real-Time', 'Secure']).map(t => (
              <span key={t} style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '3px 10px', borderRadius: 50, background: '#f0f4f8', color: '#4a5568', border: '1px solid #e2e8f0' }}>{t}</span>
            ))}
          </div>
          <button onClick={onClose} style={{ padding: isMobile ? '8px 18px' : '9px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#667eea,#764ba2)', color: '#fff', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(102,126,234,.35)' }}>
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   INTERACTIVE DEMO MODAL
══════════════════════════════════════════════ */
const InteractiveDemoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) { setTimeout(() => setVisible(true), 20); document.body.style.overflow = 'hidden'; }
    else { setVisible(false); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,12,20,.65)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '8px' : '16px',
        opacity: visible ? 1 : 0, transition: 'opacity .25s ease',
      }}
    >
      <div style={{
        background: '#fafbfc', borderRadius: isMobile ? 20 : 28, width: '100%', maxWidth: 960,
        maxHeight: 'calc(100vh - 16px)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.15)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(.97)',
        transition: 'transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease',
      }}>
        <div style={{
          background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
          padding: isMobile ? '14px 16px 12px' : '20px 28px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', marginBottom: 4 }}>Interactive Preview</div>
            <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 800, color: '#fff' }}>Try Every Feature — Live</div>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '12px' : '24px 28px 28px' }}>
          <LiveDemoInteractive />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   CHART COMPONENTS
══════════════════════════════════════════════ */
const GlucoseTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color?: string; name?: string; value?: number | string }>; label?: string | number }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0' }}>
      <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
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
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 4px' }}>Sample Chart — Weight & BMI</p>
        <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>77.1 kg · BMI 25.1 · Down 7.1 kg · Trending ↓</p>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {RANGES.map(r => (
          <button key={r.label} onClick={() => setActiveRange(r.count)} style={{ padding: '4px 13px', borderRadius: 8, border: `1px solid ${activeRange === r.count ? '#667eea' : '#e2e8f0'}`, background: activeRange === r.count ? 'rgba(102,126,234,.1)' : '#fff', color: activeRange === r.count ? '#667eea' : '#718096', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit' }}>{r.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: T.teal, display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', color: '#718096', fontWeight: 600 }}>Weight (kg)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 18, height: 2, background: T.amber, display: 'inline-block', borderRadius: 1 }} />
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
              <div style={{ background: 'rgba(26,32,44,.95)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#e2e8f0' }}>
                <div style={{ marginBottom: 6, color: '#a0aec0', fontWeight: 600 }}>{label}</div>
                {payload.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                    <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{p.value} {p.name === 'BMI' ? '' : 'kg'}</span>
                  </div>
                ))}
              </div>
            );
          }} />
          <ReferenceLine yAxisId="right" y={24.9} stroke={T.teal} strokeDasharray="5 4" strokeOpacity={0.7} label={{ value: 'BMI max', fill: T.teal, fontSize: 10, position: 'insideTopRight' }} />
          <Area yAxisId="left" type="monotone" dataKey="value" fill="url(#weightGrad)" stroke="none" />
          <Line yAxisId="left"  type="monotone" dataKey="value" stroke={T.teal}  strokeWidth={2} dot={{ fill: T.teal,  r: 3, strokeWidth: 0 }} name="Weight (kg)" />
          <Line yAxisId="right" type="monotone" dataKey="bmi"   stroke={T.amber} strokeWidth={2} dot={{ fill: T.amber, r: 3, strokeWidth: 0 }} strokeDasharray="5 5" name="BMI" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const GlucosePreviewChart = ({ onViewAll }: { onViewAll?: () => void }) => {
  const [activeRange, setActiveRange] = useState(12);
  const data = ALL_GLUCOSE_DATA.slice(-activeRange);
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 4px' }}>Sample Chart — Blood Glucose</p>
          <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>Avg 104 mg/dL · Target 70–130 mg/dL · Improving ↓</p>
        </div>
        <button
          onClick={onViewAll}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 10, border: '1.5px solid #667eea', background: 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))', color: '#667eea', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(102,126,234,.16),rgba(118,75,162,.16))'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          View all charts
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {RANGES.map(r => (
          <button key={r.label} onClick={() => setActiveRange(r.count)} style={{ padding: '4px 13px', borderRadius: 8, border: `1px solid ${activeRange === r.count ? '#667eea' : '#e2e8f0'}`, background: activeRange === r.count ? 'rgba(102,126,234,.1)' : '#fff', color: activeRange === r.count ? '#667eea' : '#718096', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit' }}>{r.label}</button>
        ))}
      </div>
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
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={T.purple} stopOpacity={0.22} />
              <stop offset="95%" stopColor={T.purple} stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
          <XAxis dataKey="date" tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} />
          <YAxis tick={{ fill: '#a0aec0', fontSize: 11 }} stroke="#e2e8f0" tickLine={false} domain={[60, 160]} />
          <Tooltip content={<GlucoseTooltip />} />
          <ReferenceLine y={130} stroke={T.teal} strokeDasharray="5 4" strokeOpacity={0.7} label={{ value: 'Target max', fill: T.teal, fontSize: 10, position: 'insideTopRight' }} />
          <ReferenceLine y={180} stroke={T.red}  strokeDasharray="5 4" strokeOpacity={0.6} label={{ value: 'High',       fill: T.red,  fontSize: 10, position: 'insideTopRight' }} />
          <Bar  dataKey="value" fill="url(#glucoseGrad)" stroke="rgba(107,63,160,.4)" strokeWidth={1} radius={[6,6,0,0]} barSize={20} name="Glucose (mg/dL)" />
          <Line type="monotone" dataKey="value" stroke={T.purple} strokeWidth={2} dot={false} name="Trend" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SHARED CARD SUB-COMPONENTS
══════════════════════════════════════════════ */
const MetricRow = ({ metrics }: { metrics: Array<{ value: string; label: string; color: string; bg: string; border: string }> }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
    {metrics.map((m) => (
      <div key={m.label} style={{ flex: '1 1 60px', background: m.bg, border: `1px solid ${m.border}`, borderRadius: '12px', padding: '10px 10px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
        <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: m.color, opacity: 0.75, marginTop: '3px' }}>{m.label}</div>
      </div>
    ))}
  </div>
);

const CapRow = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 12px', borderRadius: '10px', marginBottom: '6px', background: '#f7fafc', border: '1px solid #e2e8f0' }}>
    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1a202c', lineHeight: 1.4 }}>{title}</span>
  </div>
);

/* ══════════════════════════════════════════════
   DEMO PANEL COMPONENTS
══════════════════════════════════════════════ */
const VideoPanel = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, minHeight: 160 }}>
      {[
        { img: 'https://i.pravatar.cc/300?img=12', name: 'Dr. Sarah Johnson', sub: 'Cardiologist', badge: true  },
        { img: 'https://i.pravatar.cc/300?img=5',  name: 'You',              sub: 'Connected',    badge: false },
      ].map((p, i) => (
        <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#1a202c', minHeight: 120 }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{p.name}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.7)' }}>{p.sub}</span>
          </div>
          {p.badge && (
            <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.65)', borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#48bb78', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Wifi size={10} /> Excellent
            </div>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
      {[
        { icon: <MessageSquare size={13} />, label: 'Chat'   },
        { icon: <FileText size={13} />,      label: 'Notes'  },
        { icon: <Camera size={13} />,        label: 'Capture'},
        { icon: <Share2 size={13} />,        label: 'Share'  },
      ].map((t, i) => (
        <button key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '6px 10px', fontSize: 11, color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
      {[
        { icon: <Mic size={18} />,   label: 'Mute',    end: false },
        { icon: <Video size={18} />, label: 'Camera',  end: false },
        { icon: <Share2 size={18} />,label: 'Share',   end: false },
        { icon: <Phone size={18} />, label: 'End call',end: true  },
      ].map((c, i) => (
        <button key={i} aria-label={c.label} style={{ width: 44, height: 44, borderRadius: '50%', background: c.end ? '#ff4444' : '#fff', border: c.end ? 'none' : '1px solid #e5e7eb', color: c.end ? '#fff' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
          {c.icon}
        </button>
      ))}
    </div>
  </div>
);

const BookingPanel = () => {
  const [selDay,    setSelDay]    = useState(22);
  const [selSlot,   setSelSlot]   = useState('11:00 AM');
  const [visitType, setVisitType] = useState('video');
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {['video', 'in-person'].map(t => (
          <button key={t} onClick={() => setVisitType(t)} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: `1px solid ${visitType === t ? pill.purple.border : '#e5e7eb'}`, background: visitType === t ? pill.purple.bg : '#fff', color: visitType === t ? pill.purple.color : '#6b7280', fontSize: 12, fontWeight: visitType === t ? 700 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {t === 'video' ? <Video size={13} /> : <MapPin size={13} />}
            {t === 'video' ? 'Video visit' : 'In-person'}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a202c' }}>December 2024</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[<ChevronLeft size={16} />, <ChevronRight size={16} />].map((ic, i) => (
            <button key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>{ic}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 14 }}>
        {calDays.map(d => (
          <button key={d} onClick={() => setSelDay(d)} style={{ background: selDay === d ? pill.purple.bg : '#fff', border: `1px solid ${selDay === d ? pill.purple.border : '#e5e7eb'}`, borderRadius: 10, padding: '7px 2px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: selDay === d ? pill.purple.color : '#1a202c', display: 'block' }}>{d}</span>
            <small style={{ fontSize: 9, color: '#9ca3af' }}>4 slots</small>
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 8 }}>Available times</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginBottom: 14 }}>
        {timeSlots.map(t => (
          <button key={t} onClick={() => setSelSlot(t)} style={{ background: selSlot === t ? pill.purple.bg : '#fff', border: `1px solid ${selSlot === t ? pill.purple.border : '#e5e7eb'}`, borderRadius: 10, padding: 8, fontSize: 12, cursor: 'pointer', color: selSlot === t ? pill.purple.color : '#374151', fontWeight: selSlot === t ? 600 : 400 }}>{t}</button>
        ))}
      </div>
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: '10px 12px', marginBottom: 12, fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <CheckCircle size={14} style={{ color: '#0F6E56', flexShrink: 0, marginTop: 1 }} />
        <span>Dec {selDay} · {selSlot} · {visitType === 'video' ? 'Video consultation' : 'In-person visit'} with Dr. Sarah Johnson</span>
      </div>
      <button style={{ width: '100%', padding: '11px 0', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
        <CheckCircle size={16} /> Confirm appointment
      </button>
    </div>
  );
};

const DoctorsPanel = () => {
  const [activeTags, setActiveTags] = useState<string[]>(['Cardiologist']);
  const toggleTag = (tag: string) => setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '9px 14px', marginBottom: 10 }}>
        <Search size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
        <input type="text" placeholder="Search by specialty or doctor name" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#374151', width: '100%' }} />
        <Filter size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {filterTags.map(tag => {
          const on = activeTags.includes(tag);
          return (
            <button key={tag} onClick={() => toggleTag(tag)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, border: `1px solid ${on ? pill.purple.border : '#e5e7eb'}`, background: on ? pill.purple.bg : '#fff', color: on ? pill.purple.color : '#6b7280', cursor: 'pointer', fontWeight: on ? 600 : 400 }}>{tag}</button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {demoDoctors.map((doc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '10px 12px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <img src={doc.img} alt={doc.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{doc.spec}</div>
              <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#9ca3af', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} style={{ color: '#854F0B' }} fill="#854F0B" /> {doc.rating}</span>
                <span style={{ color: '#0F6E56', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> {doc.slots} slots
                </span>
              </div>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrescriptionPanel = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '2px dashed #e5e7eb', marginBottom: 14 }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#6366F1', lineHeight: 1, flexShrink: 0 }}>℞</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a202c' }}>Digital prescription</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Dr. Sarah Johnson · Dec 20, 2024</div>
      </div>
      <span style={{ ...pill.teal, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600, flexShrink: 0 }}>Verified ✓</span>
    </div>
    {[
      { name: 'Lisinopril', dose: '10 mg — once daily with food', supply: '30 days supply' },
      { name: 'Metformin',  dose: '500 mg — twice daily',         supply: '90 days supply' },
    ].map((med, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: pill.purple.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Pill size={16} style={{ color: pill.purple.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{med.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{med.dose}</div>
          <span style={{ ...pill.teal, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{med.supply}</span>
        </div>
        <Shield size={13} style={{ color: '#9ca3af', flexShrink: 0 }} />
      </div>
    ))}
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>Send to pharmacy</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
        <Building size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
        <select style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#374151', flex: 1 }}>
          <option>CVS Pharmacy — 2 miles</option>
          <option>Walgreens — 3 miles</option>
          <option>Rite Aid — 4 miles</option>
        </select>
      </div>
      <button style={{ width: '100%', padding: '11px 0', background: 'linear-gradient(135deg, #0F6E56, #10B981)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(15,110,86,.3)' }}>
        <Send size={15} /> Send prescription
      </button>
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   LIVE DEMO INTERACTIVE
══════════════════════════════════════════════ */
const LiveDemoInteractive = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<keyof typeof infoCards>('video');
  const info = infoCards[activeTab];

  const panels: Record<keyof typeof infoCards, JSX.Element> = {
    video:        <VideoPanel />,
    booking:      <BookingPanel />,
    doctors:      <DoctorsPanel />,
    prescription: <PrescriptionPanel />,
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb',
      boxShadow: '0 20px 60px rgba(0,0,0,.08)', overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
      minHeight: isMobile ? 'auto' : 520,
    }}>
      {/* Sidebar / Top nav on mobile */}
      <div style={{
        background: '#fafbff',
        borderRight: isMobile ? 'none' : '1px solid #e5e7eb',
        borderBottom: isMobile ? '1px solid #e5e7eb' : 'none',
        padding: isMobile ? '10px 12px' : '1.25rem 1rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'column',
        gap: isMobile ? '8px' : '1rem',
      }}>
        {!isMobile && (
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9ca3af' }}>Try our features</div>
        )}
        {/* Tab buttons */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          gap: isMobile ? 4 : 5,
          overflowX: isMobile ? 'auto' : 'unset',
          paddingBottom: isMobile ? 2 : 0,
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  width: isMobile ? 'auto' : '100%',
                  textAlign: 'left',
                  background: active ? pill.purple.bg : 'transparent',
                  border: `1px solid ${active ? pill.purple.border : '#e5e7eb'}`,
                  borderRadius: 10,
                  padding: isMobile ? '7px 12px' : '9px 12px',
                  fontSize: isMobile ? 12 : 13,
                  color: active ? pill.purple.color : '#6b7280',
                  fontWeight: active ? 700 : 400,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 7,
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all .18s',
                }}
              >
                <span style={{ color: active ? pill.purple.color : '#9ca3af' }}>{tab.icon}</span>
                {isMobile ? tab.label.split(' ')[0] : tab.label}
              </button>
            );
          })}
        </div>

        {/* Info card — only on desktop */}
        {!isMobile && (
          <div style={{ marginTop: 'auto', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '0.9rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 4 }}>{info.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>{info.title}</div>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{info.desc}</div>
          </div>
        )}
      </div>

      {/* Main panel */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: isMobile ? 420 : 'auto' }}>
        <div style={{ background: '#1e2533', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#ffbd2e', '#28ca42'].map((c, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />)}
          </div>
          <span style={{ fontSize: 11, color: '#9ca3af', flex: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{barTitles[activeTab]}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28ca42', display: 'block' }} />
            <span style={{ fontSize: 11, color: '#6b7280' }}>Secure</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem 1.25rem', background: '#f8f9fc', overflowY: 'auto' }} key={activeTab}>
          {panels[activeTab]}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   CATEGORIES DATA
══════════════════════════════════════════════ */
const CATEGORIES = [
  {
    key: 'appointment', label: 'Appointments',
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
      { icon: '⚡', title: 'Auto-refill reminders, one-tap reorder for chronic medications, and 90-day supply options.' },
      { icon: '📅', title: 'Real-time calendar sync — doctor availability updates live, no double-bookings.' },
      { icon: '🔔', title: 'Multi-channel reminders via SMS, email, and push notifications' },
      { icon: '🚨', title: 'Emergency priority booking with nearest facility finder' },
      { icon: '👥', title: 'Group educational workshops and therapy session booking' },
      { icon: '🔔', title: 'SMS, email, and push reminders at 24h, 2h, and 30 min before.' },
      { icon: '🏥', title: 'Choose visit type at booking — routes to clinic or initiates video call.' },
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
    key: 'consultation', label: 'Telemedicine',
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
    key: 'health', label: 'Health Records',
    eyebrow: 'HealthNexus · Feature 03',
    title: 'Comprehensive Health Management',
    subtitle: 'Your complete health picture always in sync — vitals, medications, lab results, and AI-driven predictive health alerts in one place.',
    grad: T.gradGreen,
    shadowColor: 'rgba(17,153,142,.35)',
    metrics: [
      { value: 'Live', label: 'Vital Sync',  color: T.teal,   bg: T.tealL,   border: T.tealBorder   },
      { value: 'OCR',  label: 'Doc Scan',    color: T.blue,   bg: T.blueL,   border: T.blueBorder   },
      { value: 'AI',   label: 'Insights',    color: T.amber,  bg: T.amberL,  border: T.amberBorder  },
      { value: 'Lab',  label: 'Integration', color: T.purple, bg: T.purpleL, border: T.purpleBorder },
    ],
    tagGroups: [
      { items: ['Blood Pressure', 'Glucose', 'Weight', 'Medication', 'Immunizations', 'Allergies', 'Medical Reports', 'Trend Charts'], color: T.teal, bg: T.tealL, border: T.tealBorder },
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
    key: 'payment', label: 'Payments',
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

/* ── Tab Button ── */
type TabButtonProps = { cat: (typeof CATEGORIES)[number]; isActive: boolean; onClick: () => void; isMobile: boolean };
const TabButton = ({ cat, isActive, onClick, isMobile }: TabButtonProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: isMobile ? '9px 14px' : '9px 20px',
        borderRadius: isMobile ? '10px' : '50px',
        border: 'none', cursor: 'pointer',
        fontSize: isMobile ? '0.75rem' : '0.8rem',
        fontWeight: 700, fontFamily: 'inherit',
        transition: 'all .2s',
        width: isMobile ? '100%' : 'auto',
        background: isActive ? cat.grad : hovered ? 'rgba(102,126,234,.08)' : 'transparent',
        color: isActive ? '#fff' : hovered ? '#4a5568' : '#718096',
        boxShadow: isActive ? `0 4px 14px ${cat.shadowColor}` : 'none',
      }}
    >{cat.label}</button>
  );
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const DetailedFeatures = () => {
  const isMobile = useIsMobile();
  const [activeKey, setActiveKey] = useState(CATEGORIES[2].key);
  const [modalOpen, setModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const cat = CATEGORIES.find(c => c.key === activeKey) ?? CATEGORIES[0];

  return (
    <section id="capabilities">
      <HealthChartsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <InteractiveDemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      <div style={{
        fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: '#fafbfc', color: '#1a202c',
      }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', padding: isMobile ? '48px 16px 32px' : '72px 24px 48px', background: '#fafbfc' }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))', border: '1px solid rgba(102,126,234,.2)', color: '#667eea', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 20px', borderRadius: '50px', marginBottom: '20px' }}>Platform Capabilities</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 800, color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 14px' }}>
            Comprehensive Healthcare{' '}
            <span style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Feature Suite</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#718096', maxWidth: isMobile ? '100%' : '520px', margin: '0 auto', lineHeight: 1.75 }}>
            Every tool your care journey needs — built for patients, doctors, and the ecosystem around them.
          </p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 24px 80px' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'center', marginBottom: isMobile ? '20px' : '32px' }}>
            <div style={{
              display: isMobile ? 'grid' : 'inline-flex',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : undefined,
              background: '#fff',
              border: '1px solid rgba(102,126,234,.14)',
              borderRadius: isMobile ? '16px' : '50px',
              padding: '5px', gap: '4px',
              boxShadow: '0 4px 20px rgba(0,0,0,.06)',
              width: isMobile ? '100%' : 'auto',
            }}>
              {CATEGORIES.map(c => (
                <TabButton key={c.key} cat={c} isActive={c.key === activeKey} onClick={() => setActiveKey(c.key)} isMobile={isMobile} />
              ))}
            </div>
          </div>

          {/* Feature card */}
          <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(102,126,234,.12)', boxShadow: '0 4px 20px rgba(0,0,0,.07)', display: 'flex', flexDirection: 'column' }}>

            {/* Card hero */}
            <div style={{ background: cat.grad, padding: isMobile ? '22px 18px 18px' : '32px 28px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-60px', right: '20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '50px', marginBottom: '12px' }}>{cat.eyebrow}</div>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', margin: '0 0 10px' }}>{cat.title}</h3>
              <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.8rem', lineHeight: 1.65, margin: 0, maxWidth: '500px' }}>{cat.subtitle}</p>
            </div>

            {/* Card body */}
            <div style={{ padding: isMobile ? '18px 16px' : '24px 28px', display: 'flex', flexDirection: 'column' }}>
              <MetricRow metrics={cat.metrics} />
              <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 18px' }} />

              {/* Tags */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>Key Inputs</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.tagGroups.flatMap((g, gi) =>
                    g.items.map(item => (
                      <span key={`${gi}-${item}`} style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, color: g.color, background: g.bg, border: `1px solid ${g.border}`, borderRadius: '7px', padding: '4px 9px' }}>{item}</span>
                    ))
                  )}
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(102,126,234,.15),transparent)', margin: '0 0 16px' }} />

              {/* Capabilities — 2 col on desktop, 1 col on mobile */}
              <div style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9790', margin: '0 0 8px' }}>Core Capabilities</p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '6px' }}>
                  {cat.capabilities.map(c => <CapRow key={c.title} icon={c.icon} title={c.title} />)}
                </div>
              </div>

              {/* Charts — stacked on mobile */}
              {cat.showChart && (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
                  <div><WeightBMIPreviewChart /></div>
                  <div><GlucosePreviewChart onViewAll={() => setModalOpen(true)} /></div>
                </div>
              )}

              {/* Demo button */}
              {cat.key === 'appointment' && (
                <div style={{ marginTop: 14, display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end' }}>
                  <button
                    onClick={() => setDemoModalOpen(true)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '11px 22px', borderRadius: 12,
                      border: '1.5px solid #667eea',
                      background: 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))',
                      color: '#667eea', fontSize: '0.78rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit',
                      width: isMobile ? '100%' : 'auto',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#667eea,#764ba2)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(102,126,234,.08),rgba(118,75,162,.08))'; e.currentTarget.style.color = '#667eea'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    View Interactive Demo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '8px' : '12px', marginTop: isMobile ? '16px' : '28px' }}>
            {cat.stats.map(s => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid rgba(102,126,234,.14)', borderRadius: '14px', padding: isMobile ? '12px 14px' : '14px 26px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a0aec0', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;