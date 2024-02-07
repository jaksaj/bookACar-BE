const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type:String, required: true},
  address: { type:String, required: true},
  phoneNumber: { type:String, required: true},
  canList: {type:Boolean, required: true},
}); // TODO update schema

const User = mongoose.model("User", userSchema);

module.exports = User;
