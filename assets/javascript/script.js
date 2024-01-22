//Html elements
AirportInputELs = $('.js-airportInput');
DateInputELs = $('#departureDate');
UserSearchInputEL = $('#userFlightInfo');
WeatherDataOutputEL = $("#js-weatherData");
FlightDataOutputEL = $("#js-flightData");
FlightOfferDataOutputEL = $("#js-flightOfferData");

departureAirportEL = $('#departureAirport');
arrivalAirportEL = $('#arrivalAirport');
userData = {};

//Global Verables
var storageKey = 'sunny-side-holiday';
var AVIATIONSTACK_LIVEDATA_ENABLE = false; //switch between live api data and stored data
var OPENMETEO_LIVEDATA_ENABLE = true; //switch between live api data and stored data
var departureAirportCode = '';
var arrivalAirportCode = '';
var StoredAirportData = [];
//var AirportData = {};

/*********************** EVENT HANDLERS****************************************** */
$(
UserSearchInputEL.on("submit",userSearch)

//$('#fm-numofFlights').on("click",userSearch)
);
//event listener for submit button - Mark
//input - Click from the user
//output - call the next function down
function userSearch() {
    event.preventDefault();

    var departureAirportCode = '';
    var arrivalAirportCode = '';

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
    userData = formData;
  
    

    if (formData.departureAirport.charAt(3) == '-') {
        departureAirportCode = formData.departureAirport.split('-')[0];
    }
    else{
        apifetch_NearestAirport(formData.departureAirport, $('#departureAirport-check'));
    }
    if (formData.arrivalAirport.charAt(3) == '-') {
        arrivalAirportCode = formData.arrivalAirport.split('-')[0];
        apifetch_WeatherData_fromIATA(arrivalAirportCode);
    }else{
        apifetch_NearestAirport(formData.arrivalAirport, $('#arrivalAirport-check'));
    }

    if (formData.flightNumber) {
        if(formData.flightNumber != '' && formData.departureDate !='')
        //render flight data
            var search = {carrierCode: formData.flightNumber.slice(0,2), 
                flightNumber: formData.flightNumber.slice(2,6), 
                departureDate: dayjs(formData.departureDate,'YY-MM-DD').format('YYYY-MM-DD')};

        apifetch_flightData(search);
            }
    
        //load list of flights from departure city to arrival city on date
        if (arrivalAirportCode != '' && departureAirportCode != '' && formData.departureDate && formData.numOfAdults) {
            var search = {
                departureAirport: departureAirportCode,
                arrivalAirport: arrivalAirportCode,
                departureDate: dayjs(formData.departureDate,'YY-MM-DD').format('YYYY-MM-DD'),
                adults: formData.numOfAdults
            };
            apifetch_FlightOffers(search, FlightOfferDataOutputEL);
        }
    


    //apifetch_FlightData(formData);
    //FlightInforEL.hide();
};




//event handler to catch user airport selection
$('#departureAirport-check').on('click', function (event) {
    var text = event.target.textContent;
    //departureAirportCode = text.split('-')[0];
    $('#departureAirport').val(text);
});

$('#arrivalAirport-check').on('click', function (event) {
    var text = event.target.textContent;
    //arrivalAirportCode = text.split('-')[0];
    $('#arrivalAirport').val(text);
});

//********************** API FETCH DATA FUNCTIONS ********************** */
function apifetch_NearestAirport(name, HtmlElement) {
    var apiUrl = 'https://api.api-ninjas.com/v1/airports?name=' + name;
    var apiKey = 'PyfkUVAOi6zNoYdm61eEjw==KcvlBVxRxci1Pgc6';

    fetch(apiUrl, { headers: { 'X-Api-Key': apiKey } })
        .then(function (response) {
            return response.json(); // convert to json
        }).then(function (data) {
            //***TODO**** - remove console log when finished!!!
            console.log('Nearest Airport', data); // Log the API data
            //***TODO**** - Can we make this an auto complete or links to select airport!!!
            Array2HtmlUnorderedList(getAirportNamesArr(data), HtmlElement);
        }).catch(function (err) {
            console.log('Unable to connect to api.api-ninjas.com', err); // Log any errors
        });
}

//get list of flights that match critera
//search = {departureAirport: string, arrivalAirport: string, departureDate: string($date),adults=1};
function apifetch_FlightOffers(search) {
    var authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    var key = 'PN8pHRKabX89904GM6DFRTsqiVndb4Vw';
    var secret = 'bsQ4g4TKaWbKbOUq';

    //***TODO**** - change this url to match the required data call from amadeous.com!!!
    var apiURL = 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=' + search.departureAirport + '&destinationLocationCode=' + search.arrivalAirport + '&departureDate=' + search.departureDate + '&adults=' + search.adults;

    fetch(authUrl, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json(); // Return the response as JSON
    }).then(function (data) {
        // start main API call using token from above
        return fetch(apiURL, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }).then(function (response) {
        return response.json(); //convert responce to json
    }).then(function (data) {
        // Log the API data
        //***TODO**** - remove console log when debug complete
        console.log('amedeous', data);
        //***TODO**** - Do stuff with this data!!!
        processFlightOfferData(data);
    }).catch(function (err) {
        console.log('Unable to connect to https://api.amadeus.com', err); // Log any errors
    });
}



//get flight details from above
//search = {carrierCode: string, flightNumber:string, departureDate: 'YYYY-MM-DD'};
function apifetch_flightData(search) {
    var authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    var key = 'PN8pHRKabX89904GM6DFRTsqiVndb4Vw';
    var secret = 'bsQ4g4TKaWbKbOUq';

    //***TODO**** - change this url to match the required data call from amadeous.com!!!
    var apiURL = 'https://test.api.amadeus.com/v2/schedule/flights?carrierCode='+search.carrierCode+'&flightNumber='+search.flightNumber+'&scheduledDepartureDate='+search.departureDate;

    fetch(authUrl, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json(); // Return the response as JSON
    }).then(function (data) {
        // start main API call using token from above
        return fetch(apiURL, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }).then(function (response) {
        return response.json(); //convert responce to json
    }).then(function (data) {
        // Log the API data
        //***TODO**** - remove console log when debug complete
        console.log('amedeous', data);
        //***TODO**** - Do stuff with this data!!!
        processFlightData(data);
    }).catch(function (err) {
        console.log('Unable to connect to https://api.amadeus.com', err); // Log any errors
    });
}

// Fetch  Weather data from the API 
//input - location object {lat: XXXX, long: XXXX} 
//output - The data information Current weather. (Display HTML as output)
function apifetch_WeatherData_fromIATA(IATA) {

    var AirportApiUrl = 'https://api.api-ninjas.com/v1/airports?iata=' + IATA;
    var AirportApiKey = 'PyfkUVAOi6zNoYdm61eEjw==KcvlBVxRxci1Pgc6';

    fetch(AirportApiUrl, { headers: { 'X-Api-Key': AirportApiKey } })
        .then(function (response) {
            return response.json(); // convert to json
        }).then(function (data) {
            //***TODO**** - remove console log when finished!!!
            console.log('weather Airport', data); // Log the API data
            //***TODO**** - Can we make this an auto complete or links to select airport!!!
            //fetch weather Data
            var weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + data[0].latitude + '&longitude=' + data[0].longitude + '&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime';

            if (OPENMETEO_LIVEDATA_ENABLE) {
                fetch(weatherApiUrl, {
                    headers: {}

                }).then(function (response) {
                    return response.json(); //convert responce to json
                }).then(function (data) {
                    // Log the API data
                    //***TODO**** - remove console log when debug complete
                    console.log('weather', data);
                    processWeatherData(data);
                }).catch(function (err) {
                    console.log('Unable to connect to https://api.open-meteo.com', err); // Log any errors
                });

            }
            else {
                processWeatherData(TestData_Weather1);
            }
        }).catch(function (err) {
            console.log('Unable to connect to api.api-ninjas.com', err); // Log any errors
        });
}





/*********************** LOCAL STORAGE FUNCTION ********************************************** */
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

/*********************** DATA PROCESS/ MANIPULATION FUNCTIONS ****************************************** */
function getAirportNamesArr(airportData) {
    var arr = []
    for (var i in airportData) {
        arr.push(airportData[i].iata.toUpperCase() + '- ' + airportData[i].name + '/' + airportData[i].country);
        StoredAirportData.push(airportData);
    }
    return arr;
}

function getCoordsFromIATAcode(iata) {
    for (var i = 0; i < StoredAirportData.length; i++) {
        if (StoredAirportData[i].iata == iata) {
            return { lat: StoredAirportData[i].lat, long: StoredAirportData[i].long };
        }
    }
    return { lat: '000', long: '000' };;
}


// Function for forcast - Mark
//input -  Current Day Weather AKA The data information Current weather.
//output - Future 5 days  forcast -
function processWeatherData(data) {
    var arr = [];
    for (var j = 0; j < data.daily.time.length; j++) {
        arr.push({});
        for (var i in data.daily) {
            if (i === 'time') {
                arr[j][i] = dayjs.unix(data.daily[i][j]).format('DD/MM/YYYY');
            } else {
                arr[j][i] = data.daily[i][j];
            }
        }
    }
    jsObject2HtmlTable(arr, WeatherDataOutputEL);
}

// Funtion for the flight data and fetch informaion and display information in HTML - mark
//input - user input (departure and arrival airport / flight number) (dates) 
//output - The data information fligth information, status  (HTML Display as outputs) 
function processFlightOfferData(data) {
    //***TODO**** - complete function to display flight data
    var newArr = []
    var numToDisplay = parseInt($('#js-numOfFlightOffersToDisplay').val());
    if(numToDisplay === undefined)
    {
        var numToDisplay = 5;
    }
    if(numToDisplay>= data.data.length)
    {
        numToDisplay = data.data.length;
    };
    for(var i=0;i<numToDisplay;i++)
    {
        newArr.push(data.data[i]);
    }

    jsObject2HtmlTable(newArr, FlightOfferDataOutputEL);
}

// display list of available flights to purchase
function processFlightData(data) {
    //***TODO**** - complete function to display flight data
    $('#FlightInfo-FlightNumber').text(data.data[0].flightDesignator.carrierCode + data.data[0].flightDesignator.flightNumber);
    $('#FlightInfo-DepatureTime').text(dayjs(data.data[0].flightPoints[0].departure.timings[0].value).format('DD/MM/YYYY hh:mm A'));
    $('#FlightInfo-ArrivalTime').text(dayjs(data.data[0].flightPoints[data.data[0].flightPoints.length-1].arrival.timings[0].value).format('DD/MM/YYYY hh:mm A'));
     var AircraftType = [];
     var duration = [];
    for(var i=0;i<data.data[0].legs.length;i++)
    {
        duration.push(data.data[0].legs[i].scheduledLegDuration); 
        AircraftType.push(data.data[0].legs[i].aircraftEquipment.aircraftType);
    }
    $('#FlightInfo-FlightDuration').text(duration.join(', '));
    $('#FlightInfo-AircraftType').text(AircraftType.join(', '));
    console.log(data.data[0].legs[data.data[0].legs.length-1].offPointIataCode);
    $('#FlightInfo-ArrivalAirport').text(data.data[0].legs[data.data[0].legs.length-1].offPointIataCode);
    console.log(data.data[0].legs[0].boardPointIataCode);
    $('#FlightInfo-DepartureAirport').text(data.data[0].legs[0].boardPointIataCode);
    
}

function Array2HtmlUnorderedList(arr, HtmlElement, liClass) {
    var ul = $('<ul></ul>')
    for (var i = 0; i < arr.length; i++) {
        var li = $('<li></li>').text(arr[i]);
        if (liClass !== undefined) { li.addClass(liClass); }
        ul.append(li);
    }
    HtmlElement.empty();
    HtmlElement.append(ul);

}

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


/*********************** DISPLAY FUNCTIONS **************** */




/*********************** RUN WITH PAGE LOAD ************************************ */
$(function Initialise() {
    //DateInputELs.val(dayjs());
    DateInputELs.datepicker({dateFormat: "yy-mm-dd", currentText: "Now"});

    var numOfFlights = ['1','2','3','4','5','10','15','20'];
    $('#js-numOfFlightOffersToDisplay').autocomplete({
        source: numOfFlights
        });

    getFromLocalStorage();

    //apifetch_NearestAirport('Melbourne');
    //apifetch_FlightOffers();
    //apifetch_WeatherData();

})


