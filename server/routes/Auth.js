const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const existingUser = await Users.findOne({
        where: { username: req.body.username },
      });
      if (existingUser) {
        return res.status(409).json("User already exists!");
      }

      //create a new user
      //hash the pw
      const salt = bcrypt.genSaltSync(10);
      const hashedPw = bcrypt.hashSync(req.body.password, salt);

      const newUser = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPw,
        name: req.body.name,
      });

      res.status(201).json("User has been created!", newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json("Something went wrong!");
    }
  }
);

router.post("/login", async (req, res) => {
  //check if user already exist
  //correct pw or not
  const existingUser = await Users.findOne({
    where: { username: req.body.username },
  });

  if (!existingUser) {
    return res.status(404).json("User not found");
  }

  const checkedPassword = bcrypt.compareSync(
    req.body.password,
    existingUser.password
  );
  if (!checkedPassword) {
    return res.status(401).json("Invalid password");
  }

  const token = jwt.sign(
    { id: existingUser.id, username: existingUser.username },
    "secretkey",
    {
      expiresIn: "1h",
    }
  );

  const { password, ...userData } = existingUser.toJSON(); //existingUser minden adata , kivéve a pwt
  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(userData);
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
});
module.exports = router;
