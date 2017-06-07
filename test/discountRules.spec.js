/* global describe, before, beforeEach, it */
import chai from 'chai';
import lib from 'src/discountRules';
import utils from 'src/utils';

// reference expect
const expect = chai.expect;

// will hold the instantiated library
let instance;

// will hold reference to current 'discount' function
let testFunc;

// mock price list
const priceList = {
  soup: 0.65,
  bread: 0.80,
  milk: 1.30,
  apples: 1.00
};

// instantiate the utils library
const utilities = utils();

describe('discountRules', () => {

  describe('general', () => {
    before( () => {
      // instantiate the library
      instance = lib(priceList, utilities);
    });

    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });

    it('everyTwoTinsOfSoupMakesOneBreadHalfPrice should be a function', done => {
      expect(instance.everyTwoTinsOfSoupMakesOneBreadHalfPrice).to.be.an('function');
      done();
    });

    it('discountBagsOfApples should be a function', done => {
      expect(instance.discountBagsOfApples).to.be.an('function');
      done();
    });
  });

  describe('everyTwoTinsOfSoupMakesOneBreadHalfPrice', () => {

    beforeEach( () => {
      instance = lib(priceList, utilities);
      testFunc = instance.everyTwoTinsOfSoupMakesOneBreadHalfPrice;
    });

    // name:'Bread ', rate:'50%', discount:0 };
    it('should return a discount object containing Bread', done => {
      const discount = testFunc({});
      expect(discount).to.be.an('object');
      expect(discount.name).to.be.equal('Bread ');
      expect(discount.rate).to.be.equal('50%');
      done();
    });

    it('should be no discount when there is no bread', done => {
      const discount = testFunc({ bread:0 });
      expect(discount.discount).to.be.equal(0);
      done();
    });

    it('should be no discount when there is just bread', done => {
      const discount = testFunc({ bread:10 });
      expect(discount.discount).to.be.equal(0);
      done();
    });

    it('should be no discount when there is no soup', done => {
      const discount = testFunc({ bread:1, soup:0 });
      expect(discount.discount).to.be.equal(0);
      done();
    });

    it('should be no discount when there is only 1 soup', done => {
      const discount = testFunc({ bread:1, soup:1 });
      expect(discount.discount).to.be.equal(0);
      done();
    });

    it('should be 1 discount when there are 2 soups', done => {
      const discount = testFunc({ bread:1, soup:2 });
      expect(discount.discount).to.be.equal(0.40);
      done();
    });

    it('should not be effected by other products', done => {
      const discount = testFunc({ apples:1, bread:1, milk:1, soup:2 });
      expect(discount.discount).to.be.equal(0.40);
      done();
    });

    it('should be 1 discount when 2 bread and 2 soups', done => {
      const discount = testFunc({ bread:2, soup:2 });
      expect(discount.discount).to.be.equal(0.40);
      done();
    });

    it('should be 1 discount when there are 3 soups', done => {
      const discount = testFunc({ bread:2, soup:3 });
      expect(discount.discount).to.be.equal(0.40);
      done();
    });

    it('should be 2 discounts when there are 4 soups', done => {
      const discount = testFunc({ bread:2, soup:4 });
      expect(discount.discount).to.be.equal(0.80);
      done();
    });

    it('should be 2 discounts when there are many soups', done => {
      const discount = testFunc({ bread:2, soup:9 });
      expect(discount.discount).to.be.equal(0.80);
      done();
    });
  });

  describe('discountBagsOfApples', () => {

    beforeEach( () => {
      instance = lib(priceList, utilities);
      testFunc = instance.discountBagsOfApples;
    });

    // name:'Apples', rate:'10%', discount:0 };
    it('should return a discount object containing Apples', done => {
      const discount = testFunc({});
      expect(discount).to.be.an('object');
      expect(discount.name).to.be.equal('Apples');
      expect(discount.rate).to.be.equal('10%');
      done();
    });

    it('should be no discount when there are no apples', done => {
      const discount = testFunc({ apples:0 });
      expect(discount.discount).to.be.equal(0);
      done();
    });

    it('should discount a single bag of apples', done => {
      const discount = testFunc({ apples:1 });
      expect(discount.discount).to.be.equal(0.10);
      done();
    });

    it('should not be effected by other products', done => {
      const discount = testFunc({ apples:1, bread:1, milk:1, soup:1 });
      expect(discount.discount).to.be.equal(0.10);
      done();
    });

    it('should discount multiple bags of apples', done => {
      const discount = testFunc({ apples:10 });
      expect(discount.discount).to.be.equal(1.00);
      done();
    });
  });

});
