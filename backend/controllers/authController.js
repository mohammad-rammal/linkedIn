const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const cookieOptions = {
  httpOnly: true,
  secure: false, // set to true in production
  sameSite: "Lax", // set None in production
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/****************************************
 * @desc     Register User
 * @route    POST /api/auth/register
 * @access   Public
 ****************************************/
exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ error: "Already have an account with this email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      success: "yes",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Login User (Normal Way)
 * @route    POST /api/auth/login
 * @access   Public
 ****************************************/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const token = jwt.sign(
        { userId: userExist.id },
        process.env.JWT_PRIVATE_KEY
      );

      res.cookie("token", token, cookieOptions);

      return res.json({ message: "Logged in successfully" });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid credentials!", success: "yes", userExist });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Login User (Using Google)
 * @route    POST /api/auth/google
 * @access   Public
 ****************************************/
exports.loginThroughGmail = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      userExist = await User.create({
        googleId: sub,
        email,
        fullName: name,
        profilePicture: picture,
      });
    }

    const jwtToken = jwt.sign(
      { userId: userExist.id },
      process.env.JWT_PRIVATE_KEY
    );

    res.cookie("token", jwtToken, cookieOptions);

    return res.status(200).json({ user: userExist, data: userExist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Logout User
 * @route    POST /api/auth/logout
 * @access   Private
 ****************************************/
exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", cookieOptions)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
