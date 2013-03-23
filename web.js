var express = require('express')
    ,app = express()
    ,passport = require('passport')
    ,config = require('./config/config')[process.env.AppMode||'development']


//Exposing EmailServer as global variable until I know better
emailServer = require('./config/email')(config);




// database settings
require('./config/database')(config);

require('./config/dataload')();


// bootstrap passport config
require('./config/passport')(passport, config)

// express settings
require('./config/express')(app,config,passport);

// Bootstrap routes
require('./oauth-server/config/routes')(app,config,passport);
require('./app/config/routes')(app,config,passport);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Listening on Port "+port);
});
