
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.about = function(req, res){
    res.render('about', { title: 'Express' });
};

exports.contact = function(req, res){
    res.render('contact', { title: 'Express' });
};

exports.signup = function(req, res){
    res.render('signup', { title: 'Express' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Express' });
};

exports.courses = function(req, res){
    res.render('courses', { title: 'Express' });
};
