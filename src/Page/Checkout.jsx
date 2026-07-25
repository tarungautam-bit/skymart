import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { CheckCircle2 } from 'lucide-react'
import useUserData from '../Hooks/useUserData'

const CheckoutPage = () => {

  const { cartItems, placeOrder } = useUserData()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  })

  const [placedOrder, setPlacedOrder] = useState(null)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    let order = placeOrder(form);
    setPlacedOrder(order);
  }

  // Redirect back if someone lands here with an empty cart (and hasn't just placed an order)
  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-white/60 mb-4">Your cart is empty.</p>
        <button
          type="button"
          onClick={() => navigate('/user/shop')}
          className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-6 py-3 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (placedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-lime-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
        <p className="text-white/60 mb-1">Order ID: {placedOrder.id}</p>
        <p className="text-white/60 mb-6">Total: ${placedOrder.total.toFixed(2)}</p>
        <button
          type="button"
          onClick={() => navigate('/user/shop')}
          className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-6 py-3 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Shipping form */}
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 rounded-full transition-colors mt-4"
          >
            Place Order (${total.toFixed(2)})
          </button>
        </form>

        {/* Order summary */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border-b border-white/10 pb-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-white/40">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-lime-400">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-lime-400 font-bold text-xl">${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage