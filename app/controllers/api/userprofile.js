/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/12/13
 * Time: 11:53 PM
 * To change this template use File | Settings | File Templates.
 */

exports.getUser = function(req, res){
    if(req.user!=null){
        return res.send(req.user);
    }
    else{
        return res.send("{error:'Internal Error'}");
    }

};
