import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MANGOURL)
        console.log("DB connected succesfully");
        
    } catch (error) {
        console.log(error);
        process.exit(1) //failure        
    }
}