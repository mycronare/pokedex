"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import PageTab from "./components/PageTab";
import SlidePanel from "./components/SlidePanel";

export default function Home() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [limit, setLimit] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon(detailed);
    }

    fetchPokemon();
  }, [limit]);

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* GRID */}
      <div className="px-8 py-10">
        <h1 className="text-5xl font-bold text-center mb-12">
          Pokédex
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {pokemon.map((p, index) => (
            <div
              key={p.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsOpen(true);
              }}
            >
              <PokemonCard pokemon={p} />
            </div>
          ))}
        </div>
      </div>

      {/* SLIDE PANEL */}
      <SlidePanel
        isOpen={isOpen}
        pokemonList={pokemon}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <PageTab isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </main>
  );
}
