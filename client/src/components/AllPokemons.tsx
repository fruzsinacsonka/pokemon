import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

export function InputDemo() {
  return <Input type="email" placeholder="Email" />;
}

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AllPokemons() {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [searchByName, setSearchByName] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
  //   const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pokemons");
        const allTypes = response.data.map((pokemon: any) => pokemon.type);
        setTypes([...new Set(allTypes)] as string[]);
        console.log(allTypes);
      } catch (error) {
        console.error("Error fetching Pokémon types", error);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pokemons");
        setPokemons(response.data);
        setFilteredPokemons(response.data); // Initially, show all Pokémon
      } catch (error) {
        console.error("Error fetching Pokémon", error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value);
  };

  const filterPokemons = () => {
    let filtered = [...pokemons];

    if (searchByName) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchByName.toLowerCase())
      );
      setSelectedType("");
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      );
      setSearchByName("");
    }

    setFilteredPokemons(filtered);
  };

  const handlePokemonSelect = (pokemon: any) => {
    navigate(`/pokemon/${pokemon.id}`);
  };
  useEffect(() => {
    filterPokemons();
  }, [selectedType, searchByName]);

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="name">Search by Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Search Pokemon by name"
          value={searchByName}
          onChange={handleSearchChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <Button onClick={filterPokemons}>Search</Button>{" "}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="px-4 py-2 border">Select Pokemon Type</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {types.map((type, index) => (
            <DropdownMenuItem key={index} onClick={() => setSelectedType(type)}>
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon: any) => (
            <div
              key={pokemon.id}
              className="pokemon-card p-4 border mb-2"
              onClick={() => handlePokemonSelect(pokemon)}
            >
              <h3 className="font-bold">{pokemon.name}</h3>
              {/* <p>{pokemon.weight}</p>
              <p>Abilities:</p>
              <ul>
                {pokemon.abilities.map((ability: string, index: number) => (
                  <li key={index}>{ability}</li>
                ))}
              </ul> */}
            </div>
          ))
        ) : (
          <p>No Pokémon found for this search.</p>
        )}
      </div>
    </div>
  );
}

export default AllPokemons;
