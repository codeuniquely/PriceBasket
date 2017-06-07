/* global describe, before, it */
import chai from 'chai';
import lib from 'src/utils';

// reference expect
const expect = chai.expect;

// Mock Object for JSON testing
const mockObj = { a:1, b:[ 'one', 'two' ], c: { greeting:'hello world' } };
const mockArray = [ 'one', 'two' ];

// will hold the instantiated library
let instance;

describe('utils', () => {

  describe('general', () => {
    before( () => {
      instance = lib();
    });

    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });

    it('roundDown should be a function', done => {
      expect(instance.roundDown).to.be.an('function');
      done();
    });

    it('formatPrice should be a function', done => {
      expect(instance.formatPrice).to.be.an('function');
      done();
    });

    it('standardizeName should be a function', done => {
      expect(instance.standardizeName).to.be.an('function');
      done();
    });

    it('capitalizeFirstLetter should be a function', done => {
      expect(instance.capitalizeFirstLetter).to.be.an('function');
      done();
    });

    it('getJsonObject should be a function', done => {
      expect(instance.getJsonObject).to.be.an('function');
      done();
    });
  });

  describe('roundDown', () => {
    before( () => {
      instance = lib();
    });

    it('should not throw when passed nothing', done => {
      expect(instance.roundDown()).to.be.NaN;
      done();
    });

    it('should not throw when passed a string', done => {
      expect(instance.roundDown('string')).to.be.NaN;
      done();
    });

    it('should round an integer value', done => {
      expect(instance.roundDown(1)).to.be.equal(1);
      done();
    });

    it('should round a passed a decimal value', done => {
      expect(instance.roundDown(1.23)).to.be.equal(1.23);
      done();
    });

    it('should handle a many dp', done => {
      expect(instance.roundDown(1.2399)).to.be.equal(1.23);
      done();
    });

    it('should handle a small decimal value', done => {
      expect(instance.roundDown(.00001)).to.be.equal(0);
      done();
    });
  });

  describe('formatPrice', () => {
    before( () => {
      instance = lib();
    });

    it('should not throw when passed nothing', done => {
      expect(instance.formatPrice()).to.be.NaN;
      done();
    });

    it('should not throw when passed a string', done => {
      expect(instance.formatPrice('string')).to.be.NaN;
      done();
    });

    it('should format a value below £1', done => {
      expect(instance.formatPrice(0.99)).to.be.equal('99p');
      done();
    });

    it('should format a value above 99p', done => {
      expect(instance.formatPrice(1.00)).to.be.equal('£1.00');
      done();
    });

    it('should handle a many dp input', done => {
      expect(instance.formatPrice(1.2399)).to.be.equal('£1.24');
      done();
    });

    it('should handle a small decimal value', done => {
      expect(instance.formatPrice(.00001)).to.be.equal('0p');
      done();
    });
  });

  describe('standardizeName', () => {
    before( () => {
      instance = lib();
    });

    it('should not throw when passed nothing', done => {
      expect(instance.standardizeName()).to.be.equal('');
      done();
    });

    it('should not throw when passed a number', done => {
      expect(instance.standardizeName(123)).to.be.equal('');
      done();
    });

    it('should format a lowercase string', done => {
      expect(instance.standardizeName('lowercase')).to.be.equal('lowercase');
      done();
    });

    it('should format a uppercase string', done => {
      expect(instance.standardizeName('UPPERCASE')).to.be.equal('uppercase');
      done();
    });

    it('should format a mixed case string', done => {
      expect(instance.standardizeName('mIXeDcAsE')).to.be.equal('mixedcase');
      done();
    });
  });

  describe('capitalizeFirstLetter', () => {
    before( () => {
      instance = lib();
    });

    it('should not throw when passed nothing', done => {
      expect(instance.capitalizeFirstLetter()).to.be.equal('');
      done();
    });

    it('should not throw when passed a number', done => {
      expect(instance.capitalizeFirstLetter(123)).to.be.equal('');
      done();
    });

    it('should format a lowercase string', done => {
      expect(instance.capitalizeFirstLetter('lowercase')).to.be.equal('Lowercase');
      done();
    });

    it('should format a uppercase string', done => {
      expect(instance.capitalizeFirstLetter('UPPERCASE')).to.be.equal('UPPERCASE');
      done();
    });

    it('should format a mixed case string', done => {
      expect(instance.capitalizeFirstLetter('mIXeDcAsE')).to.be.equal('MIXeDcAsE');
      done();
    });
  });

  describe('getJsonObject', () => {
    before( () => {
      instance = lib();
    });

    it('should not throw when passed nothing', done => {
      expect(instance.getJsonObject()).to.be.undefined;
      done();
    });

    it('should not throw when passed null', done => {
      expect(instance.getJsonObject(null)).to.be.undefined;
      done();
    });

    it('should return object when passed a object', done => {
      expect(instance.getJsonObject(mockObj)).to.deep.equal({ a: 1, b: [ 'one', 'two' ], c: { greeting: 'hello world' } });
      done();
    });

    it('should return array when passed an array', done => {
      expect(instance.getJsonObject(mockArray)).to.include.members([ 'one', 'two' ]);
      done();
    });

  });

});
