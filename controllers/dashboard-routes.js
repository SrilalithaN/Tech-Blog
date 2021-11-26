const router = require("express").Router();

const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
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
    // serialize data before passing to template
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.status(200).render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
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

    res.render("edit-post", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/create/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
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
      res.status(404).json({ message: "No data found" });
      return;
    }
    // serialize data before passing to template
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("create-post", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
