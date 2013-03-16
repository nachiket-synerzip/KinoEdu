define(function () {
    return function (app) {
        var _ = app.core.util._;
        var historyStarted = false;
        var Backbone;
        return {
            require:{
                paths:{
                    backbone:'components/backbone/backbone',
                    underscore:'components/underscore/underscore'
                },
                shim:{
                    backbone:{ exports:'Backbone', deps:['underscore', 'jquery'] }
                }
            },
            getQueryParams:function(location) {
                var match, re, ret;
                re = /\??(.*?)=([^\&]*)&?/gi;
                ret = {};
                while (match = re.exec(window.location.search)) {
                    ret[match[1]] = match[2];
                }
                return ret;
            },
            initialize:function (app) {
                console.log("Initialized Aura OAuth Callback Extension");
                //TODO add functionality to clear the OAuth parameters from url once we have consumed them
                app.sandbox.oauth = {};
                app.sandbox.oauth.clearUri = function(){

                    window.document.href = window.location.protocol+'//'+window.location.host+window.location.pathname;

                }
                app.sandbox.oauth.logout = function(){

                    app.sandbox.set('accessToken',null);

                }
            },
            afterAppStart:function (app) {
                var params = this.getQueryParams();
                if(params.code!=null && params.state!=null){

                    //TODO Step 1. call app server to convert authorization token into access token
                    //TODO Step 2. store the access_token in local storage
                    //TODO Step 3. Get the User Profile using access_token
                    //TODO Step 4. Store User Profile in local storage and clear url
                    //TODO Step 5. Reset the URL

                    var accessToken="token789";
                    app.sandbox.set('accessToken',accessToken);
                    var userProfile = {
                        name:'John Smith',
                        username:'johnsmith',
                        email:'johnsmith@gmail.com'
                    };
                    app.sandbox.set('userProfile',JSON.stringify(userProfile));


                }
                else if(params.error!=null && params.state!=null){
                    //Clear existing access_token also
                    app.sandbox.oauth.logout();
                }

            }
        }
    }
});