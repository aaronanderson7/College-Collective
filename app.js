// App.js

//Dotenv 
require('dotenv').config();


// Database
const db = require('./database/db-connector');

/*
    SETUP
*/
<<<<<<< HEAD
const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


PORT = process.env.PORT;                 // Set a port number at the top so it's easy to change in the future
=======
// We are using the express library for the web server
const express = require('express');  
const app = express();           
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Set a port number at the top so it's easy to change in the future
PORT = process.env.PORT;                 
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758

// Configurations of handlebars framework
const { engine } = require('express-handlebars');
<<<<<<< HEAD
const exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

/*
----------------------------
CLASSES ROUTES 
----------------------------
*/

/*
    SEARCH operations
=======
const exphbs = require('express-handlebars');    
app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs');                 

/*
    Home Page
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
*/
app.get('/', function(req, res)
{
    res.render('index')
});

/*
----------------------------
CLASSES ROUTES 
----------------------------
*/

/* 
    SELECT Operation 
*/
app.get('/classes', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.className === undefined) 
    {
        query1 = "SELECT * FROM Classes;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Classes WHERE className LIKE "${req.query.className}%"`;
    }

    // Query for Departments and Professors so the dropdowns on the frontend can be populated
    let query2 = "SELECT * FROM Departments;";
    let query3 = "SELECT * FROM Professors;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the classes
        let classes = rows

        db.pool.query(query2, (error, rows, fields) => {
            let departments = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let professors = rows;
                return res.render('classes', {data: classes, departments: departments, professors: professors});
            })
        })
    })
});

/*
<<<<<<< HEAD
    INSERT Operations for Classes
=======
    INSERT Operation
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
*/

app.post('/add-class-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
    
        // Create the query and run it on the database

        query1 = `INSERT INTO Classes (className, credit, departmentID, professorID) VALUES ('${data.className}', '${data.credit}', ${data.departmentID}, ${data.professorID})`;
  
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Classes
                query2 = `SELECT * FROM Classes;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

<<<<<<< HEAD

/* DELETE OPERATION for Classes */
=======
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758

/* 
    DELETE Operation
*/
app.delete('/delete-class-ajax', function(req,res,next){
    let data = req.body;
    let classID = parseInt(data.id);
    let deleteStudents_has_Classes = `DELETE FROM Students_has_Classes WHERE classID = ?`;
    let deleteClasses = `DELETE FROM Classes where classID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteStudents_has_Classes, [classID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteClasses, [classID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

<<<<<<< HEAD

/* UPDATE CLASS */
=======
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758

/* 
    UPDATE Operation 
*/
app.put('/put-class-ajax', function(req,res,next){
    let data = req.body;
  
    let professor = parseInt(data.professor);
    let classes = parseInt(data.className);
  
    let queryUpdateProfessor = `UPDATE Classes SET professorID = ? WHERE Classes.classID = ?`;
    let selectProfessor = `SELECT * FROM Professors WHERE professorID = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateProfessor, [professor, classes], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the Classes table
              else
              {
                  // Run the second query
                  db.pool.query(selectProfessor, [professor], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

/*
----------------------------
Departments ROUTES 
----------------------------
*/

/*
<<<<<<< HEAD
    SELECT operation
=======
    SELECT Operation
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
*/ 
app.get('/departments', function(req, res){
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.className === undefined)
    {
        query1 = "SELECT * FROM Departments;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Departments WHERE departmentName LIKE "${req.query.departmentName}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Departments;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fiels){

        // Save the departments
        let departments = rows

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the departments
            let departments = rows;
            res.render('departments', {data: departments})
        })
    })
});

/*
INSERT Operation
*/
app.post('/add-department-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
<<<<<<< HEAD
    
=======
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
        // Create the query and run it on the database
        query1 = `INSERT INTO Departments (departmentName) VALUES ('${data.departmentName}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Departments
                query2 = `SELECT * FROM Departments;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

/*
DELETE Operation
*/
app.delete('/delete-department-ajax/', function(req,res,next){
    let data = req.body;
    let departmentID = parseInt(data.departmentID);
    let deleteDepartment = `DELETE FROM Departments WHERE departmentID = ?`
  
<<<<<<< HEAD
          // Run the 1st query
=======
    // Run the 1st query
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
    db.pool.query(deleteDepartment, [departmentID], function(error, rows, fields){
    if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
    }else {
<<<<<<< HEAD
=======
        // send back a successful response
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
        res.sendStatus(204);
    }
  })});



/*
UPDATE Operation
*/
app.put('/put-department-ajax', function(req,res,next){
    let data = req.body;
    
    let newDepartmentName = data.newDepartmentName;
    let departmentID = data.departmentID;

    let queryUpdateDepartment = `UPDATE Departments SET Departments.departmentName = ? WHERE Departments.departmentID= ?`;
          // Run the 1st query
          db.pool.query(queryUpdateDepartment, [newDepartmentName, departmentID], function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
<<<<<<< HEAD
              // If there was no error, update the row on the frontend 
=======
              // If there was no error, update the row on the frontend, otherwise send data over
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
              else
              {
                res.send(rows);
              }
  })});


/*
----------------------------
Professors ROUTES 
----------------------------
<<<<<<< HEAD
*/

/*
    SELECT operation
*/ 
app.get('/professors', function(req, res){
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.className === undefined)
    {
        query1 = "SELECT * FROM Professors;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Professors WHERE lastName LIKE "${req.query.lastName}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Departments;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the departments
        let professors = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the departments
            let departments = rows;
            res.render('professors', {data: professors, departments: departments})
        })
    })
});

/*
    INSERT Operation 
*/
app.post('/add-professor-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        const query1 = `INSERT INTO Professors (lastName, email, departmentID) VALUES ('${data.lastName}', '${data.email}', ${data.departmentID})`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Professors
                query2 = `SELECT * FROM Professors;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

/*
    UPDATE Operation
*/
    app.put('/put-professor-ajax', function(req,res,next){
        let data = req.body;
        
        let professorID = data.professorID;
        let newProfessorName = data.newProfessorName;
        let newProfessorEmail = data.newProfessorEmail;
        let newDepartmentID = data.newDepartmentID;

        let queryUpdateDepartment = `UPDATE Professors SET Professors.lastName = ?, Professors.email = ?, Professors.departmentID = ? WHERE Professors.professorID = ?`;
              // Run the 1st query
              db.pool.query(queryUpdateDepartment, [newProfessorName, newProfessorEmail, newDepartmentID, professorID], function(error, rows, fields){
                  if (error) {
      
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                  }
      
                  // If there was no error, update the row on the frontend 
                  else
                  {
                    res.send(rows);
                  }
      })});

/*
----------------------------
StudentsHasProfessors ROUTES 
----------------------------
*/
app.get('/studentsHasProfessors', function(req, res){
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.studentsHasProfessorsID === undefined)
    {
        query1 = "SELECT * FROM Students_has_Professors;";
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the results
        let studentsHasProfessors = rows;
        res.render('students_has_professors', {data: studentsHasProfessors})
    })
});

/*
  STUDENTS ROUTES
=======
>>>>>>> d4a4ee4210b3c60c2fc533b673ade66adbcbd758
*/

/*
    SELECT Operation
*/ 
app.get('/professors', function(req, res){
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.className === undefined)
    {
        query1 = "SELECT * FROM Professors;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Professors WHERE lastName LIKE "${req.query.lastName}%"`
    }

    // Gets data from Departments table so it can be utilized in the dropdown menu on the frontend
    let query2 = "SELECT * FROM Departments;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the professors
        let professors = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the departments and renders the page, passing over the professor and departments data
            let departments = rows;
            res.render('professors', {data: professors, departments: departments})
        })
    })
});

/*
    INSERT Operation 
*/
app.post('/add-professor-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        const query1 = `INSERT INTO Professors (lastName, email, departmentID) VALUES ('${data.lastName}', '${data.email}', ${data.departmentID})`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Professors
                query2 = `SELECT * FROM Professors;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

/*
    UPDATE Operation
*/
app.put('/put-professor-ajax', function(req,res,next){
    let data = req.body;
    
    // Assigns all fields from the data object to appropriate variables
    let professorID = data.professorID;
    let newProfessorName = data.newProfessorName;
    let newProfessorEmail = data.newProfessorEmail;
    let newDepartmentID = data.newDepartmentID;

    let queryUpdateDepartment = `UPDATE Professors SET Professors.lastName = ?, Professors.email = ?, Professors.departmentID = ? WHERE Professors.professorID = ?`;
        // Run the 1st query
        db.pool.query(queryUpdateDepartment, [newProfessorName, newProfessorEmail, newDepartmentID, professorID], function(error, rows, fields){
            if (error) {
      
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
      
            // If there was no error, update the row on the frontend 
            else
            {
                   res.send(rows);
            }
    })});

/*
DELETE Operation
*/
app.delete('/delete-professor-ajax/', function(req,res,next){
    let data = req.body;
    let professorID = parseInt(data.professorID);

    // Queries to delete the M:N record from Students_has_Professors, and then delete the record from the Professors table
    let deleteStudents_has_Professors = `DELETE FROM Students_has_Professors WHERE professorID = ?`;
    let deleteProfessor = `DELETE FROM Professors WHERE professorID = ?`
    
    db.pool.query(deleteStudents_has_Professors, [professorID], function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // Run the second query
            db.pool.query(deleteProfessor, [professorID], function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } 
            else 
            {
                res.sendStatus(204);
            }
            })
        }
  })});

/*
----------------------------
StudentsHasProfessors ROUTES 
----------------------------
*/

/*
  SELECT Operation
*/
app.get('/studentsHasProfessors', function(req, res){
    // Declare all queries necessary in order to populate dropdowns and acquire needed data from Students_has_Professors table
    let query1 = "SELECT * FROM Students_has_Professors;"
    let query2 = "SELECT * FROM Students;"
    let query3 = "SELECT * FROM Professors;"

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400)
        } else{
            let studentsHasProfessors = rows;
            // run the 2nd query 
            db.pool.query(query2, function(error, rows, fields){
                if(error){
                    console.log(error);
                    res.sendStatus(400);
            } else{
                let students = rows;
                // run the third query
                db.pool.query(query3, function(error, rows, fields){
                    if(error){
                        console.log(error);
                        res.sendStatus(400);
                    } else{
                        // renders the page and passes over all data collected by the queries
                        let professors = rows; 
                        res.render('students_has_professors', {data: studentsHasProfessors, students: students, professors:professors})
                    }
                })
            }})
        }
    })
});

/*
    INSERT Operation
*/
app.post('/add-studentHasProfessor-ajax', function(req, res){
    let data = req.body;

    // query to add record into the table
    const query1 = `INSERT INTO Students_has_Professors (studentID, professorID) VALUES (${data.studentID}, ${data.professorID})`;

    // run the first query 
    db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // run the second query to get all records now that the table has been updated with a new record
            query2 = 'SELECT * FROM Students_has_Professors';
            db.pool.query(query2, function(error, rows, fields){
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // sends rows back as a response
                    res.send(rows);
                }
            })
        }
    })
})

/*
    UPDATE Operation
*/
app.put('/put-student-has-professor-ajax', function(req, res){
    let data = req.body;

    let studentID = data.studentID;
    let professorID = data.professorID
    let studentHasProfessorID = data.studentHasProfessorID;

    let queryUpdateStudentHasProfessors = `UPDATE Students_has_Professors 
    SET Students_has_Professors.studentID = ?, Students_has_Professors.professorID = ? 
    WHERE Students_has_Professors.StudentHasProfessorID = ?`;

    db.pool.query(queryUpdateStudentHasProfessors, [studentID, professorID, studentHasProfessorID], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
})

/*
DELETE Operation
*/
app.delete('/delete-student-has-professor-ajax', function(req,res,next){
    // Assigns all fields from the data object to appropriate variables
    let data = req.body;
    let studentHasProfessorID = data.studentHasProfessorID;
    let deleteStudents_has_Professors = `DELETE FROM Students_has_Professors WHERE StudentHasProfessorID = ?`;

    // run delete query
    db.pool.query(deleteStudents_has_Professors, [studentHasProfessorID], function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // sends back success response code after delete is completed
            res.sendStatus(204);
        }
  })});


/*
----------------------------
  STUDENTS ROUTES
----------------------------
*/

/*
  SELECT Operation
*/
app.get('/students', function(req, res)
    {  
        // Declare Query 1
        let query1;
        
        // If there is no query string, we just perform a basic SELECT
        if (req.query.lastName === undefined)
        {
            query1 = "SELECT * FROM Students;";
        }
        
        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Students WHERE lastName LIKE "${req.query.lastName}%"`;
        }

         // Execute the query
        db.pool.query(query1, function(error, rows, fields){       
            
            // Save the students
            let students = rows
            
            // Render the students.hbs file, and also send the renderer
            res.render('students', {data: students});                   
        })                                                          
});                                                                 

/* 
    INSERT Operation
*/
app.post('/add-student-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (lastName, email, startDate, graduationDate) VALUES ('${data.lastName}', '${data.email}', ${data.startDate}, ${data.graduationDate})`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = `SELECT * FROM Students;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });


/*
    DELETE Operation 
*/
app.delete('/delete-student-ajax', function(req,res,next){
    // Assigns data from request to appropriate variables 
    let data = req.body;
    let studentID = parseInt(data.id);

    // creates queries to DELETE data from all relevant locations for the table
    let deleteStudents_has_Classes = `DELETE FROM Students_has_Classes WHERE studentID = ?`;
    let deleteStudents_has_Professors = `DELETE FROM Students_has_Professors WHERE professorID = ?`;
    let deleteStudents = `DELETE FROM Students where studentID = ?`;
      
        // Run the 1st query
        db.pool.query(deleteStudents_has_Classes, [studentID], function(error, rows, fields){
            if (error) {
      
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
            // Run the second query
                db.pool.query(deleteStudents_has_Professors, [studentID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                    } 
                    else 
                    {
                        // Run the third query
                        db.pool.query(deleteStudents, [studentID], function(error, rows, fields) {
                        if (error) {
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indiciating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                            } else {
                                res.sendStatus(204);
                                }
                                })
                            }
                      })
                  }
      })
    });


/* 
    UPDATE Operation
*/
app.put('/put-class-ajax', function(req,res,next){ 
    // Assigns data from request to appropriate variables 
    let data = req.body;
    let graduationDate = parseInt(data.graduationDate);
    let student = parseInt(data.student);
    
    // defines update query 
    let queryUpdateGraduationDate = `UPDATE Students SET graduationDate = ? WHERE Students.studentID = ?`;

  
          // Run the 1st query
          db.pool.query(queryUpdateGraduationDate, [graduationDate, student], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                res.send(rows);
              }
})});


/* 
--------------------------------
    Students_has_Classes ROUTES
--------------------------------
*/

/*
SELECT Operation
*/
app.get('/students-has-classes', function(req, res)
{  
        let query1 = "SELECT * FROM Students_has_CLasses;";                 // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('students_has_classes', {data: rows});                  // Render the students.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
});  

/* 
    ADD Operation
*/
app.post('/add-student-has-class-ajax', function (req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    

    // Create the query and run it on the database
    query1 = `INSERT INTO Students_has_Classes (studentID, classID) VALUES ('${data.studentID}', '${data.classID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Students;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })



})

/* LISTENER */
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
