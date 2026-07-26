import React, { useState } from 'react'
import { Outlet, useNavigation } from 'react-router'
import Header from './../components/Header'
import CartDrawer from './../components/CartDrawer'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
      const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading />;
    }

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