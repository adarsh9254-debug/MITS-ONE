const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

searchButton.addEventListener("click", function () {

const searchText = searchInput.value;

if (searchText === "") {
    searchResult.textContent = "Please enter something to search.";
} else if (
    searchText.toLowerCase().includes("notes") ||
    searchText.toLowerCase().includes("study") ||
    searchText.toLowerCase().includes("resource")
) {
    window.location.href = "resources.html";
} else if (
    searchText.toLowerCase().includes("event") ||
    searchText.toLowerCase().includes("fest")
) {
    window.location.href = "events.html";
} else if (
    searchText.toLowerCase().includes("internship") ||
    searchText.toLowerCase().includes("hackathon") ||
    searchText.toLowerCase().includes("job") ||
    searchText.toLowerCase().includes("competition")
) {
    window.location.href = "opportunities.html";
} else {
    searchResult.textContent = "No matching section found.";
}
         searchInput.addEventListener("keypress", function (event) {
             if (event.key === "Enter") {
                            searchButton.click();
             }
         });
});