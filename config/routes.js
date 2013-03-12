/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:59 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (app) {




    app.get('/',function(req,res){
        res.redirect('/index.html');
    });
    var pages = require('../app/routes/main');
    app.get('/index.html', pages.index);
    app.get('/about.html', pages.about);
    app.get('/contact.html', pages.contact);
    app.get('/courses.html', pages.courses);

    var courses = require('../app/routes/courses');
    app.get('/api/courses', courses.findAllCourses);
    app.get('/api/courses/:id', courses.findCourseById);
    app.post('/api/courses', courses.createCourse);
    app.put('/api/courses/:id', courses.updateCourseById);
    app.delete('/api/courses/:id', courses.deleteCourseById);



}