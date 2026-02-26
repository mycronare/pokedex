"use client";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function PageTab({ isOpen, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className={`
        fixed 
        top-1/2 -translate-y-1/2
        h-24 w-12
        bg-my-pink hover:my-green
        rounded-l-2xl
        flex items-center justify-center
        shadow-xl
        transition-all duration-400
        z-50 
        ${isOpen ? "right-[1100px]" : "right-50"}
      `}
      aria-label="Page navigation tab"
    >
      <span
        className={`
          text-5xl transition-transform text-background
          ${isOpen ? "rotate-180" : ""}
        `}
      >
       {'<'}
      </span>
    </button>
  );
}
