define(['underscore', 'hbs!./signup'], function(_, signupTemplate) {

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
      this.html(signupTemplate());
    }



  }
});