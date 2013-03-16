define(['underscore', 'hbs!./about'], function (_, aboutTemplate) {

    return {

        type:'Backbone',


        initialize:function () {
            this.render();
            var self = this;
            this.sandbox.on('router', function (path) {
                if (path == 'about') {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });
        },

        render:function () {

            this.html(aboutTemplate());
        }



    }
});