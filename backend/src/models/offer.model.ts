import { Model, model, Schema } from "mongoose";
import { OfferInterface } from "../interfaces/project";

type OfferModel = Model<OfferInterface, {}>;

const offerSchema = new Schema<OfferInterface, OfferModel>(
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
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Offer = model<OfferInterface, OfferModel>("Offer", offerSchema);

export default Offer;
