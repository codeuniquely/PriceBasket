/* global describe, before, beforeEach, it */
import chai from 'chai';
import lib from 'src/basket';
import utils from 'src/utils';

// reference expect
const expect = chai.expect;

// will hold the instantiated library
let instance;

// mock price list
const priceList = {
  apples: 1.00,
  bread: 0.80,
  milk: 1.30,
  soup: 0.65
};

// Mosk list for testing - with 'mixed' case inuts
const mockList = [ 'appleS', 'Apples', 'BREAD', 'bread', 'Milk', 'MILk', 'sOUP', 'sOUp' ];

// instantiate the utils library
const utilities = utils();

describe('basket', () => {

  describe('general', () => {
    before( () => {
      // instantiate the library
      instance = lib(priceList, utilities);
    });

    it('should exist', done => {
      expect(lib).to.exist;
      done();
    });

    it('empty should be a function', done => {
      expect(instance.empty).to.be.an('function');
      done();
    });

    it('addItem should be a function', done => {
      expect(instance.addItem).to.be.an('function');
      done();
    });

    it('addItemsFromList should be a function', done => {
      expect(instance.addItemsFromList).to.be.an('function');
      done();
    });

    it('contents should be a function', done => {
      expect(instance.contents).to.be.an('function');
      done();
    });

    it('total should be a function', done => {
      expect(instance.total).to.be.an('function');
      done();
    });
  });

  describe('empty', () => {
    beforeEach( () => {
      instance = lib(priceList, utilities);
      instance.empty();
    });

    // name:'Bread ', rate:'50%', discount:0 };
    it('should return a empty basket', done => {
      const basket = instance.contents();
      expect(basket).to.be.an('object');
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });
  });

  describe('addItem', () => {
    beforeEach( () => {
      instance = lib(priceList, utilities);
      instance.empty();
    });

    it('should add Apples to the basket', done => {
      instance.addItem('APPLES');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(1);
      expect(basket.apples).to.exist;
      expect(basket.apples).to.equal(1);
      done();
    });

    it('should add Bread to the basket', done => {
      instance.addItem('bread');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(1);
      expect(basket.bread).to.exist;
      expect(basket.bread).to.equal(1);
      done();
    });

    it('should add Milk to the basket', done => {
      instance.addItem('MIlk');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(1);
      expect(basket.milk).to.exist;
      expect(basket.milk).to.equal(1);
      done();
    });

    it('should add Soup to the basket', done => {
      instance.addItem('soUP');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(1);
      expect(basket.soup).to.exist;
      expect(basket.soup).to.equal(1);
      done();
    });

    it('should add same item multiple times to the basket', done => {
      instance.addItem('Apples');
      instance.addItem('Apples');
      instance.addItem('Apples');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(1);
      expect(basket.apples).to.exist;
      expect(basket.apples).to.equal(3);
      done();
    });

    it('should add different items into the basket', done => {
      instance.addItem('Apples');
      instance.addItem('Milk');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(2);
      expect(basket.apples).to.exist;
      expect(basket.apples).to.equal(1);
      expect(basket.milk).to.exist;
      expect(basket.milk).to.equal(1);
      done();
    });

    it('should not be able to add "cheese" to the basket', done => {
      expect(() => instance.addItem('Cheese')).to.throw(TypeError);
      expect(() => instance.addItem('Cheese')).to.throw('Item "Cheese", is not in the price list and cannot be added to basket');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });
  });

  describe('addItemsFromList', () => {
    beforeEach( () => {
      instance = lib(priceList, utilities);
      instance.empty();
    });

    it('should not throw if adds nothing', done => {
      instance.addItemsFromList();
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });

    it('should be able to add an empty list', done => {
      instance.addItemsFromList([]);
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });

    it('should be possible to add a list of items', done => {
      instance.addItemsFromList(mockList);
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(4);
      expect(basket.apples).to.exist;
      expect(basket.bread).to.exist;
      expect(basket.milk).to.exist;
      expect(basket.soup).to.exist;
      expect(basket.apples).to.equal(2);
      expect(basket.bread).to.equal(2);
      expect(basket.milk).to.equal(2);
      expect(basket.soup).to.equal(2);
      done();
    });

    it('should not be possible to add a invalid items via a list', done => {
      expect(() => instance.addItemsFromList([ 'apples', 'cheese' ])).to.throw(TypeError);
      expect(() => instance.addItemsFromList([ 'apples', 'cheese' ])).to.throw('Item "cheese", is not in the price list and cannot be added to basket');
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });
  });

  describe('contents', () => {
    beforeEach( () => {
      instance = lib(priceList, utilities);
      instance.addItemsFromList(mockList);
    });

    it('should get contents from a filled basket', done => {
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(4);
      expect(basket.apples).to.exist;
      expect(basket.bread).to.exist;
      expect(basket.milk).to.exist;
      expect(basket.soup).to.exist;
      expect(basket.apples).to.equal(2);
      expect(basket.bread).to.equal(2);
      expect(basket.milk).to.equal(2);
      expect(basket.soup).to.equal(2);
      done();
    });

    it('should be no contents in empty basket', done => {
      instance.empty();
      const basket = instance.contents();
      expect(Object.keys(basket).length).to.equal(0);
      done();
    });
  });

  describe('total', () => {
    beforeEach( () => {
      instance = lib(priceList, utilities);
    });

    it('should be no total for an empty basket', done => {
      instance.empty();
      const total = instance.total();
      expect(total).to.equal(0);
      done();
    });

    it('should be correct total for a filled basket', done => {
      instance.addItemsFromList(mockList);
      const total = instance.total();
      expect(total).to.equal(7.50);
      done();
    });
  });

});
