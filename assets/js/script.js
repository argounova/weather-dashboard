var requestGEO = "http://api.openweathermap.org/geo/1.0/zip?zip=34668,US&appid={78bc832eeac2a213024b0c9cb066c83c}";
// var requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={78bc832eeac2a213024b0c9cb066c83c}";

function getGeo(requestGEO){
    fetch(requestGEO)
        .then(function(response){
        console.log(response);
        return response.json();
    });
}


// fetch(requestURL)
//     then(function(response){
//         return response.json();
//     });
//     then(function(data){
//         console.log(data);
//     });

getGeo(requestGEO);