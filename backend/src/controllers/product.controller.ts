import { Request, Response } from "express";
import { RequestCustom } from "../types";
import sendResponse from "../utils/sendResponse";
import { ProductCrudService } from "../services";
import { UserInterface } from "../interfaces/project";

// functions

const newProduct = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.newProduct(
      req.body,
      req.user as UserInterface
    );
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.getAllProducts(
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllPublicProducts = async (_req: Request, res: Response) => {
  try {
    const response = await ProductCrudService.getAllPublicProducts();

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.getProduct(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getPublicProduct = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.getPublicProduct(req.params.id);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.editProduct(
      req.params.id,
      req.user as UserInterface,
      req.body
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: RequestCustom, res: Response) => {
  try {
    const response = await ProductCrudService.deleteProduct(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export {
  newProduct,
  getAllProducts,
  getAllPublicProducts,
  getProduct,
  getPublicProduct,
  editProduct,
  deleteProduct,
};
