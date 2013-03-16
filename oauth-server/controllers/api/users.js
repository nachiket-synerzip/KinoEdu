/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 10:52 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , User = mongoose.model('User')

/**
 * Create user
 */

exports.signup = function (req, res) {
    var emailAddress = req.body.email;
    console.log("finding user with email "+emailAddress);
    User.findOne(
        {
            email:emailAddress
        }
        ,function (err, user) {
            if(err==null && user!=null){
                res.send({
                    "status":"failure",
                    "err":{
                        errors:{
                            "userAlreadyRegistered":{
                                type:"User is already registered!"
                            }
                        }
                    }
                })
            }
            else{
                var user = new User(req.body)
                user.provider = 'local'
                user.save(function (err) {
                    if (err) {
                        return res.send({
                            "status":"failure",
                            "err":err
                        })
                    }
                    res.send({
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



/**
 * Find user by id
 */

exports.login = function (req, res) {
    var emailAddress = req.body.email;
    var password = req.body.password;
    console.log(emailAddress + " : "+password);
    User.findOne(
        {
            email:emailAddress
        }
        ,function (err, user) {
            console.log(err);
            console.log(user);
            if(user!=null && user.authenticate(password)){
                //TODO Send a token, with expiry to client
                //TODO Generate the short lived token
                res.send({status:"success",token:"token123"});
            }
            else{

                return res.send({
                    "status":"failure",
                    "err":{
                        errors:{
                            "invalid username password":{
                                type:"Username Password did not match!"
                            }
                        }
                    }
                })
            }

        }
    )
}
