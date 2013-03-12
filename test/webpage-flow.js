/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 1:32 AM
 * To change this template use File | Settings | File Templates.
 */
var request = require('supertest')
    , express = require('express');

var app = require('../web')

describe('GET /', function(){
    it('Should Redirect to index.html', function(done){
        request(app)
            .get('/')
            .expect(302, done)
            .expect('Location','/index.html');
    })
})
