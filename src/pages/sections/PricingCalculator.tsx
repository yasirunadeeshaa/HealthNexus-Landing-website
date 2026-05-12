import { Check } from 'lucide-react';
import '../Pricing.css';

interface CalculatorInputs {
  doctorVisits: number;
  visitCost: number;
  emergencyVisits: number;
  familyMembers: number;
}

interface PricingCalculatorProps {
  calculatorInputs: CalculatorInputs;
  setCalculatorInputs: (inputs: CalculatorInputs) => void;
  calculateSavings: () => { traditional: number; mediflow: number; savings: number };
}

const PricingCalculator = ({ calculatorInputs, setCalculatorInputs, calculateSavings }: PricingCalculatorProps) => {
  return (
    <section id="pricing-calculator" className="pricing-calculator-section py-5 animate-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-badge">PRICING CALCULATOR</span>
          <h2 className="section-title mt-3">
            Calculate Your
            <span className="gradient-text d-block">Healthcare Savings</span>
          </h2>
        </div>

        <div className="calculator-container">
          <div className="calculator-inputs">
            <h4 className="mb-4">Your Current Healthcare Usage</h4>

            <div className="input-group-custom mb-4">
              <label>Doctor visits per year</label>
              <input
                type="range" className="form-range" min="1" max="24"
                value={calculatorInputs.doctorVisits}
                onChange={(e) => setCalculatorInputs({ ...calculatorInputs, doctorVisits: parseInt(e.target.value) })}
              />
              <span className="range-value">{calculatorInputs.doctorVisits} visits</span>
            </div>

            <div className="input-group-custom mb-4">
              <label>Average cost per visit</label>
              <input
                type="range" className="form-range" min="50" max="500" step="25"
                value={calculatorInputs.visitCost}
                onChange={(e) => setCalculatorInputs({ ...calculatorInputs, visitCost: parseInt(e.target.value) })}
              />
              <span className="range-value">${calculatorInputs.visitCost}</span>
            </div>

            <div className="input-group-custom mb-4">
              <label>Emergency visits per year</label>
              <input
                type="range" className="form-range" min="0" max="10"
                value={calculatorInputs.emergencyVisits}
                onChange={(e) => setCalculatorInputs({ ...calculatorInputs, emergencyVisits: parseInt(e.target.value) })}
              />
              <span className="range-value">{calculatorInputs.emergencyVisits} visit{calculatorInputs.emergencyVisits !== 1 ? 's' : ''}</span>
            </div>

            <div className="input-group-custom mb-4">
              <label>Family members covered</label>
              <input
                type="range" className="form-range" min="1" max="10"
                value={calculatorInputs.familyMembers}
                onChange={(e) => setCalculatorInputs({ ...calculatorInputs, familyMembers: parseInt(e.target.value) })}
              />
              <span className="range-value">{calculatorInputs.familyMembers} members</span>
            </div>
          </div>

          <div className="calculator-results">
            <h4 className="mb-4">Your Estimated Savings</h4>

            <div className="savings-breakdown">
              <div className="savings-row">
                <span>Traditional Healthcare Cost</span>
                <span className="amount negative">${calculateSavings().traditional.toLocaleString()}/year</span>
              </div>
              <div className="savings-row">
                <span>HealthNexus Cost</span>
                <span className="amount">${calculateSavings().mediflow.toLocaleString()}/year</span>
              </div>
              <div className="savings-row total">
                <span>Total Annual Savings</span>
                <span className="amount positive">${calculateSavings().savings.toLocaleString()}</span>
              </div>
            </div>

            <div className="additional-benefits mt-4">
              <h5 className="mb-3">Plus These Benefits:</h5>
              <ul className="benefit-list-calc">
                <li><Check size={16} /> Save {calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 2} hours of waiting time</li>
                <li><Check size={16} /> No travel costs (${calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 25}+ saved)</li>
                <li><Check size={16} /> 24/7 doctor access</li>
                <li><Check size={16} /> Free health monitoring tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;