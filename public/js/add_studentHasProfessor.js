// Get the objects we need to modify
let addStudentHasProfessorForm = document.getElementById("add-studentHasProfessor-form-ajax");

// Modify the objects we need
addStudentHasProfessorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudentID = document.getElementById("input-studentID-ajax");
    let inputProfessorID = document.getElementById("input-professorID-ajax");

    // Get the values from the form fields
    let studentIDValue = inputStudentID.value;
    let professorIDValue = inputProfessorID.value;

    // Put our data we want to send in a javascript object
    let data = {
        studentID: studentIDValue,
        professorID: professorIDValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'add-studentHasProfessor-ajax', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStudentID.value = '';
            inputProfessorID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("student-has-professor-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let studentIDCell = document.createElement("TD");
    let professorIDCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    studentIDCell .innerText = newRow.studentID;
    professorIDCell.innerText = newRow.professorID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStudentHasProfessor(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(studentIDCell);
    row.appendChild(professorIDCell);

    // Add a row attribute so the deleteRow function can find a newly added row. 
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}