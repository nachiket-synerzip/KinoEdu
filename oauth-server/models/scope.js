/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 2:02 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , crypto = require('crypto')

/**
 * Scope Schema
 */

var ScopeSchema = new Schema({
    scope:{type:String,index: { unique: true }},
    description : String

})


/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
}



ScopeSchema.path('scope').validate(function (scope) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return scope.length
}, 'Scope cannot be blank')

ScopeSchema.path('description').validate(function (description) {
    return description.length
}, 'Description cannot be blank')

mongoose.model('Scope', ScopeSchema);