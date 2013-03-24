/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/24/13
 * Time: 3:38 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var http = require('http');
var AccessCode = mongoose.model('AccessCode');


exports.getAccessToken = function (request, response) {
    // An object of options to indicate where to post to
    var options = {
        host:'localhost',
        port:'5000',
        path:'/auth/exchange-token',
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    };

    // Set up the request
    var post = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            response.send(data);
        });
    });

    //TODO read it from process.env variable
    var data = {
        clientId:'kino',
        clientSecret:'secret',
        code:request.body.code
    }

    // post the data
    post.write(JSON.stringify(data));
    post.end();


}


exports.requireAccessToken = function (req, res, next) {
    var accessToken = req.header('access_token');

    if(req.originalUrl == '/api/access-token'){
       next();
    }
    else if (accessToken) {
        AccessCode.findOne({token:accessToken},function (err, accessCode) {
            if (err) {

                res.send({error:'internal server error'});
            }
            else if (accessCode == null) {

                res.send({error:'invalid access token'});
            }
            else if (accessCode != null) {
                req['user'] = {
                    _id:accessCode.user._id,
                    email:accessCode.user.email,
                    name:accessCode.user.name
                };
                next();
            }

        }).populate('user');
    }
    else {
        res.send({error:'missing access token'});
    }


}

exports.loadUser = function (req, res, next) {
    //TODO Provision to do something specific for Loading User,
    // else we will remove this
    next();
}