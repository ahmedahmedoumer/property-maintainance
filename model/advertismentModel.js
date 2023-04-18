const mongoose = require("mongoose");

const Joi = require("joi");

const AdvertismentSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  imagePath: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

const Advertisment = mongoose.model("Advertisment", AdvertismentSchema);

const validateAdvertisment = (Advertisment) => {
  const validationSchema = Joi.object({
    title: Joi.string().min(2).max(40).required(),
    imagePath: Joi.string().min(2).required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    date: Joi.date().required(),
  });
  return validationSchema.validate(Advertisment);
};

exports.Advertisment = Advertisment;
exports.validateAdvertisment = validateAdvertisment;
