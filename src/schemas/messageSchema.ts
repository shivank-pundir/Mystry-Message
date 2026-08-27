import {z} from 'zod'

export const messageSchema = z.object({
    content:z.string()
    .min(10,{message:'content must be atlest 10 character'})
    .max(300,{message:'content must be mo longer than 300 character'})
    ,
 
})      