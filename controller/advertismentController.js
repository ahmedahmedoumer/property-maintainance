const { Advertisment, validateAdvertisment } = require("../model/advertismentModel");
const express = require("express");
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
    // mongoose = require('mongoose'),
    // router = express.Router();

const DIR = './public/';


const getAllAdvertisments = async (req, res) => {
  const findallAdvertisment = await Advertisment.find({}).sort({ date: -1 });
  if (findallAdvertisment.length) return res.json({advertisments: findallAdvertisment});
  else res.status(404).json({error: "No Advertisments found"});
};

const getAdvertisment = async (req, res) =>{
  const findAdvertisment = await Advertisment.find({_id: req.params.id});
  if (findAdvertisment) return res.json({advertisment: findAdvertisment});
  else res.status(404).send({error: "No Advertisment found"});
}

const addAdvertisment = async (req, res) => {
  const { title, imagePath, description, date, status } = req.body;
  const { error } = validateAdvertisment(req.body);
  if (error) return res.status(401).json({error: "Error in your input"});
  const findAdvertisment = await Advertisment.find({ title, imagePath, description });
  if (!findAdvertisment.length) {
    const newAdvertisment = new Advertisment({
        title, imagePath, description, date, status
    });
    const saveAdvertisment = await newAdvertisment.save();
    console.log(saveAdvertisment);
    if (!saveAdvertisment) return res.status(401).json({error: "Adding Advertisment Failed"});
    else return res.json({success: "Advertisment added", newId: saveAdvertisment._id});
  } else {
    return res.status(401).json({error: "Advertisment already exists"});
  }
};

const changeStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const findStatus = await Advertisment.findByIdAndUpdate(id, {
   status,
  });
  if (findStatus) {
    return res.json({success: "Succesfully updated"});
  } else {
    return res.status(401).json({error: "Updating was not successfull"});
  }
};

const deleteAdvertisment = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const findAdvertisment = await Advertisment.findByIdAndDelete(id);
  if (findAdvertisment) {
    return res.json({success: "Deleted succesfully"});
  } else {
    return res.json({error: "Deleting was not successfull"});
  }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const uploadAdvertismentImage = async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    res.json({ imagePath: url + '/static/' + req.file.filename })
};

module.exports = { addAdvertisment, changeStatus, getAdvertisment, deleteAdvertisment, getAllAdvertisments, uploadImage, uploadAdvertismentImage};
