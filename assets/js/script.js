var currentContainer = document.getElementById('currentCity');
var zipInput = document.getElementById('locInput').textContent;
var zip;
var areaName;
var lat;
var lon;
var country;
var userZipInput;
var requestGEO;
var apiRootURL = 'http://api.openweathermap.org/geo/1.0/zip?';
var requestGEO;
// var requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={78bc832eeac2a213024b0c9cb066c83c}";
var x;

$('input').keyup(function(e){
    e.preventDefault();
    userZipInput = $('input#locInput').val();
});

$('#button-addon2').click(function setZip(){
    var paramsString ='zip=34668,US&appid=78bc832eeac2a213024b0c9cb066c83c';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('zip', userZipInput);
    x = searchParams.toString();
    requestGEO = apiRootURL+x;
    console.log(requestGEO);
    getGeo(requestGEO);
});

function getGeo(requestGEO){
    fetch(requestGEO)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        // console.log(data);
        zip = data.zip;
        areaName = data.name;
        lat = data.lat;
        lon = data.lon;
        country = data.country;
        console.log(zip);
        console.log(areaName);
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
// $('input').keyup(function(e){
//     e.preventDefault();
//     console.log(e.target.value);
//     userZipInput = $('input#locInput').val();
//     console.log(userZipInput);
// });

// getGeo(requestGEO);
// getWeather(requestURL);