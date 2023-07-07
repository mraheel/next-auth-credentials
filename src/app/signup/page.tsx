import SignUpForm from "@/components/signup.form"

const SignUp = () => {
    return (
        <main className="flex min-h-screen flex-col items-center lg:p-24 md:p-6">
        <div className="flex flex-col text-lef w-full mb-10 p-4">
                <h1 className="text-lg font-bold tracking-widest">Sign Up / User Registeration</h1>
                <p className="text-sm tracking-widest">*Please fill all the required fields to sign up your account.</p>
            </div>
            <SignUpForm />
        </main>
    )
}

export default SignUp