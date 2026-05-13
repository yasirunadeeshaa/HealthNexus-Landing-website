import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  type ChartDataset,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../AiModel.css';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Tooltip, Legend, Filler
);

/* ─── design tokens (aligned with Main.css) ─── */
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
  grid:   'rgba(0,0,0,.06)',
  tick:   '#9a9790',
  font:   { family: "'DM Sans', sans-serif", size: 11 },
};

/* ─── prop interfaces ─── */
interface MetricCardProps  { value: string; label: string; accent: string; }
interface ModelRowProps    { name: string; role: string; badge: string; badgeVariant: string; }
interface ShapRowProps     { label: string; width: number; value: number; positive?: boolean; }
interface RecItemProps     { icon: string; title: string; body: string; }
interface ArchRowProps     { num: string; title: string; desc: string; }
interface ChallengeRowProps{ icon: string; title: string; desc: string; }
interface SectionHeaderProps { eyebrow: string; title: string; highlight: string; }

/* ─── sub-components ─── */
const MetricCard = ({ value, label, accent }: MetricCardProps) => (
  <div className={`metric-card mc-${accent}`}>
    <div className="mv">{value}</div>
    <div className="ml">{label}</div>
  </div>
);

const ModelRow = ({ name, role, badge, badgeVariant }: ModelRowProps) => (
  <div className="model-row">
    <div>
      <div className="model-n">{name}</div>
      <div className="model-r">{role}</div>
    </div>
    <span className={`model-badge mb-${badgeVariant}`}>{badge}</span>
  </div>
);

const ShapRow = ({ label, width, value, positive = false }: ShapRowProps) => (
  <div className={`shap-row ${positive ? 'shap-pos' : 'shap-neg'}`}>
    <span className="shap-lbl">{label}</span>
    <div className="shap-track">
      <div
        className="shap-fill"
        style={{
          width: `${width}%`,
          background: positive
            ? 'linear-gradient(90deg,#e05555,#c03030)'
            : 'linear-gradient(90deg,#1d9e75,#0d7a5f)',
        }}
      />
    </div>
    <span className="shap-val" style={{ color: positive ? T.red : T.teal }}>
      {positive ? '+' : '−'}{value}%
    </span>
  </div>
);

const RecItem = ({ icon, title, body }: RecItemProps) => (
  <div className="rec-item">
    <div className="rec-icon">{icon}</div>
    <div>
      <div className="rec-title">{title}</div>
      <div className="rec-body">{body}</div>
    </div>
  </div>
);

const ArchRow = ({ num, title, desc }: ArchRowProps) => (
  <div className="arch-row">
    <div className="arch-num">{num}</div>
    <div>
      <div className="arch-title">{title}</div>
      <div className="arch-desc">{desc}</div>
    </div>
  </div>
);

const ChallengeRow = ({ icon, title, desc }: ChallengeRowProps) => (
  <div className="challenge-row">
    <div className="challenge-icon">{icon}</div>
    <div>
      <div className="challenge-title">{title}</div>
      <div className="challenge-desc">{desc}</div>
    </div>
  </div>
);

const SectionHeader = ({ eyebrow, title, highlight }: SectionHeaderProps) => (
  <div className="section-hd">
    <div className="eyebrow">{eyebrow}</div>
    <h2>{title} <span>{highlight}</span></h2>
  </div>
);

const Divider = () => <div className="divider" />;

/* ─── chart configs ─── */
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

/* Classifier benchmark — mixed Bar + Line dataset */
const classifierData = {
  labels: ['XGBoost', 'Random Forest', 'LightGBM', 'Logistic Regression'],
  datasets: [
    {
      label: 'Accuracy (%)',
      data: [94, 91, 93, 82],
      backgroundColor: T.teal,
      borderRadius: 4,
      barPercentage: 0.25,
      categoryPercentage: 0.85,
    } as ChartDataset<'bar', number[]>,
    {
      label: 'F1-Score (%)',
      data: [92, 89, 91, 80],
      backgroundColor: T.blue,
      borderRadius: 4,
      barPercentage: 0.25,
      categoryPercentage: 0.85,
    } as ChartDataset<'bar', number[]>,
    {
      type: 'line' as const,
      label: 'ROC-AUC ×100',
      data: [96, 93, 95, 87],
      borderColor: T.amber,
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: T.amber,
      pointRadius: 5,
      yAxisID: 'y',
    } as ChartDataset<'line', number[]>,
  ],
};

const classifierOptions = {
  ...chartDefaults,
  plugins: {
    ...chartDefaults.plugins,
    tooltip: {
      callbacks: {
        label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
          `${ctx.dataset.label}: ${ctx.raw}`,
      },
    },
  },
  scales: {
    x: { ticks: { font: T.font, color: T.tick }, grid: { display: false } },
    y: {
      min: 70, max: 100,
      ticks: { font: T.font, color: T.tick, callback: (v: number | string) => v + '%' },
      grid: { color: T.grid },
    },
  },
};

const progressionData = {
  labels: ['Now', '3 Mo', '6 Mo', '12 Mo'],
  datasets: [
    {
      label: 'Risk score (%)',
      data: [28, 47, 68, 91],
      borderColor: T.teal,
      backgroundColor: T.tealL,
      fill: true,
      tension: 0.45,
      pointBackgroundColor: [T.teal, T.amber, T.amber, T.red],
      pointRadius: [5, 5, 5, 6],
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      borderWidth: 2.5,
    },
    {
      label: 'High-risk threshold',
      data: [80, 80, 80, 80],
      borderColor: 'rgba(217,79,79,.5)',
      borderDash: [6, 4],
      borderWidth: 1.5,
      fill: false,
      pointRadius: 0,
    },
  ],
};

const progressionOptions = {
  ...chartDefaults,
  plugins: {
    ...chartDefaults.plugins,
    tooltip: {
      callbacks: {
        label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
          `${ctx.dataset.label}: ${ctx.raw}%`,
      },
    },
  },
  scales: {
    x: { ticks: { font: T.font, color: T.tick }, grid: { display: false } },
    y: {
      min: 0, max: 100,
      ticks: { font: T.font, color: T.tick, callback: (v: number | string) => v + '%' },
      grid: { color: T.grid },
    },
  },
};

const hba1cData = {
  labels: ['Baseline', '3 Mo', '6 Mo', '9 Mo', '12 Mo'],
  datasets: [
    {
      label: 'HbA1c (%)',
      data: [5.8, 6.2, 6.9, 7.4, 7.9],
      borderColor: T.blue,
      backgroundColor: T.blueL,
      fill: true,
      tension: 0.45,
      pointBackgroundColor: T.blue,
      pointRadius: 4,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      borderWidth: 2.5,
    },
    {
      label: 'Diabetes threshold (6.5%)',
      data: [6.5, 6.5, 6.5, 6.5, 6.5],
      borderColor: 'rgba(217,79,79,.6)',
      borderDash: [6, 4],
      borderWidth: 1.5,
      fill: false,
      pointRadius: 0,
    },
  ],
};

const hba1cOptions = {
  ...chartDefaults,
  plugins: {
    ...chartDefaults.plugins,
    tooltip: {
      callbacks: {
        label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
          `${ctx.dataset.label}: ${ctx.raw}%`,
      },
    },
  },
  scales: {
    x: { ticks: { font: T.font, color: T.tick }, grid: { display: false } },
    y: {
      min: 5, max: 9,
      ticks: { font: T.font, color: T.tick, callback: (v: number | string) => v + '%' },
      grid: { color: T.grid },
    },
  },
};

/* SHAP bar — scriptable backgroundColor uses a proper type */
const shapBarData = {
  labels: ['HbA1c Level', 'Sugar Intake', 'Sedentary Hours', 'Family History', 'Sleep Quality', 'BMI in Range'],
  datasets: [
    {
      label: 'SHAP impact (%)',
      data: [35, 22, 15, 12, -8, -5],
      backgroundColor: (ctx: { raw: unknown }) =>
        (ctx.raw as number) >= 0 ? 'rgba(184,94,12,.8)' : 'rgba(13,122,95,.8)',
      borderRadius: 4,
      borderSkipped: false as const,
    },
  ],
};

const shapBarOptions = {
  ...chartDefaults,
  indexAxis: 'y' as const,
  plugins: {
    ...chartDefaults.plugins,
    tooltip: {
      callbacks: {
        label: (ctx: { raw: unknown }) => {
          const v = ctx.raw as number;
          return `Impact: ${v > 0 ? '+' : ''}${v}%`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: T.font, color: T.tick,
        callback: (v: number | string) => (Number(v) > 0 ? '+' : '') + v + '%',
      },
      grid: { color: T.grid },
    },
    y: { ticks: { font: T.font, color: T.tick }, grid: { display: false } },
  },
};

const classDistData = {
  labels: ['Healthy', 'Pre-diabetic', 'Diabetic', 'High-risk'],
  datasets: [
    {
      data: [48, 28, 16, 8],
      backgroundColor: [T.teal, '#e07b1f', T.blue, T.red],
      borderColor: '#fff',
      borderWidth: 3,
      hoverOffset: 4,
    },
  ],
};

const classDistOptions = {
  ...chartDefaults,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { label?: string; raw: unknown }) => `${ctx.label}: ${ctx.raw}%`,
      },
    },
  },
  cutout: '64%',
};

/* ─── static data ─── */
const techStack: [string, string][] = [
  ['Python 3.11', '#0d7a5f'], ['FastAPI', '#0d7a5f'],
  ['React.js', '#1a5fa8'],   ['PostgreSQL', '#1a5fa8'],
  ['Scikit-learn', '#b85e0c'], ['TensorFlow', '#b85e0c'],
  ['XGBoost', '#b85e0c'],    ['LightGBM', '#0d7a5f'],
  ['SHAP', '#6b3fa0'],       ['LIME', '#6b3fa0'],
  ['Recharts', '#1a5fa8'],   ['Docker', '#555'],
];

interface DatasetTag { label: string; cls: string; }
interface DatasetEntry { name: string; purpose: string; tags: DatasetTag[]; }

const datasetList: DatasetEntry[] = [
  { name: 'NHANES',        purpose: 'Primary — multimodal risk classification',  tags: [{ label: 'Clinical', cls: 'tag-t' }, { label: 'Lifestyle', cls: 'tag-t' }] },
  { name: 'CDC BRFSS',     purpose: 'Behavioural feature augmentation',           tags: [{ label: 'Behavioural', cls: 'tag-a' }] },
  { name: 'PIMA Diabetes', purpose: 'Benchmark classification baseline',          tags: [{ label: 'Clinical', cls: 'tag-b' }] },
  { name: 'MIMIC-IV',      purpose: 'Longitudinal clinical reference',            tags: [{ label: 'Temporal', cls: 'tag-p' }] },
  { name: 'Synthetic (sim)',purpose: 'Forecasting model training sequences',      tags: [{ label: 'Time-series', cls: 'tag-a' }] },
];

/* ─── main section component ─── */
const DiabetesDashboard: React.FC = () => {
  return (
    /* Wrap in animate-section so LandingPage's scroll observer picks it up */
    <section id="ai-diabetes-model" className="animate-section" style={{ background: '#fafbfc' }}>
      <div className="dashboard-root">

        {/* ── Hero Banner ── */}
        <div className="hero">
          <div className="hero-eye">HealthNexus · FYP AI Model</div>
          <h1>Explainable Diabetes<br /><em>Progression Forecasting</em></h1>
          <p className="hero-sub">
            A multimodal AI system combining clinical, lifestyle, and behavioural data to predict diabetes
            risk and forecast disease progression — with full SHAP/LIME transparency.
          </p>
          <div className="stat-strip">
            {[
              { v: '94%',   l: 'Target Accuracy' },
              { v: '0.96',  l: 'ROC-AUC' },
              { v: '12 Mo', l: 'Forecast Horizon' },
              { v: 'XAI',   l: 'Explainable AI' },
            ].map(s => (
              <div className="stat-cell" key={s.l}>
                <div className="stat-v">{s.v}</div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="page">

          {/* ── Metric cards ── */}
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

          {/* ── Classifier benchmark ── */}
          <div className="section">
            <SectionHeader eyebrow="Model Comparison" title="Classifier" highlight="Benchmark Results" />
            <div className="card">
              <div className="legend">
                <div className="legend-item"><div className="legend-dot" style={{ background: T.teal }} />Accuracy</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: T.blue }} />F1-Score</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: T.amber }} />ROC-AUC</div>
              </div>
              <div style={{ height: 280 }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Bar data={classifierData as any} options={classifierOptions} aria-label="Grouped bar chart comparing classifier performance" />
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Forecasting charts ── */}
          <div className="section">
            <SectionHeader eyebrow="Temporal Forecasting" title="Diabetes Risk" highlight="Progression Trajectory" />
            <div className="grid2">
              <div className="card">
                <p className="chart-label">Projected diabetes risk score over 12 months (current lifestyle unchanged)</p>
                <div style={{ height: 240 }}>
                  <Line data={progressionData} options={progressionOptions} aria-label="Line chart of diabetes risk progression" />
                </div>
              </div>
              <div className="card">
                <p className="chart-label">Forecasted HbA1c trend (%) vs safe clinical threshold</p>
                <div style={{ height: 240 }}>
                  <Line data={hba1cData} options={hba1cOptions} aria-label="Line chart of HbA1c trend" />
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── SHAP / Feature Impact ── */}
          <div className="section">
            <SectionHeader eyebrow="SHAP / LIME · XAI" title="Feature" highlight="Impact Analysis" />
            <div className="grid2">
              <div className="card">
                <p className="chart-label">Top contributing features (SHAP value magnitude)</p>
                <div style={{ height: 260 }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Bar data={shapBarData as any} options={shapBarOptions} aria-label="Horizontal bar chart of SHAP feature importances" />
                </div>
              </div>
              <div className="card">
                <ShapRow label="HbA1c Level (6.8%)"     width={100} value={35} positive />
                <ShapRow label="High Sugar Intake"       width={63}  value={22} positive />
                <ShapRow label="Sedentary Hours (9h/d)"  width={43}  value={15} positive />
                <ShapRow label="Family History"          width={34}  value={12} positive />
                <ShapRow label="Sleep Quality (7.5 hrs)" width={23}  value={8}  positive={false} />
                <ShapRow label="BMI within range"        width={14}  value={5}  positive={false} />
                <div className="shap-legend">
                  <span><span className="dot" style={{ background: T.red }} />Increases risk</span>
                  <span><span className="dot" style={{ background: T.teal }} />Reduces risk</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── AI Models + Recommendations ── */}
          <div className="section">
            <SectionHeader eyebrow="AI Models" title="Proposed" highlight="Model Architecture" />
            <div className="grid2">
              <div>
                <p className="sub-label">Classification models</p>
                <ModelRow name="XGBoost"             role="Primary risk classifier — 94% accuracy" badge="Primary"      badgeVariant="primary" />
                <ModelRow name="Random Forest"       role="Ensemble baseline — 91% accuracy"       badge="Ensemble"     badgeVariant="primary" />
                <ModelRow name="LightGBM"            role="Fast gradient boosting — 93% accuracy"  badge="Ensemble"     badgeVariant="primary" />
                <ModelRow name="Logistic Regression" role="Interpretability baseline"              badge="Baseline"     badgeVariant="secondary" />

                <p className="sub-label" style={{ marginTop: 16 }}>Forecasting models</p>
                <ModelRow name="Stacked LSTM"  role="12-month progression forecasting"  badge="Primary"      badgeVariant="primary" />
                <ModelRow name="GRU"           role="Shorter-window trajectory"          badge="Secondary"    badgeVariant="secondary" />
                <ModelRow name="Transformer"   role="Attention-based baseline"           badge="Experimental" badgeVariant="secondary" />

                <p className="sub-label" style={{ marginTop: 16 }}>Explainability</p>
                <ModelRow name="SHAP" role="Global & local feature attribution" badge="XAI" badgeVariant="xai" />
                <ModelRow name="LIME" role="Local surrogate explanations"        badge="XAI" badgeVariant="xai" />
              </div>
              <div>
                <p className="sub-label">System pipeline</p>
                <ArchRow num="01" title="Data ingestion & fusion"          desc="Clinical records, lifestyle logs, and behavioural tracking merged into a unified patient feature vector." />
                <ArchRow num="02" title="Risk classification engine"       desc="XGBoost ensemble classifies: Healthy / Pre-diabetic / Diabetic / High-Risk with SHAP attribution scores." />
                <ArchRow num="03" title="Temporal progression forecasting" desc="Stacked LSTM projects HbA1c and glucose trends at 3, 6, and 12-month horizons." />
                <ArchRow num="04" title="XAI & recommendation layer"       desc="SHAP/LIME explanations surface top risk drivers and auto-generate personalised interventions." />

                <p className="sub-label" style={{ marginTop: 16 }}>Personalised recommendations</p>
                <RecItem icon="🥗" title="Dietary intervention"  body="Reduce refined sugar by 40% — SHAP identified it as +22% risk contributor." />
                <RecItem icon="🏃" title="Physical activity plan" body="150 min/week aerobic exercise to offset +15% sedentary lifestyle factor." />
                <RecItem icon="🩺" title="Clinical follow-up"     body="HbA1c re-test within 3 months — before the 6-month high-risk threshold crossing." />
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Datasets ── */}
          <div className="section">
            <SectionHeader eyebrow="Datasets" title="Candidate" highlight="Dataset Strategy" />
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="ds-table">
                <thead>
                  <tr><th>Dataset</th><th>Purpose</th><th>Type</th></tr>
                </thead>
                <tbody>
                  {datasetList.map(d => (
                    <tr key={d.name}>
                      <td><span className="dn">{d.name}</span></td>
                      <td>{d.purpose}</td>
                      <td>{d.tags.map(t => <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          {/* ── Class distribution + Tech stack ── */}
          <div className="section">
            <SectionHeader eyebrow="Risk Cohorts" title="Class" highlight="Distribution Analysis" />
            <div className="grid2">
              <div className="card">
                <p className="chart-label">Target class distribution (training dataset)</p>
                <div style={{ height: 220 }}>
                  <Doughnut data={classDistData} options={classDistOptions} aria-label="Donut chart of class distribution" />
                </div>
                <div className="legend" style={{ marginTop: 16, justifyContent: 'center' }}>
                  {([['Healthy', T.teal], ['Pre-diabetic', '#e07b1f'], ['Diabetic', T.blue], ['High-risk', T.red]] as [string, string][]).map(([l, c]) => (
                    <div className="legend-item" key={l}><div className="legend-dot" style={{ background: c }} />{l}</div>
                  ))}
                </div>
              </div>
              <div className="card">
                <p className="chart-label">Technology stack</p>
                <div className="tech-grid">
                  {techStack.map(([name, color]) => (
                    <div className="tech-item" key={name}>
                      <span className="tech-dot" style={{ background: color }} />{name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Challenges ── */}
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
  );
};

export default DiabetesDashboard;