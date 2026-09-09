const express = require("express");
const router = express.Router();
const passport = require("passport");

const { User } = require("../Models");

const sanitizeUser = (user) => {
  if (!user) {
    return {};
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

// -------- User Register Routes -------- //

router.post("/register", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then((user) => {
      res.status(201).json(
        sanitizeUser(user)
      );
    })
    .catch((error) => {
      console.error(
        "Error al registrar usuario:",
        error.message
      );

      res.sendStatus(400);
    });
});

// -------- Facebook Authentication -------- //

router.get(
  "/auth/facebook",
  passport.authenticate(
    "facebook",
    {
      scope: ["email"],
    }
  )
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate(
    "facebook",
    {
      failureRedirect:
        `${process.env.FRONTEND_URL}/login`,
    }
  ),
  (req, res) => {
    res.redirect(
      `${process.env.FRONTEND_URL}/products`
    );
  }
);

// -------- User Login Route -------- //

router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json(
      sanitizeUser(req.user)
    );
  }
);

// -------- User Logout Route -------- //

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
  }

  res.sendStatus(200);
});

// -------- Current User Route -------- //

router.get("/me", (req, res) => {
  res.json(
    sanitizeUser(req.user)
  );
});

module.exports = router;
