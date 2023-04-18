const { Service, validateService } = require("../model/serviceModel");
const express = require("express");
const bodyParser = require('body-parser');
const app=express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const router = express.Router();
// const cors = require('cors');
// const corsOptions = {
//   origin: true,
//   optionsSuccessStatus: 200
// };


const getServices = async (req, res) => {
  const findallservice = await Service.find({});
  if (findallservice.length) return res.json({services: findallservice});
  else res.status(404).send("No services found");
};

const getService = async (req, res) =>{
  res.status(404).send("No service found");
  // const findService = await Service.find({_id: req.params.id});
  //  return   findService || "list of services";
  // if (findService) return res.json({service: findService});
  // else res.status(404).send("No service found");
}

const addService =async(req, res) => {
  const { serviceCategory, servicePrice, serviceType, serviceMaterials } = req.body;
  const { error } = validateService(req.body); 
  if (error){ return res.status(401).json({error: "validation error"});}

  const findService = await Service.find({ serviceCategory, serviceType });
  if (!findService.length) {
    const newService = new Service({
      serviceCategory,
      servicePrice,
      serviceType,
      serviceMaterials,
    });
    const saveService = await newService.save();

    if (!saveService) return res.status(401).json({error: "Adding Service Failed"});
    else return res.status(201).json({success: "Service added"});
  } else {
    return res.status(401).json({error: "Service already exists"});
  }
};

const editService = async (req, res) => {
  const { serviceCategory, servicePrice, serviceType, serviceMaterial } = req.body;
  const { id } = req.params;
  const findService = await Service.findByIdAndUpdate(id, {
    serviceCategory,
    servicePrice,
    serviceType,
    serviceMaterial,
  });
  if (findService) {
    return res.json({success: "Succesfully updated"});
  } else {
    return res.status(401).json({error: "Updating was not successfull"});
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const findService = await Service.findByIdAndDelete(id);
  if (findService) {
    return res.json({success: "Deleted succesfully"});
  } else {
    return res.json({error: "Deleting was not succesfull"});
  }
};

module.exports = { addService, editService, deleteService, getService,getServices};
