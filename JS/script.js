const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

if (searchInput && searchButton) {

    searchButton.addEventListener("click", function () {

        const searchText = searchInput.value.toLowerCase().trim();

        if (searchText === "") {

            searchResult.textContent = "Please enter something to search.";

        } else if (
            searchText.includes("notes") ||
            searchText.includes("study") ||
            searchText.includes("resource") ||
            searchText.includes("python") ||
            searchText.includes("dsa") ||
            searchText.includes("dbms") ||
            searchText.includes("lab") ||
            searchText.includes("paper") ||
            searchText.includes("pyq")
        ) {

            window.location.href = "resources.html";

        } else if (
            searchText.includes("event") ||
            searchText.includes("fest")
        ) {

            window.location.href = "events.html";

        } else if (
            searchText.includes("internship") ||
            searchText.includes("hackathon") ||
            searchText.includes("job") ||
            searchText.includes("competition")
        ) {

            window.location.href = "opportunities.html";

        } else {

            searchResult.textContent = "No matching section found.";

        }

    });

    searchInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            searchButton.click();
        }

    });

}


const resourceType = document.getElementById("type");

if (resourceType) {

    resourceType.addEventListener("change", function () {

        const selectedType = resourceType.value;

        const notesCard = document.getElementById("notes-card");
        const papersCard = document.getElementById("papers-card");
        const manualsCard = document.getElementById("manuals-card");

        notesCard.style.display = "none";
        papersCard.style.display = "none";
        manualsCard.style.display = "none";

        if (selectedType === "notes") {

            notesCard.style.display = "block";

        } else if (selectedType === "papers") {

            papersCard.style.display = "block";

        } else if (selectedType === "manuals") {

            manualsCard.style.display = "block";

        } else {

            notesCard.style.display = "block";
            papersCard.style.display = "block";
            manualsCard.style.display = "block";

        }

    });

}