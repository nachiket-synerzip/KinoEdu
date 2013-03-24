define({

    name:"Backbone Ajax Extension",

    require:{
        paths:{
            'jquery':'components/jquery/jquery'
        }
    },

    initialize:function (app) {
        var $ = require('jquery');
        app.sandbox.post = function (url,data,success,failure) {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: success,
                failure: failure
            });
        }
    }

});