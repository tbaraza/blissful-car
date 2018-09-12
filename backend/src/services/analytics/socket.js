const computeStats = require('./analytics');

module.exports = (io) => {
  const visitorsData = {
    searches: 0
  };

  io.on('connection', (socket) => {
    // a user has visited our page - add them to the visitorsData object
    console.log('a user connected');

    if (
      socket.handshake.headers.host === 'http://127.0.0.1:9000'
      && socket.handshake.headers.referer.indexOf('http://127.0.0.1:3000/dashboard') > -1
    ) {
      // if someone visits '/dashboard' send them the computed visitor data
      io.emit('updated-stats', computeStats(visitorsData));
    }
    // a user has visited our page - add them to the visitorsData object
    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
      socket.emit('visitor-data', data);

      // compute and send visitor data to the dashboard when a new user visits our page
      io.emit('updated-stats', computeStats(visitorsData));
    });

    socket.on('search', () => {
      visitorsData.searches += 1;

      // compute and send visitor data to the dashboard when a user makes a search
      io.emit('updated-stats', computeStats(visitorsData));
    });

    socket.on('disconnect', () => {
      // a user has left our page - remove them from the visitorsData object
      delete visitorsData[socket.id];

      // compute and send visitor data to the dashboard when a user leaves our page
      io.emit('updated-stats', computeStats(visitorsData));
    });
  });

  return io;
};
