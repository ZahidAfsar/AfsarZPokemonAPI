const saveToLocalStorage = (pokemon) => {
    //favorites will get the current values in local storage
    //AKA saves the array in favorites
    let favorites = getLocalStorage();


    //if the name is already included in the local storage we will not push into favorites
    if(!favorites.includes(pokemon))
    {
        favorites.push(pokemon);
    }
    //JSON.stringify insures what ever we save into local storage is a string
    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

const getLocalStorage = () => {
    //Getting our values from local storage
    let localStorageData = localStorage.getItem("Favorites");

    //We check if that data is null so we return an empty array
    if(localStorageData == null){
        return [];
    }
    //We return an array of local storage
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (pokemon) => {
    //We're saving local storage data in favorites variable
    let favorites = getLocalStorage();

    //We're finding the index of our parameter (digimon)
    let namedIndex = favorites.indexOf(pokemon);

    //remove the name from the array using the .splice method
    favorites.splice(namedIndex, 1);

    //We set our new mutated favorites array inside our local storage
    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage};