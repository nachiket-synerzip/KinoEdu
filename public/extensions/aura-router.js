define({

    name:"Backbone Router",

    require:{
        paths:{
            backbone: 'components/backbone/backbone',
        }
    },

    initialize:function (app) {
        var Backbone = require('backbone');
        var AppRouter = Backbone.Router.extend({
            routes:{
                "!*path":"defaultRoute" // matches http://example.com/#anything-here
            }
        });
        // Initiate the router
        var app_router = new AppRouter;

        app_router.on('route:defaultRoute', function (path) {
            app.sandbox.emit('router',path);
        })

    },
    afterAppStart:function (app) {
        var _ = app.core.util._;
        _.delay(function() {
            Backbone.history.start();
        }, 200);

    }
});