<<<<<<< HEAD
const User = require('../models/user');
const {
  expect
} = require('chai');

describe('Testing to see if required user properties are mandatory', function () {
  var user = new User({
=======
/* eslint-disable func-names */
/* eslint-disable jest/valid-expect */
const { expect } = require('chai');
const User = require('../models/user');

describe('Testing to see if required user properties are mandatory', function() {
  const user = new User({
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
    firstname: '',
    lastname: 'Smith',
    email: 'johnsmith@gmail.com',
    username: 'johnsmith',
    password: 'password',
  });
  it('User requires an firstname', () => {
    expect(user).property('firstname');
  });
  it('User requires a lastname', () => {
    expect(user).to.have.property('lastname');
  });
  it('User requires an email', () => {
    expect(user).to.have.property('email');
  });
  it('User requires a username', () => {
    expect(user).to.have.property('username');
  });
  it('User requires a password', () => {
    expect(user).to.have.property('password');
  });
  it('User password should be 6 or more characters', () => {
    expect(user)
      .to.have.property('password')
      .with.length.greaterThan(6);
  });
<<<<<<< HEAD
})
=======
});
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
