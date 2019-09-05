const User = require('../models/user');
const expect = require('chai').expect;

describe('Testing to see if required user properties are mandatory', function() {
  var user = new User({
    firstname: '',
    lastname: 'Smith',
    email: 'johnsmith@gmail.com',
    username: 'johnsmith',
    password: 'password'
  })
  it('User requires an firstname', function(){
    expect(user).property('firstname');
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
