var currentContainer = document.getElementById('currentCity');
var zip;
var location;
var lat;
var lon;
var country;

var requestGEO = "http://api.openweathermap.org/geo/1.0/zip?zip=34668,US&appid=78bc832eeac2a213024b0c9cb066c83c";
// var requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={78bc832eeac2a213024b0c9cb066c83c}";

function getGeo(requestGEO){
    fetch(requestGEO)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        console.log(data);
            zip = data.zip;
            location = data.name;
            lat = data.lat;
            lon = data.lon;
            country = data.country;
        console.log(zip);
        console.log(location);
        console.log(lat);
        console.log(lon);
        console.log(country);
        });
}

// function getWeather(requestURL){
//     fetch(requestURL)
//         .then(function(response){
//         return response.json();
//         })
//         .then(function(data){
//         console.log(data);
        // for(var i = 0; i < data.lenth; i++){

            // var location = document.createElement('h1');
            // var temp = document.createElement('p');
            // var wind = document.createElement('p');
            // var humidity = document.createElement('p');
            // location.textContent = data[i].//insert location tag here//
            // temp.textContent = data[i].//insert temp tag here//
            // wind.textContent = data[i].//insert wind tag here//
            // humidity.textContent = data[i].//insert humidity tag here//
            // currentContainer.append(location);
            // currentContainer.append(temp);
            // currentContainer.append(wind);
            // currentContainer.append(humidity);
//         });       
// };

getGeo(requestGEO);
// getWeather(requestURL);