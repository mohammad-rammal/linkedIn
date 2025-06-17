const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    fullName: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    currentCompany: {
      type: String,
      default: "",
    },
    currentLocation: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    coverPicture: {
      type: String,
      default:
        "https://st3.depositphotos.com/5918238/18694/i/450/depositphotos_186942178-stock-photo-grunge-scratched-blue-background-illustration.jpg",
    },
    about: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: [
      {
        designation: {
          type: String,
        },
        companyName: {
          type: String,
        },
        duration: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    pendingFriends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
