import React from 'react'
import { NavLink } from 'react-router'
import { Plus, Minus } from 'lucide-react'
import useUserData from '../Hooks/useUserData'

const ProductCard = ({ product }) => {

  const { cartItems, addToCart, incrementQty, decrementQty } = useUserData();

  const cartItem = cartItems.find((val) => val.id === product.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-white/10 flex flex-col">
      <div className="relative aspect-square">
        <span className="absolute top-3 left-3 z-10 bg-black/70 text-white text-[11px] font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
        <NavLink to={`/user/product/${product.id}`}>
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </NavLink>
      </div>
      <div className="bg-[#0d0d0d] p-4 flex flex-col flex-1">
        <p className="text-gray-500 text-xs mb-1">{product.category}</p>
        <h3 className="text-white font-semibold text-[15px] leading-snug mb-2">{product.title}</h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(product.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-700 fill-gray-700'}`}
              viewBox="0 0 20 20"
            >
              <polygon points="10,1 12.6,7 19,7.6 14,12 15.5,18.5 10,15 4.5,18.5 6,12 1,7.6 7.4,7" />
            </svg>
          ))}
          <span className="text-gray-500 text-xs ml-1">({product.reviews?.length || product.stock || 0})</span>
        </div>

        <div className="mt-auto border-t border-gray-800 pt-3 flex items-center justify-between gap-2">
          <span className="text-lime-400 font-bold text-lg">${product.price}</span>

          {cartItem ? (
            <div className="flex items-center gap-2 rounded-full bg-lime-400 px-2 py-1.5 shrink-0">
              <button
                type="button"
                onClick={() => decrementQty(product.id)}
                className="hover:bg-lime-300 rounded-full p-1 text-black"
              >
                <Minus size={14} />
              </button>

              <span className="text-sm font-semibold text-black w-4 text-center">{cartItem.qty}</span>

              <button
                type="button"
                onClick={() => incrementQty(product.id)}
                className="hover:bg-lime-300 rounded-full p-1 text-black"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex items-center gap-1.5 bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-4 py-2 rounded-full transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a1.125 1.125 0 00-1.077-1.442H5.106M7.5 14.25L5.106 5.856M7.5 14.25L5.25 20.25" />
              </svg>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard