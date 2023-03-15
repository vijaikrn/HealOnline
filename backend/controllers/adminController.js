const User = require("../models/userModel");

const Doctor = require("../models/doctorModel");

const getDoctors = async(req,res)=>{
    try {
        const doctors = await Doctor.find({})
        res
        .status(200)
        .send({
            message:"Doctors fetched successfully",
            success:true,
            data:doctors
        })
    } catch (error) {
        res.status(500).send({
            message:'failed to fetch doctor list',
            success:false,
            error
        })
    }
}

const getUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res
        .status(200)
        .send({
            message:"Users fetched successfully",
            success:true,
            data:users
        })
    } catch (error) {
        res.status(500).send({
            message:'failed to fetch user list',
            success:false,
            error
        })
    }
}

const doctorStatus = async (req, res) => {
    try {
      const { doctorId, status ,experience } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status, experience
      });

      doctor.status === "approved" ? true : false;
      await doctor.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }

module.exports={
    getDoctors,
    getUsers,
    doctorStatus
}