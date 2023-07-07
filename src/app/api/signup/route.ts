import { NextResponse, NextRequest } from "next/server";
import { db } from '@/lib/db/drizzle'
import { userTable, NewUser } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import { hashPassword } from "@/lib/bcrypt";


const insertUser = async (user: NewUser) => {
    return db.insert(userTable).values(user);
  }


export async function POST(req: NextRequest, res: NextResponse) {
    
    try{
       
        const body = await req.json();
        const result = await db.select().from(userTable).where(eq(userTable.email, body.email))
        if(result.length > 0){
            return  new Response(
                JSON.stringify({ error: true, message: "Please use a different email address." }),
                { status: 400 }
            )
        }else{
            const hashedPassword = await hashPassword(body.password) 
            const updatedData = {
                ...body,
                password: hashedPassword,
                createdAt: new Date()
            }
            
            await insertUser(updatedData)
            return new Response (
                JSON.stringify({ error: false, message: "Signup Successfull." }),
                { status: 200 }
            )
        }
    }catch (err) {
        NextResponse.json({
          error: "Please try again!!",
        });
      }
}