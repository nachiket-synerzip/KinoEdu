define(['underscore', 'hbs!./courses'], function (_, coursesTemplate) {

    return {

        type:'Backbone',


        initialize:function () {
            this.render();
            var self = this;
            this.sandbox.on('router', function (path) {
                if (path == 'courses') {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });
        },

        render:function () {

            this.html(coursesTemplate());
        }



    }
});