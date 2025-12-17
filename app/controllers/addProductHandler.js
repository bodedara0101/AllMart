import { Product } from "../models/products.model.js";
import { uploadProductsOnCloudinary } from "../utils/cloudenary.js";

export const addProductHandler  = async (req, res) => {
    console.log('in addProductHandler');
  try {
    const { name, description, price, category, quantity } = req.body;
    const file = req.file;
    const user = req.user;
    console.log(file);
    const result = await uploadProductsOnCloudinary(file.path);

    const newProduct = new Product({
      name,
      quantity,
      category,
      description,
      price,
      image: result.url,
      userId : user.id
    });
    
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully" , product: newProduct});
  } catch (error) {
    console.log(error)
  } 
};
