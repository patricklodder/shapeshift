var _ = require('lodash');
var requestp = require('request-promise');

var ShapeShift = module.exports = {};

ShapeShift.URL = 'https://shapeshift.io';
ShapeShift.DEFAULT_OPTIONS = {
  json: true,
  resolveWithFullResponse: true
};

//todo add support for callbacks instead of promises with options arg

ShapeShift._get = function (url, opts) {
  opts = opts || {};

  return requestp(_.extend(ShapeShift.DEFAULT_OPTIONS, opts, {
    url: url
  }));
};

ShapeShift._post = function (url, opts, data) {

  var params = _.extend(ShapeShift.DEFAULT_OPTIONS, opts || {}, {
    url: url,
    method: 'POST',
    body: data
  });


  return requestp(params);
};

ShapeShift.getRate = function (pair) {
  return this._get(ShapeShift.URL + '/rate/' + pair);
};

ShapeShift.getLimit = function (pair) {
  return this._get(ShapeShift.URL + '/limit/' + pair);
};

ShapeShift.shift = function (pair, withdrawal, returnAddress) {
  var data = {withdrawal: withdrawal, pair: pair, returnAddress: returnAddress};
  return this._post(ShapeShift.URL + '/shift', {}, data);
};
