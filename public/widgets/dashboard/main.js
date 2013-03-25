define(['underscore', 'text!./templates/dashboard.html'],
    function (_, DashboardTemplate) {

    return {

        type:'Backbone',
        template:_.template(DashboardTemplate),

        initialize:function () {
            var self = this;
            this.sandbox.on('router', function (path) {
                if (path.indexOf('dashboard')!=-1) {
                    self.$el.show();
                }
                else {
                    self.$el.hide();
                }

            });

            this.sandbox.on('refresh',function(){
                self.fetchDashboardData();
            });
            this.fetchDashboardData();
        },

        render:function (dashboardData) {
            this.html(this.template(dashboardData));
        },
        fetchDashboardData:function(){
            var self = this;
            var dashboardData = null;
            this.sandbox.security.isLoggedIn(function(err,isLoggedIn){
                if(isLoggedIn){
                    dashboardData = [
                        {
                            panelName:"New Courses",
                            widget:"dashboard-new-courses"
                        },
                        {
                            panelName:"Top Courses",
                            widget:"dashboard-top-courses"
                        },
                        {
                            panelName:"Leadership Board",
                            widget:"dashboard-leadership-board"
                        },
                        {
                            panelName:"Friend's Activities",
                            widget:"dashboard-friend-activities"
                        },
                        {
                            panelName:"Progress",
                            widget:"dashboard-progress"
                        },
                        {
                            panelName:"Your Creations",
                            widget:"dashboard-created"
                        }
                    ];
                }
                else{
                    dashboardData = [
                        {
                            panelName:"New Courses",
                            widget:"dashboard-new-courses"
                        },
                        {
                            panelName:"Top Courses",
                            widget:"dashboard-top-courses"
                        },
                        {
                            panelName:"Leadership Board",
                            widget:"dashboard-leadership-board"
                        }
                    ];
                }
                self.render({'dashboardData':dashboardData});

            });

        }




    }
});