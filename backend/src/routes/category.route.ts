import express from "express";

import {
  newCategory,
  getAllCategories,
  getAllPublicCategories,
  getCategory,
  getPublicCategory,
  editCategory,
  deleteCategory,
} from "../controllers/category.controller";

import checkAuthLoggin from "../services/logged.service";

// set router
const router = express.Router();

// routes
router
  .route("/")
  .get(checkAuthLoggin, getAllCategories)
  .post(checkAuthLoggin, newCategory);

router
  .route("/:id")
  .get(checkAuthLoggin, getCategory)
  .put(checkAuthLoggin, editCategory)
  .delete(checkAuthLoggin, deleteCategory);

// public
router.get("/public/categories", getAllPublicCategories);
router.get("/public/categories/:id", getPublicCategory);

export default router;
