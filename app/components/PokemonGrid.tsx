"use client";

import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

type PokemonListItem = {
  name: string;
  url: string;
};

export default function PokemonGrid() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const LIMIT = 20;

  const loadPokemon = async () => {
    setLoading(true);

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
    );
    const data = await res.json();

    setPokemon((prev) => [...prev, ...data.results]);
    setOffset((prev) => prev + LIMIT);
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center mt-6">
        <button
          onClick={loadPokemon}
          disabled={loading}
          className="px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-500 font-semibold"
        >
          {loading ? "Loading..." : "Load More Pokémon"}
        </button>
      </div>
    </div>
  );
}
