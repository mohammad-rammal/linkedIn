const User = require("../models/user");

/****************************************
 * @desc     Update User
 * @route    PUT /api/user/update
 * @access   Private
 ****************************************/
exports.updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    const isExist = await User.findById(req.user._id);
    if (!isExist) {
      return res.status(400).json({ error: "User not found!" });
    }

    const updateData = await User.findByIdAndUpdate(isExist._id, user);

    const userData = await User.findById(req.user._id);

    res.status(200).json({
      message: "User updated successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Profile User
 * @route    GET /api/user/:id
 * @access   Public
 ****************************************/
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await User.findById(id);
    if (!isExist) {
      return res.status(400).json({ error: "User not found!" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: isExist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
