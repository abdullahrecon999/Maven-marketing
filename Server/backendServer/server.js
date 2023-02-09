require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGOURI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    })
    .then(() => console.log('[+] DB Connected'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Shut down the server when the process is terminated
process.on('SIGTERM', () => {
  console.log('Server Shutting down gracefully');
  server.close(() => {
    console.log('[-] Server closed');
  });
});