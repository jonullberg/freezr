'use strict';

var server = require('../server');
process.env.MONGOLAB_URI = 'mongodb://localhost/freezer_dev_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var User = require('../models/User');
var Items = require('../models/Items'); //double-check naming
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

  it('should store a new food item', function(done) {
    chai.request(app)
      .post('/api/food_items')
      .send({itemType: 'bananas', qty: 5})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.itemType).to.eql('bananas');
        expect(res.body.qty).to.eql(5);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get array of food items', function(done) {
    chai.request(app)
      .get('/api/food_items')
      .set('email', 'testuser@test.com')
      .set('password', 'test')
      .set('token', newToken)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
      done();
      });
  });

  describe('needs an existing item in the array', function() {
    beforeEach(function(done) {
      var testItem = new Items({itemType: 'apples', qty: 3});
      testItem.save(function(err, data) {
        if(err) throw err;
        this.testItem = data;
        done();
      }.bind(this));
    });

    it('should create test item in beforeEach block', function() {
      expect(this.testItem.itemType).to.eql('apples');
      expect(this.testItem.qty).to.eql(3);
      expect(this.testItem).to.have.property('_id');
  });


    it('should update a food item', function(done) {
      chai.request(app)
        .put('/api/food_items/' + this.testItem._id)
        .send({qty: 4})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
        done();
      });
  });
    it('should delete a food item', function(done) {
      chai.request(app)
        .del('/api/food_items/' + this.testItem._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
        done();
      });
    });
  });
});


