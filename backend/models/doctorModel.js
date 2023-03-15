const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
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

    mobile: {
      type: String,
      
    },
    licenseNumber: {
      type: String,
      
    },
    specialization: {
      type: String,
      
    },
    experience: {
      type: String,
      
    },
    fee: {
      type: Number,
      
    },
    timings: {
      type: Array,
      
    },

    status: {
      type: String,
      default: "pending",
    },
    hasApplied:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = doctorModel;
