// import * as mongoose from "mongoose";

import {
  UserInterface,
  CategoryInterface,
  TypeInterface,
  ProductInterface,
} from "../project";
import responses from "../../locales/responses";

export type InterfaceServerMessage = keyof typeof responses;

// general
export interface InterfaceService<T> {
  result?: T;
  error?: InterfaceServerMessage;
}

// loggin user
export interface InterfaceEmailRegistered {
  id: string;
  token: string;
}
export interface InterfaceAuthLogin {
  dataUser: Partial<UserInterface>;
}

export interface InterfaceUserCofirmed {
  confirmation: string;
}

export interface InterfaceAuthConfirmUser {
  confirmation: string;
  token: string;
}
export interface InterfaceValidToken {
  confirmation: string;
}

export interface InterfaceChangedPassword {
  confirmation: string;
}

// REFACTOR

export interface InterfaceMessageResponse {
  confirmation: string;
}

// CRUD Category
export interface InterfaceDataCategory {
  dataCategory: Partial<CategoryInterface>;
}
export interface InterfaceDataCategoryPlus {
  dataCategory: Partial<CategoryInterface>;
  dataTypes: Object;
  dataProducts: Object;
}

export interface InterfaceGetManyCategories {
  categoriesList: Object;
}

// CRUD Type
export interface InterfaceDataType {
  dataType: Partial<TypeInterface>;
}

export interface InterfaceDataTypePlus {
  dataType: Partial<TypeInterface>;
  dataProducts: Object;
}

export interface InterfaceGetManyTypes {
  typesList: Object;
}

// CRUD Offer
export interface InterfaceDataOffer {
  dataOffer: Partial<TypeInterface>;
}

export interface InterfaceGetManyOffers {
  offersList: Object;
}

// CRUD Product
export interface InterfaceDataProduct {
  dataProduct: Partial<ProductInterface>;
}

export interface InterfaceGetManyProducts {
  productsList: Object;
}
