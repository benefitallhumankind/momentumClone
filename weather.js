const weather = document.querySelector(".js-weather");
let linkSwitch = 0;

const API_KEY = "f433cb56a81b9ec66f0d9b9ea7503521";
const COORDS = 'coords';
let place;

function goToWeather(){
	if(linkSwitch == 1){
		window.open(`https://openweathermap.org/find?q=${place}`,'newWindow');
	}else{
		return false;
	}
}
function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const weatherMain = json.weather[0].main;
        const weatherIcon = json.weather[0].icon;
        const temperature = json.main.temp;
        place = json.name;

        weather.innerHTML = `<p class="weatherIcon">
        <img src = "https://openweathermap.org/img/w/${weatherIcon}.png" />
        </p>
        <p class="weatherInfo" title="${place}">${temperature}℃<span class="location">${place}</span></p>`;
        weather.setAttribute("title",`${weatherMain}`);
    });
	weather.style.cursor = 'pointer';
	linkSwitch = 1;
}
function saveCoords(coordsObj){ //로컬스토리지에 위도, 경도를 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    weather.innerHTML = "Can't access your location";
	linkSwitch = 0;
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();