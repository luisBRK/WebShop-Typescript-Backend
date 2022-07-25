import { Request, Response } from "express";
import { RequestCustom } from "../types";
import sendResponse from "../utils/sendResponse";
import { OfferCrudService } from "../services";
import { UserInterface } from "../interfaces/project";

// functions

const newOffer = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.newOffer(
      req.body,
      req.user as UserInterface
    );
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllOffersCr = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.getAllOffersCr(
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllPublicOffers = async (_req: Request, res: Response) => {
  try {
    const response = await OfferCrudService.getAllPublicOffers();

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getOffer = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.getOffer(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getPublicOffer = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.getPublicOffer(req.params.id);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const editOffer = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.editOffer(
      req.params.id,
      req.user as UserInterface,
      req.body
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const deleteOffer = async (req: RequestCustom, res: Response) => {
  try {
    const response = await OfferCrudService.deleteOffer(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export {
  newOffer,
  getAllOffersCr,
  getAllPublicOffers,
  getOffer,
  getPublicOffer,
  editOffer,
  deleteOffer,
};
