//
// Defines a library of reusable / useful utility functions
//
const utils = () => {

  function isNumeric(val) {
    return Number(parseFloat(val))==val;
  }

  // round prices down with 2 dp precision (lowest pence)
  function roundDown(amount) {
    if (!isNumeric(amount)) {
      return NaN;
    }
    return Math.floor(amount * 100) / 100;
  }

  // amounts will be in pence
  function formatPrice(amount) {
    if (!isNumeric(amount)) {
      return NaN;
    }
    if (amount > 0.99) {
      return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 });
    } else {
      return `${roundDown(amount)*100}p`;
    }
  }

  function standardizeName(name) {
    if (typeof name !== 'string') {
      return '';
    }
    return name.toLowerCase().trim();
  }

  // names should have first letter capitalized
  function capitalizeFirstLetter(text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function getJsonObject(obj) {
    if (typeof obj === 'undefined' || obj === null) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(obj));
  }

  return {
    roundDown,
    formatPrice,
    getJsonObject,
    standardizeName,
    capitalizeFirstLetter,
  };

};

export default utils;
