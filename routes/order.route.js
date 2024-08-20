import express from "express";
import Order from "../models/order.model.js";
import auth from "../auth/auth.js";


const router = express.Router();

router.post("/",auth, async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = new Order({
    consumer: req.user._id,
    products,
    totalAmount,
    status: "pending",
  });
  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to save order" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id).populate("products");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("user/:userId",async (req,res)=>{
    try {
      const orders = await Order.find({consumer : req.params.userId}).populate('products.product','name price') 
    res.status(200).json(orders)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
      
    }
    
})

router.put('/:id/status',async (req,res)=>{
  const order = await Order.findById(req.params.id)
  if(order){
    order.status = req.body.status || order.status
    try {
      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
        }

  }else{
    res.status(404).json({ message: "Order not found" });
  }

})

export default router