const fileHelper = require("../util/file");

const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = (req, res, next) => {
  Post.find({})
    .populate("creator", "name")
    .then((posts) => {
      const postsWithAuthorName = posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          category: post.category,
          description: post.description,
          imageUrl: post.imageUrl,
          creatorId: post.creator._id,
          creatorName: post.creator.name,
          lat: post.lat,
          lng: post.lng,
          address: post.address,
          vote: post.vote,
          isVerified: post.isVerified,
          isSolved: post.isSolved,
        };
      });

      res.status(200).json({
        posts: postsWithAuthorName,
      });
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message:
        "Validation failed, title needs to be at least five letters long!",
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const address = req.body.address;

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;

  let creator;

  const post = new Post({
    title: title,
    category: category,
    description: description,
    imageUrl: imageUrl,
    lat: lat,
    lng: lng,
    address: address,
    creator: req.userId,
    vote: 0,
    isVerified: false,
    isSolved: false,
  });

  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
        creator: { id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post.findByIdAndDelete(postId)
    .then((result) => {
      fileHelper.deleteFile(result.imageUrl);
      return User.findById(req.userId);
    })
    .then((user) => {
      console.log(user);
      user.posts.pull(postId);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post successfully deleted!",
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const vote = req.body.vote;
  const isVerified = req.body.isVerified;
  const isSolved = req.body.isSolved;

  // console.log("Vote:", vote);
  // console.log("isVerified:", isVerified);
  // console.log("isSolved:", isSolved);

  Post.findById(postId)
    .then((post) => {
      post.vote = vote;
      post.isVerified = isVerified;
      post.isSolved = isSolved;
      return post.save();
    })
    .then(() => {
      res.status(201).json({
        message: "Post updated!",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
