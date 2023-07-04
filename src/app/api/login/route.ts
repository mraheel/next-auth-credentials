import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        if(body.username == 'raheel@gmail.com' && body.password == "123"){
            return new Response(JSON.stringify({ user: {id:1, name: 'john'} }), {
                status: 200,
              });
        }else{
            return new Response(
                JSON.stringify({ message: "Password not matched" }),
                {
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