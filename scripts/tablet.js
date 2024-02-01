import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";
import {firstLetterFormat, formatText} from "./formatText.js"


let inputSearchTablet = document.getElementById("inputSearchTablet");
let searchBtnTablet = document.getElementById("searchBtnTablet");
let randomBtnTablet = document.getElementById("randomBtnTablet");
let favoriteBtnTablet = document.getElementById("favoriteBtnTablet");
let getFavoritesBtnTablet = document.getElementById("getFavoritesBtnTablet");
let getFavoritesDivTablet = document.getElementById("getFavoritesDivTablet");
let nameTextTablet = document.getElementById("nameTextTablet");
let numTextTablet = document.getElementById("numTextTablet");
let typeTextTablet = document.getElementById("typeTextTablet");
let locationTextTablet = document.getElementById("locationTextTablet");
let moveTextTablet = document.getElementById("moveTextTablet");
let pokeImgTablet = document.getElementById("pokeImgTablet");
let abilitiesTextTablet = document.getElementById("abilitiesTextTablet");
let evolutionDivTablet = document.getElementById("evolutionDivTablet");


let currentPokemon;
let pokeData;
let pokeImgTabletDefault;


searchBtnTablet.addEventListener('click', async () => {
    if(inputSearchTablet.value)
    {
    const enteredValue = parseInt(inputSearchTablet.value.toLowerCase(), 10);
        if (enteredValue > 650) {
            alert("Please enter a pokemon gen 1 - 5");
        } else {
            currentPokemon = await pokemonApi(inputSearchTablet.value.toLowerCase());
        }
    }
})


randomBtnTablet.addEventListener('click', async () => {
    const randNum = Math.floor(Math.random() * 649) + 1;
    if (randNum)
    {
        currentPokemon = await pokemonApi(randNum);
    }
});

inputSearchTablet.addEventListener('keydown', async (event) => {
    if (inputSearchTablet.value) {
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

    let pokemonnameTextTablet = pokeData.name;
    nameTextTablet.textContent = pokemonnameTextTablet.charAt(0).toUpperCase() + pokemonnameTextTablet.slice(1);

    const pokemonID = pokeData.id; 
    numTextTablet.textContent = "#" + pokemonID;

    pokeImgTablet.src = pokeData.sprites.other["official-artwork"].front_default;
   
    let TypesArr = pokeData.types;
    let pokeTypes = TypesArr.map(e => e.type.name);
    typeTextTablet.textContent = pokeTypes.join(", ");
    typeTextTablet.textContent = pokeTypes.map(firstLetterFormat).join(", ");
   

    let pokeLocationData = await LocationAPI(pokemon);
    if (!pokeLocationData.length == 0) 
    {
        locationTextTablet.textContent = formatText(pokeLocationData[0]["location_area"].name);
    } else {
        locationTextTablet.textContent = "N/A";
    }

    let abilitiesArr = pokeData.abilities;
    const pokeAbilities = abilitiesArr.map(e => firstLetterFormat(e.ability.name));
    abilitiesTablet.textContent = pokeAbilities.join(", ");


    const MovesArr = pokeData.moves;
    const pokemonMoves = MovesArr.map(e => firstLetterFormat(e.move.name));
    moveTextTablet.textContent = pokemonMoves.join(", ");

    const promise2 = await fetch(`${pokeData.species.url}`);
    const speciesPokemon = await promise2.json();
    

    const promise3 = await fetch(`${speciesPokemon.evolution_chain.url}`);
    const PokemonEvolution = await promise3.json();
    

    if (PokemonEvolution.chain.evolves_to.length === 0) {
        evolutionDivTablet.textContent = "N/A";
    } else {
        
    const evolutions2 = [PokemonEvolution.chain.species.name];
        
    const evolutions1 = (chain) => {
            if (chain.evolves_to.length === 0)
            {
                return;
            }
            chain.evolves_to.forEach((evolution) => {
                evolutions2.push(evolution.species.name);
                evolutions1(evolution);
            });
        };
    evolutions1(PokemonEvolution.chain);

        evolutionDivTablet.innerHTML = "";
        evolutions2.map(async (pokemonName) => {
            const div = document.createElement('div');
            div.className = (" font-PottaOne flex-grow px-5 text-center");

            const promise4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
            const imgData = await promise4.json();

            const imgPicPokemon = document.createElement('img');
            imgPicPokemon.src = imgData.sprites.other["official-artwork"].front_default;

            const p = document.createElement('p');
            p.textContent = firstLetterFormat(pokemonName);

            div.append(imgPicPokemon);
            div.append(p);

            evolutionDivTablet.append(div);
        });
    }
}
};

pokemonApi('1');
LocationAPI('1');

pokeImgTablet.addEventListener('click', async () => {
    if(pokeImgTablet.src == pokeData.sprites.other["official-artwork"].front_default){
        pokeImgTablet.src = pokeData.sprites.other["official-artwork"].front_shiny;
    }else{
        pokeImgTablet.src = pokeData.sprites.other["official-artwork"].front_default;
    }
});

favoriteBtnTablet.addEventListener('click', () => {
    const favorites = getLocalStorage();
    if (favorites.includes(pokeData.name)) 
    {
        removeFromLocalStorage(pokeData.name);
        alert("Removed from Favorites");
    } else {
        saveToLocalStorage(pokeData.name);
        alert("Added to Favorites");
    }
});


getFavoritesBtnTablet.addEventListener('click', () => {
    let favorites = getLocalStorage();
    getFavoritesDivTablet.textContent = ""

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
        getFavoritesDivTablet.appendChild(div)
    })

})