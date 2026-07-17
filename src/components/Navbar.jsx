import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount, wishlist } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            MAHAM<span className="navbar__logo-accent">CLOTHING</span>
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`navbar__link ${
                  location.pathname === link.path ? 'navbar__link--active' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            <Link
              to="/shop"
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              title="Wishlist"
              className="navbar__cart-btn"
            >
              <FiHeart />
              {wishlist.length > 0 && (
                <span className="navbar__cart-badge" style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg-primary)' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="navbar__cart-btn" title="Shopping Bag">
              <FiShoppingBag />
              {getCartCount() > 0 && (
                <span className="navbar__cart-badge">{getCartCount()}</span>
              )}
            </Link>

            <button
              className="navbar__mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="navbar__overlay navbar__overlay--open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="navbar__mobile-menu navbar__mobile-menu--open"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <button
                className="navbar__mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FiX />
              </button>

              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link to="/" className="navbar__logo" style={{ marginBottom: '20px' }}>
                  MAHAM<span className="navbar__logo-accent">CLOTHING</span>
                </Link>
                
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`navbar__mobile-link ${
                      location.pathname === link.path ? 'navbar__link--active' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  to="/cart"
                  className="navbar__mobile-link"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>Shopping Bag</span>
                  {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
