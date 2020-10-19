require('dotenv').config();

var express = require('express');
var app = express();

var logTest = require('./controllers/logcontroller');
var user = require('./controllers/usercontroller')


var sequelize = require('./db');



app.use('/api/test', function(req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
});

sequelize.sync(); 

app.use(express.json());


app.use(require('./middleware/headers')); 
app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/log', logTest);

app.listen(3000, function() {
    console.log('App is listening on 3000.')
})