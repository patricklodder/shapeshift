var _ = require('lodash');
var requestp = require('request-promise');

var ShapeShift = module.exports = {};

ShapeShift.URL = 'http://shapeshift.io';
ShapeShift.DEFAULT_OPTIONS = {
  json: true,
  resolveWithFullResponse: true
};

//todo add support for callbacks instead of promises with options arg

ShapeShift._get =  function (url, opts) {
  opts = opts || {};

  return requestp(_.extend(ShapeShift.DEFAULT_OPTIONS, opts, {
    url: url
  }));
};

ShapeShift.getRate = function (pair) {
  return this._get(ShapeShift.URL + '/rate/' + pair);
};

ShapeShift.getLimit = function (pair) {
  return this._get(ShapeShift.URL + '/limit/' + pair);
};
