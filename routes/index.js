const express = require("express");
const userRoutes = require("./user");
const carRoutes = require("./car");
const reservationRoutes = require("./reservation");
const reviewRoutes = require("./review");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

router.use("/api", (req, res, next) => {
  if (!req.originalUrl.includes("/api/users")) {
    authenticateToken(req, res, next);
  } else {
    next();
  }
});

router.use("/api", userRoutes);
router.use("/api", carRoutes);
router.use("/api", reservationRoutes);
router.use("/api", reviewRoutes);

module.exports = router;
