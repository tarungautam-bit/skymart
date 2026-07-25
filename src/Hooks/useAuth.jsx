import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import {useForm} from "react-hook-form"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { nanoid } from 'nanoid';


export const useAuth = ()=>{
    const {register,handleSubmit,formState:{errors},reset} = useForm();

    let navigate=useNavigate();

    const {loggedInUser,setLoggedInUser,registeredUser,setRegisteredUser,cartItems,setCartItems,getAllCarts,getCurrentUserCart}=useContext(Auth);

    let loginFormSubmit = (data)=>{
        console.log(data);
        let user = registeredUser.find((val)=>{
            return val.email == data.email && val.password == data.password
        });

        if(!user){
            toast.error('Invalid Credentials')
            reset();
            return;

        }

        localStorage.setItem('loggedInUser',JSON.stringify(user));
        
        setLoggedInUser(user);

        toast.success(`Welcome ${user.name}`);
        navigate('/user');
        reset();
        

    }


    let registerFormSubmit = (data)=>{

        let user = registeredUser.find((val)=>val.email==data.email);

        if(user){
            toast.error('Email Already Exists')
            reset();
            return;
        }
         let newUser = { ...data, id: nanoid() };
        let arr = [...registeredUser,newUser];

        setRegisteredUser(arr);
        setLoggedInUser(data);
        localStorage.setItem('registeredUser',JSON.stringify(arr));
        localStorage.setItem('loggedInUser',JSON.stringify(newUser))

        toast.success(`Registration Successful! Welcome ${data.name}`);
        reset();
        navigate('/user')
    }

      return {
        navigate,
        register,
        handleSubmit,
        reset,
        errors,
        loginFormSubmit,
        registerFormSubmit,
        loggedInUser,
        setLoggedInUser,
        registeredUser,
        setRegisteredUser,
        cartItems,setCartItems,getAllCarts,getCurrentUserCart
    }
}