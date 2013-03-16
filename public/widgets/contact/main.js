define(['underscore', 'hbs!./contact'], function (_, contactTemplate) {

    return {

        type:'Backbone',


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

            this.html(contactTemplate());
        }



    }
});