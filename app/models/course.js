/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/14/13
 * Time: 12:49 AM
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var Course = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

var CourseModel = mongoose.model( 'Course', Course );
