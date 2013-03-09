define(['underscore', 'hbs!./profile'], function(_, profileTemplate) {

  return {
    
    type: 'Backbone',

    events: {
      'click .editorlink a':  function(e) {
        alert('edit');
      }
    },


    initialize: function() {
      this.render();
    },

    render: function() {
      var data = {
        name:'John Smith',
        username:'johnsmith',
        email:'johnsmith@gmail.com'
      };
      this.html(profileTemplate(data));
    }



  }
});