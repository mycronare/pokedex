"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  pokemonList: any[];
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

  const current = pokemonList[currentIndex];
  const prev =
    pokemonList[(currentIndex - 1 + pokemonList.length) % pokemonList.length];
  const next =
    pokemonList[(currentIndex + 1) % pokemonList.length];
  const paddedId = String(current.id).padStart(3, "0");
  const imageUrl = (id: number) =>
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(
      id
    ).padStart(3, "0")}.png`;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="
            fixed top-0 right-0
            h-full w-[1100px]
            bg-[#FCE4D8]
            z-40
            p-8
            overflow-hidden
            flex flex-col items-center
          "
        >
          {/* ID + Name */}
          <div className="flex gap-20 mt-25">
            <h2 className="text-7xl font-bold text-my-green">
              #{paddedId} /
            </h2><h1 className="text-7xl font-bold text-my-pink capitalize">
              {current.name}
            </h1>
          </div>

          {/* Carousel Section */}
          <div className="flex items-center justify-center gap-6 flex-1">

            {/* Previous Preview */}
            <div className="opacity-40 scale-75">
              <img
                src={imageUrl(prev.id)}
                className="w-40 object-contain"
              />
            </div>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-pokedex-gradient border-white border-8 rounded-3xl p-8 shadow-xl w-[380px] h-[500px]"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={imageUrl(current.id)}
                  className="w-48 object-contain"
                />
              </div>

              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">
                {current.types.map((type: any) => (
                  <span
                    key={type.type.name}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xs capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Next Preview */}
            <div className="opacity-40 scale-75">
              <img
                src={imageUrl(next.id)}
                className="w-40 object-contain"
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex flex-row items-center gap-4 mt-6 text-my-pink text-8xl">
            <button onClick={goPrev}>‹</button>
            {/* Dots */}
            <div className="flex gap-5 ml-10 mr-10 bg-[#fff2d0] p-4 rounded-3xl">
              {visibleDots.map((_, i) => {
                const index = start + i;
                return (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full
                      ${index === currentIndex ? "bg-[#fbd87f]" : "bg-[#fbd87f]/50"}
                    `}
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
