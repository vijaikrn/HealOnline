const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const doctorRegister = async (req, res) => {
    try {
      const doctorExists = await Doctor.findOne({ email: req.body.email });
      if (doctorExists) {
        return res
          .status(200)
          .json({ message: "Doctor account already exists", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
  
      const newDoctor = new Doctor(req.body);
      console.log(newDoctor);
      await newDoctor.save();
      
      res
        .status(200)
        .send({ message: "Doctor account created successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: "error creating doctor account", success: false, error });
    }
  };

  const doctorLogin = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ email: req.body.email });
  console.log(doctor);
      if (!doctor) {
        return res
          .status(200)
          .send({ message: "account does not exist", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, doctor.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "invalid password", success: false });
      } else {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({
          message: "doctor logged in successfully",
          success: true,
          data: token,
          docInfo:doctor
        });
      }
    } catch (error) {
      res.status(500).send({ message: "error loggin in", success: false, error });
    }
  };

  const getDoctorInfoById = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ _id: req.doctorId });
      console.log(doctor);
     doctor.password = undefined;
      if (!doctor) {
        res.status(200).send({ message: "Doctor account does not exist", success: false });
      } else {
        res.status(200).send({
          message: "doc info",
          success: true,
          data: doctor,
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "error getting user info", success: false, error });
    }
  };

  const applyDoctor = async (req, res) => {
    try {
    
      
      console.log(req.body);
      const newdoctor =await Doctor.findById(req.doctorId)
      console.log(newdoctor);
      newdoctor.licenseNumber = req.body.licenseNumber
      newdoctor.specialization = req.body.specialization
      newdoctor.experience = req.body.experience
      newdoctor.fee  = req.body.fee
      newdoctor.timings = req.body.timings
      newdoctor.hasApplied = true
      await newdoctor.save();
      console.log("newdoctor");
      const adminUser = await User.findOne({ isAdmin: true });
      if (adminUser) {
        console.log(adminUser);
        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
          type: "new-doctor-request",
          message: `${newdoctor.name}  has applied for a doctor account`,
          data: {
            doctorId: newdoctor._id,
            name: newdoctor.name,
          },
          onClickPath: "/admin/doctors",
        });
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        console.log("working");
        res.status(200).send({
          success: true,
          message: "Doctor account applied successfully",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  };

 


  module.exports = {doctorRegister,doctorLogin,getDoctorInfoById,applyDoctor}