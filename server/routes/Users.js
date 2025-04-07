const express = require("express");
const { Users } = require("../models");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  //   try {
  //     // const postbyUser = await Posts.findAll({
  //     //   where: { userId: userId },
  //     //   include: ["likes", "comments"],
  //     //   order: [["createdAt", "DESC"]],
  //     });

  //     // res.status(200).json(postbyUser);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json("Something went wrong!");
  //   }
});

module.exports = router;
