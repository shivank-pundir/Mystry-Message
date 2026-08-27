import { log } from "console";
import { promises } from "dns";
import mongoose from "mongoose";

type connectionObject = {
    isConnect?:number
}

const connection:connectionObject = {}

async function dbConnect(): Promise<void>{
if(connection.isConnect){
    console.log('Already connected todatabase')
    return;
}
try {
   const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
  connection.isConnect =  db.connections[0].readyState

  console.log('DB connected successfully')
} catch (error) {
    console.log("DB connection faild",error)
    process.exit(1)
     
}
}
export default dbConnect;