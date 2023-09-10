import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      maxlength: [20, "role can not exceed 20 characters"],
    },
    organization: {
      name: {
        type: String,
      },
      orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Org",
      },
    },
    permissions: {
      type: [String],
      required: [true, "permissions is required"],
      maxlength: [20, "permission can not be empty"],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Roles", roleSchema);

export default Role;
