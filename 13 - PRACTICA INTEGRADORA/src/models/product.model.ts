import { Schema, model } from "mongoose";
import { ProductType } from "../types/product.types";

const ProductSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model('products', ProductSchema);
