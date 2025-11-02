const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { responseFailure, responseSuccess } = require("../common/responses");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    return responseSuccess(res, user)
  } catch (err) {
    return responseFailure(res, err.toString())
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return responseFailure(res, "Invalid Credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return responseSuccess(res, {token,user });
  } catch (err) {
    return responseFailure(res, err.message.toString());
  }
};
