const Comment = require("../models/Comment");
const router = require("express").Router();

// add Comment

router.post("/addComment", async (req, res) => {
  try {
    const newComment = new Comment({
      comments: req.body.comments,
      userId: req.body.userId,
      postId: req.body.postId,
      username: req.body.username,
    });
    await newComment
      .save()
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "Comment added successfully" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete comment

router.delete("/deleteComment/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      Comment.findOneAndDelete({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ status: true, message: "Comment deleted successfully" });
        })
        .catch((err) => {
          res.status(200).json(err);
        });
    } else {
      res.status(200).json({ status: false, message: "Noo comment found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all comment by post

router.get("/allComment/:id", (req, res) => {
  try {
    Comment.find({ postId: req.params.id }).then((comments) => {
      try {
        res.status(200).json({
          status: true,
          message: "Comments fatched succesfully",
          data: comments,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update comment

router.put("/updateComment/:id", async (req, res) => {
  try {
    const updateComments = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (updateComments) {
      res.status(200).json({
        status: true,
        message: "Comment upadated successfully!",
      });
    } else {
      res.status(500).json({ status: false, message: "Comment not updated!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
