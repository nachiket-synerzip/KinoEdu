var express = require('express')
    ,app = express()
    ,passport = require('passport')
    ,fs = require('fs')
    ,config = require('./config/config')['development']

// database settings
require('./config/database')(config);

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file)
})
var models_path = __dirname + '/oauth-server/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

// express settings
require('./config/express')(app,config,passport);

// Bootstrap routes
require('./config/routes')(app,config,passport);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Listening on Port "+port);
});
