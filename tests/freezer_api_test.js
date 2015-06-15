'use strict';

require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var User = require('../models/User'); //double-check naming

describe('api users routes', function() {
  after(function(done) {
    User.destroy({
      where: {
        username: testuser
      }
    }).then(function() {
      done();
    });
  });

  var newEat;

  it('should be able to create a test user', function(done) {
    chai.request('localhost:3000')
      .post('/api/create_user')
      .send({username: 'testuser',
             email: 'testuser@test.com',
             password: 'test'})
      .end(function(err, res) {
        newEat = res.body.token;
        expect(err).to.eql(null);
        expect(res.body.username).to.eql('testuser');
        expect(res.body.email).to.eql('testuser@test.com');
        expect(res.body).to.have.property('token');
        expect(res.body.msg).to.eql(/*something*/);
        //possibly add property test of sql db
        done();
      });
  });

  it('should be able to sign in the test user', function(done) {
    chai.request('localhost:3000')
      .get('/api/sign_in')
      .set('email', 'testuser@test.com')
      .set('password', 'test')
      .set('eat', newEat)
      .end(function(err, res) {
        expect(err).to.eql(null);
        //possibly add more expects here
      done();
      });
  });



});