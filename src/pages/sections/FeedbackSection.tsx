// import { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Send, Star, CheckCircle } from 'lucide-react';

// const feedbackStyles = `
//   .fb-section {
//     position: relative;
//     padding: 100px 0;
//     overflow: hidden;
//   }

//   .fb-section::before {
//     content: '';
//     position: absolute;
//     top: -100px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 600px;
//     height: 400px;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     border-radius: 50%;
//     filter: blur(80px);
//     opacity: 0.08;
//     pointer-events: none;
//   }

//   .fb-container {
//     max-width: 620px;
//     margin: 0 auto;
//     padding: 0 1.5rem;
//   }

//   /* ── Header ── */
//   .fb-header {
//     text-align: center;
//     margin-bottom: 2.5rem;
//   }

//   .fb-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 11px;
//     font-weight: 700;
//     padding: 5px 14px;
//     border-radius: 50px;
//     background: rgba(102, 126, 234, 0.1);
//     color: #4c35a0;
//     border: 1px solid rgba(102, 126, 234, 0.25);
//     letter-spacing: 0.6px;
//     text-transform: uppercase;
//     margin-bottom: 1rem;
//   }

//   .fb-title {
//     font-size: 2.2rem;
//     font-weight: 800;
//     color: #1a202c;
//     letter-spacing: -1px;
//     line-height: 1.15;
//     margin: 0 0 0.75rem;
//   }

//   .fb-title span {
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     background-size: 200% auto;
//     animation: gradientFlow 8s ease-in-out infinite;
//   }

//   .fb-subtitle {
//     font-size: 0.95rem;
//     color: #64748b;
//     font-weight: 500;
//     line-height: 1.7;
//     margin: 0;
//   }

//   /* ── Card ── */
//   .fb-card {
//     background: rgba(255, 255, 255, 0.88);
//     backdrop-filter: blur(24px) saturate(180%);
//     -webkit-backdrop-filter: blur(24px) saturate(180%);
//     border: 1.5px solid rgba(102, 126, 234, 0.15);
//     border-radius: 28px;
//     padding: 2.5rem;
//     box-shadow:
//       0 24px 64px rgba(102, 126, 234, 0.12),
//       0 4px 16px rgba(0, 0, 0, 0.06),
//       0 0 0 0.5px rgba(255, 255, 255, 0.8) inset;
//   }

//   /* ── Form fields ── */
//   .fb-row {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 1rem;
//     margin-bottom: 1rem;
//   }

//   .fb-field {
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     margin-bottom: 1rem;
//   }

//   .fb-field:last-of-type {
//     margin-bottom: 0;
//   }

//   .fb-label {
//     font-size: 0.8rem;
//     font-weight: 700;
//     color: #4a5568;
//     letter-spacing: 0.4px;
//     text-transform: uppercase;
//   }

//   .fb-input,
//   .fb-textarea {
//     width: 100%;
//     box-sizing: border-box;
//     padding: 0.75rem 1rem;
//     font-size: 0.9rem;
//     font-weight: 500;
//     color: #1a202c;
//     background: rgba(255, 255, 255, 0.9);
//     border: 1.5px solid rgba(102, 126, 234, 0.18);
//     border-radius: 14px;
//     outline: none;
//     font-family: inherit;
//     transition: border-color 0.25s ease, box-shadow 0.25s ease;
//   }

//   .fb-input:focus,
//   .fb-textarea:focus {
//     border-color: rgba(102, 126, 234, 0.55);
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }

//   .fb-input::placeholder,
//   .fb-textarea::placeholder {
//     color: #a0aec0;
//     font-weight: 400;
//   }

//   .fb-textarea {
//     min-height: 120px;
//     resize: vertical;
//     line-height: 1.6;
//   }

//   /* ── Star Rating ── */
//   .fb-stars {
//     display: flex;
//     gap: 6px;
//     margin-bottom: 1.25rem;
//   }

//   .fb-star {
//     background: none;
//     border: none;
//     cursor: pointer;
//     padding: 2px;
//     transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
//     color: #d1d5db;
//     line-height: 1;
//   }

//   .fb-star:hover,
//   .fb-star--active {
//     color: #fbbf24;
//   }

//   .fb-star:hover {
//     transform: scale(1.25);
//   }

//   .fb-star-label {
//     font-size: 0.8rem;
//     color: #8896a8;
//     font-weight: 500;
//     margin-left: 8px;
//     align-self: center;
//   }

//   .fb-stars-row {
//     display: flex;
//     align-items: center;
//     margin-bottom: 1.25rem;
//   }

//   /* ── Submit button ── */
//   .fb-submit {
//     width: 100%;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     padding: 0.85rem 1.5rem;
//     margin-top: 1.5rem;
//     font-size: 0.95rem;
//     font-weight: 700;
//     letter-spacing: 0.4px;
//     color: #fff;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//     background-size: 200% auto;
//     border: none;
//     border-radius: 50px;
//     cursor: pointer;
//     box-shadow:
//       0 4px 18px rgba(102, 126, 234, 0.4),
//       0 1px 4px rgba(0, 0, 0, 0.1);
//     transition:
//       background-position 0.4s ease,
//       transform 0.2s ease,
//       box-shadow 0.2s ease,
//       opacity 0.2s ease;
//   }

//   .fb-submit:hover:not(:disabled) {
//     background-position: right center;
//     transform: translateY(-2px);
//     box-shadow:
//       0 8px 28px rgba(102, 126, 234, 0.5),
//       0 2px 8px rgba(0, 0, 0, 0.12);
//   }

//   .fb-submit:disabled {
//     opacity: 0.65;
//     cursor: not-allowed;
//   }

//   /* ── Success state ── */
//   .fb-success {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     padding: 2rem 1rem;
//     gap: 1rem;
//     animation: fadeInUp 0.5s ease;
//   }

//   .fb-success-icon {
//     width: 72px;
//     height: 72px;
//     border-radius: 50%;
//     background: rgba(72, 187, 120, 0.12);
//     border: 2px solid rgba(72, 187, 120, 0.3);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #48bb78;
//     animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//   }

//   .fb-success h3 {
//     font-size: 1.4rem;
//     font-weight: 800;
//     color: #1a202c;
//     margin: 0;
//   }

//   .fb-success p {
//     font-size: 0.9rem;
//     color: #64748b;
//     margin: 0;
//     line-height: 1.6;
//   }

//   @keyframes scaleIn {
//     from { transform: scale(0.5); opacity: 0; }
//     to   { transform: scale(1);   opacity: 1; }
//   }

//   /* ── Error message ── */
//   .fb-error {
//     font-size: 0.82rem;
//     color: #e53e3e;
//     text-align: center;
//     margin-top: 0.75rem;
//     font-weight: 500;
//   }

//   /* ── Responsive ── */
//   @media (max-width: 600px) {
//     .fb-row {
//       grid-template-columns: 1fr;
//     }
//     .fb-card {
//       padding: 1.75rem 1.25rem;
//       border-radius: 20px;
//     }
//     .fb-title {
//       font-size: 1.75rem;
//     }
//   }

//   @media (prefers-reduced-motion: reduce) {
//     .fb-submit,
//     .fb-star,
//     .fb-success-icon {
//       animation: none;
//       transition: none;
//     }
//   }
// `;

// const starLabels = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

// const FeedbackSection = () => {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [rating, setRating] = useState(0);
//   const [hovered, setHovered] = useState(0);
//   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (rating === 0) return;
//     setStatus('sending');

//     const templateParams = {
//       from_name:  form.name,
//       from_email: form.email,
//       message:    form.message,
//       rating:     `${rating} / 5 — ${starLabels[rating - 1]}`,
//     };

//     try {
//       // 1️⃣ Send notification to YOU
//       await emailjs.send(
//         'service_9h7w8zh',
//         'template_ow957uh',       // your existing template
//         templateParams,
//         'OKis1tF-wFSkRhwFg'
//       );

//       // 2️⃣ Send confirmation reply to the USER
//       await emailjs.send(
//         'service_9h7w8zh',
//         'template_en5u8ix',
//         templateParams,
//         'OKis1tF-wFSkRhwFg'
//       );

//       setStatus('success');
//     } catch (err) {
//       console.error('EmailJS error:', err);
//       setStatus('error');
//     }
//   };

//   const activeRating = hovered || rating;

//   return (
//     <>
//       <style>{feedbackStyles}</style>

//       <section id="feedback" className="fb-section">
//         <div className="fb-container">

//           {/* ── Header ── */}
//           <div className="fb-header">
//             <span className="fb-badge">💬 Share Your Thoughts</span>
//             <h2 className="fb-title">
//               Help Shape <span>HealthNexus</span>
//             </h2>
//             <p className="fb-subtitle">
//               Your feedback directly influences the next version.
//               Tell me what you think — every insight matters.
//             </p>
//           </div>

//           {/* ── Card ── */}
//           <div className="fb-card">
//             {status === 'success' ? (
//               <div className="fb-success">
//                 <div className="fb-success-icon">
//                   <CheckCircle size={36} />
//                 </div>
//                 <h3>Thank you so much! 🎉</h3>
//                 <p>
//                   Your feedback has been received and will help shape
//                   the official release of HealthNexus.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>

//                 {/* Name + Email */}
//                 <div className="fb-row">
//                   <div className="fb-field">
//                     <label className="fb-label">Your Name</label>
//                     <input
//                       className="fb-input"
//                       type="text"
//                       name="name"
//                       placeholder="John Silva"
//                       value={form.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="fb-field">
//                     <label className="fb-label">Email Address</label>
//                     <input
//                       className="fb-input"
//                       type="email"
//                       name="email"
//                       placeholder="john@example.com"
//                       value={form.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Star Rating */}
//                 <div className="fb-field">
//                   <label className="fb-label">Your Rating</label>
//                   <div className="fb-stars-row">
//                     <div className="fb-stars">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           type="button"
//                           className={`fb-star ${star <= activeRating ? 'fb-star--active' : ''}`}
//                           onClick={() => setRating(star)}
//                           onMouseEnter={() => setHovered(star)}
//                           onMouseLeave={() => setHovered(0)}
//                           aria-label={`Rate ${star} out of 5`}
//                         >
//                           <Star
//                             size={28}
//                             fill={star <= activeRating ? '#fbbf24' : 'none'}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                     {activeRating > 0 && (
//                       <span className="fb-star-label">
//                         {starLabels[activeRating - 1]}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Message */}
//                 <div className="fb-field">
//                   <label className="fb-label">Your Thoughts</label>
//                   <textarea
//                     className="fb-textarea"
//                     name="message"
//                     placeholder="What do you think about HealthNexus? Any features you'd love to see?"
//                     value={form.message}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="fb-submit"
//                   disabled={status === 'sending' || rating === 0}
//                 >
//                   {status === 'sending' ? (
//                     <>Sending...</>
//                   ) : (
//                     <>
//                       <Send size={16} />
//                       Send Feedback
//                     </>
//                   )}
//                 </button>

//                 {status === 'error' && (
//                   <p className="fb-error">
//                     Something went wrong. Please try again or email me directly.
//                   </p>
//                 )}
//               </form>
//             )}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default FeedbackSection;


import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, Star } from 'lucide-react';

/* ─── Shared token palette (matches Comparison / VendorBenefits / PricingCalculator) ─── */
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
  gradGreen:    'linear-gradient(135deg, #11998e 0%, #1a5fa8 100%)',
};

/* ─── Identical CardHero used across all pages ─── */
const CardHero = ({
  eyebrow, title, subtitle, grad,
}: {
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

/* ─── Identical CardShell used across all pages ─── */
const CardShell = ({
  children, hovered, onEnter, onLeave, style: extraStyle = {},
}: {
  children: React.ReactNode;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
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
      ...extraStyle,
    }}
  >
    {children}
  </div>
);

const starLabels = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

/* ─── Main Component ─── */
const FeedbackSection = () => {
  const [hoveredCard, setHoveredCard] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [rating, setRating] = useState(0);
  const [starHovered, setStarHovered] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setStatus('sending');
    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      rating:     `${rating} / 5 — ${starLabels[rating - 1]}`,
    };
    try {
      await emailjs.send('service_9h7w8zh', 'template_ow957uh', templateParams, 'OKis1tF-wFSkRhwFg');
      await emailjs.send('service_9h7w8zh', 'template_en5u8ix', templateParams, 'OKis1tF-wFSkRhwFg');
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const activeRating = starHovered || rating;

  /* ── Shared input style ── */
  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '0.7rem 1rem',
    fontSize: '0.85rem', fontWeight: 500, color: '#1a202c',
    background: '#fafbfc',
    border: '1.5px solid rgba(102,126,234,.18)',
    borderRadius: 14, outline: 'none',
    fontFamily: "'DM Sans','Inter',-apple-system,sans-serif",
    transition: 'border-color .25s, box-shadow .25s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: '#718096',
    marginBottom: 6,
  };

  return (
    <section
      id="feedback"
      style={{
        fontFamily: "'DM Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: '#fafbfc',
        color: '#1a202c',
      }}
    >
      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', padding: isMobile ? '48px 16px 32px' : '72px 24px 48px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg,rgba(102,126,234,.12),rgba(118,75,162,.12))',
          border: '1px solid rgba(102,126,234,.2)',
          color: '#667eea', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: 50, marginBottom: 24,
        }}>
          ✦ Share Your Thoughts
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800,
          color: '#1a202c', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 16px',
        }}>
          Help shape{' '}
          <span style={{
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            HealthNexus
          </span>
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#718096', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
          Your feedback directly influences the next version.
          Every insight matters and shapes what we build.
        </p>
      </div>

      {/* ── Info banner ── */}
      <div style={{ maxWidth: 760, margin: '0 auto 40px', padding: isMobile ? '0 14px' : '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(102,126,234,.06),rgba(13,122,95,.06))',
          border: '1px solid rgba(102,126,234,.12)', borderRadius: 16,
          padding: isMobile ? '16px 16px' : '20px 28px',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.2rem' }}>💬</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c', marginBottom: 3 }}>
              We read every single response
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.6 }}>
              Name · Email · Star rating · Open feedback — your thoughts go straight to the team
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Anonymous OK', '1 min', 'Direct Impact'].map(t => (
              <span key={t} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 50,
                background: '#fff', color: '#4a5568', border: '1px solid #e2e8f0',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form card ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '0 14px 80px' : '0 24px 100px' }}>
        <CardShell
          hovered={hoveredCard}
          onEnter={() => setHoveredCard(true)}
          onLeave={() => setHoveredCard(false)}
        >
          <CardHero
            eyebrow="HealthNexus · Feedback"
            title="Tell us what you think"
            subtitle="Rate the platform and share any thoughts features, pain points, or ideas."
            grad={T.gradPurple}
          />

          <div style={{ padding: isMobile ? '20px 16px 24px' : '28px 28px 32px' }}>
            {status === 'success' ? (
              /* ── Success state ── */
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', textAlign: 'center',
                padding: '32px 16px', gap: 16,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: T.tealL, border: `2px solid ${T.tealBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.teal,
                }}>
                  <CheckCircle size={34} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a202c', margin: 0 }}>
                  Thank you so much! 🎉
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#718096', margin: 0, lineHeight: 1.7, maxWidth: 340 }}>
                  Your feedback has been received and will help shape the official release of HealthNexus.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Name + Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '0 16px',
                  marginBottom: 18,
                }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(102,126,234,.55)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(102,126,234,.18)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={{ marginTop: isMobile ? 16 : 0 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      style={inputStyle}
                      type="email"
                      name="email"
                      placeholder="test@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(102,126,234,.55)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(102,126,234,.18)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Your Rating</label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '12px 16px',
                    background: T.purpleL,
                    border: `1px solid ${T.purpleBorder}`,
                    borderRadius: 14,
                  }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setStarHovered(star)}
                        onMouseLeave={() => setStarHovered(0)}
                        aria-label={`Rate ${star} out of 5`}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: 2,
                          color: star <= activeRating ? '#f59e0b' : '#d1d5db',
                          transform: star <= activeRating ? 'scale(1.15)' : 'scale(1)',
                          transition: 'transform .2s, color .15s',
                          lineHeight: 1,
                        }}
                      >
                        <Star
                          size={26}
                          fill={star <= activeRating ? '#f59e0b' : 'none'}
                          strokeWidth={star <= activeRating ? 0 : 1.5}
                        />
                      </button>
                    ))}
                    {activeRating > 0 && (
                      <span style={{
                        marginLeft: 8, fontSize: '0.78rem', fontWeight: 700,
                        color: T.purple, letterSpacing: '0.5px',
                      }}>
                        {starLabels[activeRating - 1]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 4 }}>
                  <label style={labelStyle}>Your Thoughts</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }}
                    name="message"
                    placeholder="What do you think about HealthNexus? Any features you'd love to see?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(102,126,234,.55)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(102,126,234,.18)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending' || rating === 0}
                  style={{
                    width: '100%', marginTop: 20,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.92rem', fontWeight: 700, letterSpacing: '0.3px',
                    color: '#fff',
                    background: status === 'sending' || rating === 0
                      ? '#a0aec0'
                      : T.gradPurple,
                    border: 'none', borderRadius: 50,
                    cursor: status === 'sending' || rating === 0 ? 'not-allowed' : 'pointer',
                    boxShadow: rating > 0 && status !== 'sending'
                      ? '0 4px 18px rgba(107,63,160,.35)'
                      : 'none',
                    transition: 'background .3s, box-shadow .2s, transform .2s',
                  }}
                  onMouseEnter={e => {
                    if (rating > 0 && status !== 'sending')
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  {status === 'sending' ? (
                    'Sending…'
                  ) : (
                    <>
                      <Send size={15} />
                      Send Feedback
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p style={{
                    fontSize: '0.82rem', color: T.red, fontWeight: 600,
                    textAlign: 'center', marginTop: 12,
                  }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </CardShell>
      </div>
    </section>
  );
};

export default FeedbackSection;