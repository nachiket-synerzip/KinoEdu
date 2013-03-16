define(['underscore','hbs!./template', 'hbs!./login','hbs!./grant','hbs!./error'],
    function (_, rootTemplate,loginTemplate,grantTemplate,errorTemplate) {

    return {

        type:'Backbone',

        events:{
            'click .login':function(e){
                this.login();
                return;
            },
            'click #grant':function(e){
                this.grant();
                return;
            },
            'click #deny':function(e){
                this.deny();
                return;
            }
        },
        login:function(){
            var email = $("input:text[name='email']").val();
            var password = $("input:password[name='password']").val();

            var data = {
                email:email,
                password:password
            }

            var self = this;
            this.sandbox.post('/api/login', data, function (data) {
                    if (data.status == 'failure') {
                        alert('Got Error');
                    }
                    else {
                        self.sandbox.set('loginToken',data.token);
                        self.render();
                    }
                },
                function (errMsg) {
                    self.errorView.html(errMsg);
                    self.grantView.hide();
                    self.formView.show();
                    self.errorView.show();
                }
            );

        },
        grant:function(){
            //TODO Make an Ajax call to backend web service to get the access token and redirect
            //TODO Actually look at the Uri and see if ? is already used, if yes, then use &
            var accessToken = "token456";
            var redirectUri = this.data.oauthParams.redirectUri+"?code="+accessToken+"&state="+this.data.oauthParams.state;
            window.location.href=redirectUri;
        },
        deny:function(){
            //TODO Actually look at the Uri and see if ? is already used, if yes, then use &
            var redirectUri = this.data.oauthParams.redirectUri+"?error=access_denied&state="+this.data.oauthParams.state;
            window.location.href=redirectUri;
        },
        getURLParameter: function (name) {
            return decodeURIComponent(
                (RegExp(name + '=' + '(.+?)(&|$)', 'i').exec(location.search) || [, ""])[1]
            );
        },
        getScope :function(scopeStr){
            //TODO Create a Web Service that converts scope string into proper details
            //TODO Till then we will use the following hard coded scope
            var scope = [
                {permission:"Allow access to View User Profile"},
                {permission:"Allow access to View Courses"},
                {permission:"Allow access to View Certifications"},
                {permission:"Allow access to Manage User Profile"},
                {permission:"Allow access to Manage Certifications"},
                {permission:"Allow access to Manage Certifications"}
            ]
            return scope;
        },
        fetchData : function(){
            var data = {
                oauthParams:{},
                loginToken:{},
                errors:[]
            }
            data.loginToken = this.sandbox.get('loginToken');
            data.oauthParams.clientId = this.getURLParameter('client_id');
            data.oauthParams.scope = this.getURLParameter('scope');
            data.oauthParams.redirectUri = this.getURLParameter('redirect_uri');
            data.oauthParams.responseType = this.getURLParameter('response_type');
            data.oauthParams.state = this.getURLParameter('state');

            data.scope = this.getScope(data.oauthParams.scope);

            if(data.oauthParams.clientId == null || data.oauthParams.clientId.trim().length <=0 ){

                data.errors.push({key:"client_id",errorMessage:"Missing client_id"});
            }
            if(data.oauthParams.scope == null || data.oauthParams.scope.trim().length <=0 ){

                data.errors.push({key:"scope",errorMessage:"Missing scope"});
            }
            if(data.oauthParams.redirectUri == null || data.oauthParams.redirectUri.trim().length <=0 ){

                data.errors.push({key:"redirect_uri",errorMessage:"Missing redirect_uri"});
            }
            if(data.oauthParams.responseType == null || data.oauthParams.responseType.trim().length <=0 ){

                data.errors.push({key:"response_type",errorMessage:"Missing response_type"});
            }
            if(data.oauthParams.state == null || data.oauthParams.state.trim().length <=0 ){

                data.errors.push({key:"state",errorMessage:"Missing state"});
            }
            return data;
        },

        initialize:function () {
            this.render();
        },

        render:function () {
            this.html(rootTemplate());
            this.errorPanel = $(".errorPanel");
            this.loginPanel = $(".loginPanel");
            this.grantPanel = $(".grantPanel");

            this.data =  this.fetchData();
            this.errorPanel.html(errorTemplate(this.data));
            this.loginPanel.html(loginTemplate(this.data));
            this.grantPanel.html(grantTemplate(this.data));
        },

        showError:function(data){
            this.errorView.html(errorTemplate(data));
        }



    }
});