'use client'
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignUpForm = () => {

  interface iForm {
    firstName:string,
    lastName: string,
    email:string,
    password:string
  }
  const  initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
  const [ profileFields, setProfileFields ] = useState<iForm>(initialFormValues)
  const handleOnChange = (event:any) => {
    const { id, value } = event.target;
    setProfileFields({
      ...profileFields, 
      [id]: value
    })
  }

  const handleOnClick = async () => {
    const {firstName, lastName, email, password} = profileFields;
    if(firstName== "" || lastName == "" || email == "" || password == ""){
      toast.error(`Please fill all mandatory fields.`)
    }else{
      const loading = toast.loading(`Please wait`)

      const res = await fetch(`./api/signup`, {
        method: 'POST',
        body: JSON.stringify(profileFields),
        headers: { "Content-Type": "application/json" }
      })
      const result = await res.json();
      if (res.status === 200 && !result.error) {
        toast.dismiss(loading)
        toast.success(`Your account successfully created.`)
        setProfileFields(initialFormValues)
      }else{
        toast.dismiss(loading)
        toast.error(result.message)
      }
    }
    
  }

  return (
    <>
      <form className="px-8 pt-6 pb-8 mb-4 w-1/3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="Enter first name" onChange={handleOnChange} value={profileFields.firstName} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Enter last name" onChange={handleOnChange} value={profileFields.lastName} />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email" onChange={handleOnChange} value={profileFields.email}/>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password*</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" onChange={handleOnChange} value={profileFields.password}/>
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleOnClick} type="button">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm