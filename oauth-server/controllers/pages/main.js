var mongoose = require('mongoose');
var User = mongoose.model( 'User');
var Client = mongoose.model( 'Client');
var Scope = mongoose.model( 'Scope');
var AuthorizationGrant = mongoose.model( 'AuthorizationGrant');


exports.signup = function(req, res){
    res.render('signup');
};

exports.grant = function(req,res){
    if(req.isAuthenticated()){
        var clientId = req.query['client_id'];
        var redirectURI = req.query['redirect_uri'];
        var scopeStr = req.query['scope'];
        var state = req.query['state'];
        var scope = scopeStr.split(',');

        var done = function(locals){
            res.render('grant',{locals:locals,clientId:clientId,redirectURI:redirectURI,scope:scope,state:state});
        }
        var async = require('async');
        async.parallel({
            client:function(callback){
                Client.findOne({'clientId':clientId,'redirectURIs':redirectURI},callback);
            },
            scope:function(callback){
                Scope.find({'scope':{$in:scope}},callback);
            }
        },
        function(err,results){
            if(err){
                var locals={
                    "status":"failure",
                    "err":{
                        message: "Grant Parameter Verification Failed",
                        name: "Grant Parameter Verification Failed",
                        errors:{
                            "databaseError":{
                                message: "Validator \"Grant Parameter Verification Failed\" failed for grant parameters",
                                name: "ValidatorError",
                                path: "grant parameters",
                                type:"Grant Parameter Verification Failed - Database Error - Contact System Administrator!"
                            }
                        }
                    }
                }
                done(locals);
            }
            else if(results.scope!=null && results.scope.length == scope.length && results.client!=null){
                var locals={
                    "status":"success"
                }
                done(locals);
            }
            else if(results.client==null){
                var locals={
                    "status":"failure",
                    "err":{
                        message: "client_id and redirect_uri don't match",
                        name: "client_id and redirect_uri don't match",
                        errors:{
                            "clientIdRedirectURIDontMatch":{
                                message: "Validator \"client_id and redirect_uri don't match\" failed for grant parameters",
                                name: "ValidatorError",
                                path: "grant parameters",
                                type:"client_id and redirect_uri don't match !"
                            }
                        }
                    }
                }
                done(locals);
            }
            else if(results.scope == null || results.scope != scope.length){
                var locals={
                    "status":"failure",
                    "err":{
                        message: "some of the scope values are wrong",
                        name: "some of the scope values are wrong",
                        errors:{
                            "clientIdRedirectURIDontMatch":{
                                message: "Validator \"some of the scope values are wrong\" failed for grant parameters",
                                name: "ValidatorError",
                                path: "grant parameters",
                                type:"some of the scope values are wrong!"
                            }
                        }
                    }
                }
                done(locals);
            }

        });



    }
    else{
        res.redirect('/login.html?redirect_uri='+encodeURIComponent(req.originalUrl));
    }

}

exports.grantSubmit = function(req,res){
    var clientId = req.body.clientId;
    var redirectURI = req.body.redirectURI;
    var state = req.body.state;
    var scope = req.body.scope;
    var status = req.body.status


    if(status == 'Grant'){

        var async = require('async');
        async.parallel({
                user:function(callback){
                    User.findById(req.user._id,callback);
                },
                client:function(callback){
                    Client.findOne({'clientId':clientId},callback);

                }
            },
            function(err,results){
                var user = results.user;
                var client = results.client;
                if(err){
                    console.log(err);
                }
                else if(user!=null && client!=null){
                    var grant = new AuthorizationGrant({
                        'user':user._id,
                        'scope': scope,
                        'client':client._id,
                        'redirectURI':redirectURI
                    })
                    grant.save(function(err,grant){
                        if(err){
                            console.log(err);
                        }
                        else{
                            var authorizationGrant = grant.code;
                            var uri = redirectURI +(redirectURI.indexOf('?')==-1?'?':':')+"code="+authorizationGrant+"&state="+state;
                            res.redirect(uri)
                        }
                    });
                }

            }

        );

    }
    else{
        var uri = redirectURI +(redirectURI.indexOf('?')==-1?'?':':')+"error=access_denied";
        res.redirect(uri)
    }




}


exports.exchangeToken = function(req,res){
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var code = req.body.code;

    console.log("------");
    console.log(clientId +" "+clientSecret);
    console.log(code);
    console.log("------");

    //TODO If clientID & clientSecret Matches and code is Authorization Grant for valid
    //TODO - Create a AccessToken with following values
    //TODO      1. AuthorizationGrant
    //TODO      2. access_token
    //TODO      3. Expiry Date
    //TODO   Then reply back {access_code:'...', expiry_date:'....'}
    //TODO else
    //TODO   Then reply back {error_code:'....',error_message:'....'}

    res.send("{'access_code':'939223','expiry_date':10929832332}");
}

exports.login = function(req, res){
    res.render('login');
};

exports.signupSubmit = function (req, res) {
    var emailAddress = req.body.email;
    User.findOne(
        {
            email:emailAddress
        }
        ,function (err, user) {
            if(err==null && user!=null){
                res.render('signup', {
                    locals:{
                        "status":"failure",
                        "err":{
                            message: "Registration failed",
                            name: "Registration Error",
                            errors:{
                                "userAlreadyRegistered":{
                                    message: "Validator \"User cannot be duplicate\" failed for path name",
                                    name: "ValidatorError",
                                    path: "username",
                                    type:"User is already registered!"
                                }
                            }
                        }
                    }
                });

            }
            else{

                //Check for valid form
                var err = module.exports.validateSignupForm(req);
                if(err!=null){
                    return res.render('signup',{
                        "status":"failure",
                        "err":err
                    })
                }

                var user = new User(req.body);
                user.provider = 'local'
                user.save(function (err) {
                    if (err) {
                        return res.render('signup',{
                            "status":"failure",
                            "err":err
                        })
                    }
                    var message = {
                        text:    "Hi "+user.name+", Please activate your account.",
                        from:    "KinoEdu <kinoeducation@gmail.com>",
                        to:      user.name+"<"+user.email+">",
                        subject: "Welcome to KinoEdu, Please activate your account",
                        attachment:
                            [
                                {data:"<html><h3><a href='http://www.kinoedu.com'>KinoEdu Social Education</a></h3><p>Hi "+user.name+",</p><p> Welcome to KinoEdu - The Social Education Platform. You are successfully registered with <a href='http://www.kinoedu.com'>KinoEdu</a>. Proceed to <a href='http://www.kinoedu.com/'>KinoEduc Platform</a>.</p><p>Cheers KinoEdu Team</p><p>You can follow us on <a href='https://www.facebook.com/pages/Kinoedu/228098023995259?fref=ts'>Facebook</a></p></html>", alternative:true}
                            ]
                    };


                    // send the message and get a callback with an error or details of the message that was sent
                    emailServer.send(message, function(err, message) { console.log(err); });


                    res.render('signup',{
                        "status":"success",
                        "user":{
                            "name":user.name,
                            "username":user.username,
                            "email":user.email
                        }
                    });
                })
            }


        }
    )


}

exports.validateSignupForm = function (req) {

    var err ={

        errors:{}
    };

    if(this.isBlank(req.body.name)){
        err.errors["nameCanNotBeBlank"]={
            message: "Validator \"Name cannot be blank\" failed for path name",
            name: "ValidatorError",
            path: "name",
            type:"Name cannot be blank!"
        };

    }
    if(this.isBlank(req.body.email)){
        err.errors["emailCanNotBeBlank"]={
            message: "Validator \"Email cannot be blank\" failed for path email",
            name: "ValidatorError",
            path: "email",
            type:"Email cannot be blank!"
        };

    }
    if(this.isBlank(req.body.password)){
        err.errors["passwordCanNotBeBlank"]={
            message: "Validator \"Password cannot be blank\" failed for path password",
            name: "ValidatorError",
            path: "password",
            type:"Password cannot be blank!"
        };

    }
    if(req.body.password!=null && (req.body.password != req.body.repeatPassword)){
        err.errors["passwordsDoNotMatch"]={
            message: "Validator \"Passwords do not match\" failed for path name",
            name: "ValidatorError",
            path: "repeatPassword",
            type:"Passwords do not match!"
        };
    }
    if(Object.keys(err.errors).length>0){
        err.message = "Validation Failed";
        err.name = "Validation Failed";
        return err;
    }
    else{
        return null;
    }

    return err;
}

exports.isBlank = function(text){
    return text==null || text.length == 0;
}

