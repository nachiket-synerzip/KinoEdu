/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:57 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')


module.exports = function (app) {

    app.configure(function(){
        app.set('views',__dirname+'/../app/views');
        app.set('view engine','ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(__dirname + '/../public'));
    });

}