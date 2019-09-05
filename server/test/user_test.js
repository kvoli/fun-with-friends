const User = require('../models/user');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should;

describe('Testing to see if required user properties are mandatory', function() {
  var user = new User({
    firstname: 'John',
    lastname: 'Smith',
    email: 'johnsmith@gmail.com',
    username: 'johnsmith',
    password: 'password'
  })
  it('User requires an firstname', function(){
    expect(user).to.have.property('firstname');
  })
  it('User requires a lastname', function(){
    expect(user).to.have.property('lastname');
  })
  it('User requires an email', function(){
    expect(user).to.have.property('email');
  })
  it('User requires a username', function(){
    expect(user).to.have.property('username');
  })
  it('User requires a password', function(){
    expect(user).to.have.property('password');
  })
  it('User password should be 6 or more characters', function(){
    expect(user).to.have.property('password').with.length.greaterThan(6);
  })
})