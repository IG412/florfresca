var express         = require('express'),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    db              = require('./api-v1/config/db'),
    api             = require('./api-v1/routes/index'),
    path            = require('path'),
    app             = express();

app.set('port', (process.env.PORT || 5000));
// app.set('views', __dirname + '/client/views');
// app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist/florfresca'));
app.use(express.static(__dirname + '/admin'));

app.all('/api/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


app.use('/api', api);
// app.use('/adminpro', function(req, res) {
//     res.sendFile(path.join(__dirname + '/views/adminpro/'));
// });
app.use('/*',express.static(__dirname + '/dist/florfresca'));


// app.set('/admin/*', function (request, response) {
//     response.set('Content-Type', 'text/html');
//     response.sendFile(path.join(__dirname + '/adminpro'));
// });
// app.use('/', function (request, response) {
//     response.set('Content-Type', 'text/html');
//     response.render('index');
// });
// app.use('/*', function (request, response) {
//     response.set('Content-Type', 'text/html');
//     response.sendFile(path.join(__dirname + '/dist/florfresca'));
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});