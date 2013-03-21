var mongoose = require('mongoose');
var User = mongoose.model( 'User');


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


        //TODO check if clientId and redirectURI matches
        //TODO check if scopeStr are valid permissions
        res.render('grant',{clientId:clientId,redirectURI:redirectURI,permissions:scope,state:state});
    }
    else{
        res.redirect('/login.html?redirect_uri='+encodeURIComponent(req.originalUrl));
    }

}

exports.grantSubmit = function(req,res){
    var clientId = req.body.clientId;
    var redirectURI = req.body.redirectURI;
    var permissions = req.body.permissions;
    var status = req.body.status;
    var state = req.body.state;

    console.log("------");
    console.log(clientId +" "+redirectURI+ " "+status);
    console.log(permissions);
    console.log("------");

    //TODO If status = Grant
    //TODO - Create a AuthorizationGrant with following values
    //TODO      1. client_id
    //TODO      2. permissions
    //TODO   Then redirect to <<redirect_uri>>?code=<<code>>&state=<<state>>
    //TODO If status = Deny
    //TODO   Then redirect to <<redirect_uri>>?error="access_denied"

    var authorizationGrant = '939dueu393';
    if(status == 'Grant'){
        var uri = redirectURI +(redirectURI.indexOf('?')==-1?'?':':')+"code="+authorizationGrant+"&state="+state;
        res.redirect(uri)

    }
    else{
        var uri = redirectURI +(redirectURI.indexOf('?')==-1?'?':':')+"error=access_denied";
        res.redirect(uri)
    }
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
                var user = new User(req.body)
                user.provider = 'local'
                user.save(function (err) {
                    if (err) {
                        return res.render('signup',{
                            "status":"failure",
                            "err":err
                        })
                    }
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

