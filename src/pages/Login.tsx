import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email === 'demo@healthcare.com' && formData.password === 'password123') {
      toast.success('Login successful!');
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Try demo@healthcare.com / password123');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-vh-100 bg-primary-light d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none d-inline-flex align-items-center">
                <Heart className="text-primary-custom me-2" size={40} />
                <span className="fs-2 fw-bold text-dark">HealthCare</span>
              </Link>
            </div>

            {/* Login Card */}
            <Card className="custom-card border-0 shadow">
              <Card.Body className="p-4">
                <h2 className="fw-bold mb-2">Welcome back!</h2>
                <p className="text-muted mb-4">Please login to your account</p>

                <Form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <Mail size={20} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control-custom border-start-0"
                        placeholder="demo@healthcare.com"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Password Input */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <Lock size={20} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control-custom border-start-0 border-end-0"
                        placeholder="password123"
                        required
                      />
                      <InputGroup.Text 
                        className="bg-light border-start-0"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between mb-4">
                    <Form.Check 
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                    <Link to="/forgot-password" className="text-decoration-none text-primary-custom">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="btn-primary-custom w-100 mb-3">
                    Sign In
                  </Button>

                  {/* Demo Credentials */}
                  <Alert variant="info" className="py-2">
                    <small>
                      <strong>Demo Credentials:</strong><br />
                      Email: demo@healthcare.com<br />
                      Password: password123
                    </small>
                  </Alert>

                  {/* Divider */}
                  <div className="position-relative my-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      Or continue with
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

                {/* Sign Up Link */}
                <p className="text-center mt-4 mb-0 text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-custom text-decoration-none fw-medium">
                    Sign up
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

export default Login;