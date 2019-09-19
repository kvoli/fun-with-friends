/* eslint-disable func-names */
/* eslint-disable jest/valid-expect */
const { expect } = require('chai');
const Artifact = require('../models/artifact');

describe('Testing to see if required artifact properties are mandatory', function() {
  const artifact = new Artifact({
    _id: '1234',
    title: 'test',
    desc: 'testing testing testing',
    uploader: 'Alan Lewis',
  });
  it('Artifact requires an _id', function() {
    expect(artifact).to.have.property('_id');
  });

  it('Artifact requires a title', function() {
    expect(artifact).to.have.property('title');
  });

  it('Artifact requires a description', function() {
    expect(artifact).to.have.property('desc');
  });

  it('Object requires a uploaded date', function() {
    expect(artifact).to.have.property('uploaded');
  });
});
