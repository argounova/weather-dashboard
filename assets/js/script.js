var currentContainer = document.querySelector('ul');
var zipInput = document.getElementById('locInput').textContent;
var zip;
var areaName;
var lat;
var lon;
var country;
var userZipInput;
var requestGEO;
var requestURL;
const appid = '78bc832eeac2a213024b0c9cb066c83c';
const apiRootGeoURL = 'http://api.openweathermap.org/geo/1.0/zip?';
const apiRootURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiRootForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?'
const openWeaApi = 'https://api.openweathermap.org/data/3.0/onecall?';
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
        setParams();
        });
}

function setParams(){
    let paramsString = 'lat={lat}&lon={lon}&exclude={part}&appid={APIkey}';
    let searchParams = new URLSearchParams(paramsString);
    searchParams.set('lat', lat);
    searchParams.set('lon', lon);
    searchParams.set('exclude', `minutely,hourly,alerts`);
    searchParams.set('appid', appid);
    requestURL = openWeaApi+searchParams.toString();
    // console.log(requestURL);
    getWeather();
    // getForecast();
}

function getWeather(){
    fetch(requestURL)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            console.log(data);
            handleCurrent(data);
    });
}

function handleCurrent(data) {
    let newElement;
    let fTemp = Math.round(1.8 * (data.current.temp - 273) +32);
    let fTempFeels = Math.round(1.8 * (data.current.feels_like - 273) +32);
    let humidity = data.current.humidity;
    let skies = data.current.weather[0].main;
    let windSpd = ((data.current.wind_speed) * 1.150779).toFixed(1);

    // Create current city name
    newElement = document.createElement('h2');
    newElement.append(areaName);
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

function handleForecast(data) {
    for (var i = 1; i < 6; i++) {
        let newElement;
        let fTemp = Math.round(1.8 * (data.daily[i].temp.day - 273) +32);
        let fTempFeels = Math.round(1.8 * (data.daily[i].feels_like.day - 273) +32);
        let humidity = data.daily[i].humidity;
        let skies = data.daily[i].weather[0].main;
        let windSpd = ((data.daily[i].wind_speed) * 1.150779).toFixed(1);
    
        // Create forecasted temperature
        newElement = document.createElement('p');
        newElement.append('Temperature: '+fTemp+'\u00B0F');
        document.getElementById('currentCity').append(newElement);

        // Create forecasted 'feels like' temperature
        newElement = document.createElement('p');
        newElement.append('Feels like: '+fTempFeels+'\u00B0F');
        document.getElementById('currentCity').append(newElement);

        // Create forecasted humidity
        newElement = document.createElement('p');
        newElement.append('Humidity: '+humidity+'%');
        document.getElementById('currentCity').append(newElement);

        // Create forecasted skies
        newElement = document.createElement('p');
        newElement.append('Skies: '+skies);
        document.getElementById('currentCity').append(newElement);

        // Create forecasted wind speed
        newElement = document.createElement('p');
        newElement.append('Wind: '+windSpd+' mph');
        document.getElementById('currentCity').append(newElement);
    }
}