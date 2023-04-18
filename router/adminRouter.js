const express = require("express");

const router = express.Router();

const adminController = require("../controller/adminController");

router.get("/admin", adminController.getAdmin);
router.post("/admin/add", adminController.addAdmin);

const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");

//update Admin
router.put("/:id", async (req, res) => {
  if (req.body.adminId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const admin = await Admin.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete Admin
router.delete("/:id", async (req, res) => {
  if (req.body.AdminId === req.params.id || req.body.isAdmin) {
    try {
      await Admin.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a Admin
router.get("/", async (req, res) => {
  const AdminId = req.query.AdminId;
  const Adminname = req.query.Adminname;
  try {
    const Admin = AdminId
      ? await Admin.findById(AdminId)
      : await Admin.findOne({ Adminname: Adminname });
    const { password, updatedAt, ...other } = Admin._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:AdminId", async (req, res) => {
  try {
    const Admin = await Admin.findById(req.params.AdminId);
    const friends = await Promise.all(
      Admin.followings.map((friendId) => {
        return Admin.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, Adminname, profilePicture } = friend;
      friendList.push({ _id, Adminname, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
