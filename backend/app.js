const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const expressSanitized = require('express-sanitize-escape');
const http = require('http');
const socketIo = require('socket.io');
const analytics = require('./src/services/analytics/socket');
const config = require('./src/config');

const app = express();

const { port } = config;
const server = http.createServer(app);
const io = socketIo(server);

// Log requests to the console
if (config.env === 'development') {
  app.use(logger('dev'));
}

// Parse incoming requests data
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitized.middleware());

require(`./src/${config.apiVersion}/routes`)(app);

// Set up default catch-all route that sends back a welcome message
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to wonderful beginnings'
}));

analytics(io);

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`listening on port ${port}`);
  }
});

module.exports = app;
