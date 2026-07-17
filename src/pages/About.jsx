import React from 'react';
import { FaCrown, FaGem, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about page-transition">
      <div className="container">
        {/* About Hero */}
        <div className="about__hero">
          <span className="section-label">MAHAM CLOTHING BRAND</span>
          <h1 className="about__hero-title">Redefining Wardrobe Couture</h1>
          <p className="about__hero-text">
            Maham Clothing was founded with a singular, uncompromising vision: to create luxury garments that serve as a testament to bespoke Italian craftsmanship, visual simplicity, and structural durability.
          </p>
        </div>

        {/* Brand Narrative Section */}
        <section className="about__story">
          <div className="about__story-image">
            <img src="/images/hero-banner.jpg" alt="Tailoring Craftsmanship" />
          </div>
          <div className="about__story-content">
            <h3>Bespoke Italian Threading</h3>
            <p>
              Every garment begins its journey as a conceptual sketch in our studio. We source our threads, mulberry silks, and wool blends exclusively from family-run mills in Biella, Italy, ensuring that each fabric holds a beautiful, natural density and soft touch.
            </p>
            <p>
              We believe in deliberate fashion. Rather than mass producing, we compile small capsule collections. This focus on limited quantities permits our tailors to focus intensely on details: hand-stitched lining, reinforced seams, and custom gold zipper pullers.
            </p>
            <p>
              When you wear a piece from Maham Clothing, you are wearing hours of dedicated artistry and design refinement.
            </p>
          </div>
        </section>

        {/* Values / Cards Section */}
        <section className="about__values">
          <div className="section-header" style={{ marginBottom: '50px' }}>
            <span className="section-label">OUR CORE PHILOSOPHY</span>
            <h2 className="section-title">Our Three Pillars</h2>
          </div>

          <div className="about__values-grid">
            {/* Pillar 1 */}
            <div className="about__value-card">
              <FaCrown className="about__value-icon" />
              <h3 className="about__value-title">Bespoke Design</h3>
              <p className="about__value-text">
                Clean lines, minimalist palettes, and luxurious accents. Our garments are engineered to offer a visual silhouette that is both contemporary and timeless.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="about__value-card">
              <FaGem className="about__value-icon" />
              <h3 className="about__value-title">Premium Materials</h3>
              <p className="about__value-text">
                From 100% pure Italian cashmere to premium mulberry silk and full-grain saffiano leather. We compromise on nothing to ensure absolute comfort.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="about__value-card">
              <FaLeaf className="about__value-icon" />
              <h3 className="about__value-title">Conscious Luxury</h3>
              <p className="about__value-text">
                Sustainable milling, ethical manufacturing cycles, and zero waste textile packaging. We craft luxury items that are respectful to our planet.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
