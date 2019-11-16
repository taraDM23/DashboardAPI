var cityInput = $("#addCity").val();
RenderItem();

//On click event that runs dashboard
$("#submit").on("click", function RenderOutput(event) {
  event.preventDefault();

  //Variable that combines the api url/key and the the objects
  var APIKey = "3c15afb4ab1a2a58e37adedc416048b5";
  var cityInput = $("#addCity").val();
  var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + ",AU&units=imperial&appid=" + APIKey;
  var queryURLNext = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + ",AU&units=imperial&appid=" + APIKey;

  //JS code that will get the current location and todays weather
  $.ajax({
    url: queryURLCurrent,
    method: "GET",
    statusCode: {
      404: function () {
        alert("Location not found. Please try again.");
      }
    }
  })

    .then(function (response) {

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
      var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
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

        .then(function (response) {
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

    .then(function (response) {
      console.log(response);
      console.log(cityInput)
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
        var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";

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

  if (cityInput) {

    var cityArray = [];
    cityArray.push(cityInput);
    console.log(cityArray);

    var storedItem = localStorage.getItem("city");

    if (storedItem == null) {
      localStorage.setItem("city", JSON.stringify(cityArray));
      $("#addCity").val();
    } else {
      storedItem = JSON.parse(storedItem);
      storedItem.push(cityInput);
      localStorage.setItem("city", JSON.stringify(storedItem));
      $("#addCity").val();
    }
  } else {
    alert("Please enter a location")
  }
})


function RenderItem() {
  var cityInLocalStorage = JSON.parse(localStorage.getItem("city"));

  if (cityInLocalStorage != null) {
    for (var i = 0; i < cityInLocalStorage.length; i++) {

      //create a btn element 
      var currentItem = cityInLocalStorage[i];
      console.log(currentItem)
      var btn = $("<button'>" + currentItem + "</button>").click(function forecastOnClick() {

        //Variable that combines the api url/key and the the objects

        var APIKey = "3c15afb4ab1a2a58e37adedc416048b5";
        var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentItem + ",AU&units=imperial&appid=" + APIKey;
        var queryURLNext = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentItem + ",AU&units=imperial&appid=" + APIKey;

        //JS code that will get the current location and todays weather
        $.ajax({

          url: queryURLCurrent,
          method: "GET",
          statusCode: {
            404: function () {
              alert("Location not found. Please try again.");
            }
          }
        })
          .then(function (response) {

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

            var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
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
              .then(function (response) {
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
          .then(function (response) {
            console.log(response);

            var ts = (Math.round((new Date()).getTime() / 1000) + 1);
            console.log(ts);
            var forecastArray = response.list
            for (var i = 7; i < forecastArray.length; i += 7) {

              //Div to store results  
              var resultsDiv = $("<div>");
              resultsDiv.addClass("forecast-day")

              //Show date
              var dt = forecastArray[i].dt_txt;
              dtCut = dt.substring(0, dt.length - 8);

              // Creating an element to show date
              var p0 = $("<p>").text(dtCut);
              // Creating an element to show date
              var p0 = $("<p>").text(dtCut);

              // Displaying the temp
              resultsDiv.append(p0);

              // Weather icon
              var forecastIcon = forecastArray[i].weather[0].icon;
              var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";

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
      });

      btn.addClass("btn");
      $("#searchHistory").append(btn);

    }
  }
}

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