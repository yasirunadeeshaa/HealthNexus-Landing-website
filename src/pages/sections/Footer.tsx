import { Heart, Globe, Smartphone } from 'lucide-react';
import '../Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top py-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-brand">
                <div className="d-flex align-items-center mb-3">
                  <Heart className="text-primary me-2" size={32} />
                  <span className="fs-4 fw-bold">HealthNexus</span>
                </div>
                <p className="footer-description">
                  Your trusted partner in digital healthcare, making quality medical care accessible to everyone, everywhere.
                </p>
                <div className="social-links mt-4">
                  <a href="#" className="social-link"><Globe size={20} /></a>
                  <a href="#" className="social-link"><Smartphone size={20} /></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Product</h5>
              <ul className="footer-links">
                {['Features', 'Pricing', 'For Doctors', 'For Hospitals'].map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Company</h5>
              <ul className="footer-links">
                {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Download</h5>
              <div className="app-buttons">
                <button className="app-button mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                </button>
                <button className="app-button">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom py-4">
          <div className="text-center">
            <p className="mb-0">© 2024 HealthNexus. All rights reserved. Join with HealthNexus for better health.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;