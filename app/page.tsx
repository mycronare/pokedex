"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import PageTab from "./components/PageTab";
import SlidePanel from "./components/SlidePanel";

export default function Home() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  cost [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    async function fetchPokemon() {

      setLoading(true);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
      );
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon((prev) => [...prev, ...detailed]);
      setLoading(false);
    }

    fetchPokemon();
  }, [offset]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="px-8 py-10">
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

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setOffset((prev) => prev + LIMIT)}
            className="px-6 py-2 bg-my-pink text-white text-3xl rounded-full hover:opacity-80 transition"
          >
            {loading ? "Loading.." : "Load more pokemon"}
          </button>
        </div>
      </div>

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
