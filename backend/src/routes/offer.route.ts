import express from "express";

import {
  newOffer,
  getAllOffersCr,
  getAllPublicOffers,
  getOffer,
  getPublicOffer,
  editOffer,
  deleteOffer,
} from "../controllers/offer.controller";

import checkAuthLoggin from "../services/logged.service";

// set router
const router = express.Router();

router
  .route("/")
  .get(checkAuthLoggin, getAllOffersCr)
  .post(checkAuthLoggin, newOffer);

router
  .route("/:id")
  .get(checkAuthLoggin, getOffer)
  .put(checkAuthLoggin, editOffer)
  .delete(checkAuthLoggin, deleteOffer);

// public
router.get("/public/offers", getAllPublicOffers);
router.get("/public/offers/:id", getPublicOffer);

export default router;
