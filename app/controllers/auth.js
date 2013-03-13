var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }

});

var UserModel = mongoose.model( 'User', User );

// C - Create
exports.signUp = function(req,res){

    var user = new UserModel({
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
