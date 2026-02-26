"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Pokemon = {
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export default function PokemonDetailsCard({ id }: { id: string }) {
  const router = useRouter();
  const [currentId, setCurrentId] = useState(Number(id));
  const [data, setData] = useState<Pokemon | null>(null);
  const [desc, setDesc] = useState("Loading...");

  const paddedId = String(currentId).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

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
    fairy: ["poison", "steel", "fire"]
  };

  useEffect(() => {
    async function fetchData() {
      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${currentId}`
      );
      const pokemon: Pokemon = await pokemonRes.json();
      setData(pokemon);

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${currentId}`
      );
      const species = await speciesRes.json();
      const entry = species.flavor_text_entries.find(
        (e: any) => e.language.name === "en"
      );
      setDesc(entry?.flavor_text.replace(/\n|\f/g, " ") ?? "No description.");
    }

    fetchData();
  }, [currentId]);

  if (!data) return null;

  const goNext = () => {
    setCurrentId((prev) => prev + 1);
  };

  const goPrev = () => {
    setCurrentId((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const weaknesses = Array.from(
    new Set(
      data.types.flatMap(
        (type) =>
          typeWeaknesses[
            type.type.name.toLowerCase() as keyof typeof typeWeaknesses
          ] || []
      )
    )
  ).join(", ");

  return (
    <div className="bg-white rounded-2xl shadow-xl w-[960px] flex overflow-hidden p-2">
      <div className="bg-my-blue w-[300px] flex items-center justify-center">
        <img src={imageUrl} className="w-86" />
      </div>

      <div className="flex-1 p-6 text-xl">
        <div className="flex gap-6 mb-3">
          <Info label="Number" value={paddedId} />
          <Info label="Name" value={data.name} />
          <Info label="Height" value={`${data.height / 10} m`} />
          <Info label="Weight" value={`${data.weight / 10} kg`} />
        </div>

        <InfoBlock
          label="Types"
          value={data.types.map((t) => t.type.name).join(", ")}
        />

        <InfoBlock label="Weaknesses" value={weaknesses} />

        <div className="flex flex-wrap gap-6 mb-3 mt-3">
          {data.stats.map((stat) => (
            <div key={stat.stat.name} className="w-1/2">
              <Info
                label={stat.stat.name.toUpperCase()}
                value={stat.base_stat}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <span className="text-pink-500 font-semibold">Description</span>
          <p className="mt-1 text-gray-700">{desc}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={goPrev}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={goNext}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

type InfoProps = {
  label: string;
  value: React.ReactNode;
};

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex gap-1">
      <span className="text-my-pink text-xl font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function InfoBlock({ label, value }: InfoProps) {
  return (
    <div className="mt-2">
      <span className="text-my-pink text-xl font-semibold">{label}</span>
      <p>{value}</p>
    </div>
  );
}
