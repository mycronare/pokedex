import PokemonDetailsCard from "@/app/components/PokemonDetailsCard";
import Link from "next/link";
import { use } from "react";

export default function PokemonFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl mb-6">
        <Link 
          href="/" 
          className="text-gray-500 hover:text-gray-800 flex items-center gap-2"
        >
          ← Go back 
        </Link>
      </div>

      <div className="w-full max-w-3xl">
        <PokemonDetailsCard id={id} />
      </div>
    </main>
  );
}

