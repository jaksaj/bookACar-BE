const Car = require("../models/car");
const Reservation = require("../models/reservation");

const carController = {
  getAllCars: async (req, res) => {
    try {
      const cars = await Car.find({ owner: { $ne: req.userId } });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCarsByOwner: async (req, res) => {
    try {
      const cars = await Car.find({ owner: req.userId });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCarById: async (req, res) => {
    try {
      carId = req.params.id;
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createCar: async (req, res) => {
    try {
      const {
        make,
        model,
        year,
        pricePerDay,
        isAvailable,
        seatCapacity,
        fuelType,
      } = req.body;
      userId = req.userId;
      const car = new Car({
        make,
        model,
        year,
        pricePerDay,
        isAvailable,
        seatCapacity,
        fuelType,
        owner: userId,
      });
      await car.save();
      res.status(201).json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateCar: async (req, res) => {
    try {
      const {
        make,
        model,
        year,
        owner,
        pricePerDay,
        isAvailable,
        seatCapacity,
        fuelType,
      } = req.body;
      const car = await Car.findByIdAndUpdate(
        req.params.id,
        {
          make,
          model,
          year,
          owner,
          pricePerDay,
          isAvailable,
          seatCapacity,
          fuelType,
        },
        { new: true }
      );
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      if (car.owner.toHexString() !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await Reservation.deleteMany({ car: req.params.id });
      await Car.findByIdAndDelete(req.params.id);
      res.json({ message: "Car deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = carController;
