const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

router.get("/reviews", ReviewController.getAllReviews);
router.get("/reviews/:id", ReviewController.getReviewById);
router.get("/reviews/car/:carId", ReviewController.getAllReviewsByCar);
router.get(
  "/reviews/reservation/:reservationId",
  ReviewController.getReviewByReservation
);
router.post("/reviews", ReviewController.createReview);

module.exports = router;
