// Get the objects we need to modify
let addStudentForm = document.getElementById('add-student-form-ajax');

// Modify the objects we need
addStudentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLastName = document.getElementById("input-lastName-ajax");
    let inputEmail = document.getElementById("input-email-ajax");
    let inputStartDate= document.getElementById("input-startDate-ajax");
    let inputGraduationDate = document.getElementById("input-graduationDate-ajax");

    // Get the values from the form fields
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let startDateValue = inputStartDate.value;
    let graduationDateValue = inputGraduationDate.value;


    // Put our data we want to send in a javascript object
    let data = {
        lastName: lastNameValue,
        email: emailValue,
        startDate: startDateValue,
        graduationDate: graduationDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputLastName.value = '';
            inputEmail.value = '';
            inputStartDate.value = '';
            inputGraduationDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("student-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let studentIDCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let startDateCell = document.createElement("TD");
    let graduationDateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    studentIDCell.innerText = newRow.studentID;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    startDateCell.innerText = newRow.startDate;
    graduationDateCell.innerText = newRow.graduationDate;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStudent(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(studentIDCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(startDateCell);
    row.appendChild(graduationDateCell);

    // Fixes the delete button not showing up.
    row.appendChild(deleteCell);
    

    // Add a row attribute so the deleteRow function can find a newly added row. 
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new STEP 8 code for adding new data to the dropdown menu for updating class professor. 
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelectStudent");
    let option = document.createElement("option");
    option.text = newRow.lastName;
    option.value = newRow.studentID;
    selectMenu.add(option);
    // End of new step 8 code.

}