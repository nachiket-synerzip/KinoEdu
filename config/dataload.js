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
        scope.save(function (err) {
            if(err) {
                console.log('Error Inserting Scope in DB');
                console.log(err);
            }
        });
    }

    var userAvailableCallback = function(user){
        Client.findOne({name:config.mainClient.name},function(err,client){
            if(err){
                console.log('Error while finding main client');
                console.log(err);
            }
            else if(client==null){
                console.log('Main Client not found creating one........');
                var mainClient = new Client({
                    user:user._id,
                    name: config.mainClient.name,
                    clientId:'kino',
                    clientSecret:'secret',
                    description : config.mainClient.description,
                    redirectURIs: config.mainClient.redirectURIs.split(',')
                })

                mainClient.save(function(err,mainClient){
                    if (err) {
                        console.log("Got Error while Creating Client " + mainClient);
                        console.log(err);
                    }
                    else {
                        console.log("Successfully Create Main Client.....");
                        console.log('All Systems checked, proceeding to Starting App.....');
                    }
                });
            }
            else if(client!=null){
                if(client.user != user._id){
                    client.user = user._id;
                    console.log('Updating client with new user...')
                    client.save(function(err,client){
                        if(err){

                        }
                        else{
                            console.log('Client successfully updated....')
                            console.log('All Systems checked, proceeding to Starting App');
                        }
                    });
                }
                else{
                    console.log('Main Client already exists...');
                    console.log('All Systems checked, proceeding to Starting App');
                }
            }
        }).populate('user');
    }
    //Ensure we have Admin User injected in Database
    User.findOne({email:config.adminUser.email,provider:'local'},function(err,user){
        if(err){
            console.log('Error Finding Admin User with email address '+config.adminUser.email);
        }
        //Create the user if not already present
        else if(user==null){
            console.log('User does not exists......');
            var adminUser = new User({
                name:config.adminUser.name,
                email:config.adminUser.email,
                password:config.adminUser.password,
                provider:'local'

            });

            adminUser.save(function (err) {
                if (err) {
                    console.log("Got Error while Creating User " + adminUser);
                    console.log(err);
                }
                else {
                    console.log('User successfully created.....');
                    userAvailableCallback(adminUser);
                }
            });
        }
        else if(user!=null){
            console.log('User already exists.....')
            userAvailableCallback(user);
        }
    });



}

