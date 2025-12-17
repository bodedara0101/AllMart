import { Product } from "../models/products.model.js"; // Assuming you have a User model
import { User } from "../models/users.model.js";

const getProductsHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (id) {
    const product = await Product.findByPk(id);
    if (product) {
      const user = await User.findByPk(product.userId);
      res.status(200).json({ product, user });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    const products = await Product.findAll();
    res.status(200).json(products);
  }
};

export default getProductsHandler;
