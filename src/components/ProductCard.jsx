import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first size and color
    const size = product.sizes ? product.sizes[0] : 'OS';
    const color = product.colors ? product.colors[0] : 'Default';
    addToCart(product, size, color, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      className="product-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          {product.tag && <div className="product-card__badge">{product.tag}</div>}
          
          <button
            onClick={handleWishlistToggle}
            className={`product-card__wishlist ${
              isWishlisted ? 'product-card__wishlist--active' : ''
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart fill={isWishlisted ? '#0a0a0a' : 'transparent'} />
          </button>

          <div className="product-card__overlay">
            <button
              onClick={handleQuickAdd}
              className="product-card__overlay-btn"
              title="Quick Add to Cart"
            >
              <FiShoppingBag />
            </button>
            <Link to={`/product/${product.id}`} className="product-card__overlay-btn" title="View Details">
              <FiEye />
            </Link>
          </div>
        </div>

        <div className="product-card__info">
          <div className="product-card__category">{product.category}</div>
          <h3 className="product-card__name">{product.name}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
            <div className="stars">
              <FaStar size={12} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <div className="product-card__price-row">
            <div>
              <span className="product-card__price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="product-card__original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
