/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 11:53 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Course = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

var CourseModel = mongoose.model( 'Course', Course );

// C - Create
exports.createCourse = function(req,res){
    var course;


    course = new CourseModel({
        title: req.body.title,
        description: req.body.description,
    });
    course.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(course);
};

//R - Retrieve
exports.findAllCourses = function(req, res){
    CourseModel.find(function (err, courses) {
        if (!err) {
            return res.send(courses);
        } else {
            return console.log(err);
        }
    });

};

exports.findCourseById = function(req, res){

    CourseModel.findById(req.params.id, function (err, course) {
        if (!err) {
            return res.send(course);
        } else {
            return console.log(err);
        }
    })
};
//U - Update
exports.updateCourseById = function(req,res){
    console.log("PUT: ");
    console.log(req.body);
    CourseModel.findById(req.params.id, function (err, course) {
        course.title = req.body.title;
        course.description = req.body.description;

        return course.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(course);
        });
    });
};

//D - Delete

exports.deleteCourseById = function(req,res){
    CourseModel.findById(req.params.id, function (err, course) {
        return course.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}
