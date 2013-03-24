define(['underscore', 'text!./templates/courses.html'],
    function (_, CoursesTemplate) {

    return {

        type:'Backbone',
        template:_.template(CoursesTemplate),

        initialize:function () {
            var self = this;
            this.sandbox.on('router', function (path) {
                if (path == 'courses') {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });
            this.fetchCourseData();
        },

        render:function (coursesData) {
            this.html(this.template(coursesData));
        },
        fetchCourseData:function(){
            var coursesData = null;
            var self = this;
            this.sandbox.security.isLoggedIn(function(err,isLoggedIn){
                if(isLoggedIn){
                    coursesData = [
                        {
                            title:"Dashboard"
                        },
                        {
                            title:"All Courses"
                        },
                        {
                            title:"On Going"
                        },
                        {
                            title:"Completed"
                        },
                        {
                            title:"Created"
                        },
                        {
                            title:"Favorite"
                        }
                    ];
                }
                else{
                    coursesData = [
                        {
                            title:"Dashboard"
                        },
                        {
                            title:"All Courses"
                        }
                    ];
                }
                self.render({'coursesData':coursesData});

            });

        }




    }
});