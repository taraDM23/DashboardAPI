var cityText = $("#addCity").val();
var cityArray = [cityText];

//On click event that runs dashboard
$("#submit").on("click", function RenderOutput(event) {
    event.preventDefault();

    //Variable that combines the api url/key and the the objects
    var APIKey = "3c15afb4ab1a2a58e37adedc416048b5";
    var cityText = $("#addCity").val();
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityText + ",AU&units=imperial&appid=" + APIKey;
    var queryURLNext = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + ",AU&units=imperial&appid=" + APIKey;

    //JS code that will get the current location and todays weather
    $.ajax({
            url: queryURLCurrent,
            method: "GET"
        })
        .then(function(response) {
            console.log(queryURLCurrent);
            console.log(response);

            // Show searched city name
            $("#cityName").text(response.name + " " + response.sys.country);
            //Show city temp
            var tempC = Math.round((response.main.temp - 32) * 5 / 9);
            $("#temp").text(" Temperature: " + tempC + "°(C)");
            //show todays date
            var dateCurrent = (dayName + " " + dayNum + "th " + month + " " + year);
            $("#dateCurrent").text(dateCurrent);
            //show humidity 
            var Humidity = response.main.humidity;
            $("#humidity").text(" Humidity: " + Humidity + "%");
            //show wind speed
            var wind = response.wind.speed;
            $("#wind").text(" Wind Speed: " + wind + "m/s");

            //Show weather icon
            var icon = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
            $("#iconCurrent").attr('src', iconURL);

            //Get UV index value 
            var lat = response.coord.lat;
            console.log(lat);
            var lon = response.coord.lon;
            console.log(lon);

            $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + lat + "&lon=" + lon,
                    method: "GET"
                })
                .then(function(response) {
                    console.log(response);
                    //Show UV index value
                    var UV = response.value;
                    $("#UV").text(" UV Index: " + UV);
                })
        })

    //JS code that will get the the next 5 days weather
    $.ajax({
            url: queryURLNext,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            console.log(cityText)
            var forecastArray = response.list
            console.log(forecastArray.length)
            var ts = (Math.round((new Date()).getTime() / 1000) + 1);
            console.log(ts);

            for (var i = 7; i < forecastArray.length; i += 7) {
                //Div to store results  
                var resultsDiv = $("<div>");
                resultsDiv.addClass("forecast-day")

                //Show date
                var dt = forecastArray[i].dt_txt;
                dtCut = dt.substring(0, dt.length - 8);

                // Creating an element to show date
                var p0 = $("<p>").text(dtCut);

                // Displaying the temp
                resultsDiv.append(p0);

                // Weather icon
                var forecastIcon = forecastArray[i].weather[0].icon;
                var forecastIconURL = "https://openweathermap.org/img/w/" + forecastIcon + ".png";

                // Creating an element to show image
                var image = $("<img>").attr("src", forecastIconURL);

                // Appending the image
                resultsDiv.append(image);

                //Forecast temp
                var forecastTemp = Math.round((forecastArray[i].main.temp - 32) * 5 / 9);
                console.log(forecastTemp)

                // Creating an element to show temp
                var p1 = $("<p>").text("Temperature: " + forecastTemp);

                // Displaying the temp
                resultsDiv.append(p1);

                // Forecast Humidity
                var forecastHumid = forecastArray[i].main.humidity;
                console.log(forecastHumid)

                // Creating an element to show humidity
                var p2 = $("<p>").text("Humidity: " + forecastHumid);

                // Displaying the humidity
                resultsDiv.append(p2);

                $("#dayAfter").append(resultsDiv);
            }
        })
})

function storeItem() {
    var storeItem = JSON.parse(localStorage.setItem('city', JSON.stringify(cityText)));
}

function retrieveItem() {
    var retrieveItem = localStorage.getItem('city');
}


function RenderItem() {
    for (var i = 0; i < cityArray.length; i++) {
        //create a btn element 
        var currentItem = cityArray[i];
        console.log(currentItem)
        var btn = document.createElement("button");
        btn.setAttribute("onclick", alert(blah));
        btn.textContent = currentItem;
        document.querySelector("#searchHistory").appendChild(li);
    }
}

/* 
$( document ).ready(function() {
    console.log( "ready!" );
}); 

function OnLoad() {
    //Store Location
    init()

    /* if (cityText === "") {
        return;
    } else { cityArray.push(cityText) }; 
    store();

}

//save to local storage
function init() {
    var storedCity = JSON.parse(localStorage.getItem("city"));
    /*  if (storedCity !== null) {
         cityArray = storedCity;
     }
     RenderLocation(); 
}

function store() {
    localStorage.setItem("city", JSON.stringify(cityText));
}

function RenderLocation() {
    for (var i = 0; i < cityArray.length; i++) {
        //create a li element 
        var currentItem = cityArray[i];
        var li = document.createElement("li");
        li.textContent = currentItem;
        document.querySelector("#searchHistory").appendChild(li);
    }
}

*/

//date
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var d = new Date();
var dayName = days[d.getDay()];
var month = month[d.getMonth()];
var dayNum = d.getDate();
var year = d.getFullYear();



/*  * Include a search history so that users can access their past 
search terms. Clicking on the city name should perform a new 
search that returns current and future conditions for that city. */