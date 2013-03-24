/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/24/13
 * Time: 3:38 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var http = require('http');


exports.getAccessToken = function(request,response){
    // An object of options to indicate where to post to
    var options = {
        host: 'localhost',
        port: '5000',
        path: '/auth/exchange-token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    };

    // Set up the request
    var post = http.request(options, function(res) {
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
    try{
        // post the data
        post.write(JSON.stringify(data));
        post.end();
    }
    catch(err){
        console.log(err);
    }


}
