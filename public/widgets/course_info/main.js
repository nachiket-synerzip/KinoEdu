define(['underscore', 'text!./templates/courseInfo.html'],
    function(_, CourseInfoTemplate) {

  return {
    
    type: 'Backbone',
    template:_.template(CourseInfoTemplate),

    events: {

    },


    initialize: function() {
      this.render();
    },

    render: function() {
      var data = {
        url:'#',
        courseTitle:'Title',
        courseImageUrl:'https://education.10gen.com/static/m102-spring-2013/images/course_image.d134eb116f7d.jpg',
        courseStartDate:'27th March 2013'
      };
      this.html(this.template(data));
    }



  }
});