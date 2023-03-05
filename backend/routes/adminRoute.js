const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-doctors", authMiddleware, adminController.getDoctors);

router.get("/get-all-users", authMiddleware, adminController.getUsers);

router.post(
    "/change-doctor-account-status",
    authMiddleware,
    adminController.doctorStatus
  );
module.exports = router;
