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
 * Authorization Schema
 */

var AuthorizationGrant = new Schema({
    code: {type:String,index: { unique: true }},
    user:{ type: ObjectId, ref: 'User' },
    scope: [String],
    client:{ type: ObjectId, ref: 'Client' },
    redirectURI:String
})


/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

AuthorizationGrant.path('code').validate(function (code) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return code.length
}, 'Code cannot be blank')

AuthorizationGrant.path('user').validate(function (user) {
    return user.length
}, 'User cannot be blank')

AuthorizationGrant.path('scope').validate(function (scope) {
    return scope.length
}, 'Scope cannot be blank')

AuthorizationGrant.path('client').validate(function (client) {
    return client.length
}, 'Client cannot be blank')

AuthorizationGrant.path('redirectURI').validate(function (redirectURI) {
    return redirectURI.length
}, 'RedirectURI cannot be blank')



/**
 * Pre-save hook
 */

AuthorizationGrant.pre('save', function(next) {

    this.salt = this.makeSalt();

    if(this.code == null){
        this.code = this.encrypt(this.redirectURI);
    }

    next();

})

/**
 * Methods
 */

AuthorizationGrant.methods = {
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

mongoose.model('AuthorizationGrant', AuthorizationGrant);
