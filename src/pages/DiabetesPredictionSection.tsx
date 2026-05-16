import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Tooltip, Legend, Filler,
  type ChartDataset,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

import PremiumNav from './sections/NavBar';
import Footer from './sections/Footer';

import diabetesImg from '../assets/1769500368790.png';
import diabetesImg1 from '../assets/1770284529903.png';
import audio from '../assets/post-48422-Ln-is-ai-the-future-of-diabetes-diagnosis-and-management.mp3';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Tooltip, Legend, Filler
);

/* ─── Slide data ─── */
const SLIDES = [
  {
    img: diabetesImg,
    caption: 'AI & Diabetes — The Future of Diagnosis',
    sub: 'How artificial intelligence is transforming healthcare outcomes',
  },
  {
    img: diabetesImg1,
    caption: 'Real-Time Glucose Monitoring & Risk Detection',
    sub: 'Continuous AI-powered alerts and personalised A1C improvement',
  },
];

const AUDIO_SRC = audio;

/* ─── AudioSlideshow component ─── */
const AudioSlideshow: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]       = useState(false);
  const [progress, setProgress]     = useState(0);   // 0-100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]     = useState(0);
  const [slideIdx, setSlideIdx]     = useState(0);
  const [fade, setFade]             = useState(true);

  /* Derive which slide to show from audio progress */
  const getTargetSlide = useCallback((pct: number) => {
    const seg = 100 / SLIDES.length;
    return Math.min(Math.floor(pct / seg), SLIDES.length - 1);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      setProgress(pct);
      setCurrentTime(audio.currentTime);
      const target = getTargetSlide(pct);
      if (target !== slideIdx) {
        setFade(false);
        setTimeout(() => { setSlideIdx(target); setFade(true); }, 300);
      }
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded  = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [slideIdx, getTargetSlide]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  };

  const goSlide = (i: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const seg = 1 / SLIDES.length;
    audio.currentTime = i * seg * audio.duration;
    setFade(false);
    setTimeout(() => { setSlideIdx(i); setFade(true); }, 200);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const slide = SLIDES[slideIdx];

  return (
    <div style={{ marginBottom: 0 }}>
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* Stage */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/9', border: '1px solid rgba(102,126,234,0.1)',
        background: '#0d0d1a', borderRadius: '18px 18px 0 0', overflow: 'hidden',
      }}>
        <img
          src={slide.img}
          alt={slide.caption}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />

        {/* Slide counter */}
        <div style={{
          position: 'absolute', top: 14, right: 16,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          color: '#fff', fontSize: '0.72rem', fontWeight: 700,
          padding: '4px 14px', borderRadius: 50,
          border: '1px solid rgba(255,255,255,0.18)',
        }}>
          {slideIdx + 1} / {SLIDES.length}
        </div>

        {/* Playing badge */}
        {playing && (
          <div style={{
            position: 'absolute', top: 14, left: 16,
            background: 'rgba(102,126,234,0.85)', backdropFilter: 'blur(6px)',
            color: '#fff', fontSize: '0.7rem', fontWeight: 700,
            padding: '4px 12px', borderRadius: 50,
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#fff',
              animation: 'pulse 1s ease-in-out infinite',
            }} />
            LIVE
          </div>
        )}

        {/* Caption */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '40px 24px 20px',
          opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease',
        }}>
          <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 5 }}>
            {slide.caption}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.78rem', fontWeight: 500 }}>
            {slide.sub}
          </div>
        </div>

        {/* Big play button overlay when paused */}
        {!playing && (
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(102,126,234,0.90)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.35)',
              boxShadow: '0 0 40px rgba(102,126,234,0.5)',
              transition: 'transform 0.2s ease',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar (clickable) */}
      <div
        onClick={seek}
        style={{
          height: 5, background: 'rgba(102,126,234,0.15)', cursor: 'pointer',
          position: 'relative',
        }}
      >
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          transition: 'width 0.2s linear',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: '50%',
            background: '#764ba2', border: '2px solid #fff',
            boxShadow: '0 0 4px rgba(0,0,0,0.3)',
          }} />
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        background: '#fff', borderRadius: '0 0 18px 18px',
        border: '1px solid rgba(102,126,234,0.1)',
        borderTop: 'none',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        {/* Prev */}
        <button
          onClick={() => goSlide(Math.max(0, slideIdx - 1))}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(102,126,234,0.2)',
            background: 'rgba(102,126,234,0.06)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#667eea', flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 12px rgba(102,126,234,0.4)',
          }}
        >
          {playing
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>

        {/* Next */}
        <button
          onClick={() => goSlide(Math.min(SLIDES.length - 1, slideIdx + 1))}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(102,126,234,0.2)',
            background: 'rgba(102,126,234,0.06)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#667eea', flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        {/* Time + track info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a202c', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Is AI the Future of Diabetes Diagnosis?
          </div>
          <div style={{ fontSize: '0.7rem', color: '#9a9790', fontWeight: 600 }}>
            {fmt(currentTime)} / {fmt(duration)}
          </div>
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => goSlide(i)}
              style={{
                width: i === slideIdx ? 22 : 8,
                height: 8, borderRadius: 50,
                background: i === slideIdx
                  ? 'linear-gradient(90deg, #667eea, #764ba2)'
                  : 'rgba(102,126,234,0.25)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
};


/* ─── Internal CSS (unchanged from original) ─── */
const STYLES = `
.dashboard-root {
  font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fafbfc;
  color: #1a202c;
  width: 100%;
}
.dashboard-root .hero {
  padding: 130px 48px 56px;
  margin-top: -80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #fafbfc;  /* matches page background */
}

.dashboard-root .hero::before {
  display: none;  /* remove the radial gradients */
}

.dashboard-root .hero-eye {
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

.dashboard-root .hero h1 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #1a202c;  /* dark text instead of white */
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 18px;
}

.dashboard-root .hero h1 em {
  font-style: normal;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-root .hero-sub {
  color: #718096;  /* muted dark instead of rgba white */
  font-size: 1rem;
  max-width: 620px;
  margin: 0 auto 36px;
  line-height: 1.7;
}

.dashboard-root .stat-strip {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dashboard-root .stat-cell {
  background: #fff;
  border: 1px solid rgba(102,126,234,0.15);
  border-radius: 16px;
  padding: 16px 28px;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.dashboard-root .stat-cell:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.10);
}

.dashboard-root .stat-v {
  font-size: 1.6rem;
  font-weight: 800;
  color: #667eea;  /* accent color instead of white */
  line-height: 1;
}

.dashboard-root .stat-l {
  font-size: 0.72rem;
  color: #718096;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 4px;
  text-transform: uppercase;
}
.dashboard-root .page { max-width: 1100px; margin: 0 auto; padding: 48px 24px 64px; }
.dashboard-root .section { margin-bottom: 8px; }
.dashboard-root .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(102,126,234,0.18), transparent); margin: 40px 0; }
.dashboard-root .section-hd { margin-bottom: 28px; }
.dashboard-root .eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #667eea; margin-bottom: 6px; }
.dashboard-root .section-hd h2 { font-size: clamp(1.4rem,2.5vw,2rem); font-weight: 800; color: #1a202c; letter-spacing: -0.5px; line-height: 1.2; }
.dashboard-root .section-hd h2 span { background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.dashboard-root .sub-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: #9a9790; margin-bottom: 10px; }
.dashboard-root .chart-label { font-size: 0.78rem; color: #718096; margin-bottom: 14px; line-height: 1.5; }
.dashboard-root .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 14px; }
.dashboard-root .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.dashboard-root .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.dashboard-root .card { background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border: 1px solid rgba(102,126,234,0.08); transition: box-shadow 0.25s ease, transform 0.25s ease; }
.dashboard-root .card:hover { box-shadow: 0 10px 15px rgba(0,0,0,0.1); transform: translateY(-2px); }
.dashboard-root .metric-card { border-radius: 16px; padding: 20px 18px; position: relative; overflow: hidden; border: 1px solid transparent; transition: transform 0.25s ease, box-shadow 0.25s ease; }
.dashboard-root .metric-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px rgba(0,0,0,0.15); }
.dashboard-root .mv { font-size: 1.9rem; font-weight: 800; line-height: 1; margin-bottom: 4px; }
.dashboard-root .ml { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.5px; opacity: 0.75; text-transform: uppercase; }
.dashboard-root .mc-teal { background: linear-gradient(135deg, rgba(13,122,95,0.08), rgba(13,122,95,0.15)); border-color: rgba(13,122,95,0.18); }
.dashboard-root .mc-teal .mv { color: #0d7a5f; }
.dashboard-root .mc-teal .ml { color: #0d7a5f; }
.dashboard-root .mc-blue { background: linear-gradient(135deg, rgba(26,95,168,0.08), rgba(26,95,168,0.15)); border-color: rgba(26,95,168,0.18); }
.dashboard-root .mc-blue .mv { color: #1a5fa8; }
.dashboard-root .mc-blue .ml { color: #1a5fa8; }
.dashboard-root .mc-amber { background: linear-gradient(135deg, rgba(184,94,12,0.08), rgba(184,94,12,0.15)); border-color: rgba(184,94,12,0.18); }
.dashboard-root .mc-amber .mv { color: #b85e0c; }
.dashboard-root .mc-amber .ml { color: #b85e0c; }
.dashboard-root .mc-purple { background: linear-gradient(135deg, rgba(107,63,160,0.08), rgba(107,63,160,0.15)); border-color: rgba(107,63,160,0.18); }
.dashboard-root .mc-purple .mv { color: #6b3fa0; }
.dashboard-root .mc-purple .ml { color: #6b3fa0; }
.dashboard-root .legend { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 16px; }
.dashboard-root .legend-item { display: flex; align-items: center; gap: 7px; font-size: 0.78rem; color: #4a5568; font-weight: 500; }
.dashboard-root .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.dashboard-root .model-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 12px; margin-bottom: 8px; background: #f7fafc; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.dashboard-root .model-row:hover { background: rgba(102,126,234,0.06); border-color: rgba(102,126,234,0.25); transform: translateX(4px); }
.dashboard-root .model-n { font-size: 0.88rem; font-weight: 700; color: #1a202c; }
.dashboard-root .model-r { font-size: 0.75rem; color: #718096; margin-top: 2px; }
.dashboard-root .model-badge { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 50px; white-space: nowrap; flex-shrink: 0; }
.dashboard-root .mb-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
.dashboard-root .mb-secondary { background: #edf2f7; color: #4a5568; border: 1px solid #e2e8f0; }
.dashboard-root .mb-xai { background: linear-gradient(135deg, rgba(107,63,160,0.15), rgba(107,63,160,0.25)); color: #6b3fa0; border: 1px solid rgba(107,63,160,0.2); }
.dashboard-root .shap-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.dashboard-root .shap-lbl { font-size: 0.75rem; font-weight: 600; color: #4a5568; min-width: 160px; flex-shrink: 0; }
.dashboard-root .shap-track { flex: 1; height: 8px; background: #edf2f7; border-radius: 4px; overflow: hidden; }
.dashboard-root .shap-fill { height: 100%; border-radius: 4px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); }
.dashboard-root .shap-val { font-size: 0.75rem; font-weight: 700; min-width: 46px; text-align: right; flex-shrink: 0; }
.dashboard-root .shap-legend { display: flex; gap: 20px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 0.72rem; color: #718096; font-weight: 500; }
.dashboard-root .shap-legend span { display: flex; align-items: center; gap: 6px; }
.dashboard-root .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dashboard-root .arch-row { display: flex; gap: 14px; margin-bottom: 16px; padding: 14px 16px; border-radius: 12px; background: #f7fafc; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.dashboard-root .arch-row:hover { background: rgba(102,126,234,0.05); border-color: rgba(102,126,234,0.2); }
.dashboard-root .arch-num { font-size: 0.65rem; font-weight: 800; color: #667eea; background: rgba(102,126,234,0.1); border-radius: 6px; padding: 4px 8px; height: fit-content; flex-shrink: 0; letter-spacing: 0.5px; }
.dashboard-root .arch-title { font-size: 0.85rem; font-weight: 700; color: #1a202c; margin-bottom: 4px; }
.dashboard-root .arch-desc { font-size: 0.75rem; color: #718096; line-height: 1.5; }
.dashboard-root .rec-item { display: flex; gap: 12px; padding: 12px 14px; border-radius: 12px; margin-bottom: 10px; background: linear-gradient(135deg, rgba(102,126,234,0.04), rgba(118,75,162,0.06)); border: 1px solid rgba(102,126,234,0.12); transition: all 0.2s ease; }
.dashboard-root .rec-item:hover { border-color: rgba(102,126,234,0.3); transform: translateX(4px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.dashboard-root .rec-icon { font-size: 1.3rem; line-height: 1; flex-shrink: 0; margin-top: 2px; }
.dashboard-root .rec-title { font-size: 0.83rem; font-weight: 700; color: #1a202c; margin-bottom: 3px; }
.dashboard-root .rec-body { font-size: 0.73rem; color: #718096; line-height: 1.5; }
.dashboard-root .ds-table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
.dashboard-root .ds-table thead tr { background: linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08)); }
.dashboard-root .ds-table th { padding: 14px 18px; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #4a5568; border-bottom: 1px solid #e2e8f0; }
.dashboard-root .ds-table td { padding: 13px 18px; border-bottom: 1px solid #f0f4f8; color: #4a5568; vertical-align: middle; transition: background 0.15s ease; }
.dashboard-root .ds-table tbody tr:hover td { background: rgba(102,126,234,0.04); }
.dashboard-root .ds-table tbody tr:last-child td { border-bottom: none; }
.dashboard-root .dn { font-weight: 700; color: #1a202c; }
.dashboard-root .tag { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 50px; margin-right: 5px; }
.dashboard-root .tag-t { background: rgba(13,122,95,0.12); color: #0d7a5f; border: 1px solid rgba(13,122,95,0.2); }
.dashboard-root .tag-a { background: rgba(184,94,12,0.12); color: #b85e0c; border: 1px solid rgba(184,94,12,0.2); }
.dashboard-root .tag-b { background: rgba(26,95,168,0.12); color: #1a5fa8; border: 1px solid rgba(26,95,168,0.2); }
.dashboard-root .tag-p { background: rgba(107,63,160,0.12); color: #6b3fa0; border: 1px solid rgba(107,63,160,0.2); }
.dashboard-root .tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.dashboard-root .tech-item { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; font-weight: 600; color: #4a5568; padding: 8px 12px; border-radius: 10px; background: #f7fafc; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.dashboard-root .tech-item:hover { background: rgba(102,126,234,0.06); border-color: rgba(102,126,234,0.2); transform: translateY(-2px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.dashboard-root .tech-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dashboard-root .challenge-row { display: flex; gap: 14px; padding: 18px 20px; border-radius: 16px; margin-bottom: 14px; background: #fff; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.25s ease; }
.dashboard-root .challenge-row:hover { border-color: rgba(102,126,234,0.25); box-shadow: 0 4px 6px rgba(0,0,0,0.07); transform: translateY(-3px); }
.dashboard-root .challenge-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
.dashboard-root .challenge-title { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin-bottom: 5px; }
.dashboard-root .challenge-desc { font-size: 0.75rem; color: #718096; line-height: 1.6; }
@media (max-width: 900px) {
  .dashboard-root .grid4 { grid-template-columns: repeat(2, 1fr); }
  .dashboard-root .grid3 { grid-template-columns: repeat(2, 1fr); }
  .dashboard-root .grid2 { grid-template-columns: 1fr; }
  .dashboard-root .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-root .hero { padding: 48px 24px 40px; }
  .dashboard-root .shap-lbl { min-width: 110px; }
}
@media (max-width: 540px) {
  .dashboard-root .grid4 { grid-template-columns: repeat(2, 1fr); }
  .dashboard-root .grid3 { grid-template-columns: 1fr; }
  .dashboard-root .stat-strip { gap: 8px; }
  .dashboard-root .stat-cell { padding: 12px 16px; min-width: 90px; }
  .dashboard-root .stat-v { font-size: 1.3rem; }
  .dashboard-root .hero h1 { font-size: 1.7rem; }
  .dashboard-root .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-root .page { padding: 32px 16px 48px; }
}
`;


/* ─── design tokens ─── */
const T = {
  teal:'#0d7a5f', tealL:'rgba(13,122,95,.12)',
  blue:'#1a5fa8', blueL:'rgba(26,95,168,.12)',
  amber:'#b85e0c', amberL:'rgba(184,94,12,.15)',
  red:'#d94f4f', redL:'rgba(217,79,79,.12)',
  purple:'#6b3fa0',
  grid:'rgba(0,0,0,.06)', tick:'#9a9790',
  font:{ family:"'DM Sans', sans-serif", size: 11 },
};

/* ─── sub-components ─── */
const MetricCard = ({ value, label, accent }: { value:string; label:string; accent:string }) => (
  <div className={`metric-card mc-${accent}`}>
    <div className="mv">{value}</div>
    <div className="ml">{label}</div>
  </div>
);
const ModelRow = ({ name, role, badge, badgeVariant }: { name:string; role:string; badge:string; badgeVariant:string }) => (
  <div className="model-row">
    <div><div className="model-n">{name}</div><div className="model-r">{role}</div></div>
    <span className={`model-badge mb-${badgeVariant}`}>{badge}</span>
  </div>
);
const ShapRow = ({ label, width, value, positive=false }: { label:string; width:number; value:number; positive?:boolean }) => (
  <div className="shap-row">
    <span className="shap-lbl">{label}</span>
    <div className="shap-track">
      <div className="shap-fill" style={{ width:`${width}%`, background: positive ? 'linear-gradient(90deg,#e05555,#c03030)' : 'linear-gradient(90deg,#1d9e75,#0d7a5f)' }} />
    </div>
    <span className="shap-val" style={{ color: positive ? T.red : T.teal }}>{positive ? '+' : '−'}{value}%</span>
  </div>
);
const RecItem = ({ icon, title, body }: { icon:string; title:string; body:string }) => (
  <div className="rec-item"><div className="rec-icon">{icon}</div><div><div className="rec-title">{title}</div><div className="rec-body">{body}</div></div></div>
);
const ArchRow = ({ num, title, desc }: { num:string; title:string; desc:string }) => (
  <div className="arch-row"><div className="arch-num">{num}</div><div><div className="arch-title">{title}</div><div className="arch-desc">{desc}</div></div></div>
);
const ChallengeRow = ({ icon, title, desc }: { icon:string; title:string; desc:string }) => (
  <div className="challenge-row"><div className="challenge-icon">{icon}</div><div><div className="challenge-title">{title}</div><div className="challenge-desc">{desc}</div></div></div>
);
const SectionHeader = ({ eyebrow, title, highlight }: { eyebrow:string; title:string; highlight:string }) => (
  <div className="section-hd"><div className="eyebrow">{eyebrow}</div><h2>{title} <span>{highlight}</span></h2></div>
);
const Divider = () => <div className="divider" />;

/* ─── chart configs (unchanged) ─── */
const chartDefaults = { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } } };

const classifierData = {
  labels: ['XGBoost','Random Forest','LightGBM','Logistic Regression'],
  datasets: [
    { label:'Accuracy (%)', data:[94,91,93,82], backgroundColor:T.teal, borderRadius:4, barPercentage:0.25, categoryPercentage:0.85 } as ChartDataset<'bar',number[]>,
    { label:'F1-Score (%)', data:[92,89,91,80], backgroundColor:T.blue, borderRadius:4, barPercentage:0.25, categoryPercentage:0.85 } as ChartDataset<'bar',number[]>,
    { type:'line' as const, label:'ROC-AUC ×100', data:[96,93,95,87], borderColor:T.amber, backgroundColor:'transparent', borderWidth:2, tension:0.4, pointBackgroundColor:T.amber, pointRadius:5, yAxisID:'y' } as ChartDataset<'line',number[]>,
  ],
};
const classifierOptions = { ...chartDefaults, plugins:{ ...chartDefaults.plugins, tooltip:{ callbacks:{ label:(ctx:any)=>`${ctx.dataset.label}: ${ctx.raw}` } } }, scales:{ x:{ ticks:{ font:T.font, color:T.tick }, grid:{ display:false } }, y:{ min:70, max:100, ticks:{ font:T.font, color:T.tick, callback:(v:any)=>v+'%' }, grid:{ color:T.grid } } } };

const progressionData = {
  labels:['Now','3 Mo','6 Mo','12 Mo'],
  datasets:[
    { label:'Risk score (%)', data:[28,47,68,91], borderColor:T.teal, backgroundColor:T.tealL, fill:true, tension:0.45, pointBackgroundColor:[T.teal,T.amber,T.amber,T.red], pointRadius:[5,5,5,6], pointBorderColor:'#fff', pointBorderWidth:2, borderWidth:2.5 },
    { label:'High-risk threshold', data:[80,80,80,80], borderColor:'rgba(217,79,79,.5)', borderDash:[6,4], borderWidth:1.5, fill:false, pointRadius:0 },
  ],
};
const progressionOptions = { ...chartDefaults, plugins:{ ...chartDefaults.plugins, tooltip:{ callbacks:{ label:(ctx:any)=>`${ctx.dataset.label}: ${ctx.raw}%` } } }, scales:{ x:{ ticks:{ font:T.font, color:T.tick }, grid:{ display:false } }, y:{ min:0, max:100, ticks:{ font:T.font, color:T.tick, callback:(v:any)=>v+'%' }, grid:{ color:T.grid } } } };

const hba1cData = {
  labels:['Baseline','3 Mo','6 Mo','9 Mo','12 Mo'],
  datasets:[
    { label:'HbA1c (%)', data:[5.8,6.2,6.9,7.4,7.9], borderColor:T.blue, backgroundColor:T.blueL, fill:true, tension:0.45, pointBackgroundColor:T.blue, pointRadius:4, pointBorderColor:'#fff', pointBorderWidth:2, borderWidth:2.5 },
    { label:'Diabetes threshold (6.5%)', data:[6.5,6.5,6.5,6.5,6.5], borderColor:'rgba(217,79,79,.6)', borderDash:[6,4], borderWidth:1.5, fill:false, pointRadius:0 },
  ],
};
const hba1cOptions = { ...chartDefaults, plugins:{ ...chartDefaults.plugins, tooltip:{ callbacks:{ label:(ctx:any)=>`${ctx.dataset.label}: ${ctx.raw}%` } } }, scales:{ x:{ ticks:{ font:T.font, color:T.tick }, grid:{ display:false } }, y:{ min:5, max:9, ticks:{ font:T.font, color:T.tick, callback:(v:any)=>v+'%' }, grid:{ color:T.grid } } } };

const shapBarData = {
  labels:['HbA1c Level','Sugar Intake','Sedentary Hours','Family History','Sleep Quality','BMI in Range'],
  datasets:[{ label:'SHAP impact (%)', data:[35,22,15,12,-8,-5], backgroundColor:(ctx:any)=>(ctx.raw as number)>=0?'rgba(184,94,12,.8)':'rgba(13,122,95,.8)', borderRadius:4, borderSkipped:false as const }],
};
const shapBarOptions = { ...chartDefaults, indexAxis:'y' as const, plugins:{ ...chartDefaults.plugins, tooltip:{ callbacks:{ label:(ctx:any)=>{ const v=ctx.raw as number; return `Impact: ${v>0?'+':''}${v}%`; } } } }, scales:{ x:{ ticks:{ font:T.font, color:T.tick, callback:(v:any)=>(Number(v)>0?'+':'')+v+'%' }, grid:{ color:T.grid } }, y:{ ticks:{ font:T.font, color:T.tick }, grid:{ display:false } } } };

const classDistData = {
  labels:['Healthy','Pre-diabetic','Diabetic','High-risk'],
  datasets:[{ data:[48,28,16,8], backgroundColor:[T.teal,'#e07b1f',T.blue,T.red], borderColor:'#fff', borderWidth:3, hoverOffset:4 }],
};
const classDistOptions = { ...chartDefaults, plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:(ctx:any)=>`${ctx.label}: ${ctx.raw}%` } } }, cutout:'64%' };

const techStack: [string,string][] = [
  ['Python 3.11','#0d7a5f'],['FastAPI','#0d7a5f'],['React.js','#1a5fa8'],['PostgreSQL','#1a5fa8'],
  ['Scikit-learn','#b85e0c'],['TensorFlow','#b85e0c'],['XGBoost','#b85e0c'],['LightGBM','#0d7a5f'],
  ['SHAP','#6b3fa0'],['LIME','#6b3fa0'],['Recharts','#1a5fa8'],['Docker','#555'],
];

const datasetList = [
  { name:'NHANES', purpose:'Primary — multimodal risk classification', tags:[{label:'Clinical',cls:'tag-t'},{label:'Lifestyle',cls:'tag-t'}] },
  { name:'CDC BRFSS', purpose:'Behavioural feature augmentation', tags:[{label:'Behavioural',cls:'tag-a'}] },
  { name:'PIMA Diabetes', purpose:'Benchmark classification baseline', tags:[{label:'Clinical',cls:'tag-b'}] },
  { name:'MIMIC-IV', purpose:'Longitudinal clinical reference', tags:[{label:'Temporal',cls:'tag-p'}] },
  { name:'Synthetic (sim)', purpose:'Forecasting model training sequences', tags:[{label:'Time-series',cls:'tag-a'}] },
];

/* ─── Main Dashboard ─── */
const DiabetesDashboard: React.FC = () => (
  <>
  <PremiumNav />
  <section id="ai-diabetes-model" style={{ background:'#fafbfc' }}>
    <style>{STYLES}</style>
    <div className="dashboard-root">

      {/* Hero */}
      <div className="hero">
        <div className="hero-eye">HealthNexus · FYP AI Model</div>
        <h1>Explainable Diabetes<br /><em>Progression Forecasting</em></h1>
        <p className="hero-sub">A multimodal AI system combining clinical, lifestyle, and behavioural data to predict diabetes risk and forecast disease progression — with full SHAP/LIME transparency.</p>
        <div className="stat-strip">
          {[{v:'94%',l:'Target Accuracy'},{v:'0.96',l:'ROC-AUC'},{v:'12 Mo',l:'Forecast Horizon'},{v:'XAI',l:'Explainable AI'}].map(s=>(
            <div className="stat-cell" key={s.l}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
          ))}
        </div>
      </div>

      <div className="page">

        {/* ── NEW: Audio Slideshow Section ── */}
        <div className="section">
          <SectionHeader eyebrow="Research Presentation" title="Voice Narrated" highlight="Visual Overview" />
          <AudioSlideshow />
        </div>

        <Divider />

        {/* Metrics */}
        <div className="section">
          <SectionHeader eyebrow="Classification Performance" title="Model" highlight="Evaluation Metrics" />
          <div className="grid4">
            <MetricCard value="94%"  label="Accuracy"        accent="teal" />
            <MetricCard value="0.96" label="ROC-AUC"         accent="blue" />
            <MetricCard value="92%"  label="F1-Score"        accent="teal" />
            <MetricCard value="91%"  label="Recall"          accent="amber" />
          </div>
          <div className="grid3">
            <MetricCard value="0.21" label="RMSE (Forecasting)" accent="purple" />
            <MetricCard value="0.14" label="MAE (Forecasting)"  accent="amber" />
            <MetricCard value="4.3%" label="MAPE (Forecasting)" accent="blue" />
          </div>
        </div>

        <Divider />

        {/* Classifier benchmark */}
        <div className="section">
          <SectionHeader eyebrow="Model Comparison" title="Classifier" highlight="Benchmark Results" />
          <div className="card">
            <div className="legend">
              <div className="legend-item"><div className="legend-dot" style={{background:T.teal}}/>Accuracy</div>
              <div className="legend-item"><div className="legend-dot" style={{background:T.blue}}/>F1-Score</div>
              <div className="legend-item"><div className="legend-dot" style={{background:T.amber}}/>ROC-AUC</div>
            </div>
            <div style={{height:280}}><Bar data={classifierData as any} options={classifierOptions} /></div>
          </div>
        </div>

        <Divider />

        {/* Forecasting */}
        <div className="section">
          <SectionHeader eyebrow="Temporal Forecasting" title="Diabetes Risk" highlight="Progression Trajectory" />
          <div className="grid2">
            <div className="card">
              <p className="chart-label">Projected diabetes risk score over 12 months</p>
              <div style={{height:240}}><Line data={progressionData} options={progressionOptions} /></div>
            </div>
            <div className="card">
              <p className="chart-label">Forecasted HbA1c trend (%) vs safe clinical threshold</p>
              <div style={{height:240}}><Line data={hba1cData} options={hba1cOptions} /></div>
            </div>
          </div>
        </div>

        <Divider />

        {/* SHAP */}
        <div className="section">
          <SectionHeader eyebrow="SHAP / LIME · XAI" title="Feature" highlight="Impact Analysis" />
          <div className="grid2">
            <div className="card">
              <p className="chart-label">Top contributing features (SHAP value magnitude)</p>
              <div style={{height:260}}><Bar data={shapBarData as any} options={shapBarOptions} /></div>
            </div>
            <div className="card">
              <ShapRow label="HbA1c Level (6.8%)"     width={100} value={35} positive />
              <ShapRow label="High Sugar Intake"       width={63}  value={22} positive />
              <ShapRow label="Sedentary Hours (9h/d)"  width={43}  value={15} positive />
              <ShapRow label="Family History"          width={34}  value={12} positive />
              <ShapRow label="Sleep Quality (7.5 hrs)" width={23}  value={8}  positive={false} />
              <ShapRow label="BMI within range"        width={14}  value={5}  positive={false} />
              <div className="shap-legend">
                <span><span className="dot" style={{background:T.red}}/>Increases risk</span>
                <span><span className="dot" style={{background:T.teal}}/>Reduces risk</span>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Models + Recs */}
        <div className="section">
          <SectionHeader eyebrow="AI Models" title="Proposed" highlight="Model Architecture" />
          <div className="grid2">
            <div>
              <p className="sub-label">Classification models</p>
              <ModelRow name="XGBoost"             role="Primary risk classifier — 94% accuracy" badge="Primary"      badgeVariant="primary" />
              <ModelRow name="Random Forest"       role="Ensemble baseline — 91% accuracy"       badge="Ensemble"     badgeVariant="primary" />
              <ModelRow name="LightGBM"            role="Fast gradient boosting — 93% accuracy"  badge="Ensemble"     badgeVariant="primary" />
              <ModelRow name="Logistic Regression" role="Interpretability baseline"              badge="Baseline"     badgeVariant="secondary" />
              <p className="sub-label" style={{marginTop:16}}>Forecasting models</p>
              <ModelRow name="Stacked LSTM"  role="12-month progression forecasting"  badge="Primary"      badgeVariant="primary" />
              <ModelRow name="GRU"           role="Shorter-window trajectory"          badge="Secondary"    badgeVariant="secondary" />
              <ModelRow name="Transformer"   role="Attention-based baseline"           badge="Experimental" badgeVariant="secondary" />
              <p className="sub-label" style={{marginTop:16}}>Explainability</p>
              <ModelRow name="SHAP" role="Global & local feature attribution" badge="XAI" badgeVariant="xai" />
              <ModelRow name="LIME" role="Local surrogate explanations"        badge="XAI" badgeVariant="xai" />
            </div>
            <div>
              <p className="sub-label">System pipeline</p>
              <ArchRow num="01" title="Data ingestion & fusion"          desc="Clinical records, lifestyle logs, and behavioural tracking merged into a unified patient feature vector." />
              <ArchRow num="02" title="Risk classification engine"       desc="XGBoost ensemble classifies: Healthy / Pre-diabetic / Diabetic / High-Risk with SHAP attribution scores." />
              <ArchRow num="03" title="Temporal progression forecasting" desc="Stacked LSTM projects HbA1c and glucose trends at 3, 6, and 12-month horizons." />
              <ArchRow num="04" title="XAI & recommendation layer"       desc="SHAP/LIME explanations surface top risk drivers and auto-generate personalised interventions." />
              <p className="sub-label" style={{marginTop:16}}>Personalised recommendations</p>
              <RecItem icon="🥗" title="Dietary intervention"  body="Reduce refined sugar by 40% — SHAP identified it as +22% risk contributor." />
              <RecItem icon="🏃" title="Physical activity plan" body="150 min/week aerobic exercise to offset +15% sedentary lifestyle factor." />
              <RecItem icon="🩺" title="Clinical follow-up"     body="HbA1c re-test within 3 months — before the 6-month high-risk threshold crossing." />
            </div>
          </div>
        </div>

        <Divider />

        {/* Datasets */}
        <div className="section">
          <SectionHeader eyebrow="Datasets" title="Candidate" highlight="Dataset Strategy" />
          <div className="card" style={{padding:0, overflow:'hidden'}}>
            <table className="ds-table">
              <thead><tr><th>Dataset</th><th>Purpose</th><th>Type</th></tr></thead>
              <tbody>
                {datasetList.map(d=>(
                  <tr key={d.name}>
                    <td><span className="dn">{d.name}</span></td>
                    <td>{d.purpose}</td>
                    <td>{d.tags.map(t=><span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* Class dist + Tech */}
        <div className="section">
          <SectionHeader eyebrow="Risk Cohorts" title="Class" highlight="Distribution Analysis" />
          <div className="grid2">
            <div className="card">
              <p className="chart-label">Target class distribution (training dataset)</p>
              <div style={{height:220}}><Doughnut data={classDistData} options={classDistOptions} /></div>
              <div className="legend" style={{marginTop:16,justifyContent:'center'}}>
                {([['Healthy',T.teal],['Pre-diabetic','#e07b1f'],['Diabetic',T.blue],['High-risk',T.red]] as [string,string][]).map(([l,c])=>(
                  <div className="legend-item" key={l}><div className="legend-dot" style={{background:c}}/>{l}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <p className="chart-label">Technology stack</p>
              <div className="tech-grid">
                {techStack.map(([name,color])=>(
                  <div className="tech-item" key={name}><span className="tech-dot" style={{background:color}}/>{name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Challenges */}
        <div className="section">
          <SectionHeader eyebrow="Risk Factors" title="Expected" highlight="Challenges" />
          <div className="grid2">
            <ChallengeRow icon="🗄️" title="Missing data"            desc="Users may not provide complete health records — requires imputation strategies and robust handling of incomplete inputs." />
            <ChallengeRow icon="⚖️" title="Class imbalance"         desc="Fewer diabetic samples than healthy — addressed via SMOTE, oversampling, and weighted loss functions." />
            <ChallengeRow icon="📈" title="Behaviour variability"    desc="Human lifestyle patterns change frequently, making long-range forecasting inherently uncertain." />
            <ChallengeRow icon="👁️" title="Explainability trade-off" desc="Balancing deep learning accuracy with healthcare transparency requirements from SHAP/LIME integration." />
          </div>
        </div>

      </div>
    </div>
  </section>
  <Footer />
  </>
);

export default DiabetesDashboard;