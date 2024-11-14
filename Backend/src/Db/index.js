import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connect =async()=>{
  try {
     const connection = await mongoose.connect(process.env.MONGO_URI)
     console.log(connection)
     console.log("dabatbase connected")
  } catch (error) {
    console.log("Error in coonection of mongodb",error);
    
  }
}
export default connect