define(['underscore', 'hbs!./login'], function(_, loginTemplate) {

  return {
    
    type: 'Backbone',

    events: {
      'click .signup':  function(e) {
        alert('submit');
      }
    },


    initialize: function() {
      this.render();
    },

    render: function() {
      this.html(loginTemplate());
    }



  }
});