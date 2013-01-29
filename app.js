
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , cat= require('./routes/cat')
  , http = require('http')
  , path = require('path')
  , mongoose= require('mongoose');

var app = express();

//mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost");

//mongoose model
//var schema = mongoose.Schema({ name: 'string', age:'number',colors:'array' });
//var Cat = mongoose.model('Cat', schema);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/cats/new', cat.newCat);
app.get('/cats',cat.showCats);
app.get('/cats/delete/old',cat.removeCat);
app.get('/cats/color/:color',cat.filterColor);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
