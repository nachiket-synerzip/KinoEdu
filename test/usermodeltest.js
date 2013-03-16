/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 1:19 AM
 * To change this template use File | Settings | File Templates.
 */

var assert = require("assert")
    ,should = require("should")
    ,config = require('../config/config')['development']
    ,mongoose = require('mongoose')

// database settings
require('../config/database')(config);
require('../oauth-server/models/user');

var User = mongoose.model('User')

describe("User",function(){
    describe("Remove All Users",function(){
        it("should be ok",function(done){
            User.remove({}, function (err) {
                should.not.exist(err);
                done();
            });
        });
    });
    describe("create valid User",function(){
       it("should return created User",function(done){

           var user = new User({
               name:"Rohit Ghatol",
               username:"rohitghatol",
               email:"rohit@ghatol.com",
               password:"password"
           })
           user.provider = 'local'

           user.save(function (err) {
               should.not.exist(err);
               done();

           });

       });
    });

    describe("create invalid User",function(){
        it("should return error",function(done){
            var user = new User({})
            user.provider = 'local'
            user.save(function (err) {
                should.exist(err);
                done();

            });

        });

    describe("Find User",function(){
            it("should return atleast one user",function(done){

                User.find(function (err, users) {
                    should.not.exist(err);
                    should.exist(users);
                    users.should.have.lengthOf(1);

                    done();

                })
            });
        });

    });

    describe("FindOne User by emailaddress and password",function(){
        it("should return one user",function(done){

            User.findOne(
                {
                    email:"rohit@ghatol.com"
                }
                ,function (err, user) {
                    should.not.exist(err,"Err should be null");
                    should.exist(user,"User should not be null");
                    user.should.have.property("email","rohit@ghatol.com");
                    user.authenticate("password").should.be.true;
                    done();

                }
            )
        });
    });
    describe("FindOne User by invalid emailaddress and password",function(){
        it("should return no user",function(done){

            User.findOne(
                {
                    email:"rohit@ghatol.com"
                }
                ,function (err, user) {
                    should.not.exist(err,"Err should be null");
                    should.exist(user,"User should not be null");
                    user.should.have.property("email","rohit@ghatol.com");
                    user.authenticate("@##@@#").should.be.false;
                    done();

                }
            )
        });
    });


});