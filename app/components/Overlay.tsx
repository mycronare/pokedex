"use client";
import { motion } from "framer-motion";

export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="fixed inset-0 bg-yellow-400/50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
