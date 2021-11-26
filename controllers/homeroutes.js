const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username", "twitter", "github"],
          },
        },
        {
          model: User,
          attributes: ["username", "twitter", "github"],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No data found" });
    }

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.status(200).render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username", "twitter", "github"],
          },
        },
        {
          model: User,
          attributes: ["username", "twitter", "github"],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // serialize the data
    const post = dbPostData.get({ plain: true });

    // pass data to template
    res.render("single-post", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;