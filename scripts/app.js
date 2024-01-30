let inputSearch = document.getElementById("inputSearch");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favoriteBtn = document.getElementById("favoriteBtn");

let pokemon = "";

favoriteBtn.addEventListener('click', () => {
    alert();
});

inputSearch.addEventListener('keydown', async (event) => {
    if(event.key === "Enter")
    {
        console.log("Search works");
    }
})

searchBtn.addEventListener('click', async () => {
    if(inputSearch.value)
    {
    console.log("Search btn works");
    }
});