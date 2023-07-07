'use client'
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    firstName: yup.string().required().trim().label('First Name'),
    lastName: yup.string().required().trim().label('Last Name'),
    email: yup.string().required().trim().email().label('Email'),
    password: yup.string().required().trim().label('Password'),
    confirmPassword: yup.string().required().label('Confirm Password').oneOf([yup.ref('password')], 'Passwords must match')
  }).required()
 


const SignUpForm = () => {
  const router = useRouter()
  interface iForm {
    firstName:string,
    lastName: string,
    email:string,
    password:string,
    confirmPassword: string
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
  
    const {confirmPassword, ...dataWithoutConfirmPassword } = data
    const updatedData =  {
      ...dataWithoutConfirmPassword
    }
 
    const loading = toast.loading(`Please wait`)
    const res = await fetch(`./api/signup`, {
      method: 'POST',
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" }
    })
    const result = await res.json();
    if (res.status === 200 && !result.error) {
      toast.dismiss(loading)
      reset()
      router.push('/signin')
      toast.success(`Your account successfully created.`)
      
    }else{
      toast.dismiss(loading)
      toast.error(result.message)
    }
  }

 
  return (
    
  
    <div className="flex flex-col md:w-full lg:w-1/3">
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter first name" {...register("firstName", { required: true })} />
          <p className="text-sm text-red-500 mt-1">{errors.firstName?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter last name" {...register("lastName", { required: true })} />
          <p className="text-sm text-red-500 mt-1">{errors.lastName?.message}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter email" {...register("email")}/>
          <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter password" {...register("password")} type="password"/>
          <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm password" {...register("confirmPassword")} type="password"/>
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword?.message}</p>
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign Up
          </button>
        </div>
      </form>
     </div>
    
    
  );
};

export default SignUpForm