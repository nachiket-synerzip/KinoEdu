define(['underscore', 'text!./templates/marketing.html'],
    function(_, MarketingTemplate) {

  return {
    
    type: 'Backbone',
    template:_.template(MarketingTemplate),


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
      this.html(this.template());
    }



  }
});