const router = require("express").Router();
const { Admin, validateAdmin } = require("../model/adminModel");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/auth/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new admin
    const newAdmin = new Admin({
      displayName: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save Admin and respond
    const admin = await newAdmin.save();
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/auth/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    !admin && res.status(404).json("Admin not found");

    const validPassword = await bcrypt.compare(req.body.password, admin.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(admin)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
