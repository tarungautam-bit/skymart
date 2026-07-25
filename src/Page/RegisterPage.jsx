import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth';

const RegisterPage = () => {
    
    let {navigate,handleSubmit,registerFormSubmit,errors,register}=useAuth();
  return (
    <div class="min-h-screen flex items-center justify-center px-5 py-10">

    <div class="w-full max-w-md">

      
        <div class="flex justify-center mb-10">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center">
                    <span class="text-black text-xl font-bold">⚡</span>
                </div>

                <h2 class="text-3xl font-bold text-white">
                    Sky<span class="text-lime-400">Mart</span>
                </h2>
            </div>
        </div>

       
        <div class="bg-[#111111] border border-zinc-800 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,.55)] p-8 sm:p-9">

            <h1 class="text-3xl font-bold text-white">
                Create account
            </h1>

            <p class="text-zinc-500 mt-2 mb-8">
                Join SkyMart and start shopping
            </p>

            <form class="space-y-4" onSubmit={handleSubmit(registerFormSubmit)}>

               <div className='flex flex-col gap-2'>
                <div class="flex items-center h-14 rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">

                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A9 9 0 1118.879 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0"/>

                    </svg>

                    <input

                        {...register('name',{
                            required:"Name is required"
                        })}
                        type="text"
                        placeholder="Full name"

                        class="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-zinc-500"/>
                        
                        
                </div>
                    {errors.name &&<p className="text-red-600">{errors.name.message}</p> }
                </div>


                <div className='flex flex-col gap-2'>
               
                    <div class="flex items-center h-14 rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-zinc-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">

                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>

                        </svg>

                        <input
                            {...register('email',{
                                    required:'Email is Required'
                            })}
                            type="email"
                            placeholder="Email address"
                            class="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-zinc-500"/>
                              
                            
                    </div>
                    {errors.email &&<p className="text-red-600">{errors.email.message}</p> }
                          
                </div>  


                <div className='flex flex-col gap-2'>
                    <div class="flex items-center h-14 rounded-2xl border border-zinc-700 bg-[#1d1d1d] px-4">

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
                            {...register('password',{
                                    required:'Password is Required',
                                    minLength:{
                                        value:6,
                                        message:"Minimum 6 Characters are required"
                                    }
                            })}
                            type="password"
                            placeholder="Password (min 6 chars)"
                            class="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-zinc-500"/>
                            <br/>

                            

                        <button type="button" class="text-zinc-500 hover:text-white">

                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">

                                <path stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0s-3-7-9-7-9 7-9 7 3 7 9 7 9-7 9-7"/>

                            </svg>

                        </button>

                    </div>
                    {errors.password &&<p className="text-red-600">{errors.password.message}</p> }
                </div>
  
                <button
                    class="w-full h-14 rounded-2xl bg-lime-400 hover:bg-lime-300 transition-all text-black text-lg font-semibold mt-2">

                    Create Account →
                </button>

            </form>

            <p class="mt-8 text-center text-zinc-500">
            Already have an account?
            <button 
                onClick={() => navigate('/')} 
                class="ml-1 font-semibold text-lime-400 hover:text-lime-300 hover:underline transition-colors duration-200 focus:outline-none"
            >
                Sign in
            </button>
            </p>

        </div>

    </div>

</div>
  )
}

export default RegisterPage
