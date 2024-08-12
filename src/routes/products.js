import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/fetch-products", getProducts);
router.get("/fetch-product/:id", getProductById);
router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export { router as productRouter };
