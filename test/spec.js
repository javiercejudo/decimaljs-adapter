/*jshint node:true, mocha:true */

'use strict';

require('should');
var decimalFactory = require('arbitrary-precision');
var adapter = require('../src/decimaljs-adapter');

var Decimal = decimalFactory(adapter);
var DecimalJs = adapter.getInstance();

describe('arbitrary precision with decimal.js', function() {
  describe('precision', function() {
    var initialPrecision = Decimal.getPrecision();

    it('should be able to get the current precision', function() {
      Decimal.getPrecision().should.have.type('number');

      new Decimal('1').div(new Decimal('3')).toString().should.be.exactly('0.33333333333333333333');
    });

    it('should be able to set the current precision', function() {
      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
      new Decimal('1').div(new Decimal('3')).toString().should.be.exactly('0.333333333333333333333333333333333333333333');

      Decimal.setPrecision(initialPrecision);
    });
  });

  describe('operations', function() {
    it('should have a plus method', function() {
      new Decimal('0.1').plus(new Decimal('0.2')).toString().should.be.exactly('0.3');
    });

    it('should have a minus method', function() {
      new Decimal('0.3').minus(new Decimal('0.1')).toString().should.be.exactly('0.2');
    });

    it('should have a times method', function() {
      new Decimal('0.6').times(new Decimal('3')).toString().should.be.exactly('1.8');
    });

    it('should have a div method', function() {
      new Decimal('0.3').div(new Decimal('0.2')).toString().should.be.exactly('1.5');
    });

    it('should have a mod method', function() {
      adapter.mod(new Decimal('12'), new Decimal('5')).toString().should.be.exactly('2');
    });

    it('should have a pow method', function() {
      new Decimal('2').pow(new Decimal('3')).valueOf().should.be.exactly('8');
      new Decimal('81').pow(new Decimal('0.5')).valueOf().should.be.exactly('9');
    });

    it('should have an sqrt method', function() {
      new Decimal('9').sqrt().valueOf().should.be.exactly('3');
    });

    it('should have an equals method', function() {
      new Decimal('2').equals(new Decimal('2')).should.be.exactly(true);
      new Decimal('2').equals(new Decimal('3')).should.be.exactly(false);
    });

    it('should have a gt method', function() {
      adapter.gt(new Decimal('2'), new Decimal('2')).should.be.exactly(false);
      adapter.gt(new Decimal('2'), new Decimal('3')).should.be.exactly(false);
      adapter.gt(new Decimal('2'), new Decimal('1')).should.be.exactly(true);
    });

    it('should have a gte method', function() {
      adapter.gte(new Decimal('2'), new Decimal('2')).should.be.exactly(true);
      adapter.gte(new Decimal('2'), new Decimal('3')).should.be.exactly(false);
      adapter.gte(new Decimal('2'), new Decimal('1')).should.be.exactly(true);
    });

    it('should have a lt method', function() {
      adapter.lt(new Decimal('2'), new Decimal('2')).should.be.exactly(false);
      adapter.lt(new Decimal('2'), new Decimal('3')).should.be.exactly(true);
      adapter.lt(new Decimal('2'), new Decimal('1')).should.be.exactly(false);
    });

    it('should have a lte method', function() {
      adapter.lte(new Decimal('2'), new Decimal('2')).should.be.exactly(true);
      adapter.lte(new Decimal('2'), new Decimal('3')).should.be.exactly(true);
      adapter.lte(new Decimal('2'), new Decimal('1')).should.be.exactly(false);
    });

    it('should have a cmp method', function() {
      adapter.cmp(new Decimal('2'), new Decimal('2')).valueOf().should.be.exactly(0);
      adapter.cmp(new Decimal('2'), new Decimal('3')).valueOf().should.be.exactly(-1);
      adapter.cmp(new Decimal('2'), new Decimal('1')).valueOf().should.be.exactly(1);
    });

    it('should have a abs method', function() {
      adapter.abs(new DecimalJs('16')).toNumber().should.be.exactly(16);
      adapter.abs(new DecimalJs('-5')).toNumber().should.be.exactly(5);
    });
  });

  describe('toString, valueOf and JSON', function() {
    it('should be able to return a string representation', function() {
      var decimalThird = new Decimal('1').div(new Decimal('3'));

      decimalThird.toString().should.be.exactly('0.33333333333333333333')
        .and.exactly(decimalThird.valueOf())
        .and.exactly(decimalThird.toJSON());
    });

    it('should play nicely with Number()', function() {
      var decimalThird = new Decimal('1').div(new Decimal('3'));

      Number(decimalThird).should.be.exactly(1/3);
    });

    it('should play nicely with JSON.stringify()', function() {
      var Decimal40 = decimalFactory(adapter);

      Decimal40.setPrecision(40);

      var decimalThird = new Decimal40('1').div(new Decimal('3'));
      var stringified = JSON.stringify(decimalThird);

      stringified.should.be.exactly('"0.3333333333333333333333333333333333333333"');

      JSON.parse(stringified, Decimal40.reviver).should.eql(decimalThird);
    });
  });
});
