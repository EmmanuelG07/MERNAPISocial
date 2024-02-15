const User = require("../models/User");
const router = require("express").Router();

//register

router.post("/register", async (req, res) => {
  console.log(req.body, "register");
  try {
    const newUser = new User({
      username: req.body.username,
      emailId: req.body.emailId,
      mobile: req.body.mobile,
      password: req.body.password,
      gender: req.body.gender,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    !user &&
      res.status(200).json({ status: false, message: "User not found!" });

    if (user) {
      if (req.body.password == user.password) {
        res.status(200).json({
          status: true,
          message: "User Found succesfully",
          data: user,
        });
      } else {
        res.status(200).json({ status: false, message: "Wrong Password" });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    console.log(error);
  }
});

module.exports = router;
