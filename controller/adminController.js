const { Admin, validateAdmin } = require("../model/adminModel");

const getAdmin = async (req, res) => {
  const findAllAdmin = await Admin.find({});

  if (findAllAdmin.length) return res.send(findAllAdmin);
  else return res.send("Did not get shit");
};

const addAdmin = async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;

  const { error } = validateAdmin(req.body);
  if (error) return res.status(401).send("Could Not add Admin");

  const findAdmin = await Admin.find({ phoneNumber });
  if (findAdmin.length) return res.status(401).send("User already exists");
  const newAdmin = new Admin({
    firstName,
    lastName,
    phoneNumber,
    email,
  });
  const saveAdmin = await newAdmin.save();
  if (saveAdmin) return res.send("Hurray");
  else return res.send("teysh");
};

module.exports = { getAdmin, addAdmin };
