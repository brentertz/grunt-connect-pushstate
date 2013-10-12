'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var utils = require('../lib/utils.js');

exports.pushState = {
  "calls the next middleware": function(test) {
    var req = { url: '/' };
    var res = {};
    var next = function() {
      test.done();
    };

    utils.pushState(req, res, next);
  },

  "rewrites the request url to point at the site root when the request does not include a file extension": function(test) {
    var originalUrl = '/pathname';
    var req = { url: originalUrl };
    var res = {};
    var next = function() {
      test.done();
    };    

    utils.pushState(req, res, next);

    test.expect(2);
    test.notStrictEqual(req.url, originalUrl, 'requested url should be altered');
    test.strictEqual(req.url, '/', 'requested url should be site root');
  },

  "rewrites the request url to point at the site root regardless of whether the querystring contains a file extension": function(test) {
    var originalUrl = '/pathname?q=foo.bar';
    var req = { url: originalUrl };
    var res = {};
    var next = function() {
      test.done();
    };

    utils.pushState(req, res, next);

    test.expect(2);
    test.notStrictEqual(req.url, originalUrl, 'requested url should be altered');
    test.strictEqual(req.url, '/', 'requested url should be site root');
  },

  "does not rewrite the request url when the request includes a file extension": function(test) {
    var originalUrl = '/favicon.ico';
    var req = { url: originalUrl };
    var res = {};
    var next = function() {
      test.done();
    };

    utils.pushState(req, res, next);
    
    test.expect(1);
    test.strictEqual(req.url, originalUrl, 'request url should not be altered');
  }
};
