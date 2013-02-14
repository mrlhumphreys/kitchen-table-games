
/**
 * Module dependencies.
 */

require.paths.unshift(__dirname + '/lib');

var express = require('express'), faye = require('faye');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "game over man" }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// PubSub

bayeux = new faye.NodeAdapter({
  mount: '/events',
  timeout: 45
});

var user = require('user');
var game = require('game');


bayeux.getClient().subscribe('/games', function(event) {
  if (event.type == 'game_end') {
    game.destroy(event.id);
  }
});

function checkLogin(req, res, next) {
  if (req.session.user == null) {
    req.flash('error', 'You must be logged in first.');
    res.redirect('/');
  } else {
    next();
  }
};

// Routes

// Sessions#show
app.get('/sessions/current', function(req,res) {
  res.send(req.session.user);
});

// Sessions#new
app.get('/', function(req, res) {
  res.render('login', {error: req.flash('error'), route: '/'});
});

// Sessions#create
app.post('/sessions', function(req, res) {
  var u = user.create({name: req.body.name});
  if (u.valid()) {
    req.session.user = u;
    res.redirect('/games');
  } else {
    req.flash('error', u.errors[0]);
    res.redirect('/');
  }
});

// Games#index
app.get('/games', checkLogin, function(req, res) {
  res.render('games', { javascripts: ['jquery-1.5.1.min','faye-browser-min','games'], user: req.session.user, games: game.all, error: req.flash('error'), route: '/games' });
});

// Games#show
app.get('/games/:id', checkLogin, function(req, res) {
  var g = game.find(req.params.id);
  if (g == null) {
    req.flash('error', 'Game ' + req.params.id + ' is not available. Try a different one.');
    res.redirect('/games');
  } else {
    res.render('games/' + g.gameType, { javascripts: ['jquery-1.5.1.min','faye-browser-min','game', g.gameType + '_view'], user: req.session.user, game: g, route: ('/games/' + req.params.id) });
  }
});

// Games#create
app.post('/games', checkLogin, function(req, res) {
  var g = game.create(req.body.game);
  res.redirect('/games/' + g.id);
});

// Only listen on $ node app.js

bayeux.attach(app);

if (!module.parent) {
  app.listen(4567);
  console.log("Express server listening on port %d", app.address().port);
}
