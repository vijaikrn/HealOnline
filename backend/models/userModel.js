const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    mobile: {
      type: String,
    },
    gender: String,
    height: Number,
    weight: Number,
    bp: Number,
    blood: Number,
    age: Number,
    cholesterol: String,
    medications: String,
    allergy: String,
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
