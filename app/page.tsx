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


  type SortOption =
  | "id-asc"
  | "id-desc"
  | "name-asc"
  | "name-desc";

  const [sortOption, setSortOption] = useState<SortOption>("id-asc");



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

  const filteredPokemon = pokemon
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      selectedType
        ? p.types.some((t: any) => t.type.name === selectedType)
        : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <main className="relative min-h-screen overflow-hidden pl-50 pr-140">
      <div className="absolute top-0 right-0 h-full w-50 bg-my-peach"></div>
      <div className="py-10 max-w-9xl">
        <div className={`flex flex-col md:flex-row gap-4 mb-8 items-start justify-between ${isOpen ? "pr-140" : "pr-0"}`}>

          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-2xl px-4 py-2 rounded-full border border-my-pink border-3 focus:outline-none focus:ring-2 focus:ring-my-green w-full md:w-72"
          />


          <div className="flex gap-3">

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-full border-3 border-my-pink bg-my-pink text-2xl text-white focus:outline-none focus:ring-2 focus:ring-my-green"
            >
              <option value="">All Types</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="poison">Poison</option>
              <option value="flying">Flying</option>
              <option value="bug">Bug</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as SortOption)
              }
              className="px-4 py-2 rounded-full border-3 border-my-pink bg-my-pink text-2xl text-white focus:outline-none focus:ring-2 focus:ring-my-green"
            >
              <option value="id-asc">ID ↑</option>
              <option value="id-desc">ID ↓</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>

          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredPokemon.map((p, index) => (
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

        <div className="flex justify-start mt-10 mb-20">
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
        pokemonList={filteredPokemon}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <PageTab isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </main>

  );
}
