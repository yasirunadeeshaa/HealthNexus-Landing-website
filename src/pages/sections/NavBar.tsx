import { useState, useEffect, useRef } from 'react';
import { Zap, ChevronDown, Brain, Sparkles, ArrowRight, Activity, Shield, Clock, Video, CalendarCheck, Stethoscope, Heart, UserCheck, Building2, Dumbbell, FlaskConical, CreditCard, FileText, UserRound } from 'lucide-react';
import logo from '../../assets/logo.png';

interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const navItems: NavItem[] = [
  { href: '/#detailed-features', label: 'Capabilities', hasDropdown: true },
  { href: '/#benefits',          label: 'Benefits', hasDropdown: true },
  { href: '/#user-journey',      label: 'How it Works', hasDropdown: true },
  { href: '/#ai-models',         label: 'AI Models', hasDropdown: true },
  { href: '/#home-visit',        label: 'Home Visit', hasDropdown: true },
  { href: '/features',           label: 'Features', hasDropdown: true },
  { href: '/comparison',         label: 'Comparison' },
  { href: '/patient-demo',       label: 'Health History' },
  { href: '/#health-tools',      label: 'Tools' },
];

const aiModels = [
  {
    id: 'HealthNexusDiabetesAI',
    href: '/diabetes-prediction',
    icon: Brain,
    name: 'HealthNexus DiabetesAI',
    tag: 'Clinical',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Predict diabetes risk with 94.7% accuracy using EHR data, lifestyle factors & advanced ML algorithms.',
    stats: [
      { icon: Activity, label: '94.7% accuracy' },
      { icon: Shield, label: 'HIPAA certified' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
    glow: 'rgba(13,122,95,.18)',
  },
  {
    id: 'DiseaseRiskPredictor',
    href: '/disease-risk-prediction',
    icon: Sparkles,
    name: 'Disease Risk Predictor',
    tag: 'Operations',
    tagColor: '#1a5fa8',
    tagBg: 'rgba(26,95,168,.12)',
    desc: 'Forecast patient disease risk with 88% accuracy using claims data, social determinants & ensemble modeling.',
    stats: [
      { icon: Clock, label: '60% less wait' },
      { icon: Activity, label: 'Real-time sync' },
    ],
    accent: 'linear-gradient(135deg, #1a5fa8 0%, #6b3fa0 100%)',
    glow: 'rgba(26,95,168,.18)',
  },
];

const featureItems = [
  {
    id: 'telemedicine',
    href: '/features',
    icon: Video, // import Video from lucide-react
    name: 'Telemedicine',
    tag: 'Virtual Care',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,.12)',
    desc: 'Connect with licensed doctors via HD video consultations from anywhere, anytime.',
    stats: [
      { icon: Clock, label: '24/7 available' },
      { icon: Shield, label: 'Encrypted' },
    ],
    accent: 'linear-gradient(135deg, #7c3aed 0%, #1a5fa8 100%)',
  },
  {
    id: 'appointment',
    href: '/features',
    icon: CalendarCheck, // import CalendarCheck from lucide-react
    name: 'Appointment Booking',
    tag: 'Scheduling',
    tagColor: '#1a5fa8',
    tagBg: 'rgba(26,95,168,.12)',
    desc: 'Smart scheduling with real-time availability, reminders & instant confirmations.',
    stats: [
      { icon: Activity, label: 'Real-time slots' },
      { icon: Clock, label: 'Auto reminders' },
    ],
    accent: 'linear-gradient(135deg, #1a5fa8 0%, #0d7a5f 100%)',
  },
  {
    id: 'find-doctors',
    href: '/features',
    icon: Stethoscope, // import Stethoscope from lucide-react
    name: 'Find Doctors',
    tag: 'Discovery',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Search verified specialists by location, specialty, ratings & insurance coverage.',
    stats: [
      { icon: Activity, label: '500+ doctors' },
      { icon: Shield, label: 'Verified profiles' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #7c3aed 100%)',
  },
];

const benefitItems = [
  {
    id: 'vendor-benefits',
    href: '#vendorbenefits',
    icon: Building2,
    name: 'Vendor Benefits',
    tag: 'Business',
    tagColor: '#d97706',
    tagBg: 'rgba(217,119,6,.12)',
    desc: 'Streamline operations, reduce costs & grow your healthcare business with smart automation.',
    stats: [
      { icon: Activity, label: '40% cost savings' },
      { icon: Shield, label: 'ROI guaranteed' },
    ],
    accent: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
  },
  {
    id: 'doctor-benefits',
    href: '#benefits',
    icon: UserCheck,
    name: 'Doctor Benefits',
    tag: 'Clinical',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Spend less time on admin, more time with patients. AI-assisted workflows built for clinicians.',
    stats: [
      { icon: Clock, label: '3x faster notes' },
      { icon: Activity, label: 'Smart scheduling' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  },
  {
    id: 'patient-benefits',
    href: '#benefits',
    icon: Heart,
    name: 'Patient Benefits',
    tag: 'Care',
    tagColor: '#e11d48',
    tagBg: 'rgba(225,29,72,.12)',
    desc: 'Get faster care, transparent pricing & personalized health insights — all in one place.',
    stats: [
      { icon: Clock, label: '60% less wait' },
      { icon: Shield, label: 'Data private' },
    ],
    accent: 'linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)',
  },
];

const homeVisitItems = [
  {
    id: 'doctor-consultation',
    href: '#homevisit',
    icon: Stethoscope,
    name: 'Doctor Consultation',
    tag: 'Medical',
    tagColor: '#1a5fa8',
    tagBg: 'rgba(26,95,168,.12)',
    desc: 'Qualified doctors visit your home for in-person consultations, diagnosis & prescriptions.',
    stats: [
      { icon: Clock, label: 'Same-day visits' },
      { icon: Shield, label: 'Verified doctors' },
    ],
    accent: 'linear-gradient(135deg, #1a5fa8 0%, #0d7a5f 100%)',
  },
  {
    id: 'nursing-care',
    href: '#homevisit',
    icon: Heart,
    name: 'Nursing Care',
    tag: 'Home Care',
    tagColor: '#e11d48',
    tagBg: 'rgba(225,29,72,.12)',
    desc: 'Professional nurses for wound care, injections, IV therapy & post-surgery recovery at home.',
    stats: [
      { icon: Activity, label: '24/7 available' },
      { icon: Shield, label: 'Certified nurses' },
    ],
    accent: 'linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)',
  },
  {
    id: 'lab-sample-collection',
    href: '#homevisit',
    icon: FlaskConical,
    name: 'Lab Sample Collection',
    tag: 'Diagnostics',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,.12)',
    desc: 'Certified lab technicians collect blood, urine & other samples at your doorstep.',
    stats: [
      { icon: Clock, label: 'Fast results' },
      { icon: Shield, label: 'ISO certified' },
    ],
    accent: 'linear-gradient(135deg, #7c3aed 0%, #1a5fa8 100%)',
  },
  {
    id: 'physiotherapy',
    href: '#homevisit',
    icon: Dumbbell,
    name: 'Physiotherapy',
    tag: 'Rehabilitation',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Licensed physiotherapists deliver personalized rehab sessions & pain management at home.',
    stats: [
      { icon: Activity, label: 'Custom plans' },
      { icon: Clock, label: 'Flexible timing' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #d97706 100%)',
  },
];

const capabilityItems = [
  {
    id: 'appointments',
    href: '#capabilities',
    icon: CalendarCheck,
    name: 'Appointments',
    tag: 'Scheduling',
    tagColor: '#1a5fa8',
    tagBg: 'rgba(26,95,168,.12)',
    desc: 'Smart appointment booking with real-time availability, reminders & instant confirmations.',
    stats: [
      { icon: Clock, label: 'Real-time slots' },
      { icon: Shield, label: 'Auto reminders' },
    ],
    accent: 'linear-gradient(135deg, #1a5fa8 0%, #0d7a5f 100%)',
  },
  {
    id: 'telemedicine',
    href: '#capabilities',
    icon: Video,
    name: 'Telemedicine',
    tag: 'Virtual Care',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,.12)',
    desc: 'Connect with licensed doctors via HD video consultations from anywhere, anytime.',
    stats: [
      { icon: Clock, label: '24/7 available' },
      { icon: Shield, label: 'Encrypted' },
    ],
    accent: 'linear-gradient(135deg, #7c3aed 0%, #1a5fa8 100%)',
  },
  {
    id: 'health-record',
    href: '#capabilities-record',
    icon: FileText,
    name: 'Health Records',
    tag: 'Records',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Secure, centralized health records accessible to you and your care team anytime.',
    stats: [
      { icon: Shield, label: 'HIPAA secure' },
      { icon: Activity, label: 'Full history' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #7c3aed 100%)',
  },
  {
    id: 'payments',
    href: '#capabilities',
    icon: CreditCard,
    name: 'Payments',
    tag: 'Billing',
    tagColor: '#d97706',
    tagBg: 'rgba(217,119,6,.12)',
    desc: 'Seamless payments, insurance claims & transparent billing — all in one dashboard.',
    stats: [
      { icon: Shield, label: 'Secure gateway' },
      { icon: Activity, label: 'Multi-method' },
    ],
    accent: 'linear-gradient(135deg, #d97706 0%, #e11d48 100%)',
  },
];

const howItWorksItems = [
  {
    id: 'patient-journey',
    href: '#user-journey',
    icon: UserRound,
    name: 'Patient Journey',
    tag: 'For Patients',
    tagColor: '#1a5fa8',
    tagBg: 'rgba(26,95,168,.12)',
    desc: 'From booking to recovery — experience seamless, guided healthcare every step of the way.',
    stats: [
      { icon: Clock, label: 'Quick onboarding' },
      { icon: Shield, label: 'Always supported' },
    ],
    accent: 'linear-gradient(135deg, #1a5fa8 0%, #7c3aed 100%)',
  },
  {
    id: 'doctor-journey',
    href: '#user-journey',
    icon: Stethoscope,
    name: 'Doctor Journey',
    tag: 'For Doctors',
    tagColor: '#0d7a5f',
    tagBg: 'rgba(13,122,95,.12)',
    desc: 'Onboard, manage patients & deliver care efficiently with AI-powered clinical tools.',
    stats: [
      { icon: Activity, label: 'Smart workflows' },
      { icon: Shield, label: 'Verified profile' },
    ],
    accent: 'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --pnav-height: 88px;
    --pnav-height-elevated: 62px;
    --pnav-accent-1: #1a5fa8;
    --pnav-accent-2: #0d7a5f;
    --pnav-accent-3: #667eea;
    --pnav-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --pnav-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --pnav-glass-bg: rgba(255,255,255,0.08);
    --pnav-glass-bg-elevated: rgba(255,255,255,0.9);
    --pnav-border: rgba(255,255,255,0.16);
    --pnav-border-elevated: rgba(26,95,168,0.1);
    --pnav-link-color: rgba(26,32,44,0.78);
    --pnav-link-hover: #1a5fa8;
    --pnav-shadow-elevated:
      0 8px 40px rgba(26,95,168,0.09),
      0 2px 8px rgba(0,0,0,0.05),
      0 0 0 0.5px rgba(26,95,168,0.08);
    --pnav-transition: 0.36s cubic-bezier(0.4,0,0.2,1);
    --font-display: 'Sora', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  /* ── Shell ── */
  .pnav-header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 999;
    height: var(--pnav-height);
    display: flex;
    flex-direction: column;
    background: var(--pnav-glass-bg);
    backdrop-filter: blur(28px) saturate(200%);
    -webkit-backdrop-filter: blur(28px) saturate(200%);
    border-bottom: 0.5px solid var(--pnav-border);
    transition:
      height var(--pnav-transition),
      background var(--pnav-transition),
      border-color var(--pnav-transition),
      box-shadow var(--pnav-transition);
    font-family: var(--font-body);
  }

  .pnav-elevated {
    height: var(--pnav-height-elevated);
    background: var(--pnav-glass-bg-elevated);
    border-color: var(--pnav-border-elevated);
    box-shadow: var(--pnav-shadow-elevated);
  }

  .pnav-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% -10%,
      rgba(26,95,168,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Progress bar ── */
  .pnav-progress-track {
    height: 2px;
    width: 100%;
    background: transparent;
    flex-shrink: 0;
    overflow: hidden;
  }

  .pnav-progress-fill {
    height: 100%;
    background: var(--pnav-gradient);
    background-size: 200% 100%;
    animation: progressShimmer 3s linear infinite;
    transition: width 0.1s linear;
  }

  @keyframes progressShimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  /* ── Inner layout ── */
  .pnav-inner {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 2.5rem;
    gap: 0.5rem;
    min-height: 0;
  }

  /* ── Logo ── */
  .pnav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 0.75rem;
    flex-shrink: 0;
    margin-right: 1.5rem;
  }

  .pnav-logo-mark {
    width: 88px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
  }

  .pnav-logo-mark:hover { transform: scale(1.04); }

  .brand-icon {
    width: 84px;
    height: 56px;
    object-fit: contain;
  }

  .brand-text {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.6px;
    background: var(--pnav-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: textGradient 4s ease-in-out infinite;
    white-space: nowrap;

    //     font-size: 2rem;
//     font-weight: 1000;
//     letter-spacing: -0.5px;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     background-size: 200% auto;
//     animation: textGradient 3s ease-in-out infinite;
//     margin-left: 1rem;
//     white-space: nowrap;
  }

  @keyframes textGradient {
    0%,100% { background-position: 0% center; }
    50%      { background-position: 100% center; }
  }

  /* ── Desktop links ── */
  .pnav-links {
    display: flex;
    align-items: center;
    gap: 0.05rem;
    margin: 0 auto;
  }

  .pnav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0.42rem 0.8rem;
    font-size: 0.79rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--pnav-link-color);
    text-decoration: none;
    border-radius: 10px;
    transition: color var(--pnav-transition), background var(--pnav-transition);
    white-space: nowrap;
  }

  .pnav-link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: calc(100% - 1.6rem);
    height: 1.5px;
    background: var(--pnav-gradient);
    border-radius: 2px;
    transition: transform 0.24s cubic-bezier(0.34,1.56,0.64,1);
  }

  .pnav-link:hover::after,
  .pnav-link--active::after { transform: translateX(-50%) scaleX(1); }

  .pnav-link:hover,
  .pnav-link--active { color: var(--pnav-accent-1); }

  /* ── AI Models nav item (special) ── */
  .pnav-link--ai {
    color: #0d7a5f;
    background: rgba(13,122,95,.07);
    border: 0.5px solid rgba(13,122,95,.18);
  }

  .pnav-link--ai:hover,
  .pnav-link--ai.pnav-link--active {
    color: #0d7a5f;
    background: rgba(13,122,95,.12);
  }

  .pnav-link--ai::after {
    background: linear-gradient(135deg, #0d7a5f, #1a5fa8);
  }

  .pnav-chevron {
    transition: transform 0.24s ease;
    flex-shrink: 0;
  }
  .pnav-chevron--open { transform: rotate(180deg); }

  /* ── AI Dropdown ── */
  .pnav-dropdown-wrap {
    position: relative;
  }
    .pnav-dropdown--wide {
  width: 720px;
}

  .pnav-dropdown {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
    width: 580px;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 0.5px solid rgba(26,95,168,0.12);
    border-radius: 20px;
    box-shadow:
      0 24px 64px rgba(26,95,168,0.13),
      0 4px 16px rgba(0,0,0,0.07),
      0 0 0 0.5px rgba(255,255,255,0.8) inset;
    padding: 1rem;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.22s ease,
      transform 0.26s cubic-bezier(0.34,1.56,0.64,1);
    z-index: 1000;
  }

  .pnav-dropdown::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: rgba(255,255,255,0.97);
    border-left: 0.5px solid rgba(26,95,168,0.12);
    border-top: 0.5px solid rgba(26,95,168,0.12);
    rotate: 45deg;
  }

  .pnav-dropdown--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }

  .pnav-dropdown-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.5rem 0.75rem 0.75rem;
    border-bottom: 0.5px solid rgba(26,95,168,0.08);
    margin-bottom: 0.75rem;
  }

  .pnav-dropdown-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 50px;
    background: rgba(13,122,95,.1);
    color: #0d7a5f;
    border: 0.5px solid rgba(13,122,95,.2);
  }

  .pnav-dropdown-header-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #a0aec0;
    margin-left: auto;
  }

  .pnav-dropdown-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .pnav-model-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: 14px;
    background: #f8fafc;
    border: 1px solid #e8edf3;
    text-decoration: none;
    transition:
      background 0.18s,
      border-color 0.18s,
      transform 0.18s,
      box-shadow 0.18s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .pnav-model-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.22s;
    border-radius: inherit;
  }

  .pnav-model-card:hover {
    background: #fff;
    border-color: rgba(26,95,168,0.22);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(26,95,168,0.1);
  }

  .pnav-model-card-top {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .pnav-model-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    font-size: 0;
  }

  .pnav-model-title-wrap { flex: 1; }

  .pnav-model-tag {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 50px;
    margin-bottom: 4px;
  }

  .pnav-model-name {
    font-size: 0.8rem;
    font-weight: 700;
    color: #1a202c;
    line-height: 1.3;
    font-family: var(--font-display);
  }

  .pnav-model-desc {
    font-size: 0.7rem;
    color: #718096;
    line-height: 1.55;
  }

  .pnav-model-stats {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pnav-model-stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.64rem;
    font-weight: 600;
    color: #718096;
    background: #fff;
    border: 0.5px solid #e2e8f0;
    padding: 2px 8px;
    border-radius: 50px;
  }

  .pnav-model-arrow {
    position: absolute;
    bottom: 12px;
    right: 12px;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.18s, transform 0.18s;
    color: #1a5fa8;
  }

  .pnav-model-card:hover .pnav-model-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .pnav-dropdown-footer {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 0.5px solid rgba(26,95,168,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0.5rem 0.25rem;
  }

  .pnav-dropdown-footer-text {
    font-size: 0.7rem;
    color: #a0aec0;
  }

  .pnav-dropdown-footer-link {
    font-size: 0.72rem;
    font-weight: 700;
    color: #1a5fa8;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: gap 0.18s;
  }

  .pnav-dropdown-footer-link:hover { gap: 7px; }

  /* ── CTA Cluster ── */
  .pnav-cta-cluster {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .pnav-btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 1.15rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: var(--pnav-accent-1);
    background: transparent;
    border: 1px solid rgba(26,95,168,0.28);
    border-radius: 50px;
    text-decoration: none;
    cursor: pointer;
    transition:
      background var(--pnav-transition),
      border-color var(--pnav-transition),
      transform 0.2s ease,
      box-shadow 0.2s ease;
    white-space: nowrap;
    font-family: var(--font-body);
  }

  .pnav-btn-ghost:hover {
    background: rgba(26,95,168,0.07);
    border-color: rgba(26,95,168,0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(26,95,168,0.14);
  }

  .pnav-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0.48rem 1.3rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: #fff;
    background: var(--pnav-gradient);
    background-size: 200% auto;
    border: none;
    border-radius: 50px;
    text-decoration: none;
    cursor: pointer;
    box-shadow:
      0 4px 16px rgba(26,95,168,0.28),
      0 1px 4px rgba(0,0,0,0.1);
    transition:
      background-position var(--pnav-transition),
      transform 0.2s ease,
      box-shadow 0.2s ease;
    white-space: nowrap;
    font-family: var(--font-body);
    position: relative;
    overflow: hidden;
  }

  .pnav-btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s ease;
  }

  .pnav-btn-primary:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow:
      0 8px 28px rgba(26,95,168,0.36),
      0 2px 8px rgba(0,0,0,0.12);
  }

  .pnav-btn-primary:hover::after { background: rgba(255,255,255,0.07); }

  /* ── Mobile toggler ── */
  .pnav-toggler {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    gap: 5px;
    background: transparent;
    border: 0.5px solid rgba(26,95,168,0.18);
    border-radius: 11px;
    cursor: pointer;
    padding: 0;
    transition: background var(--pnav-transition), border-color var(--pnav-transition);
    flex-shrink: 0;
  }

  .pnav-toggler:hover {
    background: rgba(26,95,168,0.06);
    border-color: rgba(26,95,168,0.35);
  }

  .pnav-bar {
    display: block;
    width: 20px;
    height: 1.5px;
    background: var(--pnav-accent-1);
    border-radius: 2px;
    transform-origin: center;
    transition:
      transform 0.36s cubic-bezier(0.68,-0.55,0.265,1.55),
      opacity 0.2s ease;
  }

  .pnav-toggler--open .pnav-bar--top { transform: rotate(45deg) translate(4.5px,4.5px); }
  .pnav-toggler--open .pnav-bar--mid { opacity: 0; transform: scaleX(0); }
  .pnav-toggler--open .pnav-bar--bot { transform: rotate(-45deg) translate(4.5px,-4.5px); }

  /* ── Mobile drawer ── */
  .pnav-drawer {
    position: fixed;
    top: var(--pnav-height);
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 0.5px solid rgba(26,95,168,0.1);
    box-shadow: 0 24px 48px rgba(0,0,0,0.09);
    padding: 1.25rem 1.5rem 1.5rem;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition:
      max-height 0.4s cubic-bezier(0.4,0,0.2,1),
      opacity 0.3s ease;
    font-family: var(--font-body);
  }

  .pnav-elevated ~ .pnav-drawer { top: var(--pnav-height-elevated); }

  .pnav-drawer--open {
    max-height: 90dvh;
    opacity: 1;
    pointer-events: auto;
    overflow-y: auto;
  }

  .pnav-drawer-links {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 1rem;
  }

  .pnav-drawer-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: var(--pnav-link-color);
    text-decoration: none;
    border-radius: 12px;
    border: 0.5px solid transparent;
    transition:
      background var(--pnav-transition),
      color var(--pnav-transition),
      border-color var(--pnav-transition),
      transform 0.2s ease;
    animation: drawerSlideIn 0.32s both;
  }

  @keyframes drawerSlideIn {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .pnav-drawer-link:hover {
    background: rgba(26,95,168,0.05);
    border-color: rgba(26,95,168,0.12);
    color: var(--pnav-accent-1);
    transform: translateX(3px);
  }

  .pnav-drawer-link--active {
    background: rgba(26,95,168,0.07);
    border-color: rgba(26,95,168,0.18);
    color: var(--pnav-accent-1);
  }

  .pnav-drawer-num {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--pnav-accent-1);
    opacity: 0.45;
    min-width: 20px;
  }

  /* AI models mobile section */
  .pnav-drawer-ai-section {
    margin: 0.75rem 0 1rem;
    padding: 1rem;
    background: #f8fafc;
    border: 0.5px solid rgba(26,95,168,0.1);
    border-radius: 16px;
  }

  .pnav-drawer-ai-label {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #0d7a5f;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pnav-drawer-ai-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pnav-drawer-ai-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: #fff;
    border: 0.5px solid #e2e8f0;
    border-radius: 12px;
    text-decoration: none;
    transition: border-color 0.18s, transform 0.18s;
  }

  .pnav-drawer-ai-card:hover {
    border-color: rgba(26,95,168,0.25);
    transform: translateX(3px);
  }

  .pnav-drawer-ai-card-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
  }

  .pnav-drawer-ai-card-text { flex: 1; }
  .pnav-drawer-ai-card-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 2px;
  }
  .pnav-drawer-ai-card-desc {
    font-size: 0.68rem;
    color: #a0aec0;
  }

  .pnav-drawer-footer {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding-top: 1rem;
    border-top: 0.5px solid rgba(26,95,168,0.08);
  }

  .pnav-btn--full {
    width: 100%;
    padding: 0.72rem 1rem;
    font-size: 0.88rem;
    justify-content: center;
  }

  /* ── Demo modal ── */
  .demo-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(10,14,30,0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.22s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .demo-modal {
    position: relative;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(28px) saturate(200%);
    -webkit-backdrop-filter: blur(28px) saturate(200%);
    border: 1px solid rgba(26,95,168,0.15);
    border-radius: 26px;
    padding: 2.5rem 2.25rem 2rem;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow:
      0 32px 80px rgba(26,95,168,0.15),
      0 8px 24px rgba(0,0,0,0.08),
      0 0 0 0.5px rgba(255,255,255,0.7) inset;
    animation: modalSlideUp 0.32s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
    font-family: var(--font-body);
  }

  .demo-modal::before {
    content: '';
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    height: 240px;
    background: var(--pnav-gradient);
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.09;
    pointer-events: none;
  }

  .demo-modal-icon {
    width: 68px;
    height: 52px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.1rem;
  }

  .demo-modal-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 50px;
    background: rgba(13,122,95,.1);
    color: #0d7a5f;
    border: 0.5px solid rgba(13,122,95,.22);
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .demo-modal-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a202c;
    letter-spacing: -0.4px;
    line-height: 1.2;
    margin: 0 0 0.75rem;
  }

  .demo-modal-body {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.75;
    margin: 0 0 1.75rem;
    padding: 0 0.25rem 0 14px;
    border-left: 2.5px solid transparent;
    border-image: linear-gradient(180deg, #0d7a5f, #1a5fa8) 1;
    text-align: left;
  }

  .demo-modal-btn {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: #fff;
    background: var(--pnav-gradient);
    background-size: 200% auto;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(26,95,168,0.32);
    transition:
      background-position 0.4s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
    font-family: var(--font-body);
  }

  .demo-modal-btn:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(26,95,168,0.4);
  }

  .demo-modal-dismiss {
    display: block;
    margin-top: 0.8rem;
    font-size: 0.78rem;
    color: #94a3b8;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
    font-family: var(--font-body);
  }

  .demo-modal-dismiss:hover { color: #1a5fa8; }

  @keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Responsive ── */
  @media (max-width: 1023px) {
    .pnav-links, .pnav-cta-cluster { display: none; }
    .pnav-toggler { display: flex; margin-left: auto; }
  }

  @media (min-width: 1024px) { .pnav-drawer { display: none; } }

  @media (max-width: 480px) {
    .pnav-inner { padding: 0 1rem; }
    .brand-text { font-size: 1.2rem; }
    .pnav-logo-mark { width: 64px; height: 44px; }
    .brand-icon { width: 60px; height: 40px; }
  }

  /* ── Focus / Accessibility ── */
  .pnav-link:focus-visible,
  .pnav-btn-ghost:focus-visible,
  .pnav-btn-primary:focus-visible,
  .pnav-drawer-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26,95,168,0.28);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

const PremiumNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const featuresDropdownRef = useRef<HTMLDivElement>(null);
  const [benefitsDropdownOpen, setBenefitsDropdownOpen] = useState(false);
  const benefitsDropdownRef = useRef<HTMLDivElement>(null);
  const [homeVisitDropdownOpen, setHomeVisitDropdownOpen] = useState(false);
  const homeVisitDropdownRef = useRef<HTMLDivElement>(null);
  const [capabilitiesDropdownOpen, setCapabilitiesDropdownOpen] = useState(false);
  const capabilitiesDropdownRef = useRef<HTMLDivElement>(null);
  const [howItWorksDropdownOpen, setHowItWorksDropdownOpen] = useState(false);
  const howItWorksDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setElevated(scrollY > 60);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveLink(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAiDropdownOpen(false);
      }
      if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(e.target as Node)) {
        setFeaturesDropdownOpen(false);
      }
      if (benefitsDropdownRef.current && !benefitsDropdownRef.current.contains(e.target as Node)) {
        setBenefitsDropdownOpen(false);
      }
      if (homeVisitDropdownRef.current && !homeVisitDropdownRef.current.contains(e.target as Node)) {
        setHomeVisitDropdownOpen(false);
      }
      if (capabilitiesDropdownRef.current && !capabilitiesDropdownRef.current.contains(e.target as Node)) {
        setCapabilitiesDropdownOpen(false);
      }
      if (howItWorksDropdownRef.current && !howItWorksDropdownRef.current.contains(e.target as Node)) {
        setHowItWorksDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      <header className={`pnav-header ${elevated ? 'pnav-elevated' : ''}`}>
        {/* Progress bar */}
        <div className="pnav-progress-track">
          <div className="pnav-progress-fill" style={{ width: `${scrollProgress}%` }} />
        </div>

        <div className="pnav-inner">

          {/* ── Logo ── */}
          <a href="#" className="pnav-logo" aria-label="HealthNexus home">
            <div className="pnav-logo-mark">
              <img src={logo} alt="HealthNexus" className="brand-icon" />
            </div>
            <span className="brand-text">HealthNexus</span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="pnav-links" aria-label="Main navigation">
            {navItems.map(({ href, label, hasDropdown }) => {
              if (hasDropdown && label === 'AI Models') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={dropdownRef}
                    onMouseEnter={() => setAiDropdownOpen(true)}
                    onMouseLeave={() => setAiDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link pnav-link--ai ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setAiDropdownOpen(v => !v)}
                      aria-expanded={aiDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <Brain size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`pnav-chevron ${aiDropdownOpen ? 'pnav-chevron--open' : ''}`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div className={`pnav-dropdown ${aiDropdownOpen ? 'pnav-dropdown--open' : ''}`} role="menu">
                      {/* Header */}
                      <div className="pnav-dropdown-header">
                        <span className="pnav-dropdown-header-badge">
                          <Sparkles size={11} />
                          AI Models
                        </span>
                        <span className="pnav-dropdown-header-title">2 models available</span>
                      </div>

                      {/* Model cards */}
                      <div className="pnav-dropdown-grid">
                        {aiModels.map(model => {
                          const Icon = model.icon;
                          return (
                            <a
                              key={model.id}
                              href={model.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setAiDropdownOpen(false); handleNavClick(model.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div
                                  className="pnav-model-icon"
                                  style={{ background: model.accent }}
                                >
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span
                                    className="pnav-model-tag"
                                    style={{ background: model.tagBg, color: model.tagColor }}
                                  >
                                    {model.tag}
                                  </span>
                                  <div className="pnav-model-name">{model.name}</div>
                                </div>
                              </div>

                              <div className="pnav-model-desc">{model.desc}</div>

                              <div className="pnav-model-stats">
                                {model.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>

                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Powered by medical-grade LLMs</span>
                        <a href="#AiModelSection" className="pnav-dropdown-footer-link" onClick={() => setAiDropdownOpen(false)}>
                          Explore all models <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }
              if (hasDropdown && label === 'Features') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={featuresDropdownRef}
                    onMouseEnter={() => setFeaturesDropdownOpen(true)}
                    onMouseLeave={() => setFeaturesDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setFeaturesDropdownOpen(v => !v)}
                      aria-expanded={featuresDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <Sparkles size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown size={13} className={`pnav-chevron ${featuresDropdownOpen ? 'pnav-chevron--open' : ''}`} />
                    </button>

                    <div className={`pnav-dropdown ${featuresDropdownOpen ? 'pnav-dropdown--open' : ''}`} role="menu">
                      <div className="pnav-dropdown-header">
                        <span className="pnav-dropdown-header-badge">
                          <Sparkles size={11} />
                          Features
                        </span>
                        <span className="pnav-dropdown-header-title">3 features available</span>
                      </div>

                      <div className="pnav-dropdown-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {featureItems.map(feature => {
                          const Icon = feature.icon;
                          return (
                            <a
                              key={feature.id}
                              href={feature.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setFeaturesDropdownOpen(false); handleNavClick(feature.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div className="pnav-model-icon" style={{ background: feature.accent }}>
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span className="pnav-model-tag" style={{ background: feature.tagBg, color: feature.tagColor }}>
                                    {feature.tag}
                                  </span>
                                  <div className="pnav-model-name">{feature.name}</div>
                                </div>
                              </div>
                              <div className="pnav-model-desc">{feature.desc}</div>
                              <div className="pnav-model-stats">
                                {feature.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>
                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Streamlined healthcare access</span>
                        <a href="/features" className="pnav-dropdown-footer-link" onClick={() => setFeaturesDropdownOpen(false)}>
                          View all features <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }
              if (hasDropdown && label === 'Benefits') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={benefitsDropdownRef}
                    onMouseEnter={() => setBenefitsDropdownOpen(true)}
                    onMouseLeave={() => setBenefitsDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setBenefitsDropdownOpen(v => !v)}
                      aria-expanded={benefitsDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <Heart size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`pnav-chevron ${benefitsDropdownOpen ? 'pnav-chevron--open' : ''}`}
                      />
                    </button>

                    <div
                      className={`pnav-dropdown pnav-dropdown--wide ${benefitsDropdownOpen ? 'pnav-dropdown--open' : ''}`}
                      role="menu"
                    >
                      {/* Header */}
                      <div className="pnav-dropdown-header">
                        <span className="pnav-dropdown-header-badge" style={{ background: 'rgba(225,29,72,.1)', color: '#e11d48', borderColor: 'rgba(225,29,72,.2)' }}>
                          <Heart size={11} />
                          Who Benefits
                        </span>
                        <span className="pnav-dropdown-header-title">3 groups</span>
                      </div>

                      {/* Cards */}
                      <div className="pnav-dropdown-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {benefitItems.map(benefit => {
                          const Icon = benefit.icon;
                          return (
                            <a
                              key={benefit.id}
                              href={benefit.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setBenefitsDropdownOpen(false); handleNavClick(benefit.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div className="pnav-model-icon" style={{ background: benefit.accent }}>
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span
                                    className="pnav-model-tag"
                                    style={{ background: benefit.tagBg, color: benefit.tagColor }}
                                  >
                                    {benefit.tag}
                                  </span>
                                  <div className="pnav-model-name">{benefit.name}</div>
                                </div>
                              </div>

                              <div className="pnav-model-desc">{benefit.desc}</div>

                              <div className="pnav-model-stats">
                                {benefit.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>

                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Built for everyone in the care journey</span>
                       
                      </div>
                    </div>
                  </div>
                );
              }
              if (hasDropdown && label === 'Home Visit') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={homeVisitDropdownRef}
                    onMouseEnter={() => setHomeVisitDropdownOpen(true)}
                    onMouseLeave={() => setHomeVisitDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setHomeVisitDropdownOpen(v => !v)}
                      aria-expanded={homeVisitDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <Stethoscope size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`pnav-chevron ${homeVisitDropdownOpen ? 'pnav-chevron--open' : ''}`}
                      />
                    </button>

                    <div
                      className={`pnav-dropdown pnav-dropdown--wide ${homeVisitDropdownOpen ? 'pnav-dropdown--open' : ''}`}
                      role="menu"
                      style={{ width: '860px' }}  
                    >
                      {/* Header */}
                      <div className="pnav-dropdown-header">
                        <span
                          className="pnav-dropdown-header-badge"
                          style={{ background: 'rgba(26,95,168,.1)', color: '#1a5fa8', borderColor: 'rgba(26,95,168,.2)' }}
                        >
                          <Stethoscope size={11} />
                          Home Visit Services
                        </span>
                        <span className="pnav-dropdown-header-title">4 services available</span>
                      </div>

                      {/* Cards — 4 columns */}
                      <div className="pnav-dropdown-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                        {homeVisitItems.map(service => {
                          const Icon = service.icon;
                          return (
                            <a
                              key={service.id}
                              href={service.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setHomeVisitDropdownOpen(false); handleNavClick(service.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div className="pnav-model-icon" style={{ background: service.accent }}>
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span
                                    className="pnav-model-tag"
                                    style={{ background: service.tagBg, color: service.tagColor }}
                                  >
                                    {service.tag}
                                  </span>
                                  <div className="pnav-model-name">{service.name}</div>
                                </div>
                              </div>

                              <div className="pnav-model-desc">{service.desc}</div>

                              <div className="pnav-model-stats">
                                {service.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>

                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Professional care delivered to your doorstep</span>
                        
                      </div>
                    </div>
                  </div>
                );
              }
              if (hasDropdown && label === 'Capabilities') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={capabilitiesDropdownRef}
                    onMouseEnter={() => setCapabilitiesDropdownOpen(true)}
                    onMouseLeave={() => setCapabilitiesDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setCapabilitiesDropdownOpen(v => !v)}
                      aria-expanded={capabilitiesDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <Sparkles size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`pnav-chevron ${capabilitiesDropdownOpen ? 'pnav-chevron--open' : ''}`}
                      />
                    </button>

                    <div
                      className={`pnav-dropdown pnav-dropdown--wide ${capabilitiesDropdownOpen ? 'pnav-dropdown--open' : ''}`}
                      role="menu"
                      style={{ width: '860px' }}
                    >
                      {/* Header */}
                      <div className="pnav-dropdown-header">
                        <span
                          className="pnav-dropdown-header-badge"
                          style={{ background: 'rgba(102,126,234,.1)', color: '#667eea', borderColor: 'rgba(102,126,234,.2)' }}
                        >
                          <Sparkles size={11} />
                          Capabilities
                        </span>
                        <span className="pnav-dropdown-header-title">4 capabilities available</span>
                      </div>

                      {/* Cards — 4 columns */}
                      <div className="pnav-dropdown-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                        {capabilityItems.map(capability => {
                          const Icon = capability.icon;
                          return (
                            <a
                              key={capability.id}
                              href={capability.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setCapabilitiesDropdownOpen(false); handleNavClick(capability.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div className="pnav-model-icon" style={{ background: capability.accent }}>
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span
                                    className="pnav-model-tag"
                                    style={{ background: capability.tagBg, color: capability.tagColor }}
                                  >
                                    {capability.tag}
                                  </span>
                                  <div className="pnav-model-name">{capability.name}</div>
                                </div>
                              </div>

                              <div className="pnav-model-desc">{capability.desc}</div>

                              <div className="pnav-model-stats">
                                {capability.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>

                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Everything you need for modern healthcare</span>
                        
                      </div>
                    </div>
                  </div>
                );
              }
              if (hasDropdown && label === 'How it Works') {
                return (
                  <div
                    key={href}
                    className="pnav-dropdown-wrap"
                    ref={howItWorksDropdownRef}
                    onMouseEnter={() => setHowItWorksDropdownOpen(true)}
                    onMouseLeave={() => setHowItWorksDropdownOpen(false)}
                  >
                    <button
                      className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                      onClick={() => setHowItWorksDropdownOpen(v => !v)}
                      aria-expanded={howItWorksDropdownOpen}
                      aria-haspopup="true"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <UserRound size={13} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`pnav-chevron ${howItWorksDropdownOpen ? 'pnav-chevron--open' : ''}`}
                      />
                    </button>

                    <div
                      className={`pnav-dropdown ${howItWorksDropdownOpen ? 'pnav-dropdown--open' : ''}`}
                      role="menu"
                      style={{ width: '580px' }}
                    >
                      {/* Header */}
                      <div className="pnav-dropdown-header">
                        <span
                          className="pnav-dropdown-header-badge"
                          style={{ background: 'rgba(26,95,168,.1)', color: '#1a5fa8', borderColor: 'rgba(26,95,168,.2)' }}
                        >
                          <UserRound size={11} />
                          How it Works
                        </span>
                        <span className="pnav-dropdown-header-title">2 journeys</span>
                      </div>

                      {/* Cards — 2 columns */}
                      <div className="pnav-dropdown-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {howItWorksItems.map(journey => {
                          const Icon = journey.icon;
                          return (
                            <a
                              key={journey.id}
                              href={journey.href}
                              className="pnav-model-card"
                              role="menuitem"
                              onClick={() => { setHowItWorksDropdownOpen(false); handleNavClick(journey.href); }}
                            >
                              <div className="pnav-model-card-top">
                                <div className="pnav-model-icon" style={{ background: journey.accent }}>
                                  <Icon size={18} color="#fff" />
                                </div>
                                <div className="pnav-model-title-wrap">
                                  <span
                                    className="pnav-model-tag"
                                    style={{ background: journey.tagBg, color: journey.tagColor }}
                                  >
                                    {journey.tag}
                                  </span>
                                  <div className="pnav-model-name">{journey.name}</div>
                                </div>
                              </div>

                              <div className="pnav-model-desc">{journey.desc}</div>

                              <div className="pnav-model-stats">
                                {journey.stats.map((stat, si) => {
                                  const StatIcon = stat.icon;
                                  return (
                                    <span key={si} className="pnav-model-stat">
                                      <StatIcon size={10} />
                                      {stat.label}
                                    </span>
                                  );
                                })}
                              </div>

                              <ArrowRight size={13} className="pnav-model-arrow" />
                            </a>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="pnav-dropdown-footer">
                        <span className="pnav-dropdown-footer-text">Designed for every role in the care journey</span>
                        
                        <a
                          href="#user-journey"
                          className="pnav-dropdown-footer-link"
                          onClick={() => setHowItWorksDropdownOpen(false)}
                        >
                          See full journey <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={href}
                  href={href}
                  className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
                  onClick={() => handleNavClick(href)}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* ── CTA cluster ── */}
          <div className="pnav-cta-cluster">
            <button className="pnav-btn-ghost" onClick={() => setShowModal(true)}>
              Sign in
            </button>
            <a href="#" className="pnav-btn-primary">
              <Zap size={14} />
              Get Started
            </a>
          </div>

          {/* ── Mobile toggler ── */}
          <button
            className={`pnav-toggler ${menuOpen ? 'pnav-toggler--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="pnav-bar pnav-bar--top" />
            <span className="pnav-bar pnav-bar--mid" />
            <span className="pnav-bar pnav-bar--bot" />
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <div className={`pnav-drawer ${menuOpen ? 'pnav-drawer--open' : ''}`} aria-hidden={!menuOpen}>
          <nav className="pnav-drawer-links">
            {navItems.filter(i => !i.hasDropdown).map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                className={`pnav-drawer-link ${activeLink === href ? 'pnav-drawer-link--active' : ''}`}
                onClick={() => handleNavClick(href)}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="pnav-drawer-num">0{i + 1}</span>
                {label}
              </a>
            ))}
          </nav>

          {/* AI models mobile section */}
          <div className="pnav-drawer-ai-section">
            <div className="pnav-drawer-ai-label">
              <Brain size={12} />
              AI Models
            </div>
            <div className="pnav-drawer-ai-cards">
              {aiModels.map(model => {
                const Icon = model.icon;
                return (
                  <a
                    key={model.id}
                    href={model.href}
                    className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(model.href)}
                  >
                    <div
                      className="pnav-drawer-ai-card-icon"
                      style={{ background: model.accent }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{model.name}</div>
                      <div className="pnav-drawer-ai-card-desc">{model.tag} · {model.stats[0].label}</div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="pnav-drawer-ai-section" style={{ marginTop: '0.75rem' }}>
            <div className="pnav-drawer-ai-label">
              <Sparkles size={12} />
              Features
            </div>
            <div className="pnav-drawer-ai-cards">
              {featureItems.map(feature => {
                const Icon = feature.icon;
                return (
                  <a key={feature.id} href={feature.href} className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(feature.href)}>
                    <div className="pnav-drawer-ai-card-icon" style={{ background: feature.accent }}>
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{feature.name}</div>
                      <div className="pnav-drawer-ai-card-desc">{feature.tag} · {feature.stats[0].label}</div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="pnav-drawer-ai-section" style={{ marginTop: '0.75rem' }}>
            <div className="pnav-drawer-ai-label" style={{ color: '#e11d48' }}>
              <Heart size={12} />
              Benefits
            </div>
            <div className="pnav-drawer-ai-cards">
              {benefitItems.map(benefit => {
                const Icon = benefit.icon;
                return (
                  <a
                    key={benefit.id}
                    href={benefit.href}
                    className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(benefit.href)}
                  >
                    <div
                      className="pnav-drawer-ai-card-icon"
                      style={{ background: benefit.accent }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{benefit.name}</div>
                      <div className="pnav-drawer-ai-card-desc">
                        {benefit.tag} · {benefit.stats[0].label}
                      </div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="pnav-drawer-ai-section" style={{ marginTop: '0.75rem' }}>
            <div className="pnav-drawer-ai-label" style={{ color: '#1a5fa8' }}>
              <Stethoscope size={12} />
              Home Visit
            </div>
            <div className="pnav-drawer-ai-cards">
              {homeVisitItems.map(service => {
                const Icon = service.icon;
                return (
                  <a
                    key={service.id}
                    href={service.href}
                    className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(service.href)}
                  >
                    <div
                      className="pnav-drawer-ai-card-icon"
                      style={{ background: service.accent }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{service.name}</div>
                      <div className="pnav-drawer-ai-card-desc">
                        {service.tag} · {service.stats[0].label}
                      </div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="pnav-drawer-ai-section">
            <div className="pnav-drawer-ai-label" style={{ color: '#667eea' }}>
              <Sparkles size={12} />
              Capabilities
            </div>
            <div className="pnav-drawer-ai-cards">
              {capabilityItems.map(capability => {
                const Icon = capability.icon;
                return (
                  <a
                    key={capability.id}
                    href={capability.href}
                    className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(capability.href)}
                  >
                    <div
                      className="pnav-drawer-ai-card-icon"
                      style={{ background: capability.accent }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{capability.name}</div>
                      <div className="pnav-drawer-ai-card-desc">
                        {capability.tag} · {capability.stats[0].label}
                      </div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="pnav-drawer-ai-section" style={{ marginTop: '0.75rem' }}>
            <div className="pnav-drawer-ai-label" style={{ color: '#1a5fa8' }}>
              <UserRound size={12} />
              How it Works
            </div>
            <div className="pnav-drawer-ai-cards">
              {howItWorksItems.map(journey => {
                const Icon = journey.icon;
                return (
                  <a
                    key={journey.id}
                    href={journey.href}
                    className="pnav-drawer-ai-card"
                    onClick={() => handleNavClick(journey.href)}
                  >
                    <div
                      className="pnav-drawer-ai-card-icon"
                      style={{ background: journey.accent }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <div className="pnav-drawer-ai-card-text">
                      <div className="pnav-drawer-ai-card-name">{journey.name}</div>
                      <div className="pnav-drawer-ai-card-desc">
                        {journey.tag} · {journey.stats[0].label}
                      </div>
                    </div>
                    <ArrowRight size={14} color="#a0aec0" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pnav-drawer-footer">
            <button
              className="pnav-btn-ghost pnav-btn--full"
              onClick={() => { setShowModal(true); setMenuOpen(false); }}
            >
              Sign in
            </button>
            <a href="#" className="pnav-btn-primary pnav-btn--full">
              <Zap size={14} />
              Get Started
            </a>
          </div>
        </div>
      </header>

      {showModal && (
        <div
          className="demo-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="demo-modal">
            <div className="demo-modal-icon">
              <img 
                  src={logo} 
                  alt="HealthNexus Logo" 
                  style={{ height: '64px', width: '64px', objectFit: 'contain' }} 
                />
            </div>

            <span className="demo-modal-badge">
              🎓 Final Year Project
            </span>

            <h2 className="demo-modal-title">Currently in Demo Mode</h2>

            <p className="demo-modal-body">
              This site is a prototype built as part of my final year project. The official release is in progress. your insights help me improve it.
            </p>

            <a
              href="#feedback"
              className="demo-modal-btn"
              onClick={() => setShowModal(false)}
            >
              <Zap size={16} />
              Share Your Thoughts
            </a>

            <button
              className="demo-modal-dismiss"
              onClick={() => setShowModal(false)}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumNav;