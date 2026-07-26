import { ShoppingCart, Plus, Minus } from "lucide-react";
import { NavLink } from "react-router";
import useUserData from "../Hooks/useUserData";

export const ProductListItem = ({ product }) => {
  const finalPrice =product.price;

  // const discounted = product.discountPercentage > 0;

  const { addToCart, cartItems, incrementQty, decrementQty } = useUserData();

  const cartItem = cartItems.find((val) => val.id === product.id);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-colors p-3">
      {/* Product Link */}
      <NavLink to={`/user/product/${product.id}`}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-14 w-14 rounded-lg object-cover shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{product.title}</p>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs text-white/50">
              {product.rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </NavLink>

      {/* Price */}
      <div className="text-right shrink-0 hidden sm:block">
        <p className="font-bold text-sm">
          ${finalPrice.toFixed(2)}
        </p>

        {/* {discounted && (
          <p className="text-xs text-white/30 line-through">
            ${product.price.toFixed(2)}
          </p>
        )} */}
      </div>

      {/* Cart Controls */}
      {cartItem ? (
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 bg-lime-400 shrink-0 text-black hover:bg-lime-500 rounded-full p-2">
          <button
            type="button"
            onClick={() => decrementQty(product.id)}
            className="hover:bg-blue-700 rounded p-1"
          >
            <Minus size={14} />
          </button>

          <span className="text-sm font-medium w-4 text-center">{cartItem.qty}</span>

          <button
            type="button"
            onClick={() => incrementQty(product.id)}
            className="hover:bg-blue-700 rounded p-1"
          >
            <Plus size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 rounded-lg bg-lime-400 hover:bg-blue-700 px-3 py-2 text-sm font-medium transition-colors shrink-0 text-black hover:bg-lime-500 rounded-full p-2"
        >
          <ShoppingCart size={16} />
          <span className="hidden md:inline">Add</span>
        </button>
      )}
    </div>
  );
};