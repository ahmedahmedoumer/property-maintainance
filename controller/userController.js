const { Users, validateUser } = require("../model/userModel");

const getUsers = async (req, res) => {
  const findAllUsers = await Users.find({});
    console.log(findAllUsers);
  if (findAllUsers.length)
    return res.json({users: findAllUsers});
  else res.status(404).send("No users found");
};

const getUser = async (req, res) =>{
    console.log(req.params.id);
  const findUser = await Users.find({_id: req.params.id});
  if (findUser) return res.json({user: findUser});
  else res.status(404).send("No User found");
}

const addUser = async (req, res) => {
  const { firstName, lastName, profilePicture, email, password } = req.body;
  const { error } = validateUser(req.body);
  if (error) return res.status(401).json({error: "Error in your input"});
  const findUser = await Users.find({ UserCategory, UserType });
  if (!findUser.length) {
    const newUser = new Users({
      UserCategory,
      UserPrice,
      UserType,
      UserMaterials,
    });
    const saveUser = await newUser.save();
    if (!saveUser) return res.status(401).json({error: "Adding User Failed"});
    else return res.json({success: "User added"});
  } else {
    return res.status(401).json({error: "User already exists"});
  }
};

const editUser = async (req, res) => {
  const { UserCategory, UserPrice, UserType, UserMaterial } = req.body;
  const { id } = req.params;
  const findUser = await User.findByIdAndUpdate(id, {
    UserCategory,
    UserPrice,
    UserType,
    UserMaterial,
  });
  if (findUser) {
    return res.json({success: "Succesfully updated"});
  } else {
    return res.status(401).json({error: "Updating was not successfull"});
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const findUser = await User.findByIdAndDelete(id);
  if (findUser) {
    return res.json({success: "Deleted succesfully"});
  } else {
    return res.json({error: "Deleting was not succesfull"});
  }
};

module.exports = { addUser, editUser, deleteUser, getUser, getUsers};
