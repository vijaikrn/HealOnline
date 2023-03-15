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



router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  userController.seenNotifications
);

router.post(
  "/delete-all-notifications",
  authMiddleware,
  userController.deleteNotifications
);
module.exports = router;
