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

var AccessCode = new Schema({
    token:String,
    user:{ type: ObjectId, ref: 'User' },
    client:{ type: ObjectId, ref: 'Client' },
    scope: [String]
})


/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

AccessCode.path('token').validate(function (token) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return token.length
}, 'Token cannot be blank')

AccessCode.path('user').validate(function (user) {
    return user.length
}, 'User cannot be blank')

AccessCode.path('scope').validate(function (scope) {
    return scope.length
}, 'Scope cannot be blank')

AccessCode.path('client').validate(function (client) {
    return client.length
}, 'Client cannot be blank')




/**
 * Pre-save hook
 */

AccessCode.pre('save', function(next) {

    this.salt = this.makeSalt();
    if(this.token == null){
        this.token = this.encrypt(this.scope.join(' '));
    }


    next();

})

/**
 * Methods
 */

AccessCode.methods = {
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    /**
     * Encrypt Given Value
     *
     * @param {String} value
     * @return {String}
     * @api public
     */

    encrypt: function(value) {
        if (!value) {
            return '';
        }

        return crypto.createHmac('sha1', this.salt).update(value).digest('hex');
    }
}

mongoose.model('AccessCode', AccessCode);
