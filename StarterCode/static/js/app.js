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

newInput = inputField.property("value");
// Test
console.log(newInput);

/*
 * purpose: This function gets triggered on any text change event 
 * input : None
 * returns: None
 */
// Input fields can trigger a change event when new text is entered.
inputField.on("change", function() {
    newInput = d3.event.target.value;
    // Test
    console.log(newInput);
});
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
 * purpose: This function filters data
 * input : None
 * returns: None
});
 */
function filterData() {
    //Filter the data using the new text input (Date)
    filteredData = tableData.filter(ufoSighting => ufoSighting.datetime === newInput);
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
    console.log(newInput);
    // Load page with fresh filtered data
    clearTableContents();
    filterData();
    // Test
    console.log(filteredData);
    // Tabularize filtered data
    tabularize(filteredData);
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