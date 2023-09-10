import mongoose from "mongoose";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Your name can not exceed 30 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Your name can not exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    roles: {
      type: String,
      required: [true, "Please enter your role"],
      maxlength: [20, "Your role can not exceed 20 characters"],
    },

    organization: {
      name: {
        type: String,
        required: [true, "Please enter your organization"],
        maxlength: [20, "Your organization can not exceed 20 characters"],
      },
      orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Org",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
