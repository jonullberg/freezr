'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/freezer_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var eat = require('eat');

var Item = require('../models/Items.js');
var User = require('../models/User.js');
var saveUserToken = '';

describe('Item REST API', function() {
  before(function(done) {
    var itemTest = new Item({authorID: 'test', itemName: 'broccoli', itemType: 'vegetable', qty: 1, storageType: 'pantry'});
    itemTest.save(function(err, data) {
      if (err) {
        return console.log(err);
      }
      this.itemTest = data;
      //console.log(data);
      done();
    }.bind(this));

    var testUser = new User({'username': 'test', 'basic.email': 'test@example.com', 'basic.password': 'foobar123'});

    testUser['basic.password'] = testUser.generateHash(testUser['basic.password'], function(err, hash) {
      if (err) {
        console.log('in generate hash ' + err);
        res.status(500).json({msg: 'could not save password'}); //jshint ignore:line
      }

      testUser['basic.password'] = hash;

      testUser.save(function(err, user) {
        if (err) {
          return console.log(err);
        }

        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            return console.log(err);
          }

          saveUserToken = token;
        });
      });
    });
  });//end before

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });//end after

  it('should get an item from the collection', function(done) {
    chai.request('localhost:3000')
      .get('/api/food_items')
      .send({token: saveUserToken})
      .end(function(err, res) {
        console.log(err);
        console.log(res.body);
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal('object');
        expect(res.body[0].itemName).to.equal('broccoli');
        done();
      });
  });

  it('should post a new item', function(done) {
    chai.request('localhost:3000')
      .post('/api/food_items')
      .send({authorID: 'test2', itemName: 'celery', itemType: 'vegetable', qty: 1, storageType: 'refrigerator', token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('itemName');
        expect(res.body.authorID).to.equal('test');
        done();
      });
  });

  it('should replace or update an existing item', function(done) {
    var id = this.itemTest._id;

    chai.request('localhost:3000')
      .put('/api/food_items/' + this.itemTest._id)
      .send({authorID: 'test2', itemName: 'zucchini', itemType: 'vegetable', qty: 1, storageType: 'refrigerator', token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('success');
        done();
      });
  });

  it('should be able to sign in the test user', function(done) {
    chai.request('localhost:3000')
      .get('/api/sign_in')
      .set('email', 'testuser@test.com')
      .set('password', 'test')
      .set('token', saveUserToken)
      .end(function(err, res) {
        expect(err).to.eql(null);
        //possibly add more expects here
      done();
      });
  });
});
