// App.js


// Database
var db = require('./database/db-connector');

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


PORT        = 4779;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/


/*
    SEARCH opeartions for classes.
*/
app.get('/', function(req, res)
{
    res.render('index')
});

/*
    CLASSES BACKEND
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
            return res.render('classes', {data: classes, departments: departments})
        })
    })
});


/* INSERT Operations for Classes */

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

/* DELETE OPERATION for Classes */

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

/* UPDATE CLASS */

app.put('/put-class-ajax', function(req,res,next){
    let data = req.body;
  
    let professor = parseInt(data.professor);
    let classes = parseInt(data.className);
  
    let queryUpdateProfessor = `UPDATE Classes SET professor = ? WHERE Classes.id = ?`;
    let selectProfessor = `SELECT * FROM Professors WHERE professorID = ?`;
  
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
    STUDENTS BACKEND
*/

app.get('/students', function(req, res)
    {  
        let query1 = "SELECT * FROM Students;";                 // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('students', {data: rows});                  // Render the students.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

/* ADD STUDENT */
app.post('/add-student-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let studentID = parseInt(data.studentID);
        if (isNaN(studentID))
        {
            lastName = 'NULL'
        }

    
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (lastName, email, startDate, graduationDate) VALUES ('${data.lastName}', '${data.email}', ${startDate}, ${graduationDate})`;
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
    });


/* DELETE STUDENT */
app.delete('/delete-student-ajax', function(req,res,next){
    let data = req.body;
    let studentID = parseInt(data.id);
    let deleteStudents_has_Classes = `DELETE FROM Students_has_Classes WHERE studentID = ?`;
    let deleteStudents_has_Professors = `DELETE FROM Students_has_Professors WHERE studentID = ?`
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
                    } else {
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


/* UPDATE STUDENT */
app.put('/put-class-ajax', function(req,res,next){
    let data = req.body;
  
    let student = parseInt(data.student);
    let graduationDate = parseInt(data.graduationDate);
  
    let queryUpdateGraduationDate = `UPDATE Students SET graduationDate = ? WHERE Students.studentID = ?`;

  
          // Run the 1st query
          db.pool.query(queryUpdateGraduationDate, [student, graduationDate], function(error, rows, fields){
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
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
