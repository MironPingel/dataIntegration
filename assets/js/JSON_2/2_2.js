let countryList = [];

// Get list of countries
let init = false;
let getCountryList = function (e) {
   ajax = Object.create(Ajax);
   ajax.init();
   ajax.getFile("../../../JSON_schema/getCountryList.php");
}

// Get specifc country
let countrycode = "";
let district = "";

let getDistricts = function (e) {
   ajax = Object.create(Ajax);
   ajax.init();
   ajax.getFile("../../../JSON_schema/getDistricts.php?countrycode=" + countrycode);
}

let getDistrict = function (e) {
   ajax = Object.create(Ajax);
   ajax.init();
   ajax.getFile("../../../JSON_schema/getCitiesInDistrict.php?countrycode=" + countrycode + "&district=" + district);
} 

let ajaxCallback = function (txt) {
   if (!init && countrycode == "") {
      let select = document.getElementById("select");
      let result = JSON.parse(txt);

      countryList = result;
      console.log(countryList);
      


      result.forEach(country => {
         let option = document.createElement("option");
         let text = document.createTextNode(country[0]);
         option.appendChild(text);
         option.setAttribute("value", country[1]);
         select.appendChild(option);
      });

      select.addEventListener("change", function (e) {
         countrycode = select.value;
         console.log(countrycode);
         getDistricts();
      });

      init = true;
   } else if (countrycode != "" && district == "") {
      let citiesInCountry = JSON.parse(txt);
      let districtNames = citiesInCountry.map(d => (d != null) ? d.District : "");

      let d = uniq(districtNames);
      console.log(d);
      
      let dSelect = document.getElementById('districtSelect');
      dSelect.innerHTML = "";

      let option = document.createElement("option");
      let text = document.createTextNode("-- CHOOSE DISTRICT --");
      option.appendChild(text);
      dSelect.appendChild(option);
      
      d.forEach(district => {
         if (district != null || district == "") {
            let option = document.createElement("option");
            let text = document.createTextNode(district);
            option.appendChild(text);
            option.setAttribute("value", district);
            dSelect.appendChild(option);
            dSelect.disabled = "";
         }
      });

      dSelect.addEventListener("change", function (e) {
         district = dSelect.value;
         getDistrict();
      });
      
   } else if (district != "") {
      let info = JSON.parse(txt);
      console.log(info);
      
      
      let country = document.getElementById("country");
      let district = document.getElementById("district");
      let population = document.getElementById("population");
      let districtPopulation = document.getElementById("districtPopulation");
      let cities = document.getElementById("cities");


      // country.innerHTML = c.country.Name;
      // population.innerHTML = c.country.Population;

      // if (c.capital) {
      //    capital.innerHTML = c.capital.Name;
      // }

      // capitalPopulation.innerHTML = c.capital.Population;

      // Languages
      cities.innerHTML = "";
      for (let i = 0; i < info.length; i++) {
         const c = info[i];

         let li = document.createElement("li");
         let text = document.createTextNode(c.Name + " (Population: "+ c.Population +")");
         li.appendChild(text);
         cities.appendChild(li);
      }

      // // Density
      // let dens = c.country.Population / c.country.SurfaceArea;
      // density.innerHTML = dens;

      // stateHead.innerHTML = c.country.HeadOfState;
   }
}


function uniq(a) {
   var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];

   return a.filter(function (item) {
      var type = typeof item;
      if (type in prims)
         return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
      else
         return objs.indexOf(item) >= 0 ? false : objs.push(item);
   });
}




window.addEventListener('load', getCountryList);       // kick off JS