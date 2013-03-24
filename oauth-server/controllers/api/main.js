var mongoose = require('mongoose');
var User = mongoose.model( 'User');
var Client = mongoose.model( 'Client');
var AuthorizationGrant = mongoose.model( 'AuthorizationGrant');
var AccessCode = mongoose.model( 'AccessCode');


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

    var async = require('async');
    async.parallel({

            client:function(callback){
                Client.findOne({'clientId':clientId},callback).populate('user');

            },
            grant:function(callback){
                AuthorizationGrant.findOne({'code':code},callback).populate('user','client');
            }

        },
        function(err,results){
            var grant = results.grant;
            var client = results.client;
            if(err){
                console.log(err);
            }
            else if(grant!=null && client!=null){
                var token = new AccessCode({
                    user:grant.user._id,
                    client:client._id,
                    scope: grant.scope
                })
                token.save(function(err,token){
                    if(err){
                        console.log(err);
                        res.respond({'error_code':'error'});
                    }
                    else{
                        res.send({'access_token':token.token});
                    }
                });
            }

        }

    );
}
