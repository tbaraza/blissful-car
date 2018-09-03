const env = {
  name: process.env.NODE_ENV,
  apiVersion: process.env.API_VERSION || 'v1'
};

module.exports = { env };
