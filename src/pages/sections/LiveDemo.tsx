import {
  Video, Calendar, Search, FileText, Wifi, MessageSquare, Camera, Share2, Mic, Phone,
  ChevronLeft, ChevronRight, CheckCircle, Star, Building, Send
} from 'lucide-react';
import '../LiveDemo.css';

interface LiveDemoProps {
  activeDemo: string;
  setActiveDemo: (demo: string) => void;
}

const LiveDemo = ({ activeDemo, setActiveDemo }: LiveDemoProps) => {
  return (
    <section id="live-demo" className="live-demo-section py-5 animate-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-badge">LIVE DEMO</span>
          <h2 className="section-title mt-3">
            Experience HealthNexus
            <span className="gradient-text d-block">In Action</span>
          </h2>
        </div>

        <div className="demo-container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="demo-sidebar">
                <h4 className="mb-4">Try Our Features</h4>
                <div className="demo-options">
                  {[
                    { key: 'video', icon: <Video size={20} />, label: 'Video Consultation' },
                    { key: 'booking', icon: <Calendar size={20} />, label: 'Book Appointment' },
                    { key: 'doctors', icon: <Search size={20} />, label: 'Find Doctors' },
                    { key: 'prescription', icon: <FileText size={20} />, label: 'E-Prescription' }
                  ].map(({ key, icon, label }) => (
                    <button
                      key={key}
                      className={`demo-option ${activeDemo === key ? 'active' : ''}`}
                      onClick={() => setActiveDemo(key)}
                    >
                      <span className="me-2">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="feature-info-card mt-4">
                  <h5>
                    {activeDemo === 'video' && 'HD Video Calls'}
                    {activeDemo === 'booking' && 'Smart Scheduling'}
                    {activeDemo === 'doctors' && 'Find Specialists'}
                    {activeDemo === 'prescription' && 'Digital Prescriptions'}
                  </h5>
                  <p className="text-muted small">
                    {activeDemo === 'video' && 'Connect with doctors instantly through secure HD video consultations'}
                    {activeDemo === 'booking' && 'Book appointments in seconds with real-time availability'}
                    {activeDemo === 'doctors' && 'Search from 10,000+ verified doctors by specialty and location'}
                    {activeDemo === 'prescription' && 'Get digital prescriptions sent directly to your pharmacy'}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="demo-screen">
                <div className="demo-header">
                  <div className="demo-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <span className="demo-title">
                    HealthNexus -{' '}
                    {activeDemo === 'video' && 'Video Consultation'}
                    {activeDemo === 'booking' && 'Appointment Booking'}
                    {activeDemo === 'doctors' && 'Find Doctors'}
                    {activeDemo === 'prescription' && 'E-Prescription'}
                  </span>
                  <div className="demo-time">2:45 PM</div>
                </div>

                <div className="demo-content">
                  {/* Video Consultation */}
                  {activeDemo === 'video' && (
                    <div className="video-consultation-demo fade-in">
                      <div className="video-grid">
                        <div className="video-participant doctor">
                          <img src="https://i.pravatar.cc/300?img=12" alt="Doctor" />
                          <div className="participant-info">
                            <span className="name">Dr. Sarah Johnson</span>
                            <span className="status">Cardiologist</span>
                          </div>
                          <div className="connection-quality">
                            <Wifi size={16} /><span>Excellent</span>
                          </div>
                        </div>
                        <div className="video-participant patient">
                          <img src="https://i.pravatar.cc/300?img=5" alt="Patient" />
                          <div className="participant-info">
                            <span className="name">You</span>
                            <span className="status">Connected</span>
                          </div>
                        </div>
                      </div>
                      <div className="consultation-tools">
                        <button className="tool-btn"><MessageSquare size={18} /><span>Chat</span></button>
                        <button className="tool-btn"><FileText size={18} /><span>Notes</span></button>
                        <button className="tool-btn"><Camera size={18} /><span>Capture</span></button>
                      </div>
                      <div className="video-controls">
                        <button className="control-btn"><Mic size={20} /></button>
                        <button className="control-btn"><Video size={20} /></button>
                        <button className="control-btn"><Share2 size={20} /></button>
                        <button className="control-btn end-call"><Phone size={20} /></button>
                      </div>
                    </div>
                  )}

                  {/* Booking Demo */}
                  {activeDemo === 'booking' && (
                    <div className="booking-demo fade-in">
                      <div className="booking-calendar">
                        <div className="calendar-header">
                          <h5>December 2024</h5>
                          <div className="calendar-nav">
                            <ChevronLeft size={20} />
                            <ChevronRight size={20} />
                          </div>
                        </div>
                        <div className="calendar-grid">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="calendar-day available">
                              <span>{20 + i}</span>
                              <small>4 slots</small>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="time-slots">
                        <h6>Available Times</h6>
                        <div className="slots-grid">
                          {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, i) => (
                            <button key={i} className={`time-slot ${i === 2 ? 'selected' : ''}`}>{time}</button>
                          ))}
                        </div>
                      </div>
                      <button className="btn btn-primary w-100 mt-4">
                        Confirm Appointment <CheckCircle className="ms-2" size={20} />
                      </button>
                    </div>
                  )}

                  {/* Find Doctors Demo */}
                  {activeDemo === 'doctors' && (
                    <div className="doctors-demo fade-in">
                      <div className="search-bar mb-4">
                        <Search size={20} />
                        <input type="text" placeholder="Search by specialty, condition, or doctor name" />
                      </div>
                      <div className="filter-tags">
                        <span className="tag active">Cardiologist</span>
                        <span className="tag">Near me</span>
                        <span className="tag">Available today</span>
                        <span className="tag">4+ rating</span>
                      </div>
                      <div className="doctors-list">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="doctor-card">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Doctor" />
                            <div className="doctor-info">
                              <h6>Dr. {['Michael Chen', 'Emily Brown', 'James Wilson'][i]}</h6>
                              <p>{['Cardiologist', 'Heart Specialist', 'Cardiac Surgeon'][i]}</p>
                              <div className="doctor-meta">
                                <span><Star size={14} /> 4.{8 - i}/5</span>
                                <span>{15 + i * 5} years exp</span>
                                <span className="available">Available</span>
                              </div>
                            </div>
                            <button className="book-btn">Book</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* E-Prescription Demo */}
                  {activeDemo === 'prescription' && (
                    <div className="prescription-demo fade-in">
                      <div className="prescription-header">
                        <div className="rx-symbol">℞</div>
                        <div className="prescription-info">
                          <h5>Digital Prescription</h5>
                          <p className="text-muted">Dr. Sarah Johnson • Dec 20, 2024</p>
                        </div>
                      </div>
                      <div className="medications-list">
                        <div className="medication-item">
                          <div className="med-icon">💊</div>
                          <div className="med-details">
                            <h6>Lisinopril</h6>
                            <p>10mg - Once daily with food</p>
                            <span className="duration">30 days supply</span>
                          </div>
                        </div>
                        <div className="medication-item">
                          <div className="med-icon">💊</div>
                          <div className="med-details">
                            <h6>Metformin</h6>
                            <p>500mg - Twice daily</p>
                            <span className="duration">90 days supply</span>
                          </div>
                        </div>
                      </div>
                      <div className="pharmacy-section">
                        <h6>Send to Pharmacy</h6>
                        <div className="pharmacy-selector">
                          <Building size={20} />
                          <select>
                            <option>CVS Pharmacy - 2 miles</option>
                            <option>Walgreens - 3 miles</option>
                          </select>
                        </div>
                        <button className="btn btn-success w-100 mt-3">
                          Send Prescription <Send className="ms-2" size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;