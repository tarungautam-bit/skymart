import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth';

const LoginPage = () => {
   

    let{navigate, register,loginFormSubmit,errors,handleSubmit}=useAuth();

  return (
    <div class="min-h-screen grid lg:grid-cols-2">

    
    <div class="hidden lg:flex flex-col justify-between px-14 py-12 border-r border-zinc-800 relative overflow-hidden">

      
        <div class="absolute left-[-180px] top-48 h-96 w-96 rounded-full bg-lime-400/10 blur-[150px]"></div>

       
        <div class="relative z-10">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center">
                    <span class="text-black text-xl font-bold">⚡</span>
                </div>

                <h2 class="text-3xl font-bold text-white">
                    Sky<span class="text-lime-400">Mart</span>
                </h2>
            </div>
        </div>

      
        <div class="relative z-10 max-w-xl">

            <p class="uppercase tracking-[4px] text-lime-400 font-semibold text-sm mb-8">
                Welcome Back
            </p>

            <h1 class="text-7xl font-bold text-white leading-tight">
                Shop the future.
            </h1>

            <h1 class="text-7xl font-bold text-lime-400 mb-10">
                Today.
            </h1>

            <p class="text-zinc-500 text-xl leading-9 max-w-lg">
                Thousands of products, lightning-fast delivery and prices that make your wallet happy.
            </p>

        </div>

       
        <div class="relative z-10 grid grid-cols-3 gap-6">

            <div class="border border-zinc-700 rounded-3xl py-8 text-center">
                <h3 class="text-lime-400 text-4xl font-bold">
                    20K+
                </h3>

                <p class="text-zinc-500 mt-2">
                    Products
                </p>
            </div>

            <div class="border border-zinc-700 rounded-3xl py-8 text-center">
                <h3 class="text-lime-400 text-4xl font-bold">
                    50K+
                </h3>

                <p class="text-zinc-500 mt-2">
                    Users
                </p>
            </div>

            <div class="border border-zinc-700 rounded-3xl py-8 text-center">
                <h3 class="text-lime-400 text-4xl font-bold">
                    4.9★
                </h3>

                <p class="text-zinc-500 mt-2">
                    Rating
                </p>
            </div>

        </div>

    </div>


   
    <div class="flex items-center justify-center px-6 py-10">

        <div
            class="w-full max-w-md rounded-[28px] bg-[#111111] border border-zinc-800 shadow-[0_25px_80px_rgba(0,0,0,.5)] p-8">

            <h2 class="text-4xl font-bold text-white">
                Sign in
            </h2>

            <p class="text-zinc-500 mt-2 mb-8">
                Enter your credentials to continue
            </p>

            <form class="space-y-5" onSubmit={handleSubmit(loginFormSubmit)}>

                <div className='flex flex-col gap-2'>
                    <div
                        class="h-14 rounded-2xl border border-zinc-700 bg-[#1b1b1b] flex items-center px-5">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-zinc-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">

                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12H8m8 0L20 8m-4 4l4 4M4 8l4 4-4 4"/>
                        </svg>

                        <input
                            {...register("email",{
                                required:"Email is Required"
                            })}
                            type="email"
                            placeholder="Email address"
                            class="w-full bg-transparent outline-none px-4 text-white placeholder:text-zinc-500"/>
                        

                    </div>
                    {errors.email &&<p className='text-red-600'>{errors.email.message}</p>}
                </div>

                
                <div className='flex flex-col gap-2'>
                    <div
                        class="h-14 rounded-2xl border border-zinc-700 bg-[#1b1b1b] flex items-center px-5">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-zinc-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">

                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 15v2m6-8V7a6 6 0 10-12 0v2m-2 0h16v10H4V9z"/>
                        </svg>

                        <input
                            {...register("password",{
                                required:"Password is required",
                                minLength:{
                                    length:6,
                                    message:"Minimum 6 characters are required"
                                }
                            })}
                            type="password"
                            placeholder="Password"
                            class="w-full bg-transparent outline-none px-4 text-white placeholder:text-zinc-500"/>

                       
                            

                        <button
                            type="button"
                            class="text-zinc-500 hover:text-white transition">

                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">

                                <path stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0s-3-7-9-7-9 7-9 7 3 7 9 7 9-7 9-7z"/>

                            </svg>

                        </button>

                    </div>
                     {errors.password &&<p className='text-red-600'>{errors.password.message}</p>}
                </div>
               
                <button
                    type="submit"
                    class="w-full h-14 rounded-2xl bg-lime-400 hover:bg-lime-300 transition text-black text-xl font-semibold">

                    Sign in →
                </button>

            </form>

           <p class="text-center text-zinc-500 mt-8">
            Don't have an account?
            <button 
                onClick={() => navigate('/register')}
                class="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200 focus:outline-none"
            >
                Create one
            </button>
            </p>

        </div>

    </div>

</div>
  )
}

export default LoginPage
