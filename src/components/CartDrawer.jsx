import React from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router'
import useUserData from '../Hooks/useUserData'


const CartDrawer = ({ isOpen, onClose }) => {

  const { cartItems, incrementQty, decrementQty, removeFromCart } = useUserData()
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const goToCheckout = () => {
    if (cartItems.length === 0) return;
    onClose();
    navigate('/user/checkout');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] sm:max-w-[90%] bg-[#0d0d0d] border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-16 sm:h-20 border-b border-white/10 shrink-0">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-lime-400" strokeWidth={1.8} />
            Your Cart
            <span className="text-sm text-white/40 font-normal">({cartItems.length})</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-white/40">
              <ShoppingBag className="h-10 w-10" strokeWidth={1.5} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm sm:text-[15px] font-medium truncate pr-2">{item.title}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">${item.price.toFixed(2)} each</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-white/10 rounded-full">
                      <button
                        type="button"
                        onClick={() => decrementQty(item.id)}
                        aria-label="Decrease quantity"
                        className="h-7 w-7 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm w-5 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => incrementQty(item.id)}
                        aria-label="Increase quantity"
                        className="h-7 w-7 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-lime-400">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / checkout */}
        <div className="border-t border-white/10 px-5 sm:px-6 py-5 shrink-0">
          <div className="flex items-center justify-between text-sm text-white/60 mb-1.5">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="text-lime-400 font-bold text-lg">${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            onClick={goToCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-full transition-colors"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer