const mongoose = require("mongoose");

const { Schema } = mongoose;

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  isPaid: { type: Boolean,required:true, default: false },
  totalCost: { type: Number, required: true }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;