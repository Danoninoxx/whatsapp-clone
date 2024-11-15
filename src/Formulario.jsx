import { useState, useEffect, useRef } from "react";
import chats from "./mocks/chats.json";

/*const pokemons = [
  { id: 1, nombre: "Pikachu", tipo: "Eléctrico", fuerza: 55 },
  { id: 2, nombre: "Charizard", tipo: "Fuego", fuerza: 84 },
  { id: 3, nombre: "Bulbasaur", tipo: "Planta", fuerza: 49 },
  { id: 4, nombre: "Squirtle", tipo: "Agua", fuerza: 44 },
  { id: 5, nombre: "Jigglypuff", tipo: "Normal", fuerza: 45 },
  { id: 6, nombre: "Gengar", tipo: "Fantasma", fuerza: 65 },
  { id: 7, nombre: "Eevee", tipo: "Normal", fuerza: 55 },
  { id: 8, nombre: "Machamp", tipo: "Lucha", fuerza: 130 },
  { id: 9, nombre: "Alakazam", tipo: "Psíquico", fuerza: 50 },
  { id: 10, nombre: "Onix", tipo: "Roca", fuerza: 45 },
]; */

function Formulario() {
  const [inputBuscar, setInputBuscar] = useState('');

  return (
    <>
      <h1>Formulario</h1>
      <form id='formulario-form-id'>
        Filtro: <input id='formulario-input-id'onChange={(e)=>{setInputBuscar(e.target.value)}}></input>
      </form>
      <ul>
        {chats.filter((c)=>c.name.toLowerCase().includes(inputBuscar.toLowerCase())).map(e=><li key={e.id}>{e.name}</li>)}
      </ul>
    </>
  );
}
export default Formulario;
