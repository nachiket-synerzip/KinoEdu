define(['underscore', 'text!./templates/nav-bar.html'],
    function (_, NavBarTemplate) {

    return {

        type:'Backbone',
        template:_.template(NavBarTemplate),

        events:{
            "click .view-profile":"viewProfile",
            "click .logout":"logout"
        },
        viewProfile:function(event){
            alert('viewProfile');
        },
        logout:function(event){
            this.sandbox.security.logout();
            this.sandbox.emit('refresh');
            this.render();
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
            data.loginUrl=baseUri+"/grant.html"+"?client_id=kino&scope=view-profile,manage-profile,view-courses,manage-courses&redirect_uri="+baseUri+"/index.html&response_type=grant&state=abc"

            this.html(this.template(data));

        }



    }
});