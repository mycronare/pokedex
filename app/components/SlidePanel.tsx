"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonListItem = {
  id: number;
  name: string;
  types: PokemonType[];
};

interface Props {
  isOpen: boolean;
  pokemonList: PokemonListItem[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function SlidePanel({
  isOpen,
  pokemonList,
  currentIndex,
  setCurrentIndex,
}: Props) {
  if (!pokemonList.length) return null;

  const typeWeaknesses = {
    normal: ["rock", "steel", "fighting"],
    fighting: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
    flying: ["rock", "steel", "electric"],
    poison: ["poison", "ground", "rock", "ghost", "steel"],
    ground: ["flying", "bug", "grass"],
    rock: ["fighting", "ground", "steel"],
    bug: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
    ghost: ["normal", "dark", "ghost"],
    steel: ["steel", "fire", "water", "electric"],
    fire: ["rock", "fire", "water", "dragon"],
    water: ["water", "grass", "dragon"],
    grass: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    electric: ["ground", "grass", "electric", "dragon"],
    psychic: ["steel", "psychic", "dark"],
    ice: ["steel", "fire", "water", "ice"],
    dragon: ["steel", "fairy"],
    dark: ["fighting", "dark", "fairy"],
    fairy: ["poison", "steel", "fire"],
  };

  const current = pokemonList[currentIndex];
  const prev =
    pokemonList[(currentIndex - 1 + pokemonList.length) % pokemonList.length];
  const next = pokemonList[(currentIndex + 1) % pokemonList.length];

  const paddedId = String(current.id).padStart(3, "0");

  const imageUrl = (id: number) =>
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(
      id
    ).padStart(3, "0")}.png`;

  const [currentDesc, setCurrentDesc] = useState<string>("Loading...");
  const [descCache, setDescCache] = useState<Record<string, string>>({});

  async function fetchDescription(name: string) {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}/`
      );
      if (!res.ok) throw new Error("failed to fetch description");

      const data = await res.json();

      const englishEntry = data.flavor_text_entries.find(
        (entry: { language: { name: string } }) =>
          entry.language.name === "en"
      );

      return englishEntry
        ? englishEntry.flavor_text.replace(/\n|\f/g, " ")
        : "No description available.";
    } catch (err) {
      console.error(err);
      return "No description available.";
    }
  }

  const goNext = () =>
    setCurrentIndex((currentIndex + 1) % pokemonList.length);

  const goPrev = () =>
    setCurrentIndex(
      (currentIndex - 1 + pokemonList.length) % pokemonList.length
    );

  const total = pokemonList.length;
  const windowSize = 10;

  let start = Math.max(currentIndex - 2, 0);
  let end = Math.min(start + windowSize, total);
  start = Math.max(end - windowSize, 0);

  const visibleDots = pokemonList.slice(start, end);

  useEffect(() => {
    if (!current) return;

    const name = current.name;

    if (descCache[name]) {
      setCurrentDesc(descCache[name]);
      return;
    }

    setCurrentDesc("Loading...");

    fetchDescription(name).then((desc) => {
      setDescCache((prev) => ({ ...prev, [name]: desc }));
      setCurrentDesc(desc);
    });
  }, [current, descCache]);

  const weaknesses = Array.from(
    new Set(
      current.types.flatMap(
        (type) =>
          typeWeaknesses[
            type.type.name.toLowerCase() as keyof typeof typeWeaknesses
          ] || []
      )
    )
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 h-full w-[1100px] bg-[#FCE4D8] z-40 p-8 overflow-hidden flex flex-col items-center"
        >
          <div className="flex mt-10 justify-between w-160">
            <h2 className="text-7xl font-bold text-my-green">
              #{paddedId} /
            </h2>
            <h1 className="text-7xl font-bold text-my-pink capitalize">
              {current.name}
            </h1>
          </div>

          {/* Carousel */}
          <div className="flex items-center justify-center gap-6 flex-1">
            <div className="opacity-40 scale-75">
              <img src={imageUrl(prev.id)} className="w-40 object-contain" />
            </div>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-pokedex-gradient border-white border-8 rounded-3xl p-8 shadow-xl w-[380px]"
            >
              {/* Types */}
              <div className="flex justify-between">
                <span className="text-2xl font-bold text-my-pink">Types:</span>
                <div className="flex gap-2 flex-wrap justify-end">
                  {current.types.map((type) => (
                    <span
                      key={type.type.name}
                      style={{
                        backgroundColor: `var(--${type.type.name})`,
                      }}
                      className="px-3 py-1 rounded-full capitalize text-xl text-white"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={imageUrl(current.id)}
                  className="w-48 object-contain"
                />
              </div>

              <p className="text-md mb-4">
                {currentDesc || "No description available."}
              </p>

              {/* Weaknesses */}
              <span className="text-2xl font-bold text-my-pink">
                Weaknesses:
              </span>

              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {weaknesses.map((weakness) => (
                  <span
                    key={weakness}
                    style={{
                      backgroundColor: `var(--${weakness})`,
                    }}
                    className="px-3 py-1 rounded-full capitalize text-md text-white"
                  >
                    {weakness}
                  </span>
                ))}
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/pokemon/${current.id}`}
                  scroll={false}
                  className="cursor-pointer text-my-pink underline text-xl"
                >
                  View Details
                </Link>
              </div>
            </motion.div>

            <div className="opacity-40 scale-75">
              <img src={imageUrl(next.id)} className="w-40 object-contain" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6 text-my-pink text-8xl">
            <button onClick={goPrev}>‹</button>

            <div className="flex gap-5 bg-[#fff2d0] p-4 rounded-3xl">
              {visibleDots.map((_, i) => {
                const index = start + i;
                return (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex
                        ? "bg-[#fbd87f]"
                        : "bg-[#fbd87f]/50"
                    }`}
                  />
                );
              })}
            </div>

            <button onClick={goNext}>›</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

