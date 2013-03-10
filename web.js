var express = require('express');
var routes = require('./routes');
var path = require('path');


var app = express();

app.configure(function(){
    app.set('views',__dirname+'/views');
    app.set('view engine','ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

console.dir(routes);
app.get('/',function(req,res){
    res.redirect('/index.html');
});
app.get('/index.html', routes.index);
app.get('/about.html', routes.about);
app.get('/contact.html', routes.contact);
app.get('/signup.html', routes.signup);

app.get('/login.html', routes.login);

app.get('/courses.html', routes.courses);

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Listening on Port "+port);
});
