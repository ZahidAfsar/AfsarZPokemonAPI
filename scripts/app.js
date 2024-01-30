import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";


let inputSearch = document.getElementById("inputSearch");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favoriteBtn = document.getElementById("favoriteBtn");
let getFavoritesBtn = document.getElementById("getFavoritesBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");
let nameText = document.getElementById("nameText");
let numText = document.getElementById("numText");
let typeText = document.getElementById("typeText");
let moveText = document.getElementById("moveText");
let pokeImg = document.getElementById("pokeImg");

let pokemon = "";
let pokemon2 = "";

const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

const locationApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`);
    const data =  await promise.json();
    console.log(data);
    return data;
};

favoriteBtn.addEventListener('click', () => {
    alert();
    saveToLocalStorage(pokemon);
});

inputSearch.addEventListener('keydown', async (event) => {
    if(event.key === "Enter")
    {
        console.log("Search works");
        pokemon = await pokemonApi(event.target.value.toLowerCase());
        pokemon2 = await locationApi(event.target.value.toLowerCase());
        numText.textContent = pokemon.id;
        nameText.textContent = pokemon.name;
        typeText.textContent = pokemon.types[0].type.name;
        moveText.textContent = pokemon.moves[0].move.name;
    }
})

searchBtn.addEventListener('click', async () => {
    if(inputSearch.value)
    {
    console.log("Search btn works");
    pokemon = await pokemonApi(inputSearch.value.toLowerCase());
    pokemon2 = await locationApi(inputSearch.value.toLowerCase());
    numText.textContent = pokemon.id;
    nameText.textContent = pokemon.name;
    typeText.textContent = pokemon.types[0].type.name;
    moveText.textContent = pokemon.move[0].move.name;
    }
});


getFavoritesBtn.addEventListener('click', async () => {
    let favorites = getLocalStorage();
    getFavoritesDiv.textContent = "";
    favorites.map(pokemon => {

        let p = document.createElement('p');
        p.textContent = pokemon;
        p.className = "text-lg font-medium text-gray-900 dark:text-white";
        let button = document.createElement('button');

        button.type = "button";
        button.textContent = "X"
        button.classList.add(
            "text-gray-400","bg-transparent","hover:bg-gray-200","hover:text-gray-900","rounded-lg","text-sm","w-8","h-8","justify-end","dark:hover:bg-gray-600","dark:hover:text-white");

            button.addEventListener('click', () => {
                removeFromLocalStorage(pokemon);
                p.remove();
            });

        p.append(button);
        getFavoritesDiv.append(p);
    })
});