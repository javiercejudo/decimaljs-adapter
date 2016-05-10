/*jshint node:true */

'use strict';

var identity = require('lodash.identity');
var decimal = require('decimal.js');

module.exports = {
  getInstance: getInstance,
  getPrecision: getPrecision,
  setPrecision: setPrecision,
  plus: plus,
  minus: minus,
  times: times,
  div: div,
  mod: mod,
  pow: pow,
  sqrt: sqrt,
  gt: gt,
  gte: gte,
  lt: lt,
  lte: lte,
  cmp: cmp,
  abs: abs,
  equals: equals,
  toString: toString,
  valueOf: toString,
  parseInput: identity
};

function getPrecision(Decimal) {
  return Decimal.precision;
}

function setPrecision(Decimal, n) {
  Decimal.config({ precision: n });
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

function mod(x, y) {
  return x.mod(y);
}

function pow(x, y) {
  return x.pow(y);
}

function sqrt(x) {
  return x.sqrt();
}

function lt(x, y) {
  return x.lt(y);
}

function lte(x, y) {
  return x.lte(y);
}

function gt(x, y) {
  return x.gt(y);
}

function gte(x, y) {
  return x.gte(y);
}

function cmp(x, y) {
  return x.cmp(y);
}

function abs(x) {
  return x.abs();
}

function equals(x, y) {
  return x.eq(y);
}

function toString(x) {
  return x.toString();
}

function getInstance() {
  return decimal.clone();
}
