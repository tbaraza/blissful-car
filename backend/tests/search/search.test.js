const chai = require('chai');
const http = require('chai-http');
const app = require('../../app');

const { expect } = chai;
chai.use(http);

describe('Search endpoints', () => {
  context('When I visit search route passing the correct data', () => {
    // it('It should return an array of cars when no query string is passed', (done) => {
    //   chai
    //     .request(app)
    //     .get('/api/v1/search')
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(200);
    //       expect(res.body.success).to.be.true;
    //       expect(res.body.data).to.be.an('array');
    //       done();
    //     });
    // });

    it('It should return an array of cars when a query string is passed with required fields', (done) => {
      chai
        .request(app)
        .get('/api/v1/search?passengers=1&insurance=good&bestFuel=yes')
        .end((err, res) => {
          console.log('response2--->', res.body);
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
        .get('/api/v1/search?passengers=1&insurance=good&bestFuel=yes&model=any&color=any')
        .end((err, res) => {
          console.log('response', res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
});
