/*jshint node:true */

'use strict';

var identity = require('lodash.identity');
var decimal = require('decimal.js');

module.exports = {
  getInstance: decimal.constructor,
  getPrecision: getPrecision,
  setPrecision: setPrecision,
  plus: plus,
  minus: minus,
  times: times,
  div: div,
  pow: pow,
  toString: toString,
  valueOf: toString,
  parseInput: identity
};

function getPrecision(Decimal) {
  return Decimal.precision;
}

function setPrecision(Decimal, n) {
  Decimal.precision = n;
}

function plus(x, y) {
  return x.plus(y);
}

function minus(x, y) {
  return x.minus(y);
}

function times(x, y) {
  return x.times(y);
}

function div(x, y) {
  return x.div(y);
}

function pow(x, y) {
  return x.pow(y);
}

function toString(x) {
  return x.toString();
}
