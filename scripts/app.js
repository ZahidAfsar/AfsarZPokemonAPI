import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";
import {firstLetterFormat, formatText} from "./formatText.js"


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
let abilitiesText = document.getElementById("abilitiesText");
let evolutionDiv = document.getElementById("evolutionDiv");


let currentPokemon;
let pokeData;
let pokeImgDefault;


searchBtn.addEventListener('click', async () => {
    if(inputSearch.value)
    {
    const enteredValue = parseInt(inputSearch.value.toLowerCase(), 10);
        if (enteredValue > 650) {
            alert("Please enter a pokemon gen 1 - 5");
        } else {
            currentPokemon = await pokemonApi(inputSearch.value.toLowerCase());
        }
    }
})


randomBtn.addEventListener('click', async () => {
    const randNum = Math.floor(Math.random() * 649) + 1;
    if (randNum)
    {
        currentPokemon = await pokemonApi(randNum);
    }
});


inputSearch.addEventListener('keydown', async (event) => {
    if (inputSearch.value) {
        if (event.key === 'Enter') {
            const enteredValue = parseInt(event.target.value.toLowerCase(), 10);
            if (enteredValue > 650) {
                alert("Please enter a pokemon gen 1 - 5");
            } else {
                currentPokemon = await pokemonApi(event.target.value.toLowerCase());
            }
        }
    }
});


const LocationAPI = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`);
    return await promise.json();
};

const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    pokeData = await promise.json();

    if(pokeData.id > 649){
        alert("Gen 1 to 5")
    }else{

    let pokemonNameText = pokeData.name;
    nameText.textContent = pokemonNameText.charAt(0).toUpperCase() + pokemonNameText.slice(1);

    const pokemonID = pokeData.id; 
    numText.textContent = pokemonID;

    pokeImg.src = pokeData.sprites.other["official-artwork"].front_default;
   
    let TypesArr = pokeData.types;
    let pokeTypes = TypesArr.map(e => e.type.name);
    typeText.textContent = pokeTypes.join(", ");
    typeText.textContent = pokeTypes.map(firstLetterFormat).join(", ");
   

    let pokeLocationData = await LocationAPI(pokemon);
    if (!pokeLocationData.length == 0) {
        locationText.textContent = formatText(pokeLocationData[0]["location_area"].name);
    } else {
        locationText.textContent = "N/A";
    }

    let abilitiesArr = pokeData.abilities;
    const pokeAbilities = abilitiesArr.map(e => firstLetterFormat(e.ability.name));
    abilities.textContent = pokeAbilities.join(", ");


    const MovesArr = pokeData.moves;
    const pokemonMoves = MovesArr.map(e => firstLetterFormat(e.move.name));
    moveText.textContent = pokemonMoves.join(", ");

    const promise2 = await fetch(`${pokeData.species.url}`);
    const speciesPokemon = await promise2.json();
    

    const promise3 = await fetch(`${speciesPokemon.evolution_chain.url}`);
    const PokemonEvolution = await promise3.json();
    

    if (PokemonEvolution.chain.evolves_to.length === 0) {
        evolutionDiv.textContent = "N/A";
    } else {
        
    const evolutions2 = [PokemonEvolution.chain.species.name];
        
    const evolutions1 = (chain) => {
            if (chain.evolves_to.length === 0)
            {
            return;
            }
            chain.evolves_to.forEach((evolution) => 
            {
                evolutions2.push(evolution.species.name);
                evolutions1(evolution);
            });
        };
    evolutions1(PokemonEvolution.chain);

        evolutionDiv.innerHTML = "";
        evolutions2.map(async (pokemonName) => {
            const div = document.createElement('div');
            div.className = (" font-PottaOne text-center");

            const promise4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
            const imgData = await promise4.json();

            const imgPicPokemon = document.createElement('img');
            imgPicPokemon.src = imgData.sprites.other["official-artwork"].front_default;

            const p = document.createElement('p');
            p.textContent = firstLetterFormat(pokemonName);

            div.append(imgPicPokemon);
            div.append(p);

            evolutionDiv.append(div);
        });
    }
}
};

pokemonApi('1');
LocationAPI('1');

pokeImg.addEventListener('click', async () => {
    if(pokeImg.src == pokeData.sprites.other["official-artwork"].front_default)
    {
        pokeImg.src = pokeData.sprites.other["official-artwork"].front_shiny;
    }else{
        pokeImg.src = pokeData.sprites.other["official-artwork"].front_default;
    }
});

favoriteBtn.addEventListener('click', () => {
    const favorites = getLocalStorage();
    alert("Added to Favorites")
    if (favorites.includes(pokeData.name)) 
    {
        removeFromLocalStorage(pokeData.name);

    } else {
        saveToLocalStorage(pokeData.name);
        
    }
});


getFavoritesBtn.addEventListener('click', () => {
    let favorites = getLocalStorage();
    getFavoritesDiv.textContent = ""

    favorites.map(pkmnName => {
        let div = document.createElement("div")
        div.className = " px-[25px] bg-yellow-300 rounded-lg py-[35px] flex justify-between  items-center mt-[25px]  "

        let p = document.createElement("p")
        p.textContent = firstLetterFormat(pkmnName)
        p.className = " ml-[30%] text-2xl text-center font-PottaOne text-black "

        let button = document.createElement('button');
        button.type = "button";
        button.textContent = "X"
        button.classList.add("text-custom-red","bg-transparent","hover:bg-gray-200","hover:text-gray-900","rounded-lg","text-3xl","w-8", "h-8", "font-PottaOne","pl-[40px]","dark:hover:bg-gray-600","dark:hover:text-white","mr-9%" )

        button.addEventListener('click', () => {
            removeFromLocalStorage(pkmnName);
            div.remove();
        })

        div.appendChild(p)
        div.appendChild(button)
        getFavoritesDiv.appendChild(div)
    })

})


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