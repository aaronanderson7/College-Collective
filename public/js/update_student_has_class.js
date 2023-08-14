// Get the objects we need to modify
let updateStudentHasClassForm = document.getElementById('update-student-has-class-form-ajax');

// Modify the objects we need
updateStudentHasClassForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudentHasClassID = document.getElementById("mySelectStudentHasClass");
    let inputClassID = document.getElementById("input-classID-update");

    // Get the values from the form fields
    let studentHasClassIDValue = inputStudentHasClassID.value;
    let classIDValue = inputClassID.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(classIDValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        studentHasClassID: studentHasClassIDValue,
        classID: classIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-student-has-class-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, classIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, classID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("student-has-class-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentHasClassID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].classID; 
       }
    }
}