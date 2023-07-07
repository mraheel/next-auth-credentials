'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const SignInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const router = useRouter()

    const handleSubmit = async () => {
       
        const response = await signIn("credentials", {
                username,
                password,
                redirect: false,
                callbackUrl: '/'
          }
         );
          if (!response?.error ) {
            toast.success(`You logged in successfully.`)
            router.push('/')
          }else{
            toast.error(`You enter an invalid username or password.`)
          }
       
    }

    return (
        <>
        <form className="px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username" onChange={(e)=>{ setUsername(e.target.value)}} />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" onChange={(e)=>{ setPassword(e.target.value)}} />
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>Sign In </button>
            </div>
        </form>
        </>
    );
};

export default SignInForm;
