/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */
//We need to make sure we are reading all values from environment variables
module.exports = {
    development: {
        app: {
            name: 'KinoEdu'
        },
        db: process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL,
        facebook: {
            clientID: process.env.facebook_clientID
            , clientSecret: process.env.facebook_clientSecret
            , callbackURL: 'http://localhost:5000/'
        },
        twitter: {
            clientID: process.env.twitter_clientID
            , clientSecret: process.env.twitter_clientSecret
            , callbackURL: 'http://localhost:5000/'
        },
        linkedin: {
            clientID: process.env.linkedin_clientID
            , clientSecret: process.env.linkedin_clientSecret
            , callbackURL: 'http://localhost:5000/'
        },
        google: {
            clientID: process.env.google_clientID
            , clientSecret: process.env.google_clientSecret
            , callbackURL: 'http://localhost:5000/'
        }
    }
    , test: {

    }
    , production: {
        app: {
            name: 'KinoEdu'
        },
        db: process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL,
        facebook: {
            clientID: process.env.facebook_clientID
            , clientSecret: process.env.facebook_clientSecret
            , callbackURL: 'http://www.kinoedu.com'
        },
        twitter: {
            clientID: process.env.twitter_clientID
            , clientSecret: process.env.twitter_clientSecret
            , callbackURL: 'http://www.kinoedu.com'
        },
        linkedin: {
            clientID: process.env.linkedin_clientID
            , clientSecret: process.env.linked_clientSecret
            , callbackURL: 'http://www.kinoedu.com'
        },
        google: {
            clientID: process.env.google_clientID
            , clientSecret: process.env.google_clientSecret
            , callbackURL: 'http://www.kinoedu.com'
        }
    }
}