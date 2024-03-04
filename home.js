// Función para obtener todos los Pokémon con soporte para paginación
async function obtenerTodosLosPokemon(pagina = 1, limite = 20) {
  const offset = (pagina - 1) * limite;
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limite}`;
  
  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  return datos;
}

// Función para mostrar los Pokémon en el HTML
function mostrarPokemonEnHTML(pokemon) {
  const pokemonListDiv = document.getElementById("pokemon-list");
  pokemonListDiv.innerHTML = ""; // Limpiar la lista antes de agregar los Pokémon

  pokemon.forEach(poke => {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");

    const nombre = document.createElement("h2");
    nombre.textContent = poke.name;

    const imagen = document.createElement("img");
    imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obtenerIdPokemon(poke)}.png`; // La URL de la imagen está basada en el ID del Pokémon
    imagen.alt = poke.name;

    pokemonDiv.appendChild(nombre);
    pokemonDiv.appendChild(imagen);

    pokemonListDiv.appendChild(pokemonDiv);
  });
}

// Función para obtener el ID del Pokémon desde su URL
function obtenerIdPokemon(pokemon) {
  const urlPartes = pokemon.url.split("/");
  return urlPartes[urlPartes.length - 2];
}

// Manejo de la paginación
let paginaActual = 1;
const limitePorPagina = 20;

// Función para cargar y mostrar los Pokémon de la página actual
async function cargarPagina() {
  try {
    const data = await obtenerTodosLosPokemon(paginaActual, limitePorPagina);
    mostrarPokemonEnHTML(data.results);
  } catch (error) {
    console.error('Error al cargar la página:', error);
  }
}

// Mostrar la primera página cuando se carga la página
window.addEventListener('load', cargarPagina);

// Manejar los eventos de paginación
document.getElementById("pagina-anterior").addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    cargarPagina();
  }
});

document.getElementById("pagina-siguiente").addEventListener("click", () => {
  paginaActual++;
  cargarPagina();
});



function mostrarPokemonEnHTML(pokemon) {
  const pokemonListDiv = document.getElementById("pokemon-list");
  pokemonListDiv.innerHTML = ""; // Limpiar la lista antes de agregar los Pokémon

  pokemon.forEach(poke => {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon"); // Agrega la clase "pokemon" aquí

    const nombre = document.createElement("h2");
    nombre.textContent = poke.name;

    const imagen = document.createElement("img");
    imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obtenerIdPokemon(poke)}.png`;
    imagen.alt = poke.name;

    pokemonDiv.appendChild(nombre);
    pokemonDiv.appendChild(imagen);

    pokemonListDiv.appendChild(pokemonDiv);
  });
}
