import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId,ref: "User"  },  //  use after auth api *****************************************
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount:{type : Number,required:true},
    status:{type:String , required:true , default :"pending"}

},{
    timestamps:true
})

const Order = mongoose.model("Order",OrderSchema)

export default Order