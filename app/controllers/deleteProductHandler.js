import { Product } from "../models/products.model.js";

export const deleteProductHandler = async (req, res) => {
    console.log("in delete pro")
    try {
        const { id } = req.params;
        const deletedProduct = await Product.destroy({ where: { id: id } });
        if (deletedProduct) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting Product" });
    }
}