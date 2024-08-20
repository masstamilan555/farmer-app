import express from "express"
import Product from "../models/product.model.js"
import mongoose from "mongoose"


const router = express.Router()


router.get("/",async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({data:products})
        } catch (error) {
            res.status(500).json({message:error.message})
            }


})

router.get("/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product) {
            return res.status(404).json({message:"Product not found"})
            }
            res.status(200).json({data:product})
            } catch (error) {
                res.status(500).json({message:error.message})
                }
})


router.post("/",async(req,res)=>{
    const product = req.body
    if(!product.name || !product.price || !product.quantity || !product.image  ){
        return res.status(400).send({message:"Please fill all the fields",success:false})

    }
    const newProduct  = new Product(product)

    try {
        await newProduct.save()
        res.send({message:"Product created successfully",success:true,data:newProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Server Error",success:false})
        
        
    }
})


router.delete("/:id",async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message:"Invalid product id",success:false})
    }
    try {
        await Product.findByIdAndDelete(id)
        res.send({message:"Product deleted successfully",success:true})
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Server Error",success:false})
            }

    
})

router.put("/:id",async(req,res)=>{
    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message:"Invalid product id",success:false})
    }

    try {
        const updatedProduct =await Product.findByIdAndUpdate(id,product,{new:true})
        res.send({message:"Product updated successfully",success:true,data:updatedProduct})
    } catch (error) {
        console.log(error); 
        return res.status(500).send({message:"Server Error",success:false})
    }
})
// 



export default router