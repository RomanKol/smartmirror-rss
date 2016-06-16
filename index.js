'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let url = 'http://www.heise.de/newsticker/heise-atom.xml'
  controller.get({url: url})
  .then((feed) => {
    res.render('app/view.jade', {
      data: feed,
    });
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});