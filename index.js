var express         = require('express'),
    bodyParser      = require("body-parser"),
    /*methodOverride  = require("method-override"),
    db              = require('./server/config/db'),
    api             = require('./server/routes/index'),*/
    app             = express();

app.set('port', (process.env.PORT || 5000));/*
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');*/



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(methodOverride());

app.use(express.static(__dirname + '/dist'));
// app.use('/api', api);

app.use('/', function (request, response) {
    response.set('Content-Type', 'text/html');
    response.render('index');
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
// <color : #bd1550>


