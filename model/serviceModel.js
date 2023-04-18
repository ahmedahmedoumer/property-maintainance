const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  serviceCategory: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  servicePrice: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  serviceType: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  serviceMaterials: 
    {
      type: mongoose.Schema.Types.String,
      required: true,
    },
});

const Service = mongoose.model("Service", ServiceSchema);

const validateService = (Service) => {
  const validationSchema = Joi.object({
    serviceCategory: Joi.string().required(),
    servicePrice: Joi.number().required(),
    serviceType: Joi.string().required(),
    serviceMaterials: Joi.string().required(),
  });
  return validationSchema.validate(Service);
};

exports.Service = Service;
exports.validateService = validateService;
