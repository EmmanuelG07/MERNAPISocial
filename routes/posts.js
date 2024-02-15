const Post = require("../models/Post");
const router = require("express").Router();

const upload = require("../middleware/uploads");

//add post

router.post("/addpost", upload.single("imageUrl"), async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      newPost.imageUrl = req.file.filename;
    }
    await newPost.save();
    res.status(200).json({ status: true, message: "Post added successfully!" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

//update post

router.put("/update/:id", async (req, res) => {
  try {
    const updatePost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (updatePost) {
      res.status(200).json({
        status: true,
        message: "Post data upadated successfully!",
      });
    } else {
      res.status(500).json({ status: false, message: "Post not updated!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete post

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await Post.findOne({ _id: req.params.id });
    if (user) {
      const deletePost = await Post.findByIdAndDelete({ _id: req.params.id });
      if (deletePost) {
        res.status(200).json({ status: true, message: "Post deleted" });
      }
    } else {
      res
        .status(200)
        .json({ status: false, message: "Post not found with this id" });
    }
  } catch (err) {
    res.status(200).json(err);
  }
});

// get post details by id

router.get("/getPostById/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    post &&
      res.status(200).json({
        status: true,
        message: "Post fatched succesfully",
        data: post,
      });
    !post &&
      res.status(200).json({
        status: false,
        message: "Post by this id not found",
      });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: "Post by this id not found",
    });
  }
});

// get all post

router.get("/allPost", (req, res) => {
  Post.find().then((posts) => {
    try {
      res.status(200).json({
        status: true,
        message: "Posts fatched succesfully",
        data: posts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

// get all Post of any user

router.get("/particularPost/:id", (req, res) => {
  try {
    Post.find({ userId: req.params.id }).then((posts) => {
      try {
        res.status(200).json({
          status: true,
          message: "Posts fatched succesfully",
          data: posts,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//like post

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    let isLiked = false;
    post.likes.map((item) => {
      if (item == req.body.userId) {
        isLiked = true;
      }
    });
    if (isLiked) {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );

      res
        .status(200)
        .json({ status: true, message: "like Added successfully" });
    } else {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );

      res
        .status(200)
        .json({ status: true, message: "like removed successfully" });
    }
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
