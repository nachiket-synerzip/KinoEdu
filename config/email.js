/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/23/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */
var email = require("../node_modules/emailjs/email");

module.exports=function(config)
{
    var emailServer = email.server.connect({
        user:config.email.user,
        password:config.email.password,
        host:config.email.host,
        ssl:config.email.ssl
    });

    return emailServer
}