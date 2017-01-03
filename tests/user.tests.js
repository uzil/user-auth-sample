'use strict';

// Setup Env for test
process.env.MONGO_URL = 'mongodb://localhost/sampletestdb';
process.env.LOG_LEVEL = 'error';

// Dependencies
const mongoose = require('mongoose');
const User = require('../api/models/user.model');
const app = require('../index');

const supertest = require('supertest');
const should = require('should');

let request = supertest.agent(app);

let sampleUserData = {
  username: 'testUser',
  password: 'testUserPassword',
  email: 'testUser@xyz.com'
};

let sampleLoginData = {
  username: 'testUser',
  password: 'testUserPassword',
};

describe('Users unit tests', () => {
  before((done) => {
    User.remove({}, error => done());
  });

  describe('Register User', () => {
    it('it should register the user', (done) => {
      request
        .post('/user/register')
        .send(sampleUserData)
        .expect(201)
        .end((error, res) => {
          res.status.should.equal(201);
          res.body.should.have.property('message', 'A verification mail has been sent to your registered mail.');
          done();
        });
    });

    it('it should throw duplicate email error', (done) => {
      request
        .post('/user/register')
        .send({
          username: 'testUser2',
          password: 'testUserPassword',
          email: 'testUser@xyz.com'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'testUser@xyz.com is already registered');
          done();
        });
    });

    it('it should throw duplicate username error', (done) => {
      request
        .post('/user/register')
        .send({
          username: 'testUser',
          password: 'testUserPassword',
          email: 'testUser2@xyz.com'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'testUser is already registered');
          done();
        });
    });

    it('it should throw username is required', (done) => {
      request
        .post('/user/register')
        .send({
          password: 'testUserPassword',
          email: 'testUser3@xyz.com'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', '\"username\" is required');
          done();
        });
    });

    it('it should throw password is required', (done) => {
      request
        .post('/user/register')
        .send({
          username: 'testUser3',
          email: 'testUser3@xyz.com'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', '\"password\" is required');
          done();
        });
    });
  });
  describe('Login User', () => {
    it('it should login user', (done) => {
      request
        .post('/user/login')
        .send(sampleLoginData)
        .expect(200)
        .end((error, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          res.body.user.should.have.property('id');
          res.body.user.username.should.equal('testUser');
          res.body.user.email.should.equal('testUser@xyz.com');
          done();
        });
    });

    it('incorrect username', (done) => {
      request
        .post('/user/login')
        .send({
          username: 'testUser3',
          password: 'testUser'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'Invalid username/password');
          done();
        });
    });

    it('incorrect password', (done) => {
      request
        .post('/user/login')
        .send({
          username: 'testUser',
          password: 'testUser3'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'Invalid username/password');
          done();
        });
    });

    it('missing password', (done) => {
      request
        .post('/user/login')
        .send({
          username: 'testUser',
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'Invalid username/password');
          done();
        });
    });

    it('missing username', (done) => {
      request
        .post('/user/login')
        .send({
          username: 'testUser',
          password: 'testUser3'
        })
        .expect(400)
        .end((error, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message', 'Invalid username/password');
          done();
        });
    });
  });
});