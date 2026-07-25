import { createContext, useState } from "react";

export const Auth= createContext()

export const AuthProvider =({children})=>{
    const [registeredUser, setRegisteredUser] = useState(JSON.parse(localStorage.getItem('registeredUser'))||[]);
    const [loggedInUser,setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser'))||null);

      const getAllCarts = () => {
        let allCarts = JSON.parse(localStorage.getItem('cartItems'));
        return allCarts ? allCarts : [];
    }

    const getCurrentUserCart = (allCarts) => {
        let cart_data = allCarts.find((val) => val.user_id === loggedInUser?.id);
        return cart_data ? cart_data.products : [];
    }

    const [cartItems, setCartItems] = useState(() => getCurrentUserCart(getAllCarts()));

    
    return <Auth.Provider value={{registeredUser,setRegisteredUser,loggedInUser,setLoggedInUser,cartItems,setCartItems,getCurrentUserCart,getAllCarts}}>{children}</Auth.Provider>
}

