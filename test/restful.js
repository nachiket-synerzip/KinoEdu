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

describe('Create Course', function(){
    it('Should Actually Create a Course', function(done){

        request(app)
            .post('/api/courses')
            .send({ title: 'title',description:'description'})
            .expect(200, done);

    })
})

describe('Find Course', function(){
    it('Should Retrieve Existing Courses', function(done){

        request(app)
            .get('/api/courses')
            .expect(200, done);

    })
})
