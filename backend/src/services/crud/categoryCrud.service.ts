import { CategoryInterface, UserInterface } from "../../interfaces/project";
import {
  InterfaceService,
  InterfaceDataCategory,
  InterfaceDataCategoryPlus,
  InterfaceGetManyCategories,
  InterfaceMessageResponse,
} from "../../interfaces/system";

import Category from "../../models/category.model";
import Product from "../../models/product.model";
import Type from "../../models/type.model";
import User from "../../models/user.model";

// === CATEGORIES ===
export async function newCategory(
  CategoryData: CategoryInterface,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataCategory>> {
  try {
    const category = new Category(CategoryData);

    // category.creator = UserData._id;
    const userEmail = UserData.email;
    const user = await User.findOne({ email: userEmail });

    // Security || email validation
    if (!user) {
      return { error: "access_denied" };
    }

    // category.creator = user._id;
    category.creator = user._id;

    const storedCategory = await category.save();

    if (storedCategory) {
      return { result: { dataCategory: storedCategory } };
    } else {
      return { error: "category_error_create" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllCategories(
  UserData: UserInterface
): Promise<InterfaceService<InterfaceGetManyCategories>> {
  try {
    const userCreator = UserData;
    const categories = await Category.find()
      .where("creator")
      .equals(userCreator);

    if (categories) {
      return { result: { categoriesList: categories } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllPublicCategories(): Promise<
  InterfaceService<InterfaceGetManyCategories>
> {
  try {
    const categories = await Category.find().select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (categories) {
      return { result: { categoriesList: categories } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getCategory(
  categoryId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataCategory>> {
  try {
    // Security | Verify id structure
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const category = await Category.findById(categoryId.trim());

    // Security | Category exist
    if (!category) {
      return { error: "category_not_found" };
    }

    // Security | Category from correct user
    if (category.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // add category && product, etc

    if (category) {
      return { result: { dataCategory: category } };
    } else {
      return { error: "category_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getPublicCategory(
  categoryId: String
): Promise<InterfaceService<InterfaceDataCategoryPlus>> {
  try {
    // Security | Verify id structure
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const category = await Category.findById(categoryId.trim()).select(
      "-creator -createdAt -updatedAt -__v"
    );
    const types = await Type.find().where("category").equals(category?._id);
    const products = await Product.find()
      .where("category")
      .equals(category?._id);

    if (category) {
      return {
        result: {
          dataCategory: category,
          dataTypes: types,
          dataProducts: products,
        },
      };
    } else {
      return { error: "category_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function editCategory(
  categoryId: String,
  UserData: UserInterface,
  CategoryData: CategoryInterface
): Promise<InterfaceService<InterfaceDataCategory>> {
  try {
    // Security | Verify id structure
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const category = await Category.findById(categoryId.trim());

    // Security | Category exist
    if (!category) {
      return { error: "category_not_found" };
    }

    // Security | Category from correct user
    if (category.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // update data
    category.name = CategoryData.name || category.name;
    category.description = CategoryData.description || category.description;

    const storedCategory = await category.save();

    if (storedCategory) {
      return { result: { dataCategory: category } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function deleteCategory(
  categoryId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceMessageResponse>> {
  try {
    // Security | Verify id structure
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const category = await Category.findById(categoryId.trim());

    // Security | Category exist
    if (!category) {
      return { error: "category_not_found" };
    }

    // Security | Category from correct user
    if (category.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    const deletedCategory = await category.deleteOne();

    if (deletedCategory) {
      return { result: { confirmation: "Deleted successfully" } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}
