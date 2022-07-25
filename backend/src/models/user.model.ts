// import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserInterface, UserInterfaceMethods } from "../interfaces/project";

type UserModel = Model<UserInterface, {}, UserInterfaceMethods>;

const userSchema = new Schema<UserInterface, UserModel, UserInterfaceMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
      minLength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Security | HashPassword
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("checkPassword", async function (formPassword: any) {
  return await bcrypt.compare(formPassword, this.password);
});

const User = model<UserInterface, UserModel>("User", userSchema);

export default User;
