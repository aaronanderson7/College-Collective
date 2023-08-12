// App.js

//Dotenv 
require('dotenv').config();


// Database
var db = require('./database/db-connector');

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


PORT = process.env.PORT;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
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
*/
app.get('/', function(req, res)
{
    res.render('index')
});

app.get('/classes', function(req, res){
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
        query1 = `SELECT * FROM Classes WHERE className LIKE "${req.query.className}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Departments;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fiels){

        // Save the classes
        let classes = rows

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the departments
            let departments = rows;
            res.render('classes', {data: classes, departments: departments})
        })
    })
});


/*
    INSERT Operations 
*/

app.post('/add-class-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let departmentID = parseInt(data.departmentID);
        if (isNaN(departmentID))
        {
            className = 'NULL'
        }
    
        let professorID = parseInt(data.professorID);
        if (isNaN(professorID))
        {
            credit = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Classes (className, credit, departmentID, professorID) VALUES ('${data.className}', '${data.credit}', ${departmentID}, ${professorID})`;
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

/*
    DELETE OPERATION
*/

app.delete('/delete-class-ajax/', function(req,res,next){
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

/*
  UPDATE OPERATION 
*/

app.put('/put-class-ajax', function(req,res,next){
    let data = req.body;
  
    let professor = parseInt(data.professor);
    let classes = parseInt(data.className);
  
    let queryUpdateProfessor = `UPDATE Classes SET professor = ? WHERE Classes.id = ?`;
    let selectProfessor = `SELECT * FROM Professors WHERE id = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateProfessor, [professor, classes], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
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
    SELECT operation
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
  
              // If there was no error, update the row on the frontend 
              else
              {
                res.send(rows);
              }
  })});


/*
----------------------------
Professors ROUTES 
----------------------------
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
    let query2 = "SELECT * FROM Professors;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the departments
        let professors = rows

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the departments
            let professors = rows;
            res.render('professors', {data: professors})
        })
    })
});

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
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
