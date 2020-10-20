const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/dist/frontend');
app.set('view engine', 'html');

// Run the app by serving the static files
// in the dist directory
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
// Instruct the app
// to use the forceSSL
// middleware
//app.use(forceSSL());
app.use(compression());
app.use(express.static(__dirname + '/dist/frontend'));
// Start the app by listening on the default
// Heroku port

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
    res.render('index');
});
app.listen(process.env.PORT || 8080);
