const User = require("../models/user");
const Notification = require("../models/notification");

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

/****************************************
 * @desc     Find User (Search)
 * @route    GET /api/user/findUser
 * @access   Private
 ****************************************/
exports.findUser = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [
            { name: { $regex: new RegExp(`^${query}`, "i") } },
            { email: { $regex: new RegExp(`^${query}`, "i") } },
          ],
        },
      ],
    });

    res.status(201).json({
      message: "fetched member",
      user: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Send Friend Request
 * @route    POST /api/user/sendFriendRequest
 * @access   Private
 ****************************************/
exports.sendFriendRequest = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiver } = req.body;

    const userExist = await User.findById(receiver);
    if (!userExist) {
      return res.status(400).json({ error: "User not found!" });
    }
    const index = req.user.friends.findIndex((id) => id.equals(receiver));
    if (index !== -1) {
      return res.status(400).json({
        error: "Already friend",
      });
    }

    const lastIndex = userExist.pendingFriends.findIndex((id) =>
      id.equals(req.user._id)
    );
    if (lastIndex !== -1) {
      return res.status(400).json({
        error: "Already sent request",
      });
    }

    userExist.pendingFriends.push(sender);
    let content = `${req.user.fullName} has send you friend request.`;

    const notification = new Notification({
      sender,
      receiver,
      content,
      type: "friendRequest",
    });

    await notification.save();
    await userExist.save();

    res.status(200).json({
      message: "Friend request sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Accept Friend Request
 * @route    POST /api/user/sendFriendRequest
 * @access   Private
 ****************************************/
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const selfId = req.user._id;
    console.log(friendId);

    const friendData = await User.findById(friendId);
    if (!friendData) {
      return res.status(400).json({ error: "User not found!" });
    }

    const index = req.user.pendingFriends.findIndex((id) =>
      id.equals(friendId)
    );
    if (index !== -1) {
      req.user.pendingFriends.splice(index, 1);
    } else {
      return res.status(400).json({
        error: "No request from this such user!",
      });
    }

    req.user.friends.push(friendId);

    friendData.friends.push(req.user._id);

    let content = `${req.user.fullName} has accepted your friend request.`;

    const notification = new Notification({
      sender: req.user._id,
      receiver: friendId,
      content,
      type: "friendRequest",
    });

    await notification.save();
    await friendData.save();
    await req.user.save();

    res.status(200).json({
      message: "You both are connected now",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Friends List
 * @route    GET /api/user/getFriendsList
 * @access   Private
 ****************************************/
exports.getFriendsList = async (req, res) => {
  try {
    const friendsList = await req.user.populate("friends");
    return res.status(200).json({
      friends: friendsList.friends,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Pending Friends List
 * @route    GET /api/user/getPendingFriendsList
 * @access   Private
 ****************************************/
exports.getPendingFriendsList = async (req, res) => {
  try {
    const pendingFriendsList = await req.user.populate("pendingFriends");
    return res.status(200).json({
      pendingFriends: pendingFriendsList.pendingFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Remove From Friend List
 * @route    DELETE /api/user/removeFromFriend
 * @access   Private
 ****************************************/
exports.removeFromFriend = async (req, res) => {
  try {
    const selfId = req.user._id;
    const { friendId } = req.params;

    const friendData = await User.findById(friendId);
    if (!friendData) {
      return res.status(400).json({ error: "User not found!" });
    }

    const index = req.user.friends.findIndex((id) => id.equals(friendId));
    const friendIndex = friendData.friends.findIndex((id) => id.equals(selfId));

    if (index !== -1) {
      req.user.friends.splice(index, 1);
    } else {
      return res.status(400).json({
        error: "No request from such user!",
      });
    }

    if (friendIndex !== -1) {
      friendData.friends.splice(friendIndex, 1);
    } else {
      return res.status(400).json({
        error: "No request from such user!",
      });
    }

    await req.user.save();
    await friendData.save();

    return res.status(200).json({
      message: "You both are disconnected now",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
