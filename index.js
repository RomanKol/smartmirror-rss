'use strict';

var express = require('express');
var app = express();
var fs = require('fs');

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {

  let pckg = fs.readFileSync('package.json');
  pckg = JSON.parse(pckg);

  let params = {};
  params.url = 'http://www.heise.de/newsticker/heise-atom.xml';
  let widget = {};
  widget._id = '1234567890';
  widget.size = pckg.smartmirror.size[0];

  controller.get(params)
  .then((data) => {
    res.render('./index.jade', {
      data: data,
      widget: widget,
    });
  })
  .catch((err) => {
    console.dir(err);
    res.status(500).send(err);
  });


});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});