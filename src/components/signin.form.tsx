'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"



const schema = yup
  .object({
    username: yup.string().required().trim().label('Username').email('Must be a valid email'),
    password: yup.string().required().trim().label('Password')
  }).required()


  

const SignInForm = () => {
    const router = useRouter()

    interface iForm {
        username: string,
        password: string
    }

    const { 
        register, 
        formState: { errors }, 
        handleSubmit,
        reset 
      } = useForm<iForm>({
        resolver: yupResolver(schema)
      })
    
      const onSubmit: SubmitHandler<iForm> = async (data) => {
        const loader = toast.loading('Please wait')
        const response = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
            callbackUrl: '/'
        }
        );
        if (!response?.error ) {
            toast.success(`You logged in successfully.`)
            reset()
            router.push('/')
        }else{
            toast.error(`You enter an invalid username or password.`)
        }
        toast.dismiss(loader)
      }


    return (
    <div className="flex flex-col md:w-full lg:w-1/3">
<form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your username" {...register("username", { required: true })} />
                <p className="text-sm text-red-500 mt-1">{errors.username?.message}</p>

            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" {...register("password", { required: true, min: 8 })} />
                <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In </button>
            </div>
        </form>

    </div>
        
  
    );
};

export default SignInForm;
