import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link to="/" className="footer__brand-name">
              MAHAM<span className="footer__brand-name span">CLOTHING</span>
            </Link>
            <p className="footer__brand-desc">
              Experience the pinnacle of luxurious, modern fashion. Curated fabrics, bespoke tailoring, and timeless styling details crafted for the discerning eye.
            </p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__column-title">Collections</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/shop?category=men" className="footer__link">Men's Wardrobe</Link></li>
              <li><Link to="/shop?category=women" className="footer__link">Women's Collection</Link></li>
              <li><Link to="/shop?category=accessories" className="footer__link">Luxury Accessories</Link></li>
              <li><Link to="/shop" className="footer__link">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__column-title">Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/about" className="footer__link">Our Story</Link></li>
              <li><Link to="/about" className="footer__link">Sustainability</Link></li>
              <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
              <li><Link to="/about" className="footer__link">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__column-title">Newsletter</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '15px', lineHeight: '1.5' }}>
              Subscribe to unlock privileged early access to new launches, capsule collections, and bespoke store events.
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--color-accent)', fontSize: '14px', fontWeight: '500' }}>
                Thank you for subscribing to our mailing list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', borderBottom: '1px solid var(--color-accent)', paddingBottom: '5px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, fontSize: '13px', padding: '5px 0' }}
                />
                <button type="submit" style={{ color: 'var(--color-accent)', padding: '5px' }} aria-label="Subscribe">
                  <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="divider" style={{ margin: '30px 0 20px 0' }}></div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Maham Clothing Store. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#privacy" className="footer__bottom-link">Privacy Policy</a>
            <a href="#terms" className="footer__bottom-link">Terms of Service</a>
            <a href="#cookies" className="footer__bottom-link">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
