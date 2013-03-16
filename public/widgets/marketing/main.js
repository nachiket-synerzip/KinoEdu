define(['underscore', 'hbs!./marketing'], function(_, marketingTemplate) {

  return {
    
    type: 'Backbone',



    initialize: function() {
      this.render();
      var self = this;
      this.sandbox.on('router',function(path){
        if(path == 'home'){
            self.$el.show();
        }
        else{
            self.$el.hide();
        }

      });
    },

    render: function() {
      this.html(marketingTemplate());
    }



  }
});