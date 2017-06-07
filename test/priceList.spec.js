/* global describe, it */
import chai from 'chai';
import lib from 'src/priceList';

const expect = chai.expect;

describe('priceList', () => {

  it('priceList should exist', done => {
    expect(lib).to.exist;
    done();
  });

  it('priceList should be an object', done => {
    expect(lib).to.be.an('object');
    done();
  });

  it('priceList should contain expected items', done => {
    expect(lib).to.have.a.property('apples');
    expect(lib).to.have.a.property('bread');
    expect(lib).to.have.a.property('milk');
    expect(lib).to.have.a.property('soup');
    done();
  });

  it('price list should have only 4 items', done => {
    expect(Object.keys(lib).length).to.equal(4);
    done();
  });

  it('priceList should have correct values', done => {
    expect(lib.soup).to.equal(0.65);
    expect(lib.bread).to.equal(0.80);
    expect(lib.milk).to.equal(1.30);
    expect(lib.apples).to.equal(1.00);
    done();
  });

});