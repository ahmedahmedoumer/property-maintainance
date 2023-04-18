const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getUsers);
router.get("/users/:id",userController.getUser)
router.post("/users/add", userController.addUser);
router.patch("/users/:id", userController.editUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;