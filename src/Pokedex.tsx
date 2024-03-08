import style from "./pokedex.module.css";
import { useState } from "react";
import PokemonDetail from "./PokemonDetail.tsx";
import Pokemons from "./Pokemons.tsx";

const Pokedex = () => {
  const [openedPokemon, setOpenedPokemon] = useState<string | null>(null);

  return (
    <div className={style.pokedex}>
      <Pokemons
        onSelect={(_, pokemonName) => {
          setOpenedPokemon(pokemonName);
        }}
      />
      {openedPokemon ? <PokemonDetail name={openedPokemon} /> : null}
    </div>
  );
};

export default Pokedex;
