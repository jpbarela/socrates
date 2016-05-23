const app = require('./app');

const config = { port: process.env.PORT || 3000 };

app.start(config);