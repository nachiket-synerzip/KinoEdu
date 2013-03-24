/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */
//We need to make sure we are reading all values from environment variables
module.exports = {
    development:{
        app:{
            name:'KinoEdu'
        },
        db:'mongodb://localhost/kinoedu',
        facebook:{
            clientID:process.env.facebook_clientID, clientSecret:process.env.facebook_clientSecret, callbackURL:'http://localhost:5000/auth/facebook/callback'
        },
        twitter:{
            clientID:process.env.twitter_clientID, clientSecret:process.env.twitter_clientSecret, callbackURL:'http://localhost:5000/auth/twitter/callback'
        },
        linkedin:{
            clientID:process.env.linkedin_clientID, clientSecret:process.env.linkedin_clientSecret, callbackURL:'http://localhost:5000/auth/linkedin/callback'
        },
        google:{
            clientID:process.env.google_clientID, clientSecret:process.env.google_clientSecret, callbackURL:'http://localhost:5000/auth/google/callback'
        },
        email:{
            user:process.env.email_send_user,
            password:process.env.email_send_password,
            host:process.env.email_host,
            ssl:process.env.email_ssl
        },
        adminUser:{
            name:process.env.admin_name,
            email:process.env.admin_email,
            password:process.env.admin_password
        },
        mainClient:{
            name:process.env.main_client_name,
            description:process.env.main_client_description,
            redirectURIs:process.env.main_client_redirect_uris
        }
    }, production:{
        app:{
            name:'KinoEdu'
        },
        db:process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        facebook:{
            clientID:process.env.facebook_clientID, clientSecret:process.env.facebook_clientSecret, callbackURL:'http://www.kinoedu.com/auth/facebook/callback'
        },
        twitter:{
            clientID:process.env.twitter_clientID, clientSecret:process.env.twitter_clientSecret, callbackURL:'http://www.kinoedu.com/auth/twitter/callback'
        },
        linkedin:{
            clientID:process.env.linkedin_clientID, clientSecret:process.env.linked_clientSecret, callbackURL:'http://www.kinoedu.com/auth/linkedin/callback'
        },
        google:{
            clientID:process.env.google_clientID, clientSecret:process.env.google_clientSecret, callbackURL:'http://www.kinoedu.com/auth/google/callback'
        },
        email:{
            user:process.env.email_send_user,
            password:process.env.email_send_password,
            host:process.env.email_host,
            ssl:process.env.email_ssl
        },

        adminUser:{
            name:process.env.admin_name,
            email:process.env.admin_email,
            password:process.env.admin_password
        },
        mainClient:{

            name:process.env.main_client_name,
            description:process.env.main_client_description,
            redirectURIs:process.env.main_client_redirect_uris
        }

    }
}