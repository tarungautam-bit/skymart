import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import { NavLink, useLoaderData } from 'react-router';
import { ProductListItem } from '../components/ProductListItem';
import useUserData from '../Hooks/useUserData';



const Homepage = () => {

  const {loggedInUser,cartItems}=useAuth();

    const { categories, topRated, newArrivals } = useLoaderData();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

    // console.log( categories, topRated, newArrivals)

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

      
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-grid p-6 sm:p-10 lg:p-14">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-lime-400 ">
                Hi, <span>👋</span>
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Welcome back,<br />
                <span className="text-lime-400">{loggedInUser.name}!</span>
              </h1>
              <p className="mt-5 text-white/60 text-base sm:text-lg max-w-md">
                Discover today's picks — hand-curated products across electronics, fashion, and more.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <NavLink to={"/user/shop"} className="inline-flex items-center gap-2 bg-lime-400 text-black font-semibold px-5 py-3 rounded-full hover:bg-lime-500 transition-colors">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </NavLink>
               
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-4 shrink-0">
              <div className="flex-1 lg:w-56 rounded-2xl border border-lime-400/30 bg-lime-400/10 p-5">
                <p className="text-3xl font-extrabold text-lime-400">20+</p>
                <p className="text-sm text-white/70 mt-1">Products Available</p>
              </div>
              <div className="flex-1 lg:w-56 rounded-2xl border border-white/15 p-5">
                <p className="text-3xl font-extrabold">Free</p>
                <p className="text-sm text-white/70 mt-1">Delivery on $99+</p>
              </div>
            </div>
          </div>
        </section>

      
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4 bg-white/[0.02]">
            <span className="h-11 w-11 rounded-xl bg-lime-400/15 text-lime-400 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" className="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8l-9-5-9 5 9 5 9-5Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 8v8l9 5 9-5V8" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 13v8" />
              </svg>
            </span>
            <div>
              <p id="statCartItems" className="text-2xl font-bold">{cartItems?.length||0}</p>
              <p className="text-sm text-white/50">Cart Items</p>
              <p className="text-xs text-white/30">In your bag</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4 bg-white/[0.02]">
            <span className="h-11 w-11 rounded-xl bg-blue-400/15 text-blue-400 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" className="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 17l6-6 4 4 8-8" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 7h6v6" />
              </svg>
            </span>
            <div>
              <p id="statCartValue" className="text-2xl font-bold">${total||0}</p>
              <p className="text-sm text-white/50">Cart Value</p>
              <p className="text-xs text-white/30">Ready to checkout</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4 bg-white/[0.02]">
            <span className="h-11 w-11 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 21 12 17.77 5.8 21 7 14.14 2 9.27l7.1-1.01L12 2z"/>
              </svg>
            </span>
            <div>
              <p className="text-2xl font-bold">{topRated.length||0}</p>
              <p className="text-sm text-white/50">Top Products</p>
              <p className="text-xs text-white/30">Highly rated</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4 bg-white/[0.02]">
            <span className="h-11 w-11 rounded-xl bg-purple-400/15 text-purple-400 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" className="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.6 12.6 12.6 20.6a2 2 0 0 1-2.8 0l-7.4-7.4a2 2 0 0 1 0-2.8L10.4 2.4a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v6.4a2 2 0 0 1-.4 1.4Z" /><circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </span>
            <div>
              <p className="text-2xl font-bold">{categories.length||0}</p>
              <p className="text-sm text-white/50">Categories</p>
              <p className="text-xs text-white/30">To explore</p>
            </div>
          </div>
        </section>

        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Shop by Category</h2>
            <NavLink to={'/user/shop'} className="text-sm font-semibold text-lime-400 flex items-center gap-1 hover:gap-2 transition-all">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NavLink>
          </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => (
            <NavLink
              key={category.slug}
              to={`/user/shop/${category.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors p-5 text-center"
            >
              <img
                src={category.cat_image}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
              />

              <p className="font-semibold">{category.name}</p>
            </NavLink>
          ))}
        </div>
        </section>

      
        <section className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="text-amber-400">★</span> Top Rated
              </h3>
              <NavLink to={"/user/shop"} className="text-sm text-lime-400 font-semibold flex items-center gap-1">See all
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="h-3.5 w-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
              </NavLink>
            </div>
            <div className="space-y-3" id="topRatedList">
              {topRated.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))
              }
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c1f11d" className="h-5 w-5"><path d="M13 2 3 14h7l-1 8 11-14h-7z"/></svg>
                New Arrivals
              </h3>
              <NavLink to={"/user/shop"} className="text-sm text-lime-400 font-semibold flex items-center gap-1">See all
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="h-3.5 w-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          <div className="space-y-3" id="newArrivalsList">
            {newArrivals.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))
              }
          </div>
          </div>
        </section>

        
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c1f11d" className="h-6 w-6 shrink-0"><path d="M13 2 3 14h7l-1 8 11-14h-7z"/></svg>
            <div>
              <p className="font-semibold">Fast Delivery</p>
              <p className="text-sm text-white/40">Same-day on select items</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.8" className="h-6 w-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" /></svg>
            <div>
              <p className="font-semibold">Secure Payments</p>
              <p className="text-sm text-white/40">100% encrypted checkout</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.8" className="h-6 w-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M20.6 12.6 12.6 20.6a2 2 0 0 1-2.8 0l-7.4-7.4a2 2 0 0 1 0-2.8L10.4 2.4a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v6.4a2 2 0 0 1-.4 1.4Z" /><circle cx="15.5" cy="7.5" r="1.2" fill="#4ade80" stroke="none"/></svg>
            <div>
              <p className="font-semibold">Best Prices</p>
              <p className="text-sm text-white/40">Price-match guarantee</p>
            </div>
          </div>
        </section>
      </div>

  )
}

export default Homepage
