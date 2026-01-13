import mongoose from "mongoose";

const userScheme = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userScheme);
export default User;
