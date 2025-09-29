// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const apiKey = "AIzaSyByD4RNe0Qq11vJeG5dvK8bTE601QRhLis";
const engineID = "e6319ae99f21b46d4";

function doSearch() {
    const query = document.getElementById("query").value;
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineID}&q=${encodeURIComponent(query)}&num=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = ""; // clear previous results
            if (data.items) {
                data.items.forEach(item => {
                    resultsDiv.innerHTML += `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                                             <p>${item.snippet}</p>`;
                });
            }
        })
        .catch(err => console.error("Error fetching search results:", err));
}

document.getElementById("searchButton").addEventListener("click", doSearch);
