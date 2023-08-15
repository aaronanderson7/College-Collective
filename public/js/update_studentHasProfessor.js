// Get the objects we need to modify
let updateStudentHasProfessorForm = document.getElementById('update-studentHasProfessor-form-ajax');

// Modify the objects we need
updateStudentHasProfessorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudentHasProfessorID = document.getElementById("mySelectStudentHasProfessor");
    let inputStudentID = document.getElementById("input-student-update")
    let inputProfessorID = document.getElementById("input-professor-update");

    // Get the values from the form fields
    let inputStudentHasProfessorIDValue = inputStudentHasProfessorID.value;
    let inputStudentIDValue = inputStudentID.value;
    let inputProfessorIDValue = inputProfessorID.value;

    // Put our data we want to send in a javascript object
    let data = {
        studentHasProfessorID: inputStudentHasProfessorIDValue,
        studentID: inputStudentIDValue,
        professorID: inputProfessorIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-student-has-professor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log(xhttp.response);
            updateRow(xhttp.response, inputStudentHasProfessorIDValue, inputStudentIDValue, inputProfessorIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, studentHasProfessorID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("student-has-professor-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentHasProfessorID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get tds of values to update
            let td = updateRowIndex.getElementsByTagName("td")[1];
            let td1 = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign values to our values we updated to
            td.innerHTML = parsedData[0].studentID; 
            td1.innerHTML = parsedData[0].professorID;
       }
    }
}