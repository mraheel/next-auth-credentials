import { hash, compare } from "bcrypt";

export async function hashPassword (password:string) {
    const saltRounds  = 10
    try{
        const hashPassword = await hash(password, saltRounds)
        return hashPassword
    }catch(error){
        throw new Error('Error in hass password')
    }
}

export async function comparePassword(password:string, hashedPassword:string) {
    try{
        const is_compared =  await compare(password, hashedPassword)
        return is_compared

    }catch(error){
        throw new Error('Error in compare password')
    }
}
