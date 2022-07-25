import { Model, model, Schema } from "mongoose";
import { CategoryInterface } from "../interfaces/project";

type CategoryModel = Model<CategoryInterface, {}>;

const categorySchema = new Schema<CategoryInterface, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<CategoryInterface, CategoryModel>(
  "Category",
  categorySchema
);

export default Category;
