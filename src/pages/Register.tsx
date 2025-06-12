import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Register = ({ setIsAuthenticated }: RegisterProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    toast.success('Registration successful! Welcome to HealthCare!');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-vh-100 bg-primary-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7} xl={6}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none d-inline-flex align-items-center">
                <Heart className="text-primary-custom me-2" size={40} />
                <span className="fs-2 fw-bold text-dark">HealthCare</span>
              </Link>
            </div>

            {/* Register Card */}
            <Card className="custom-card border-0 shadow">
              <Card.Body className="p-4">
                <h2 className="fw-bold mb-2">Create your account</h2>
                <p className="text-muted mb-4">Join thousands of patients managing their health online</p>

                <Form onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">First Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <User size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control-custom"
                            placeholder="John"
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">Last Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <User size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-control-custom"
                            placeholder="Doe"
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Email Input */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        <Mail size={20} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control-custom"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Phone and DOB */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">Phone Number</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <Phone size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control-custom"
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">Date of Birth</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <Calendar size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="form-control-custom"
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Password Fields */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <Lock size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control-custom border-end-0"
                            placeholder="Min 8 characters"
                            required
                          />
                          <InputGroup.Text 
                            className="bg-light"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">Confirm Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <Lock size={20} className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control-custom border-end-0"
                            placeholder="Confirm password"
                            required
                          />
                          <InputGroup.Text 
                            className="bg-light"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Terms & Conditions */}
                  <Form.Group className="mb-4">
                    <Form.Check 
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      label={
                        <span className="text-muted">
                          I agree to the{' '}
                          <Link to="/terms" className="text-primary-custom text-decoration-none">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-primary-custom text-decoration-none">
                            Privacy Policy
                          </Link>
                        </span>
                      }
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button type="submit" className="btn-primary-custom w-100 mb-3">
                    Create Account
                  </Button>

                  {/* Divider */}
                  <div className="position-relative my-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      Or register with
                    </span>
                  </div>

                  {/* Social Login */}
                  <Row className="g-2">
                    <Col xs={6}>
                      <Button variant="light" className="w-100 border d-flex align-items-center justify-content-center">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="Google" className="me-2" />
                        Google
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button variant="light" className="w-100 border d-flex align-items-center justify-content-center">
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" width="20" alt="Facebook" className="me-2" />
                        Facebook
                      </Button>
                    </Col>
                  </Row>
                </Form>

                {/* Sign In Link */}
                <p className="text-center mt-4 mb-0 text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-custom text-decoration-none fw-medium">
                    Sign in
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;