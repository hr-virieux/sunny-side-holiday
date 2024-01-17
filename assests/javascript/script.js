//Html elements
SubmitbuttonEL = $('#userFlightInfo');
FlightInforEL = $('.flight')


//Global Verables
var storageKey = 'sunny-side-holiday';
var flightAPIkey = 'aaf7bb072f23ce943f9f7d31de23e18a';

// Fetch  flight data from the API - Michael
// input - Api data
// output - data for our function FlightData / HTML(Form)
function apifetch_FlightData(userData) {
    var apiUrl = 'http://api.aviationstack.com/v1/flights?access_key='+flightAPIkey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data); //display weather datat on page
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to aviationstack.com');
        });
}

//fetch airport data - includes lats and longs of airport -/could also use (citties endpoint) *******************************could use with form data to autocomplete?
function apifetch_AirportData(userData) {
    var apiUrl = 'http://api.aviationstack.com/v1/airports?access_key='+flightAPIkey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data); //display weather datat on page
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to aviationstack.com');
        });
}


//event listener for submit button - Mark
//input - Click from the user
//output - call the next function down
SubmitbuttonEL.on("submit", function (event) {
    event.preventDefault();
    var formData = {};
    for(var i=0;i<event.currentTarget.length;i++)
    {
        console.log(event.currentTarget[i].id);
        var id = event.currentTarget[i].id; //get id of each form element
        if(id != "" && id!== undefined && id !== null)
        {
            var elementData=$('#'+id).val(); //get element data from form
            formData[id]=elementData; //add to the form data object
        }
    }

   // console.log(event);
   StoreFormToLocalStorage(formData);
   FlightInforEL.hide();
});

// Funtion for the flight data and fetch informaion and display information in HTML - mark
//input - user input (departure and arrival airport / flight number) (dates) 
//output - The data information fligth information, status  (HTML Display as outputs) 

// Fetch  Weather data from the API 
//input - user input (arrival airport / flight number) (dates) 
//output - The data information Current weather. (Display HTML as output)
function apifetch_WeatherData(location) {
    var apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data); //display weather datat on page
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to https://api.open-meteo.com');
        });
}
// Function for forcast - Mark
//input -  Current Day Weather AKA The data information Current weather.
//output - Future 5 days  forcast 


// Function storage previous Destination  - Mark
//input -  the users input 
//output - Saves it in Local Storage 
function StoreFormToLocalStorage(usrData) {
    var existingUserData = JSON.parse(localStorage.getItem(storageKey));
    if(existingUserData === undefined || existingUserData === null)
    {
        var existingUserData= {};
    }
    for(var i in usrData)
    {
        if(existingUserData[i]=== undefined || existingUserData[i] === null) //if no data already exisits
        {
            var tempArr = []; 
            existingUserData[i] = tempArr; //create array
        }
        existingUserData[i].push(usrData[i]); //store new value to end of array
    }
    localStorage.setItem(storageKey, JSON.stringify(existingUserData)); //send storage object to local storage
}

// Function display previous Destination  - Mark
//input -  Local Storage Pull 
//output - Users previous input of the (departure and arrival airport / flight number) (Display)
function getFromLocalStorage() {
    var userData = JSON.parse(localStorage.getItem(storageKey));
    for(var i in userData)
    {
        $('#'+i).attr('value',(userData[i][userData[i].length-1])); //update each element with last stored information 
    }

    return userData;
}

getFromLocalStorage() ;
var weatherData = apifetch_WeatherData();
var flightData = apifetch_FlightData();
//var airportData = apifetch_AirportData();