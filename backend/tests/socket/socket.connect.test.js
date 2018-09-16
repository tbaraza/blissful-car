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

    describe('connection', () => {
      it('should connect socket', (done) => {
        client.on('connect', () => {
          expect(client.connected).to.be.true;
          client.disconnect();
          done();
        });
      });
    });
  });
});
