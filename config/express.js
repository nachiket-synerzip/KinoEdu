/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:57 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , flash = require('connect-flash')
    , helpers = require('view-helpers')



module.exports = function (app,config,passport) {

    app.configure(function(){
        app.use(express.compress());
        app.use(express.static(__dirname + '/../public'));
        app.set('views',__dirname+'/../oauth-server/views');

        app.set('view engine','ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));

        app.use(helpers(config.app.name))

        // cookieParser should be above session
        app.use(express.cookieParser())

        app.use(express.bodyParser());
        app.use(express.methodOverride());

        // express/mongo session storage
        app.use(express.session({
            secret: 'noobjs',
            store: new mongoStore({
                url: config.db,
                collection : 'sessions'
            })
        }))

        app.use(flash())
        // use passport session
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(app.router);


    });

}