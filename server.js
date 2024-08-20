import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/dbconnect.js"

import ProductRoutes from "./routes/product.route.js"
import UserRoutes from "./routes/user.route.js"
import OrderRoutes from "./routes/order.route.js"

dotenv.config()


const app = express()
const PORT = 1000 


app.use(express.json())


app.use("/api/product",ProductRoutes)
app.use("/api/user",UserRoutes)
app.use("/api/order/",OrderRoutes)

app.get("/",(req,res)=>{
    res.send("Hello World")
})



// 


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
    connectDB()
})