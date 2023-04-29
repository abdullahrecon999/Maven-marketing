require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');
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

// https.createServer({
//   key: fs.readFileSync('./security/key.pem'),
//   cert: fs.readFileSync('./security/cert.pem'),
//   passphrase: 'root'
// }, app).listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// Shut down the server when the process is terminated
process.on('SIGTERM', () => {
  console.log('Server Shutting down gracefully');
  server.close(() => {
    console.log('[-] Server closed');
  });
});