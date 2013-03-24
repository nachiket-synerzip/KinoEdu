define(['underscore', 'text!./templates/about.html'],
    function (_, AboutTemplate) {

    return {

        type:'Backbone',
        template:_.template(AboutTemplate),

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

            this.html(this.template());
        }



    }
});