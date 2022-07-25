import { Model, model, Schema } from "mongoose";
import { ProductInterface } from "../interfaces/project";

type ProductModel = Model<ProductInterface, {}>;

const productSchema = new Schema<ProductInterface, ProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
    other: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    clients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
  },
  { timestamps: true }
);

const Product = model<ProductInterface, ProductModel>("Product", productSchema);

export default Product;
