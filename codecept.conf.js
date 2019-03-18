exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000',
      show: true
    }
  },
  include: {},
  mocha: {},
  bootstrap: './server.js',
  teardown: './server.js',
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: './frontend/tests/*_test.js',
  name: 'blissful-car',
}
