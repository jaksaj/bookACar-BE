const Review = require("../models/review");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  try {
    const user = req.userId;
    const { text, rating, car, reservation } = req.body;
    const newReview = new Review({ text, rating, car, user, reservation });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReviewsByCar = async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.carId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewByReservation = async (req, res) => {
  try {
    const review = await Review.findOne({
      reservation: req.params.reservationId,
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const { title, content, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { title, content, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllReviews,
  getAllReviewsByCar,
  getReviewByReservation,
  createReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
