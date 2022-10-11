const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/posts", isAuth, feedController.getPosts);

router.post(
  "/posts",
  isAuth,
  [
    body("title").trim().isLength({ min: 1 }),
    body("description").trim().isLength({ min: 1 }),
  ],
  feedController.createPost
);

router.delete("/post/:postId", isAuth, feedController.deletePost);

router.put("/post/:postId", feedController.updatePost);

module.exports = router;
