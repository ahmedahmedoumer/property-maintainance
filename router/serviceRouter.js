const express = require("express");
const router = express.Router();
const cors = require('cors');
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200
};

const serviceController = require("../controller/serviceController");

router.get("/service", serviceController.getServices);
router.get("/service/:id",serviceController.getService)
router.post("/service/add", (serviceController.addService));
router.patch("/service/:id", serviceController.editService);
router.delete("/service/:id", serviceController.deleteService);

module.exports = router;
