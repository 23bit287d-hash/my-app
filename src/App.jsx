import { useReducer } from 'react'
import './App.css'

const PRODUCTS = [
  { id: 'p1', name: 'Wireless earbuds', price: 49.99 },
  { id: 'p2', name: 'Canvas tote bag', price: 24.5 },
  { id: 'p3', name: 'Stainless bottle', price: 32.0 },
  { id: 'p4', name: 'Desk lamp', price: 58.0 },
  { id: 'p5', name: 'Notebook set', price: 12.99 },
  { id: 'p6', name: 'USB-C cable', price: 9.99 },
]

const initialCartState = {
  items: [],
  totalCount: 0,
}

function totalQuantity(items) {
  return items.reduce((sum, line) => sum + line.quantity, 0)
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product } = action
      const idx = state.items.findIndex((line) => line.id === product.id)
      let nextItems
      if (idx === -1) {
        nextItems = [...state.items, { ...product, quantity: 1 }]
      } else {
        nextItems = state.items.map((line, i) =>
          i === idx ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return {
        items: nextItems,
        totalCount: totalQuantity(nextItems),
      }
    }
    case 'REMOVE_ONE': {
      const nextItems = state.items
        .map((line) =>
          line.id === action.id
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0)
      return {
        items: nextItems,
        totalCount: totalQuantity(nextItems),
      }
    }
    case 'REMOVE_LINE': {
      const nextItems = state.items.filter((line) => line.id !== action.id)
      return {
        items: nextItems,
        totalCount: totalQuantity(nextItems),
      }
    }
    case 'CLEAR':
      return initialCartState
    default:
      return state
  }
}

function formatMoney(n) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(n)
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  const subtotal = cart.items.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )

  return (
    <div className="shop">
      <header className="shop-header">
        <div className="shop-brand">
          <h1 className="shop-title">Corner Market</h1>
          <p className="shop-tagline">Simple prices, one-page checkout</p>
        </div>
        <div className="cart-badge" aria-live="polite">
          <span className="cart-badge-label">In cart</span>
          <span className="cart-badge-count">{cart.totalCount}</span>
        </div>
      </header>

      <main className="shop-main">
        <section className="products-section" aria-labelledby="products-heading">
          <h2 id="products-heading" className="section-title">
            Products
          </h2>
          <ul className="product-grid">
            {PRODUCTS.map((product) => (
              <li key={product.id} className="product-card">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatMoney(product.price)}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => dispatch({ type: 'ADD', product })}
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="cart-section" aria-labelledby="cart-heading">
          <div className="cart-panel">
            <h2 id="cart-heading" className="section-title">
              Your cart
            </h2>
            <p className="cart-summary">
              <strong>{cart.totalCount}</strong>{' '}
              {cart.totalCount === 1 ? 'item' : 'items'}
            </p>

            {cart.items.length === 0 ? (
              <p className="cart-empty">Cart is empty. Add something above.</p>
            ) : (
              <>
                <ul className="cart-lines">
                  {cart.items.map((line) => (
                    <li key={line.id} className="cart-line">
                      <div className="cart-line-info">
                        <span className="cart-line-name">{line.name}</span>
                        <span className="cart-line-meta">
                          {formatMoney(line.price)} × {line.quantity}
                        </span>
                      </div>
                      <div className="cart-line-actions">
                        <button
                          type="button"
                          className="btn btn-ghost btn-small"
                          onClick={() =>
                            dispatch({ type: 'REMOVE_ONE', id: line.id })
                          }
                          aria-label={`Remove one ${line.name}`}
                        >
                          −1
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-small"
                          onClick={() =>
                            dispatch({ type: 'REMOVE_LINE', id: line.id })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="cart-footer">
                  <p className="cart-subtotal">
                    Subtotal <span>{formatMoney(subtotal)}</span>
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch({ type: 'CLEAR' })}
                  >
                    Empty cart
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
