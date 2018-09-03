/* eslint-disable no-undef */

const chai = require('chai');
const http = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(http);

describe('When I visit the index route', () => {
  it('should return a JSON object with message string', () => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.a('null');
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.a('string');
      });
  });
});
