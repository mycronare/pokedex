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
        className="bg-pokedex-gradient border-8 border-white backdrop-blur rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all"
      >
        <p className="text-2xl text-center text-white bg-my-green w-15 h-10 pr-2 pt-1 rounded-xl mt-1 ml-1">
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


        <div className="flex gap-2 mt-3 flex-wrap pl-5 pb-2 pr-2 justify-end">
          {pokemon.types.map((type: any) => (
            <div 
              style={{
                backgroundColor: `var(--${type.type.name})`,
              }}
              className="px-3 py-1 h-8 w-8 rounded-full"
            >
            </div>
          ))}
        </div>
      </motion.div>
  );
}
