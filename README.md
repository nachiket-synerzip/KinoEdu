KinoEdu
=======

Education Platform for Individuals. This Platform allows Users to both
create and enroll to courses offered by people on this platform.
The platform is a Social Platform, showcasing a Leadership board which
tells which user is topping the list of successfully taking courses
or creating courses.

The platform would support following in Phase 1
* Create Public and Free Courses and List them
* Allow Users to take Public and Free Courses and gain certification once they complete the courses
* Allow Users to show the Certificates on Social networking sites
* List Top Certification Holders and Course Creators in a Leadership Board

Setup
======
Following Steps needs to be taken before you can run this platform locally

Step 1.
------
$>git clone https://github.com/rohitghatol/KinoEdu.git

Step 2.
------
(Required for Only Local Development Mode)
Install Mongo DB and run it on default port
$>mongod

Step 3.
------
(Required for Both Production and Development Mode)
Create a Heroku Account and Sign in Using that in the Source Code Directory
$>heroku login

Step 4.
------
Push Environment Variables to Local and Heroku Environment

Settings for Development Mode Deployment on Local Machine
$> heroku config:set AppMode = development
$> export MONGOLAB_URI= <<production heroku MongoDB>>
$> export facebook_clientID= <<Facebook App Client ID>>
$> export facebook_clientSecret= <<Facebook App Client Secret>>
$> export twitter_clientID= <<Twitter App Client ID>>
$> export twitter_clientSecret= <<Twitter App Client Secret>>
$> export linkedin_clientID = <<LinkedIn App Client ID>>
$> export linkedin_clientSecret = <<LinkedIn App Client Secret>>
$> export google_clientID = <<Google App Client ID>>
$> export google_clientSecret = <<Google App Client Secret>>

Settings for Production Mode Deployment on Heroku
$> heroku config:set AppMode = production
$> heroku config:set MONGOLAB_URI= <<production heroku MongoDB>>
$> heroku config:set facebook_clientID= <<Facebook App Client ID>>
$> heroku config:set facebook_clientSecret= <<Facebook App Client Secret>>
$> heroku config:set twitter_clientID= <<Twitter App Client ID>>
$> heroku config:set twitter_clientSecret= <<Twitter App Client Secret>>
$> heroku config:set linkedin_clientID = <<LinkedIn App Client ID>>
$> heroku config:set linkedin_clientSecret = <<LinkedIn App Client Secret>>
$> heroku config:set google_clientID = <<Google App Client ID>>
$> heroku config:set google_clientSecret = <<Google App Client Secret>>

Step 5.
------
To Run the Application Locally
$>npm install
$>npm start

To Run the Application on Heroku
//Add all local files, commit and push to heroku

$>git add .
$>git commit -a -m "comments..."
$>git push heroku master