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
        bg-yellow-400 hover:bg-yellow-500
        rounded-l-2xl
        flex items-center justify-center
        shadow-xl
        transition-all duration-400
        z-50
        ${isOpen ? "right-[1300px]" : "right-0"}
      `}
      aria-label="Page navigation tab"
    >
      <span
        className={`
          text-2xl font-bold transition-transform
          ${isOpen ? "rotate-180" : ""}
        `}
      >
        ▶
      </span>
    </button>
  );
}
