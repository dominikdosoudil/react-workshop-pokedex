import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "./api.ts";

interface PokemonDetailProps {
  name: string;
}

const PokemonDetail = ({ name }: PokemonDetailProps) => {
  const pokemonDetail = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
  });

  if (pokemonDetail.isPending) {
    return <div>Loading...</div>;
  }

  if (pokemonDetail.isError) {
    console.warn(pokemonDetail.error);
    return (
      <div>
        Could not load pokemon detail. Check console for further information.
      </div>
    );
  }

  return (
    <div>
      <div>
        <img src={pokemonDetail.data.sprites.front_default} />
      </div>
      <div>
        <h2>Name:</h2>
        {pokemonDetail.data.name}
      </div>
    </div>
  );
};

export default PokemonDetail;
