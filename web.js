var express = require('express')
    ,app = express()
    ,config = require('./config/config')[process.env.AppMode||'development'];


// express settings
require('./config/express')(app,config);

//Bootstrap rouets
require('./app/config/routes')(app, config);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Listening on Port "+port);
});
