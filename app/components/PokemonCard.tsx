"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PokemonCard({ pokemon }: any) {
  const paddedId = String(pokemon.id).padStart(3, "0");

  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-my-blue border-8 border-my-green backdrop-blur rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all"
      >
        <p className="text-2xl text-right text-white bg-my-green w-15 h-10 pr-2 pt-1 rounded-br-xl">
          #{paddedId}
        </p>

        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-full h-32 object-contain"
        />

        <h2 className="text-2xl font-bold capitalize mt-4 pl-6">
          {pokemon.name}
        </h2>


        <div className="flex gap-2 mt-3 flex-wrap pl-5 pb-5">
          {pokemon.types.map((type: any) => (
            <span
              key={type.type.name}
              style={{
                backgroundColor: `var(--${type.type.name})`,
              }}
              className="px-3 py-1 rounded-full text-xs capitalize text-white"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </motion.div>
  );
}
