var currentContainer = document.getElementById('currentCity');
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
var apiRootURL = 'http://api.openweathermap.org/data/2.5/forecast?';
var requestURL;

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
    console.log(requestURL);
}