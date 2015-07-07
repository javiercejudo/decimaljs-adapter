/*jshint node:true */

'use strict';

var decimal = require('decimal.js');

module.exports = {
  getInstance: decimal.constructor,
  getPrecision: getPrecision,
  setPrecision: setPrecision,
  plus: plus,
  minus: minus,
  times: times,
  div: div,
  toString: toString,
  valueOf: toString,
  toJSON: toString
};

function getPrecision(Decimal) {
  return Decimal.precision;
}

function setPrecision(Decimal, n) {
  Decimal.precision = n;
}

function plus(decimal, x) {
  return decimal.plus(x);
}

function minus(decimal, x) {
  return decimal.minus(x);
}

function times(decimal, x) {
  return decimal.times(x);
}

function div(decimal, x) {
  return decimal.div(x);
}

function toString(decimal) {
  return decimal.toString();
}
