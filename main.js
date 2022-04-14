// add an event listener to the enter key
const searchbox = document.querySelector('#search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getWeather(searchbox.value);
    }
}


//fetch weather api
function getWeather () {
    if (!searchbox.value) {
        searchbox.value = localStorage.getItem("city");
    } else {
        localStorage.setItem("city", searchbox.value);
    }
    var url = new URL('https://api.weatherapi.com/v1/current.json');
    //add parameter q to the URL
    var params = {q: searchbox.value};
    url.search = new URLSearchParams(params).toString();

    fetch(url, {
        headers: {
          'key':'227f0e858b4a4b56a81112251220103',
        },
    })
    //parse what the api returns using the js json() function
    .then (response => response.json())
    .then (displayResults);
}


// call function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
})

function displayResults (response) {
    document.querySelector('.location .city').innerText = `${response.location.name}, ${response.location.country}`;
    document.querySelector('.current .weather-icon').src = response.current.condition.icon;
    document.querySelector('.weather-indication').innerText = response.current.condition.text;
    document.querySelector('.today-temp').innerText = `${response.current.temp_c}°c`;
    document.querySelector('.temp-feel').innerText = `Feels like ${response.current.feelslike_c}°c`;
    document.querySelector('.date').innerText = getDate();
}

function getDate () {
    let today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    return date;
}


