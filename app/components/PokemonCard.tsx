"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PokemonCard({ pokemon }: any) {
  const paddedId = String(pokemon.id).padStart(3, "0");

  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all"
      >
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-full h-32 object-contain"
        />

        <h2 className="text-lg font-bold capitalize mt-4">
          {pokemon.name}
        </h2>

        <p className="text-sm text-gray-500">
          #{paddedId}
        </p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {pokemon.types.map((type: any) => (
            <span
              key={type.type.name}
              className="bg-gray-200 px-3 py-1 rounded-full text-xs capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
}
