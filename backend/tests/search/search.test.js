/* eslint-disable no-undef */
const chai = require('chai');
const http = require('chai-http');
const app = require('../../app');

const { expect } = chai;
chai.use(http);

describe('Search endpoints', () => {
  context('When I visit search route passing the correct data', () => {
    it('It should return an array of cars when a query string is passed with required fields', (done) => {
      chai
        .request(app)
        .get('/api/v1/car-search?passengers=1&insurance=good&bestFuel=yes')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('It should return an array of cars when a query string is passed with all fields', (done) => {
      chai
        .request(app)
        .get('/api/v1/car-search?passengers=1&insurance=good&bestFuel=yes&model=any&color=any')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  context('When I visit search route passing incorrect data', () => {
    it('It should return missing pproperties error when no query string is passed', (done) => {
      chai
        .request(app)
        .get('/api/v1/car-search')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.success).to.be.false;
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.deep.equal([
            'Missing required property passengers',
            'Missing required property insurance',
            'Missing required property bestFuel'
          ]);
          done();
        });
    });
  });
});
