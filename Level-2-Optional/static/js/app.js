// from data.js
var tableData = data;

// YOUR CODE HERE!
// Test data from data.js
console.log(tableData);

// Tabularize
tabularize(tableData);

// Declare a variable to hold the input text
var newInput = " ";

// Declare a variable to hold the filteredData
var filteredData = [];

// Getting a reference to the input element on the page with the id property set to 'input-field'
var inputField = d3.select(".form-control");

// Getting a reference to the dropdown element
var dropDownField = d3.select('select');

// Get the current selection of the dropdown
var currentSel = dropDownField.property("value");

// Set a boolean to capture on change event
var hasChanged = false;

// Get the current input-field value
newInput = inputField.property("value");

// Test
console.log("Current dropdown selection is : " + currentSel);
if (newInput === "") {
    console.log("Current input text is empty.");
} else {
    console.log("Current input text is : " + newInput);
}
/*
 * purpose: This function gets triggered on any text change event 
 * input : None
 * returns: None
 */
// Input fields can trigger a change event when new text is entered.
inputField.on("change", function() {
    newInput = d3.event.target.value;
    hasChanged = true;
    // Test
    console.log("On change, the current input text is : " + newInput);
});
// Dropdown field can trigger a change event when a new selection is made.
dropDownField.on("change", function() {
    currentSel = d3.event.target.value;
    hasChanged = true;
    // Test
    console.log("On change, the current dropdown selection is : " + currentSel);
});
/*
 * purpose: This function filters data
 * input : current dropdown selection (currentSel)
 * returns: None
 */
function filterData(currentSel) {
    switch (currentSel) {
        //Filter the data using the selected input
        case "datetime":
            filteredData = tableData.filter(ufoSighting => ufoSighting.datetime === newInput);
            if (filteredData.length > 0) {
                break;
            } else {
                raiseError(currentSel, newInput);
                break;
            }
        case "city":
            filteredData = tableData.filter(ufoSighting => ufoSighting.city === newInput);
            if (filteredData.length > 0) {
                break;
            } else {
                raiseError(currentSel, newInput);
                break;
            }
        case "state":
            filteredData = tableData.filter(ufoSighting => ufoSighting.state === newInput);
            if (filteredData.length > 0) {
                break;
            } else {
                raiseError(currentSel, newInput);
                break;
            }
        case "country":
            filteredData = tableData.filter(ufoSighting => ufoSighting.country === newInput);
            if (filteredData.length > 0) {
                break;
            } else {
                raiseError(currentSel, newInput);
                break;
            }
        case "shape":
            filteredData = tableData.filter(ufoSighting => ufoSighting.shape === newInput);
            if (filteredData.length > 0) {
                break;
            } else {
                raiseError(currentSel, newInput);
                break;
            }
        default:
            raiseError(currentSel, newInput);
            break;
    }
}
/*
 * purpose: This function raises an alert and logs the same to the console
 * input : current dropdown selection (currentSel), current text input (newInput)
 * returns: None
 */
function raiseError(currentSel, newInput) {
    if (newInput === "") {
        console.log("Oops! No data found for " + currentSel + " with no value!");
        alert("Oops! No data found for " + currentSel + " with no value!");
    } else if (hasChanged) {
        console.log("Oops! No data found for " + currentSel + " with value " + newInput + "!");
        alert("Oops! No data found for " + currentSel + " with value " + newInput + "!");
    }
}
/*
 * purpose: This function clears off old HTML content
 * input : None
 * returns: None
});
 */
function clearTableContents() {
    //Clear old content...
    d3.select('tbody').html("");
}
/*
 * purpose: This function handles the button click event
 * input : None
 * returns: None
 * info: This can also be achieved by "button.on("click", function() {...});"
 */
function handleSubmit() {
    console.log("A button was clicked.");
    //Prevents the form from submitting on click of the button...
    d3.event.preventDefault();
    // Test
    console.log("Before submiting, current input text is : " + newInput);
    // Load page with fresh filtered data
    clearTableContents();
    filterData(currentSel);
    // Test
    if (filteredData.length > 0) {
        console.log(filteredData);
        // Tabularize filtered data
        tabularize(filteredData);
    }
    // Reset the boolean to false
    hasChanged = false;
}
/*
 * purpose: This function tabularizes any given data
 * input : someData
 * returns: None
 */
function tabularize(someData) {
    //Select the HTML element
    var tbody = d3.select("tbody");
    //Loop through the filtered data by row, and add table contents
    someData.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.entries(ufoSighting).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
}
// Add event listener for the button
d3.select("#filter-btn").on("click", handleSubmit);