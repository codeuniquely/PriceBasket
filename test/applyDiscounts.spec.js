/* global describe, before, it */
import chai from 'chai';
import lib from 'src/applyDiscounts';

// reference expect
const expect = chai.expect;

// will hold the instantiated library
let results;

// A 'mock' discount rules library - '50p off' token
const discountRules = () => {
  function rule() {
    return { name:'50p off', rate:'50p', discount:0.50 };
  }
  return {
    rule
  };
};

const noDiscountRules = () => {
  function rule() {
    return { name:'50p off', rate:'50p', discount:0 };
  }
  return {
    rule
  };
};

// A 'mock' Basket library
const basket = () => {
  function contents(){
    return { apples:1, milk:1 };
  }
  function total() {
    return 2.30;
  }
  return {
    contents,
    total
  };
};

// instantiate the various 'mock' libraries
const rules = discountRules();
const noRules = noDiscountRules();
const shoppingBasket = basket();

describe('applyDiscounts', () => {

  describe('general', () => {
    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });
  });

  // subtotal: 2.30,
  // discounts: [],
  // total: 1.80
  describe('no discounts apply', () => {
    before( () => {
      // instantiate the library, apply the discount rules
      results = lib(shoppingBasket, noRules);
    });

    it('should have the right result structure', done => {
      expect(results).to.be.an('object');
      expect(results).to.have.a.property('subtotal');
      expect(results).to.have.a.property('discounts');
      expect(results).to.have.a.property('total');
      done();
    });

    it('should not have a discount', done => {
      expect(results.discounts).to.have.lengthOf(0);
      done();
    });

    it('should have the expected values', done => {
      expect(results.subtotal).to.be.equal(2.30);
      expect(results.total).to.be.equal(2.30);
      done();
    });
  });

  // subtotal: 2.30,
  // discounts: [
  //   { name:'50p off', rate:'50p', discount:0.50 },
  // ],
  // total: 1.80
  describe('discounts apply', () => {

    before( () => {
      // instantiate the library, apply the discount rules
      results = lib(shoppingBasket, rules);
    });

    it('should have the right result structure', done => {
      expect(results).to.be.an('object');
      expect(results).to.have.a.property('subtotal');
      expect(results).to.have.a.property('discounts');
      expect(results).to.have.a.property('total');
      expect(results.discounts).to.be.an('array');
      done();
    });

    it('should have the expected discount structure', done => {
      expect(results.discounts).to.have.lengthOf(1);
      const discount = results.discounts[0];
      expect(discount).to.have.a.property('name');
      expect(discount).to.have.a.property('rate');
      expect(discount).to.have.a.property('discount');
      expect(discount.name).to.be.equal('50p off');
      expect(discount.rate).to.be.equal('50p');
      expect(discount.discount).to.be.equal(0.50);
      done();
    });

    it('should have the expected discount', done => {
      const discount = results.discounts[0];
      expect(discount.discount).to.be.equal(0.50);
      done();
    });

    it('should have the expected values', done => {
      expect(results.subtotal).to.be.equal(2.30);
      expect(results.total).to.be.equal(1.80);
      done();
    });
  });

});
