/* global describe, before, it */
import chai from 'chai';
import lib from 'src/inputsProcessor';

// Provide mock inputs - the 'first two' argument will be the 'node' and the app's name
// `node PriceBasket Apples Bread Bread Milk Milk Soup Soup`
const mockNoArgs = [ 'node', 'PriceBasket.js' ];
const mockWithArgs = [ 'node', 'PriceBasket.js', 'Apples', 'Bread', 'Bread', 'Milk', 'Milk', 'Soup', 'Soup' ];

// reference expect
const expect = chai.expect;

// will hold the instantiated library
let instance;

describe('inputsProcessor', () => {

  describe('general', () => {

    // instantiate the library
    before( () => {
      instance = lib();
    });

    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });

    it('get should be a function', done => {
      expect(instance.get).to.be.an('function');
      done();
    });

    it('get should return an Array', done => {
      expect(instance.get()).to.be.an('array');
      done();
    });

    it('should have no elements in the returned list', done => {
      expect(instance.get()).to.have.lengthOf(0);
      done();
    });

  });

  // expect [ ]
  describe('without inputs', () => {

    // instantiate the library with no arguments
    before( () => {
      instance = lib(mockNoArgs);
    });

    it('should have 0 elements in the list', done => {
      expect(instance.get()).to.have.lengthOf(0);
      done();
    });

  });

  // expect [ 'Apples', 'Bread', 'Bread', 'Milk', 'Milk', 'Soup', 'Soup' ]
  describe('with inputs', () => {

    // instantiate the library with mock arguments
    before( () => {
      instance = lib(mockWithArgs);
    });

    it('should have 7 elements in the list', done => {
      expect(instance.get()).to.have.lengthOf(7);
      done();
    });

    it('should match expected list contents', done => {
      expect(instance.get()).to.include.members([ 'Apples', 'Bread', 'Bread', 'Milk', 'Milk', 'Soup', 'Soup' ]);
      done();
    });

  });

});
