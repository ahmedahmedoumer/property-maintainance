const mongoose = require("mongoose");

const Joi = require("joi");

const AdminSchema = new mongoose.Schema({
  displayName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    min: 6,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

const validateAdmin = (Admin) => {
  const validationSchema = Joi.object({
    displayName: Joi.string().min(2).max(40),
    // phoneNumber: Joi.string()
    //   .length(10)
    //   .pattern(/^[0-9]+$/)
    //   .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().password(),
  });
  return validationSchema.validate(Admin);
};

exports.Admin = Admin;
exports.validateAdmin = validateAdmin;
