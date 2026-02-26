"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
}

export default function SlidePanel({ isOpen }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="
            fixed top-0 right-0
            h-full w-[1300px]
            bg-white
            shadow-2xl
            z-40
            p-8
            overflow-y-auto
          "
        >
        </motion.div>
      )}
    </AnimatePresence>
  );
}
