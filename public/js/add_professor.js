// Get the objects we need to modify
let addProfessorForm = document.getElementById('add-professor-form-ajax');

// Modify the objects we need
addProfessorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProfessorLastName = document.getElementById("input-professorLastName");
    let inputEmail = document.getElementById("input-email");
    let inputDepartmentID = document.getElementById("input-departmentID-ajax")

    // Get the values from the form fields
    let professorLastNameValue = inputProfessorLastName.value;
    let emailValue = inputEmail.value;
    let departmentIDValue = inputDepartmentID.value;

    // Put our data we want to send in a javascript object
    let data = {
        professorLastName: professorLastNameValue,
        email: emailValue,
        departmentID: departmentIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-professor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProfessorLastName.value = '';
            inputEmail.value = '';
            inputDepartmentID.value = '';
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
    let currentTable = document.getElementById("professor-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let professorIDCell = document.createElement("TD");
    let professorLastNameCell = document.createElement("TD");
    let professorEmailCell = document.createElement("TD");
    let departmentCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    professorIDCell.innerTExt = newRow.professorID;
    professorLastNameCell.innerText = newRow.professorLastName;
    professorEmailCell.innerText = newRow.email;
    departmentCell.innerText = newRow.departmentID;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProfessor(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(professorIDCell);
    row.appendChild(professorLastNameCell);
    row.appendChild(professorEmailCell);
    row.appendChild(departmentCell);


    // Add a row attribute so the deleteRow function can find a newly added row. 
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

       // Start of new STEP 8 code for adding new data to the dropdown menu for updating class professor. 
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-departmentID-ajax");
    let option = document.createElement("option");
    option.text = newRow.departmentID
    selectMenu.add(option);
    // End of new step 8 code.
}