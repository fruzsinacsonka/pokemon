const express = require("express");
const { Users, Pokemons } = require("../models");
const router = express.Router();
router.get("/", async (req, res) => {
  //   try {
  //     const pokemons = await Pokemons.findAll({
  //       include: [
  //         {
  //           model: Users,
  //           as: "user", // A kapcsolódó felhasználóhoz tartozó adatokat is hozunk
  //           attributes: ["id", "username"], // Csak az alap adatokat kérjük le
  //         },
  //       ],
  //     });
  //     res.status(200).json(pokemons);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Something went wrong" });
  //   }
});

module.exports = router;
