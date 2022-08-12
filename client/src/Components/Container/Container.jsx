import React from "react";
import PokemonCard from "../PokemonCard/pokemonCard";
import s from "./Container.module.css";

const Container = ({ name, onClose }) => {
  return (
    <div className={s.Container}>
      <PokemonCard
        image={name.image}
        name={name.name}
        types={name.types}
        id={name.id}
      />
      <button onClick={onClose}>cerrar</button>
    </div>
  );
};

export default Container;
