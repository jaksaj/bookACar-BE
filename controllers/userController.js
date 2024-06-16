const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, address, phoneNumber,canList } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName, lastName, address, phoneNumber,canList,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    if (await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ userId: user._id }, "your-secret-key", { // TODO - replace with process.env.JWT_SECRET or something similar
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login successful", token });
    }
      return res.status(401).json({ error: "Invalid password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
