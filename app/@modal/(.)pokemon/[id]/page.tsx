"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { use } from "react";
import PokemonDetailsCard from "@/app/components/PokemonDetailsCard";

export default function PokemonDetailsModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-my-peach/30 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose} 
      />

      <motion.div
        className="relative z-10"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.3 
        }}
      >
        <PokemonDetailsCard id={id} />
      </motion.div>
    </div>
  );
}

