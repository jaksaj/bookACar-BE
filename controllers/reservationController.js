const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReservationsByCar = async (req, res) => {
  try {
    const reservations = await Reservation.find({ car: req.params.carId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReservation = async (req, res) => {
  const reservation = new Reservation({
    user: req.body.user,
    car: req.body.car,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    isPaid: req.body.isPaid,
    totalCost: req.body.totalCost,
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      reservation.user = req.body.user;
      reservation.car = req.body.car;
      reservation.fromDate = req.body.fromDate;
      reservation.toDate = req.body.toDate;
      reservation.isPaid = req.body.isPaid;
      reservation.totalCost = req.body.totalCost;
      //TODO see which fields are required and which are not
      const updatedReservation = await reservation.save();
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      await reservation.remove();
      res.json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  getAllReservationsByUser,
  getAllReservationsByCar,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
