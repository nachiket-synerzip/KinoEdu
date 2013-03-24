define({
  
  name: "Backbone Storage",

  require: {
    paths: {

    }
  },

  initialize: function(app) {
    app.sandbox.remove=function(key){
      localStorage.removeItem(key)
    }
    app.sandbox.set=function(key,value){
        localStorage[key] = value;
    }
    app.sandbox.get=function(key){
        return localStorage[key];
    }
  }

});