import PremiumNav from './sections/NavBar';
import Comparison from './sections/Comparison';
import Footer from './sections/Footer';

const ComparisonPage = () => {
  // Dummy data for the calculator, as it's part of the original MainPage
  const calculatorInputs = {
    doctorVisits: 5,
    visitCost: 150,
    emergencyVisits: 1,
    familyMembers: 4,
  };

  return (
    <>
      <PremiumNav />
      <main>
        <Comparison calculatorInputs={calculatorInputs} />
      </main>
      <Footer />
    </>
  );
};

export default ComparisonPage;
