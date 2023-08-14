// Get the objects we need to modify
let addDepartmentForm = document.getElementById('add-department-form-ajax');

// Modify the objects we need
addDepartmentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDepartmentName = document.getElementById("input-departmentName");

    // Get the values from the form fields
    let departmentNameValue = inputDepartmentName.value;

    // Put our data we want to send in a javascript object
    let data = {
        departmentName: departmentNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-department-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDepartmentName.value = '';
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
    let currentTable = document.getElementById("department-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let departmentIDCell = document.createElement("TD");
    let departmentNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    departmentIDCell.innerText = newRow.departmentID;
    departmentNameCell.innerText = newRow.departmentName;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteClass(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(departmentIDCell);
    row.appendChild(departmentNameCell);

    // Add a row attribute so the deleteRow function can find a newly added row. 
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // // Start of new STEP 8 code for adding new data to the dropdown menu for updating class professor. 
    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.className;
    // option.value = newRow.classID;
    // selectMenu.add(option);
    // // End of new step 8 code.

}