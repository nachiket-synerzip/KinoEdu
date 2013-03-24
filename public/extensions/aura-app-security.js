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
            getQueryParams:function (location) {
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
                app.sandbox.security.login = function (code, callback) {

                    var jsonData = {'code':code};

                    $.ajax({
                        type:"POST",
                        url:'/api/access-token',
                        contentType:"application/json; charset=utf-8",
                        dataType:"json",
                        data:JSON.stringify(jsonData),
                        success:function (data) {
                            var accessToken = data.access_token;
                            app.sandbox.set('accessToken', accessToken);
                            if(callback){
                                callback(null,accessToken);
                            }
                        },
                        failure:function (err) {
                            if(callback){
                                callback(err,null);
                            }
                        }
                    });

                };

                app.sandbox.security.logout = function (callback) {
                    app.sandbox.set('accessToken', null);
                    app.sandbox.set('userProfile', null);
                    if(callback){
                        callback(null,true);
                    }
                };

                app.sandbox.security.isLoggedIn = function (callback) {
                    var loginStatus = ((app.sandbox.get('userProfile') != null)
                        && (app.sandbox.get('accessToken') != null));
                    if(callback){
                        callback(null,loginStatus);
                    }
                };

                app.sandbox.security.getUserProfile = function (accessToken,callback) {
                    if (accessToken != null) {
                        $.ajax({
                            type:"GET",
                            url:'/api/user/profile',
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            data:'{}',
                            beforeSend:function (xhr) {
                                xhr.setRequestHeader('access_token', accessToken);
                            },
                            success:function (data) {
                                app.sandbox.set('userProfile', JSON.stringify(data));
                                if(callback){
                                    callback(null,data);
                                }
                            },
                            failure:function (err) {
                                if(callback){
                                    callback(err,null);
                                }
                            }
                        });
                    }
                };
                app.sandbox.security.clearUri = function () {
                    var shortURL = window.location.href.substring(0, window.location.href.indexOf('?'));
                    window.location.replace(shortURL);
                }


            },
            afterAppStart:function (app) {
                var params = this.getQueryParams();
                if (params.code != null && params.state != null) {

                    app.sandbox.security.login(params.code,function(err,accessToken){
                        app.sandbox.security.getUserProfile(accessToken,function(err,userProfile){
                            if(err){
                                console.log('Got Error while getting getUserProfile');
                                console.log(err);
                            }
                            else if(userProfile!=null){
                                app.sandbox.security.clearUri();
                            }
                        });
                    });

                }
                else if (params.error != null && params.state != null) {
                    //Clear existing access_token also
                    app.sandbox.security.logout();
                }

            }
        }
    }
});