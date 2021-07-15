const express = require('express');
const app = express();
const mysql = require('mysql');

// allow express to serve static files
app.use( express.static('static') );
app.use( express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// set up connection to database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', 
	password: '', 
	database: 'todoList', 
	port: 3306
});
connection.connect();

// define our routes
// - GET "/" default route lists our todos
app.get('/', function(req, res) {

	// fetch our current todos
	connection.query('SELECT id,name,complete FROM todos', function(err, results) {
		console.log(results);

		res.render('index', {
			todoList: results
		});
	});
	// send those to our template
	
});

// - POST / Adds a todo
app.post('/', function(req, res) {
	let todo = req.body.todo;
	console.log('Creating new todo with: "' + todo + '"');
	// insert the record into the database
	connection.query('INSERT INTO todos (name) VALUES (?)', todo, function(err, results) {
		res.redirect('/');
	});
});

// - GET /todo/:id - mark as done
app.get('/todo/:todoId', function(req, res) {
	connection.query('UPDATE todos SET complete = 1 WHERE id = ?', req.params.todoId, function(err, results) {
		res.redirect('/');
	});
});

app.get('/todo/:todoId/markIncomplete', function(req,res){
	connection.query('UPDATE todos SET complete = 0 WHERE id = ?', req.params.todoId, function(err, results) {
		res.redirect('/');
	});
});

app.get('/delete/:todoId', function(req, res) {
	connection.query('DELETE FROM todos WHERE id = ?', req.params.todoId, function(err, results) {
		res.redirect('/');
	});
});

app.listen(8080);