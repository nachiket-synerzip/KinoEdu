/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , LocalStrategy = require('passport-local').Strategy
    , TwitterStrategy = require('passport-twitter').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , LinkedInStratergy = require('passport-linkedin').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , User = mongoose.model('User')


module.exports = function (passport, config) {


    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user)
        })
    })

    // use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email,provider:'local' }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' })
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' })
                }
                return done(null, user)
            })
        }
    ))

    // use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID
            , consumerSecret: config.twitter.clientSecret
            , callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            console.log("----------------------");
            console.log("Twitter");
            console.log("----------------------");
            console.log(profile);
            console.log("----------------------");
            User.findOne({ 'twitter.id': profile.id }, function (err, user) {

                if (err) { return done(err) }
                if (!user) {

                    user = new User({
                        name: profile.displayName
                        , username: profile.username
                        , photo :  profile.photos[0].value
                        , provider: 'twitter'
                        , twitter:{
                            id:profile._json.id
                        }
                    })
                    user.save(function (err) {
                        if (err) console.log(err)

                        return done(err, user)
                    })
                }
                else {
                    return done(err, user)
                }
            })
        }
    ))

    // use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID
            , clientSecret: config.facebook.clientSecret
            , callbackURL: config.facebook.callbackURL
            , profileFields: ['id', 'displayName','emails','username','photos']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("----------------------");
            console.log("facebook");
            console.log("----------------------");
            console.log(profile);
            console.log("----------------------");

            User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {
                    user = new User({
                        name: profile.displayName
                        , email: profile.emails[0].value
                        , photo :  profile.photos[0].value
                        , username: profile.username
                        , provider: 'facebook'
                        , facebook: {
                            'id':profile._json.id
                        }
                    })
                    user.save(function (err) {
                        if (err) console.log(err)
                        return done(err, user)
                    })
                }
                else {
                    return done(err, user)
                }
            })
        }
    ))

    passport.use(new LinkedInStratergy({
            consumerKey: config.linkedin.clientID
            ,consumerSecret: config.linkedin.clientSecret
            ,callbackURL: config.linkedin.callbackURL ,
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url','headline']
        },
        function(token, tokenSecret, profile, done) {
            console.log("----------------------");
            console.log("Linkedin");
            console.log("----------------------");
            console.log(profile);
            console.log("----------------------");

            User.findOne({ 'linkedin.id': profile.id }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {

                    user = new User({
                        name: profile.displayName
                        , email: profile.emails[0].value
                        , photo:profile._json.pictureUrl
                        , username: profile.username
                        , provider: 'linkedin'
                        , linkedin: {
                            id:profile._json.id
                        }
                    })
                    user.save(function (err) {
                        if (err) console.log(err)
                        return done(err, user)
                    })
                }
                else {
                    return done(err, user)
                }
            })
        }
    ));

    // use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("----------------------");
            console.log("Google");
            console.log("----------------------");
            console.log(profile);
            console.log("----------------------");

            User.findOne({ 'google.id': profile.id }, function (err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName
                        , email: profile.emails[0].value
                        , photo :  profile._json.picture
                        , username: profile.emails[0].value
                        , provider: 'google'
                        , google: {
                            'id':profile._json.id
                        }
                    })
                    user.save(function (err) {
                        if (err) console.log(err)
                        return done(err, user)
                    })
                } else {
                    return done(err, user)
                }
            })
        }
    ));
}