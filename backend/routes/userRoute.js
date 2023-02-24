const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post(
  "/get-userinfo-by-id",
  authMiddleware,
  userController.getUserInfoById
);

module.exports = router;
