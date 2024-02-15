const User = require("../models/User");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("heloo men user");
});

//Update

router.put("/update/:id", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (updateUser) {
      res.status(200).json({
        status: true,
        message: "User data upadated successfully!",
      });
    } else {
      res.status(500).json({ status: false, message: "User not updated!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
      if (deleteUser) {
        res.status(200).json({ status: true, message: "User deleted" });
      }
    } else {
      res
        .status(200)
        .json({ status: false, message: "User not found with this id" });
    }
  } catch (err) {
    res.status(200).json(err);
  }
});

//get All Users

router.get("/getAllUser", (req, res) => {
  User.find().then((users) => {
    try {
      res.status(200).json({
        status: true,
        message: "User fatched succesfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

//get users by Id

router.get("/getUserById/:id", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id });

    users &&
      res.status(200).json({
        status: true,
        message: "User fatched succesfully",
        data: users,
      });
    !users &&
      res.status(200).json({
        status: false,
        message: "User by this id not found",
      });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: "User by this id not found",
    });
  }
});

//follow

router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (isFollowed) {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: false, message: "User unfollowed Succussfully" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $push: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $push: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "followed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unfollowed

router.put("/unfollow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (!isFollowed) {
      res
        .status(200)
        .json({ status: false, message: "You are not following this user" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "Unfollowed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
