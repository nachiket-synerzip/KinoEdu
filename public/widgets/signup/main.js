define(['underscore', 'hbs!./signup'], function(_, signupTemplate) {

  return {
    
    type: 'Backbone',
    events: {
        'click .signup':  function(e) {
            var name = $("input:text[name='name']").val();
            var username = $("input:text[name='username']").val();
            var email = $("input:text[name='email']").val();
            var password = $("input:password[name='password']").val();
            var repeatPassword = $("input:password[name='repeatPassword']").val();

            var validForm = true;
            if(password != repeatPassword){
                alert("Passwords don't match");
                validForm = false;
            }
            //TODO - Put more validation code here
            if(validForm){
                var data = {
                    name:name,
                    username:username,
                    email:email,
                    password:password
                }
                var self = this;
                this.sandbox.post('/api/signup',data,function(data){
                    if(data.status == 'failure'){
                        var errorMsg = "<ul>";
                        for(var errorName in data.err.errors){
                            var error = data.err.errors[errorName];
                            errorMsg = errorMsg + "<li>"+error.type+"</li>";
                        }
                        errorMsg = errorMsg+"</ul>";
                        self.errorView.find('div').html(errorMsg);
                        self.welcomeView.hide();
                        self.formView.show();
                        self.errorView.show();
                    }
                    else{
                        self.welcomeView.find('.name').html(data.user.name)
                        self.welcomeView.show();

                        self.formView.hide();
                        self.errorView.hide();
                    }
                },
                function(errMsg){
                    self.errorView.html(errMsg);
                    self.welcomeView.hide();
                    self.formView.show();
                    self.errorView.show();
                });
            }
        }
    },


    initialize: function() {
        this.render();

        this.errorView = $(".error");
        this.formView =  $(".form");
        this.welcomeView = $(".welcome");


    },

    render: function() {
        this.html(signupTemplate());
    }
  }
});