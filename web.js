var express = require('express');
var app = express();

// database settings
require('./config/database')();

// express settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Listening on Port "+port);
});
