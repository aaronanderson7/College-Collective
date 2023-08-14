// Get the objects we need to modify
let updateDepartmentForm = document.getElementById('update-department-form-ajax');

// Modify the objects we need
updateDepartmentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDepartmentID = document.getElementById("mySelect");
    let newDepartmentName = document.getElementById("input-newDepartmentName")


    // Get the values from the form fields
    let departmentIDValue = inputDepartmentID.value;
    let newDepartmentNameValue = newDepartmentName.value;
    
    // so we must abort if being bassed NULL for departmentName

    if (newDepartmentNameValue === undefined) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        departmentID: departmentIDValue,
        newDepartmentName: newDepartmentNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-department-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, newDepartmentNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, departmentID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("department-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == departmentID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].departmentName; 
       }
    }
}