import "./App.css";
import { useState } from "react";
import Axios  from "axios";

const App = () => {
const [pokemonName, setPokemonName] = useState("");
const [pokemonChosen, setPokemonChosen] = useState(false);
const [pokemon, setPokemon] = useState({
  name: "",
  number: "",
  species: "",
  front: "",
  back: "",
  hp: "",
  attack: "",
  defense: "",
  speed: "",
  type: "",
});

const searchPokemon = () => {
Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
(res) => {
setPokemon({
  name: pokemonName,
  number: res.data.id,
  species: res.data.species.name,
  front: res.data.sprites.front_default,
  back: res.data.sprites.back_default,
  hp: res.data.stats[0].base_stat,
  attack: res.data.stats[1].base_stat,
  defense: res.data.stats[2].base_stat,
  speed: res.data.stats[5].base_stat,
  type: res.data.types[0].type.name,
});
setPokemonChosen(true);
}
);
};
  return (
    <div className="App">
      <div className="TitleSection">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" />
        <div className="Container">
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokémon</button>
      </div></div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>
        ) : (
          <>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={pokemon.front} alt={pokemon.name} />
                </div>
                <div className="flip-card-back">
                  <img src={pokemon.back} alt={pokemon.name} />
                </div>
              </div>
            </div>
            <h1>{pokemon.name}</h1>
            <h3>Number: #{pokemon.number}</h3>
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <h4>Speed: {pokemon.speed}</h4>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
