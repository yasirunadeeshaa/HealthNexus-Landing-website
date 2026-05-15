import { useState } from 'react';
import {
  Video, Calendar, Search, FileText, Wifi, MessageSquare, Camera, Share2,
  Mic, Phone, ChevronLeft, ChevronRight, CheckCircle, Star, Building,
  Send, Stethoscope, Shield, Pill, Clock, MapPin, Filter
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────
type TabKey = 'video' | 'booking' | 'doctors' | 'prescription';

interface InfoCard {
  label: string;
  title: string;
  desc: string;
}

// ─── Data ──────────────────────────────────────────────────────
const tabs: { key: TabKey; icon: React.ReactNode; label: string }[] = [
  { key: 'video',        icon: <Video size={16} />,       label: 'Video consultation' },
  { key: 'booking',      icon: <Calendar size={16} />,    label: 'Book appointment' },
  { key: 'doctors',      icon: <Stethoscope size={16} />, label: 'Find doctors' },
  { key: 'prescription', icon: <FileText size={16} />,    label: 'E-prescription' },
];

const infoCards: Record<TabKey, InfoCard> = {
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

const barTitles: Record<TabKey, string> = {
  video:        'HealthNexus — Video Consultation',
  booking:      'HealthNexus — Appointment Booking',
  doctors:      'HealthNexus — Find Doctors',
  prescription: 'HealthNexus — E-Prescription',
};

const doctors = [
  { img: 'https://i.pravatar.cc/100?img=10', name: 'Dr. Michael Chen',  spec: 'Cardiologist',    rating: '4.8', exp: 15 },
  { img: 'https://i.pravatar.cc/100?img=11', name: 'Dr. Emily Brown',   spec: 'Heart specialist', rating: '4.7', exp: 20 },
  { img: 'https://i.pravatar.cc/100?img=13', name: 'Dr. James Wilson',  spec: 'Cardiac surgeon',  rating: '4.6', exp: 25 },
];

const calDays = [20, 21, 22, 23, 24, 25, 26];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
const filterTags = ['Cardiologist', 'Near me', 'Available today', '4+ rating'];

// ─── Palette helpers (matching UserJourney) ───────────────────
const pill = {
  purple: { bg: '#EEEDFE', color: '#534AB7', border: '#AFA9EC' },
  teal:   { bg: '#E1F5EE', color: '#0F6E56', border: '#5DCAA5' },
  amber:  { bg: '#FAEEDA', color: '#854F0B', border: '#EF9F27' },
  pink:   { bg: '#FBEAF0', color: '#993556', border: '#ED93B1' },
};

// ─── Sub-components ───────────────────────────────────────────

/** Video Consultation Panel */
const VideoPanel = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {/* Video grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
      {[
        { img: 'https://i.pravatar.cc/300?img=12', name: 'Dr. Sarah Johnson', sub: 'Cardiologist', badge: true },
        { img: 'https://i.pravatar.cc/300?img=5',  name: 'You',              sub: 'Connected',    badge: false },
      ].map((p, i) => (
        <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#1a202c' }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 55%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p.name}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>{p.sub}</span>
          </div>
          {p.badge && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(0,0,0,.65)', borderRadius: 20,
              padding: '3px 8px', fontSize: 11, color: '#48bb78',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Wifi size={11} /> Excellent
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Tool buttons */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {[
        { icon: <MessageSquare size={14} />, label: 'Chat' },
        { icon: <FileText size={14} />,      label: 'Notes' },
        { icon: <Camera size={14} />,        label: 'Capture' },
        { icon: <Share2 size={14} />,        label: 'Share screen' },
      ].map((t, i) => (
        <button key={i} style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
          padding: '7px 12px', fontSize: 12, color: '#6b7280', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all .18s',
        }}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>

    {/* Call controls */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
      {[
        { icon: <Mic size={18} />,    label: 'Mute',       end: false },
        { icon: <Video size={18} />,  label: 'Camera',     end: false },
        { icon: <Share2 size={18} />, label: 'Share',      end: false },
        { icon: <Phone size={18} />,  label: 'End call',   end: true  },
      ].map((c, i) => (
        <button key={i} aria-label={c.label} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: c.end ? '#ff4444' : '#fff',
          border: c.end ? 'none' : '1px solid #e5e7eb',
          color: c.end ? '#fff' : '#374151',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,.08)',
          transition: 'all .18s',
        }}>
          {c.icon}
        </button>
      ))}
    </div>
  </div>
);

/** Booking Panel */
const BookingPanel = () => {
  const [selDay, setSelDay] = useState(22);
  const [selSlot, setSelSlot] = useState('11:00 AM');

  return (
    <div>
      {/* Calendar header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a202c' }}>December 2024</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[<ChevronLeft size={16} />, <ChevronRight size={16} />].map((ic, i) => (
            <button key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#6b7280',
            }}>{ic}</button>
          ))}
        </div>
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 16 }}>
        {calDays.map(d => (
          <button key={d} onClick={() => setSelDay(d)} style={{
            background: selDay === d ? pill.purple.bg : '#fff',
            border: `1px solid ${selDay === d ? pill.purple.border : '#e5e7eb'}`,
            borderRadius: 10, padding: '8px 4px', textAlign: 'center', cursor: 'pointer',
            transition: 'all .18s',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: selDay === d ? pill.purple.color : '#1a202c', display: 'block' }}>{d}</span>
            <small style={{ fontSize: 10, color: '#9ca3af' }}>4 slots</small>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <div style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 8 }}>Available times</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
        {timeSlots.map(t => (
          <button key={t} onClick={() => setSelSlot(t)} style={{
            background: selSlot === t ? pill.purple.bg : '#fff',
            border: `1px solid ${selSlot === t ? pill.purple.border : '#e5e7eb'}`,
            borderRadius: 10, padding: 9, fontSize: 12, cursor: 'pointer',
            color: selSlot === t ? pill.purple.color : '#374151',
            fontWeight: selSlot === t ? 600 : 400,
            transition: 'all .18s',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Confirm */}
      <button style={{
        width: '100%', padding: '11px 0',
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        color: '#fff', border: 'none', borderRadius: 12,
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 4px 14px rgba(99,102,241,.3)',
      }}>
        <CheckCircle size={16} /> Confirm appointment
      </button>
    </div>
  );
};

/** Find Doctors Panel */
const DoctorsPanel = () => {
  const [activeTags, setActiveTags] = useState<string[]>(['Cardiologist']);

  const toggleTag = (tag: string) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  return (
    <div>
      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fff', border: '1px solid #e5e7eb',
        borderRadius: 12, padding: '9px 14px', marginBottom: 10,
      }}>
        <Search size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search by specialty, condition or doctor name"
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontSize: 13, color: '#374151', width: '100%',
          }}
        />
        <Filter size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
      </div>

      {/* Filter tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {filterTags.map(tag => {
          const on = activeTags.includes(tag);
          return (
            <button key={tag} onClick={() => toggleTag(tag)} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 20,
              border: `1px solid ${on ? pill.purple.border : '#e5e7eb'}`,
              background: on ? pill.purple.bg : '#fff',
              color: on ? pill.purple.color : '#6b7280',
              cursor: 'pointer', fontWeight: on ? 600 : 400,
              transition: 'all .18s',
            }}>
              {tag}
            </button>
          );
        })}
      </div>

      {/* Doctor cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {doctors.map((doc, i) => (
          <DoctorCard key={i} doc={doc} />
        ))}
      </div>
    </div>
  );
};

const DoctorCard = ({ doc }: { doc: typeof doctors[0] }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#fff',
        border: `1px solid ${hov ? '#AFA9EC' : '#e5e7eb'}`,
        borderRadius: 14, padding: '10px 14px',
        boxShadow: hov ? '0 4px 16px rgba(99,102,241,.12)' : '0 2px 8px rgba(0,0,0,.04)',
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'all .18s',
      }}
    >
      <img src={doc.img} alt={doc.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{doc.name}</div>
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 5 }}>{doc.spec}</div>
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#9ca3af', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Star size={11} style={{ color: '#854F0B' }} fill="#854F0B" /> {doc.rating}/5
          </span>
          <span><MapPin size={11} style={{ verticalAlign: -1 }} /> {doc.exp} yrs exp</span>
          <span style={{ color: '#0F6E56', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            Available
          </span>
        </div>
      </div>
      <button style={{
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        color: '#fff', border: 'none', borderRadius: 20,
        padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        flexShrink: 0, boxShadow: '0 2px 8px rgba(99,102,241,.3)',
        transition: 'opacity .15s',
      }}>
        Book
      </button>
    </div>
  );
};

/** E-Prescription Panel */
const PrescriptionPanel = () => (
  <div>
    {/* Header */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      paddingBottom: 14, borderBottom: '2px dashed #e5e7eb', marginBottom: 14,
    }}>
      <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#6366F1', lineHeight: 1 }}>℞</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a202c' }}>Digital prescription</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Dr. Sarah Johnson · Dec 20, 2024</div>
      </div>
      <span style={{
        marginLeft: 'auto', ...pill.teal,
        fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600,
      }}>
        Verified ✓
      </span>
    </div>

    {/* Medications */}
    {[
      { name: 'Lisinopril', dose: '10 mg — once daily with food', supply: '30 days supply' },
      { name: 'Metformin',  dose: '500 mg — twice daily',         supply: '90 days supply' },
    ].map((med, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#f9fafb', border: '1px solid #e5e7eb',
        borderRadius: 12, padding: 12, marginBottom: 8,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: pill.purple.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Pill size={18} style={{ color: pill.purple.color }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 2 }}>{med.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{med.dose}</div>
          <span style={{
            ...pill.teal, fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600,
          }}>
            {med.supply}
          </span>
        </div>
        <span title="Interaction checked" style={{ display: 'inline-flex' }}>
          <Shield size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
        </span>
      </div>
    ))}

    {/* Pharmacy */}
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>Send to pharmacy</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fff', border: '1px solid #e5e7eb',
        borderRadius: 10, padding: '10px 12px', marginBottom: 10,
      }}>
        <Building size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
        <select style={{
          border: 'none', outline: 'none', background: 'transparent',
          fontSize: 13, color: '#374151', flex: 1,
        }}>
          <option>CVS Pharmacy — 2 miles</option>
          <option>Walgreens — 3 miles</option>
          <option>Rite Aid — 4 miles</option>
        </select>
      </div>
      <button style={{
        width: '100%', padding: '11px 0',
        background: 'linear-gradient(135deg, #0F6E56, #10B981)',
        color: '#fff', border: 'none', borderRadius: 12,
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 4px 14px rgba(15,110,86,.3)',
      }}>
        <Send size={15} /> Send prescription
      </button>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────
const LiveDemo = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('video');
  const info = infoCards[activeTab];

  const panels: Record<TabKey, React.ReactNode> = {
    video:        <VideoPanel />,
    booking:      <BookingPanel />,
    doctors:      <DoctorsPanel />,
    prescription: <PrescriptionPanel />,
  };

  return (
    <section
      id="live-demo"
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #fafbff 0%, #ffffff 60%, #f8f9ff 100%)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs (same as UserJourney) */}
      {[
        { size: 500, top: '-160px', left: '-160px', color: '#6366F1' },
        { size: 360, bottom: '-80px', right: '-80px', color: '#EC4899' },
        { size: 280, top: '40%', left: '50%', color: '#10B981' },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: b.size, height: b.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${b.color}14 0%, transparent 70%)`,
          top: (b as any).top, bottom: (b as any).bottom,
          left: (b as any).left, right: (b as any).right,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px',
            textTransform: 'uppercase', color: '#6366F1',
            background: '#EEEDFE', border: '1px solid #AFA9EC',
            padding: '6px 16px', borderRadius: 50, marginBottom: 20,
          }}>
            <Video size={13} /> Live Demog
          </span>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1a202c', lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Experience HealthNexus
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              In Action
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Click any feature below to see how HealthNexus works — no sign-up needed.
          </p>
        </div>

        {/* ── Main demo container ── */}
        <div style={{
          background: '#fff', borderRadius: 24,
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 60px rgba(0,0,0,.08)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          minHeight: 560,
        }}>

          {/* ── Sidebar ── */}
          <div style={{
            background: '#fafbff', borderRight: '1px solid #e5e7eb',
            padding: '1.5rem 1.25rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9ca3af' }}>
              Try our features
            </div>

            {/* Nav buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {tabs.map(tab => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: active ? pill.purple.bg : 'transparent',
                      border: `1px solid ${active ? pill.purple.border : '#e5e7eb'}`,
                      borderRadius: 12, padding: '10px 12px',
                      fontSize: 13, color: active ? pill.purple.color : '#6b7280',
                      fontWeight: active ? 800 : 400,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 8,
                      transition: 'all .18s',
                      transform: active ? 'translateX(3px)' : 'none',
                    }}
                  >
                    <span style={{ color: active ? pill.purple.color : '#9ca3af' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Info card */}
            <div style={{
              marginTop: 'auto',
              background: '#fff', border: '1px solid #e5e7eb',
              borderRadius: 14, padding: '1rem',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 4 }}>
                {info.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>
                {info.title}
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
                {info.desc}
              </div>
            </div>
          </div>

          {/* ── Main panel ── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Browser topbar */}
            <div style={{
              background: '#1e2533', padding: '10px 18px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57', '#ffbd2e', '#28ca42'].map((c, i) => (
                  <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', flex: 1, textAlign: 'center' }}>
                {barTitles[activeTab]}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28ca42', display: 'block' }} />
                <span style={{ fontSize: 11, color: '#6b7280' }}>Secure</span>
              </div>
            </div>

            {/* Panel content */}
            <div style={{
              flex: 1, padding: '1.25rem 1.5rem',
              background: '#f8f9fc', overflowY: 'auto',
              // Fade-in via key forces remount on tab change
            }} key={activeTab}>
              {panels[activeTab]}
            </div>
          </div>
        </div>

        {/* ── Bottom stat row (matching UserJourney stats bar) ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: '2rem',
        }}>
          {[
            { icon: <Video size={18} />,    label: 'HD Video',     sub: 'Crystal-clear calls',      ...pill.purple },
            { icon: <Clock size={18} />,    label: '< 2 min',      sub: 'Avg booking time',         ...pill.amber },
            { icon: <Shield size={18} />,   label: '100% Secure',  sub: 'End-to-end encrypted',     ...pill.teal },
            { icon: <CheckCircle size={18} />, label: 'Instant Rx', sub: 'Direct to pharmacy',       ...pill.pink },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16,
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,.04)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: s.bg, color: s.color,
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

      </div>
    </section>
  );
};

export default LiveDemo;