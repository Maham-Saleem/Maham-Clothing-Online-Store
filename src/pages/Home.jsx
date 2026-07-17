import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiStar } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Grab the first 4 products for featured/trending
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(1, 5);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="page-transition">
      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero-banner.jpg" alt="Maham Clothing Luxury Banner" />
        </div>
        <div className="hero__overlay" />
        
        <div className="container">
          <div className="hero__content">
            <motion.p
              className="hero__label"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PREMIUM CAPSULE COLLECTION
            </motion.p>
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Elevating the Art of <span>Modern Styling</span>
            </motion.h1>
            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Discover bespoke couture and modern wardrobe essentials defined by curated premium fabrics, precise cuts, and meticulous detailing.
            </motion.p>
            
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link to="/shop" className="btn btn--primary btn--lg">
                Explore Shop <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn--glass btn--lg">
                Our Story
              </Link>
            </motion.div>

            <motion.div
              className="hero__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div>
                <div className="hero__stat-number">100%</div>
                <div className="hero__stat-label">Organic Cotton & Silk</div>
              </div>
              <div>
                <div className="hero__stat-number">25k+</div>
                <div className="hero__stat-label">Happy Patrons</div>
              </div>
              <div>
                <div className="hero__stat-number">Bespoke</div>
                <div className="hero__stat-label">Limited Launches</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">CURATED WARDROBES</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Explore hand-selected fabric edits compiled for different moments, moods, and aesthetics.
            </p>
          </div>

          <div className="categories__grid">
            {/* Category Men */}
            <Link to="/shop?category=men">
              <div className="category-card">
                <img src="/images/category-men.jpg" alt="Men's Collection" className="category-card__image" />
                <div className="category-card__overlay">
                  <h3 className="category-card__title">Men's Wardrobe</h3>
                  <p className="category-card__count">Custom Suits & Jackets</p>
                  <span className="category-card__cta">Shop Collection <FiArrowRight /></span>
                </div>
              </div>
            </Link>

            {/* Category Women */}
            <Link to="/shop?category=women">
              <div className="category-card">
                <img src="/images/category-women.jpg" alt="Women's Collection" className="category-card__image" />
                <div className="category-card__overlay">
                  <h3 className="category-card__title">Women's Edit</h3>
                  <p className="category-card__count">Silk Blouses & Evening Gowns</p>
                  <span className="category-card__cta">Shop Collection <FiArrowRight /></span>
                </div>
              </div>
            </Link>

            {/* Category Accessories */}
            <Link to="/shop?category=accessories">
              <div className="category-card">
                <img src="/images/category-accessories.jpg" alt="Accessories" className="category-card__image" />
                <div className="category-card__overlay">
                  <h3 className="category-card__title">Luxury Accessories</h3>
                  <p className="category-card__count">Chronographs & Saffiano Leather</p>
                  <span className="category-card__cta">Shop Collection <FiArrowRight /></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">THE LATEST EDITS</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Unveiling our newest luxury additions, combining contemporary aesthetics with timeless tailoring details.
            </p>
          </div>

          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/shop" className="btn btn--outline btn--lg">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRENDING PRODUCTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">MOST DESIRED CAPSULES</span>
            <h2 className="section-title">Trending Styles</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Browse through pieces most requested by our premium patrons and design aficionados.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">PATRON VOICES</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <motion.div
            className="grid grid--3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ marginTop: '40px' }}
          >
            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-card__stars">
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
              </div>
              <p className="testimonial-card__text">
                "The classic leather jacket from Maham Clothing is truly of bespoke craftsmanship. The leather feels butter-soft, fits beautifully, and the golden zippers add a rich luxury touch. Delivery was prompt."
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">SM</div>
                <div>
                  <h4 className="testimonial-card__name">Suleman Malik</h4>
                  <p className="testimonial-card__role">Fashion Architect</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-card__stars">
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
              </div>
              <p className="testimonial-card__text">
                "I ordered the Ivory Silk Blouse. The drape is incredibly fluid, almost liquid-like under spotlight. It's rare to find 100% pure silk at this quality level. Will definitely purchase again."
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">AH</div>
                <div>
                  <h4 className="testimonial-card__name">Ayla Hameed</h4>
                  <p className="testimonial-card__role">Creative Director</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-card__stars">
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
                <FiStar fill="#c9a96e" />
              </div>
              <p className="testimonial-card__text">
                "The Saffiano Leather Bag exceeded my expectations. Beautifully structured, heavy-duty stitching, and a gorgeous dark layout that perfectly fits all my daily essentials. Essential luxury item."
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">ZN</div>
                <div>
                  <h4 className="testimonial-card__name">Zara Naqvi</h4>
                  <p className="testimonial-card__role">Senior Brand Consultant</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="section">
        <div className="container">
          <div className="newsletter__card">
            <h2 className="newsletter__title">Join the Inner Circle</h2>
            <p className="newsletter__subtitle">
              Receive early-bird invitations to exclusive sample sales, seasonal launches, and styling portfolios.
            </p>
            
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for joining the Inner Circle of Maham Clothing.');
                }}
                className="newsletter__form"
              >
                <input
                  type="email"
                  placeholder="Enter your private email"
                  required
                  className="newsletter__input"
                />
                <button type="submit" className="btn btn--primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
