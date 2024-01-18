//Html elements
SubmitbuttonEL = $('#userFlightInfo');
FlightInforEL = $('.flight')


//Global Verables
var storageKey = 'sunny-side-holiday';

// Fetch  flight data from the API - Michael
// input - Api data
// output - data for our function FlightData / HTML(Form)

//event listener for submit button - Mark
//input - Click from the user
//output - call the next function down
SubmitbuttonEL.on("submit", function (event) {
    event.preventDefault();
    var formData = {};
    for (var i = 0; i < event.currentTarget.length; i++) {
        console.log(event.currentTarget[i].id);
        var id = event.currentTarget[i].id; //get id of each form element
        if (id != "" && id !== undefined && id !== null) {
            var elementData = $('#' + id).val(); //get element data from form
            formData[id] = elementData; //add to the form data object
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


// Function for forcast - Mark
//input -  Current Day Weather AKA The data information Current weather.
//output - Future 5 days  forcast -


// Function storage previous Destination  - Mark
//input -  the users input 
//output - Saves it in Local Storage 
function StoreFormToLocalStorage(usrData) {
    var existingUserData = JSON.parse(localStorage.getItem(storageKey));
    if (existingUserData === undefined || existingUserData === null) {
        var existingUserData = {};
    }
    for (var i in usrData) {
        if (existingUserData[i] === undefined || existingUserData[i] === null) //if no data already exisits
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
    for (var i in userData) {
        $('#' + i).attr('value', (userData[i][userData[i].length - 1])); //update each element with last stored information 
    }

    return userData;
}

getFromLocalStorage();


var TestData_Flights = {


};

var TestData_Weather1 = {
    "latitude": -37.75, "longitude": 144.875, "generationtime_ms": 1.1860132217407227, "utc_offset_seconds": 39600, "timezone": "Australia/Sydney", "timezone_abbreviation": "AEDT", "elevation": 19.0, "current_units": { "time": "unixtime", "interval": "seconds", "temperature_2m": "°C", "relative_humidity_2m": "%", "apparent_temperature": "°C", "is_day": "", "precipitation": "mm", "rain": "mm", "showers": "mm", "snowfall": "cm", "weather_code": "wmo code", "cloud_cover": "%", "pressure_msl": "hPa", "surface_pressure": "hPa", "wind_speed_10m": "km/h", "wind_direction_10m": "°", "wind_gusts_10m": "km/h" }, "current": { "time": 1705397400, "interval": 900, "temperature_2m": 29.0, "relative_humidity_2m": 45, "apparent_temperature": 28.8, "is_day": 1, "precipitation": 0.00, "rain": 0.00, "showers": 0.00, "snowfall": 0.00, "weather_code": 0, "cloud_cover": 0, "pressure_msl": 1005.0, "surface_pressure": 1002.8, "wind_speed_10m": 14.4, "wind_direction_10m": 4, "wind_gusts_10m": 38.9 }, "hourly_units": { "time": "unixtime", "temperature_2m": "°C", "relative_humidity_2m": "%", "dew_point_2m": "°C", "apparent_temperature": "°C", "precipitation_probability": "%", "precipitation": "mm", "rain": "mm", "showers": "mm", "snowfall": "cm", "snow_depth": "m", "weather_code": "wmo code", "pressure_msl": "hPa", "surface_pressure": "hPa", "cloud_cover": "%", "cloud_cover_low": "%", "cloud_cover_mid": "%", "cloud_cover_high": "%", "visibility": "m", "evapotranspiration": "mm", "et0_fao_evapotranspiration": "mm", "vapour_pressure_deficit": "kPa", "wind_speed_10m": "km/h", "wind_speed_80m": "km/h", "wind_speed_120m": "km/h", "wind_speed_180m": "km/h", "wind_direction_10m": "°", "wind_direction_80m": "°", "wind_direction_120m": "°", "wind_direction_180m": "°", "wind_gusts_10m": "km/h", "temperature_80m": "°C", "temperature_120m": "°C", "temperature_180m": "°C", "soil_temperature_0cm": "°C", "soil_temperature_6cm": "°C", "soil_temperature_18cm": "°C", "soil_temperature_54cm": "°C", "soil_moisture_0_to_1cm": "m³/m³", "soil_moisture_1_to_3cm": "m³/m³", "soil_moisture_3_to_9cm": "m³/m³", "soil_moisture_9_to_27cm": "m³/m³", "soil_moisture_27_to_81cm": "m³/m³", "uv_index": "", "uv_index_clear_sky": "", "is_day": "", "cape": "J/kg", "freezing_level_height": "m", "sunshine_duration": "s", "shortwave_radiation": "W/m²", "direct_radiation": "W/m²", "diffuse_radiation": "W/m²", "direct_normal_irradiance": "W/m²", "terrestrial_radiation": "W/m²", "shortwave_radiation_instant": "W/m²", "direct_radiation_instant": "W/m²", "diffuse_radiation_instant": "W/m²", "direct_normal_irradiance_instant": "W/m²", "terrestrial_radiation_instant": "W/m²" }, "hourly": { "time": [1705395600, 1705399200, 1705402800, 1705406400, 1705410000, 1705413600, 1705417200, 1705420800, 1705424400, 1705428000, 1705431600, 1705435200, 1705438800, 1705442400, 1705446000, 1705449600, 1705453200, 1705456800, 1705460400, 1705464000, 1705467600, 1705471200, 1705474800, 1705478400], "temperature_2m": [29.8, 28.3, 27.1, 26.2, 25.5, 24.6, 23.6, 23.0, 22.8, 22.6, 22.5, 22.6, 22.4, 19.9, 18.7, 19.6, 19.9, 20.2, 20.1, 19.4, 20.0, 20.3, 19.2, 18.7], "relative_humidity_2m": [42, 48, 53, 58, 62, 68, 75, 78, 79, 79, 80, 80, 85, 85, 86, 73, 68, 69, 70, 68, 65, 64, 68, 67], "dew_point_2m": [15.5, 16.2, 16.7, 17.3, 17.7, 18.3, 18.9, 19.0, 18.9, 18.8, 18.9, 18.9, 19.7, 17.3, 16.3, 14.6, 13.8, 14.3, 14.4, 13.3, 13.2, 13.3, 13.2, 12.4], "apparent_temperature": [29.3, 28.5, 27.6, 26.8, 26.4, 25.0, 24.4, 23.6, 23.2, 23.4, 23.7, 23.8, 24.6, 19.4, 19.8, 18.9, 19.1, 19.8, 19.6, 18.4, 19.4, 19.9, 18.1, 17.6], "precipitation_probability": [0, 12, 23, 35, 44, 52, 61, 61, 61, 61, 73, 85, 97, 98, 99, 100, 91, 83, 74, 55, 35, 16, 16, 16], "precipitation": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.00, 5.70, 7.30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "rain": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.20, 3.50, 5.10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "showers": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.90, 2.20, 2.20, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "snowfall": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "snow_depth": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "weather_code": [0, 1, 1, 3, 3, 1, 1, 2, 2, 3, 3, 3, 95, 63, 63, 3, 3, 3, 3, 3, 2, 2, 2, 2], "pressure_msl": [1004.9, 1005.2, 1005.3, 1005.9, 1005.5, 1005.4, 1004.8, 1004.1, 1003.0, 1003.2, 1003.2, 1003.8, 1004.1, 1004.8, 1005.2, 1005.0, 1005.1, 1005.1, 1004.8, 1004.4, 1003.7, 1003.5, 1003.9, 1004.6], "surface_pressure": [1002.7, 1003.0, 1003.1, 1003.7, 1003.3, 1003.2, 1002.6, 1001.9, 1000.8, 1001.0, 1001.0, 1001.6, 1001.9, 1002.6, 1003.0, 1002.8, 1002.9, 1002.9, 1002.6, 1002.2, 1001.5, 1001.3, 1001.7, 1002.4], "cloud_cover": [0, 41, 29, 100, 100, 43, 38, 69, 81, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 92, 60, 53, 66, 73], "cloud_cover_low": [0, 0, 0, 0, 0, 0, 38, 46, 45, 48, 50, 79, 84, 90, 79, 96, 100, 91, 100, 92, 60, 53, 66, 73], "cloud_cover_mid": [0, 41, 28, 29, 33, 29, 0, 6, 63, 45, 49, 51, 89, 100, 96, 79, 61, 60, 0, 0, 0, 0, 0, 0], "cloud_cover_high": [0, 0, 2, 100, 100, 16, 0, 39, 0, 100, 100, 100, 100, 100, 100, 100, 100, 96, 0, 0, 0, 0, 0, 0], "visibility": [24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 13860.00, 18840.00, 14740.00, 3980.00, 5000.00, 13560.00, 23520.00, 19440.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00, 24140.00], "evapotranspiration": [0.15, 0.10, 0.08, 0.06, 0.06, 0.05, 0.04, 0.03, 0.03, 0.03, 0.03, 0.03, 0.05, 0.08, 0.11, 0.10, 0.13, 0.13, 0.14, 0.15, 0.15, 0.19, 0.17, 0.13], "et0_fao_evapotranspiration": [0.24, 0.14, 0.09, 0.08, 0.07, 0.08, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.06, 0.05, 0.16, 0.21, 0.23, 0.30, 0.28, 0.33, 0.38, 0.29, 0.18], "vapour_pressure_deficit": [2.43, 2.00, 1.68, 1.43, 1.24, 0.99, 0.73, 0.62, 0.58, 0.58, 0.55, 0.55, 0.41, 0.35, 0.30, 0.61, 0.74, 0.73, 0.70, 0.72, 0.82, 0.86, 0.71, 0.71], "wind_speed_10m": [15.8, 13.4, 12.1, 13.0, 13.0, 18.0, 17.6, 18.8, 19.8, 17.0, 14.8, 14.3, 10.1, 21.1, 7.7, 15.1, 14.4, 12.3, 13.3, 13.6, 11.2, 13.3, 14.8, 12.8], "wind_speed_80m": [31.0, 29.2, 28.4, 29.6, 28.8, 36.7, 35.3, 37.5, 40.0, 34.1, 30.4, 29.5, 22.0, 36.1, 14.7, 25.7, 23.2, 19.0, 18.8, 19.1, 14.4, 17.5, 20.9, 18.9], "wind_speed_120m": [34.6, 35.0, 35.1, 37.1, 35.6, 42.5, 41.4, 43.2, 46.1, 39.6, 35.5, 34.4, 27.0, 38.2, 17.9, 26.7, 24.0, 19.7, 19.2, 19.4, 14.8, 17.9, 21.3, 19.3], "wind_speed_180m": [36.7, 40.0, 44.0, 46.1, 42.5, 47.2, 46.6, 48.6, 51.6, 44.7, 40.6, 39.8, 32.7, 39.6, 24.8, 27.0, 24.8, 20.1, 19.2, 19.8, 14.8, 18.0, 21.2, 19.6], "wind_direction_10m": [1, 6, 12, 6, 360, 2, 360, 3, 359, 354, 354, 342, 343, 233, 242, 232, 233, 212, 183, 169, 159, 167, 183, 190], "wind_direction_80m": [2, 4, 9, 3, 359, 2, 358, 2, 358, 353, 355, 342, 345, 234, 239, 233, 234, 213, 184, 169, 158, 166, 182, 189], "wind_direction_120m": [2, 3, 6, 2, 359, 1, 358, 0, 357, 353, 354, 342, 344, 234, 236, 233, 234, 215, 185, 169, 157, 165, 182, 189], "wind_direction_180m": [2, 2, 4, 0, 359, 0, 356, 360, 356, 352, 354, 342, 343, 236, 229, 233, 234, 216, 186, 170, 157, 164, 181, 187], "wind_gusts_10m": [38.9, 34.9, 28.8, 27.7, 28.4, 39.6, 40.7, 41.4, 43.9, 43.9, 36.7, 32.0, 34.9, 46.4, 47.5, 34.2, 34.2, 32.4, 32.0, 33.5, 31.7, 31.7, 34.9, 34.2], "temperature_80m": [29.0, 28.1, 27.0, 26.1, 25.3, 24.0, 22.9, 22.3, 22.1, 22.0, 21.9, 21.9, 21.6, 18.6, 17.6, 18.1, 18.2, 18.3, 17.9, 17.2, 17.7, 17.9, 17.0, 16.9], "temperature_120m": [28.3, 27.5, 26.5, 25.6, 24.8, 23.3, 22.3, 21.7, 21.5, 21.4, 21.2, 21.3, 21.0, 17.9, 16.9, 17.3, 17.4, 17.6, 17.1, 16.5, 17.0, 17.1, 16.2, 16.2], "temperature_180m": [27.5, 26.8, 25.9, 25.0, 24.2, 22.5, 21.5, 21.0, 20.8, 20.6, 20.5, 20.5, 20.3, 17.1, 16.3, 16.4, 16.5, 16.7, 16.2, 15.6, 16.1, 16.2, 15.3, 15.3], "soil_temperature_0cm": [28.1, 25.9, 25.0, 24.5, 24.1, 23.6, 22.8, 22.5, 22.2, 22.0, 22.0, 22.4, 22.4, 20.3, 19.7, 21.8, 23.1, 23.8, 25.3, 23.5, 26.8, 26.4, 23.2, 20.9], "soil_temperature_6cm": [29.5, 28.2, 27.0, 26.1, 25.4, 24.9, 24.5, 24.0, 23.6, 23.3, 23.1, 23.0, 23.0, 22.8, 21.9, 21.8, 22.2, 22.6, 23.4, 23.7, 24.0, 24.7, 24.7, 23.7], "soil_temperature_18cm": [25.3, 25.5, 25.5, 25.5, 25.4, 25.2, 25.1, 25.0, 24.8, 24.6, 24.4, 24.3, 24.1, 24.0, 23.8, 23.6, 23.4, 23.3, 23.2, 23.2, 23.2, 23.2, 23.3, 23.3], "soil_temperature_54cm": [20.7, 20.7, 20.7, 20.7, 20.8, 20.8, 20.8, 20.8, 20.9, 20.9, 20.9, 20.9, 20.9, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0], "soil_moisture_0_to_1cm": [0.284, 0.287, 0.291, 0.295, 0.298, 0.301, 0.304, 0.307, 0.309, 0.312, 0.314, 0.317, 0.445, 0.506, 0.499, 0.456, 0.438, 0.429, 0.422, 0.416, 0.411, 0.406, 0.403, 0.401], "soil_moisture_1_to_3cm": [0.318, 0.316, 0.315, 0.315, 0.315, 0.316, 0.317, 0.318, 0.319, 0.320, 0.322, 0.323, 0.353, 0.481, 0.491, 0.455, 0.440, 0.431, 0.425, 0.420, 0.416, 0.412, 0.408, 0.406], "soil_moisture_3_to_9cm": [0.357, 0.356, 0.355, 0.354, 0.353, 0.352, 0.351, 0.351, 0.350, 0.349, 0.349, 0.348, 0.348, 0.362, 0.404, 0.422, 0.426, 0.426, 0.425, 0.423, 0.420, 0.418, 0.415, 0.413], "soil_moisture_9_to_27cm": [0.384, 0.384, 0.384, 0.384, 0.384, 0.384, 0.383, 0.383, 0.383, 0.383, 0.383, 0.383, 0.382, 0.382, 0.382, 0.383, 0.384, 0.385, 0.386, 0.387, 0.387, 0.388, 0.388, 0.389], "soil_moisture_27_to_81cm": [0.410, 0.410, 0.410, 0.410, 0.410, 0.410, 0.410, 0.410, 0.410, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409, 0.409], "uv_index": [0.95, 0.10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.05, 0.45, 0.70, 0.15, 0.50, 0.65, 0.85, 1.15, 2.80, 3.60, 4.10, 2.15, 2.40], "uv_index_clear_sky": [0.95, 0.10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.10, 0.90, 2.40, 4.25, 6.10, 7.65, 8.70, 9.05, 8.70, 7.70, 6.15, 4.30, 2.40], "is_day": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], "cape": [180.0, 220.0, 220.0, 240.0, 220.0, 200.0, 260.0, 210.0, 150.0, 160.0, 150.0, 170.0, 230.0, 0.0, 0.0, 0.0, 10.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], "freezing_level_height": [3940.00, 3870.00, 3870.00, 3850.00, 3940.00, 4040.00, 3980.00, 3950.00, 3920.00, 3840.00, 4010.00, 3860.00, 3840.00, 3940.00, 3980.00, 3900.00, 3930.00, 3880.00, 3960.00, 4230.00, 4210.00, 4260.00, 4260.00, 4220.00], "sunshine_duration": [3600.00, 335.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 22.71, 0.00, 2787.41, 3136.35, 3600.00, 3600.00, 3600.00, 3600.00], "shortwave_radiation": [168.0, 20.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 15.0, 48.0, 21.0, 43.0, 204.0, 279.0, 315.0, 465.0, 429.0, 530.0, 632.0, 505.0, 267.0], "direct_radiation": [124.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 2.0, 30.0, 52.0, 51.0, 146.0, 153.0, 267.0, 378.0, 325.0, 151.0], "diffuse_radiation": [44.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 15.0, 46.0, 20.0, 41.0, 174.0, 227.0, 264.0, 319.0, 276.0, 263.0, 254.0, 180.0, 116.0], "direct_normal_irradiance": [565.2, 102.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 9.2, 2.4, 3.4, 40.6, 60.8, 54.9, 152.9, 164.5, 311.8, 511.2, 553.7, 368.9], "terrestrial_radiation": [310.1, 76.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 75.1, 308.3, 577.6, 828.6, 1044.2, 1209.8, 1313.9, 1349.6, 1314.3, 1210.5, 1045.2, 829.6, 578.5], "shortwave_radiation_instant": [94.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 34.4, 69.2, 25.7, 49.0, 222.0, 293.6, 322.1, 463.0, 415.6, 498.0, 571.2, 431.4, 205.5], "direct_radiation_instant": [69.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.9, 1.2, 2.3, 32.7, 54.7, 52.2, 145.4, 148.2, 250.9, 341.7, 277.6, 116.2], "diffuse_radiation_instant": [24.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 34.4, 66.3, 24.5, 46.7, 189.4, 238.8, 270.0, 317.6, 267.4, 247.1, 229.6, 153.8, 89.3], "direct_normal_irradiance_instant": [565.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 9.2, 2.4, 3.4, 40.6, 60.8, 54.9, 152.9, 164.5, 311.8, 511.2, 553.7, 368.9], "terrestrial_radiation_instant": [174.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 172.2, 444.6, 707.7, 943.7, 1136.5, 1272.9, 1343.6, 1343.7, 1273.4, 1137.3, 944.7, 708.6, 445.3] }, "daily_units": { "time": "unixtime", "weather_code": "wmo code", "temperature_2m_max": "°C", "temperature_2m_min": "°C", "apparent_temperature_max": "°C", "apparent_temperature_min": "°C", "sunrise": "unixtime", "sunset": "unixtime", "daylight_duration": "s", "sunshine_duration": "s", "uv_index_max": "", "uv_index_clear_sky_max": "", "precipitation_sum": "mm", "rain_sum": "mm", "showers_sum": "mm", "snowfall_sum": "cm", "precipitation_hours": "h", "precipitation_probability_max": "%", "wind_speed_10m_max": "km/h", "wind_gusts_10m_max": "km/h", "wind_direction_10m_dominant": "°", "shortwave_radiation_sum": "MJ/m²", "et0_fao_evapotranspiration": "mm" }, "daily": { "time": [1705323600, 1705410000, 1705496400, 1705582800, 1705669200, 1705755600, 1705842000, 1705928400, 1706014800, 1706101200, 1706187600, 1706274000, 1706360400, 1706446800, 1706533200, 1706619600], "weather_code": [80, 95, 61, 3, 3, 3, 3, 3, 2, 51, 3, 3, 3, 0, 0, 81], "temperature_2m_max": [32.1, 25.5, 19.5, 23.5, 25.0, 21.3, 19.8, 31.2, 38.6, 34.8, 24.9, 22.2, 23.5, 32.5, 35.7, 43.3], "temperature_2m_min": [19.7, 17.6, 13.3, 14.0, 15.2, 16.1, 15.4, 16.0, 19.0, 19.6, 17.9, 18.2, 16.3, 17.3, 19.0, 20.0], "apparent_temperature_max": [32.0, 26.4, 16.0, 24.0, 25.8, 21.6, 18.4, 33.1, 38.5, 35.8, 25.0, 22.0, 23.9, 31.4, 35.2, 42.7], "apparent_temperature_min": [18.9, 16.1, 11.5, 12.0, 15.7, 14.7, 13.4, 16.7, 19.4, 18.2, 16.9, 17.0, 15.2, 15.5, 17.9, 21.2], "sunrise": [1705346113, 1705432576, 1705519041, 1705605506, 1705691972, 1705778438, 1705864905, 1705951373, 1706037841, 1706124310, 1706210779, 1706297247, 1706383716, 1706470185, 1706556653, 1706643121], "sunset": [1705398230, 1705484606, 1705570981, 1705657354, 1705743725, 1705830094, 1705916461, 1706002826, 1706089189, 1706175551, 1706261911, 1706348269, 1706434626, 1706520981, 1706607335, 1706693687], "daylight_duration": [52101.51, 52015.68, 51926.73, 51834.81, 51740.08, 51642.71, 51542.86, 51440.67, 51336.30, 51229.89, 51121.61, 51011.59, 50899.97, 50786.89, 50672.50, 50556.94], "sunshine_duration": [47891.68, 23946.46, 33503.44, 38650.07, 26702.94, 46993.11, 46318.90, 38516.06, 48036.07, 47570.25, 47604.73, 38755.70, 47511.67, 47522.29, 47414.94, 47306.36], "uv_index_max": [9.10, 4.10, 6.10, 8.75, 9.05, 8.65, 8.85, 8.80, 8.80, 8.80, 8.70, 7.40, 8.65, 8.65, 8.65, 8.60], "uv_index_clear_sky_max": [9.10, 9.05, 9.05, 9.10, 9.10, 8.65, 8.85, 8.80, 8.80, 8.80, 8.65, 8.65, 8.65, 8.65, 8.65, 8.65], "precipitation_sum": [0.40, 15.00, 0.30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.30, 0.00, 0.00, 0.00, 0.00, 0.00, 16.50], "rain_sum": [0.00, 8.80, 0.30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.15, 0.00, 0.00, 0.00, 0.00, 0.00, 9.60], "showers_sum": [0.40, 6.30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.30, 0.00, 0.00, 0.00, 0.00, 0.00, 6.90], "snowfall_sum": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00], "precipitation_hours": [2.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0], "precipitation_probability_max": [100, 100, 42, 6, 3, 2, 0, 3, 10, 23, 16, null, null, null, null, null], "wind_speed_10m_max": [22.1, 21.1, 26.1, 15.0, 11.7, 20.8, 19.1, 13.5, 16.9, 30.8, 21.3, 17.1, 14.2, 19.1, 14.1, 28.8], "wind_gusts_10m_max": [50.0, 47.5, 59.4, 36.7, 31.0, 49.0, 44.3, 36.4, 39.2, 61.9, 32.4, 19.1, 19.4, 20.9, 15.5, 62.6], "wind_direction_10m_dominant": [7, 267, 264, 240, 144, 195, 177, 114, 4, 210, 192, 208, 181, 180, 206, 2], "shortwave_radiation_sum": [30.13, 13.94, 16.31, 23.70, 16.84, 23.91, 23.62, 24.68, 31.32, 29.78, 30.11, 20.64, 31.53, 32.16, 31.56, 29.23], "et0_fao_evapotranspiration": [7.42, 3.14, 3.65, 4.68, 3.31, 4.03, 4.32, 5.23, 8.36, 7.83, 5.93, 4.32, 6.00, 7.77, 7.42, 10.14] }
};


//function to convert a generic (structured) javascript object to a html block
//Arrays become rows and object keys become collums
//html layout inspiration https://css-tricks.com/accessible-simple-responsive-tables/
/*
    ObjectArr = [ob1, obj2, obj3]

                    col1        col2        col3\
                    obj[key1]   obj[key2]   obj[key1]
    row1    obj1  |           |           |             |  
    row2    obj2  |           |           |             |  
    row3    obj3  |           |           |             |  
*/

jsObject2HtmlTable(TestData_Weather1, '.weatherCheckin');
function jsObject2HtmlTable(ObjectArr, htmlSelector) {
    var htmlElement = $(htmlSelector); //get Jquery object for final HTML Object
    var tempHtmlElement = $('<table></table>').attr('id', 'JsObjectTable'); //create Table element
    if(typeof ObjectArr !== Array) //check if the pass arr is actually and array
    {
        ObjectArr = [ObjectArr]; //if not creat array and insert the obj
    }
    var colNames = []; //list of column headings
    for (var ObjectIndex = 0; ObjectIndex < ObjectArr.length; ObjectIndex++) //for each item in ObjectArr
     {
        //create row element
        var row = $('<tr></tr>').attr('id','table-data-row-'+ObjectIndex);
        //row header column
        colNames.push('Items'); //add tilte element
        var col = $('<td></td>').text(ObjectIndex+1); //add first column to row
        col.addClass('table-row-heading');//add class for formatting
        row.append(col);//apend column to row
        for (var colIndex in ObjectArr[ObjectIndex]) 
        {
            colNames.push(colIndex); //add column heading to colName Array
            var col = $('<td></td>').text(ObjectArr[ObjectIndex][colIndex]); //add data to cell
            row.append(col); //append cell to row
        }
        tempHtmlElement.append(row);//apend current row to  new html element
    }
    //add in table headings
    var headingsRow = $('<tr></tr>').attr('id','table-header-row'); //create temp heading element
    for(var i = 0 ; i<colNames.length;i++) //for each item in column headings array
    {
        var headingsCol = $('<td></td>').text(colNames[i]); //create element and incert cell data
        headingsCol.addClass('table-col-heading'); //add class for formatting
        headingsRow.append(headingsCol); //append to heading row element
    }
    tempHtmlElement.prepend(headingsRow);//add heading row at first item in table.
htmlElement.append(tempHtmlElement); //insert the new element into the html code
};
