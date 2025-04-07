const express = require("express");
const { Users, Pokemons, Ability, HeldItem } = require("../models");
const router = express.Router();
const axios = require("axios");
const authenticate = require("../middleware/Authenticate");

router.get("/", async (req, res) => {
  const { type } = req.query;
  try {
    const pokemons = await Pokemons.findAll({
      where: type ? { type } : {},
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "username"],
        },
      ],
    });
    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
// Route to get a specific Pokémon by id
router.get("/:id", async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await Pokemons.findByPk(pokemonId, {
      include: [
        {
          model: Ability,
          as: "abilities",
          attributes: ["ability_name", "is_hidden", "slot"],
        },
        {
          model: HeldItem,
          as: "heldItems",
          attributes: ["item_name", "rarity"],
        },
      ],
    });

    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/catch/:pokemonId", authenticate, async (req, res) => {
  try {
    const pokemonId = req.params.pokemonId;

    const pokemon = await Pokemons.findByPk(pokemonId);
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }

    //already caught by the user
    if (pokemon.UserId === req.user.id) {
      return res
        .status(400)
        .json({ message: "You already caught this Pokémon" });
    }

    await pokemon.update({ UserId: req.user.id });

    res.status(200).json({ message: "Pokemon caught successfully", pokemon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/release/:pokemonId", authenticate, async (req, res) => {
  try {
    const pokemonId = req.params.pokemonId;

    // Find the Pokemon caught by the user
    const pokemon = await Pokemons.findOne({
      where: { id: pokemonId, UserId: req.user.id },
    });

    if (!pokemon) {
      return res
        .status(404)
        .json({ message: "You haven't caught this Pokémon" });
    }

    // Release the Pokémon (remove the association with the user)
    await pokemon.update({ UserId: null });

    res.status(200).json({ message: "Pokémon released successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// logged user, sort&order
router.get("/userPokemons", authenticate, async (req, res) => {
  try {
    const { sortBy = "name", order = "ASC", type, minExp } = req.query;
    const pokemons = await Pokemons.findAll({
      where: { UserId: req.user.id },
      // order: [["name", "ASC"]],
      order: [[sortBy, order.toUpperCase()]],
    });

    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

async function fetchAndInsertPokemon(pokemonName) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = response.data;

    // Insert into database
    const newPokemon = await Pokemons.create({
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      base_experience: pokemonData.base_experience,
      forms: pokemonData.forms.map((form) => form.name).join(", "),
      game_indices: pokemonData.game_indices
        .map((game) => game.game_index)
        .join(", "),
      type: pokemonData.types.map((type) => type.type.name).join(", "),
      abilities: pokemonData.abilities.map((ability) => ability.ability.name),
      cries: [pokemonData.cries.latest],
    });

    for (const abilityData of pokemonData.abilities) {
      await Ability.create({
        ability_name: abilityData.ability.name,
        is_hidden: abilityData.is_hidden,
        slot: abilityData.slot,
        pokemonId: newPokemon.id,
      });
    }
    const heldItems = pokemonData.held_items || [];
    for (const item of heldItems) {
      for (const versionDetail of item.version_details) {
        await HeldItem.create({
          item_name: item.item.name,
          rarity: versionDetail.rarity,
          version_name: versionDetail.version.name,
          pokemonId: newPokemon.id,
        });
      }
    }

    console.log(`${pokemonName} has been inserted into the database.`);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

fetchAndInsertPokemon("pikachu");

module.exports = router;
