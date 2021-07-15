const express = require('express');
const app = express();

app.listen(8080);

// set up connection to database

// define our routes
// - GET "/" default route lists our todos
// - POST / Adds a todo
// - POST /todo/:id - mark as done
// - DELETE /todo/:id - delete it
