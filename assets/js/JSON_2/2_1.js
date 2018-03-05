


// Get list of countries
let init = false;
let getCountryList = function (e) {
   ajax = Object.create(Ajax);
   ajax.init();
   ajax.getFile("../../../JSON_schema/getCountryList.php");
}

// Get specifc country
let country = "";

let getCountry = function (e) {
   ajax = Object.create(Ajax);
   ajax.init();
   ajax.getFile("../../../JSON_schema/getCountry.php?country=" + country);
}

let ajaxCallback = function (txt) {
   if (!init && country == "") {
      let select = document.getElementById("select");
      console.log(txt);
      
      let result = JSON.parse(txt);


      result.forEach(country => {
         let option = document.createElement("option");
         let text = document.createTextNode(country);
         option.appendChild(text);
         option.setAttribute("value", country);
         select.appendChild(option);
      });

      select.addEventListener("change", function (e) {
         country = select.value;
         getCountry();
      });

      init = true;
   } else if (country != "") {
      let country = document.getElementById("country");
      let population = document.getElementById("population");
      let capital = document.getElementById("capital");
      let capitalPopulation = document.getElementById("capitalPopulation");
      let languages = document.getElementById("languages");
      let density = document.getElementById("density");
      let stateHead = document.getElementById("stateHead");

      let c = JSON.parse(txt);
      console.log(c.country);
      
      country.innerHTML = c.country.Name;
      population.innerHTML = c.country.Population;

      if(c.capital) {
         capital.innerHTML = c.capital.Name;
      }
      
      capitalPopulation.innerHTML = c.capital.Population;

      // Languages
      languages.innerHTML = "";
      for (let i = 0; i < c.languages.length; i++) {
         const l = c.languages[i];

         let li = document.createElement("li");
         let text = document.createTextNode(l.Language);
         li.appendChild(text);
         languages.appendChild(li);
      }

      // Density
      let dens = c.country.Population/c.country.SurfaceArea;
      density.innerHTML = dens;

      stateHead.innerHTML = c.country.HeadOfState;
      
   }
}







window.addEventListener('load', getCountryList);       // kick off JS