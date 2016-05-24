// Added this file to potential help testability
// We can add now start a server independent of loading the app in memory
const app = require('./app');

const config = { port: process.env.PORT || 3000 };

app.start(config);