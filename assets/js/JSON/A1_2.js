let cities = [];
let distances = [];
let table = document.getElementById('distances');

let getJSONFile = function (e) {
    ajax = Object.create(Ajax);
    ajax.init();
    ajax.getFile("../assets/data/cities.json");
}

let ajaxCallback = function (txt) {
    let cityJSON = JSON.parse(txt);

    // Create array of City objects
    for (let i = 0; i < cityJSON.length; i++) {
        const c = cityJSON[i];
        cities[c.id] = new City(c.id, c.city, c.country, c.lon, c.lat);
    }

    // Create multi-dim-array containing arrays which contain all distances for a given city
    for (let cityKey in cities) {
        let distance = [];
        let city = cities[cityKey];

        for (let otherCity in cities) {
            distance[otherCity] = Math.floor(city.distanceTo(cities[otherCity]));
        }
        
        distances[city.id] = distance;
    }

    // Set top section of table
    let topRow = document.createElement("tr");
    topRow.setAttribute("class", "top");

    // First empty cell in Top row
    let topCell = document.createElement("td");
    let text = document.createTextNode("");
    topCell.appendChild(text);
    topRow.appendChild(topCell);

    // City names in Top Row
    cities.forEach(city => {
        let topCell = document.createElement("td");
        let text = document.createTextNode(city.name);
        topCell.appendChild(text);
        topRow.appendChild(topCell);
    });

    table.appendChild(topRow);

    // Table Content
    for (let key in distances) {
        const row = distances[key]
        
        let tRow = document.createElement("tr");
        let tCell = document.createElement("td");
        tCell.setAttribute("class", "left");
        let text = document.createTextNode(cities[key].name);
        tCell.appendChild(text);
        tRow.appendChild(tCell);

        
        for (const cell in row) {
            let tCell = document.createElement("td");
            let text = document.createTextNode(row[cell]);
            tCell.appendChild(text);
            
            if(row[cell] === 0) {
                tCell.setAttribute("class", "empty");
            }

            tRow.appendChild(tCell);
        }
        table.appendChild(tRow);
    }
};




let City = function (id, name, country, lon, lat) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.lon = lon;
    this.lon = lon;
    this.lat = lat;

    this.distanceTo = function(city) {
        // Calc distance to another city object
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(city.lat - this.lat);  // deg2rad below
        let dLon = deg2rad(city.lon - this.lon);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(this.lat)) * Math.cos(deg2rad(city.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }
}








function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

window.addEventListener('load', getJSONFile);       // kick off JS