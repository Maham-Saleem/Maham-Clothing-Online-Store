import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact page-transition">
      <div className="container">
        <div className="shop__header" style={{ marginBottom: '60px' }}>
          <span className="section-label">CONTACT US</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Whether you need sizing advice, details on capsule commissions, or delivery support, our concierge division is at your disposal.
          </p>
        </div>

        <div className="contact__grid">
          {/* Coordinates */}
          <div className="contact__info">
            <h2 className="contact__info-title">Boutique Coordinates</h2>
            <p className="contact__info-text">
              Visit our flagship flagship showroom or consult our stylists via email or phone.
            </p>

            <div className="contact__info-items">
              {/* Item 1 */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="contact__info-label">Address</h4>
                  <p className="contact__info-value">
                    45 Golden Gate Boulevard, Suite 200,<br />
                    Milan, Lombardy, Italy
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="contact__info-label">Phone</h4>
                  <p className="contact__info-value">+39 02 876 5432</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FiMail />
                </div>
                <div>
                  <h4 className="contact__info-label">Styling Concierge</h4>
                  <p className="contact__info-value">concierge@mahamclothing.com</p>
                </div>
              </div>
            </div>

            {/* Embedded boutique map placeholder */}
            <div
              style={{
                marginTop: '40px',
                height: '220px',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.05) 0%, rgba(0, 0, 0, 0.4) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: '14px'
              }}
            >
              Interactive Milan Boutique Map Placeholder
            </div>
          </div>

          {/* Form */}
          <div className="contact__form">
            {submitted ? (
              <div className="contact__form-success">
                <div className="contact__form-success-icon">
                  <FiCheck style={{ color: 'var(--color-success)' }} />
                </div>
                <h3 className="heading-sm" style={{ color: 'var(--color-text-primary)', marginBottom: '10px' }}>Inquiry Sent Successfully</h3>
                <p className="text-secondary" style={{ fontSize: '14px' }}>
                  Thank you for contacting us. A dedicated styling consultant will review your inquiry and reach out within 24 hours.
                </p>
                <button className="btn btn--outline" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Send a Message</h3>
                
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label className="contact__form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="contact__form-input"
                    />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="contact__form-input"
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label className="contact__form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Bespoke Fitting Appointment"
                    className="contact__form-input"
                  />
                </div>

                <div className="contact__form-group">
                  <label className="contact__form-label">Message Details</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify size requirements or styling options..."
                    className="contact__form-input contact__form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
