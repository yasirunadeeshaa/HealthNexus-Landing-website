import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './MainPage';
import ApiDocumentation from './pages/ApiDocumentation';
import ComparisonPage from './pages/ComparisonPage';
import DiseaseRiskPredictionSection from './pages/DiseaseRiskPredictionSection';
import DiabetesPredictionSection from './pages/DiabetesPredictionSection';
import Features from './pages/Features';
import PatientDemo from './pages/Patienthealthdemo';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api-docs" element={<ApiDocumentation />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/diabetes-prediction" element={<DiabetesPredictionSection />} />
        <Route path="/disease-risk-prediction" element={<DiseaseRiskPredictionSection />} />
        <Route path="/features" element={<Features />} />
        <Route path="/patient-demo" element={<PatientDemo />} />
      </Routes>
    </Router>
  );
}

export default App;