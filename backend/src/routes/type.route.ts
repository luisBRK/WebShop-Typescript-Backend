import express from "express";

import {
  newType,
  getAllTypes,
  getAllPublicTypes,
  getType,
  getPublicType,
  editType,
  deleteType,
} from "../controllers/type.controller";

import checkAuthLoggin from "../services/logged.service";

// set router

const router = express.Router();

router
  .route("/")
  .get(checkAuthLoggin, getAllTypes)
  .post(checkAuthLoggin, newType);

router
  .route("/:id")
  .get(checkAuthLoggin, getType)
  .put(checkAuthLoggin, editType)
  .delete(checkAuthLoggin, deleteType);

// public
router.get("/public/types", getAllPublicTypes);
router.get("/public/types/:id", getPublicType);
export default router;
