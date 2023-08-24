var apiKey="92c894d8c4d6ac5393a16f4554448193"
var titleEl=document.getElementById("title")
var tempEl=document.getElementById("temp")
var windEl=document.getElementById("wind")
var humilidtyEl=document.getElementById("humidity")
var searchBtn=document.getElementById("searchBtn")
var cityInput=document.getElementById("city-input")
var fivedayforecastEl=document.getElementById("fiveday-forestcast")

function searchCity(){
    var cityName=cityInput.value

    displayWeather(cityName)
}

function displayWeather(cityName){
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+"& units=imperial"

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        titleEl.innerHTML=currentData.name + dayjs.unix( currentData.dt).format(" (MM/DD/YYYY)")+ "<img src='https://openweathermap.org/img/wn/"+currentData.weather[0].icon+"@2x.png'>"
    })


    var forecastUrl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(forecastUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(forecastData){
        console.log(forecastData)
        // grab every 12pm for each day for 5 days
        var forecastListArr=forecastData.list
        
        for (let i = 3, j=1; i < forecastListArr.length;j++, i=i+8) {
            console.log(forecastListArr[i])
            var cardTitle=document.getElementById("card-title"+j)
            cardTitle.textContent= dayjs.unix(forecastListArr[i].dt).format(" (MM/DD/YYYY)")
        }
    })
}

searchBtn.addEventListener("click",searchCity)
