'use strict';

exports.get = function(url) {
  // return new Promise
  return new Promise((resolve, reject) => {

    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const gFeed ='http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=';

    // fire the get request
    const request = lib.get(gFeed + url, (response) => {

      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }

      // temporary data holder
      const body = [];

      // on every content chunk, push it to the data array
      response.on('data', (chunk) => {
        body.push(chunk);
      });

      // we are done, resolve promise with those joined chunks
      response.on('end', () => {
        let json = JSON.parse(body.join(''));
        resolve(json.responseData.feed);
      });
    });

    // handle connection errors of the request
    request.on('error', (err) => {
      reject(err)
    });
  });
};