import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";
import {firstLetterFormat, formatText} from "./formatText.js"


let inputSearchMobile = document.getElementById("inputSearchMobile");
let searchBtnMobile = document.getElementById("searchBtnMobile");
let randomBtnMobile = document.getElementById("randomBtnMobile");
let favoriteBtnMobile = document.getElementById("favoriteBtnMobile");
let getFavoritesBtnMobile = document.getElementById("getFavoritesBtnMobile");
let getFavoritesDivMobile = document.getElementById("getFavoritesDivMobile");
let nameTextMobile = document.getElementById("nameTextMobile");
let numTextMobile = document.getElementById("numTextMobile");
let typeTextMobile = document.getElementById("typeTextMobile");
let locationTextMobile = document.getElementById("locationTextMobile");
let moveTextMobile = document.getElementById("moveTextMobile");
let pokeImgMobile = document.getElementById("pokeImgMobile");
let abilitiesTextMobile = document.getElementById("abilitiesTextMobile");
let evolutionDivMobile = document.getElementById("evolutionDivMobile");


let currentPokemon;
let pokeData;
let pokeImgMobileDefault;


searchBtnMobile.addEventListener('click', async () => {
    if(inputSearchMobile.value)
    {
    const enteredValue = parseInt(inputSearchMobile.value.toLowerCase(), 10);
        if (enteredValue > 650) {
            alert("Please enter a pokemon gen 1 - 5");
        } else {
            currentPokemon = await pokemonApi(inputSearchMobile.value.toLowerCase());
        }
    }
})


randomBtnMobile.addEventListener('click', async () => {
    const randNum = Math.floor(Math.random() * 649) + 1;
    if (randNum)
    {
        currentPokemon = await pokemonApi(randNum);
    }
});

inputSearchMobile.addEventListener('keydown', async (event) => {
    if (inputSearchMobile.value) {
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
    console.log(pokeData);

    let pokemonnameTextMobile = pokeData.name;
    nameTextMobile.textContent = pokemonnameTextMobile.charAt(0).toUpperCase() + pokemonnameTextMobile.slice(1);

    const pokemonID = pokeData.id; 
    numTextMobile.textContent = pokemonID;

    pokeImgMobile.src = pokeData.sprites.other["official-artwork"].front_default;
   
    let TypesArr = pokeData.types;
    let pokeTypes = TypesArr.map(e => e.type.name);
    typeTextMobile.textContent = pokeTypes.join(", ");
    typeTextMobile.textContent = pokeTypes.map(firstLetterFormat).join(", ");
   

    let pokeLocationData = await LocationAPI(pokemon);
    if (!pokeLocationData.length == 0) 
    {
        locationTextMobile.textContent = formatText(pokeLocationData[0]["location_area"].name);
    } else {
        locationTextMobile.textContent = "N/A";
    }

    let abilitiesArr = pokeData.abilities;
    const pokeAbilities = abilitiesArr.map(e => firstLetterFormat(e.ability.name));
    abilitiesMobile.textContent = pokeAbilities.join(", ");


    const MovesArr = pokeData.moves;
    const pokemonMoves = MovesArr.map(e => firstLetterFormat(e.move.name));
    moveTextMobile.textContent = pokemonMoves.join(", ");

    const promise2 = await fetch(`${pokeData.species.url}`);
    const speciesPokemon = await promise2.json();
    

    const promise3 = await fetch(`${speciesPokemon.evolution_chain.url}`);
    const PokemonEvolution = await promise3.json();
    

    if (PokemonEvolution.chain.evolves_to.length === 0) {
        evolutionDivMobile.textContent = "N/A";
    } else {
        
        const evolutions2 = [PokemonEvolution.chain.species.name];
        
        const evolutions1 = (chain) => {
            if (chain.evolves_to.length === 0) return;
            chain.evolves_to.forEach((evolution) => {
                evolutions2.push(evolution.species.name);
                evolutions1(evolution);
            });
        };
        evolutions1(PokemonEvolution.chain);

        evolutionDivMobile.innerHTML = "";
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

            evolutionDivMobile.append(div);
        });
    }
};

pokemonApi('1');
LocationAPI('1');

pokeImgMobile.addEventListener('click', async () => {
    if(pokeImgMobile.src == pokeData.sprites.other["official-artwork"].front_default){
        pokeImgMobile.src = pokeData.sprites.other["official-artwork"].front_shiny;
    }else{
        pokeImgMobile.src = pokeData.sprites.other["official-artwork"].front_default;
    }
});

favoriteBtnMobile.addEventListener('click', () => {
    const favorites = getLocalStorage();
    alert("Added to Favorites")
    if (favorites.includes(pokeData.name)) 
    {
        removeFromLocalStorage(pokeData.name);
    } else {
        saveToLocalStorage(pokeData.name);
    }
});


getFavoritesBtnMobile.addEventListener('click', () => {
    let favorites = getLocalStorage();
    getFavoritesDivMobile.textContent = ""

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
        getFavoritesDivMobile.appendChild(div)
    })

})