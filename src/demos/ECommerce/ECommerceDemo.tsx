import React, { useReducer, useState } from 'react';
import styles from './ECommerceDemo.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  emoji: string;
  badge?: string;
}

interface CartItem extends Product {
  qty: number;
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'CLEAR' };

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1,  name: 'Wireless Headphones', category: 'Electronics', price: 2499, rating: 4.5, reviews: 128, emoji: '🎧', badge: 'Bestseller' },
  { id: 2,  name: 'Smart Watch Pro',     category: 'Electronics', price: 4999, rating: 4.3, reviews: 86,  emoji: '⌚' },
  { id: 3,  name: 'Running Shoes',       category: 'Clothing',    price: 1299, rating: 4.7, reviews: 203, emoji: '👟', badge: 'New' },
  { id: 4,  name: 'Laptop Stand',        category: 'Electronics', price: 899,  rating: 4.4, reviews: 67,  emoji: '💻' },
  { id: 5,  name: 'Casual T-Shirt',      category: 'Clothing',    price: 499,  rating: 4.1, reviews: 312, emoji: '👕' },
  { id: 6,  name: 'Coffee Maker',        category: 'Kitchen',     price: 1899, rating: 4.6, reviews: 94,  emoji: '☕', badge: 'Popular' },
  { id: 7,  name: 'Yoga Mat',            category: 'Sports',      price: 799,  rating: 4.8, reviews: 445, emoji: '🧘' },
  { id: 8,  name: 'Bluetooth Speaker',   category: 'Electronics', price: 1599, rating: 4.2, reviews: 178, emoji: '🔊' },
  { id: 9,  name: 'Winter Jacket',       category: 'Clothing',    price: 2999, rating: 4.5, reviews: 89,  emoji: '🧥' },
  { id: 10, name: 'Steel Water Bottle',  category: 'Sports',      price: 399,  rating: 4.7, reviews: 567, emoji: '🍶', badge: 'Eco' },
  { id: 11, name: 'LED Desk Lamp',       category: 'Electronics', price: 699,  rating: 4.3, reviews: 143, emoji: '💡' },
  { id: 12, name: 'Hiking Backpack',     category: 'Sports',      price: 1499, rating: 4.6, reviews: 234, emoji: '🎒' },
];

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Sports', 'Kitchen'];

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id);
      if (existing) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':    return state.filter(i => i.id !== action.id);
    case 'INCREMENT': return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DECREMENT': return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    case 'CLEAR':     return [];
    default:          return state;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => (
  <div className={styles.stars}>
    {[1, 2, 3, 4, 5].map(n => (
      <span key={n} style={{ color: n <= Math.round(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
    ))}
    <span className={styles.reviewCount}>({reviews})</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ECommerceDemo: React.FC = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [ordered, setOrdered] = useState(false);

  const filtered = PRODUCTS.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleAdd = (product: Product) => {
    dispatch({ type: 'ADD', product });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleCheckout = () => {
    setOrdered(true);
    dispatch({ type: 'CLEAR' });
    setTimeout(() => { setOrdered(false); setCartOpen(false); }, 2500);
  };

  return (
    <div className={styles.app}>

      {/* ── Navbar ── */}
      <header className={styles.navbar}>
        <div className={styles.navLogo}>🛍️ <strong>ShopZone</strong></div>
        <input
          className={styles.search}
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
          🛒 Cart
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </header>

      {/* ── Category Filter ── */}
      <div className={styles.filterBar}>
        <div className={styles.categories}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={[styles.catBtn, activeCategory === cat ? styles.catActive : ''].join(' ')}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className={styles.resultCount}>{filtered.length} products</span>
      </div>

      {/* ── Product Grid ── */}
      <main className={styles.main}>
        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            <p>😕 No products found for "<strong>{search}</strong>"</p>
            <button onClick={() => setSearch('')}>Clear search</button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(product => (
              <div key={product.id} className={styles.card}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <div className={styles.emojiBox}>{product.emoji}</div>
                <div className={styles.cardBody}>
                  <p className={styles.productCategory}>{product.category}</p>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                      className={[styles.addBtn, addedId === product.id ? styles.added : ''].join(' ')}
                      onClick={() => handleAdd(product)}
                    >
                      {addedId === product.id ? '✓ Added!' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className={styles.cartOverlay} onClick={() => setCartOpen(false)}>
          <aside className={styles.cartDrawer} onClick={e => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h2>🛒 My Cart {cartCount > 0 && <span>({cartCount})</span>}</h2>
              <button className={styles.closeCart} onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {ordered ? (
              <div className={styles.orderSuccess}>
                <p>🎉</p>
                <p><strong>Order Placed!</strong></p>
                <p>Thank you for your purchase.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>🛒</p>
                <p>Your cart is empty</p>
                <button onClick={() => setCartOpen(false)}>Continue Shopping →</button>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <span className={styles.cartEmoji}>{item.emoji}</span>
                      <div className={styles.cartItemInfo}>
                        <p className={styles.cartItemName}>{item.name}</p>
                        <p className={styles.cartItemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                      </div>
                      <div className={styles.qtyControls}>
                        <button onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}>+</button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.cartFooter}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Delivery</span>
                    <span style={{ color: '#10b981' }}>FREE</span>
                  </div>
                  <hr className={styles.divider} />
                  <div className={[styles.totalRow, styles.grandTotal].join(' ')}>
                    <span>Total</span>
                    <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <button className={styles.checkoutBtn} onClick={handleCheckout}>
                    Proceed to Checkout →
                  </button>
                  <button className={styles.clearBtn} onClick={() => dispatch({ type: 'CLEAR' })}>
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default ECommerceDemo;
