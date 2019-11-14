//On click event that runs dashboard
$("#submit").on("click", function(event) {
    event.preventDefault();

    //Variable that combines the api url/key and the the objects
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    let location = $("#addCity").val();
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + location + ",AU&units=imperial&appid=" + APIKey;
    var queryURLNext = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + ",AU&units=imperial&appid=" + APIKey;

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
            $("#humidity").text(" Humidity: " + Humidity);
            //show wind speed
            var wind = response.wind.speed;
            $("#wind").text(" Wind Speed: " + wind + "m/s");

            //Show weather icon

            //Get UV index value 
            var lat = response.coord.lat;
            console.log(lat);
            var lon = response.coord.lon;
            console.log(lon);

            $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + lat + "&lon=" + lon,
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
            console.log(queryURLNext);
            console.log(response);
            console.log(location)

            /* 

    var tempC = Math.round((response.main.temp - 32) * 5 / 9);
    $("#temp").text(" Temperature: " + tempC + "°(C)");
    console.log(tempC)
    var dateCurrent = (dayName + " " + dayNum + "th " + month + " " + year);
    $("#dateCurrent").text(dateCurrent);
    var Humidity = response.main.humidity;
    $("#humidity").text(" Humidity: " + Humidity); */

        })

})

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




/* * Include a 5-Day Forecast below the current weather conditions. 
Each day for the 5-Day Forecast should display the following:

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity
 */




/*  * Include a search history so that users can access their past 
search terms. Clicking on the city name should perform a new 
search that returns current and future conditions for that city. */