define(['underscore', 'hbs!./nav-bar'], function (_, navBarTemplate) {

    return {

        type:'Backbone',

        events:{

        },


        initialize:function () {
            this.render();

        },

        render:function () {
            var accessToken = this.sandbox.get('accessToken');
            var userProfileStr = this.sandbox.get('userProfile');
            var baseUri = window.location.protocol+'//'+window.location.host;
            var userProfile = null;
            if(userProfileStr!=null){
                userProfile = JSON.parse(this.sandbox.get('userProfile'));
            }

            var data = {};
            data.userProfile = userProfile;
            data.loginUrl=baseUri+"/login.html"+"?client_id=123&scope=1,2,3&redirect_uri="+baseUri+"/index.html&response_type=grant&state=abc"
            this.html(navBarTemplate(data));

        }



    }
});