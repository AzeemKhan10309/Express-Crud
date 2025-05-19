import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    inStock: Boolean
  });
  
export default mongoose.model('Item', itemSchema);

