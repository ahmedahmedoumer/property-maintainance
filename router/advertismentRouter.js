const express = require("express");

const router = express.Router();

const advertismentController = require("../controller/advertismentController");

router.get("/advertisment", advertismentController.getAllAdvertisments);
router.post("/advertisment/add", advertismentController.addAdvertisment);
router.patch("/advertisment/:id",advertismentController.changeStatus);
router.delete("/advertisment/:id",advertismentController.deleteAdvertisment);
router.post("/advertisment/upload-image", advertismentController.uploadImage.single('imagePath'), advertismentController.uploadAdvertismentImage);

module.exports = router;
