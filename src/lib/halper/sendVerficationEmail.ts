import {resend} from "@/lib/resend"
import VerificationEmail from '../../../emails/verificationEmail';
import { ApiResponce } from "@/types/apiResponce";

export async function sendVerficationEmail(
    email:string,
    username:string,
    verifyCode: string
): Promise<ApiResponce>{
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to:email,
                subject: 'Mystry message | verification code',
                react: VerificationEmail({username, otp:verifyCode})
            })
             return{
                success:true, message:'verfication email send successfully'
            }
        } catch (emailError) {
            console.log('Error sending verfication email',emailError)
            return{
                success:false, message:'Failed to send verfication email'
            }
        }
}