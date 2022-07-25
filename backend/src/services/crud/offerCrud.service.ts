import { OfferInterface, UserInterface } from "../../interfaces/project";
import {
  InterfaceService,
  InterfaceDataOffer,
  InterfaceGetManyOffers,
  InterfaceMessageResponse,
} from "../../interfaces/system";

import Offer from "../../models/offer.model";
import User from "../../models/user.model";

// === OFFERS ===

export async function newOffer(
  OfferData: OfferInterface,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataOffer>> {
  try {
    const offer = new Offer(OfferData);

    // offer.creator = UserData._id;
    const userEmail = UserData.email;
    const user = await User.findOne({ email: userEmail });

    // Security || email validation
    if (!user) {
      return { error: "access_denied" };
    }

    // offer.creator = user._id;
    offer.creator = user._id;

    const storedOffer = await offer.save();

    if (storedOffer) {
      return { result: { dataOffer: storedOffer } };
    } else {
      return { error: "offer_error_create" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllOffersCr(
  UserData: UserInterface
): Promise<InterfaceService<InterfaceGetManyOffers>> {
  try {
    const userCreator = UserData;
    const offers = await Offer.find().where("creator").equals(userCreator);

    if (offers) {
      return { result: { offersList: offers } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getAllPublicOffers(): Promise<
  InterfaceService<InterfaceGetManyOffers>
> {
  try {
    const offers = await Offer.find().select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (offers) {
      return { result: { offersList: offers } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getOffer(
  offerId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceDataOffer>> {
  try {
    // Security | Verify id structure
    if (!offerId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    // set offer obj
    const offer = await Offer.findById(offerId.trim());

    // Security | Offer exist
    if (!offer) {
      return { error: "offer_not_found" };
    }

    // Security | Offer from correct user
    if (offer.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // add offer && product, etc

    if (offer) {
      return { result: { dataOffer: offer } };
    } else {
      return { error: "offer_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function getPublicOffer(
  offerId: String
): Promise<InterfaceService<InterfaceDataOffer>> {
  try {
    // Security | Verify id structure
    if (!offerId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const offer = await Offer.findById(offerId.trim()).select(
      "-creator -createdAt -updatedAt -__v"
    );

    if (offer) {
      return { result: { dataOffer: offer } };
    } else {
      return { error: "offer_not_found" };
    }
  } catch (event) {
    throw event;
  }
}

export async function editOffer(
  offerId: String,
  UserData: UserInterface,
  OfferData: OfferInterface
): Promise<InterfaceService<InterfaceDataOffer>> {
  try {
    // Security | Verify id structure
    if (!offerId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    const offer = await Offer.findById(offerId.trim());

    // Security | Offer exist
    if (!offer) {
      return { error: "offer_not_found" };
    }

    // Security | Offer from correct user
    if (offer.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    // update data
    offer.name = OfferData.name || offer.name;
    offer.description = OfferData.description || offer.description;
    offer.amount = OfferData.amount || offer.amount;

    const storedOffer = await offer.save();

    if (storedOffer) {
      return { result: { dataOffer: storedOffer } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}

export async function deleteOffer(
  offerId: String,
  UserData: UserInterface
): Promise<InterfaceService<InterfaceMessageResponse>> {
  try {
    // Security | Verify id structure
    if (!offerId.match(/^[0-9a-fA-F]{24}$/)) {
      return { error: "invalid_token" };
    }

    // set obj
    const offer = await Offer.findById(offerId.trim());

    // Security | Offer exist
    if (!offer) {
      return { error: "offer_not_found" };
    }

    // Security | Offer from correct user
    if (offer.creator.toString() !== UserData._id.toString()) {
      return { error: "unauthorized" };
    }

    const deletedOffer = await offer.deleteOne();

    if (deletedOffer) {
      return { result: { confirmation: "Deleted successfully" } };
    } else {
      return { error: "system_error" };
    }
  } catch (event) {
    throw event;
  }
}
