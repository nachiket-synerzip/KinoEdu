define(['underscore', 'text!./templates/courses.html'],
    function (_, CoursesTemplate) {

    return {

        type:'Backbone',
        template:_.template(CoursesTemplate),

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

            this.html(this.template());
        }


    }
});