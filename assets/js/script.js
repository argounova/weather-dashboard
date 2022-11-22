let areaName = '';
let lat = '';
let lon = '';
let userInput = '';
let requestGEO = '';
let requestURL = '';
let srchHist = [];
const appid = '78bc832eeac2a213024b0c9cb066c83c';
const apiRootZipURL = 'http://api.openweathermap.org/geo/1.0/zip?';
const apiRootLocURL = 'http://api.openweathermap.org/geo/1.0/direct?';
const openWeaApi = 'https://api.openweathermap.org/data/3.0/onecall?';
const searchBtn = document.getElementById('button-addon2');
const searchIpt = document.getElementById('locInput');

function init(){
    if (localStorage.getItem('city') === null) {
        return;
    } else {
        srchHist = JSON.parse(localStorage.getItem('city')).slice(0,6);
        let h3Tag = document.createElement('h3')
        let txtNode = document.createTextNode('Recent Searches');
        h3Tag.append(txtNode);
        document.getElementById('recentSearch').append(h3Tag);
            for (i = 0; i < srchHist.length; i++){
            let x = document.createElement('button');
            x.innerHTML = srchHist[i];
            x.innerHTML = x.innerHTML.toLowerCase();
            x.setAttribute('id', srchHist[i]);
            x.setAttribute('type','button');
            x.setAttribute('class','recentSrchBtn');
            x.addEventListener('click', function() {
                $('#currentCity').html('');
                $('#forecast').html('');
                userInput = x.innerHTML;
                setLocParams(userInput);
                });
            document.getElementById('recentSearch').append(x);
        }
    }
}

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    $('#currentCity').html('');
    $('#forecast').html('');
    userInput = $('input#locInput').val();
    if (!isNaN(userInput)) {
        setZipParams();
    } else if (isNaN(userInput)) {
        setLocParams();
    }
    srchHist.unshift(userInput);
    localStorage.setItem('city', JSON.stringify(srchHist));
});

searchIpt.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        $('#currentCity').html('');
        $('#forecast').html('');
        userInput = $('input#locInput').val();
        if (!isNaN(userInput)) {
            setZipParams();
        } else if (isNaN(userInput)) {
            setLocParams();
        }
        srchHist.unshift(userInput);
        localStorage.setItem('city', JSON.stringify(srchHist));
    }
});

function setZipParams() {
    let paramsString = 'zip={zip},US&appid=78bc832eeac2a213024b0c9cb066c83c';
    let searchParams = new URLSearchParams(paramsString);
    searchParams.set('zip', userInput.trim());
    requestGEO = apiRootZipURL+searchParams.toString();
    getGeoZip(requestGEO);
}

function setLocParams() {
    let paramsString = 'q={city name},US&appid=78bc832eeac2a213024b0c9cb066c83c';
    let searchParams = new URLSearchParams(paramsString);
    searchParams.set('q', userInput.trim());
    requestGEO = apiRootLocURL+searchParams.toString();
    getGeoLoc(requestGEO);
}

function getGeoZip(requestGEO){
    fetch(requestGEO)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        areaName = data.name;
        lat = data.lat;
        lon = data.lon;
        setParams();
        });
}

function getGeoLoc(requestGEO){
    fetch(requestGEO)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        areaName = data[0].name;
        lat = data[0].lat;
        lon = data[0].lon;
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
    getWeather();
}

function getWeather(){
    fetch(requestURL)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            handleCurrent(data);
            handleForecast(data);
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
        let newElementID = i;
        let newDiv = '';
        let newElement = '';
        let fTemp = Math.round(1.8 * (data.daily[i].temp.day - 273) +32);
        let fTempFeels = Math.round(1.8 * (data.daily[i].feels_like.day - 273) +32);
        let humidity = data.daily[i].humidity;
        let skies = data.daily[i].weather[0].main;
        let windSpd = ((data.daily[i].wind_speed) * 1.150779).toFixed(1);

        // Create card
        newDiv = document.createElement('div');
        document.getElementById('forecast').append(newDiv);
        newDiv.setAttribute('class', 'forecastCard col');
        newDiv.setAttribute('id', i);
    
        // Create forecasted temperature
        newElement = document.createElement('p');
        newElement.append('Temperature: '+fTemp+'\u00B0F');
        document.getElementById(i).append(newElement);

        // Create forecasted 'feels like' temperature
        newElement = document.createElement('p');
        newElement.append('Feels like: '+fTempFeels+'\u00B0F');
        document.getElementById(i).append(newElement);

        // Create forecasted humidity
        newElement = document.createElement('p');
        newElement.append('Humidity: '+humidity+'%');
        document.getElementById(i).append(newElement);

        // Create forecasted skies
        newElement = document.createElement('p');
        newElement.append('Skies: '+skies);
        document.getElementById(i).append(newElement);

        // Create forecasted wind speed
        newElement = document.createElement('p');
        newElement.append('Wind: '+windSpd+' mph');
        document.getElementById(i).append(newElement);
    }
}

init();