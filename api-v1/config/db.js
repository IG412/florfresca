var mongoose = require('mongoose'),
    mongodbUri = 'mongodb://fresca:Flor12345*.@ds211724.mlab.com:11724/heroku_fbd3fmfr',
    gracefulShutdownm;
if (process.env.NODE_ENV === 'production') {dbURI = process.env.MONGOLAB_URI;}
mongoose.set('useCreateIndex', true)
mongoose.connect(mongodbUri,{ useNewUrlParser: true });
mongoose.connection.on('connected', function() {
  console.log('Connected to Database');
});
mongoose.connection.on('error', function(err) {
  console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Disconnected');
});
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});