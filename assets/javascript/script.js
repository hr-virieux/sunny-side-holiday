//Html elements
SubmitbuttonEL = $('#userFlightInfo');
FlightInforEL = $('.flight')
WeatherDataOutputEL = $("#js-weatherData");
FlightDataOutputEL = $("#js-flightData");

//Global Verables
var storageKey = 'sunny-side-holiday';


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

// Fetch  flight data from the API - Michael
// input - Api data
// output - data for our function FlightData / HTML(Form)



getfetch_FlightData();
getfetch_AirportData();

// Fetch  flight data from the API - Michael
// input - Api data
// output - data for our function FlightData / HTML(Form)
    
function getfetch_FlightData() {
    
    var flightAPIkey = '401308e98c0676bc5feb0cea81599270'; //pranita
    var flightAPIkey = 'b01483a314379d1ea7402d0138aff2fa'; //mark
    var flightAPIkey = 'aaf7bb072f23ce943f9f7d31de23e18a'; //faiza

        var apiUrl = 'http://api.aviationstack.com/v1/flights?access_key=' + flightAPIkey;

        $.ajax({
            url: 'http://api.aviationstack.com/v1/flights',
            data: {
              access_key: flightAPIkey
            },
            dataType: 'json',
            success: function(apiResponse) {
              console.log(apiResponse)
                if (Array.isArray(apiResponse['results'])) {
                apiResponse['results'].forEach(flight => {
                  if (!flight['live']['is_ground']) {
                    console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                        `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                        `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                  }
                });
              }
            }
          });
  }

  function getfetch_AirportData() {
    
    var flightAPIkey = '401308e98c0676bc5feb0cea81599270'; //pranita
    var flightAPIkey = 'b01483a314379d1ea7402d0138aff2fa'; //mark
    var flightAPIkey = 'aaf7bb072f23ce943f9f7d31de23e18a'; //faiza

       // var apiUrl = 'http://api.aviationstack.com/v1/airports?access_key=' + flightAPIkey;

        $.ajax({
            url: 'http://api.aviationstack.com/v1/airports',
            data: {
              access_key: flightAPIkey
            },
            dataType: 'json',
            success: function(apiResponse) {
              console.log(apiResponse)
              jsObject2HtmlTable(apiResponse,FlightInforEL)
                if (Array.isArray(apiResponse['results'])) {
                apiResponse['results'].forEach(flight => {
                  if (!flight['live']['is_ground']) {
                    console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                        `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                        `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                  }
                });
              }
            }
          });
  }

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
                    jsObject2HtmlTable(data, WeatherDataOutputEL);
                    
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
var weatherData = apifetch_WeatherData();




//function to convert a generic (structured) javascript object to a html block
//Arrays become rows and object keys become collums
//html layout inspiration https://css-tricks.com/accessible-simple-responsive-tables/
/*INPUTS
    ObjectArr = [ob1, obj2, obj3];
    htmlSelector = jquery html selector;
    tableColHeadings = Array of Ordered Column Heading Strings ['col1', 'col2', 'col3' ]
        - (optional) - if blank will render all object 'key's to table 
        - the output will be sorted by this arr
        - only headings listed will be displayed.
        - must be direct match to object 'key's 

 OUTPUT   
                    col1        col2        col3\
                    obj[key1]   obj[key2]   obj[key1]
    row1    obj1  |           |           |             |  
    row2    obj2  |           |           |             |  
    row3    obj3  |           |           |             |  
*/


function jsObject2HtmlTable(ObjectArr, JqueryHtmlElement, tableColHeadingsArr) {
    //var HtmlElement = $(htmlSelector); //get Jquery object for final HTML Object
    JqueryHtmlElement.empty(); //clear any exisiting data in html ELEMENT
    var tempHtmlElement = $('<table></table>').attr('id', 'JsObjectTable'); //create Table element
    if (!$.isArray(ObjectArr)) //check if the pass arr is actually and array
    {
        ObjectArr = [ObjectArr]; //if not creat array and insert the obj
    }
    //get Table Headings
    if (!tableColHeadingsArr) {
        var tableColHeadingsArr = [];
        for (var ObjectIndex = 0; ObjectIndex < ObjectArr.length; ObjectIndex++) //for each item in ObjectArr
        {
            for (var colIndex in ObjectArr[ObjectIndex]) {
                if (!tableColHeadingsArr.includes(colIndex)) //if heading already exisits in array
                {
                    tableColHeadingsArr.push(colIndex); //add column heading to colName Array
                }
            }
        }
    }
    tableColHeadingsArr.unshift('Items'); //add title collumn heading
    //add in table headings
    var headingsRow = $('<tr></tr>').attr('id', 'table-header-row'); //create temp heading element
    for (var i = 0; i < tableColHeadingsArr.length; i++) //for each item in column headings array
    {
        var headingsCol = $('<td></td>').text(tableColHeadingsArr[i]); //create element and incert cell data
        headingsCol.addClass('table-col-heading'); //add class for formatting
        headingsRow.append(headingsCol); //append to heading row element
    }
    tempHtmlElement.prepend(headingsRow);//add heading row at first item in table.

    //add data to table
    for (var ObjectIndex = 0; ObjectIndex < ObjectArr.length; ObjectIndex++) //for each item in ObjectArr
    {
        var row = $('<tr></tr>').attr('id', 'table-data-row-' + ObjectIndex); //create row element



        for (var colIndex = 0; colIndex < tableColHeadingsArr.length; colIndex++) { //start at #1 because its alreeady been handled
            if (colIndex == 0) {
                //row header column
                var col = $('<td></td>').text(ObjectIndex + 1); //add first column to row
                col.addClass('table-row-heading');//add class for formatting
                row.append(col);//apend column to row
            }
            else {
                var cellValue = '';
                var col = $('<td></td>'); //add data to cell
                try {
                    cellValue = ObjectArr[ObjectIndex][tableColHeadingsArr[colIndex]];
                    if (cellValue === undefined) { cellValue = 'N/A'; }
                }
                catch
                {
                    cellValue = 'N/A';
                }
                col.text(cellValue);
                row.append(col); //append cell to row
            }
        }
        tempHtmlElement.append(row);//apend current row to  new html element
    }

    JqueryHtmlElement.append(tempHtmlElement); //insert the new element into the html code
};
