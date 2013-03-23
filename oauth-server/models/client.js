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
 * Client Schema
 */

var ClientSchema = new Schema({
    user:{ type: ObjectId, ref: 'User' },
    name: {type:String,index: { unique: true }},
    description : String,
    redirectURIs: [String],
    salt: String,
    clientId: {type:String,index: { unique: true }},
    clientSecret : String
})


/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

ClientSchema.path('user').validate(function (user) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return user.length
}, 'User cannot be blank')

ClientSchema.path('name').validate(function (name) {
    return name.length
}, 'Name cannot be blank')

ClientSchema.path('description').validate(function (description) {
    return description.length
}, 'Description cannot be blank')

ClientSchema.path('redirectURIs').validate(function (redirectURIs) {
    return redirectURIs.length
}, 'RedirectURIs cannot be blank')



/**
 * Pre-save hook
 */

ClientSchema.pre('save', function(next) {

    this.salt = this.makeSalt();
    if(this.clientId == null){
        this.clientId = this.salt;
    }
    if(this.clientSecret == null){
        this.clientSecret = this.encrypt(this.name);
    }

    next();

})

/**
 * Methods
 */

ClientSchema.methods = {
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

mongoose.model('Client', ClientSchema);