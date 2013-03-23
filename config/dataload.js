/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 12:13 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , fs = require('fs')

module.exports = function (config) {
    // Bootstrap models
    var models_path = __dirname + '/../app/models'
    fs.readdirSync(models_path).forEach(function (file) {
        require(models_path + '/' + file)
    })
    var models_path = __dirname + '/../oauth-server/models'
    fs.readdirSync(models_path).forEach(function (file) {
        require(models_path + '/' + file)
    })


    var User = mongoose.model('User');
    var Client = mongoose.model('Client');
    var Scope = mongoose.model('Scope');
    var AuthorizationGrant = mongoose.model('AuthorizationGrant');
    Scope.remove({},function(){

    });

    var scopes = [
        {
            scope:"view-profile",
            description:"View the User's Profile"
        },
        {
            scope:"view-profile",
            description:"View the User's Profile"
        },
        {
            scope:"manage-profile",
            description:"Manager the User's Profile"
        },
        {
            scope:"view-courses",
            description:"View User's Courses"
        },
        {
            scope:"manage-courses",
            description:"Manage User's Courses"
        }
    ];
    for(var index=0;index<scopes.length;index++){
        var scopeJson = scopes[index];
        var scope = new Scope(scopeJson);
        scope.save(function (err) {if(err) console.log(err)});
    }



    User.remove({}, function () {
    });
    var sysUser = new User({
        name:'Rohit Ghatol',
        email:'rohitsghatol@gmail.com',
        username:'rohitghatol',
        password:'welcome',
        provider:'local'

    });
    sysUser.save(function (err) {
        if (err) {
            console.log("Got Error while Creating User " + sysUser);
            console.log(err);
        }
        else {
            console.log("Successfully Create Default User");
            console.log(sysUser);
            Client.remove({}, function () {
            });

            var webAppClient = new Client({
                clientId:'kino',
                clientSecret:'secret',
                user:sysUser._id,
                name:'KinoEdu Web App',
                description:'Default KinoEdu Web App Client',
                redirectURIs:['http://localhost:5000/index.html', 'http://www.kinoedu.com/index.html']
            });

            webAppClient.save(function (err) {

                if (err) {
                    console.log("Got Error while Creating Client " + webAppClient);
                    console.log(err);
                }
                else {
                    console.log("Successfully created Client");
                    Client.findOne().populate('user','username name').exec(function (err, client){
                        if(!err){
                            console.log(client);
                        }

                    });
                }
            })

        }
    })


}

