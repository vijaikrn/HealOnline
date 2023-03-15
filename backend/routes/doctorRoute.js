const express = require("express");

const doctorController = require("../controllers/doctorController");
const authMiddlewareDoctor = require("../middlewares/authMiddlewareDoctor");
const router = express.Router();

router.post("/register", doctorController.doctorRegister);

router.post("/login", doctorController.doctorLogin);

router.post("/get-doctor-info-by-id",authMiddlewareDoctor,doctorController.getDoctorInfoById,)

router.post(
    "/apply-doctor-account",
    authMiddlewareDoctor,
    doctorController.applyDoctor
  );


module.exports = router;
