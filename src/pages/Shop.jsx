import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSliders, FiX, FiCheck } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState(400); // Max price
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category from URL query param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam]);

  // Categories list
  const categories = ['all', 'men', 'women', 'accessories'];

  // Sizes list
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'One Size'];

  // Colors list
  const colors = ['Black', 'Ivory', 'Gold', 'Navy Blue', 'Charcoal Gray', 'Cognac Brown', 'Oatmeal Heather', 'Chalk White'];

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange(400);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(product => {
    // Category check
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Price check
    const matchesPrice = product.price <= priceRange;

    // Size check (match if product has at least one of selected sizes or selectedSizes is empty)
    const matchesSize = selectedSizes.length === 0 || 
      product.sizes.some(size => selectedSizes.includes(size));

    // Color check
    const matchesColor = selectedColors.length === 0 ||
      product.colors.some(color => selectedColors.includes(color));

    return matchesCategory && matchesPrice && matchesSize && matchesColor;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default Featured
  });

  return (
    <div className="shop page-transition">
      <div className="container">
        {/* Page Header */}
        <div className="shop__header">
          <span className="section-label">EXQUISITE COLLECTIONS</span>
          <h1 className="section-title" style={{ textTransform: 'capitalize' }}>
            {selectedCategory === 'all' ? 'All Collections' : `${selectedCategory}'s wardrobe`}
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Browse our signature edits crafted for comfort, visual distinction, and modern refinement.
          </p>
        </div>

        <div className="shop__layout">
          {/* ── Sidebar Filters (Desktop) ── */}
          <aside className="shop__sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 className="heading-sm" style={{ letterSpacing: '0.05em' }}>FILTERS</h3>
              <button 
                onClick={clearAllFilters}
                style={{ fontSize: '12px', color: 'var(--color-accent)', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="shop__filter-group">
              <h4 className="shop__filter-title">Category</h4>
              {categories.map(cat => (
                <div
                  key={cat}
                  className={`shop__filter-option ${selectedCategory === cat ? 'shop__filter-option--active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchParams(cat === 'all' ? {} : { category: cat });
                  }}
                >
                  <div className="shop__filter-checkbox">
                    {selectedCategory === cat && <FiCheck size={10} color="var(--color-bg-primary)" />}
                  </div>
                  <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="shop__filter-group">
              <h4 className="shop__filter-title">Max Price: <span style={{ color: 'var(--color-accent)' }}>${priceRange}</span></h4>
              <input
                type="range"
                min="90"
                max="400"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-accent)',
                  background: 'var(--glass-bg)',
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                <span>$90</span>
                <span>$400</span>
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="shop__filter-group">
              <h4 className="shop__filter-title">Sizes</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizes.map(size => {
                  const isActive = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      style={{
                        padding: '6px 12px',
                        border: '1px solid',
                        borderColor: isActive ? 'var(--color-accent)' : 'var(--glass-border)',
                        background: isActive ? 'var(--color-accent)' : 'transparent',
                        color: isActive ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Filter */}
            <div className="shop__filter-group">
              <h4 className="shop__filter-title">Colors</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {colors.map(color => {
                  const isActive = selectedColors.includes(color);
                  return (
                    <div
                      key={color}
                      className={`shop__filter-option ${isActive ? 'shop__filter-option--active' : ''}`}
                      onClick={() => handleColorToggle(color)}
                    >
                      <div className="shop__filter-checkbox">
                        {isActive && <FiCheck size={10} color="var(--color-bg-primary)" />}
                      </div>
                      <span>{color}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── Main Shop Content ── */}
          <div>
            {/* Toolbar */}
            <div className="shop__toolbar">
              <div className="shop__result-count">
                Showing <span style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>{filteredProducts.length}</span> luxury pieces
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Mobile Filter Toggle */}
                <button
                  className="btn btn--glass btn--sm shop__mobile-filter-btn"
                  onClick={() => setIsMobileFilterOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <FiSliders /> Filters
                </button>

                <div className="shop__sort">
                  <span className="shop__sort-label">Sort:</span>
                  <select
                    className="shop__sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="shop__products">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
                <h3 className="heading-sm" style={{ marginBottom: '10px' }}>No items match your filters</h3>
                <p className="text-secondary" style={{ marginBottom: '20px', fontSize: '14px' }}>Try broadening your budget range, color choices, or active sizing filters.</p>
                <button className="btn btn--primary" onClick={clearAllFilters}>Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filters Drawer ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              className="navbar__overlay navbar__overlay--open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              className="shop__sidebar--open"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 className="heading-sm">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}
                >
                  <FiX />
                </button>
              </div>

              {/* Category Filter */}
              <div className="shop__filter-group">
                <h4 className="shop__filter-title">Category</h4>
                {categories.map(cat => (
                  <div
                    key={cat}
                    className={`shop__filter-option ${selectedCategory === cat ? 'shop__filter-option--active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchParams(cat === 'all' ? {} : { category: cat });
                    }}
                  >
                    <div className="shop__filter-checkbox">
                      {selectedCategory === cat && <FiCheck size={10} color="var(--color-bg-primary)" />}
                    </div>
                    <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                  </div>
                ))}
              </div>

              {/* Price Filter */}
              <div className="shop__filter-group">
                <h4 className="shop__filter-title">Max Price: <span style={{ color: 'var(--color-accent)' }}>${priceRange}</span></h4>
                <input
                  type="range"
                  min="90"
                  max="400"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
              </div>

              {/* Sizes Filter */}
              <div className="shop__filter-group">
                <h4 className="shop__filter-title">Sizes</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sizes.map(size => {
                    const isActive = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid',
                          borderColor: isActive ? 'var(--color-accent)' : 'var(--glass-border)',
                          background: isActive ? 'var(--color-accent)' : 'transparent',
                          color: isActive ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                          fontSize: '12px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Filter */}
              <div className="shop__filter-group">
                <h4 className="shop__filter-title">Colors</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {colors.map(color => {
                    const isActive = selectedColors.includes(color);
                    return (
                      <div
                        key={color}
                        className={`shop__filter-option ${isActive ? 'shop__filter-option--active' : ''}`}
                        onClick={() => handleColorToggle(color)}
                      >
                        <div className="shop__filter-checkbox">
                          {isActive && <FiCheck size={10} color="var(--color-bg-primary)" />}
                        </div>
                        <span>{color}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="btn btn--primary"
                style={{ width: '100%', marginTop: '30px' }}
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
