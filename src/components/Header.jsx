import React, { useContext, useState } from 'react'
import { Zap, ShoppingCart, LogOut, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router'
import { Auth } from '../context/AuthContext'
import useUserData from '../Hooks/useUserData'


const navLinkClass = ({ isActive }) =>
  isActive ? 'text-lime-400' : 'text-white/60 hover:text-white transition-colors'

const mobileNavLinkClass = ({ isActive }) =>
  `block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
    isActive ? 'bg-lime-400/10 text-lime-400' : 'text-white/70 hover:bg-white/5 hover:text-white'
  }`


const Header = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {setLoggedInUser,loggedInUser}=useContext(Auth);
  const logout = ()=>{
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null);
  }

  


const { cartItems } = useUserData();

const cartCount = cartItems?.length || 0;

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden h-10 w-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <button className="flex items-center gap-2 shrink-0">
          <span className="h-9 w-9 rounded-xl bg-lime-400 flex items-center justify-center">
            <Zap className="h-5 w-5 text-black" fill="black" />
          </span>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight">
            Sky<span className="text-lime-400">Mart</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/user" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/user/shop" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/user/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/user/order" className={navLinkClass}>Orders</NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-white/10">
            <span className="h-7 w-7 rounded-full bg-lime-400 text-black text-xs font-bold flex items-center justify-center">
               {loggedInUser.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm text-white/80">{loggedInUser.name}</span>
          </div>

          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-lime-400 text-black text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={()=>logout()}
            aria-label="Log out"
            className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

      </div>

      {/* Mobile nav panel */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-white/10 px-3 py-3 space-y-1 bg-black/95">
          <NavLink to="/user" end onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/user/shop" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Shop</NavLink>
          <NavLink to="/user/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>About</NavLink>
          <NavLink to="/user/order" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Orders</NavLink>
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10 mt-2 pt-3">
            <span className="h-7 w-7 rounded-full bg-lime-400 text-black text-xs font-bold flex items-center justify-center">
               {loggedInUser.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm text-white/80">{loggedInUser.name}</span>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header