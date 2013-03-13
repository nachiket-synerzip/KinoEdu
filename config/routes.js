/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:59 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (app,config,passport) {

    app.get('/',function(req,res){
        res.redirect('/index.html');
    });
    var pages = require('../app/controllers/main');
    app.get('/index.html', pages.index);
    app.get('/about.html', pages.about);
    app.get('/contact.html', pages.contact);
    app.get('/courses.html', pages.courses);

    var courses = require('../app/controllers/courses');
    app.get('/api/courses', courses.findAllCourses);
    app.get('/api/courses/:id', courses.findCourseById);
    app.post('/api/courses', courses.createCourse);
    app.put('/api/courses/:id', courses.updateCourseById);
    app.delete('/api/courses/:id', courses.deleteCourseById);

    var users = require('../app/controllers/users')
    app.post('/api/signup', users.signup)
    app.post('/api/login', users.login)


}