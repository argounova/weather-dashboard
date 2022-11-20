var currentContainer = document.querySelector('ul');
var zipInput = document.getElementById('locInput').textContent;
var zip;
var areaName;
var lat;
var lon;
var country;
var userZipInput;
var requestGEO;
var apiRootGeoURL = 'http://api.openweathermap.org/geo/1.0/zip?';
var requestGEO;
var apiRootURL = 'http://api.openweathermap.org/data/2.5/weather?';
var requestURL;
// const dt = DateTime.local();

$('input').keyup(function(e){
    e.preventDefault();
    userZipInput = $('input#locInput').val();
});

$('#button-addon2').click(function setZip(){
    var paramsString = 'zip={zip},US&appid=78bc832eeac2a213024b0c9cb066c83c';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('zip', userZipInput);
    var x = searchParams.toString();
    requestGEO = apiRootGeoURL+x;
    // console.log(requestGEO);
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
        // console.log(zip);
        // console.log(areaName);
        // console.log(lat);
        // console.log(lon);
        // console.log(country);
        setLatLon();
        });
}

function setLatLon(){
    var paramsString = 'lat={lat}&lon={lon}&appid=78bc832eeac2a213024b0c9cb066c83c';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('lat', lat);
    searchParams.set('lon', lon);
    var x = searchParams.toString();
    requestURL = apiRootURL+x;
    // console.log(requestURL);
    getWeather();
}

function getWeather(){
    fetch(requestURL)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            handleCurrent(data);
            // console.log(data);
        //     for (var i = 0; i < data.length; i++) {
        //     var temperature = document.createElement('li');
        //     temperature.textContent = data[i].list[0].main.temp;
        //     console.log(temperature);
        //     currentContainer.appendChild(temperature);    
        // }
    });
}

function handleCurrent(data) {
    let newElement;
    let cityName = data.name;
    let fTemp = Math.round(1.8 * (data.main.temp - 273) +32);
    let fTempFeels = Math.round(1.8 * (data.main.feels_like - 273) +32);
    let humidity = data.main.humidity;
    let skies = data.weather[0].description;
    let windSpd = ((data.wind.speed) * 1.150779).toFixed(1);

    // Create current city name
    newElement = document.createElement('h2');
    newElement.append(cityName);
    document.getElementById('currentCity').append(newElement);

    // Create current city temperature
    newElement = document.createElement('p');
    newElement.append('Temperature: '+fTemp+'\u00B0F');
    document.getElementById('currentCity').append(newElement);

    // Create current city 'feels like' temperature
    newElement = document.createElement('p');
    newElement.append('Feels like: '+fTempFeels+'\u00B0F');
    document.getElementById('currentCity').append(newElement);

    // Create current city humidity
    newElement = document.createElement('p');
    newElement.append('Humidity: '+humidity+'%');
    document.getElementById('currentCity').append(newElement);

    // Create current city skies
    newElement = document.createElement('p');
    newElement.append('Skies: '+skies);
    document.getElementById('currentCity').append(newElement);

    // Create current city wind speed
    newElement = document.createElement('p');
    newElement.append('Wind: '+windSpd+' mph');
    document.getElementById('currentCity').append(newElement);
}