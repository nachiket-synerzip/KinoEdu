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
                app.sandbox.security = {};
                app.sandbox.security.login = function(){

                };

                app.sandbox.security.logout = function(){

                };

                app.sandbox.security.isLoggedIn = function(){

                };

                app.sandbox.security.getUserProfile = function(){

                };

                //TODO add functionality to clear the OAuth parameters from url once we have consumed them
                app.sandbox.oauth = {};
                app.sandbox.oauth.clearUri = function(){
                    var shortURL = window.location.href.substring(0, window.location.href.indexOf('?'));
                    console.log(shortURL);
                    window.location.replace(shortURL); // Causes redirect

                }
                app.sandbox.oauth.logout = function(){

                    app.sandbox.set('accessToken',null);
                    app.sandbox.set('userProfile',null);

                }
            },
            afterAppStart:function (app) {
                var params = this.getQueryParams();
                if(params.code!=null && params.state!=null){

                    var jsonData = {code:params.code};
                    $.ajax({
                        type: "POST",
                        url: '/api/access-token',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(jsonData),
                        success: function(data){
                            var accessToken=data.access_token;

                            app.sandbox.set('accessToken',accessToken);

                            $.ajax({
                                type: "GET",
                                url: '/api/user/profile',
                                contentType: "application/json; charset=utf-8",

                                dataType: "json",
                                data: '{}',
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('access_token', accessToken);
                                    console.log('aaaa '+accessToken);
                                },

                                success: function(data){
                                    app.sandbox.set('userProfile',JSON.stringify(data));
                                    app.sandbox.oauth.clearUri();


                                },
                                failure:function(err){

                                }
                            });



                        },
                        failure: function(err){

                        }
                    });

                }
                else if(params.error!=null && params.state!=null){
                    //Clear existing access_token also
                    app.sandbox.oauth.logout();
                }

            }
        }
    }
});