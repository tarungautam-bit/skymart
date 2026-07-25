import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './../components/Header'
import CartDrawer from './../components/CartDrawer'
import Footer from '../components/Footer'

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Spacer so fixed header doesn't overlap content */}
      <main className="pt-16 sm:pt-20">
        <Outlet />
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer/>
    </div>
  )
}

export default MainLayout