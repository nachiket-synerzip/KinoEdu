define(['underscore', 'text!./templates/contact.html'],
    function (_, ContactTemplate) {

    return {

        type:'Backbone',
        template:_.template(ContactTemplate),

        initialize:function () {
            this.render();
            var self = this;
            this.sandbox.on('router', function (path) {
                if (path == 'contact') {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });
        },

        render:function () {

            this.html(this.template());
        }



    }
});