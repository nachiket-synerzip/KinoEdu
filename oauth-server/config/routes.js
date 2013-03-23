/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 10:59 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (app,config,passport) {





    var oauthPages = require('../controllers/pages/main');


    app.get('/login.html', oauthPages.login);

    app.get('/grant.html', oauthPages.grant);
    app.post('/grant.html', oauthPages.grantSubmit);

    app.get('/signup.html', oauthPages.signup);
    app.post('/signup.html', oauthPages.signupSubmit)

    app.post('/grant.html', oauthPages.grantSubmit);


    app.post('/login.html',function(req,res){
        var redirectUri = req.body.redirect_uri || '/login.html';
        passport.authenticate('local', {  successFlash: 'Welcome!', successRedirect: redirectUri,failureRedirect: '/login.html',failureFlash: true })(req,res);
    });


    app.get('/auth/facebook', function(req,res){
        req.session.redirect_url=req.query['redirect_uri'];
        console.log('-------');
        console.log(req.session.redirect_url)
        passport.authenticate('facebook',{ scope: ['email'] })(req,res);
    });
    app.get('/auth/facebook/callback', function(req,res){
        passport.authenticate('facebook', { successRedirect: req.session.redirect_url,
            failureRedirect: '/login.html' })(req,res);
    });


    app.get('/auth/twitter',function(req,res){
        req.session.redirect_url=req.headers.referer;
        passport.authenticate('twitter')(req,res);
    });
    app.get('/auth/twitter/callback',function(req,res){
        passport.authenticate('twitter', { successRedirect: req.session.redirect_url,
            failureRedirect: '/login.html' })(req,res);
    });

    app.get('/auth/google',function(req,res){
        req.session.redirect_url=req.headers.referer;
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] })(req,res);
    });
    app.get('/auth/google/callback',function(req,res){
        passport.authenticate('google', { successRedirect: req.session.redirect_url,
            failureRedirect: '/login.html' })(req,res);
    });


    app.get('/auth/linkedin',function(req,res){
        req.session.redirect_url=req.headers.referer;
        passport.authenticate('linkedin',{ scope: ['r_basicprofile', 'r_emailaddress'] })(req,res);
    });
    app.get('/auth/linkedin/callback',function(req,res){
        passport.authenticate('linkedin', { successRedirect: req.session.redirect_url,
            failureRedirect: '/login.html' })(req,res);
    });

    var oauthAPI = require('../controllers/api/main');
    app.post('/auth/exchange-token',oauthAPI.exchangeToken);



}