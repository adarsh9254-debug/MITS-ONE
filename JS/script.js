const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

searchButton.addEventListener("click", function() {
    const searchText = searchInput.value;
    console.log(searchText);
    searchResult.textContent = `You searched for: ${searchText}`;        
});