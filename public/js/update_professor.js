// Get the objects we need to modify
let updateProfessorForm = document.getElementById('update-professor-form-ajax');

// Modify the objects we need
updateProfessorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProfessorID = document.getElementById("mySelect");
    let newProfessorName = document.getElementById("input-newName")
    let newProfessorEmail = document.getElementById("input-newEmail");
    let newDepartmentID = document.getElementById("department-select");


    // Get the values from the form fields
    let professorIDValue = inputProfessorID.value;
    let newProfessorNameValue = newProfessorName.value;
    let newProfessorEmailValue = newProfessorEmail.value;
    let newDepartmentIDValue = newDepartmentID.value;
    
    // so we must abort if being bassed NULL for departmentName

    if (newProfessorNameValue === undefined) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        professorID: professorIDValue,
        newProfessorName: newProfessorNameValue,
        newProfessorEmail: newProfessorEmailValue,
        newDepartmentID: newDepartmentIDValue
    };

<<<<<<< HEAD
    console.log(data);
    
=======
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-professor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, newProfessorNameValue, newProfessorEmailValue, professorIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, professorID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("professor-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == professorID) {
<<<<<<< HEAD

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
=======
            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get tds of values to update
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
            let td = updateRowIndex.getElementsByTagName("td")[1];
            let td1 = updateRowIndex.getElementsByTagName("td")[2];
            let td2 = updateRowIndex.getElementsByTagName("td")[3];

<<<<<<< HEAD
            console.log(td1);

            // Reassign homeworld to our value we updated to
=======
            // Reassign cells to our values we updated to
            console.log(parsedData[0]);
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
            td.innerHTML = parsedData[0].newProfessorName; 
            td1.innerHTML = parsedData[0].newProfessorEmail;
            td2.innerHTML =parsedData[0].newDepartmentID;
       }
    }
}