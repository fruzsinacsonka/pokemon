import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PokemonProfile() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pokemons/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon details", error);
      }
    };
    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-profile">
      <h1>{pokemon.name}</h1>
      <img
        src={`http://localhost:3001/images/${pokemon.image}`}
        alt={pokemon.name}
      />
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>Abilities:</p>
      <ul>
        {pokemon.abilities.map((ability: any, index: number) => (
          <li key={index}>
            {ability.ability_name} (Slot: {ability.slot}, Hidden:{" "}
            {ability.is_hidden ? "Yes" : "No"})
          </li>
        ))}
      </ul>
      <p>Held Items:</p>
      <ul>
        {pokemon.heldItems.map((item: any, index: number) => (
          <li key={index}>
            {item.item_name} (Rarity: {item.rarity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonProfile;
