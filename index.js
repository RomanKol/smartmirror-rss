'use strict';

var express = require('express');
var app = express();

var controller = require('./controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let url = 'http://www.heise.de/newsticker/heise-atom.xml'
  controller.get(url)
  .then((feed) => {
    res.render('view.jade', {
      title: 'RSS feed Reader',
      feed: feed
    });
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});