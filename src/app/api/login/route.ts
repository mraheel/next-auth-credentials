import { NextResponse, NextRequest } from "next/server"
import { db } from '@/lib/db/drizzle'
import { User, userTable } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import { comparePassword } from "@/lib/bcrypt"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
 
        const result:User[] = await db.select().from(userTable).where(eq(userTable.email, body.username) );
        if(result.length > 0){
            const matched = await comparePassword(body.password, result[0].password)
            if(matched){
              
              const user = {...result[0], name: result[0].lastName }
              const {password, ...userWithoutPassword } = user
              const finalResult =  {
                ...userWithoutPassword
              }
              return new Response(JSON.stringify({ user:finalResult }), {
                status: 200,
              });

            }else{
              return new Response(
                JSON.stringify({ message: "Invalid username or password" }),{ 
                  status: 404 
                }
              );  
            }
            
        }else{
            return new Response(
                JSON.stringify({ message: "Invalid username or password" }), {
                  status: 404,
                }
              );
        }

    }catch (err) {
        NextResponse.json({
          error: "Please try again!!",
        });
      }
}