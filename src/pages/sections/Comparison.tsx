import {
  XCircle, CheckCircle, Clock, DollarSign, Activity, FileText, Globe, Pill
} from 'lucide-react';
import '../styles/comparison.css';

interface CalculatorInputs {
  doctorVisits: number;
  visitCost: number;
  emergencyVisits: number;
  familyMembers: number;
}

interface ComparisonProps {
  calculatorInputs: CalculatorInputs;
}

const comparisonRows = [
  {
    icon: <Clock size={20} />,
    label: 'Appointment Booking',
    traditional: { main: 'Phone calls during office hours', sub: '2-3 days wait time' },
    mediflow: { main: '24/7 instant online booking', sub: 'Book in 30 seconds' }
  },
  {
    icon: <DollarSign size={20} />,
    label: 'Average Consultation Cost',
    traditional: { main: '$150-300 + Travel costs', sub: 'Hidden fees common' },
    mediflow: { main: '$50-100 flat rate', sub: 'Save up to 70%' }
  },
  {
    icon: <Activity size={20} />,
    label: 'Wait Time',
    traditional: { main: '45-90 minutes in waiting room', sub: 'Plus travel time' },
    mediflow: { main: '0 minutes - Join instantly', sub: 'From anywhere' }
  },
  {
    icon: <FileText size={20} />,
    label: 'Medical Records',
    traditional: { main: 'Paper files, often lost', sub: 'Request takes days' },
    mediflow: { main: 'Digital, always accessible', sub: 'Instant access 24/7' }
  },
  {
    icon: <Globe size={20} />,
    label: 'Doctor Access',
    traditional: { main: 'Limited to local area', sub: 'Few specialists available' },
    mediflow: { main: 'Global specialist network', sub: '10,000+ verified doctors' }
  },
  {
    icon: <Pill size={20} />,
    label: 'Prescriptions',
    traditional: { main: 'Paper prescriptions', sub: 'Visit pharmacy in person' },
    mediflow: { main: 'E-prescriptions to pharmacy', sub: 'Home delivery available' }
  }
];

const Comparison = ({ calculatorInputs }: ComparisonProps) => {
  return (
    <section id="comparison" className="comparison-section py-5 animate-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-badge">COMPARISON</span>
          <h2 className="section-title mt-3">
            Traditional Healthcare vs
            <span className="gradient-text d-block">HealthNexus Platform</span>
          </h2>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Feature</th>
                <th className="traditional-col">
                  <div className="header-content">
                    <XCircle className="mb-2" size={32} />
                    <h4>Traditional Healthcare</h4>
                  </div>
                </th>
                <th className="mediflow-col">
                  <div className="header-content">
                    <CheckCircle className="mb-2" size={32} />
                    <h4>HealthNexus Platform</h4>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i}>
                  <td className="feature-name">
                    <span className="me-2">{row.icon}</span>
                    {row.label}
                  </td>
                  <td className="traditional">
                    <span className="negative">{row.traditional.main}</span>
                    <small className="d-block text-muted">{row.traditional.sub}</small>
                  </td>
                  <td className="mediflow">
                    <span className="positive">{row.mediflow.main}</span>
                    <small className="d-block text-success">{row.mediflow.sub}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="savings-calculator mt-5">
          <div className="calculator-card">
            <h4 className="text-center mb-4">User Annual Savings with HealthNexus</h4>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="saving-item">
                  <h3 className="saving-amount">
                    ${(calculatorInputs.doctorVisits * (calculatorInputs.visitCost - 60) * calculatorInputs.familyMembers).toLocaleString()}+
                  </h3>
                  <p className="saving-label">Consultation Fees</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="saving-item">
                  <h3 className="saving-amount">{calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 2} Hours</h3>
                  <p className="saving-label">Time Saved</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="saving-item">
                  <h3 className="saving-amount">
                    ${(calculatorInputs.doctorVisits * calculatorInputs.familyMembers * 25).toLocaleString()}+
                  </h3>
                  <p className="saving-label">Travel Costs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;