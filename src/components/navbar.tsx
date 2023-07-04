'use client'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const NavBar = () =>{
    const { data:session } = useSession()
    return (
        <div className="flex justify-between p-6 bg-slate-300">
            <ul className="flex gap-3">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/contact'}>Contact</Link>
                </li>
            </ul>
            
            <ul className="flex gap-6">
                {
                    session?.user? (
                        <>
                            <li> <Link href={'/profile'}>{`Welcome ${session.user.name}`}</Link> </li>
                            <li><button onClick={ ()=> signOut() }>Sign Out </button></li>
                        </>                        
                    ):(
                        <>
                            <li> <Link href={'/signin'}>Sign In</Link> </li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}

export default NavBar