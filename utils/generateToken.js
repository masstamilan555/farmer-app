import jwt from "jsonwebtoken"



const generateToken =(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"15d"})
}

export default generateToken