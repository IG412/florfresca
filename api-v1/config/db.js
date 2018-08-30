var mongoose = require('mongoose'),
    // mongodbUri = 'mongodb://movelife:#m0v3@ds111549.mlab.com:11549/heroku_1z5nwt40',
    mongodbUri = "mongodb://camera:silens@ds161018.mlab.com:61018/heroku_0sd7f0px",
    gracefulShutdownm;
if (process.env.NODE_ENV === 'production') {dbURI = process.env.MONGOLAB_URI;}
mongoose.connect(mongodbUri);
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