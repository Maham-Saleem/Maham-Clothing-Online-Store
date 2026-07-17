import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Computations
  const subtotal = getSubtotal();
  const shippingFee = subtotal > 150 ? 0 : 15.00;
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAHAMGOLD' || promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "MAHAMGOLD" for 15% off.');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="cart page-transition">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(74, 222, 128, 0.1)',
              border: '2px solid var(--color-success)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 25px auto'
            }}
          >
            <FiCheck />
          </div>
          <h1 className="heading-md" style={{ marginBottom: '15px' }}>Purchase Successful</h1>
          <p className="text-secondary" style={{ maxWidth: '450px', margin: '0 auto 30px auto', fontSize: '15px', lineHeight: '1.6' }}>
            Thank you for shopping at Maham Clothing. Your order has been placed successfully and is being compiled by our tailoring division. A receipt has been sent to your email.
          </p>
          <Link to="/shop" className="btn btn--primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart page-transition">
      <div className="container">
        <div className="shop__header" style={{ marginBottom: '50px' }}>
          <span className="section-label">YOUR PRIVATE COLLECTION</span>
          <h1 className="section-title">Shopping Bag</h1>
        </div>

        {cart.length > 0 ? (
          <div className="cart__layout">
            {/* Cart Items Grid */}
            <div className="cart__items">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="cart-item__image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <h3 className="cart-item__name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className="cart-item__details">
                      Size: <span style={{ color: 'var(--color-text-primary)', marginRight: '15px' }}>{item.selectedSize}</span>
                      Color: <span style={{ color: 'var(--color-text-primary)' }}>{item.selectedColor}</span>
                    </div>

                    <div className="cart-item__quantity">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="cart-item__qty-value">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item__right">
                    <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.cartItemId)}
                      title="Remove from bag"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Link to="/shop" className="btn btn--glass btn--sm">
                  Continue Shopping
                </Link>
                <button
                  style={{ fontSize: '13px', color: 'var(--color-error)', textTransform: 'uppercase', cursor: 'pointer' }}
                  onClick={clearCart}
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Cart Summary Card */}
            <div className="cart__summary">
              <h3 className="cart__summary-title">Summary</h3>
              
              <div className="cart__summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="cart__summary-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              {discountAmount > 0 && (
                <div className="cart__summary-row" style={{ color: 'var(--color-success)' }}>
                  <span>Discount (15%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart__summary-row cart__summary-row--total">
                <span>Total</span>
                <span style={{ color: 'var(--color-accent)' }}>${total.toFixed(2)}</span>
              </div>

              {/* Promo Form */}
              {promoApplied ? (
                <div style={{ margin: '20px 0', fontSize: '13px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCheck /> Promo code applied (15% off)
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="cart__promo">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="cart__promo-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn--outline btn--sm" style={{ padding: '0 15px' }}>
                    Apply
                  </button>
                </form>
              )}

              <button
                className="btn btn--primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={handleCheckout}
              >
                Proceed to Checkout <FiArrowRight />
              </button>

              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '15px' }}>
                Tax computed at checkout. Complimentary returns within 14 days.
              </div>
            </div>
          </div>
        ) : (
          /* Empty bag layout */
          <div className="cart__empty glass-card">
            <FiShoppingBag className="cart__empty-icon" />
            <h2 className="cart__empty-title">Your shopping bag is empty</h2>
            <p className="cart__empty-text">Compile your wardrobe with our luxurious coats, blouses, and chronographs.</p>
            <Link to="/shop" className="btn btn--primary btn--lg">
              Explore Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
