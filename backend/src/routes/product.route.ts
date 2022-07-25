import express from "express";
import {
  newProduct,
  getAllProducts,
  getAllPublicProducts,
  getProduct,
  getPublicProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product.controller";

import checkAuthLoggin from "../services/logged.service";

// set router
const router = express.Router();

// routes
router
  .route("/")
  .get(checkAuthLoggin, getAllProducts)
  .post(checkAuthLoggin, newProduct);

router
  .route("/:id")
  .get(checkAuthLoggin, getProduct)
  .put(checkAuthLoggin, editProduct)
  .delete(checkAuthLoggin, deleteProduct);

// public
router.get("/public/products", getAllPublicProducts);
router.get("/public/products/:id", getPublicProduct);
export default router;
