import { ProductInterface, UserInterface } from "../../interfaces/project";

import {
  InterfaceService,
  InterfaceDataProduct,
  InterfaceGetManyProducts,
  InterfaceMessageResponse,
} from "../../interfaces/system";

import Product from "../../models/product.model";
import User from "../../models/user.model";

export async function newProduct(
  ProductData: ProductInterface,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataProduct>> {
  try {
    const product = new Product(ProductData);

    // product.creator = UserData._id;
    const userEmail = UserData.email;
    const user = await User.findOne({ email: userEmail });

    // Security || email validation
    if (!user) {
      return { error: "access_denied" };
    }

    // product.creator = user._id;
    product.creator = user._id;

    const storedProduct = await product.save();

    if (storedProduct) {
      return { result: { dataProduct: product } };
    } else {
      return { error: "product_error_create" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllProducts(
  UserData: UserInterface
): Promise<InterfaceService<InterfaceGetManyProducts>> {
  try {
    const userCreator = UserData;
    const products = await Product.find().where("creator").equals(userCreator);

    if (products) {
      return { result: { productsList: products } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllPublicProducts(): Promise<
  InterfaceService<InterfaceGetManyProducts>
> {
  try {
    const products = await Product.find().select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (products) {
      return { result: { productsList: products } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getProduct(
  productId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataProduct>> {
  try {
    // Security | Verify id structure
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const product = await Product.findById(productId.trim());

    // Security | Product exist
    if (!product) {
      return { error: "product_not_found" };
    }

    // Security | Product from correct user
    if (product.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // add product && product, etc

    if (product) {
      return { result: { dataProduct: product } };
    } else {
      return { error: "product_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getPublicProduct(
  productId: String
): Promise<InterfaceService<InterfaceDataProduct>> {
  try {
    // Security | Verify id structure
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const product = await Product.findById(productId.trim()).select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (product) {
      return { result: { dataProduct: product } };
    } else {
      return { error: "product_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function editProduct(
  productId: String,
  UserData: UserInterface,
  ProductData: ProductInterface
): Promise<InterfaceService<InterfaceDataProduct>> {
  try {
    // Security | Verify id structure
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const product = await Product.findById(productId.trim());

    // Security | Product exist
    if (!product) {
      return { error: "product_not_found" };
    }

    // Security | Product from correct user
    if (product.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // update data
    product.name = ProductData.name || product.name;
    product.image = ProductData.image || product.image;
    product.price = ProductData.price || product.price;
    product.size = ProductData.size || product.size;
    product.weight = ProductData.weight || product.weight;
    product.color = ProductData.color || product.color;
    product.brand = ProductData.brand || product.brand;
    product.description = ProductData.description || product.description;
    product.offer = ProductData.offer || product.offer;
    product.other = ProductData.other || product.other;
    product.category = ProductData.category || product.category;
    product.type = ProductData.type || product.type;

    const storedProduct = await product.save();

    if (storedProduct) {
      return { result: { dataProduct: storedProduct } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function deleteProduct(
  productId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceMessageResponse>> {
  try {
    // Security | Verify id structure
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const product = await Product.findById(productId.trim());

    // Security | Product exist
    if (!product) {
      return { error: "product_not_found" };
    }

    // Security | Product from correct user
    if (product.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    const deletedProduct = await product.deleteOne();

    if (deletedProduct) {
      return { result: { confirmation: "Deleted successfully" } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}
