/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:59 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (app,config,passport) {

    app.get('/',function(req,res){
        res.redirect('/index.html#!home');
    });
    var appPages = require('../app/controllers/pages/main');
    app.get('/index.html', appPages.index);

    var courses = require('../app/controllers/api/courses');
    app.get('/api/courses', courses.findAllCourses);
    app.get('/api/courses/:id', courses.findCourseById);
    app.post('/api/courses', courses.createCourse);
    app.put('/api/courses/:id', courses.updateCourseById);
    app.delete('/api/courses/:id', courses.deleteCourseById);


    var oauthPages = require('../oauth-server/controllers/pages/main');
    app.get('/login.html', oauthPages.login);
    app.get('/signup.html', oauthPages.signup);

    var users = require('../oauth-server/controllers/api/users')
    app.post('/api/signup', users.signup)
    app.post('/api/login', users.login)


}