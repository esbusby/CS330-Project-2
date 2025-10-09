
// URL function

function doSearch() {
    const query = $("#query").val();

    $.ajax(`/api/search?query=${encodeURIComponent(query)}`)
        .done(function (data) {
            const results = $("#searchResults");
            results.empty();

            if (data.items) {
                data.items.forEach(function (item) {
                    results.append(
                        `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                         <p>${item.snippet}</p>`
                    );
                });
            }
        })
        .fail(function (xhr, status, error) {
            console.error("Error fetching search results:", error);
        });
}

$("#searchButton").on("click", function () {
    $("#searchResults").show();
    doSearch();
});


// Time function
function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

$("#time").dialog({
    autoOpen: false,
    title: "Current Time",
    modal: true,
    width: 300,
    buttons: {
        OK: function () {
            $(this).dialog("close");
        }
    }
});

$("#timeButton").on("click", function () {
    $("#time").show();
    $("#time").text("Current time: " + getTime());
    $("#time").dialog("open");
});


// Background images function

const images = [
    "../css/minecraft.png",
    "../css/minecraft2.png",
    "../css/minecraft3.png"
];

let currentBackground = 0;

function changeBackground() {
    currentBackground = (currentBackground + 1) % images.length;
    $("body").css("background-image", `url(${images[currentBackground]})`);
}

$("#engineName").on("click", changeBackground);


// Lucky function

function feelingLucky() {
    const query = $("#query").val();
    if (!query) return; // do nothing if input is empty

    $.ajax(`/api/search?query=${encodeURIComponent(query)}&num=1`)
        .done(function (data) {
            if (data.items && data.items.length > 0) {
                window.location.href = data.items[0].link;
            } else {
                alert("No results found.");
            }
        })
        .fail(function () {
            alert("Error performing search.");
        });
}

$("#luckyButton").on("click", feelingLucky);
