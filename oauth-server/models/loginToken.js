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
    , crypto = require('crypto')


/**
 * User Schema
 */

var LoginToken = new Schema({
    user: Schema.ObjectId,
    loginToken: String,
    expiry: Date
})


/**
 * Methods
 */

LoginToken.methods = {


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
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    createToken: function(value) {
        if (!password) return ''
        return crypto.createHmac('sha1', this.salt).update(value).digest('hex')
    }
}

mongoose.model('LoginToken', LoginToken)