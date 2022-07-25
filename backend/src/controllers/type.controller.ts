import { Request, Response } from "express";
import { RequestCustom } from "../types";
import sendResponse from "../utils/sendResponse";
import { TypeCrudService } from "../services";
import { UserInterface } from "../interfaces/project";

const newType = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.newType(
      req.body,
      req.user as UserInterface
    );
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllTypes = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.getAllTypes(
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getAllPublicTypes = async (_req: Request, res: Response) => {
  try {
    const response = await TypeCrudService.getAllPublicTypes();

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getType = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.getType(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const getPublicType = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.getPublicType(req.params.id);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const editType = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.editType(
      req.params.id,
      req.user as UserInterface,
      req.body
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const deleteType = async (req: RequestCustom, res: Response) => {
  try {
    const response = await TypeCrudService.deleteType(
      req.params.id,
      req.user as UserInterface
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export {
  newType,
  getAllTypes,
  getAllPublicTypes,
  getType,
  getPublicType,
  editType,
  deleteType,
};
