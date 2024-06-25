const express = require("express");
const router = express.Router();
const CarController = require("../controllers/carController");

router.get("/cars", CarController.getAllCars);
router.get("/cars/owner", CarController.getCarsByOwner);
router.get("/cars/:id", CarController.getCarById);
router.post("/cars", CarController.createCar);
router.put("/cars/:id", CarController.updateCar);
router.delete("/cars/:id", CarController.deleteCar);

module.exports = router;
