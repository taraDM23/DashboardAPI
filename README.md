# Weather Dashboard
#### Description
This application is a dashboard to search and display weather. The user can input a location and the dashboard will display its current temperature, humidity, UV and wind speeds. Additionally a five day forecast and also be viewed. Search history will be stored in the local browser storage and can be viewed on the dashboard.

The focus point of this application is the use of third-party API's. Specifically https://openweathermap.org/api.
The 
Javascript and Jquery DOM, local browser storage, API and click events methodologies.
Additionally, twitter bootstrap and custom css were used to provide the user interface and responsiveness of the application.

#### Steps to use:
1. Type in a city that you want to check the weather of.
2. Click the search button or hit enter.
3. If you are searching for a city outside Australia - Type in the city followed by a comma. Then add the county code. 
    e.g. Boston, US. Please see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for further information.
4. Once search history has been entered it will be added to your past searches for easy access. 
5. You can simply click on the city name and the current weather data will be displayed on your dashboard.


#### Languages used:
* HTML and CSS
* Javascript
* Jquery

#### Technologies used:
* Live weather is brought to you via https://openweathermap.org/api.

#### Tests:

##### Responsiveness and CSS per browser
* Chrome browser - base line requirements
* Firefox browser
** Responsiveness - pass
** API calls - pass
** No UI change - pass
** Save to LS - pass
** Browser variations - n/a

* Edge
** API calls - pass
** No UI change - pass
** Save to LS - pass
** Browser variations - n/a

* Android mobile chrome
** API calls - pass
** No UI change - pass
** Save to LS - pass
** Browser variations - n/a


##### UX Limitations:
* If you wish to clear the weather search history, you will need to clear your local browsers storage. 
  See https://developers.google.com/web/tools/chrome-devtools/storage/localstorage#deleteall 
* Your saved history can only be viewed on one local browser. If link is accessed in another browser ou will be presented with a fresh dashboard.

#### Code test:
HTML was verified via https://validator.w3.org/nu/ 


#### Authors
Tara de Mel

#### Acknowledgments
Monash coding Bootcamp academic staff
