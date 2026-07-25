import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

    let {loggedInUser}=useContext(Auth);
    if(!loggedInUser){
        return <Navigate to={"/"}/>
    }
    return <Outlet/>
}

export default ProtectedRoute
