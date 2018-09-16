const analytics = require('./analytics');
const config = require('../../config');

module.exports = (io) => {
  const visitorsData = {};
  const searchData = {};

  io.on('connection', (socket) => {
    // a user has visited our page - add them to the visitorsData object
    socket.on('visitor-data', (data) => {
      visitorsData[socket.id] = data;
      socket.emit('visitor-data', data);

      // compute and send visitor data to the dashboard when a new user visits our page
      io.emit('updated-stats', analytics.computePageStats(visitorsData));
    });

    socket.on('search', (data) => {
      searchData[socket.id] = data;

      // compute and send visitor data to the dashboard when a user makes a search
      io.emit('search-stats', analytics.computeSearchStats(searchData));
    });

    socket.on('disconnect', () => {
      // a user has left our page - remove them from the visitorsData object
      delete visitorsData[socket.id];

      // compute and send visitor data to the dashboard when a user leaves our page
      io.emit('updated-stats', analytics.computePageStats(visitorsData));
    });
  });

  return io;
};
