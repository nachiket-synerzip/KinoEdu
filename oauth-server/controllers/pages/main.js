exports.signup = function(req, res){
    res.render('signup', { title: 'Express' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Express' });
};
