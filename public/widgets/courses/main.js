define(['underscore', 'text!./templates/courses.html'],
    function (_, CoursesTemplate) {

    return {

        type:'Backbone',
        template:_.template(CoursesTemplate),

        initialize:function () {
            var self = this;
            this.sandbox.on('router', function (path) {

                if (path.indexOf('courses')!=-1) {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });

            this.sandbox.on('refresh',function(){
                self.fetchCourseData();
            });
            this.fetchCourseData();
        },

        render:function (coursesData) {
            this.html(this.template(coursesData));
        },
        fetchCourseData:function(){
            var self = this;
            var coursesData = null;
            this.sandbox.security.isLoggedIn(function(err,isLoggedIn){
                if(isLoggedIn){
                    coursesData = [
                        {
                            tabName:"Dashboard",
                            widget:"dashboard"
                        },
                        {
                            tabName:"All Courses",
                            widget:"all-courses"
                        },
                        {
                            tabName:"On Going",
                            widget:"on-going-courses"
                        },
                        {
                            tabName:"Completed",
                            widget:"completed-courses"
                        },
                        {
                            tabName:"Created",
                            widget:"created-courses"
                        },
                        {
                            tabName:"Favorite",
                            widget:"favorite-courses"
                        }
                    ];
                }
                else{
                    coursesData = [
                        {
                            tabName:"Dashboard",
                            widget:"dashboard"
                        },
                        {
                            tabName:"All Courses",
                            widget:"all-courses"
                        }
                    ];
                }
                self.render({'coursesData':coursesData});

            });

        }




    }
});