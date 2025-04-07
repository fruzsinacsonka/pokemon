const express = require("express");
const { Ability } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  //   try {
  //     await Comments.create({
  //       desc: req.body.desc,
  //     });
  //     res.status(200).json("Comment has been created!");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json("Something went wrong!");
  //   }
});

module.exports = router;
