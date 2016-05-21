'use strict';

var express = require('express');
var app = express();

var feed = require('./app/app');

app.set('views', __dirname + '/app');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let url = 'http://www.heise.de/newsticker/heise-atom.xml'
  feed.get(url)
  .then((feed) => {
    res.render('view.jade', {
      title: 'RSS feed Reader',
      feed: feed
    });
    console.dir(feed.entries[0]);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});