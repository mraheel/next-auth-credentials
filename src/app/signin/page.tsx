import SignInForm from "@/components/signin.form"
const SignIn = () => {
    return (
        <main className="flex min-h-screen flex-col items-center lg:p-24 md:p-6">
            <div className="flex flex-col text-lef w-full mb-10 p-4">
                <h1 className="text-lg font-bold tracking-widest">Sign In</h1>
                <p className="text-sm tracking-widest">*Please enter your valid username and password to sign in</p>
            </div>
           
            <SignInForm />
        </main>
    )
}

export default SignIn