
// Vanilla Javascript Ajax call
// SOURCE : https://codepen.io/PiotrBerebecki/pen/mEoApo?editors=1111

function get(url) {
   return new Promise(function (resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = function () {
         // This is called even on 404 etc
         // so check the status
         if (xhr.status == 200) {
            // Resolve the promise with the response text
            resolve(JSON.parse(xhr.response));
         } else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(xhr.statusText));
         }
      };

      // Handle network errors
      xhr.onerror = function () {
         reject(Error("Network Error"));
      };

      // Make the request
      xhr.send();
   });
}
