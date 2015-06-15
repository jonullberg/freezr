'use strict';

var server = require('../server');
process.env.MONGOLAB_URI = 'mongodb://localhost/players_development';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var User = require('../models/User'); //double-check naming
var bodyparser = require('body-parser');
var eat = require('eat');
var app = 'localhost:3000';

describe('api users routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  var newToken;

  it('should be able to create a test user', function(done) {
    chai.request(app)
      .post('/api/create_user')
      .send({username: 'testuser',
             email: 'testuser@test.com',
             password: 'test'})
      .end(function(err, res) {
        newToken = res.body.token;
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should be able to sign in the test user', function(done) {
    chai.request(app)
      .get('/api/sign_in')
      .set('email', 'testuser@test.com')
      .set('password', 'test')
      .set('token', newToken)
      .end(function(err, res) {
        expect(err).to.eql(null);
        //possibly add more expects here
      done();
      });
  });



});
