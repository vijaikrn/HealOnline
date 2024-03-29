const User = require("../models/userModel");

const Doctor = require("../models/doctorModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "user already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error creating user", success: false, error });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "invalid password", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "user logged in successfully",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "error loggin in", success: false, error });
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    user.password = undefined;
    if (!user) {
      res.status(200).send({ message: "user does not exist", success: false });
    } else {
      res.status(200).send({
        message: "user info",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting user info", success: false, error });
  }
};



const seenNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications are marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const deleteNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfoById,
  
  seenNotifications,
  deleteNotifications,
};
