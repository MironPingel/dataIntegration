let getJSONFile = function (e) {
    let ajax = Object.create(Ajax);
    ajax.init();
    ajax.getFile("../assets/data/colors.json");
}

let ajaxCallback = function(txt) {
    let colors = JSON.parse(txt).colors;
    let colorList = document.getElementById("colors");

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];

        // Create new List item
        let newListItem = document.createElement("li");

        let colorName = document.createElement("h1");
        let colorNameValue = document.createTextNode(color.color);
        colorName.appendChild(colorNameValue);

        let colorCode = document.createElement("p");
        let colorCodeValue = document.createTextNode(color.code.hex);
        colorCode.appendChild(colorCodeValue);

        // Store data in element as data-attributes
        newListItem.setAttribute("data-hex", color.code.hex);

        newListItem.appendChild(colorName);
        newListItem.appendChild(colorCode);
        newListItem.style.backgroundColor = color.code.hex;
        colorList.appendChild(newListItem);



        // Add eventListeners (for copying to clipboard)

        // Store hex in Input
        newListItem.addEventListener("mouseenter", function myFunction(e) {
            let target = e.target;
            let hex = target.dataset.hex;
            let temp = document.getElementById("input");
            temp.value = hex;
        });

        // Copy to clipboard
        newListItem.addEventListener("click", function myFunction(e) {
            let temp = document.getElementById("input");
            temp.select();
            document.execCommand("Copy");

            let message = "Copied " + temp.value + " to clipboard!";
            flash(message);
        });
    }
}


let flash = function(msg) {
    let container = document.getElementById("flash");

    container.innerHTML = msg;
    container.style.bottom = "20px";
    container.style.opacity = "1";

    setTimeout(function () { container.style.bottom = "-200px"; container.style.opacity = 0; }, 3000);
}

window.addEventListener('load', getJSONFile);       // kick off JS
