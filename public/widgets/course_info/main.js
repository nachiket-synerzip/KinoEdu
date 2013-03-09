define(['underscore', 'hbs!./courseInfo'], function(_, courseInfoTemplate) {

  return {
    
    type: 'Backbone',

    events: {

    },


    initialize: function() {
      this.render();
    },

    render: function() {
      var data = {
        url:'#',
        courseImageUrl:'https://education.10gen.com/static/m102-spring-2013/images/course_image.d134eb116f7d.jpg',
        courseStartDate:'27th March 2013'
      };
      this.html(courseInfoTemplate(data));
    }



  }
});