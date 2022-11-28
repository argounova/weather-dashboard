let areaName = '';
let lat = '';
let lon = '';
let userInput = '';
let requestGEO = '';
let requestURL = '';
let requestIcon = '';
let srchHist = [];
const appid = '78bc832eeac2a213024b0c9cb066c83c';
const apiRootZipURL = 'https://api.openweathermap.org/geo/1.0/zip?';
const apiRootLocURL = 'https://api.openweathermap.org/geo/1.0/direct?';
const openWeaApi = 'https://api.openweathermap.org/data/3.0/onecall?';
let iconIdURL = 'https://openweathermap.org/img/wn/';
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

function setIconParams(iconId){
    let paramsString = `${iconId}@2x.png`;
    requestIcon = iconIdURL+paramsString.toString();
    return requestIcon;
}

function getWeather(){
    fetch(requestURL)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            console.log(data);
            handleCurrent(data);
            handleForecast(data);
    });
}

function handleCurrent(data) {
    const date = new Date();
    let newElement;
    let fTemp = Math.round(1.8 * (data.current.temp - 273) +32);
    let fTempFeels = Math.round(1.8 * (data.current.feels_like - 273) +32);
    let humidity = data.current.humidity;
    let skies = data.current.weather[0].main;
    let windSpd = ((data.current.wind_speed) * 1.150779).toFixed(1);
    let iconId = data.current.weather[0].icon;

    setIconParams(iconId);

    // Create current weather card
    newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'currentWC col');
    newDiv.setAttribute('id', 'currentWC');
    document.getElementById('currentCity').append(newDiv);

    // Create current city name
    newElement = document.createElement('h2');
    newElement.setAttribute('id', 'iconId')
    newElement.append(areaName);
    document.getElementById('currentWC').append(newElement);

    // Create weather icon
    newElement = document.createElement('img');
    newElement.setAttribute('src', requestIcon);
    let span = document.createElement('span');
    span.append(newElement);
    document.getElementById('iconId').append(span);

    // Create date
    newElement = document.createElement('h4');
    newElement.append(date.toDateString());
    document.getElementById('currentWC').append(newElement);

    // Create current city temperature
    newElement = document.createElement('p');
    newElement.append('Temperature: '+fTemp+'\u00B0F');
    document.getElementById('currentWC').append(newElement);

    // Create current city 'feels like' temperature
    newElement = document.createElement('p');
    newElement.append('Feels like: '+fTempFeels+'\u00B0F');
    document.getElementById('currentWC').append(newElement);

    // Create current city humidity
    newElement = document.createElement('p');
    newElement.append('Humidity: '+humidity+'%');
    document.getElementById('currentWC').append(newElement);

    // Create current city skies
    newElement = document.createElement('p');
    newElement.append('Skies: '+skies);
    document.getElementById('currentWC').append(newElement);

    // Create current city wind speed
    newElement = document.createElement('p');
    newElement.append('Wind: '+windSpd+' mph');
    document.getElementById('currentWC').append(newElement);

    // Add button for current search under recent searches
    // This same button will be created from local storage if/when the page is reloaded
    let x = document.createElement('button');
        x.innerHTML = areaName;
        x.innerHTML = x.innerHTML.toLowerCase();
        x.setAttribute('id', areaName);
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

function handleForecast(data) {
    for (var i = 1; i < 6; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        let day = tomorrow.getDate();
        let month = tomorrow.getMonth() + 1;
        let year = tomorrow.getFullYear();
        let newDiv = '';
        let newElement = '';
        let fTemp = Math.round(1.8 * (data.daily[i].temp.day - 273) +32);
        let fTempFeels = Math.round(1.8 * (data.daily[i].feels_like.day - 273) +32);
        let humidity = data.daily[i].humidity;
        let skies = data.daily[i].weather[0].main;
        let windSpd = ((data.daily[i].wind_speed) * 1.150779).toFixed(1);
        let iconId = data.daily[i].weather[0].icon;

        setIconParams(iconId);

        // Create card
        newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'forecastCard col');
        newDiv.setAttribute('id', i);
        document.getElementById('forecast').append(newDiv);

        // Create title div
        newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'title' + i);
        newDiv.setAttribute('style', 'display: flex');
        newDiv.setAttribute('style', 'width: 100%;');
        document.getElementById(i).append(newDiv);

        // Create date
        newElement = document.createElement('h5');
        newElement.setAttribute('id', 'iconId' + i);
        newDiv.setAttribute('style', 'align-items: center;');
        newElement.append(`${month}/${day}/${year}`);
        document.getElementById('title' + i).append(newElement);

        // Create weather icon
        newElement = document.createElement('img');
        newElement.setAttribute('src', requestIcon);
        newElement.setAttribute('style', 'float: right;')
        newDiv.setAttribute('style', 'align-items: center;');
        let span = document.createElement('span');
        span.append(newElement);
        document.getElementById('iconId' + i).append(span);

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