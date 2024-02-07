const mongoose = require("mongoose");

const { Schema } = mongoose;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  seatCapacity: { type: Number, required: true },
  fuelType: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;