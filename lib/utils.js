/*
 * grunt-connect-pushstate
 * https://github.com/brent/grunt-connect-pushstate
 *
 * Copyright (c) 2013 Brent Ertz
 * Licensed under the MIT license.
 */

'use strict';

var utils = module.exports;
var path = require('path');
var url = require('url');

// Returns a connect middleware that rewrites the url on http requests without 
// a file extension to the site root, allowing them to be handled by a 
// pushState router
utils.pushState = function pushState(req, res, next) {
  var pathname = url.parse(req.url).pathname;
  if (!path.extname(pathname)) {
    req.url = '/';
  }
  next();
};
