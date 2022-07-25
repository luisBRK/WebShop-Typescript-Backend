import { Request, Response } from "express";
import { RequestCustom } from "../types";
import sendResponse from "../utils/sendResponse";
import { CategoryCrudService } from "../services";
import { UserInterface } from "../interfaces/project";

const newCategory = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.newCategory(
      req.body,
      req.user as UserInterface
    );
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.getAllCategories(
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllPublicCategories = async (_req: Request, res: Response) => {
  try {
    const response = await CategoryCrudService.getAllPublicCategories();

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.getCategory(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getPublicCategory = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.getPublicCategory(req.params.id);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const editCategory = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.editCategory(
      req.params.id,
      req.user as UserInterface,
      req.body
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req: RequestCustom, res: Response) => {
  try {
    const response = await CategoryCrudService.deleteCategory(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export {
  newCategory,
  getAllCategories,
  getAllPublicCategories,
  getCategory,
  getPublicCategory,
  editCategory,
  deleteCategory,
};
