import { useState } from 'react';
import {
  Video, Calendar, Search, FileText, Wifi, MessageSquare, Camera, Share2,
  Mic, Phone, ChevronLeft, ChevronRight, CheckCircle, Star, Building,
  Send, Stethoscope, Shield, Pill, Clock, MapPin, Filter, Lock
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────
type TabKey = 'video' | 'booking' | 'doctors' | 'prescription';

// ─── Data ──────────────────────────────────────────────────────
const tabs = [
  { key: 'video' as TabKey,        icon: <Video size={16} />,       label: 'Video consultation' },
  { key: 'booking' as TabKey,      icon: <Calendar size={16} />,    label: 'Book appointment' },
  { key: 'doctors' as TabKey,      icon: <Stethoscope size={16} />, label: 'Find doctors' },
  { key: 'prescription' as TabKey, icon: <FileText size={16} />,    label: 'E-prescription' },
];

const infoCards = {
  video: {
    label: 'Feature highlight',
    title: 'HD video calls',
    desc: 'Crystal-clear, encrypted video with noise cancellation, screen sharing and in-call annotation tools.',
  },
  booking: {
    label: 'Smart scheduling',
    title: 'Book in seconds',
    desc: 'See real-time slot availability, choose visit type and get instant confirmation — no phone calls.',
  },
  doctors: {
    label: 'Doctor search',
    title: 'Find the right specialist',
    desc: 'Browse 10,000+ verified doctors filtered by specialty, rating, language and live availability.',
  },
  prescription: {
    label: 'E-prescription',
    title: 'Digital prescriptions',
    desc: 'Legally valid e-prescriptions with drug-interaction checks sent directly to your chosen pharmacy.',
  },
};

const barTitles = {
  video:        'HealthNexus — Video Consultation',
  booking:      'HealthNexus — Appointment Booking',
  doctors:      'HealthNexus — Find Doctors',
  prescription: 'HealthNexus — E-Prescription',
};

const doctors = [
  { img: 'https://i.pravatar.cc/100?img=10', name: 'Dr. Michael Chen',  spec: 'Cardiologist',    rating: '4.8', exp: 15, lang: 'EN, ZH', slots: 3 },
  { img: 'https://i.pravatar.cc/100?img=11', name: 'Dr. Emily Brown',   spec: 'Heart specialist', rating: '4.7', exp: 20, lang: 'EN', slots: 1 },
  { img: 'https://i.pravatar.cc/100?img=13', name: 'Dr. James Wilson',  spec: 'Cardiac surgeon',  rating: '4.6', exp: 25, lang: 'EN, ES', slots: 5 },
];

const calDays = [20, 21, 22, 23, 24, 25, 26];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
const filterTags = ['Cardiologist', 'Near me', 'Available today', '4+ rating'];

const pill = {
  purple: { bg: '#EEEDFE', color: '#534AB7', border: '#AFA9EC' },
  teal:   { bg: '#E1F5EE', color: '#0F6E56', border: '#5DCAA5' },
  amber:  { bg: '#FAEEDA', color: '#854F0B', border: '#EF9F27' },
  pink:   { bg: '#FBEAF0', color: '#993556', border: '#ED93B1' },
  blue:   { bg: '#E6F1FB', color: '#185FA5', border: '#85B7EB' },
};

// ─── Internal CSS ──────────────────────────────────────────────
const STYLES = `
.demo-root {
  font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #fafbfc;
  color: #1a202c;
  width: 100%;
}
.demo-root .hero {
  padding: 80px 48px 56px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #fafbfc;
}
.demo-root .hero-eye {
  display: inline-block;
  background: rgba(102,126,234,0.10);
  border: 1px solid rgba(102,126,234,0.25);
  color: #667eea;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 20px;
  border-radius: 50px;
  margin-bottom: 24px;
}
.demo-root .hero h1 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #1a202c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 18px;
}
.demo-root .hero h1 em {
  font-style: normal;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.demo-root .hero-sub {
  color: #718096;
  font-size: 1rem;
  max-width: 620px;
  margin: 0 auto 36px;
  line-height: 1.7;
}
.demo-root .stat-strip {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.demo-root .stat-cell {
  background: #fff;
  border: 1px solid rgba(102,126,234,0.15);
  border-radius: 16px;
  padding: 16px 28px;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.demo-root .stat-cell:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.10);
}
.demo-root .stat-v {
  font-size: 1.6rem;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
}
.demo-root .stat-l {
  font-size: 0.72rem;
  color: #718096;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 4px;
  text-transform: uppercase;
}
.demo-root .page { max-width: 1200px; margin: 0 auto; padding: 48px 24px 64px; }
.demo-root .section { margin-bottom: 8px; }
.demo-root .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(102,126,234,0.18), transparent); margin: 40px 0; }
.demo-root .section-hd { margin-bottom: 28px; }
.demo-root .eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #667eea; margin-bottom: 6px; }
.demo-root .section-hd h2 { font-size: clamp(1.4rem,2.5vw,2rem); font-weight: 800; color: #1a202c; letter-spacing: -0.5px; line-height: 1.2; }
.demo-root .section-hd h2 span { background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.demo-root .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 14px; }
.demo-root .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.demo-root .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.demo-root .card { background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border: 1px solid rgba(102,126,234,0.08); transition: box-shadow 0.25s ease, transform 0.25s ease; }
.demo-root .card:hover { box-shadow: 0 10px 15px rgba(0,0,0,0.1); transform: translateY(-2px); }
.demo-root .metric-card { border-radius: 16px; padding: 20px 18px; position: relative; overflow: hidden; border: 1px solid transparent; transition: transform 0.25s ease, box-shadow 0.25s ease; }
.demo-root .metric-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px rgba(0,0,0,0.15); }
.demo-root .mv { font-size: 1.9rem; font-weight: 800; line-height: 1; margin-bottom: 4px; }
.demo-root .ml { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.5px; opacity: 0.75; text-transform: uppercase; }
.demo-root .mc-teal { background: linear-gradient(135deg, rgba(13,122,95,0.08), rgba(13,122,95,0.15)); border-color: rgba(13,122,95,0.18); }
.demo-root .mc-teal .mv { color: #0d7a5f; } .demo-root .mc-teal .ml { color: #0d7a5f; }
.demo-root .mc-blue { background: linear-gradient(135deg, rgba(26,95,168,0.08), rgba(26,95,168,0.15)); border-color: rgba(26,95,168,0.18); }
.demo-root .mc-blue .mv { color: #1a5fa8; } .demo-root .mc-blue .ml { color: #1a5fa8; }
.demo-root .mc-amber { background: linear-gradient(135deg, rgba(184,94,12,0.08), rgba(184,94,12,0.15)); border-color: rgba(184,94,12,0.18); }
.demo-root .mc-amber .mv { color: #b85e0c; } .demo-root .mc-amber .ml { color: #b85e0c; }
.demo-root .mc-purple { background: linear-gradient(135deg, rgba(107,63,160,0.08), rgba(107,63,160,0.15)); border-color: rgba(107,63,160,0.18); }
.demo-root .mc-purple .mv { color: #6b3fa0; } .demo-root .mc-purple .ml { color: #6b3fa0; }
.demo-root .feature-row { display: flex; gap: 14px; padding: 18px 20px; border-radius: 16px; margin-bottom: 14px; background: #fff; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.25s ease; }
.demo-root .feature-row:hover { border-color: rgba(102,126,234,0.25); box-shadow: 0 4px 6px rgba(0,0,0,0.07); transform: translateY(-3px); }
.demo-root .feature-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
.demo-root .feature-title { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin-bottom: 5px; }
.demo-root .feature-desc { font-size: 0.75rem; color: #718096; line-height: 1.6; }
.demo-root .arch-row { display: flex; gap: 14px; margin-bottom: 16px; padding: 14px 16px; border-radius: 12px; background: #f7fafc; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.demo-root .arch-row:hover { background: rgba(102,126,234,0.05); border-color: rgba(102,126,234,0.2); }
.demo-root .arch-num { font-size: 0.65rem; font-weight: 800; color: #667eea; background: rgba(102,126,234,0.1); border-radius: 6px; padding: 4px 8px; height: fit-content; flex-shrink: 0; letter-spacing: 0.5px; }
.demo-root .arch-title { font-size: 0.85rem; font-weight: 700; color: #1a202c; margin-bottom: 4px; }
.demo-root .arch-desc { font-size: 0.75rem; color: #718096; line-height: 1.5; }
.demo-root .tag { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 50px; margin-right: 5px; }
.demo-root .tag-t { background: rgba(13,122,95,0.12); color: #0d7a5f; border: 1px solid rgba(13,122,95,0.2); }
.demo-root .tag-p { background: rgba(107,63,160,0.12); color: #6b3fa0; border: 1px solid rgba(107,63,160,0.2); }
.demo-root .tag-b { background: rgba(26,95,168,0.12); color: #1a5fa8; border: 1px solid rgba(26,95,168,0.2); }
.demo-root .tag-a { background: rgba(184,94,12,0.12); color: #b85e0c; border: 1px solid rgba(184,94,12,0.2); }
.demo-root .tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.demo-root .tech-item { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; font-weight: 600; color: #4a5568; padding: 8px 12px; border-radius: 10px; background: #f7fafc; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.demo-root .tech-item:hover { background: rgba(102,126,234,0.06); border-color: rgba(102,126,234,0.2); transform: translateY(-2px); }
.demo-root .tech-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.demo-root .progress-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.demo-root .progress-lbl { font-size: 0.75rem; font-weight: 600; color: #4a5568; min-width: 160px; flex-shrink: 0; }
.demo-root .progress-track { flex: 1; height: 8px; background: #edf2f7; border-radius: 4px; overflow: hidden; }
.demo-root .progress-fill { height: 100%; border-radius: 4px; }
.demo-root .progress-val { font-size: 0.75rem; font-weight: 700; min-width: 40px; text-align: right; flex-shrink: 0; }
.demo-root .legend { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 16px; }
.demo-root .legend-item { display: flex; align-items: center; gap: 7px; font-size: 0.78rem; color: #4a5568; font-weight: 500; }
.demo-root .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.demo-root .sub-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: #9a9790; margin-bottom: 10px; }
.demo-root .info-box { background: rgba(102,126,234,0.04); border: 1px solid rgba(102,126,234,0.15); border-radius: 14px; padding: 14px 16px; display: flex; gap: 12px; align-items: flex-start; }
.demo-root .info-box-icon { flex-shrink: 0; margin-top: 2px; color: #667eea; }
.demo-root .info-box-title { font-size: 0.83rem; font-weight: 700; color: #1a202c; margin-bottom: 3px; }
.demo-root .info-box-desc { font-size: 0.73rem; color: #718096; line-height: 1.5; }
.demo-root .timeline { position: relative; padding-left: 28px; }
.demo-root .timeline::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #667eea, #764ba2, rgba(118,75,162,0.1)); border-radius: 1px; }
.demo-root .timeline-item { position: relative; margin-bottom: 24px; }
.demo-root .timeline-dot { position: absolute; left: -23px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #667eea; border: 2px solid #fff; box-shadow: 0 0 0 2px rgba(102,126,234,0.3); }
.demo-root .timeline-title { font-size: 0.88rem; font-weight: 700; color: #1a202c; margin-bottom: 4px; }
.demo-root .timeline-desc { font-size: 0.75rem; color: #718096; line-height: 1.6; }
.demo-root .faq-item { border-bottom: 1px solid #e2e8f0; padding: 16px 0; }
.demo-root .faq-item:last-child { border-bottom: none; }
.demo-root .faq-q { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 10px; }
.demo-root .faq-a { font-size: 0.78rem; color: #718096; line-height: 1.6; margin-left: 28px; }
.demo-root .faq-num { min-width: 22px; height: 22px; border-radius: 50%; background: rgba(102,126,234,0.1); color: #667eea; font-size: 0.7rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.demo-root .sec-badge { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 50px; display: inline-flex; align-items: center; gap: 5px; }
.demo-root .compare-table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
.demo-root .compare-table thead tr { background: linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08)); }
.demo-root .compare-table th { padding: 14px 18px; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #4a5568; border-bottom: 1px solid #e2e8f0; }
.demo-root .compare-table td { padding: 13px 18px; border-bottom: 1px solid #f0f4f8; color: #4a5568; vertical-align: middle; }
.demo-root .compare-table tbody tr:hover td { background: rgba(102,126,234,0.04); }
.demo-root .compare-table tbody tr:last-child td { border-bottom: none; }
.demo-root .dn { font-weight: 700; color: #1a202c; }
.demo-root .check-yes { color: #0d7a5f; font-weight: 700; }
.demo-root .check-no { color: #9a9790; }
@media (max-width: 900px) {
  .demo-root .grid4 { grid-template-columns: repeat(2, 1fr); }
  .demo-root .grid3 { grid-template-columns: repeat(2, 1fr); }
  .demo-root .grid2 { grid-template-columns: 1fr; }
  .demo-root .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .demo-root .hero { padding: 48px 24px 40px; }
  .demo-root .progress-lbl { min-width: 110px; }
}
@media (max-width: 540px) {
  .demo-root .grid4 { grid-template-columns: repeat(2, 1fr); }
  .demo-root .grid3 { grid-template-columns: 1fr; }
  .demo-root .stat-strip { gap: 8px; }
  .demo-root .stat-cell { padding: 12px 16px; min-width: 90px; }
  .demo-root .stat-v { font-size: 1.3rem; }
  .demo-root .hero h1 { font-size: 1.7rem; }
  .demo-root .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .demo-root .page { padding: 32px 16px 48px; }
}
`;

// ─── Sub-components ───────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, highlight }: { eyebrow: string; title: string; highlight: string }) => (
  <div className="section-hd">
    <div className="eyebrow">{eyebrow}</div>
    <h2>{title} <span>{highlight}</span></h2>
  </div>
);

const Divider = () => <div className="divider" />;

const FeatureRow = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="feature-row">
    <div className="feature-icon">{icon}</div>
    <div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </div>
  </div>
);

const ProgressRow = ({ label, width, value, color }: { label: string; width: number; value: string; color: string }) => (
  <div className="progress-row">
    <span className="progress-lbl">{label}</span>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)` }} />
    </div>
    <span className="progress-val" style={{ color }}>{value}</span>
  </div>
);

// ─── Live Demo Panels ─────────────────────────────────────────

const VideoPanel = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
      {[
        { img: 'https://i.pravatar.cc/300?img=12', name: 'Dr. Sarah Johnson', sub: 'Cardiologist', badge: true },
        { img: 'https://i.pravatar.cc/300?img=5',  name: 'You',              sub: 'Connected',    badge: false },
      ].map((p, i) => (
        <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#1a202c' }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p.name}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>{p.sub}</span>
          </div>
          {p.badge && (
            <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.65)', borderRadius: 20, padding: '3px 8px', fontSize: 11, color: '#48bb78', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Wifi size={11} /> Excellent
            </div>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {[{ icon: <MessageSquare size={14} />, label: 'Chat' }, { icon: <FileText size={14} />, label: 'Notes' }, { icon: <Camera size={14} />, label: 'Capture' }, { icon: <Share2 size={14} />, label: 'Share screen' }].map((t, i) => (
        <button key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '7px 12px', fontSize: 12, color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
      {[{ icon: <Mic size={18} />, label: 'Mute', end: false }, { icon: <Video size={18} />, label: 'Camera', end: false }, { icon: <Share2 size={18} />, label: 'Share', end: false }, { icon: <Phone size={18} />, label: 'End call', end: true }].map((c, i) => (
        <button key={i} aria-label={c.label} style={{ width: 44, height: 44, borderRadius: '50%', background: c.end ? '#ff4444' : '#fff', border: c.end ? 'none' : '1px solid #e5e7eb', color: c.end ? '#fff' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
          {c.icon}
        </button>
      ))}
    </div>
  </div>
);

const BookingPanel = () => {
  const [selDay, setSelDay] = useState(22);
  const [selSlot, setSelSlot] = useState('11:00 AM');
  const [visitType, setVisitType] = useState<'video' | 'in-person'>('video');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {(['video', 'in-person'] as const).map(t => (
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 16 }}>
        {calDays.map(d => (
          <button key={d} onClick={() => setSelDay(d)} style={{ background: selDay === d ? pill.purple.bg : '#fff', border: `1px solid ${selDay === d ? pill.purple.border : '#e5e7eb'}`, borderRadius: 10, padding: '8px 4px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: selDay === d ? pill.purple.color : '#1a202c', display: 'block' }}>{d}</span>
            <small style={{ fontSize: 10, color: '#9ca3af' }}>4 slots</small>
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 8 }}>Available times</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
        {timeSlots.map(t => (
          <button key={t} onClick={() => setSelSlot(t)} style={{ background: selSlot === t ? pill.purple.bg : '#fff', border: `1px solid ${selSlot === t ? pill.purple.border : '#e5e7eb'}`, borderRadius: 10, padding: 9, fontSize: 12, cursor: 'pointer', color: selSlot === t ? pill.purple.color : '#374151', fontWeight: selSlot === t ? 600 : 400 }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 8 }}>
        <CheckCircle size={14} style={{ color: '#0F6E56' }} />
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
        <input type="text" placeholder="Search by specialty, condition or doctor name" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#374151', width: '100%' }} />
        <Filter size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {filterTags.map(tag => {
          const on = activeTags.includes(tag);
          return (
            <button key={tag} onClick={() => toggleTag(tag)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, border: `1px solid ${on ? pill.purple.border : '#e5e7eb'}`, background: on ? pill.purple.bg : '#fff', color: on ? pill.purple.color : '#6b7280', cursor: 'pointer', fontWeight: on ? 600 : 400 }}>
              {tag}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {doctors.map((doc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <img src={doc.img} alt={doc.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{doc.name}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 5 }}>{doc.spec}</div>
              <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#9ca3af', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} style={{ color: '#854F0B' }} fill="#854F0B" /> {doc.rating}/5</span>
                <span><MapPin size={11} style={{ verticalAlign: -1 }} /> {doc.exp} yrs</span>
                <span style={{ color: '#0F6E56', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> {doc.slots} slots
                </span>
              </div>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0, boxShadow: '0 2px 8px rgba(99,102,241,.3)' }}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrescriptionPanel = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '2px dashed #e5e7eb', marginBottom: 14 }}>
      <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#6366F1', lineHeight: 1 }}>℞</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a202c' }}>Digital prescription</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Dr. Sarah Johnson · Dec 20, 2024</div>
      </div>
      <span style={{ marginLeft: 'auto', ...pill.teal, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Verified ✓</span>
    </div>
    {[{ name: 'Lisinopril', dose: '10 mg — once daily with food', supply: '30 days supply' }, { name: 'Metformin', dose: '500 mg — twice daily', supply: '90 days supply' }].map((med, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, marginBottom: 8 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: pill.purple.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Pill size={18} style={{ color: pill.purple.color }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{med.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{med.dose}</div>
          <span style={{ ...pill.teal, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{med.supply}</span>
        </div>
        <Shield size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
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

// ─── Interactive Live Demo ────────────────────────────────────
const LiveDemoInteractive = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('video');
  const info = infoCards[activeTab];

  const panels: Record<TabKey, React.ReactNode> = {
    video: <VideoPanel />,
    booking: <BookingPanel />,
    doctors: <DoctorsPanel />,
    prescription: <PrescriptionPanel />,
  };

  return (
    <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb', boxShadow: '0 20px 60px rgba(0,0,0,.08)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 560 }}>
      {/* Sidebar */}
      <div style={{ background: '#fafbff', borderRight: '1px solid #e5e7eb', padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9ca3af' }}>Try our features</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tabs.map(tab => {
            const active = activeTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ width: '100%', textAlign: 'left', background: active ? pill.purple.bg : 'transparent', border: `1px solid ${active ? pill.purple.border : '#e5e7eb'}`, borderRadius: 12, padding: '10px 12px', fontSize: 13, color: active ? pill.purple.color : '#6b7280', fontWeight: active ? 800 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transform: active ? 'translateX(3px)' : 'none', transition: 'all .18s' }}>
                <span style={{ color: active ? pill.purple.color : '#9ca3af' }}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 'auto', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '1rem' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 4 }}>{info.label}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>{info.title}</div>
          <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{info.desc}</div>
        </div>
      </div>

      {/* Main panel */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1e2533', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57', '#ffbd2e', '#28ca42'].map((c, i) => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }} />)}
          </div>
          <span style={{ fontSize: 12, color: '#9ca3af', flex: 1, textAlign: 'center' }}>{barTitles[activeTab]}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28ca42', display: 'block' }} />
            <span style={{ fontSize: 11, color: '#6b7280' }}>Secure</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1.25rem 1.5rem', background: '#f8f9fc', overflowY: 'auto' }} key={activeTab}>
          {panels[activeTab]}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────
const LiveDemoPage = () => (
  <section id="live-demo-page" style={{ background: '#fafbfc' }}>
    <style>{STYLES}</style>
    <div className="demo-root">

      {/* Hero */}
      <div className="hero">
        <div className="hero-eye">HealthNexus · Live Platform Demo</div>
        <h1>Experience HealthNexus<br /><em>In Full Detail</em></h1>
        <p className="hero-sub">
          Explore every feature of our telemedicine platform — from HD video consultations and smart scheduling to AI-powered prescriptions and specialist discovery.
        </p>

      </div>

      <div className="page">

        {/* ── Live Interactive Demo ── */}
        <div className="section">
          <SectionHeader eyebrow="Interactive Preview" title="Try Every Feature" highlight="Live — No Sign-Up" />
          <LiveDemoInteractive />

          {/* Bottom stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: '2rem' }}>
            {[
              { icon: <Video size={18} />,      label: 'HD Video',      sub: 'Crystal-clear calls',    ...pill.purple },
              { icon: <Clock size={18} />,      label: '< 2 min',       sub: 'Avg booking time',       ...pill.amber },
              { icon: <Shield size={18} />,     label: '100% Secure',   sub: 'End-to-end encrypted',   ...pill.teal },
              { icon: <CheckCircle size={18} />, label: 'Instant Rx',   sub: 'Direct to pharmacy',     ...pill.pink },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Feature Breakdown ── */}
        <div className="section">
          <SectionHeader eyebrow="Feature Details" title="Four Core" highlight="Feature Modules" />
          <div className="grid2">
            <div>
              <p className="sub-label">Video consultation</p>
              <FeatureRow icon="🎥" title="HD video with adaptive bitrate" desc="Auto-adjusts quality based on your connection — even on 3G, calls stay smooth with intelligent compression." />
              <FeatureRow icon="🔇" title="AI noise cancellation" desc="Background noise (traffic, kids, pets) is filtered in real-time using a deep learning model trained on 50K audio samples." />
              <FeatureRow icon="🖥️" title="Screen & document sharing" desc="Share X-rays, lab reports, or annotate images directly in the call. No third-party tools required." />
              <FeatureRow icon="💬" title="In-call chat & clinical notes" desc="Type notes alongside the video session. Notes are auto-structured into SOAP format for EHR compatibility." />
            </div>
            <div>
              <p className="sub-label">Smart appointment booking</p>
              <FeatureRow icon="📅" title="Real-time calendar sync" desc="Doctor availability updates live. No double-bookings. Slots across timezones are displayed in your local time automatically." />
              <FeatureRow icon="🔔" title="Automated reminders & follow-ups" desc="SMS, email, and push reminders at 24h, 2h, and 30 min before. One-tap reschedule if needed." />
              <FeatureRow icon="📍" title="Video or in-person selection" desc="Choose visit type at booking. The system routes to the nearest clinic or initiates video infrastructure accordingly." />
              <FeatureRow icon="⚡" title="Instant confirmation" desc="Booking is confirmed in under 2 seconds with a calendar invite, map link (if in-person), and consultation prep checklist." />
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div className="grid2">
            <div>
              <p className="sub-label">Doctor discovery</p>
              <FeatureRow icon="🔍" title="50+ specialty filters" desc="Filter by specialty, condition, spoken language, gender preference, insurance network, rating, and live availability." />
              <FeatureRow icon="✅" title="Verified credentials" desc="Every doctor is licence-verified against national medical board registers before listing. Badges shown for board certification." />
              <FeatureRow icon="🌐" title="Multilingual consultations" desc="Language filter lets patients find doctors who speak their language. Currently 38 languages supported." />
              <FeatureRow icon="⭐" title="Transparent ratings & reviews" desc="Star ratings, wait times, and written reviews are collected from verified patients only — no anonymous submissions." />
            </div>
            <div>
              <p className="sub-label">E-prescription system</p>
              <FeatureRow icon="📄" title="Legally valid digital Rx" desc="Prescriptions are digitally signed with the doctor's DEA number and state licence, accepted at all major pharmacies." />
              <FeatureRow icon="⚠️" title="Drug interaction checker" desc="Real-time interaction analysis against a database of 180K+ drug interactions. Alerts flagged before issuing." />
              <FeatureRow icon="🏥" title="Direct pharmacy routing" desc="Send to any of 35,000+ partner pharmacies with real-time stock check. Estimated pickup time shown at confirmation." />
              <FeatureRow icon="📦" title="Refill management" desc="Auto-refill reminders, one-tap reorder for chronic medications, and 90-day supply options for maintenance drugs." />
            </div>
          </div>
        </div>


        <Divider />

        {/* ── Info Boxes + Security ── */}
        <div className="section">
          <SectionHeader eyebrow="Security & Privacy" title="How We Protect" highlight="Your Health Data" />
          <div className="grid2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'End-to-end encrypted video', desc: 'All video and audio streams are encrypted using DTLS-SRTP. Recordings (if enabled) are stored in AES-256 encrypted buckets accessible only to you and your doctor.' },
                { title: 'Zero-knowledge data model', desc: 'Your health records are encrypted client-side before transmission. HealthNexus servers store only encrypted blobs — we cannot read your records.' },
                { title: 'HIPAA & GDPR compliant', desc: 'Full Business Associate Agreement (BAA) available. Data residency options for EU patients. Independent audits performed annually.' },
                { title: 'Transparent access logs', desc: 'View exactly who accessed your records and when, directly from your account. Suspicious access triggers an instant alert.' },
              ].map((item, i) => (
                <div key={i} className="info-box">
                  <div className="info-box-icon"><Lock size={16} /></div>
                  <div>
                    <div className="info-box-title">{item.title}</div>
                    <div className="info-box-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="sub-label">Security certifications</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'HIPAA', sub: 'Certified', color: pill.teal },
                  { label: 'SOC 2 Type II', sub: 'Certified', color: pill.purple },
                  { label: 'ISO 27001', sub: 'In Progress', color: pill.amber },
                  { label: 'GDPR', sub: 'Compliant', color: pill.blue },
                ].map((c, i) => (
                  <div key={i} style={{ background: c.color.bg, border: `1px solid ${c.color.border}`, borderRadius: 14, padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: c.color.color, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: c.color.color, opacity: 0.8, fontWeight: 600 }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              <p className="sub-label">System reliability</p>
              {[
                { label: 'Video uptime (12 months)',  width: 99.9, value: '99.9%', color: '#0d7a5f' },
                { label: 'API response time p95',     width: 88,   value: '< 120ms', color: '#1a5fa8' },
                { label: 'Booking success rate',      width: 99.2, value: '99.2%', color: '#0d7a5f' },
                { label: 'Rx delivery success',       width: 98.7, value: '98.7%', color: '#6b3fa0' },
              ].map(r => (
                <ProgressRow key={r.label} label={r.label} width={r.width} value={r.value} color={r.color} />
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── FAQ ── */}
        <div className="section">
          <SectionHeader eyebrow="Common Questions" title="Frequently Asked" highlight="Questions" />
          <div className="grid2">
            <div className="card">
              {[
                { q: 'Do I need to download an app to use video consultations?', a: 'No. HealthNexus video runs entirely in your browser using WebRTC. No plugins, downloads, or account pre-setup required for one-off consultations.' },
                { q: 'Are e-prescriptions accepted at all pharmacies?', a: 'Yes. We integrate with SureScripts, which connects to 95%+ of US pharmacies. International availability varies — check the pharmacy tab at booking.' },
                { q: 'What happens if my internet drops during a call?', a: 'The session auto-reconnects within 10 seconds. If reconnection fails, you can rejoin via the original link. The consultation timer pauses during disconnection.' },
                { q: 'How long does it take to get an appointment?', a: 'For video consultations, most patients are seen within 2 hours. For same-day bookings with a specific doctor, average wait is 47 minutes.' },
              ].map((item, i) => (
                <div className="faq-item" key={i}>
                  <div className="faq-q">
                    <span className="faq-num">{i + 1}</span>
                    {item.q}
                  </div>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
            <div className="card">
              {[
                { q: 'How are doctors verified on the platform?', a: 'Every doctor undergoes licence verification against state medical board APIs, DEA number validation, malpractice history check, and identity verification before listing.' },
                { q: 'Can I share my consultation notes with my primary care doctor?', a: 'Yes. Clinical notes are exported in HL7 FHIR format and can be shared via secure email, patient portal, or direct EHR integration (Epic, Cerner, Athena).' },
                { q: 'Is my health data sold to third parties?', a: 'Never. We operate a zero-data-monetisation policy. Your health data is used solely to power your care experience and is never sold, rented, or shared with advertisers.' },
                { q: 'What happens to my data if I delete my account?', a: 'All personal health data is permanently deleted within 30 days per HIPAA and GDPR requirements. A final export is provided before deletion.' },
              ].map((item, i) => (
                <div className="faq-item" key={i}>
                  <div className="faq-q">
                    <span className="faq-num">{i + 5}</span>
                    {item.q}
                  </div>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default LiveDemoPage;