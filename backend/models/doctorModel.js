const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
 
  phoneNumber: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  timings: {
    type: Array,
    required: true,
  },
  
  status:{
    type:String,
    default:"pending"
  }
},{
  timestamps:true
});

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
