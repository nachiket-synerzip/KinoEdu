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



    var security = require('../../app/controllers/api/security');
    app.all('/api/*',security.requireAccessToken,security.loadUser);

    app.post('/api/access-token', security.getAccessToken);

    var userProfile = require('../../app/controllers/api/userprofile');
    app.get('/api/user/profile',userProfile.getUser);

    var courses = require('../../app/controllers/api/courses');
    app.get('/api/courses', courses.findAllCourses);
    app.get('/api/courses/:id', courses.findCourseById);
    app.post('/api/courses', courses.createCourse);
    app.put('/api/courses/:id', courses.updateCourseById);
    app.delete('/api/courses/:id', courses.deleteCourseById);




}