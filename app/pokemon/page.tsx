"use client";

import { motion } from "framer-motion";

export default function PokemonPage() {
  return (
      <motion.main
        className="
          fixed top-0 right-12
          h-screen w-[calc(100%-3rem)]
          bg-gray-100
          shadow-2xl
          z-40
          p-6
        "
        initial={{ x: "100%" }}
        animate={{ x: 400 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4">Pokemon</h2>

        <div className="flex gap-4 overflow-x-auto">
          <div className="min-w-[200px] h-64 bg-white rounded-xl shadow" />
          <div className="min-w-[200px] h-64 bg-white rounded-xl shadow" />
          <div className="min-w-[200px] h-64 bg-white rounded-xl shadow" />
        </div>
      </motion.main>
  );
}
