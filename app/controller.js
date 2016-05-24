'use strict';

exports.get = function(url) {
  // Return new Promise
  return new Promise((resolve, reject) => {

    // Select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const gFeed = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=';

    // Fire the get request
    const request = lib.get(gFeed + url, (response) => {

      // Handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }

      // Temporary data holder
      const body = [];

      // On every content chunk, push it to the data array
      response.on('data', (chunk) => {
        body.push(chunk);
      });

      // We are done, resolve promise with those joined chunks
      response.on('end', () => {
        let json = JSON.parse(body.join(''));
        resolve(json.responseData.feed);
      });
    });

    // Handle connection errors of the request
    request.on('error', (err) => {
      reject(err);
    });
  });
};