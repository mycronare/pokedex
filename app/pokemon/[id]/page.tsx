import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PokemonDetail({ params }: PageProps) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );

  const pokemon = await res.json();

  const paddedId = String(pokemon.id).padStart(3, "0");

  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          width={300}
          height={300}
          className="object-contain"
        />

        <div>
          <h1 className="text-4xl font-bold capitalize">
            {pokemon.name}
          </h1>

          <p className="text-gray-500 mt-2 mb-4">
            #{paddedId}
          </p>

          <div className="flex gap-2 flex-wrap mb-6">
            {pokemon.types.map((type: any) => (
              <span
                key={type.type.name}
                className="bg-gray-200 px-4 py-2 rounded-full capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Base Experience:</strong>{" "}
              {pokemon.base_experience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
