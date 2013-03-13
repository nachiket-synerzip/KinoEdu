/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 12:13 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||'mongodb://localhost/HelloMongoose';

module.exports = function (config) {
    mongoose.connect(config.db, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + uristring + '. ' + err);

        }
    });
}

