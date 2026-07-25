import { useState, useEffect, useContext } from 'react'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid';


const useUserData = () => {

    const { loggedInUser,cartItems,setCartItems,getAllCarts,getCurrentUserCart } = useAuth();

  

    useEffect(() => {
        setCartItems(getCurrentUserCart(getAllCarts()));
    }, [loggedInUser]);

    const persistCart = (updatedProducts) => {
        if (!loggedInUser) return;

        let allCarts = getAllCarts();
        let existingIndex = allCarts.findIndex((val) => val.user_id === loggedInUser.id);

        if (existingIndex !== -1) {
            allCarts[existingIndex].products = updatedProducts;
        } else {
            allCarts.push({ user_id: loggedInUser.id, products: updatedProducts });
        }

        localStorage.setItem('cartItems', JSON.stringify(allCarts));
        setCartItems(updatedProducts);
    }

    const addToCart = (product) => {
        if (!loggedInUser) return;

        let allCarts = getAllCarts();
        let currentProducts = getCurrentUserCart(allCarts);

        let existing = currentProducts.find((val) => val.id === product.id);
        let updatedProducts;

        if (existing) {
            updatedProducts = currentProducts.map((val) =>
                val.id === product.id ? { ...val, qty: (val.qty || 1) + 1 } : val
            );
        } else {
            updatedProducts = [...currentProducts, { ...product, qty: 1 }];
        }

        persistCart(updatedProducts);
    }

    const removeFromCart = (productId) => {
        if (!loggedInUser) return;

        let allCarts = getAllCarts();
        let currentProducts = getCurrentUserCart(allCarts);

        let updatedProducts = currentProducts.filter((val) => val.id !== productId);
        persistCart(updatedProducts);
    }

    const incrementQty = (productId) => {
        if (!loggedInUser) return;

        let allCarts = getAllCarts();
        let currentProducts = getCurrentUserCart(allCarts);

        let updatedProducts = currentProducts.map((val) =>
            val.id === productId ? { ...val, qty: (val.qty || 1) + 1 } : val
        );

        persistCart(updatedProducts);
    }

    const decrementQty = (productId) => {
        if (!loggedInUser) return;

        let allCarts = getAllCarts();
        let currentProducts = getCurrentUserCart(allCarts);

        let target = currentProducts.find((val) => val.id === productId);
        if (!target) return;

        if (target.qty <= 1) {
           
            let updatedProducts = currentProducts.filter((val) => val.id !== productId);
            persistCart(updatedProducts);
        } else {
            let updatedProducts = currentProducts.map((val) =>
                val.id === productId ? { ...val, qty: val.qty - 1 } : val
            );
            persistCart(updatedProducts);
        }
    }

    const emptyCart = () => {
        if (!loggedInUser) return;
        persistCart([]);
    }


      const placeOrder = (shippingDetails = {}) => {
        if (!loggedInUser) return null;
        if (cartItems.length === 0) return null;

        let allCarts = getAllCarts();
        let currentProducts = getCurrentUserCart(allCarts);

        let total = currentProducts.reduce((sum, item) => sum + item.price * item.qty, 0);

        let newOrder = {
            id: nanoid(),
            items: currentProducts,
            total: Number(total.toFixed(2)),
            shipping: shippingDetails,
            status: 'placed',
            placedAt: new Date().toISOString(),
        };

        let allOrders = getAllOrders();
        let existingIndex = allOrders.findIndex((val) => val.user_id === loggedInUser.id);

        if (existingIndex !== -1) {
            allOrders[existingIndex].orders = [...allOrders[existingIndex].orders, newOrder];
        } else {
            allOrders.push({ user_id: loggedInUser.id, orders: [newOrder] });
        }

        localStorage.setItem('orders', JSON.stringify(allOrders));

        // clear the cart after a successful order
        persistCart([]);

        return newOrder;
    }

    const getAllOrders = () => {
        let allOrders = JSON.parse(localStorage.getItem('orders'));
        return allOrders ? allOrders : [];
    }

    const getUserOrders = () => {
        if (!loggedInUser) return [];
        let allOrders = getAllOrders();
        let userOrderData = allOrders.find((val) => val.user_id === loggedInUser.id);
        return userOrderData ? userOrderData.orders : [];
    }

    return { cartItems, addToCart, removeFromCart, incrementQty, decrementQty, emptyCart,placeOrder,getAllOrders,getUserOrders };
}

export default useUserData