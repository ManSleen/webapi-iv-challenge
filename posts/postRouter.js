const router = require("express").Router();

const Posts = require("../posts/postDb");

//GET all posts
router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get all posts" });
    });
});

//POST/ADD new post for given user ID
router.post("/:id/posts", validatePost, (req, res) => {
  const postInfo = req.body;
  postInfo.user_id = req.params.id;
  console.log(postInfo);
  Posts.insert(postInfo)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding a post for that user" });
    });
});

//GET post by its ID
router.get("/:id", validatePostId, (req, res) => {
  const postId = req.params.id;
  Posts.getById(postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get post by ID" });
    });
});

//DELETE post using its ID, return deleted post
router.delete("/:id", validatePostId, (req, res) => {
  const postId = req.params.id;
  let foundPost;

  Posts.getById(postId)
    .then(post => {
      foundPost = post;
      Posts.remove(postId)
        .then(post => {
          console.log(post);
          res.status(200).json(foundPost);
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: "Could not delete post using that ID" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Things went wrong!" });
    });
});

//PUT/UPDATE post using its ID and supplying changes in body
router.put("/:id", validatePostId, validatePost, (req, res) => {
  const postId = req.params.id;
  const changes = req.body;
  Posts.update(postId, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "You got problems yo" });
    });
});

// custom middleware

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res
      .status(400)
      .json({ message: "Missing post data, could not add post to db" });
  } else if (!req.body.hasOwnProperty("text")) {
    res.status(400).json({
      message: "Missing required text field, could not add post to db"
    });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  const postId = req.params.id;
  Posts.getById(postId)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Invalid Post ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error validating post ID" });
    });
}

module.exports = router;
