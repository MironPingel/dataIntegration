let langs = [];
let sortedLangs = [];
let list = document.getElementById('languages');
let currentCount = 40;


let getJSONFile = function (e) {
    ajax = Object.create(Ajax);
    ajax.init();
    ajax.getFile("https://raw.githubusercontent.com/neinalways/worldlanguages/master/languages.json");
}

let ajaxCallback = function (txt) {
    let res = JSON.parse(txt);

    for (let i = 0; i < res.length; i++) {
        const set = res[i];
        if(!langs[set.language]) {
            langs[set.language] = Number(set.speakers);
        } else {
            langs[set.language] += Number(set.speakers);
        }
    }
    
    let sortedLangKeys = getSortedKeys(langs);

    for (let i = 0; i < sortedLangKeys.length; i++) {
        const langName = sortedLangKeys[i];
        
        let l = new Language(langName, langs[langName]);
        sortedLangs.push(l);
    }

    // Output HTML
    
    for (let i = 0; i < 40; i++) {
        const language = sortedLangs[i];
        language.print(list, i + 1);
    }
    
};



let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

nextBtn.addEventListener("click", function(e) {
    if (currentCount < sortedLangs.length) {
        list.innerHTML = "";
        let prevCount = currentCount;
        currentCount += 40;

        for (let i = prevCount; i < currentCount; i++) {
            if (sortedLangs[i]) {
                const language = sortedLangs[i];
                language.print(list, i + 1);
            }
        }
    }
});


prevBtn.addEventListener("click", function (e) {
    if (currentCount > 40) {
        list.innerHTML = "";
        let prevCount = currentCount - 80;
        currentCount -= 40;

        for (let i = prevCount; i < currentCount; i++) {
            if (sortedLangs[i]) {
                const language = sortedLangs[i];
                language.print(list, i + 1);
            }
        }
    }
});








let Language = function (name, speakers) {
    this.name = name;
    this.speakers = speakers;
    this.countries = [];

    this.print = function (parentNode, position) {
        let listItem = document.createElement("li");

        let id = document.createElement("div");
        id.setAttribute("class", "id");
        let idText = document.createTextNode(position);
        id.appendChild(idText);
        
        let name = document.createElement("h3");
        name.setAttribute("class", "name");
        let nameText = document.createTextNode(this.name);
        name.appendChild(nameText);


        let speakers = document.createElement("p");
        speakers.setAttribute("class", "speakers");
        let speakersText = document.createTextNode(numberWithCommas(this.speakers));
        speakers.appendChild(speakersText);
    
        listItem.appendChild(id);
        listItem.appendChild(name);
        listItem.appendChild(speakers);

        parentNode.appendChild(listItem);

    }

    this.addCountry = function(country) {
        if (!this.countries.indexOf(country) > -1) {
            this.countries.push(country);
        }
    }
}




function getSortedKeys(obj) {
    var keys = []; for (var key in obj) keys.push(key);
    return keys.sort(function (a, b) { return obj[b] - obj[a] });
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


window.addEventListener('load', getJSONFile);       // kick off JS