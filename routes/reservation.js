const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/reservationController");

router.get("/reservations", ReservationController.getAllReservations);
router.get("/reservations/:id", ReservationController.getReservationById);
router.get(
  "/reservations/user/:userId",
  ReservationController.getAllReservationsByUser
);
router.get(
  "/reservations/car/:carId",
  ReservationController.getAllReservationsByCar
);
router.post("/reservations", ReservationController.createReservation);
router.put("/reservations/:id", ReservationController.updateReservation);
router.delete("/reservations/:id", ReservationController.deleteReservation);

module.exports = router;
