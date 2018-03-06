function ready() {

      // Get list of countries and populate select
      let countryList;
      get("api.php?table=country").then(function(res){
            countryList = res;
      }, function(error) {
            console.error('CountryList : AJAX request failed!', error);
      })

      .then(function(s){
            console.log(countryList);
            let select = document.getElementById("select");

            countryList.forEach(country => {
                  let option = document.createElement("option");
                  let text = document.createTextNode(country.Name);
                  option.appendChild(text);
                  option.setAttribute("value", country.Code);
                  select.appendChild(option);
            });

            select.addEventListener("change", function (e) {
                  // Find country that was clicked
                  let country = countryList.filter(country => country.Code == select.value)[0];

                  let countryName = document.getElementById("country");
                  let population = document.getElementById("population");

                  countryName.innerHTML = country.Name;
                  population.innerHTML = country.Population;

                  getDistricts(country);
            });
      })

      
      function getDistricts(country) {
            get("api.php?table=city&column=CountryCode&value=" + country.Code).then(function (res) {
                  console.log(res);        
                  
                  let districtNames = res.map(d => (d != null) ? d.District : "");

                  let districts = uniq(districtNames);
                  console.log(districts);
                  
                  
                  let dSelect = document.getElementById('districtSelect');
                  dSelect.innerHTML = "";

                  let option = document.createElement("option");
                  let text = document.createTextNode("-- CHOOSE DISTRICT --");
                  option.appendChild(text);
                  dSelect.appendChild(option);

                  districts.forEach(district => {
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
                        let district = document.getElementById("district");
                        let districtPopulation = document.getElementById("districtPopulation");
                        let cities = document.getElementById("cities");

                        let chosenDistrict = e.target.value;

                        district.innerHTML = chosenDistrict;


                        // Languages
                        cities.innerHTML = "";

                        get("api.php?table=city&column=District&value=" + chosenDistrict).then(function (c) {
                              let pop = 0;
                              console.log(c);
                              

                              for (let i = 0; i < c.length; i++) {
                                    if (c[i]) {
                                          let ci = c[i];

                                          let li = document.createElement("li");
                                          let text = document.createTextNode(ci.Name + " (Population: " + ci.Population + ")");
                                          li.appendChild(text);
                                          cities.appendChild(li);

                                          pop = pop + parseInt(ci.Population);
                                    }
                              }
                              console.log(pop);
                              

                              districtPopulation.innerHTML = pop;
                        });



                        
                  });

            }, function (error) {
                  console.error('getCountry : AJAX request failed!', error);
            })
      }






}

window.addEventListener('load', ready);       // kick off JS










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




