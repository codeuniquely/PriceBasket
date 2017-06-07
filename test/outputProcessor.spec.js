/* global describe, before, beforeEach, it */
import chai from 'chai';
import lib from 'src/outputProcessor';
import utils from 'src/utils';

// reference expect
const expect = chai.expect;

// will hold the instantiated library
let instance;
let sink;

// Provide a sink - the 'first two' argument will be the 'node' and the app's name
const dummySink = content => {
  sink.push(content);
};

const mockResults = {
  subtotal: 3.75,
  discounts: [
    { name:'Apples', rate:'10%', discount:0.10 },
    { name:'Bread ', rate:'50%', discount:0.40 }
  ],
  total: 3.25
};

const mockNoDiscountsResults = {
  subtotal: 2.00,
  total: 2.00
};

// instantiate the utils library
const utilities = utils();

describe('outputProcessor', () => {

  describe('general', () => {
    before( () => {
      // instantiate the library
      instance = lib(dummySink, utilities);
    });

    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });

    it('log should be a function', done => {
      expect(instance.log).to.be.an('function');
      done();
    });

    it('write should be a function', done => {
      expect(instance.write).to.be.an('function');
      done();
    });
  });

  describe('log', () => {

    beforeEach( () => {
      sink = []; // reset the sink contents
      instance = lib(dummySink, utilities);
    });

    it('should write nothing when no contents passed', done => {
      instance.log();
      expect(sink).to.have.lengthOf(0);
      done();
    });

    it('should write empty string', done => {
      instance.log('');
      expect(sink).to.have.lengthOf(1);
      expect(sink[0]).to.be.equal('');
      done();
    });

    it('should write contents', done => {
      instance.log('Hello World');
      expect(sink).to.have.lengthOf(1);
      expect(sink[0]).to.be.equal('Hello World');
      done();
    });

  });

  describe('write', () => {

    beforeEach( () => {
      sink = []; // reset the sink contents
      instance = lib(dummySink, utilities);
    });

    it('should write default when no contents passed', done => {
      instance.write();
      expect(sink).to.have.lengthOf(3);
      expect(sink[0]).to.be.equal('Subtotal: 0p');
      expect(sink[1]).to.be.equal('(No offers available)');
      expect(sink[2]).to.be.equal('Total price: 0p');
      done();
    });

    it('should write when there are no dicounts', done => {
      instance.write(mockNoDiscountsResults);
      expect(sink).to.have.lengthOf(3);
      expect(sink[0]).to.be.equal('Subtotal: £2.00');
      expect(sink[1]).to.be.equal('(No offers available)');
      expect(sink[2]).to.be.equal('Total price: £2.00');
      done();
    });

    it('should write when discounts exist', done => {
      instance.write(mockResults);
      expect(sink).to.have.lengthOf(4);
      expect(sink[0]).to.be.equal('Subtotal: £3.75');
      expect(sink[1]).to.be.equal('Apples 10% off: -10p');
      expect(sink[2]).to.be.equal('Bread  50% off: -40p');
      expect(sink[3]).to.be.equal('Total price: £3.25');
      done();
    });
  });

});
