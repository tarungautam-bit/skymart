import React from 'react'
import { useAuth } from '../Hooks/useAuth'

const OrdersPage = () => {

  const { loggedInUser } = useAuth()

  const allOrders = JSON.parse(localStorage.getItem('orders')) || []
  const userOrderData = allOrders.find((val) => val.user_id === loggedInUser?.id)
  const orders = userOrderData ? userOrderData.orders : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-white/50">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-white/10 p-5">

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/50">Order ID</p>
                  <p className="font-semibold">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50">{new Date(order.placedAt).toLocaleString()}</p>
                  <span className="inline-block mt-1 text-xs bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full capitalize">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border-b border-white/10 pb-3">
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

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className="font-semibold">Total</span>
                <span className="text-lime-400 font-bold text-lg">${order.total.toFixed(2)}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage