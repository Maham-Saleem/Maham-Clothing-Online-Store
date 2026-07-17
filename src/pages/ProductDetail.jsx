import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { FiHeart, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Reset page parameters when ID changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes ? product.sizes[0] : 'OS');
      setSelectedColor(product.colors ? product.colors[0] : 'Default');
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 className="heading-md">Bespoke product not found</h2>
        <p className="text-secondary" style={{ marginTop: '10px', marginBottom: '30px' }}>The item you are trying to view does not exist in our catalog.</p>
        <Link to="/shop" className="btn btn--primary">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  // Find related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Return standard color hexes for swatches
  const getColorHex = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'black':
      case 'classic black':
      case 'slate black':
      case 'obsidian black':
        return '#0a0a0a';
      case 'ivory':
        return '#f5f0eb';
      case 'gold':
        return '#c9a96e';
      case 'navy blue':
        return '#1b263b';
      case 'charcoal gray':
      case 'slate gray':
        return '#4a4e69';
      case 'cognac brown':
      case 'dark brown':
        return '#582f0e';
      case 'oatmeal heather':
        return '#d3d3d3';
      case 'chalk white':
        return '#ffffff';
      case 'champagne':
        return '#eddcd2';
      case 'soft beige':
        return '#e6ccb2';
      case 'silver':
        return '#c0c0c0';
      default:
        return '#c9a96e';
    }
  };

  return (
    <div className="product-detail page-transition">
      <div className="container">
        {/* Breadcrumb */}
        <div className="product-detail__breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/shop">Shop</Link>
          <FiChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} style={{ textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <FiChevronRight size={12} />
          <span style={{ color: 'var(--color-text-primary)' }}>{product.name}</span>
        </div>

        {/* Product Inner Grid */}
        <div className="product-detail__grid">
          {/* Gallery View */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img src={product.image} alt={product.name} />
              {product.tag && <div className="product-card__badge" style={{ fontSize: '14px', padding: '6px 12px' }}>{product.tag}</div>}
            </div>
          </div>

          {/* Info Details */}
          <div className="product-detail__info">
            <span className="product-detail__category">{product.category}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            
            {/* Rating Row */}
            <div className="product-detail__rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => {
                  const starVal = i + 1;
                  return (
                    <FaStar
                      key={i}
                      color={starVal <= Math.floor(product.rating) ? 'var(--color-accent)' : 'var(--color-text-muted)'}
                    />
                  );
                })}
              </div>
              <span className="product-detail__rating-count">
                {product.rating} / 5.0 Rating ({product.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Pricing Details */}
            <div className="product-detail__price-row">
              <span className="product-detail__price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="product-detail__original-price">${product.originalPrice.toFixed(2)}</span>
                  <span className="product-detail__discount">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="product-detail__description">{product.description}</p>

            <div className="divider" style={{ margin: '20px 0' }}></div>

            {/* Sizes selector */}
            {product.sizes && product.sizes[0] !== 'One Size' && (
              <div className="product-detail__options-group">
                <h4 className="product-detail__option-label">Select Size: <span style={{ color: 'var(--color-accent)' }}>{selectedSize}</span></h4>
                <div className="product-detail__sizes">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors selector */}
            {product.colors && product.colors[0] !== 'Default' && (
              <div className="product-detail__options-group">
                <h4 className="product-detail__option-label">Select Color: <span style={{ color: 'var(--color-accent)' }}>{selectedColor}</span></h4>
                <div className="product-detail__colors">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`product-detail__color-btn ${selectedColor === color ? 'product-detail__color-btn--active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      <div
                        className="product-detail__color-swatch"
                        style={{
                          backgroundColor: getColorHex(color),
                          border: color.toLowerCase() === 'ivory' || color.toLowerCase() === 'chalk white' ? '1px solid var(--glass-border)' : 'none'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
              <div className="product-detail__quantity">
                <span className="product-detail__option-label" style={{ marginBottom: 0 }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="product-detail__qty-value">{quantity}</span>
                  <button
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail__actions">
                <button
                  className="btn btn--primary btn--lg"
                  style={{ flex: 1 }}
                  onClick={handleAddToCart}
                >
                  <FiShoppingBag /> Add to Cart
                </button>
                
                <button
                  className={`btn btn--glass btn--lg btn--icon ${isWishlisted ? 'product-card__wishlist--active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                >
                  <FiHeart fill={isWishlisted ? '#0a0a0a' : 'transparent'} />
                </button>
              </div>

              {addedMessage && (
                <div
                  style={{
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    border: '1px solid var(--color-success)',
                    color: 'var(--color-success)',
                    padding: '12px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Item successfully added to your shopping bag!
                </div>
              )}
            </div>

            {/* Shipping details */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <FaTruck className="product-detail__feature-icon" />
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>Complimentary Shipping</div>
                  <div style={{ fontSize: '12px' }}>On all orders exceeding $150</div>
                </div>
              </div>
              <div className="product-detail__feature">
                <FaUndo className="product-detail__feature-icon" />
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>Easy Returns</div>
                  <div style={{ fontSize: '12px' }}>Complimentary 14-day pickups</div>
                </div>
              </div>
              <div className="product-detail__feature">
                <FaShieldAlt className="product-detail__feature-icon" />
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>Secure Checkout</div>
                  <div style={{ fontSize: '12px' }}>Fully encrypted billing details</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {relatedProducts.length > 0 && (
          <section className="section" style={{ borderTop: '1px solid var(--glass-border)', marginTop: '60px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
              <span className="section-label">RECOMMENDED STYLES</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Related Products</h2>
            </div>
            
            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
