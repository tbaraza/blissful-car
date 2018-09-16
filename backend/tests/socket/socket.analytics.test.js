const ioClient = require('socket.io-client');
const chai = require('chai');
const io = require('socket.io');
const socketServer = require('../../src/services/analytics/socket');

const { expect } = chai;
const socketUrl = 'http://localhost:4000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Server', () => {
  describe('Socket', () => {
    let server;
    let client;
    const visitorData = {
      referringSite: 'direct',
      page: '/',
      browser: 'Google Inc.',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'
    };

    beforeEach(() => {
      server = io().listen(4000);
      socketServer(server);
      client = ioClient.connect(
        socketUrl,
        options
      );
    });

    afterEach(() => {
      server.close();
      client.close();
    });

    describe('analytics', () => {
      it('should return visitor data', (done) => {
        client.on('connect', () => {
          client.on('visitor-data', (data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('referringSite', 'page', 'browser', 'userAgent');
            done();
          });
          client.emit('visitor-data', visitorData);
        });
      });

      it('should return computed analytics data on page visit', (done) => {
        client.on('connect', () => {
          client.on('updated-stats', (data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('pages', 'referrers', 'activeUsers');
            done();
          });
          client.emit('visitor-data', visitorData);
        });
      });

      it('should return computed analytics data on search event', (done) => {
        const searchData = {
          page: '/'
        };
        client.on('connect', () => {
          client.on('search-stats', (data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('searches');
            expect(data.searches).to.equal(1);
            done();
          });
          client.emit('search', searchData);
        });
      });
    });
  });
});
