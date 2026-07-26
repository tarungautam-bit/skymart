import React, { Suspense } from 'react'
import { createBrowserRouter,RouterProvider } from "react-router";
import MainLayout from '../layout/MainLayout';
import HomePage from '../Page/HomePage';
import AboutPage from '../Page/AboutPage';
import ShopPage from '../Page/ShopPage';
import OrderPage from '../Page/OrderPage';
import LoginPage from '../Page/LoginPage';
import RegisterPage from '../Page/RegisterPage'
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import { getAllCategories, getNewArrivals, getTopRatedProducts } from '../api/homeapi';
import Loading from '../components/Loading';
import { ProductListItem } from '../components/ProductListItem';
import ProductPage from '../Page/ProductPage';
import CheckoutPage from '../Page/Checkout';



const AppRoutes = () => {
const router=createBrowserRouter([
    {
        path:"/",
        element:<PublicRoute/>,
        children:[
            {
                path:"",
                element:<LoginPage/>,
            },
            {
                path:"register",
                element:<RegisterPage/>
            }
        ]
    },
    {
        path:'/user',
        element:<ProtectedRoute/>,
        children:[
           {
            path:"",
            element:<MainLayout/>,
            children:[
                {
                    path:"",
                    loader: async () => {
                            const [categories, topRated, newArrivals] = await Promise.all([
                                getAllCategories(),
                                getTopRatedProducts(),
                                getNewArrivals(),
                            ]);

                            return {
                                categories,
                                topRated,
                                newArrivals,
                            };
                    },
                    hydrateFallbackElement:<Loading/> ,
                    element:<HomePage/>
                },
                {
                    path:"about",
                    element:<AboutPage/>
                },
                {
                    path: "shop",
                    loader:getAllCategories,
                    hydrateFallbackElement:<Loading/>,
                    element:<Suspense fallback={<Loading/>}> <ShopPage /></Suspense>,
                },
                {
                    path: "shop/:category",
                    loader:getAllCategories,
                    hydrateFallbackElement:<Loading/>,
                    element: <Suspense fallback={<Loading/>}><ShopPage /></Suspense>,
                },
                {
                    path:"order",
                    element: <Suspense fallback={<Loading/>}><OrderPage/></Suspense>
                },
                {
                    path:"product/:id",
                    element: <Suspense fallback={<Loading/>}><ProductPage/></Suspense>
                },
                { path: 'checkout',
                 element: <CheckoutPage />
                }

            ]
           }
        ]
    }
]);
  return (
    <RouterProvider router ={router}/>
  )
}

export default AppRoutes
