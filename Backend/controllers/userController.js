const { responseBadRequest, responseSuccess, responseFailure } = require("../common/responses");
const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password) {
      return responseBadRequest(res, "Username or password is Missing.");
    }
    const role = "Logistics"

    // if (password) {
    //     password = await bcrypt.hash(password, 10);
    // }
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return responseBadRequest(res, "Username is already taken.");
    }

    const newUser = new User({ username, password, role, firstName, lastName });
    await newUser.save();

    return responseSuccess(res,{user: newUser},"User created successfully.");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Create a new user with the 'User' role
exports.createUserCustomer = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password) {
      return responseBadRequest(res, "Username or password is Missing.");
    }

    const role = "User"; // Set role to 'User' by default

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return responseBadRequest(res, "Username is already taken.");
    }

    const newUser = new User({ username, password, role, firstName, lastName });
    await newUser.save();

    return responseSuccess(res, { user: newUser }, "User created successfully.");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};


// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the response
    return responseSuccess(res, users);
  } catch (error) {
    return responseBadRequest(res, error.message.toString());
  }
};

// Read user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Exclude password from the response

    if (!user) {
      return responseFailure(res,"User not found.");
    }

    responseSuccess(res, user);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role, firstName, lastName } = req.body;

    const updateData = { username, role, firstName, lastName };

    // Hash the password if provided
    // if (password) {
    //   updateData.password = await bcrypt.hash(password, 10);
    // }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

    if (!updatedUser) {
      return responseFailure(res, "User not found." );
    }

    return responseSuccess(res, {user: updatedUser }, "User updated successfully.");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return responseFailure(res, "User not found.");
    }

    return responseSuccess(res, null, "User deleted successfully.");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Authenticate user
exports.authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return responseBadRequest(res, "Username and password are required.");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return responseBadRequest(res, "Invalid username or password.");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return responseBadRequest(res, "Invalid username or password.");
    }

    return responseSuccess(res,{user: { id: user._id, username: user.username, role: user.role }}, "Authentication successful.");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};
