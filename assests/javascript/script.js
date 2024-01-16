//Html elements
SubmitbuttonEL = $('#');


//Global Verables

// Fetch  flight data from the API - Michael
    // input - Api data
    // output - data for our function FlightData / HTML(Form)

//event listener for submit button - Mark
    //input - Click from the user
    //output - call the next function down
SubmitbuttonEL.on('submit',function()
{
    setLocalStorage(userData);
});

// Funtion for the flight data and fetch informaion and display information in HTML - mark
    //input - user input (departure and arrival airport / flight number) (dates) 
    //output - The data information fligth information, status  (HTML Display as outputs) 

// Fetch  Weather data from the API 
    //input - user input (arrival airport / flight number) (dates) 
    //output - The data information Current weather. (Display HTML as output)


// Function for forcast - Mark
    //input -  Current Day Weather AKA The data information Current weather.
    //output - Future 5 days  forcast 


// Function storage previous Destination  - Mark
    //input -  the users input 
    //output - Saves it in Local Storage 

// Function display previous Destination  - Mark
    //input -  Local Storage Pull 
    //output - Users previous input of the (departure and arrival airport / flight number) (Display)
