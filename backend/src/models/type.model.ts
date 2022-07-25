import { Model, model, Schema } from "mongoose";
import { TypeInterface } from "../interfaces/project";

type TypeModel = Model<TypeInterface, {}>;

const typeSchema = new Schema<TypeInterface, TypeModel>(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Type = model<TypeInterface, TypeModel>("Type", typeSchema);

export default Type;
