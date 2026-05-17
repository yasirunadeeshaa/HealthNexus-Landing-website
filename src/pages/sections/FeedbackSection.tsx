import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Star, CheckCircle } from 'lucide-react';

const feedbackStyles = `
  .fb-section {
    position: relative;
    padding: 100px 0;
    overflow: hidden;
  }

  .fb-section::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.08;
    pointer-events: none;
  }

  .fb-container {
    max-width: 620px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ── Header ── */
  .fb-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .fb-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    padding: 5px 14px;
    border-radius: 50px;
    background: rgba(102, 126, 234, 0.1);
    color: #4c35a0;
    border: 1px solid rgba(102, 126, 234, 0.25);
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .fb-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #1a202c;
    letter-spacing: -1px;
    line-height: 1.15;
    margin: 0 0 0.75rem;
  }

  .fb-title span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: gradientFlow 8s ease-in-out infinite;
  }

  .fb-subtitle {
    font-size: 0.95rem;
    color: #64748b;
    font-weight: 500;
    line-height: 1.7;
    margin: 0;
  }

  /* ── Card ── */
  .fb-card {
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1.5px solid rgba(102, 126, 234, 0.15);
    border-radius: 28px;
    padding: 2.5rem;
    box-shadow:
      0 24px 64px rgba(102, 126, 234, 0.12),
      0 4px 16px rgba(0, 0, 0, 0.06),
      0 0 0 0.5px rgba(255, 255, 255, 0.8) inset;
  }

  /* ── Form fields ── */
  .fb-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .fb-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
  }

  .fb-field:last-of-type {
    margin-bottom: 0;
  }

  .fb-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #4a5568;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .fb-input,
  .fb-textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #1a202c;
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(102, 126, 234, 0.18);
    border-radius: 14px;
    outline: none;
    font-family: inherit;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .fb-input:focus,
  .fb-textarea:focus {
    border-color: rgba(102, 126, 234, 0.55);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .fb-input::placeholder,
  .fb-textarea::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }

  .fb-textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
  }

  /* ── Star Rating ── */
  .fb-stars {
    display: flex;
    gap: 6px;
    margin-bottom: 1.25rem;
  }

  .fb-star {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: #d1d5db;
    line-height: 1;
  }

  .fb-star:hover,
  .fb-star--active {
    color: #fbbf24;
  }

  .fb-star:hover {
    transform: scale(1.25);
  }

  .fb-star-label {
    font-size: 0.8rem;
    color: #8896a8;
    font-weight: 500;
    margin-left: 8px;
    align-self: center;
  }

  .fb-stars-row {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  /* ── Submit button ── */
  .fb-submit {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0.85rem 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    background-size: 200% auto;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow:
      0 4px 18px rgba(102, 126, 234, 0.4),
      0 1px 4px rgba(0, 0, 0, 0.1);
    transition:
      background-position 0.4s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease;
  }

  .fb-submit:hover:not(:disabled) {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow:
      0 8px 28px rgba(102, 126, 234, 0.5),
      0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .fb-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* ── Success state ── */
  .fb-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem;
    gap: 1rem;
    animation: fadeInUp 0.5s ease;
  }

  .fb-success-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(72, 187, 120, 0.12);
    border: 2px solid rgba(72, 187, 120, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #48bb78;
    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fb-success h3 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a202c;
    margin: 0;
  }

  .fb-success p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
  }

  @keyframes scaleIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }

  /* ── Error message ── */
  .fb-error {
    font-size: 0.82rem;
    color: #e53e3e;
    text-align: center;
    margin-top: 0.75rem;
    font-weight: 500;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .fb-row {
      grid-template-columns: 1fr;
    }
    .fb-card {
      padding: 1.75rem 1.25rem;
      border-radius: 20px;
    }
    .fb-title {
      font-size: 1.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fb-submit,
    .fb-star,
    .fb-success-icon {
      animation: none;
      transition: none;
    }
  }
`;

const starLabels = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

const FeedbackSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setStatus('sending');

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      rating:     `${rating} / 5 — ${starLabels[rating - 1]}`,
    };

    try {
      // 1️⃣ Send notification to YOU
      await emailjs.send(
        'service_9h7w8zh',
        'template_ow957uh',       // your existing template
        templateParams,
        'OKis1tF-wFSkRhwFg'
      );

      // 2️⃣ Send confirmation reply to the USER
      await emailjs.send(
        'service_9h7w8zh',
        'template_en5u8ix',      // 🔁 replace with your new template ID
        templateParams,
        'OKis1tF-wFSkRhwFg'
      );

      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const activeRating = hovered || rating;

  return (
    <>
      <style>{feedbackStyles}</style>

      <section id="feedback" className="fb-section">
        <div className="fb-container">

          {/* ── Header ── */}
          <div className="fb-header">
            <span className="fb-badge">💬 Share Your Thoughts</span>
            <h2 className="fb-title">
              Help Shape <span>HealthNexus</span>
            </h2>
            <p className="fb-subtitle">
              Your feedback directly influences the next version.
              Tell me what you think — every insight matters.
            </p>
          </div>

          {/* ── Card ── */}
          <div className="fb-card">
            {status === 'success' ? (
              <div className="fb-success">
                <div className="fb-success-icon">
                  <CheckCircle size={36} />
                </div>
                <h3>Thank you so much! 🎉</h3>
                <p>
                  Your feedback has been received and will help shape
                  the official release of HealthNexus.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Name + Email */}
                <div className="fb-row">
                  <div className="fb-field">
                    <label className="fb-label">Your Name</label>
                    <input
                      className="fb-input"
                      type="text"
                      name="name"
                      placeholder="John Silva"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="fb-field">
                    <label className="fb-label">Email Address</label>
                    <input
                      className="fb-input"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="fb-field">
                  <label className="fb-label">Your Rating</label>
                  <div className="fb-stars-row">
                    <div className="fb-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`fb-star ${star <= activeRating ? 'fb-star--active' : ''}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          aria-label={`Rate ${star} out of 5`}
                        >
                          <Star
                            size={28}
                            fill={star <= activeRating ? '#fbbf24' : 'none'}
                          />
                        </button>
                      ))}
                    </div>
                    {activeRating > 0 && (
                      <span className="fb-star-label">
                        {starLabels[activeRating - 1]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="fb-field">
                  <label className="fb-label">Your Thoughts</label>
                  <textarea
                    className="fb-textarea"
                    name="message"
                    placeholder="What do you think about HealthNexus? Any features you'd love to see?"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="fb-submit"
                  disabled={status === 'sending' || rating === 0}
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Feedback
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="fb-error">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default FeedbackSection;