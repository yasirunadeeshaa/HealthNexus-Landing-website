import React, { useState } from 'react';
import PremiumNav from './sections/NavBar';
import Footer from './sections/Footer';

import heroBg from '../assets/backgroun1.webp';

/* ─── Design tokens (unchanged from original) ─── */
const T = {
  teal:   '#0d7a5f',
  tealL:  'rgba(13,122,95,.12)',
  blue:   '#1a5fa8',
  blueL:  'rgba(26,95,168,.12)',
  amber:  '#b85e0c',
  amberL: 'rgba(184,94,12,.15)',
  red:    '#d94f4f',
  redL:   'rgba(217,79,79,.12)',
  purple: '#6b3fa0',
  purpleL:'rgba(107,63,160,.12)',
  grad:   'linear-gradient(135deg, #0d7a5f 0%, #1a5fa8 100%)',
} as const;

/* ─── Inline styles ─── */
const S: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: '#fafbfc',
    color: '#1a202c',
    width: '100%',
  },
  hero: {
    padding: '84px 48px 156px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '80px',

    backgroundImage: `url(${heroBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  },
  heroEye: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.30)',
    color: '#fff',
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '6px 20px',
    borderRadius: '50px',
    marginBottom: '24px',
  },
  heroH1: {
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.15,
    letterSpacing: '-1px',
    margin: '0 0 18px',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: '1rem',
    maxWidth: '680px',
    margin: '0 auto 36px',
    lineHeight: 1.7,
  },
  statStrip: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statCell: {
    background: 'rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '16px',
    padding: '16px 28px',
    minWidth: '110px',
  },
  statV: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1,
  },
  statL: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.72)',
    fontWeight: 600,
    letterSpacing: '0.5px',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px 64px',
  },
  sectionHd: {
    marginBottom: '28px',
  },
  eyebrow: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: T.teal,
    marginBottom: '6px',
  },
  h2: {
    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
    fontWeight: 800,
    color: '#1a202c',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    margin: '0',
  },
  h2Span: {
    background: T.grad,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(13,122,95,0.2), transparent)',
    margin: '40px 0',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  grid5: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    border: '1px solid rgba(13,122,95,0.08)',
  },
  modelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '8px',
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
  },
  modelName: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a202c',
  },
  modelRole: {
    fontSize: '0.75rem',
    color: '#718096',
    marginTop: '2px',
  },
  badgePrimary: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: T.grad,
    color: '#fff',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  badgeSecondary: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: '#edf2f7',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  badgeXai: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '50px',
    background: T.purpleL,
    color: T.purple,
    border: '1px solid rgba(107,63,160,0.2)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  subLabel: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    color: '#9a9790',
    marginBottom: '10px',
    marginTop: '0',
  },
  challengeRow: {
    display: 'flex',
    gap: '14px',
    padding: '16px 18px',
    borderRadius: '14px',
    marginBottom: '12px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  challengeIcon: {
    fontSize: '1.4rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  challengeTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '4px',
  },
  challengeDesc: {
    fontSize: '0.75rem',
    color: '#718096',
    lineHeight: 1.6,
  },
  viewMoreBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: T.grad,
    color: '#fff',
    fontSize: '0.88rem',
    fontWeight: 700,
    padding: '14px 32px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 15px rgba(13,122,95,0.4)',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  viewMoreWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(13,122,95,0.12)',
  },
  /* ── New styles for expanded sections ── */
  pipelineStep: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: '24px',
  },
  pipelineDot: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 800,
    color: '#fff',
    background: T.grad,
    flexShrink: 0,
    zIndex: 1,
  },
  pipelineLine: {
    position: 'absolute',
    left: '17px',
    top: '36px',
    bottom: '0',
    width: '2px',
    background: 'rgba(13,122,95,0.15)',
  },
  pipelineContent: {
    flex: 1,
    paddingTop: '6px',
  },
  pipelineTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '4px',
  },
  pipelineDesc: {
    fontSize: '0.78rem',
    color: '#718096',
    lineHeight: 1.65,
  },
  codeSnip: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.72rem',
    background: '#f0f4f8',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#4a5568',
    marginTop: '8px',
    lineHeight: 1.7,
    wordBreak: 'break-word',
    display: 'block',
  },
  shapBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  shapLabel: {
    fontSize: '0.75rem',
    color: '#4a5568',
    width: '170px',
    flexShrink: 0,
  },
  shapBarWrap: {
    flex: 1,
    background: '#f0f4f8',
    borderRadius: '4px',
    height: '8px',
    overflow: 'hidden',
  },
  shapValue: {
    fontSize: '0.75rem',
    fontWeight: 700,
    width: '48px',
    textAlign: 'right',
    flexShrink: 0,
  },
  metricCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '16px 18px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  metricTitle: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#9a9790',
    marginBottom: '6px',
  },
  metricFormula: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.78rem',
    color: T.teal,
    background: T.tealL,
    padding: '6px 10px',
    borderRadius: '6px',
    display: 'inline-block',
    marginBottom: '6px',
  },
  metricDesc: {
    fontSize: '0.75rem',
    color: '#718096',
    lineHeight: 1.55,
  },
  gapRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0',
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  },
  gapLeft: {
    padding: '14px 18px',
    borderRight: '1px solid #e2e8f0',
    fontSize: '0.78rem',
    color: '#4a5568',
    lineHeight: 1.55,
  },
  gapRight: {
    padding: '14px 18px',
    fontSize: '0.78rem',
    color: '#4a5568',
    lineHeight: 1.55,
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  contribCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '18px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },
  contribNum: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: T.grad,
    color: '#fff',
    fontSize: '0.78rem',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  limitCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '16px 18px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  },
  stackTag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '5px 12px',
    borderRadius: '8px',
    background: '#f0f4f8',
    border: '1px solid #e2e8f0',
    color: '#4a5568',
    margin: '3px',
  },
  tabBtn: {
    padding: '8px 18px',
    borderRadius: '50px',
    border: '1px solid #e2e8f0',
    background: '#f7fafc',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#718096',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabBtnActive: {
    padding: '8px 18px',
    borderRadius: '50px',
    border: 'none',
    background: T.grad,
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(13,122,95,0.35)',
  },
};

interface DiseaseCardProps { icon: string; name: string; color: string; bg: string; border: string; dataset: string; records: string; auc: string; }
const DiseaseCard: React.FC<DiseaseCardProps> = ({ icon, name, color, bg, border, dataset, records, auc }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px 10px',
    borderRadius: '14px',
    background: bg,
    border: `1px solid ${border}`,
    textAlign: 'center',
  }}>
    <span style={{ fontSize: '1.6rem' }}>{icon}</span>
    <span style={{ fontSize: '0.78rem', fontWeight: 700, color, letterSpacing: '0.3px' }}>{name}</span>
    <span style={{ fontSize: '0.65rem', color: '#718096', lineHeight: 1.4 }}>{dataset}</span>
    <span style={{ fontSize: '0.65rem', color: '#9a9790' }}>{records}</span>
    <span style={{ fontSize: '0.72rem', fontWeight: 700, color, background: bg, border: `1px solid ${border}`, borderRadius: '6px', padding: '2px 8px', marginTop: '2px' }}>
      AUC {auc}
    </span>
  </div>
);

const featureTagStyle = (color: string, bg: string, border: string): React.CSSProperties => ({
  display: 'inline-block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color,
  background: bg,
  border: `1px solid ${border}`,
  borderRadius: '8px',
  padding: '5px 11px',
  margin: '3px',
});

const SectionLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ ...S.subLabel, ...style }}>{children}</p>
);

/* ─── SHAP bar row ─── */
const ShapBar: React.FC<{ label: string; value: string; pct: number; positive: boolean }> = ({ label, value, pct, positive }) => (
  <div style={S.shapBar}>
    <span style={S.shapLabel}>{label}</span>
    <div style={S.shapBarWrap}>
      <div style={{ height: '100%', width: `${pct}%`, background: positive ? '#d94f4f' : '#0d7a5f', borderRadius: '4px', transition: 'width 0.6s ease' }} />
    </div>
    <span style={{ ...S.shapValue, color: positive ? '#d94f4f' : '#0d7a5f' }}>{value}</span>
  </div>
);

/* ─── Pipeline step ─── */
const PipeStep: React.FC<{ num: number; title: string; desc: string; code?: string; isLast?: boolean }> = ({ num, title, desc, code, isLast }) => (
  <div style={{ ...S.pipelineStep, paddingBottom: isLast ? '0' : '24px' }}>
    <div style={S.pipelineDot}>{num}</div>
    {!isLast && <div style={S.pipelineLine} />}
    <div style={S.pipelineContent}>
      <div style={S.pipelineTitle}>{title}</div>
      <div style={S.pipelineDesc}>{desc}</div>
      {code && <code style={S.codeSnip}>{code}</code>}
    </div>
  </div>
);

/* ─── Contribution card ─── */
const ContribCard: React.FC<{ num: number; title: string; desc: string }> = ({ num, title, desc }) => (
  <div style={S.contribCard}>
    <div style={S.contribNum}>{num}</div>
    <div>
      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '0.75rem', color: '#718096', lineHeight: 1.6 }}>{desc}</div>
    </div>
  </div>
);

/* ──────────────────────────────────────────── */
/*  Main Component                              */
/* ──────────────────────────────────────────── */
interface Props { onViewMore?: (id: string) => void; }

const DiseaseRiskPredictionSection: React.FC<Props> = () => {
  const [activePreprocessTab, setActivePreprocessTab] = useState<'cleaning' | 'imputation' | 'encoding' | 'smote' | 'scaling'>('cleaning');
  const [activeModelTab, setActiveModelTab] = useState<'xgboost' | 'rf' | 'ann'>('xgboost');

  /* ── Preprocessing tab content ── */
  const preprocessContent: Record<string, { title: string; desc: string; code: string }> = {
    cleaning: {
      title: 'Zero-value cleaning (PIMA dataset)',
      desc: 'Glucose, BloodPressure, SkinThickness, Insulin, and BMI cannot physiologically be zero. These are replaced with NaN so they are treated as missing data, not real measurements.',
      code: `cols_with_invalid_zeros = ['Glucose', 'BloodPressure',\n  'SkinThickness', 'Insulin', 'BMI']\ndf[cols_with_invalid_zeros] = df[cols_with_invalid_zeros].replace(0, np.nan)`,
    },
    imputation: {
      title: 'KNN imputation (k=5)',
      desc: 'Fills missing numerical values by finding the 5 most similar records using Euclidean distance, then computing a weighted average. Far more accurate than mean imputation — e.g. a missing BMI is inferred from patients with similar age, glucose, and blood pressure.',
      code: `from sklearn.impute import KNNImputer\nimputer = KNNImputer(n_neighbors=5)\ndf_imputed = imputer.fit_transform(df_numerical)\n# Categorical: most_frequent strategy\ncat_imputer = SimpleImputer(strategy='most_frequent')`,
    },
    encoding: {
      title: 'Categorical encoding',
      desc: 'One-Hot Encoding for nominal features (smoking_status: never/former/current → 3 binary columns). Label Encoding for binary fields (gender, yes/no). drop="first" avoids the dummy variable trap.',
      code: `from sklearn.preprocessing import OneHotEncoder\nencoder = OneHotEncoder(sparse=False, drop='first')\n# Binary: LabelEncoder for gender, yes/no columns`,
    },
    smote: {
      title: 'SMOTE oversampling (stroke dataset)',
      desc: 'The stroke dataset has a 95:5 class imbalance. A model predicting "no stroke" always reaches 95% accuracy but catches zero stroke cases. SMOTE generates synthetic minority-class records along line segments between k-nearest neighbors. Applied to training data only — never to test data.',
      code: `from imblearn.over_sampling import SMOTE\nsmote = SMOTE(random_state=42, k_neighbors=5)\nX_resampled, y_resampled = smote.fit_resample(\n  X_train_scaled, y_train\n)`,
    },
    scaling: {
      title: 'StandardScaler normalization',
      desc: 'Transforms all continuous features to mean=0, std=1. Fitted only on training data (fit_transform), then transform-only on test/inference data to prevent data leakage. Serialized alongside the model as a .pkl file so inference uses the exact same scaler.',
      code: `scaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled  = scaler.transform(X_test)\n# Saved as pipeline/{disease}_pipeline.pkl`,
    },
  };

  /* ── Model tab content ── */
  const modelContent: Record<string, { title: string; role: string; desc: string; params: string[]; code: string }> = {
    xgboost: {
      title: 'XGBoost — Deployed model',
      role: 'Sequential gradient boosting. Each new tree corrects errors of the previous trees.',
      desc: 'Handles missing values natively. scale_pos_weight parameter for class imbalance. Natively compatible with SHAP TreeSHAP (exact values, polynomial time). Consistently outperforms other model types on tabular healthcare data.',
      params: ['n_estimators: 100–500', 'max_depth: 3–8', 'learning_rate: 0.01–0.3', 'subsample: 0.7–1.0', 'colsample_bytree: 0.7–1.0', 'scale_pos_weight: neg/pos ratio'],
      code: `xgb_search = RandomizedSearchCV(\n  XGBClassifier(eval_metric='logloss'),\n  param_distributions=param_dist,\n  n_iter=50, scoring='f1', cv=5\n)\nbest_xgb = xgb_search.best_estimator_`,
    },
    rf: {
      title: 'Random Forest — Baseline comparison',
      role: 'Ensemble of decision trees trained on random bootstrap samples with random feature subsets.',
      desc: 'Standard baseline in healthcare ML. Stable and generalizable through bagging. Feature importances are easily extracted. If XGBoost significantly outperforms RF, this justifies the extra complexity of gradient boosting.',
      params: ['n_estimators: 100–500', 'max_depth: None/10/20/30', 'min_samples_split: 2/5/10', 'min_samples_leaf: 1/2/4', 'max_features: sqrt/log2', 'class_weight: balanced'],
      code: `rf_search = RandomizedSearchCV(\n  RandomForestClassifier(\n    class_weight='balanced', random_state=42),\n  param_distributions=rf_params,\n  n_iter=50, scoring='f1', cv=5\n)`,
    },
    ann: {
      title: 'ANN / MLP — Deep learning comparison',
      role: '4-layer fully connected neural network with Batch Normalization and Dropout.',
      desc: 'Architecture: Input → Dense(128, ReLU) → BN → Dropout(0.3) → Dense(64, ReLU) → BN → Dropout(0.3) → Dense(32, ReLU) → Dense(1, Sigmoid). Expected to perform slightly below tree-based models on tabular data — validating the literature finding that tree-based models outperform deep learning on structured clinical data.',
      params: ['Optimizer: Adam', 'Loss: Binary Cross-Entropy', 'LR: 0.001 + ReduceLROnPlateau', 'Batch size: 32', 'Max epochs: 100', 'Early stopping: patience=10'],
      code: `model = Sequential([\n  Dense(128, activation='relu'),\n  BatchNormalization(), Dropout(0.3),\n  Dense(64,  activation='relu'),\n  BatchNormalization(), Dropout(0.3),\n  Dense(32,  activation='relu'),\n  Dense(1,   activation='sigmoid')\n])`,
    },
  };

  const pc = preprocessContent[activePreprocessTab];
  const mc = modelContent[activeModelTab];

  return (
    <>
      <PremiumNav />
      <section id="ai-disease-risk-section" style={S.root}>

        {/* ── Hero ── */}
        <div style={S.hero}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(5px)',
            // background: 'linear-gradient(135deg, rgba(13,122,95,0.82) 0%, rgba(26,95,168,0.82) 100%)',
            zIndex: 0,
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={S.heroEye}>HealthNexus · AI Model 02</div>
          <h1 style={S.heroH1}>Explainable Multi-Disease<br />Risk Prediction System</h1>
          <p style={S.heroSub}>
            A multi-disease AI prediction engine using clinical, demographic, and lifestyle data
            to assess risk for five major chronic conditions simultaneously with full SHAP/LIME
            explainability, production FastAPI microservice, and real-time decision support.
          </p>
          <div style={S.statStrip}>
            {[
              { v: '5',      l: 'Diseases covered' },
              { v: '3',      l: 'Models compared' },
              { v: 'XAI',    l: 'Explainable AI' },
              { v: 'SHAP',   l: 'Feature insights' },
              { v: '<100ms', l: 'Inference latency' },
              { v: '15',     l: 'Trained instances' },
            ].map(s => (
              <div style={S.statCell} key={s.l}>
                <div style={S.statV}>{s.v}</div>
                <div style={S.statL}>{s.l}</div>
              </div>
            ))}
          </div>
          
          </div>
        </div>

        <div style={S.page}>

          {/* ── 1. Diseases covered ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Multi-Disease Coverage</div>
              <h2 style={S.h2}>Five Conditions <span style={S.h2Span}>Predicted Simultaneously</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                A single patient data submission routes through five disease-specific XGBoost models in parallel.
                Chronic diseases share overlapping risk factors — this unified pipeline captures those correlations
                and delivers a complete chronic disease risk profile in one API call.
              </p>
            </div>
            <div style={S.grid5}>
              <DiseaseCard icon="🩸" name="Diabetes"       color={T.blue}   bg={T.blueL}   border="rgba(26,95,168,.2)"  dataset="PIMA Indians"    records="768 records · 8 features"  auc="0.88–0.92" />
              <DiseaseCard icon="❤️"  name="Heart Disease"  color={T.red}    bg={T.redL}    border="rgba(217,79,79,.2)"  dataset="UCI Cleveland"   records="303 records · 13 features" auc="0.90–0.94" />
              <DiseaseCard icon="🫘" name="Kidney Disease"  color={T.teal}   bg={T.tealL}   border="rgba(13,122,95,.2)"  dataset="UCI CKD"         records="400 records · 24 features" auc="0.97–0.99" />
              <DiseaseCard icon="🧠" name="Stroke Risk"     color={T.purple} bg={T.purpleL} border="rgba(107,63,160,.2)" dataset="Kaggle Stroke"   records="5,110 records · 11 feat."  auc="0.86–0.91" />
              <DiseaseCard icon="💢" name="Hypertension"    color={T.amber}  bg={T.amberL}  border="rgba(184,94,12,.2)"  dataset="Kaggle Stroke"   records="5,110 records · 11 feat."  auc="0.87–0.92" />
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 2. End-to-end pipeline ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>System Architecture</div>
              <h2 style={S.h2}>End-to-End <span style={S.h2Span}>Prediction Pipeline</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                Independent Python FastAPI microservice. Decoupled from Spring Boot so the AI service can be
                retrained, scaled, or updated without touching the main application.
              </p>
            </div>
            <div style={S.card}>
              <PipeStep num={1} title="Patient triggers assessment (React / Flutter)" desc="Patient clicks 'Run AI Risk Assessment'. Frontend sends POST /api/predict/run to Spring Boot. No patient data travels through the frontend — the backend fetches everything internally." />
              <PipeStep num={2} title="Spring Boot fetches latest data from MySQL" desc="Retrieves the most recent vitals record, lifestyle record, and demographic profile. Constructs a 17-field JSON payload: age, gender, BMI, systolic_bp, diastolic_bp, fasting_glucose, cholesterol, creatinine, blood_urea, albumin, hemoglobin, insulin, smoking_status, sleep_hours, active_minutes_per_week, alcohol_units_per_week, work_type." code={`POST /api/v1/predict  →  FastAPI microservice (port 8001)\nHeader: X-API-KEY: {internal_key}`} />
              <PipeStep num={3} title="FastAPI preprocessing pipeline" desc="Pydantic validates all fields first. Then: KNN imputation for missing numerics, most-frequent for categoricals, one-hot encoding for nominals, StandardScaler normalization. The serialized sklearn Pipeline object guarantees the same transformations used during training." />
              <PipeStep num={4} title="Five XGBoost models run in parallel" desc="Models pre-loaded at server startup (not on each request) for <100ms inference. Each of the five disease-specific .pkl models receives the preprocessed feature vector and returns a probability 0.0–1.0. Threshold: ≤0.30 = LOW · 0.31–0.60 = MODERATE · >0.60 = HIGH." />
              <PipeStep num={5} title="SHAP TreeExplainer computes Shapley values" desc="Pre-loaded SHAP TreeExplainer (one per disease) calculates exact Shapley values for each prediction. SHAP values always sum to exactly the difference between the prediction and the baseline (local accuracy guarantee). Positive values push toward high risk; negative values are protective." code={`explainer = shap.TreeExplainer(trained_xgb_model)\nshap_values = explainer.shap_values(patient_features)\n# baseline + sum(shap_values) = risk_score  ✓`} />
              <PipeStep num={6} title="JSON response → Spring Boot → MySQL → Frontend" desc="FastAPI returns all five risk scores, risk levels, and SHAP value dictionaries in one payload. Spring Boot persists the full result to ai_predictions (including SHAP payload as a JSON column) and forwards to React/Flutter for rendering." isLast />
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 3. AI Models ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>AI Models</div>
              <h2 style={S.h2}>Model Architecture <span style={S.h2Span}>& Comparison</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                Three model types are trained and evaluated across all five diseases (15 trained instances total).
                The goal is to demonstrate through measurement — not assumption — that XGBoost is the optimal deployment model.
              </p>
            </div>

            {/* Model tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {(['xgboost', 'rf', 'ann'] as const).map(k => (
                <button key={k} style={activeModelTab === k ? S.tabBtnActive : S.tabBtn} onClick={() => setActiveModelTab(k)}>
                  {k === 'xgboost' ? 'XGBoost (Deployed)' : k === 'rf' ? 'Random Forest' : 'ANN / MLP'}
                </button>
              ))}
            </div>

            <div style={S.grid2}>
              <div style={S.card}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{mc.role}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', marginBottom: '10px' }}>{mc.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.65, marginBottom: '14px' }}>{mc.desc}</div>
                <code style={S.codeSnip}>{mc.code}</code>
              </div>
              <div style={S.card}>
                <SectionLabel>Key hyperparameters tuned (RandomizedSearchCV, 5-fold CV)</SectionLabel>
                {mc.params.map(p => (
                  <div key={p} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.78rem' }}>
                    <span style={{ color: T.teal, fontWeight: 700, fontSize: '0.9rem' }}>·</span>
                    <span style={{ color: '#4a5568', fontFamily: "'Fira Code', monospace" }}>{p}</span>
                  </div>
                ))}
                <div style={{ marginTop: '14px', padding: '10px 14px', background: T.tealL, borderRadius: '10px', border: `1px solid rgba(13,122,95,.2)` }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tuning method</div>
                  <div style={{ fontSize: '0.75rem', color: '#4a5568' }}>RandomizedSearchCV · n_iter=50 · stratified 5-fold cross-validation · scoring='f1'</div>
                </div>
              </div>
            </div>

            {/* Input features */}
            <div style={{ marginTop: '20px' }}>
              <div style={S.grid2}>
                <div style={S.card}>
                  <SectionLabel>Input features by modality</SectionLabel>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical / Lab vitals</div>
                    {['Blood Pressure (sys/dia)', 'Fasting Glucose (mg/dL)', 'Cholesterol (mg/dL)', 'Serum Creatinine', 'Blood Urea', 'Albumin', 'Hemoglobin', 'Insulin'].map(f => (
                      <span key={f} style={featureTagStyle(T.teal, T.tealL, 'rgba(13,122,95,.2)')}>{f}</span>
                    ))}
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.blue, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Demographic</div>
                    {['Age', 'Gender', 'BMI'].map(f => (
                      <span key={f} style={featureTagStyle(T.blue, T.blueL, 'rgba(26,95,168,.2)')}>{f}</span>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.amber, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lifestyle / Behavioral</div>
                    {['Smoking Status', 'Sleep Hours', 'Active Min/Week', 'Alcohol Units/Week', 'Work Type'].map(f => (
                      <span key={f} style={featureTagStyle(T.amber, T.amberL, 'rgba(184,94,12,.2)')}>{f}</span>
                    ))}
                  </div>
                </div>
                <div style={S.card}>
                  <SectionLabel>Expected performance (XGBoost, all diseases)</SectionLabel>
                  {[
                    { name: 'CKD',          f1: '0.96–0.99', auc: '0.97–0.99', sens: '0.96–0.99', color: T.teal },
                    { name: 'Heart Disease', f1: '0.85–0.90', auc: '0.90–0.94', sens: '0.85–0.91', color: T.red },
                    { name: 'Hypertension', f1: '0.81–0.86', auc: '0.87–0.92', sens: '0.82–0.87', color: T.amber },
                    { name: 'Diabetes',     f1: '0.83–0.87', auc: '0.88–0.92', sens: '0.82–0.88', color: T.blue },
                    { name: 'Stroke',       f1: '0.79–0.85', auc: '0.86–0.91', sens: '0.80–0.87', color: T.purple },
                  ].map(d => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.78rem' }}>
                      <span style={{ fontWeight: 700, color: d.color, width: '110px' }}>{d.name}</span>
                      <span style={{ color: '#718096' }}>F1 <strong style={{ color: '#1a202c' }}>{d.f1}</strong></span>
                      <span style={{ color: '#718096' }}>AUC <strong style={{ color: '#1a202c' }}>{d.auc}</strong></span>
                      <span style={{ color: '#718096' }}>Sens <strong style={{ color: '#1a202c' }}>{d.sens}</strong></span>
                    </div>
                  ))}
                  <div style={{ marginTop: '12px', fontSize: '0.72rem', color: '#9a9790', lineHeight: 1.5 }}>
                    XGBoost outperforms Random Forest and ANN across all five diseases on F1, AUC-ROC, and Sensitivity — justifying deployment selection.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 4. Evaluation metrics ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Evaluation Strategy</div>
              <h2 style={S.h2}>Why Raw Accuracy <span style={S.h2Span}>Is Not Enough</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                The stroke dataset has 95% healthy patients — a model predicting "no stroke" always achieves 95% accuracy
                but catches zero actual stroke cases. Healthcare ML requires metrics that specifically measure performance
                on the positive (sick) class.
              </p>
            </div>
            <div style={S.grid3}>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>Sensitivity (Recall) — primary</div>
                <div style={S.metricFormula}>TP / (TP + FN)</div>
                <div style={S.metricDesc}>Of all patients who actually have the disease, what % did the model catch? A False Negative (missing a sick patient) is the most dangerous clinical error. Target: &gt;85% for all models.</div>
              </div>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>Precision</div>
                <div style={S.metricFormula}>TP / (TP + FP)</div>
                <div style={S.metricDesc}>Of all patients flagged high-risk, what % actually have the disease? Minimises false alarms — incorrectly alarming healthy patients causes anxiety and erodes system trust.</div>
              </div>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>F1-Score — headline metric</div>
                <div style={S.metricFormula}>2 × (P × R) / (P + R)</div>
                <div style={S.metricDesc}>Harmonic mean of Precision and Recall. Primary comparison metric — correctly handles class imbalance unlike accuracy, and reflects both miss and false-alarm costs simultaneously.</div>
              </div>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>AUC-ROC</div>
                <div style={S.metricFormula}>Area under ROC curve</div>
                <div style={S.metricDesc}>Measures discrimination ability across all thresholds. 0.5 = random. &gt;0.85 = good. &gt;0.90 = excellent. Model-level performance independent of any single threshold choice.</div>
              </div>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>Confusion Matrix</div>
                <div style={S.metricFormula}>TP / TN / FP / FN counts</div>
                <div style={S.metricDesc}>2×2 heatmap showing raw counts of True Positives, True Negatives, False Positives, and False Negatives. Plotted for all 15 model instances for visual cross-model comparison.</div>
              </div>
              <div style={S.metricCard}>
                <div style={S.metricTitle}>Stratified 5-fold CV</div>
                <div style={S.metricFormula}>k=5 stratified splits</div>
                <div style={S.metricDesc}>Each fold preserves class proportions. Used during hyperparameter tuning to ensure performance estimates are stable and not dependent on a single lucky train-test split.</div>
              </div>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 5. Preprocessing ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Data Preprocessing</div>
              <h2 style={S.h2}>Six-Step <span style={S.h2Span}>Preprocessing Pipeline</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                All steps assembled into a serialized scikit-learn <code style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>Pipeline</code> object.
                Fitted on training data only — the exact same transformations are applied at inference time inside FastAPI.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {([
                { k: 'cleaning',   l: '① Cleaning' },
                { k: 'imputation', l: '② Imputation' },
                { k: 'encoding',   l: '③ Encoding' },
                { k: 'smote',      l: '④ SMOTE' },
                { k: 'scaling',    l: '⑤ Scaling' },
              ] as const).map(({ k, l }) => (
                <button key={k} style={activePreprocessTab === k ? S.tabBtnActive : S.tabBtn} onClick={() => setActivePreprocessTab(k)}>{l}</button>
              ))}
            </div>
            <div style={S.card}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>{pc.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.65, marginBottom: '12px' }}>{pc.desc}</div>
              <code style={S.codeSnip}>{pc.code}</code>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 6. Explainable AI ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Explainable AI</div>
              <h2 style={S.h2}>Dual-Layer <span style={S.h2Span}>XAI Framework</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                A 74% risk score is clinically useless without explanation. Knowing it is driven by
                Fasting Glucose (+18%), BMI (+12%), and Age (+8%) — with physical activity as a
                protective factor (−6%) — transforms the prediction into an actionable clinical tool.
              </p>
            </div>
            <div style={S.grid2}>
              {/* SHAP panel */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c' }}>SHAP — Primary method</div>
                    <div style={{ fontSize: '0.72rem', color: '#718096', marginTop: '2px' }}>SHapley Additive Explanations · TreeSHAP · Exact values</div>
                  </div>
                  <span style={{ ...S.badgeXai, background: T.purpleL, color: T.purple }}>Mathematically exact</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9a9790', marginBottom: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Diabetes — patient risk 74% · sample SHAP output
                </div>
                <ShapBar label="Fasting glucose (142 mg/dL)" value="+18.4%" pct={100} positive />
                <ShapBar label="BMI (31.2)"                   value="+11.7%" pct={64}  positive />
                <ShapBar label="Age (47)"                     value="+7.9%"  pct={43}  positive />
                <ShapBar label="Smoking (former)"             value="+4.3%"  pct={23}  positive />
                <ShapBar label="Active minutes (90/wk)"       value="−6.1%"  pct={33}  positive={false} />
                <ShapBar label="Sleep (6.5 hrs)"              value="−3.8%"  pct={21}  positive={false} />
                <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#9a9790', fontFamily: 'monospace' }}>
                  Baseline 0.33 + SHAP sum 0.41 = prediction 0.74 ✓ (local accuracy guarantee)
                </div>
                <div style={{ marginTop: '12px', padding: '10px 14px', background: T.purpleL, borderRadius: '10px', border: `1px solid rgba(107,63,160,.2)`, fontSize: '0.75rem', color: '#4a5568', lineHeight: 1.55 }}>
                  <strong style={{ color: T.purple }}>Game theory foundation:</strong> Each feature is a "player" in a cooperative game. SHAP value = fair share of the total prediction across all possible feature coalitions. Consistent, locally accurate, and additive by construction.
                </div>
              </div>
              {/* LIME panel */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c' }}>LIME — Validation layer</div>
                    <div style={{ fontSize: '0.72rem', color: '#718096', marginTop: '2px' }}>Local Interpretable Model-Agnostic Explanations · Approximate</div>
                  </div>
                  <span style={{ ...S.badgeSecondary }}>Model-agnostic</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.65, marginBottom: '14px' }}>
                  Treats the model as a complete black box. For a specific prediction, generates perturbed neighboring
                  data points, runs each through the model, then trains a simple linear regression on those predictions
                  (weighted by proximity) to approximate local model behavior.
                </div>
                <code style={S.codeSnip}>{`lime_explainer = LimeTabularExplainer(\n  training_data=X_train_processed,\n  feature_names=feature_names,\n  class_names=['Low Risk', 'High Risk'],\n  mode='classification'\n)\nlime_exp = lime_explainer.explain_instance(\n  data_row=patient_instance,\n  predict_fn=model.predict_proba,\n  num_features=10\n)`}</code>
                <div style={{ marginTop: '14px', padding: '12px 14px', background: '#f7fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4a5568', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>SHAP vs LIME — key differences</div>
                  {[
                    ['Basis',       'Game theory (exact)',  'Local linear approx (approx)'],
                    ['Consistency', 'Globally consistent', 'Varies between runs'],
                    ['Speed',       'Polynomial (TreeSHAP)','Slower (perturb + re-score)'],
                    ['Use',         'Primary API response', 'Cross-validation only'],
                  ].map(([label, shap, lime]) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '6px', fontSize: '0.72rem', padding: '4px 0', borderBottom: '1px solid #f0f4f8' }}>
                      <span style={{ color: '#9a9790', fontWeight: 700 }}>{label}</span>
                      <span style={{ color: T.teal }}>{shap}</span>
                      <span style={{ color: T.amber }}>{lime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation logic */}
            <div style={{ marginTop: '16px', ...S.card }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', marginBottom: '10px' }}>
                Automated recommendation logic (triggered when risk &gt; 60%)
              </div>
              <div style={S.grid2}>
                {[
                  { trigger: 'Top SHAP: Fasting Glucose', rec: '"Your fasting glucose of [value] mg/dL is above normal. Consider reducing refined sugar intake and scheduling an HbA1c blood test."' },
                  { trigger: 'Top SHAP: BMI',             rec: '"Your BMI of [value] falls in the [category] range. A 5–10% body weight reduction is clinically shown to significantly reduce diabetes risk."' },
                  { trigger: 'Top SHAP: Smoking',         rec: '"Smoking is a primary modifiable risk factor. Cessation programs can reduce your risk within 1–2 years."' },
                  { trigger: 'Top SHAP: Activity',        rec: '"Your [value] min/week is below the WHO-recommended 150 min. Increasing activity is the single highest-impact lifestyle change."' },
                ].map(r => (
                  <div key={r.trigger} style={{ padding: '12px 14px', background: '#f7fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{r.trigger}</div>
                    <div style={{ fontSize: '0.75rem', color: '#4a5568', lineHeight: 1.55, fontStyle: 'italic' }}>{r.rec}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 7. Datasets ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Datasets</div>
              <h2 style={S.h2}>Modular Dataset <span style={S.h2Span}>Strategy</span></h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '8px', lineHeight: 1.6 }}>
                One clinically validated dataset per disease — ensuring each model is trained on a feature space
                specifically designed for that condition, rather than forcing a single dataset to cover all five.
              </p>
            </div>
            <div style={S.card}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg,rgba(13,122,95,.08),rgba(26,95,168,.08))' }}>
                    {['Dataset', 'Disease', 'Records', 'Features', 'Class balance', 'Key challenge'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'PIMA Indians',    disease: 'Diabetes',       records: '768',   features: '8',  balance: '65/35', challenge: 'Zero-value missing data', color: T.blue, bg: T.blueL },
                    { name: 'UCI Cleveland',   disease: 'Heart Disease',  records: '303',   features: '13', balance: '54/46', challenge: 'Small dataset size',       color: T.red,    bg: T.redL },
                    { name: 'UCI CKD',         disease: 'Kidney Disease', records: '400',   features: '24', balance: '62/38', challenge: 'High missing value density (20–30%)', color: T.teal,   bg: T.tealL },
                    { name: 'Kaggle Stroke',   disease: 'Stroke',         records: '5,110', features: '11', balance: '95/5',  challenge: 'Severe class imbalance (SMOTE required)', color: T.purple, bg: T.purpleL },
                    { name: 'Kaggle Stroke',   disease: 'Hypertension',   records: '5,110', features: '11', balance: '65/35', challenge: 'Feature overlap with stroke model', color: T.amber,  bg: T.amberL },
                  ].map((d, i) => (
                    <tr key={`${d.name}-${d.disease}`} style={{ borderBottom: i < 4 ? '1px solid #f0f4f8' : 'none' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1a202c' }}>{d.name}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '50px', background: d.bg, color: d.color, border: `1px solid ${d.color}33` }}>{d.disease}</span>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#4a5568' }}>{d.records}</td>
                      <td style={{ padding: '10px 14px', color: '#4a5568' }}>{d.features}</td>
                      <td style={{ padding: '10px 14px', color: '#4a5568', fontFamily: 'monospace', fontSize: '0.8rem' }}>{d.balance}</td>
                      <td style={{ padding: '10px 14px', color: '#718096', fontSize: '0.75rem' }}>{d.challenge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 8. FastAPI microservice ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Deployment</div>
              <h2 style={S.h2}>FastAPI <span style={S.h2Span}>Microservice Architecture</span></h2>
            </div>
            <div style={S.grid2}>
              <div style={S.card}>
                <SectionLabel>Microservice file structure</SectionLabel>
                {[
                  { file: 'main.py',                    desc: 'FastAPI entry point. Defines API routes, starts Uvicorn server.' },
                  { file: 'predictor.py',               desc: 'Core logic. Loads models at startup, runs all five inferences, computes SHAP values, assembles response.' },
                  { file: 'models/{disease}_model.pkl', desc: 'Five serialized XGBoost models. Pre-loaded at startup for <100ms inference.' },
                  { file: 'explainers/{disease}.pkl',   desc: 'Five pre-loaded SHAP TreeExplainer objects. Avoids recalculating background on every request.' },
                  { file: 'pipelines/{disease}.pkl',    desc: 'Serialized sklearn Pipeline. Same transformations used at training time, applied at inference.' },
                  { file: 'schemas/request.py',         desc: 'Pydantic model. All 17 input fields type-validated before prediction code runs.' },
                  { file: 'schemas/response.py',        desc: 'Pydantic model. Structured JSON output: risk scores + SHAP values for all five diseases.' },
                ].map(f => (
                  <div key={f.file} style={{ display: 'flex', gap: '10px', padding: '7px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.75rem' }}>
                    <code style={{ color: T.teal, fontFamily: 'monospace', flexShrink: 0, fontSize: '0.72rem', marginTop: '1px' }}>{f.file}</code>
                    <span style={{ color: '#718096', lineHeight: 1.5 }}>{f.desc}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={S.card}>
                  <SectionLabel>Security & integration</SectionLabel>
                  <div style={{ fontSize: '0.78rem', color: '#718096', lineHeight: 1.65, marginBottom: '10px' }}>
                    Microservice runs on internal port 8001 — not exposed to the public internet. Spring Boot
                    communicates via WebClient with an internal API key header stored as an environment variable.
                  </div>
                  <code style={S.codeSnip}>{`async def verify_api_key(x_api_key: str = Header(...)):\n    if x_api_key != settings.INTERNAL_API_KEY:\n        raise HTTPException(status_code=403)`}</code>
                </div>
                <div style={{ ...S.card, marginTop: '14px' }}>
                  <SectionLabel>Why FastAPI</SectionLabel>
                  {[
                    ['Async by design', 'Handles concurrent prediction requests without blocking'],
                    ['Pydantic validation', 'Rejects malformed payloads before prediction code runs'],
                    ['Performance', '30,000–40,000 requests/sec — exceeds all load requirements'],
                    ['Model pre-loading', 'pkl files loaded at startup, not per request — saves 200–500ms/call'],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ display: 'flex', gap: '10px', padding: '7px 0', borderBottom: '1px solid #f0f4f8', fontSize: '0.75rem' }}>
                      <span style={{ color: T.teal, fontWeight: 700, flexShrink: 0, fontSize: '0.8rem' }}>·</span>
                      <div><strong style={{ color: '#1a202c', fontWeight: 700 }}>{title}</strong> — <span style={{ color: '#718096' }}>{desc}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 9. Research gaps ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Literature Review</div>
              <h2 style={S.h2}>Research Gaps <span style={S.h2Span}>& How This Project Addresses Them</span></h2>
            </div>
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(135deg,rgba(13,122,95,.08),rgba(26,95,168,.08))', padding: '10px 18px', borderBottom: '1px solid #e2e8f0', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4a5568' }}>
                <span>Gap in existing literature</span>
                <span>This project's solution</span>
              </div>
              {[
                ['Single-disease isolation — no unified multi-disease pipeline exists. Every published system predicts one disease per tool.', 'Single API endpoint routes one patient payload through five disease-specific models simultaneously, returning a unified risk report.'],
                ['Feature siloing — clinical lab data and lifestyle/behavioral data are treated as separate streams and never fused.', 'Unified preprocessing pipeline integrates clinical vitals, demographics, and behavioral metrics into one normalized feature vector.'],
                ['Explainability deficit — models output raw percentages with no feature attribution. Primary barrier to clinical adoption.', 'Dual-layer SHAP + LIME XAI with frontend bar chart visualization and automated recommendations triggered by top SHAP contributors.'],
                ['Class imbalance neglect — stroke and hypertension studies fail to address 95:5 imbalance, producing misleadingly high accuracy with zero sensitivity for sick patients.', 'SMOTE on training data only. Evaluation uses F1-Score, Sensitivity, and AUC-ROC — not raw accuracy.'],
                ['No production API architecture — academic studies produce Jupyter notebooks, not deployable services.', 'FastAPI microservice with model pre-loading, Pydantic validation, internal API key security, and sub-100ms inference latency.'],
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < 4 ? '1px solid #f0f4f8' : 'none' }}>
                  <div style={{ padding: '12px 18px', fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.55, borderRight: '1px solid #f0f4f8' }}>
                    <span style={{ color: '#d94f4f', fontWeight: 700, marginRight: '6px' }}>Gap {i + 1}:</span>{r[0]}
                  </div>
                  <div style={{ padding: '12px 18px', fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.55, display: 'flex', gap: '8px' }}>
                    <span style={{ color: T.teal, fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <span>{r[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 10. Technical contributions ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Technical Contributions</div>
              <h2 style={S.h2}>Core <span style={S.h2Span}>System Capabilities</span></h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <ContribCard num={1} title="Unified multi-disease prediction pipeline" desc="A single API endpoint that simultaneously generates risk scores for five chronic diseases from one patient data submission. Existing systems address each disease in isolation — this pipeline eliminates that fragmentation and enables a complete chronic disease risk profile in a single API call." />
              <ContribCard num={2} title="Heterogeneous feature integration" desc="A preprocessing pipeline that combines clinical lab vitals, demographic data, and continuous lifestyle behavioral metrics (sleep, activity, smoking) into a single normalized feature vector per disease model. This eliminates the feature siloing consistently identified in existing literature." />
              <ContribCard num={3} title="Dual-layer explainability framework" desc="SHAP for mathematically exact global and local feature attribution, and LIME for model-agnostic local approximation. Two independent lenses on every prediction — if both agree on top features, explanation confidence is high. Significant disagreement is a signal worth investigating." />
              <ContribCard num={4} title="Feature-to-UI serialization strategy" desc="Direct mapping of SHAP Shapley value arrays from the API response into interactive frontend bar charts with automated clinical recommendations triggered by top SHAP contributors. Red bars = risk-increasing factors, green bars = protective factors, with patient values and % contribution labeled." />
              <ContribCard num={5} title="Production-grade asynchronous microservice" desc="FastAPI microservice with model pre-loading at startup, Pydantic request validation, internal API key security, and sub-100ms inference latency. Bridges the gap between academic Jupyter notebook experiments and production-deployable clinical AI components." />
              <ContribCard num={6} title="Rigorous comparative model evaluation" desc="Scientific comparison of XGBoost vs Random Forest vs ANN across all five disease datasets using medically appropriate metrics (Sensitivity, F1-Score, AUC-ROC) rather than raw accuracy, with explicit empirical justification for the final deployment model selection." />
            </div>
          </div>

          <div style={S.divider} />

          {/* ── 11. Limitations & future work ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={S.sectionHd}>
              <div style={S.eyebrow}>Limitations & Future Work</div>
              <h2 style={S.h2}>Current Limitations <span style={S.h2Span}>& Planned Improvements</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { title: 'Dataset size & diversity', desc: 'UCI Cleveland Heart has only 303 records. PIMA covers only Pima Indian females aged 21+. Predictions for other demographics may be less accurate. Production models should be retrained on larger, diverse datasets.' },
                { title: 'Self-reported lifestyle data', desc: 'Sleep hours, physical activity, and smoking status are patient-reported via the lifestyle form. Subject to recall bias and social desirability bias — patients may over-report healthy behaviors.' },
                { title: 'Snapshot-only prediction', desc: 'Each prediction is an independent snapshot of the most recent data. A patient with steadily rising glucose over 6 months is treated identically to one with the same current value but stable history.' },
                { title: 'Risk scores ≠ clinical diagnosis', desc: 'A 74% risk score means the profile resembles training-set patients who developed the disease — not that disease is confirmed. This distinction must be explicitly communicated in the UI.' },
              ].map(l => (
                <div key={l.title} style={S.limitCard}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a202c', marginBottom: '5px' }}>{l.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#718096', lineHeight: 1.6 }}>{l.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '18px 22px', borderRadius: '14px', background: 'linear-gradient(135deg,rgba(13,122,95,.06),rgba(26,95,168,.08))', border: '1px solid rgba(13,122,95,.15)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Future work</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  ['Federated learning', 'Train across hospital data without centralising sensitive records.'],
                  ['Longitudinal modeling', 'Replace snapshot XGBoost with LSTM to capture rate-of-change signals.'],
                  ['Wearable integration', 'Direct sync with Apple Watch, Fitbit, CGM devices.'],
                  ['Multi-label comorbidity', 'Single multi-output model capturing inter-disease correlations.'],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: 'flex', gap: '8px', fontSize: '0.78rem' }}>
                    <span style={{ color: T.teal, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <div><strong style={{ color: '#1a202c' }}>{title}</strong> — <span style={{ color: '#718096' }}>{desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div/>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DiseaseRiskPredictionSection;