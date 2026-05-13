import { useState } from 'react';
import { Activity, Brain, Heart } from 'lucide-react';
import '../Tools.css';

const HealthTools = () => {
  const [bmiInputs, setBmiInputs] = useState({ height: '', weight: '' });
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string } | null>(null);

  const calculateBMI = () => {
    const height = parseFloat(bmiInputs.height) / 100;
    const weight = parseFloat(bmiInputs.weight);
    if (height && weight) {
      const bmi = weight / (height * height);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal Weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      setBmiResult({ value: parseFloat(bmi.toFixed(1)), category });
    }
  };

  return (
    <section id="health-tools" className="health-tools-section py-5 animate-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-badge">HEALTH TOOLS</span>
          <h2 className="section-title mt-3">
            Free Health Assessment
            <span className="gradient-text d-block">Tools</span>
          </h2>
        </div>

        <div className="row g-4">
          {/* BMI Calculator */}
          <div className="col-lg-4">
            <div className="health-tool-card">
              <div className="tool-icon"><Activity size={32} /></div>
              <h4>BMI Calculator</h4>
              <p className="text-muted mb-4">Check if you're at a healthy weight</p>
              <div className="bmi-calculator">
                <div className="form-group mb-3">
                  <label>Height (cm)</label>
                  <input
                    type="number" className="form-control" placeholder="170"
                    value={bmiInputs.height}
                    onChange={(e) => setBmiInputs({ ...bmiInputs, height: e.target.value })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Weight (kg)</label>
                  <input
                    type="number" className="form-control" placeholder="70"
                    value={bmiInputs.weight}
                    onChange={(e) => setBmiInputs({ ...bmiInputs, weight: e.target.value })}
                  />
                </div>
                <button className="btn btn-primary w-100" onClick={calculateBMI}>Calculate BMI</button>
                {bmiResult && (
                  <div className="bmi-result mt-3">
                    <h5>Your BMI: {bmiResult.value}</h5>
                    <span className={`badge ${
                      bmiResult.category === 'Normal Weight' ? 'bg-success' :
                      bmiResult.category === 'Underweight' ? 'bg-warning' :
                      bmiResult.category === 'Overweight' ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {bmiResult.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Symptom Checker */}
          <div className="col-lg-4">
            <div className="health-tool-card">
              <div className="tool-icon"><Brain size={32} /></div>
              <h4>Symptom Checker</h4>
              <p className="text-muted mb-4">Get instant health insights</p>
              <div className="symptom-checker">
                <div className="symptom-tags">
                  <span className="symptom-tag active">Headache</span>
                  <span className="symptom-tag">Fever</span>
                  <span className="symptom-tag">Cough</span>
                  <span className="symptom-tag">Fatigue</span>
                  <span className="symptom-tag">+ Add more</span>
                </div>
                <div className="symptom-result mt-4">
                  <div className="alert alert-info">
                    <h6>Possible Conditions:</h6>
                    <ul className="mb-0">
                      <li>Common Cold (65% match)</li>
                      <li>Flu (45% match)</li>
                      <li>Stress (40% match)</li>
                    </ul>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">Consult a Doctor</button>
                </div>
              </div>
            </div>
          </div>

          {/* Heart Risk Assessment */}
          <div className="col-lg-4">
            <div className="health-tool-card">
              <div className="tool-icon"><Heart size={32} /></div>
              <h4>Heart Risk Assessment</h4>
              <p className="text-muted mb-4">Evaluate your cardiovascular health</p>
              <div className="risk-assessment">
                <div className="risk-factors">
                  <label className="risk-item"><input type="checkbox" /> High blood pressure</label>
                  <label className="risk-item"><input type="checkbox" /> Diabetes</label>
                  <label className="risk-item"><input type="checkbox" /> Smoking</label>
                  <label className="risk-item"><input type="checkbox" /> Family history</label>
                </div>
                <button className="btn btn-primary w-100 mt-3">Assess Risk</button>
                <div className="risk-meter mt-3">
                  <div className="meter-bar">
                    <div className="meter-fill" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-center mt-2">
                    <strong>Low Risk</strong>
                    <small className="d-block">Keep up the healthy lifestyle!</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTools;