import { TypeInterface, UserInterface } from "../../interfaces/project";
import {
  InterfaceService,
  InterfaceDataType,
  InterfaceDataTypePlus,
  InterfaceGetManyTypes,
  InterfaceMessageResponse,
} from "../../interfaces/system";

import Type from "../../models/type.model";
import Product from "../../models/product.model";
import User from "../../models/user.model";

// === Types ===
export async function newType(
  TypeData: TypeInterface,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataType>> {
  try {
    console.log("DENTROOOO");
    const type = new Type(TypeData);

    // type.creator = UserData._id;
    const userEmail = UserData.email;
    const user = await User.findOne({ email: userEmail });

    // Security || email validation
    if (!user) {
      return { error: "access_denied" };
    }

    // type.creator = user._id;
    type.creator = user._id;

    // save type
    const storedType = await type.save();

    if (storedType) {
      return { result: { dataType: storedType } };
    } else {
      return { error: "type_error_create" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllTypes(
  UserData: UserInterface
): Promise<InterfaceService<InterfaceGetManyTypes>> {
  try {
    // user data
    const userCreator = UserData;
    // data type
    const types = await Type.find().where("creator").equals(userCreator);

    if (types) {
      return { result: { typesList: types } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllPublicTypes(): Promise<
  InterfaceService<InterfaceGetManyTypes>
> {
  try {
    const types = await Type.find().select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (types) {
      return { result: { typesList: types } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getType(
  typeId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataType>> {
  try {
    // Security | Verify id structure
    if (!typeId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const type = await Type.findById(typeId.trim());

    // Security | Type exist
    if (!type) {
      return { error: "type_not_found" };
    }

    // Security | Category from correct user
    if (type.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    if (type) {
      return { result: { dataType: type } };
    } else {
      return { error: "type_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getPublicType(
  typeId: String
): Promise<InterfaceService<InterfaceDataTypePlus>> {
  try {
    // Security | Verify id structure
    if (!typeId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    // create Type object
    const type = await Type.findById(typeId.trim()).select(
      "-creator -createdAt -updatedAt -__v"
    );

    // add product, etc
    const products = await Product.find().where("type").equals(type?._id);

    if (type) {
      return { result: { dataType: type, dataProducts: products } };
    } else {
      return { error: "type_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function editType(
  typeId: String,
  UserData: UserInterface,
  TypeData: TypeInterface
): Promise<InterfaceService<InterfaceDataType>> {
  try {
    // Security | Verify id structure
    if (!typeId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    // create Type object
    const type = await Type.findById(typeId.trim());

    // Security | Type exist
    if (!type) {
      return { error: "type_not_found" };
    }

    // Security | Category from correct user
    if (type.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // update data
    type.name = TypeData.name || type.name;
    type.description = TypeData.description || type.description;

    const updatedType = await type.save();

    if (updatedType) {
      return { result: { dataType: type } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function deleteType(
  typeId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceMessageResponse>> {
  try {
    // Security | Verify id structure
    if (!typeId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    // create Type object
    const type = await Type.findById(typeId.trim());

    // Security | Type exist
    if (!type) {
      return { error: "type_not_found" };
    }

    // Security | Type from correct user
    if (type.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    const deletedType = await type.deleteOne();

    if (deletedType) {
      return { result: { confirmation: "Deleted successfully" } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}
