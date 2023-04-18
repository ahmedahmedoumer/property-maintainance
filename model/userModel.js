const { default: mongoose } = require("mongoose");

const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});

const Users = mongoose.model("User", userSchema);

const validateUser = (User) => {
  const validationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePicture: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return validationSchema.validate(User);
};

exports.Users = Users;
exports.validateUser = validateUser;
