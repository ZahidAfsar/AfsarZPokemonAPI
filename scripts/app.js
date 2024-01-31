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
let locationText = document.getElementById("locationText");
let moveText = document.getElementById("moveText");
let pokeImg = document.getElementById("pokeImg");

let pokemon = "";
let pokemon2 = "";

const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}?limit=649`);
    const data = await promise.json();
    console.log(data);
    return data;
}

const getPokeImg = (pokemon) => {
    return pokemon.sprites.other["official-artwork"].front_default;
}


const LocationAPI = async (pokemon2) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}/encounters`);
    const data = await promise.json();
    console.log(data);
    return data;
}

function capitalizeFirstLetter(pokemon) {
    return pokemon.charAt(0).toUpperCase() + string.slice(1);
}

inputSearch.addEventListener('keydown', async (event) => {
    if(event.key === "Enter")
    {
        console.log("Search works");
        pokemon = await pokemonApi(event.target.value.toLowerCase());
        pokemon2 = await LocationAPI(event.target.value.toLowerCase());
        numText.textContent = pokemon.id;
        nameText.textContent = pokemon.name;
        typeText.textContent = pokemon.types[0].type.name;
        moveText.textContent = pokemon.moves[0].move.name;
        // locationText.textContent = pokemon2[0].location_area.name;
        if(!pokemon.length === 0){
            locationText.textContent = `${pokemon2[0].location_area.name}`; 
        }else{
           locationText.textContent = 'N/A';
        }
        pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
    }
});

searchBtn.addEventListener('click', async () => {
    if(inputSearch.value)
    {
    console.log("Search btn works");
    pokemon = await pokemonApi(inputSearch.value.toLowerCase());
    pokemon2 = await LocationAPI(inputSearch.value.toLowerCase());
    numText.textContent = pokemon.id;
    nameText.textContent = pokemon.name;
    typeText.textContent = pokemon.types[0].type.name;
    moveText.textContent = pokemon.moves[0].move.name;
    if(!pokemon.length === 0){
        locationText.textContent = `${pokemon2[0].location_area.name}`; 
    }else{
       locationText.textContent = 'N/A';
    }
    pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
}
});

randomBtn.addEventListener('click', async () => {
    let random = Math.floor(Math.random() * 1025) + 1;
    pokemonApi(random);

});


pokeImg.addEventListener('click', async () => {
    if(pokeImg.src == pokemon.sprites.other["official-artwork"].front_default){
        pokeImg.src = pokemon.sprites.other["official-artwork"].front_shiny;
    }else{
        pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
    }
});

favoriteBtn.addEventListener('click', () => {
    alert();
    saveToLocalStorage(pokemon.name);
});

getFavoritesBtn.addEventListener('click', async () => {
    let favorites = getLocalStorage();
    getFavoritesDiv.textContent = "";
    favorites.map(pokemon => {

        let div = document.createElement('div');
        div.textContent = pokemon;
        div.className = "bg-yellow-300 rounded-lg font-PottaOne"
        // let p = document.createElement('p');
        // p.textContent = pokemon;
        // p.className = "text-lg font-medium text-gray-900 dark:text-white";
        let button = document.createElement('button');

        button.type = "button";
        button.textContent = "X"
        button.classList.add(
            "text-black","font-PottaOne","bg-transparent","hover:bg-gray-200","hover:text-gray-900","rounded-lg","text-sm","w-8","h-8","flex-1","justify-end","dark:hover:bg-gray-600","dark:hover:text-white");

            button.addEventListener('click', () => {
                removeFromLocalStorage(pokemon);
                div.remove();
            });
        div.append(button);
        getFavoritesDiv.append(div);
    })
});


// pokemon colors 
// Normal Type: #A8A77A
// Fire Type: #EE8130
// Water Type: #6390F0
// Electric Type: #F7D02C
// Grass Type: #7AC74C
// Ice Type: #96D9D6
// Fighting Type: #C22E28
// Poison Type: #A33EA1
// Ground Type: #E2BF65
// Flying Type: #A98FF3
// Psychic Type: #F95587
// Bug Type: #A6B91A
// Rock Type: #B6A136
// Ghost Type: #735797
// Dragon Type: #6F35FC
// Dark Type: #705746
// Steel Type: #B7B7CE
// Fairy Type: #D685AD