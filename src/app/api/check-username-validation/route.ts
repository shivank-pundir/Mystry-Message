import dbConnect from "@/lib/connectdb";
import UserModel from "@/models/user";
import {z} from 'zod'
import {usernameValidation} from '@/schemas/signupSchema'

//this is like when user making new username then he/she typing then like we suggest at 
//that time like the username is available or not

const usernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request){

    await dbConnect();
    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        //validation with Zod
       const result =  usernameQuerySchema.safeParse(queryParams)
       console.log(result) //ToDo remove
        if(!result.success){
            const usernameError = result.error.format().username?._errors || []

            return Response.json({
                success:false,
                message: usernameError?.length >0
                ? usernameError.join(',')
                : 'Invalid query parameter',
            },{status:400})
        }
        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message: 'Username is already taken'
            },{status:400})
        }
        return Response.json({
                success:true,
                message: 'Username is available'
                
            },{status:200})

    } catch (error) {
        console.error("Error Checking username ",error)
        Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
    }
}
