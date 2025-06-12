import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav, Card } from 'react-bootstrap';
import { Calendar, Users, Shield, Clock, ChevronRight, Star, Heart, Activity } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Calendar className="text-primary-custom" size={32} />,
      title: "Easy Appointment Booking",
      description: "Book appointments with top doctors in just a few clicks"
    },
    {
      icon: <Users className="text-primary-custom" size={32} />,
      title: "Expert Doctors",
      description: "Access to verified and experienced healthcare professionals"
    },
    {
      icon: <Shield className="text-primary-custom" size={32} />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: <Clock className="text-primary-custom" size={32} />,
      title: "24/7 Availability",
      description: "Round-the-clock access to medical consultations"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "The best healthcare platform I've ever used. Booking appointments is so easy!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "This platform has streamlined my practice and improved patient care significantly.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Patient",
      content: "Video consultations saved me so much time. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Heart className="text-primary-custom me-2" size={32} />
            <span className="fs-4 fw-bold">HealthCare</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/doctors">Find Doctors</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Link to="/login" className="btn btn-secondary-custom ms-2">Login</Link>
              <Link to="/register" className="btn btn-primary-custom ms-2">Sign Up</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="animate-fade-in">
              <h1 className="display-4 fw-bold mb-4">
                Your Health, <span className="text-primary-custom">Our Priority</span>
              </h1>
              <p className="lead text-muted mb-4">
                Connect with top healthcare professionals, book appointments instantly, 
                and manage your health journey all in one place.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/register" className="btn btn-primary-custom d-flex align-items-center">
                  Get Started <ChevronRight className="ms-2" size={20} />
                </Link>
                <Link to="/doctors" className="btn btn-secondary-custom">
                  Find Doctors
                </Link>
              </div>
              <Row className="mt-5">
                <Col xs={4}>
                  <h3 className="text-primary-custom fw-bold">1000+</h3>
                  <p className="text-muted">Expert Doctors</p>
                </Col>
                <Col xs={4}>
                  <h3 className="text-primary-custom fw-bold">50k+</h3>
                  <p className="text-muted">Happy Patients</p>
                </Col>
                <Col xs={4}>
                  <h3 className="text-primary-custom fw-bold">4.9</h3>
                  <p className="text-muted">Average Rating</p>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div className="bg-primary-light rounded-4 p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop" 
                    alt="Doctor" 
                    className="img-fluid rounded-3 shadow"
                  />
                </div>
                <Card className="position-absolute bottom-0 start-0 ms-n3 mb-n3 shadow animate-slide-up">
                  <Card.Body className="p-3">
                    <Activity className="text-success mb-2" size={32} />
                    <h6 className="mb-1">Health Monitoring</h6>
                    <small className="text-muted">Track your vitals</small>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose HealthCare?</h2>
            <p className="lead text-muted">Experience healthcare like never before</p>
          </div>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="h-100 custom-card text-center border-0">
                  <Card.Body className="p-4">
                    <div className="mb-3">{feature.icon}</div>
                    <h5 className="mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted">Real experiences from real people</p>
          </div>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 custom-card">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-warning" fill="currentColor" size={20} />
                      ))}
                    </div>
                    <p className="text-muted mb-3">"{testimonial.content}"</p>
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary-custom text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
          <p className="lead mb-4 opacity-75">Join thousands of satisfied patients today</p>
          <Link to="/register" className="btn btn-light btn-lg px-4 py-2 d-inline-flex align-items-center">
            Create Free Account <ChevronRight className="ms-2" size={20} />
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row className="g-4">
            <Col md={3}>
              <div className="d-flex align-items-center mb-3">
                <Heart className="text-primary-custom me-2" size={32} />
                <span className="fs-4 fw-bold">HealthCare</span>
              </div>
              <p className="text-muted">Your trusted partner in health and wellness.</p>
            </Col>
            <Col md={3}>
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
                <li><Link to="/doctors" className="text-muted text-decoration-none">Find Doctors</Link></li>
                <li><Link to="/services" className="text-muted text-decoration-none">Services</Link></li>
                <li><Link to="/blog" className="text-muted text-decoration-none">Blog</Link></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="mb-3">Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></li>
                <li><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="mb-3">Contact Info</h5>
              <ul className="list-unstyled text-muted">
                <li>📧 support@healthcare.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Health Street, Medical City</li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4 bg-secondary" />
          <div className="text-center text-muted">
            <p>&copy; 2024 HealthCare. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;